'use client';

import React, { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Heart, Check, X, Tag, Zap, ChevronLeft, Lightbulb } from 'lucide-react';

// تعریف نوع داده برای محصول
interface Product {
    id: string;
    title: string;
    price: number;
    before_discount_price: number;
    inventory: number;
    brand: string;
    description: string;
    images: string[];
    categories: string[];
    features: string[];
}

// داده محصول دریافتی
const productData: Product = {
    "id": "1",
    "title": "چراغ خواب سیلیکونی مدل اسب شاخدار",
    "price": 250000,
    "before_discount_price": 500000,
    "inventory": 20,
    "brand": "HajMatin",
    "description": "چراغ خواب سیلیکونی اسب شاخدار یک هدیه فوق‌العاده و جذاب برای اتاق کودکان است. این چراغ با قابلیت تغییر رنگ، فضای دلنشین و آرامش‌بخشی ایجاد می‌کند. جنس بدنه از سیلیکون مرغوب و مقاوم در برابر ضربه ساخته شده و کاملاً ایمن است. با یک بار شارژ کامل، می‌توانید تا ۱۰ ساعت از نوردهی آن استفاده کنید.",
    "images": [
      "https://zamanigallerry.ir/uploads/products/672746.jpg?m=thumb&w=640&h=640&q=high",
      // می‌توانید تصاویر بیشتری اضافه کنید
    ],
    "categories": [
      "گجت و دکوری"
    ],
    "features": [
      "شارژی",
      "جنس سیلیکون مقاوم",
      "قابلیت تغییر رنگ (RGB)",
      "نوردهی ۱۰ ساعته",
      "تکنولوژی LED کم مصرف"
    ]
};

// کامپوننت اصلی صفحه محصول
const ProductDetailPage: FC = () => {
    const [mainImage, setMainImage] = useState(productData.images[0]);
    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');
    const discountPercentage = Math.round(((productData.before_discount_price - productData.price) / productData.before_discount_price) * 100);
    const isAvailable = productData.inventory > 0;

    const tabs = [
        { id: 'description', name: 'توضیحات کامل', content: productData.description },
        { id: 'features', name: 'مشخصات فنی', content: (
            <ul className="list-none space-y-3">
                {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                        <Check size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                        {feature}
                    </li>
                ))}
            </ul>
        )},
        { id: 'reviews', name: 'نقد و بررسی‌ها (0)', content: <p className="text-gray-600">هنوز نقد و بررسی‌ای برای این محصول ثبت نشده است. شما اولین نفر باشید!</p> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* مسیر ناوبری (Breadcrumb) */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-blue-600">خانه</Link>
                <ChevronLeft size={16} className="mx-2" />
                <Link href={`/products/${productData.categories[0]}`} className="hover:text-blue-600">{productData.categories[0]}</Link>
                <ChevronLeft size={16} className="mx-2" />
                <span className="text-gray-800 font-medium">{productData.title}</span>
            </div>

            {/* بخش اصلی محصول (گالری و اطلاعات اولیه) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-6 lg:p-10 border border-gray-100">
                
                {/* ستون چپ: گالری تصاویر */}
                <div className="flex flex-col gap-6">
                    <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        <Image
                            src={mainImage}
                            alt={productData.title}
                            layout="fill"
                            objectFit="contain"
                            className="transition-transform duration-500 hover:scale-105"
                            priority
                        />
                    </div>
                    {/* تصاویر کوچک Thumbnail */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {productData.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                                    mainImage === img ? 'border-orange-600 shadow-md' : 'border-gray-200 hover:border-blue-300'
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
                        {productData.title}
                    </h1>

                    <div className="flex items-center text-sm text-gray-600 gap-4 border-b pb-4">
                        <p className="flex items-center gap-1">
                            <Tag size={16} className="text-blue-600" />
                            **برند:** <span className="font-bold text-blue-800">{productData.brand}</span>
                        </p>
                        <p className="flex items-center gap-1">
                            <Star size={16} className="text-orange-400 fill-orange-400" />
                            <span className="font-bold text-gray-800">4.8</span> (120 نظر)
                        </p>
                    </div>

                    {/* قیمت گذاری */}
                    <div className="flex flex-col gap-2 bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                        <p className="text-base text-gray-500 line-through font-sans">
                            {productData.before_discount_price.toLocaleString()} تومان
                        </p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-extrabold text-orange-600 font-sans">
                                {productData.price.toLocaleString()} تومان
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
                        <p className={`flex items-center gap-1 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {isAvailable ? <Check size={20} /> : <X size={20} />}
                            {isAvailable ? `موجود در انبار (${productData.inventory} عدد)` : 'ناموجود'}
                        </p>
                        {productData.features[0] && (
                            <p className="flex items-center gap-1 text-blue-700">
                                <Zap size={18} />
                                {productData.features[0]}
                            </p>
                        )}
                    </div>
                    
                    {/* دکمه‌های اکشن */}
                    <div className="flex gap-4 mt-4">
                        <button
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-extrabold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg
                                ${isAvailable 
                                    ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-orange-600 hover:to-orange-700 shadow-blue-500/50 hover:shadow-orange-500/50' 
                                    : 'bg-gray-400 cursor-not-allowed shadow-none'
                                }`}
                            disabled={!isAvailable}
                        >
                            <ShoppingCart size={22} />
                            {isAvailable ? 'افزودن به سبد خرید' : 'اطلاع از موجودی'}
                        </button>
                        <button
                            title="افزودن به علاقه‌مندی‌ها"
                            className="p-4 rounded-xl border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors duration-300 shadow-md"
                        >
                            <Heart size={24} />
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
                            onClick={() => setActiveTab(tab.id as 'description' | 'features' | 'reviews')}
                            className={`px-6 py-3 text-lg font-bold transition-all duration-300 
                                ${activeTab === tab.id 
                                    ? 'text-blue-800 border-b-4 border-orange-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* محتوای تب فعال */}
                <div className="py-4 leading-loose text-gray-700">
                    {tabs.find(tab => tab.id === activeTab)?.content}
                </div>
            </div>
            
            {/* باکس Call-to-Action یا بنر اضافی */}
            <div className="mt-10 p-5 bg-orange-50 border-r-4 border-orange-600 rounded-xl flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                    <Lightbulb size={32} className="text-orange-600 flex-shrink-0" />
                    <p className="text-lg font-medium text-gray-800">
                        سؤالات متداول در مورد این محصول؟ <span className="font-bold text-blue-900">با ما تماس بگیرید.</span>
                    </p>
                </div>
                <Link href="/contact" className="text-blue-700 font-bold hover:underline">
                    تماس با پشتیبانی →
                </Link>
            </div>
        </div>
    );
};

export default ProductDetailPage;