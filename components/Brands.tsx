'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Award, ArrowLeft } from 'lucide-react';

const data = [
    { src: '/logo.png', brand: 'شاهچراغ',link:'/ProductBrands/موتوژن' },
  { src: '/modi.png', brand: 'مودی',link:'/ProductBrands/الکتروژن' },
  { src: '/veera.png', brand: 'ویرا الکتریک',link:'/ProductBrands/بهار پمپ' },
  { src: '/iran.png', brand: 'ایران الکتریک',link:'/ProductBrands/رایان پمپ' },
  { src: '/peyk.webp', brand: 'الکتروپیک',link:'/ProductBrands/HEDFIX' },
  { src: '/taba.png', brand: 'تابا',link:'/ProductBrands/PENTAX' },
  { src: '/suzuki.jpg', brand: 'سوزوکی',link:'/ProductBrands/ONYX' },
  { src: '/welion.png', brand: 'welion',link:'/ProductBrands/آبارا' },
  { src: 'https://apika.ir/images/apika2.svg', brand: 'آپیکا',link:'https://apika.ir/' },
//   { src: 'https://apika.ir/images/hachasou.png', brand: 'هاچاسو',link:'/ProductBrands/هاچاسو' },
];

const Brands = () => {
  const [loaded, setLoaded] = useState(false); // این state برای کاربرد خاصی در اینجا استفاده نشده، اما حفظ می‌شود.

  return (
    <section className="w-full py-16 bg-indigo-50">
      
      <div className="text-center mb-12 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-2 flex items-center justify-center gap-2">
            <Award size={30} className="text-orange-500"/>
            برندهای <span className="border-b-4 border-orange-500 pb-1">معتبر</span> همکار
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
            انتخاب ما کیفیت، اصالت و خدمات پس از فروش است.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4">
        {data.map((item, i) => (
          <Link
          href={item.link || '#'}
            key={i}
            className="group flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm 
                rounded-2xl border-2 border-transparent shadow-lg 
                hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/70 
                transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setLoaded(true)}
            aria-label={`مشاهده محصولات برند ${item.brand}`}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.brand}
                fill
                sizes="(max-width: 768px) 100px, 120px"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <h3 className="font-bold text-blue-800 text-center text-base md:text-lg group-hover:text-orange-600 transition-colors duration-300">
              {item.brand}
            </h3>
            
            <span className='text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1'>
                مشاهده محصولات <ArrowLeft size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="w-40 h-1 bg-linear-to-r from-blue-700 via-blue-500 to-orange-500 rounded-full shadow-lg"></div>
      </div>
    </section>
  );
};

export default Brands;
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Award, ArrowLeft, Zap } from 'lucide-react';

// const data = [
//   { src: 'https://apika.ir/images/Electrogen.png', brand: 'الکتروژن', link:'/ProductBrands/الکتروژن' },
//   { src: 'https://apika.ir/images/motogen.png', brand: 'موتوژن', link:'/ProductBrands/موتوژن' },
//   { src: 'https://apika.ir/images/bahar.png', brand: 'بهار پمپ', link:'/ProductBrands/بهار پمپ' },
//   { src: 'https://apika.ir/images/rayan.jpg', brand: 'رایان پمپ', link:'/ProductBrands/رایان پمپ' },
//   { src: 'https://apika.ir/images/hedfix.png', brand: 'هدفیکس', link:'/ProductBrands/HEDFIX' },
//   { src: 'https://apika.ir/images/PENTAX.png', brand: 'پنتاکس', link:'/ProductBrands/PENTAX' },
//   { src: 'https://apika.ir/images/onyx.png', brand: 'ONYX', link:'/ProductBrands/ONYX' },
//   { src: 'https://apika.ir/images/abara.png', brand: 'آبارا', link:'/ProductBrands/آبارا' },
//   { src: 'https://apika.ir/images/Danfoss.webp', brand: 'Danfoss', link:'/ProductBrands/Danfoss' },
//   { src: 'https://apika.ir/images/hachasou.png', brand: 'هاچاسو', link:'/ProductBrands/هاچاسو' },
// ];

// const Brands = () => {
//   return (
//     <section className="w-full py-16 md:py-24 bg-gray-900 overflow-hidden relative">
      
//       {/* پس‌زمینه گرادیان پنهان (برای جذابیت بصری) */}
//       <div className="absolute inset-0 bg-black/50" />
//       <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
//       <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
//       <div className="relative z-10 max-w-7xl mx-auto px-4">
        
//         {/* عنوان بخش - تم تیره */}
//         <div className="text-center mb-16 max-w-4xl mx-auto">
//             <p className='text-sm font-semibold text-orange-400 flex items-center justify-center gap-2 mb-2'>
//                 <Zap size={16} /> شرکای تجاری ما
//             </p>
//             <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
//                 <span className="text-orange-500">کیفیت</span> تضمین شده با برترین برندها
//             </h2>
//             <p className="text-gray-400 mt-4 text-lg">
//               همکاری با تولیدکنندگان معتبر، اصالت و دوام محصولات ما را تضمین می‌کند.
//             </p>
//         </div>

//         {/* شبکه برندها - کارت‌های Glassmorphism با انیمیشن ورود */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {data.map((item, i) => (
//                 <Link
//                     href={item.link || '#'}
//                     key={i}
//                     // کلاس‌های انیمیشن ورود
//                     className={`group flex flex-col items-center justify-center p-6 rounded-2xl border border-blue-600/30
//                         // افکت Glassmorphism تیره
//                         bg-white/5 backdrop-blur-lg shadow-xl shadow-black/30
//                         // انیمیشن هاور پیشرفته (scale, glow)
//                         transition-all duration-500 transform hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-orange-500/30
//                         // انیمیشن ورود: تاخیر بر اساس ایندکس
//                         animate-fadeInUp`}
//                     style={{ animationDelay: `${i * 100}ms` }}
//                     aria-label={`مشاهده محصولات برند ${item.brand}`}
//                 >
//                     {/* لوگو - انیمیشن Ken Burns (مقیاس‌پذیری آهسته) */}
//                     <div className="relative w-24 h-24 mb-4 flex items-center justify-center overflow-hidden rounded-full p-2 bg-white/10">
//                         <Image
//                             src={item.src}
//                             alt={item.brand}
//                             fill
//                             sizes="(max-width: 768px) 100px, 120px"
//                             className="object-contain animate-kenBurns transition-transform duration-700 group-hover:scale-125"
//                             loading="lazy"
//                         />
//                     </div>

//                     {/* نام برند */}
//                     <h3 className="font-bold text-gray-100 text-center text-lg group-hover:text-orange-500 transition-colors duration-300">
//                         {item.brand}
//                     </h3>
                    
//                     {/* دکمه کوچک مشاهده */}
//                     <span className='text-sm font-medium text-blue-400 mt-1 flex items-center gap-1 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:gap-2'>
//                         مشاهده محصولات <ArrowLeft size={16} />
//                     </span>
//                 </Link>
//             ))}
//         </div>

//         {/* دکمه CTA نهایی - با گرادیان پررنگ */}
//         <div className="text-center mt-16">
//             <Link href="/ProductBrands/all" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold px-8 py-4 rounded-full shadow-2xl shadow-blue-800/50 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105">
//                 <Award size={20} />
//                 مشاهده تمامی برندها
//             </Link>
//         </div>
//       </div>
      
//       {/* استایل‌های انیمیشن داخلی (CSS) */}
//       <style jsx global>{`
//         /* 1. انیمیشن Ken Burns برای لوگو */
//         @keyframes kenBurns {
//           from { transform: scale(1); }
//           to { transform: scale(1.05); }
//         }
//         .animate-kenBurns {
//           animation: kenBurns 10s ease-in-out infinite alternate;
//         }
        
//         /* 2. انیمیشن FadeInUp (ورود کارت‌ها) */
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.5s ease-out forwards;
//           opacity: 0; /* حالت پیش‌فرض برای اجرای انیمیشن */
//         }

//         /* 3. انیمیشن Blob (پس‌زمینه پویای رنگی) */
//         @keyframes blob {
//           0% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0, 0) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </section>
//   );
// };

// export default Brands;