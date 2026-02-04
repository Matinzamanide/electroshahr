"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  GitPullRequest,
  ChevronLeft,
  Zap,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: string[];
}

const ProductCard: React.FC<IProduct> = ({
  title,
  price,
  images,
  slug,
  id,
}) => (
  <div className="group relative bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50">
    <div className="relative w-full aspect-square mb-5 rounded-4xl overflow-hidden bg-[#f8f9fa] flex items-center justify-center group">
      <Image
        src={images[0]}
        width={200}
        height={200}
        alt={title}
        className="object-contain w-3/4 h-3/4 transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
        <Link
          href={`/product/${id}/${slug}`}
          className="p-3 bg-white rounded-full text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
        >
          <Eye size={20} />
        </Link>
      </div>

      <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-blue-600 text-[10px] font-black px-3 py-1 rounded-full shadow-sm border border-white/50 tracking-widest uppercase">
        NEW
      </span>
    </div>

    <div className="px-2 space-y-2">
      <h3 className="text-sm md:text-base font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            Price
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-slate-900 font-sans tracking-tighter">
              {Number(price).toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-slate-500">تومان</span>
          </div>
        </div>

        <Link
          href={`/product/${id}/${slug}`}
          className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
        >
          <ShoppingCart size={18} />
        </Link>
      </div>
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; linkHref: string }> = ({
  title,
  linkHref,
}) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 px-4">
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.3em]">
        <div className="w-8 h-0.5 bg-blue-600"></div>
        Explore New
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic">
        {title}
      </h2>
    </div>
    <Link
      href={linkHref}
      className="group flex items-center gap-3 text-sm font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-widest"
    >
      View All Collections
      <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-50 transition-all">
        <ChevronLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
      </div>
    </Link>
  </div>
);

const NewestProduct = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios("https://apitak.ir/electroshahr/getProducts.php")
      .then((res) => {
        if (Array.isArray(res.data)) setData(res.data.slice(0, 8));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-[#fcfcfd] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeader
          title="جدیدترین‌های الکتروشهر"
          linkHref="/new-arrivals"
        />

        <div className="relative group/slider">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-4/5 bg-slate-100 rounded-[2.5rem] animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              slidesPerView={1}
              spaceBetween={24}
              loop={true}
              pagination={{ clickable: true, el: ".custom-pagination" }}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-14! overflow-visible!"
            >
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductCard {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <button className="swiper-prev absolute top-1/2 -left-6 md:-left-12 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center text-slate-800 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-blue-600 hover:text-white -translate-y-1/2 hidden lg:flex border border-slate-100">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-next absolute top-1/2 -right-6 md:-right-12 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center text-slate-800 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-blue-600 hover:text-white -translate-y-1/2 rotate-180 hidden lg:flex border border-slate-100">
            <ChevronLeft size={24} />
          </button>

          <div className="custom-pagination flex justify-center gap-2 mt-8"></div>
        </div>
      </div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-radius: 4px;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 30px;
          background: #2563eb;
        }
        .swiper-button-disabled {
          opacity: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default NewestProduct;
