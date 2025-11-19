"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";
import { IProduct } from "@/types/types";

const ProductCard :React.FC<IProduct> = ({id,before_discount_price,brand,categories,description,features,images,inventory,price,title}) => {
  return (
    <article
      aria-labelledby={`product-${id}-title`}
      className="
        relative max-w-xs w-full rounded-2xl overflow-hidden
        backdrop-blur-xl bg-white/15 border border-white/30
        shadow-lg hover:shadow-2xl transition-all duration-300
        mx-auto
      "
    >
      {/* Image */}
      <Link href={`/product/${id}/${title}`} className="block relative w-full h-56 sm:h-72">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="aspect-square object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Gradient overlay (برای خوانایی بهتر متن) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
      </Link>

      {/* محتوا */}
      <div className="relative p-5 text-slate-100 z-10">
        <h3
          id={`product-${id}-title`}
          className="text-base h-12  font-semibold mb-2 drop-shadow-md text-white"
        >
          <Link href={`/product/${id}/${title}`} className="hover:underline text-blue-900">
            {title}
          </Link>
        </h3>

        <div className="flex items-baseline justify-between">
          <span className="text-lg font-bold text-orange-500 drop-shadow">
            {Number(price).toLocaleString()} تومان
          </span>
          {before_discount_price && (
            <span className="text-sm text-blue-600 line-through">
              {Number(before_discount_price).toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={``}
            className="
              flex-1 flex items-center justify-center gap-2
              rounded-xl py-2 px-3 text-sm font-medium
              bg-linear-to-r from-orange-400 to-blue-500
              text-white shadow hover:brightness-95
              transition-all duration-200
            "
            aria-label={`مشاهده ${title}`}
          >
            <Eye className="w-4 h-4" />
            مشاهده
          </Link>

          <button
            type="button"
            className="
              flex items-center justify-center gap-2
              rounded-xl py-2.5 px-4 text-sm font-semibold
              bg-linear-to-r from-blue-600/90 to-blue-700/90
              text-orange-200 border border-blue-500/40
              hover:from-blue-500 hover:to-blue-600 hover:text-white
              transition-all duration-300 transform hover:scale-[1.02]
              shadow-lg hover:shadow-blue-900/20
            "
            aria-label={`افزودن ${title} به سبد خرید`}
          >
            <ShoppingCart className="w-4 h-4" />
            سبد
          </button>
        </div>

        {/* <p className='mt-4 text-xs text-blue-100/80'>
          ارسال سریع • گارانتی اصالت کالا
        </p> */}
      </div>

      {/* Glow background effect */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-orange-400/10 via-transparent to-blue-500/10 blur-2xl" />
    </article>
  );
};

export default ProductCard;
