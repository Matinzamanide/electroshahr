'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Lightbulb, Zap, Factory, Cable, Box, RotateCw, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

// تابع کمکی برای نگاشت آیکون‌ها
const iconMapping = {
  'آویز و لوستر': Lightbulb,
  'پروژکتور': Zap, // برای نور قوی
  'اینورتر': RotateCw, // نماد تبدیل جریان
  'سیم و کابل': Cable,
  'ست کنترل': Settings, // نماد کنترل و تنظیمات
  'تابلو برق': Box, // اگر بخواهید اضافه کنید
};

// نگاشت رنگ‌ها به پالت برندینگ شما (آبی تیره و نارنجی)
const colorMapping = [
    { name: 'آویز و لوستر', color: 'from-blue-600 to-cyan-500', iconColor: 'text-cyan-200' },
    { name: 'پروژکتور', color: 'from-orange-600 to-amber-500', iconColor: 'text-amber-200' }, // استفاده از نارنجی تاکیدی
    { name: 'اینورتر', color: 'from-indigo-600 to-purple-500', iconColor: 'text-purple-200' },
    { name: 'سیم و کابل', color: 'from-blue-700 to-blue-500', iconColor: 'text-blue-200' }, // رنگ اصلی برند
    { name: 'ست کنترل', color: 'from-gray-700 to-gray-500', iconColor: 'text-gray-200' },
];


const MainCategory = () => {

  const categories = [
    {
      title: 'آویز و لوستر',
      href: '/HouseholdPump',
      src: '/Aviz1.png',
      icon: iconMapping['آویز و لوستر'],
    },
    {
      title: 'پروژکتور',
      href: '/product-category/mechanical-seal/',
      src: '/projector.png',
      icon: iconMapping['پروژکتور'],
    },
    {
      title: 'اینورتر',
      href: '/ExpansionSource',
      src: '/invert.png',
      icon: iconMapping['اینورتر'],
    },
    {
      title: 'سیم و کابل',
      href: '/Cooler',
      src: '/cable.png',
      icon: iconMapping['سیم و کابل'],
    },
    // {
    //   title: 'ست کنترل',
    //   href: '/SetControl',
    //   src: 'https://rahabsanat.ir/wp-content/uploads/2025/03/control-set.webp',
    //   icon: iconMapping['ست کنترل'],
    // },
  ];

  // ادغام داده‌ها برای داشتن رنگ و آیکون در یک شیء
  const combinedCategories = categories.map(cat => {
      const colorData = colorMapping.find(c => c.name === cat.title);
      return {
          ...cat,
          color: colorData ? colorData.color : 'from-blue-500 to-blue-400', // رنگ پیش‌فرض
          iconColor: colorData ? colorData.iconColor : 'text-blue-200' // رنگ پیش‌فرض
      };
  });


  return (
    <section className="container mx-auto px-4 py-10 my-10 mb-20 md:py-16">
        {/* عنوان بخش */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-10">
            <span className="border-b-4 border-orange-500 pb-1">دسته‌بندی‌های اصلی</span> برق
        </h2>

        {/* Grid اصلی دسته‌بندی‌ها */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {combinedCategories.map((cat, index) => {
                const IconComponent = cat.icon;
                
                return (
                    <Link
                        key={index}
                        href={cat.href}
                        className={`group relative overflow-hidden flex flex-col items-center p-4 pt-8 md:p-6 rounded-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl text-white min-h-[220px] 
                            bg-linear-to-br ${cat.color}` // استفاده از گرادیانت رنگی
                        }
                    >
                        {/* آیکون بزرگ در پس‌زمینه (برای زیبایی) */}
                        <div className="absolute top-0 right-0 p-3 opacity-20 transition-transform duration-500 group-hover:rotate-12 group-hover:opacity-30">
                            {IconComponent && <IconComponent size={96} className={cat.iconColor} />}
                        </div>

                        {/* تصویر محصول */}
                        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 relative z-10">
                            <Image 
                                src={cat.src} 
                                alt={cat.title} 
                                layout="fill" 
                                objectFit="contain"
                                className="transition-transform duration-500 group-hover:rotate-[-5deg]"
                            />
                        </div>

                        {/* عنوان دسته */}
                        <h3 className="text-lg md:text-xl font-extrabold text-center mt-auto z-10 transition-colors duration-300">
                            {cat.title}
                        </h3>
                        
                        {/* نوار تاکید Hover */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                );
            })}
        </div>
    </section>
  );
};

export default MainCategory;