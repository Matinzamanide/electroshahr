"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, title }: { images: string[], title: string }) {
  const [mainImage, setMainImage] = useState(images[0] || "");

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-100">
        <Image src={mainImage} alt={title} fill className="object-contain transition-transform duration-500 hover:scale-105" priority />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button key={index} onClick={() => setMainImage(img)} 
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? "border-orange-600 shadow-md" : "border-gray-200"}`}>
            <Image src={img} alt={`تصویر ${index + 1}`} width={80} height={80} className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}