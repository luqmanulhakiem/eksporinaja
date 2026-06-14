"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DokumenPage() {
  const [formData, setFormData] = useState({
    sender: "",
    buyer: "",
    product: "",
    weight: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const invoiceNo = "INV-" + Math.floor(Math.random() * 1000000);
    const date = new Date().toLocaleDateString('en-GB');

    // Header
    doc.setFontSize(20);
    doc.text("COMMERCIAL INVOICE", 14, 22);
    
    doc.setFontSize(10);
    doc.text(`Invoice No: ${invoiceNo}`, 14, 30);
    doc.text(`Date: ${date}`, 14, 35);

    // Sender & Buyer info
    doc.text("From (Pengirim):", 14, 45);
    doc.setFont("helvetica", "bold");
    doc.text(formData.sender || "-", 14, 50);
    
    doc.setFont("helvetica", "normal");
    doc.text("To (Pembeli):", 120, 45);
    doc.setFont("helvetica", "bold");
    doc.text(formData.buyer || "-", 120, 50);

    // Table
    autoTable(doc, {
      startY: 65,
      head: [['Description of Goods (Jenis Barang)', 'Total Weight (Berat)', 'Total Value (Harga)']],
      body: [
        [formData.product || "-", `${formData.weight || "0"} Kg`, `$${formData.price || "0"}`],
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Add Packing list text
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.setFontSize(14);
    doc.text("PACKING LIST", 14, finalY + 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("This document serves as both Commercial Invoice and Packing List.", 14, finalY + 30);
    doc.text(`Total Weight/Gross Weight: ${formData.weight || "0"} Kg`, 14, finalY + 35);
    
    // Sign area
    doc.text("Authorized Signature,", 140, finalY + 60);
    doc.text("_______________________", 140, finalY + 80);

    doc.save(`${invoiceNo}_Export_Document.pdf`);
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Generator Dokumen</h2>
        <p className="text-sm text-slate-500">Buat Commercial Invoice & Packing List otomatis.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Data Pengiriman</CardTitle>
          <CardDescription>Lengkapi data di bawah ini untuk membuat PDF.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sender">Nama Pengirim (UMKM)</Label>
            <Input id="sender" value={formData.sender} onChange={handleChange} placeholder="Contoh: PT. Ekspor Maju" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyer">Nama Pembeli (Internasional)</Label>
            <Input id="buyer" value={formData.buyer} onChange={handleChange} placeholder="Contoh: Global Corp LLC" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Jenis Barang</Label>
            <Input id="product" value={formData.product} onChange={handleChange} placeholder="Contoh: Keripik Pisang 100 Pcs" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Berat (Kg)</Label>
              <Input id="weight" value={formData.weight} onChange={handleChange} type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Total Harga ($)</Label>
              <Input id="price" value={formData.price} onChange={handleChange} type="number" placeholder="0" />
            </div>
          </div>

          <Button className="w-full mt-4 flex gap-2" onClick={generatePDF}>
            <Download className="w-4 h-4" />
            Unduh Dokumen PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
