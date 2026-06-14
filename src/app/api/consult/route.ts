import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing");
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: "Invalid or missing message" }, { status: 400 });
    }

    // Input sanitization/validation (basic length check to prevent huge prompts)
    if (message.length > 2000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `Anda adalah konsultan ekspor pintar khusus untuk UMKM Indonesia. 
Jawablah pertanyaan dari pelaku usaha mikro dengan bahasa Indonesia yang sangat sederhana, santai, namun profesional. 
Hindari istilah hukum atau birokrasi yang rumit, jika harus menggunakannya, jelaskan artinya. 
Jika regulasi membutuhkan dokumen spesifik (seperti Phytosanitary atau Halal), sebutkan nama lembaga di Indonesia tempat mengurusnya.
Berikan jawaban yang terstruktur dan mudah dipahami, gunakan bullet points jika perlu.`
    });

    // Format history for Gemini SDK
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Gemini requires the first message in history to be from the 'user'
    while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    const chatSession = model.startChat({
      history: formattedHistory
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
    
  } catch (error) {
    console.error("Error in consult API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
