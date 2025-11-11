'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string;
  currentPrice: number;
  oldPrice?: number;
  href?: string;
}

export default function ProductCard({
  id,
  name,
  imageUrl,
  currentPrice,
  oldPrice,
  href = '#',
}: ProductCardProps) {
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
      <Link href={href} className="block relative w-full h-56 sm:h-64">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes='(max-width: 640px) 100vw, 33vw'
          className='object-cover transition-transform duration-500 hover:scale-105'
        />
        {/* Gradient overlay (برای خوانایی بهتر متن) */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent' />
      </Link>

      {/* محتوا */}
      <div className='relative p-5 text-slate-100 z-10'>
        <h3
          id={`product-${id}-title`}
          className='text-base h-12  font-semibold mb-2 drop-shadow-md text-white'
        >
          <Link href={href} className='hover:underline text-blue-900'>
            {name}
          </Link>
        </h3>

        <div className='flex items-baseline justify-between'>
          <span className='text-lg font-bold text-orange-500 drop-shadow'>
            {currentPrice.toLocaleString()} تومان
          </span>
          {oldPrice && (
            <span className='text-sm text-blue-600 line-through'>
              {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className='mt-5 flex gap-3'>
          <Link
            href={href}
            className='
              flex-1 flex items-center justify-center gap-2
              rounded-xl py-2 px-3 text-sm font-medium
              bg-gradient-to-r from-orange-400 to-blue-500
              text-white shadow hover:brightness-95
              transition-all duration-200
            '
            aria-label={`مشاهده ${name}`}
          >
            <Eye className='w-4 h-4' />
            مشاهده
          </Link>

          <button
            type='button'
            className='
              flex items-center justify-center gap-2
              rounded-xl py-2 px-3 text-sm font-semibold
              border border-white/40 text-blue-900
              bg-orange-400 hover:bg-blue-600 hover:text-orange-400 cursor-pointer
              transition-all duration-200 backdrop-blur-sm
            '
            aria-label={`افزودن ${name} به سبد خرید`}
          >
            <ShoppingCart className='w-4 h-4' />
            سبد
          </button>
        </div>

        {/* <p className='mt-4 text-xs text-blue-100/80'>
          ارسال سریع • گارانتی اصالت کالا
        </p> */}
      </div>

      {/* Glow background effect */}
      <div className='absolute inset-0 pointer-events-none bg-gradient-to-br from-orange-400/10 via-transparent to-blue-500/10 blur-2xl' />
    </article>
  );
}
