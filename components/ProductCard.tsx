import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowUpRight, ShieldCheck } from "lucide-react";
import { IProduct } from "@/types/types";

const ProductCard: React.FC<IProduct> = ({
  id,
  before_discount_price,
  images,
  price,
  title,
}) => {
  const numericPrice = Number(price);
  const numericBeforeDiscount = Number(before_discount_price);
  const hasDiscount = numericBeforeDiscount > numericPrice;
  const hoverImage = images[1] ? images[1] : images[0];

  return (
    <div className="group relative w-full max-w-[280px] mx-auto">
      <article className="relative bg-white rounded-4xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] group-hover:-translate-y-3">
        
        <div className="relative h-72 w-full bg-[#F9FAFB] overflow-hidden">
          <Link href={`/product/${id}/${title}`} className="block h-full w-full p-8">
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-contain transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1 group-hover:opacity-0"
            />
            <Image
              src={hoverImage}
              alt={`${title} hover`}
              fill
              className="object-contain absolute inset-0 p-8 opacity-0 scale-95 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100"
            />
          </Link>

          {hasDiscount && (
            <div className="absolute top-5 right-5">
              <div className="bg-white/90 backdrop-blur-md border border-slate-100 text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">
                %{Math.round(((numericBeforeDiscount - numericPrice) / numericBeforeDiscount) * 100)} OFF
              </div>
            </div>
          )}

          <Link href={`/product/${id}/${title}`}>
          <button className="absolute bottom-0 inset-x-0 h-14 bg-slate-900 text-white translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 flex items-center justify-center gap-3 font-bold text-sm tracking-tight">
            <ShoppingCart  size={18} className="text-blue-400" />
            افزودن به سبد خرید
          </button>
          </Link>
        </div>

        <div className="p-6 text-right" dir="rtl">
          <div className="flex justify-between items-center mb-3">
             <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-2 py-0.5 rounded">Premium</span>
             <div className="flex items-center gap-1 text-slate-400">
                <ShieldCheck size={12} />
                <span className="text-[10px] font-bold">اصالت کالا</span>
             </div>
          </div>

          <h3 className="text-sm font-bold text-slate-800 leading-relaxed h-10 line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors">
            <Link href={`/product/${id}/${title}`}>{title}</Link>
          </h3>

          <div className="flex items-end justify-between border-t border-slate-50 pt-4">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[11px] text-slate-300 line-through mb-1">
                  {numericBeforeDiscount.toLocaleString()}
                </span>
              )}
              <div className="flex items-center gap-1">
                <span className="text-xl font-black text-slate-900 tracking-tighter">
                  {numericPrice.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-slate-400">تومان</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </article>

      <div className="absolute -bottom-4 inset-x-10 h-10 bg-black/5 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default ProductCard;