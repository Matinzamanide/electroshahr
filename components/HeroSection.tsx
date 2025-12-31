'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Zap, ShieldCheck, Cpu } from 'lucide-react';

const slides = [
  {
    src: 'https://rahabsanat.ir/wp-content/uploads/2025/03/motor-cooler.webp',
    title: 'نیروی محرکه صنایع ایران',
    subtitle: 'الکتروشهر اصفهان',
    description: 'تامین‌کننده برترین برندهای سیم و کابل با ضمانت رسمی و خدمات پس از فروش اختصاصی در الکتروشهر.',
    link: '/shop/motors',
    badge: 'تکنولوژی ۲۰۲۵',
    icon: <Zap className="text-yellow-400" size={20} />,
    color: 'from-blue-700'
  },
  {
    src: '/f.webp',
    title: 'هوشمندسازی جریان برق',
    subtitle: 'اینورتر و تابلو برق‌های تخصصی',
    description: 'کاهش مصرف انرژی و کنترل دقیق فرآیندها با نسل جدید درایوها و ملزومات برق صنعتی.',
    link: '/shop/industrial-elec',
    badge: 'بهینه و هوشمند',
    icon: <Cpu className="text-cyan-400" size={20} />,
    color: 'from-slate-800'
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  }, [
    (slider) => {
      let timeout: NodeJS.Timeout;
      const nextTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => slider.next(), 6000);
      };
      slider.on("created", nextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]);

  return (
    <section className="relative w-full max-w-[1500px] mx-auto px-4 md:px-8 mt-4" dir="rtl">
      <div className="relative group rounded-[2.5rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider h-[500px] md:h-[650px]">
          {slides.map((slide, index) => (
            <div key={index} className="keen-slider__slide relative flex items-center">
              <Image
                fill
                alt={slide.title}
                src={slide.src}
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-5000"
                priority={index === 0}
              />
              
              <div className={`absolute inset-0 bg-linear-to-l ${slide.color} via-slate-900/60 to-transparent`} />

              <div className="relative z-10 w-full px-6 md:px-24">
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <div className="max-w-2xl space-y-6">
                      
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold"
                      >
                        {slide.icon}
                        {slide.badge}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      >
                        <span className="text-blue-400 font-black text-xl mb-2 block">{slide.subtitle}</span>
                        <h2 className="text-4xl md:text-7xl font-[1000] text-white leading-[1.1] tracking-tighter">
                          {slide.title}
                        </h2>
                      </motion.div>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-slate-300 text-lg md:text-xl font-medium max-w-lg leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Link 
                          href={slide.link}
                          className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-blue-600 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] flex items-center gap-3"
                        >
                          مشاهده کالاهای برقی
                          <ArrowLeft size={22} />
                        </Link>
                        
                        <div className="hidden md:flex items-center gap-3 text-white/70 font-bold text-sm bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                           <ShieldCheck className="text-emerald-400" />
                           گارانتی معتبر زارع
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-8 bottom-8 flex gap-3 z-30">
          <button onClick={() => instanceRef.current?.prev()} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all group">
            <ChevronRight size={28} className="group-active:scale-90" />
          </button>
          <button onClick={() => instanceRef.current?.next()} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all group">
            <ChevronLeft size={28} className="group-active:scale-90" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-8 flex flex-col gap-3 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-1.5 transition-all duration-500 rounded-full ${
                currentSlide === idx ? 'h-12 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'h-3 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
// 'use client';

// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react'; // For custom navigation arrows

// // Define a type for your slide data for better type safety
// interface Slide {
//   src: string;
//   alt: string;
//   title?: string; // Optional title for the overlay
//   description?: string; // Optional description for the overlay
//   link?: string; // Optional link for the call-to-action button
//   buttonText?: string; // Optional button text
//   overlayColor?: string; // Optional overlay color (e.g., 'from-blue-500/30 to-blue-700/60')
// }

// const slides: Slide[] = [
//   {
//     src: '/motor-cooler.jpg',
//     alt: 'موتور کولر',
//     title: 'موتورهای کولر با کیفیت بالا',
//     description: 'برای خنکای بیشتر در تابستان، بهترین موتورهای کولر را انتخاب کنید.',
//     link: '/category/cooler-motor',
//     buttonText: 'مشاهده محصولات',
//     overlayColor: 'from-blue-500/30 to-blue-700/60',
//   },
//   {
//     src: 'https://www.eqm.co.nz/wp-content/uploads/STM-HIGH-TECH-RXO-2000x1000.jpg',
//     alt: 'گیربکس',
//     title: 'گیربکس‌های صنعتی و کشاورزی',
//     description: 'دقت، قدرت و دوام را با گیربکس‌های ما تجربه کنید.',
//     link: '/category/gearbox',
//     buttonText: 'کاتالوگ گیربکس',
//     overlayColor: 'from-green-500/30 to-green-700/60',
//   },
//   {
//     src: 'https://cdn.globalso.com/yesinmachinery/yans22.jpg',
//     alt: 'پمپ',
//     title: 'انواع پمپ‌های آب خانگی و صنعتی',
//     description: 'راه حل‌های کامل برای نیازهای آبیاری و انتقال مایعات شما.',
//     link: '/category/pumps',
//     buttonText: 'دیدن پمپ‌ها',
//     overlayColor: 'from-purple-500/30 to-purple-700/60',
//   },
// ];

// const HeroSection = () => {
//   const timer = useRef<NodeJS.Timeout | null>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);

//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       slides: { perView: 1 },
//       slideChanged(slider) {
//         setCurrentSlide(slider.track.details.rel);
//       },
//       created() {
//         setLoaded(true);
//       },
//     },
//     [
//       // Add plugins here if needed
//       (slider) => {
//         let timeout: ReturnType<typeof setTimeout>;
//         let mouseOver = false;
//         function clearNextTimeout() {
//           clearTimeout(timeout);
//         }
//         function nextTimeout() {
//           clearTimeout(timeout);
//           if (mouseOver) return;
//           timeout = setTimeout(() => {
//             slider.next();
//           }, 4000); // Autoplay delay
//         }
//         slider.on("created", () => {
//           slider.container.addEventListener("mouseover", () => {
//             mouseOver = true;
//             clearNextTimeout();
//           });
//           slider.container.addEventListener("mouseout", () => {
//             mouseOver = false;
//             nextTimeout();
//           });
//           nextTimeout();
//         });
//         slider.on("dragStarted", clearNextTimeout);
//         slider.on("animationEnded", nextTimeout);
//         slider.on("updated", nextTimeout);
//       },
//     ]
//   );

//   return (
//     <div className="w-full mx-auto mt-0 sm:mt-8 relative px-0 sm:px-4 lg:px-8"> {/* Adjusted width for fuller bleed */}
//       <div className="relative">
//         <div ref={sliderRef} className="keen-slider rounded-none sm:rounded-2xl overflow-hidden shadow-2xl"> {/* Removed direct overflow-hidden on Keen-Slider for rounded corners */}
//           {slides.map((slide, index) => (
//             <div key={index} className="keen-slider__slide relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
//               <Image
//                 src={slide.src}
//                 alt={slide.alt}
//                 fill
//                 priority={index === 0} // Prioritize loading the first image
//                 sizes="100vw" // Image will take full viewport width
//                 className="object-cover" // Ensure image covers the container
//               />
//               {/* Overlay for text readability */}
//               <div
//                 className={`absolute inset-0 bg-gradient-to-t ${slide.overlayColor || 'from-black/40 to-black/20'} flex flex-col justify-end p-6 md:p-12 text-white`}
//               >
//                 {slide.title && (
//                   <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-shadow-lg leading-tight">
//                     {slide.title}
//                   </h1>
//                 )}
//                 {slide.description && (
//                   <p className="text-base md:text-lg mb-6 max-w-xl text-shadow-md">
//                     {slide.description}
//                   </p>
//                 )}
//                 {slide.link && slide.buttonText && (
//                   <Link
//                     href={slide.link}
//                     className="w-fit px-8 py-3 bg-white text-blue-600 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
//                   >
//                     {slide.buttonText}
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Custom Navigation Arrows */}
//         {loaded && instanceRef.current && (
//           <>
//             <button
//               onClick={() => instanceRef.current?.prev()}
//               className="absolute top-1/2 -left-2 md:-left-8 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition-all duration-300 opacity-80 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex items-center justify-center"
//               aria-label="Previous slide"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" /> {/* Right arrow for RTL prev */}
//             </button>
//             <button
//               onClick={() => instanceRef.current?.next()}
//               className="absolute top-1/2 -right-2 md:-right-8 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition-all duration-300 opacity-80 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex items-center justify-center"
//               aria-label="Next slide"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" /> {/* Left arrow for RTL next */}
//             </button>
//           </>
//         )}
//       </div>

//       {/* Pagination Dots */}
//       {loaded && instanceRef.current && (
//         <div className="flex justify-center mt-6 gap-3">
//           {slides.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => instanceRef.current?.moveToIdx(idx)}
//               className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
//                 currentSlide === idx ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
//               }`}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeroSection;