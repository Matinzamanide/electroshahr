'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const InitialCategory = () => {
  const [isVisible, setIsVisible] = useState(false);

  const data = [
    {
      name: 'وسایل کمپینگ',
      src: '/camping1.png',
      // طبیعت: سبز جنگلی + خاکی
      gradient: 'from-emerald-600 to-amber-700',
      hoverGradient: 'hover:from-emerald-700 hover:to-amber-800',
      link: '/camping',
    },
    {
      name: 'گجت و دکوری',
      src: '/gadjet.png',
      // مدرن و رنگارنگ: نارنجی + فوشیا
      gradient: 'from-orange-500 to-fuchsia-600',
      hoverGradient: 'hover:from-orange-600 hover:to-fuchsia-700',
      link: '/Gadjets',
    },
    {
      name: 'آیفون تصویری',
      src: '/iphone.png',
      // فناوری و امنیت: آبی فولادی + خاکستری
      gradient: 'from-sky-600 to-slate-700',
      hoverGradient: 'hover:from-sky-700 hover:to-slate-800',
      link: '/video-door-bell',
    },
    {
      name: 'تجهیزات خورشیدی',
      src: '/solar.png',
      // انرژی خورشیدی: زرد + نارنجی
      gradient: 'from-yellow-400 to-orange-500',
      hoverGradient: 'hover:from-yellow-500 hover:to-orange-600',
      link: '/solar-equipment',
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-10">
            <span className="border-b-4 border-orange-500 pb-1">دسته‌بندی‌ محصولات</span> 
        </h2>
        <p className="text-md text-gray-600 max-w-2xl mx-auto">
          محصولات باکیفیت ما را در دسته‌بندی‌های متنوع کشف کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`group relative bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* گرادیان پس‌زمینه هاور */}
            <div
              className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${item.gradient} blur-md -z-10 scale-95 group-hover:scale-100`}
            />

            {/* تصویر با حلقه نور */}
            <div className="p-8 flex justify-center">
              <div
                className={`p-4 rounded-full bg-linear-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                <Image
                  width={80}
                  height={80}
                  src={item.src}
                  alt={item.name}
                  className="rounded-full object-cover w-16 h-16 drop-shadow-md"
                  unoptimized
                />
              </div>
            </div>

            {/* محتوا */}
            <div className="px-8 pb-8">
              <h3
                className={`text-xl font-bold mb-6 text-center transition-colors duration-300 ${
                  isVisible
                    ? 'text-gray-900 group-hover:text-white'
                    : 'text-gray-900'
                }`}
              >
                {item.name}
              </h3>

              <div className="overflow-hidden rounded-lg">
                <Link
                  href={item.link}
                  className={`block text-center py-3 font-medium rounded-xl text-white bg-linear-to-r ${item.gradient} ${item.hoverGradient} transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300`}
                >
                  مشاهده محصولات
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InitialCategory;