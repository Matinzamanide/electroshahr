'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GitPullRequest, Loader2, ChevronLeft, Zap } from 'lucide-react';

// Swiper core
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules'; 

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

// ----------------------------------------------------------------
// فرض بر این است که این interface از فایل '@/types/types' می‌آید
interface IProduct {
    id: string;
    title: string;
    slug: string;
    price: number;
    images: string; // فرض بر این است که برای نمایش در کارت، این فیلد وجود دارد
    // ... سایر فیلدها
}
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// کامپوننت ProductCard (نسخه ساده برای مثال)
const ProductCard: React.FC<IProduct> = ({ title, price, images, slug, id }) => (
    <Link href={`/product/${id}/${slug}`} className="block">
        <div className="p-4 flex flex-col items-center">
            {/* Image Placeholder */}
            <div className="relative w-full aspect-4/3 mb-3 rounded-xl overflow-hidden bg-gray-100 hover:scale-[1.03] transition-transform duration-500">
                <Image src={images[0]} width={100} height={100} alt={title} className="object-contain w-full h-full" />
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">جدید</span>
            </div>
            {/* Content */}
            <h3 className="text-base font-semibold text-blue-900 text-center truncate w-full mb-1">{title}</h3>
            <p className="text-xl font-bold text-orange-600 font-sans">{Number(price).toLocaleString()} ت</p>
        </div>
    </Link>
);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// کامپوننت SectionHeader (برای سادگی در اینجا تعریف می‌شود)
interface SectionHeaderProps {
    title: string;
    icon: React.ReactNode; 
    linkHref: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, linkHref }) => {
    return (
        <div className="w-[95%] mx-auto py-4">
            <div className="flex items-center justify-between border-b-2 border-dashed border-blue-100 pb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-linear-to-br from-blue-600 to-orange-500 text-white shadow-lg shadow-blue-500/40 transform hover:scale-105 transition-transform duration-300">
                        {icon}
                    </div>
                    <h2 className="text-3xl font-extrabold text-blue-900 relative">
                        {title}
                        <span className="absolute -bottom-2.5 right-0 h-1 w-1/3 bg-orange-500 rounded-full"></span>
                    </h2>
                </div>
                <Link 
                    href={linkHref}
                    className="flex items-center gap-1 text-lg font-bold text-orange-600 hover:text-blue-700 transition-colors duration-300 group"
                >
                    مشاهده همه
                    <ChevronLeft 
                        size={20} 
                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                    />
                </Link>
            </div>
        </div>
    );
};
// ----------------------------------------------------------------


const NewestProduct = () => {
    const [data, setData] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios('https://apika.ir/electroshahr/getProducts.php')
            .then((res) => {
                if (Array.isArray(res.data)) {
                    // فقط 8 محصول اول را می‌گیریم
                    setData(res.data.slice(0, 8));
                    console.log(res.data)
                } else {
                    console.error('API response is not an array:', res.data);
                    setError(true);
                }
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const renderContent = () => {
        if (loading) {
            // Skeleton Loader
            return (
                <div className="flex gap-5 overflow-x-hidden p-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="shrink-0 w-60 bg-gray-200 rounded-3xl h-80 animate-pulse"></div>
                    ))}
                </div>
            );
        }

        if (error || data.length === 0) {
            return (
                <div className="text-center p-10 text-red-600 bg-red-50 rounded-xl max-w-lg mx-auto">
                    <Zap size={30} className="mx-auto mb-3" />
                    <p>متأسفانه در حال حاضر محصول جدیدی برای نمایش وجود ندارد یا خطایی رخ داده است.</p>
                </div>
            );
        }
        
        // Swiper Slider
        return (
            <Swiper
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                speed={600}
                navigation
                breakpoints={{
                    0: { slidesPerView: 1.2, spaceBetween: 12 },
                    640: { slidesPerView: 2.5, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 16 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
                className="pb-8"
            >
                {data.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                            <ProductCard {...item} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    };

    return (
        <div className="py-12 bg-indigo-50">
            
            {/* استفاده از SectionHeader خفن */}
            <SectionHeader 
                title="جدیدترین محصولات" 
                icon={<GitPullRequest size={20} />} 
                linkHref="/new-arrivals" 
            />

            <div className="w-[95%] mx-auto mt-6 relative">
                {renderContent()}

                {/* استایل‌های جهانی برای دکمه‌های ناوبری Swiper */}
                <style jsx global>{`
                    .swiper-button-prev,
                    .swiper-button-next {
                        background: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 9999px;
                        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
                        color: #2563eb; /* آبی تیره */
                        opacity: 0.95;
                        transition: all 0.3s ease;
                        font-size: 16px !important; /* کنترل اندازه آیکون */
                        z-index: 10;
                    }
                    .swiper-button-prev:hover,
                    .swiper-button-next:hover {
                        transform: scale(1.1);
                        color: #f97316; /* نارنجی تیره در هاور */
                        opacity: 1;
                    }
                    .swiper-button-prev {
                        left: -20px;
                    }
                    .swiper-button-next {
                        right: -20px;
                    }
                    @media (max-width: 640px) {
                        .swiper-button-prev,
                        .swiper-button-next {
                            display: none;
                        }
                    }
                    .swiper-button-prev::after,
                    .swiper-button-next::after {
                        font-size: 16px !important; /* افزایش اندازه آیکون */
                        font-weight: bold;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default NewestProduct;