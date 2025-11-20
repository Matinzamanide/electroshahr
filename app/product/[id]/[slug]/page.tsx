// "use client";

// import { useEffect, useState } from "react";

// interface Product {
//   id: string;
//   title: string;
//   slug: string;
//   url: string;
//   images: string[];
//   categories: string[];
//   features: Record<string, any>[];
// }

// interface Props {
//   params: { id: string; slug: string };
// }

// export default function ProductClient({ params }: Props) {
//   const { id, slug } = params;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [mainImage, setMainImage] = useState<string>("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const encodedSlug = encodeURIComponent(slug);
//         const res = await fetch(
//           `http://localhost/electroshahr/getProducts.php?id=${id}&slug=${encodedSlug}`
//         );
//         const data: Product = await res.json();
//         setProduct(data);
//         if (data.images?.length > 0) setMainImage(data.images[0]);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [id, slug]);

//   if (!product) return <div className="p-8 text-center">در حال بارگذاری...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* عنوان */}
//       <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* بخش تصاویر */}
//         <div className="md:w-1/2 flex flex-col items-center">
//           <img
//             src={mainImage}
//             alt={product.title}
//             className="w-full h-auto rounded-lg object-cover border mb-4 shadow-sm"
//           />

//           {product.images?.length > 1 && (
//             <div className="flex gap-2 overflow-x-auto mt-2">
//               {product.images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`${product.title} ${idx + 1}`}
//                   className="w-20 h-20 object-cover rounded-lg border hover:border-blue-500 cursor-pointer transition"
//                   onClick={() => setMainImage(img)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* بخش جزئیات */}
//         <div className="md:w-1/2 flex flex-col gap-4">
//           {/* دسته‌بندی */}
//           {product.categories?.length > 0 && (
//             <p className="text-sm text-gray-500">
//               دسته‌بندی: {product.categories.join(", ")}
//             </p>
//           )}

//           {/* ویژگی‌ها */}
//           {product.features?.length > 0 && (
//             <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
//               <h2 className="font-semibold mb-2">ویژگی‌ها</h2>
//               <ul className="list-disc list-inside text-gray-700">
//                 {product.features.map((f, idx) => (
//                   <li key={idx}>
//                     {Object.entries(f)
//                       .map(([k, v]) => `${k}: ${v}`)
//                       .join(", ")}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* دکمه خرید */}
//           <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
//             افزودن به سبد خرید
//           </button>
//         </div>
//       </div>

//       {/* توضیحات / اطلاعات بیشتر */}
//       <div className="mt-8 bg-gray-50 p-6 rounded-lg border shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">توضیحات محصول</h2>
//         <p className="text-gray-700">
//           این بخش می‌تواند شامل توضیحات طولانی محصول، مشخصات فنی و نکات مهم
//           برای خریدار باشد.
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Check,
  Tag,
  Zap,
  ChevronLeft,
  Loader2,
  X,
  Lightbulb,
} from "lucide-react";
import { features } from "process";

interface Product {
  id: string;
  title: string;
  price: number;
  before_discount_price: number; // فرض می‌کنیم این فیلد وجود دارد
  inventory: number; // فرض می‌کنیم این فیلد وجود دارد
  brand: string; // فرض می‌کنیم این فیلد وجود دارد
  description: string; // فرض می‌کنیم این فیلد وجود دارد
  slug: string;
  url: string;
  images: string[];
  categories: string[];
  features: Record<string, any>[];
}

const API_BASE_URL = "https://apika.ir/electroshahr";

export default function ProductClient({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  // 1. دریافت ID و Slug از Promise با استفاده از use()
  const { id, slug } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "reviews"
  >("description");

  // 2. Client-side Data Fetching
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const encodedSlug = encodeURIComponent(slug);

    fetch(`${API_BASE_URL}/getProducts.php?id=${id}&url=${encodedSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("خطای شبکه یا سرور");
        return res.json();
      })
      .then((data) => {
        // فرض می‌کنیم API یک آرایه برمی‌گرداند و ما عنصر اول را نیاز داریم
        const finalProduct: Product = Array.isArray(data) ? data[0] : data;

        if (!finalProduct) throw new Error("محصولی با این شناسه پیدا نشد.");

        setProduct(finalProduct);
        setMainImage(finalProduct.images[0] || "");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "خطا در بارگذاری اطلاعات محصول.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, slug]);

  // ------------------- مدیریت وضعیت‌های Loading و Error -------------------
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
        <p className="mr-3 text-lg font-medium text-blue-700">
          در حال بارگذاری اطلاعات محصول...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-50 p-6 rounded-xl border border-red-300 max-w-xl mx-auto my-10">
        <X size={32} className="text-red-600 mb-3" />
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          خطا در بارگذاری
        </h2>
        <p className="text-gray-700 text-center">{error}</p>
      </div>
    );
  }

  if (!product) return null; // نباید به اینجا برسیم اگر خطا مدیریت شده باشد

  // ------------------ محاسبات و محتوای تب‌ها ------------------
  const discountPercentage = product.before_discount_price
    ? Math.round(
        ((product.before_discount_price - product.price) /
          product.before_discount_price) *
          100
      )
    : 0;
  const isAvailable = product.inventory > 0;

  const tabs = [
    {
      id: "description",
      name: "توضیحات کامل",
      content: product.description || "توضیحاتی برای این محصول ثبت نشده است.",
    },
    {
      id: "features",
      name: "مشخصات فنی",
      content: (
        <ul className="list-none space-y-3">
          {product.features.map((feature: any, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700">
              <Check size={20} className="text-blue-600 shrink-0 mt-1" />
              {feature}
            </li>
          ))}
        </ul>
      ),
    }
  ];

  // ------------------ رندر UI/UX خفن ------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* مسیر ناوبری (Breadcrumb) */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          خانه
        </Link>
        <ChevronLeft size={16} className="mx-2" />
        <Link
          href={`/products/${product.categories[0]}`}
          className="hover:text-blue-600"
        >
          {product.categories[0]}
        </Link>
        <ChevronLeft size={16} className="mx-2" />
        <span className="text-gray-800 font-medium">{product.title}</span>
      </div>

      {/* بخش اصلی محصول (گالری و اطلاعات اولیه) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-6 lg:p-10 border border-gray-100">
        {/* ستون چپ: گالری تصاویر */}
        <div className="flex flex-col gap-6">
          <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={mainImage}
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
          {/* تصاویر کوچک Thumbnail */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                  mainImage === img
                    ? "border-orange-600 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`تصویر ${index + 1}`}
                  width={80}
                  height={80}
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ستون راست: اطلاعات محصول و اکشن‌ها */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-blue-900 leading-snug">
            {product.title}
          </h1>

          <div className="flex items-center text-sm text-gray-600 gap-4 border-b pb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
              <Tag size={18} className="text-gray-600" />
              <span className="font-semibold text-gray-700">برند:</span>
              <span className="text-gray-800">{product.brand}</span>
            </div>


            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {product.categories?.map((cat: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-all duration-150"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* قیمت گذاری */}
          <div className="flex flex-col gap-2 bg-blue-50/50 rounded-xl p-5 border border-blue-100">
            <p className="text-base text-gray-500 line-through font-sans">
              {Number(product.before_discount_price).toLocaleString()} تومان
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-orange-600 font-sans">
                {Number(product.price).toLocaleString()} تومان
              </span>
              {discountPercentage > 0 && (
                <span className="bg-orange-600 text-white text-lg font-bold px-3 py-1 rounded-lg">
                  %{discountPercentage} تخفیف
                </span>
              )}
            </div>
          </div>

          {/* موجودی و ویژگی‌های سریع */}
          <div className="flex items-center gap-4 text-base font-medium">
            <p
              className={`flex items-center gap-1 ${
                isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {isAvailable ? <Check size={20} /> : <X size={20} />}
              {isAvailable
                ? `موجود در انبار (${product.inventory} عدد)`
                : "ناموجود"}
            </p>
            {product.features[0] && (
              <p className="flex items-center gap-1 text-blue-700">
                <Zap size={18} />
              </p>
            )}
          </div>

          {/* دکمه‌های اکشن */}
          <div className="flex gap-4 mt-4">
          <button
              disabled={!isAvailable}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-white font-bold transition-all duration-300 shadow-md
              ${
                isAvailable
                  ? "bg-linear-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={20} />
              {isAvailable ? "افزودن به سبد خرید" : "اطلاع از موجودی"}
            </button>
          
          </div>
        </div>
      </div>

      {/* بخش پایین: تب‌های توضیحات و مشخصات */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        {/* نوار تب‌ها */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as "description" | "features" | "reviews")
              }
              className={`px-6 py-3 text-lg font-bold transition-all duration-300 
                                ${
                                  activeTab === tab.id
                                    ? "text-blue-800 border-b-4 border-orange-600"
                                    : "text-gray-600 hover:text-blue-600"
                                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* محتوای تب فعال */}
        <div className="py-4 leading-loose text-gray-700">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>

      {/* باکس Call-to-Action یا بنر اضافی */}
      <div className="mt-10 p-5 bg-orange-50 border-r-4 border-orange-600 rounded-xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Lightbulb size={32} className="text-orange-600 shrink-0" />
          <p className="text-lg font-medium text-gray-800">
            سؤالات متداول در مورد این محصول؟{" "}
            <span className="font-bold text-blue-900">با ما تماس بگیرید.</span>
          </p>
        </div>
        <Link
          href="/contact"
          className="text-blue-700 font-bold hover:underline"
        >
          تماس با پشتیبانی →
        </Link>
      </div>
    </div>
  );
}
