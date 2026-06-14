"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function KonsultanPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "Halo! Saya asisten ekspor Anda. Ada yang ingin ditanyakan seputar syarat, dokumen, atau regulasi ekspor?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const history = newMessages.slice(0, -1);

      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses permintaan");

      setMessages([...newMessages, { role: 'model', content: data.reply }]);
    } catch (error: any) {
      setMessages([...newMessages, { role: 'model', content: "Maaf, terjadi kesalahan sistem: " + error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] py-4">
      {/* Header container */}
      <div className="space-y-1 mb-4 shrink-0">
        <h2 className="text-xl font-bold">Konsultan Regulasi Ekspor</h2>
        <p className="text-sm text-slate-500">Tanya syarat dan dokumen ekspor dengan bahasa santai.</p>
      </div>

      {/* Main Card Container */}
      <Card className="flex-1 flex flex-col overflow-hidden bg-slate-50 min-h-0">

        {/* Scrollable area for messages */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl p-3 max-w-[85%] text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-800 border'}`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading animation */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border text-slate-800 rounded-xl p-3 max-w-[85%] text-sm flex gap-2 items-center shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  <span className="text-slate-500">Mengetik...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input form at the bottom */}
        <div className="p-3 border-t bg-white shrink-0">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              className="flex-1"
              disabled={loading}
            />
            <Button size="icon" type="submit" disabled={loading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}