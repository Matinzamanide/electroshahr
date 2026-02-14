// import Image from 'next/image';
// import Link from 'next/link';
// // آیکون‌های جدید اضافه شده: مینیاتوری (ShieldCheck)، کلید و پریز (SquareStack)، هالوژن (Sun)
// import { Lightbulb, Zap, Cable, Box, RotateCw, Settings, SquareStack, Sun, ShieldCheck } from 'lucide-react';

import CategoryGridClient from "./CategoryGridClient";

// const iconMapping = {
//   'روشنایی': Lightbulb,
//   'پروژکتور': Zap, 
//   'اینورتر': RotateCw, 
//   'سیم و کابل': Cable,
//   'ست کنترل': Settings, 
//   'تابلو برق': Box,
//   'کلید و پریز': SquareStack,
//   'هالوژن و سقفی': Sun,
//   'مینیاتوری': ShieldCheck,
// };

// const colorMapping = [
//     { name: 'روشنایی', color: 'from-blue-600 to-cyan-500', iconColor: 'text-cyan-200' },
//     { name: 'پروژکتور', color: 'from-orange-600 to-amber-500', iconColor: 'text-amber-200' },
//     { name: 'اینورتر', color: 'from-indigo-600 to-purple-500', iconColor: 'text-purple-200' },
//     { name: 'سیم و کابل', color: 'from-blue-700 to-blue-500', iconColor: 'text-blue-200' },
//     { name: 'کلید و پریز', color: 'from-emerald-600 to-teal-500', iconColor: 'text-emerald-200' },
//     { name: 'هالوژن و سقفی', color: 'from-rose-600 to-pink-500', iconColor: 'text-rose-200' },
//     { name: 'مینیاتوری', color: 'from-yellow-700 to-yellow-500', iconColor: 'text-yellow-200' },
// ];

// const MainCategory = () => {
//   const categories = [
//     {
//       title: 'روشنایی',
//       href: '/aviz-looster',
//       src: '/Aviz1.png',
//       icon: iconMapping['روشنایی'],
//     },
//     {
//       title: 'پروژکتور',
//       href: '/projector',
//       src: '/projector.png',
//       icon: iconMapping['پروژکتور'],
//     },
//     {
//       title: 'اینورتر',
//       href: '/inverter',
//       src: '/invert.png',
//       icon: iconMapping['اینورتر'],
//     },
//     {
//       title: 'سیم و کابل',
//       href: '/sim-cable',
//       src: '/cable.png',
//       icon: iconMapping['سیم و کابل'],
//     },
//     {
//       title: 'کلید و پریز',
//       href: '/klid-priz', 
//       src: '/klid.png', 
//       icon: iconMapping['کلید و پریز'],
//     },
//     {
//       title: 'هالوژن و سقفی',
//       href: '/halogen', 
//       src: '/halogen.png', 
//       icon: iconMapping['هالوژن و سقفی'],
//     },
//     {
//       title: 'مینیاتوری',
//       href: '/miniature', 
//       src: '/miniature.png',
//       icon: iconMapping['مینیاتوری'],
//     },
//   ];

//   const combinedCategories = categories.map(cat => {
//       const colorData = colorMapping.find(c => c.name === cat.title);
//       return {
//           ...cat,
//           color: colorData ? colorData.color : 'from-slate-600 to-slate-500', 
//           iconColor: colorData ? colorData.iconColor : 'text-slate-200' 
//       };
//   });

//   return (
//     <section className="container mx-auto px-4 py-10 my-10 mb-20 md:py-16">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-10">
//             <span className="border-b-4 border-orange-500 pb-1">دسته‌بندی‌های اصلی</span> برق
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {combinedCategories.map((cat, index) => {
//                 const IconComponent = cat.icon;
                
//                 return (
//                     <Link
//                         key={index}
//                         href={cat.href}
//                         className={`group relative overflow-hidden flex flex-col items-center p-4 pt-8 md:p-6 rounded-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl text-white min-h-[220px] 
//                             bg-linear-to-br ${cat.color}` // در نسخه‌های قدیمی‌تر جایگزین bg-linear-to-br شد
//                         }
//                     >
//                         <div className="absolute top-0 right-0 p-3 opacity-20 transition-transform duration-500 group-hover:rotate-12 group-hover:opacity-30">
//                             {IconComponent && <IconComponent size={96} className={cat.iconColor} />}
//                         </div>

//                         <div className="w-24 h-24 md:w-32 md:h-32 mb-4 relative z-10">
//                             <Image 
//                                 src={cat.src} 
//                                 alt={cat.title} 
//                                 layout="fill" 
//                                 objectFit="contain"
//                                 className="transition-transform duration-500 group-hover:rotate-[-5deg]"
//                             />
//                         </div>

//                         <h3 className="text-lg md:text-xl font-extrabold text-center mt-auto z-10 transition-colors duration-300">
//                             {cat.title}
//                         </h3>
                        
//                         <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                     </Link>
//                 );
//             })}
//         </div>
//     </section>
//   );
// };

// export default MainCategory;
// CategoryGrid.tsx  (Server Component)


const categories = [
  {
    title: 'روشنایی',
    href: '/aviz-looster',
    src: '/Aviz1.png',
    description: 'آویز، لوستر و چراغ‌های تزئینی',
    featured: true,
    products: 1250,
    sparkleColor: '#FFD700'
  },
  {
    title: 'پروژکتور',
    href: '/projector',
    src: '/projector.png',
    description: 'پروژکتورهای حرفه‌ای و خانگی',
    featured: true,
    products: 850,
    sparkleColor: '#4DA6FF'
  },
  {
    title: 'اینورتر',
    href: '/inverter',
    src: '/invert.png',
    description: 'اینورترهای با کیفیت و پرکاربرد',
    featured: false,
    products: 320,
    sparkleColor: '#FFC107'
  },
  {
    title: 'سیم و کابل',
    href: '/sim-cable',
    src: '/cable.png',
    description: 'انواع سیم و کابل برق و دیتا',
    featured: false,
    products: 2100,
    sparkleColor: '#28A745'
  },
  {
    title: 'کلید و پریز',
    href: '/klid-priz',
    src: '/klid.png',
    description: 'کلید و پریز‌های مدرن و ایمن',
    featured: true,
    products: 1850,
    sparkleColor: '#6F42C1'
  },
  {
    title: 'هالوژن و سقفی',
    href: '/halogen',
    src: '/halogen.png',
    description: 'چراغ‌های هالوژن و نورپردازی سقف',
    featured: false,
    products: 980,
    sparkleColor: '#E83E8C'
  },
  {
    title: 'مینیاتوری',
    href: '/miniature',
    src: '/miniature.png',
    description: 'فیوزها و کلیدهای مینیاتوری',
    featured: false,
    products: 760,
    sparkleColor: '#D63384'
  },
];

export default function CategoryGrid() {
  return <CategoryGridClient/>;
}
