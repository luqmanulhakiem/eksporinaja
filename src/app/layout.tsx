import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EksporinAja",
  description: "Jembatan Gen AI untuk UMKM Lokal Menembus Pasar Global",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
          <div className="flex h-14 items-center px-4 max-w-md mx-auto w-full">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">EksporinAja</h1>
          </div>
        </header>
        <main className="flex-1 max-w-md mx-auto w-full p-4 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
