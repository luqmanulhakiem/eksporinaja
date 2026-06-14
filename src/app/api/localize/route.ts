import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing");
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const formData = await req.formData();
    const image = formData.get('image') as File | null;
    const description = formData.get('description') as string | null;
    const country = formData.get('country') as string | null;

    if (!image || !description || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate input image type (Security: Only allow standard images)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      return NextResponse.json({ error: "Invalid image type. Only JPEG, PNG, WEBP allowed." }, { status: 400 });
    }
    
    // Validate size (Max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image size exceeds 5MB limit" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const buffer = await image.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    const prompt = `Anda adalah seorang ahli pemasaran digital internasional dan copywriter profesional. 
Tugas Anda adalah menganalisis foto produk dan deskripsi singkat berikut: ${description}.
Buatkan deskripsi produk yang menarik, persuasif, dan sesuai dengan preferensi budaya konsumen di negara ${country}. 
Jangan hanya menerjemahkan kata demi kata, melainkan sesuaikan gaya bahasanya (lokalisasi).
Berikan output HANYA dalam format JSON (tanpa format markdown apapun seperti \`\`\`json) dengan struktur yang valid:
{
  "product_name_en": "string",
  "description": "string",
  "selling_points": ["string"],
  "seo_keywords": ["string"]
}`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: image.type,
        },
      },
      prompt,
    ]);

    let responseText = result.response.text();
    
    // Clean up potential markdown formatting from Gemini
    responseText = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

    try {
      const data = JSON.parse(responseText);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini:", responseText);
      return NextResponse.json({ error: "Invalid response format from AI", raw: responseText }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in localize API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
