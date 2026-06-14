"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function LokalisasiPage() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!image || !description || !country) {
      setError("Mohon lengkapi semua field (Foto, Deskripsi, dan Negara).");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);
      formData.append("country", country);

      const res = await fetch("/api/localize", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses permintaan");
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Lokalisasi Konten</h2>
        <p className="text-sm text-slate-500">Sesuaikan deskripsi produk Anda untuk pasar global.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Formulir Produk</CardTitle>
          <CardDescription>Isi detail produk Anda di bawah ini.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="image">Unggah Foto Produk (Max 5MB)</Label>
            <Input id="image" type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Singkat (Bahasa Indonesia)</Label>
            <Textarea 
              id="description" 
              placeholder="Contoh: Keripik pisang manis gurih khas Lampung..."
              className="min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Negara Tujuan</Label>
            <Select value={country} onValueChange={(val) => setCountry(val || "")}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Pilih negara..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Amerika Serikat">Amerika Serikat</SelectItem>
                <SelectItem value="Jepang">Jepang</SelectItem>
                <SelectItem value="Arab Saudi">Arab Saudi</SelectItem>
                <SelectItem value="Malaysia">Malaysia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit} disabled={loading}>
            {loading ? "Memproses AI..." : "Buat Konten Ekspor"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700">Hasil Lokalisasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <span className="font-semibold block mb-1">Nama Produk (Global):</span>
              <p className="text-slate-800">{result.product_name_en}</p>
            </div>
            <div>
              <span className="font-semibold block mb-1">Deskripsi Copywriting:</span>
              <p className="text-slate-800 leading-relaxed">{result.description}</p>
            </div>
            <div>
              <span className="font-semibold block mb-1">Selling Points:</span>
              <ul className="list-disc pl-5 space-y-1 text-slate-800">
                {result.selling_points?.map((pt: string, i: number) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-semibold block mb-1">SEO Keywords:</span>
              <div className="flex flex-wrap gap-2">
                {result.seo_keywords?.map((kw: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-white border rounded text-xs">{kw}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
