'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const slides = [
    {
        src: '/f.webp',
        alt: 'گیربکس',
    },
    {
      src: 'https://rahabsanat.ir/wp-content/uploads/2025/03/motor-cooler.webp',
      alt: 'موتور کولر',
    },
 
];

const HeroSection = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // autoplay with pause on hover
  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    const startAutoPlay = () => {
      timer.current = setInterval(() => {
        slider.next();
      }, 4000);
    };

    const stopAutoPlay = () => {
      if (timer.current) clearInterval(timer.current);
    };

    startAutoPlay();

    const sliderEl = slider.container;
    sliderEl.addEventListener('mouseover', stopAutoPlay);
    sliderEl.addEventListener('mouseout', startAutoPlay);

    return () => {
      stopAutoPlay();
      sliderEl.removeEventListener('mouseover', stopAutoPlay);
      sliderEl.removeEventListener('mouseout', startAutoPlay);
    };
  }, [instanceRef]);

  return (
    <div className="w-[95%] mx-auto mt-8 relative">
      <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">

        {slides.map((slide, index) => (
          <div key={index} className="keen-slider__slide">
            <Link href="/">
              <Image
                width={1000}
                height={600}
                alt={slide.alt}
                src={slide.src}
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </Link>
          </div>
        ))}

      </div>

      {/* دات‌های پایین */}
      {loaded && (
        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-blue-800' : 'bg-gray-300'
              }`}
              aria-label={`رفتن به اسلاید ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
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