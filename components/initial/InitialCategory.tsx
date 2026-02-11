import Image from 'next/image';
import Link from 'next/link';

const InitialCategory = () => {
  const data = [
    {
      name: 'وسایل کمپینگ',
      src: '/camping1.png',
      gradient: 'from-emerald-600 to-amber-700',
      hoverGradient: 'hover:from-emerald-700 hover:to-amber-800',
      link: '/lavazem-camping',
    },
    {
      name: 'گجت و دکوری',
      src: '/Gadjet.png',
      gradient: 'from-orange-500 to-fuchsia-600',
      hoverGradient: 'hover:from-orange-600 hover:to-fuchsia-700',
      link: '/gadget-decori',
    },
    {
      name: 'آیفون تصویری',
      src: '/iphone.png',
      gradient: 'from-sky-600 to-slate-700',
      hoverGradient: 'hover:from-sky-700 hover:to-slate-800',
      link: '/iphone',
    },
    {
      name: 'تجهیزات خورشیدی',
      src: '/solar.png',
      gradient: 'from-yellow-400 to-orange-500',
      hoverGradient: 'hover:from-yellow-500 hover:to-orange-600',
      link: '/tajhizat-khorshidi',
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10">
          <span className="border-b-4 border-orange-500 pb-1">
            دسته‌بندی‌ محصولات
          </span>
        </h2>
        <p className="text-md text-gray-600 max-w-2xl mx-auto">
          محصولات باکیفیت ما را در دسته‌بندی‌های متنوع کشف کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fade-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* گرادیانت hover */}
            <div
              className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${item.gradient} blur-md -z-10 scale-95 group-hover:scale-100`}
            />

            <div className="p-8 flex justify-center">
              <div
                className={`p-4 rounded-full bg-linear-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 object-cover drop-shadow-md"
                  unoptimized
                />
              </div>
            </div>

            <div className="px-8 pb-8">
              <h3 className="text-xl font-bold mb-6 text-center text-gray-900 group-hover:text-white transition-colors duration-300">
                {item.name}
              </h3>

              <Link
                href={item.link}
                className={`block text-center py-3 font-medium rounded-xl text-white bg-linear-to-r ${item.gradient} ${item.hoverGradient} transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300`}
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* animation */}
      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default InitialCategory;




// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { ChevronLeft, ArrowUpRight } from 'lucide-react';

// const InitialCategory = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const data = [
//     {
//       name: 'وسایل کمپینگ',
//       desc: 'تجهیزات حرفه‌ای بقا در طبیعت',
//       src: '/camping1.png',
//       gradient: 'from-[#059669] to-[#10b981]',
//       accent: 'bg-emerald-500/10',
//       link: '/lavazem-camping',
//     },
//     {
//       name: 'گجت و دکوری',
//       desc: 'دنیای تکنولوژی و زیبایی خانه',
//       src: '/Gadjet.png',
//       gradient: 'from-[#f43f5e] to-[#fb7185]',
//       accent: 'bg-rose-500/10',
//       link: '/gadget-decori',
//     },
//     {
//       name: 'آیفون تصویری',
//       desc: 'امنیت هوشمند برای خانه شما',
//       src: '/iphone.png',
//       gradient: 'from-[#2563eb] to-[#3b82f6]',
//       accent: 'bg-blue-500/10',
//       link: '/iphone',
//     },
//     {
//       name: 'تجهیزات خورشیدی',
//       desc: 'انرژی پاک برای آینده روشن',
//       src: '/solar.png',
//       gradient: 'from-[#f59e0b] to-[#fbbf24]',
//       accent: 'bg-amber-500/10',
//       link: '/tajhizat-khorshidi',
//     },
//   ];

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <section className="py-24 bg-[#fcfcfd] overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div className="space-y-4">
//             <span className="text-blue-600 font-black tracking-[0.2em] uppercase text-xs">Explore Collections</span>
//             <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
//               ویترین <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">دسته‌بندی‌ها</span>
//             </h2>
//           </div>
//           <p className="text-slate-500 font-medium max-w-sm leading-relaxed border-r-2 border-slate-200 pr-4">
//             گلچینی از بهترین محصولات بازار را در دسته‌بندی‌های تخصصی ما دنبال کنید.
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {data.map((item, index) => (
//             <Link
//               key={index}
//               href={item.link}
//               className={`group relative h-[420px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${
//                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//               }`}
//               style={{ transitionDelay: `${index * 150}ms` }}
//             >
//               {/* Background Layer */}
//               <div className="absolute inset-0 bg-white border border-slate-100 group-hover:border-transparent transition-colors duration-500" />
              
//               {/* Hover Gradient Overlay */}
//               <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

//               {/* Decorative Number */}
//               <span className="absolute top-8 left-8 text-7xl font-black text-slate-50 group-hover:text-white/10 transition-colors duration-500">
//                 0{index + 1}
//               </span>

//               {/* Content Container */}
//               <div className="relative h-full flex flex-col items-center justify-between p-10 z-10">
                
//                 {/* Floating Image Wrapper */}
//                 <div className="relative w-full aspect-square flex items-center justify-center">
//                   <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${item.accent}`} />
//                   <div className="relative transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out">
//                     <Image
//                       width={180}
//                       height={180}
//                       src={item.src}
//                       alt={item.name}
//                       className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]"
//                     />
//                   </div>
//                 </div>

//                 {/* Text Info */}
//                 <div className="text-center space-y-2">
//                   <h3 className="text-2xl font-black text-slate-800 group-hover:text-white transition-colors duration-500">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-slate-400 group-hover:text-white/80 transition-colors duration-500 font-medium">
//                     {item.desc}
//                   </p>
//                 </div>

//                 {/* Elegant Action Button */}
//                 <div className="mt-6 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 group-hover:bg-white text-white group-hover:text-slate-900 transition-all duration-500 shadow-xl">
//                   <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                 </div>
//               </div>

//               {/* Shine Effect on Hover */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-white via-transparent to-transparent transition-opacity duration-700" />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InitialCategory;