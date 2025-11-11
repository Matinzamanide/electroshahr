'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, Eye, Heart, Zap } from 'lucide-react';

// تعریف Interface برای پراپ‌های کارت محصول (بدون تغییر)
interface ProductCardProps {
    id: string;
    name: string;
    imageUrl: string;
    currentPrice: number;
    oldPrice?: number; // قیمت قبلی (اختیاری برای تخفیف)
    isAvailable: boolean; // موجودی کالا
    category: string; // برای نمایش یا فیلتر
    slug: string; // برای ساخت لینک محصول
}

const ProductCard: FC<ProductCardProps> = ({
    id,
    name,
    imageUrl,
    currentPrice,
    oldPrice,
    isAvailable,
    category,
    slug
}) => {
    // محاسبه درصد تخفیف
    const discountPercentage = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

    return (
        // 💫 شیشه‌گرایی و انیمیشن کل کارت 💫
        <div 
            className="group relative backdrop-blur-md bg-white/70 border border-white/30 rounded-2xl overflow-hidden shadow-lg 
                       transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200/50 hover:rotate-1"
        >
            
            {/* بخش تصویر محصول */}
            <div className="relative w-full h-48 bg-white/50 flex items-center justify-center overflow-hidden">
                <Link href={`/products/${slug}`} className="block w-full h-full">
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={300}
                        height={200}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>
                
                {/* برچسب تخفیف (در صورت وجود) */}
                {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-orange-600/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                        %{discountPercentage}-
                    </div>
                )}

                {/* دکمه‌های اکشن (هاور با رنگ‌بندی تم) */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2 space-x-reverse">
                        <Link href={`/products/${slug}`} passHref>
                            <button
                                title="مشاهده جزئیات"
                                className="p-3 bg-blue-50/80 backdrop-blur-sm rounded-full text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-125"
                            >
                                <Eye size={20} />
                            </button>
                        </Link>
                        <button
                            title="افزودن به علاقه‌مندی‌ها"
                            className="p-3 bg-blue-50/80 backdrop-blur-sm rounded-full text-red-500 border border-blue-200 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-125"
                        >
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* بخش اطلاعات محصول */}
            <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)]">
                
                {/* نام محصول */}
                <h3 className="text-xl font-extrabold text-blue-900 transition-colors duration-200 leading-tight mb-2">
                    <Link 
                        href={`/products/${slug}`} 
                        className='hover:text-orange-600 transition-colors'
                    >
                        {name}
                    </Link>
                </h3>

                {/* قیمت‌ها */}
                <div className="flex items-baseline gap-2 mb-4 mt-2">
                    {oldPrice && (
                        <span className="text-gray-500 line-through text-base font-sans font-medium">
                            {oldPrice.toLocaleString()} ت
                        </span>
                    )}
                    <span className="text-3xl font-extrabold text-orange-600 font-sans">
                        {currentPrice.toLocaleString()} ت
                    </span>
                </div>

                {/* موجودی و دکمه افزودن به سبد */}
                <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-gray-100">
                    <div className={`text-sm font-medium flex items-center gap-1 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {isAvailable ? '✅ موجود در انبار' : '❌ ناموجود'}
                    </div>
                    
                    {/* 🚀 دکمه جذاب با انیمیشن هاور */}
                    <button
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-bold transition-all duration-500 transform 
                            ${isAvailable 
                                ? 'bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg shadow-blue-500/40 group-hover:from-orange-600 group-hover:to-orange-700 group-hover:shadow-orange-400/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
                                : 'bg-gray-400 cursor-not-allowed shadow-none'
                            }`}
                        disabled={!isAvailable}
                        title={isAvailable ? "افزودن به سبد خرید" : "کالا ناموجود است"}
                    >
                        <ShoppingCart size={20} />
                        {isAvailable ? 'افزودن به سبد' : 'اطلاع از موجودی'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;