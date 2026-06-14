import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageSquare, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Selamat Datang!</h2>
        <p className="text-slate-500">Pilih layanan yang Anda butuhkan hari ini.</p>
      </div>

      <div className="grid gap-4">
        <Link href="/lokalisasi">
          <Card className="hover:border-blue-500 transition-colors cursor-pointer border-2 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Lokalisasi Konten</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600">
                Unggah foto & ceritakan produk Anda untuk diterjemahkan gaya promosinya ke bahasa negara tujuan.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/konsultan">
          <Card className="hover:border-green-500 transition-colors cursor-pointer border-2 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Tanya Regulasi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600">
                Ngobrol santai dengan AI untuk mencari tahu syarat ekspor, BPOM, dan dokumen lainnya.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dokumen">
          <Card className="hover:border-orange-500 transition-colors cursor-pointer border-2 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Buat Dokumen</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600">
                Bikin Invoice dan Packing List ekspor dengan format standar internasional secara otomatis.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
