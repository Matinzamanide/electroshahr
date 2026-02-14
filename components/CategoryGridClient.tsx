"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { 
  Sparkle, 
  ChevronRight,
  Lightbulb,
  Tv,
  Zap,
  Cable,
  Plug,
  Sun,
  CircuitBoard,
  ArrowRight,
  Star,
  Flame,
  Crown,
  Gem
} from "lucide-react";
import Link from "next/link";

// داده‌های دسته‌بندی با جزئیات بیشتر
const categories = [
  {
    title: 'روشنایی',
    href: '/aviz-looster',
    src: '/Aviz1.png',
    icon: Lightbulb,
    gradient: 'from-amber-400 via-orange-500 to-amber-600',
    description: 'آویز، لوستر و چراغ‌های تزئینی',
    featured: true,
    products: 1250,
    sparkleColor: '#FFD700'
  },
  {
    title: 'پروژکتور',
    href: '/projector',
    src: '/projector.png',
    icon: Tv,
    gradient: 'from-blue-500 via-cyan-500 to-blue-700',
    description: 'پروژکتورهای حرفه‌ای و خانگی',
    featured: true,
    products: 850,
    sparkleColor: '#4DA6FF'
  },
  {
    title: 'اینورتر',
    href: '/inverter',
    src: '/invert.png',
    icon: Zap,
    gradient: 'from-yellow-400 via-amber-500 to-orange-700',
    description: 'اینورترهای با کیفیت و پرکاربرد',
    featured: false,
    products: 320,
    sparkleColor: '#FFC107'
  },
  {
    title: 'سیم و کابل',
    href: '/sim-cable',
    src: '/cable.png',
    icon: Cable,
    gradient: 'from-emerald-500 via-teal-500 to-green-700',
    description: 'انواع سیم و کابل برق و دیتا',
    featured: false,
    products: 2100,
    sparkleColor: '#28A745'
  },
  {
    title: 'کلید و پریز',
    href: '/klid-priz', 
    src: '/klid.png', 
    icon: Plug,
    gradient: 'from-indigo-500 via-purple-600 to-indigo-800',
    description: 'کلید و پریز‌های مدرن و ایمن',
    featured: true,
    products: 1850,
    sparkleColor: '#6F42C1'
  },
  {
    title: 'هالوژن و سقفی',
    href: '/halogen', 
    src: '/halogen.png', 
    icon: Sun,
    gradient: 'from-rose-400 via-pink-500 to-rose-700',
    description: 'چراغ‌های هالوژن و نورپردازی سقف',
    featured: false,
    products: 980,
    sparkleColor: '#E83E8C'
  },
  {
    title: 'مینیاتوری',
    href: '/miniature', 
    src: '/miniature.png',
    icon: CircuitBoard,
    gradient: 'from-fuchsia-500 via-purple-600 to-fuchsia-800',
    description: 'فیوزها و کلیدهای مینیاتوری',
    featured: false,
    products: 760,
    sparkleColor: '#D63384'
  },
];

const CategoryGrid = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    controls.start("visible");
    
    return () => {
      isMounted.current = false;
    };
  }, [controls]);

  const getTiltStyle = (el: HTMLElement | null) => {
    if (!el || !activeCategory) return { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' };
    
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (mousePosition.y - centerY) / 20;
    const rotateY = (centerX - mousePosition.x) / 20;
    
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    };
  };

  return (
    <section className="py-24 bg-linear-to-b from-gray-50 via-white to-gray-50 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,58,237,0.08),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_40%)]"></div>
      
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-linear-to-br from-indigo-300/30 to-purple-400/30 backdrop-blur-sm"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() > 0.5 ? 30 : -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center mb-12">
            <div className="relative">
              <div className="w-32 h-1 bg-linear-to-r from-amber-300 via-orange-400 to-amber-300 rounded-full shadow-lg"></div>
              <div className="absolute -top-3 -right-4 w-8 h-8 bg-linear-to-br from-amber-200 to-orange-300 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
              <div className="absolute -bottom-3 -left-4 w-6 h-6 bg-linear-to-br from-orange-200 to-amber-300 rounded-full border-4 border-white shadow-xl animate-pulse delay-200"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-amber-400 shadow-lg"></div>
            </div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", damping: 15 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 relative"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-500 via-orange-600 to-yellow-500 animate-gradient-shift">
              دنیای
            </span>
            <span className="block mt-2 bg-clip-text text-transparent bg-linear-to-r from-indigo-700 via-purple-800 to-indigo-900">
              برق و روشنایی
            </span>
            
            {/* افکت نئون */}
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 via-orange-600/30 to-yellow-500/20 blur-xl opacity-70 animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-linear-to-r from-indigo-700/20 via-purple-800/30 to-indigo-900/20 blur-xl opacity-70 animate-pulse-slow delay-1000"></div>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed relative z-10"
          >
            <span className="flex items-center justify-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkle className="text-amber-400" size={36} />
              </motion.div>
              <span>محصولات با کیفیت و متنوع در دسته‌بندی‌های مختلف برای نیازهای برق و روشنایی شما</span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="delay-500"
              >
                <Sparkle className="text-indigo-600" size={36} />
              </motion.div>
            </span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 flex flex-wrap justify-center gap-10"
          >
            {[
              { number: "5000+", label: "محصول", gradient: "from-amber-400 to-orange-600" },
              { number: "150+", label: "برند معتبر", gradient: "from-indigo-500 to-purple-700" },
              { number: "99%", label: "رضایت مشتریان", gradient: "from-emerald-500 to-teal-600" },
              { number: "24/7", label: "پشتیبانی", gradient: "from-blue-500 to-cyan-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-10`}></div>
                <div className="relative z-10">
                  <div className={`text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-linear-to-r ${stat.gradient}`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium text-lg">{stat.label}</div>
                </div>
                <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="w-48 h-1 bg-linear-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-amber-400 shadow-lg"></div>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.3
                }
              }
            }}
            initial="hidden"
            animate="visible"
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isFeatured = category.featured;
              
              return (
                <motion.div
                  key={category.title}
                  custom={index}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        delay: i * 0.08,
                        duration: 0.7,
                        type: "spring",
                        damping: 15,
                        stiffness: 150
                      }
                    })
                  }}
                  onHoverStart={() => setActiveCategory(category.title)}
                  onHoverEnd={() => setActiveCategory(null)}
                  className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    activeCategory === category.title ? 'z-20 scale-[1.03] shadow-3xl' : 'z-10'
                  }`}
                  style={activeCategory === category.title ? getTiltStyle(containerRef.current) : {}}
                >
                  <div 
                    className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-700`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.15),transparent_70%)]"></div>
                  </div>
                  
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${category.gradient} opacity-90`}></div>
                  
                  <div className="relative p-8 flex flex-col items-center text-center z-10">
                    {isFeatured && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 left-4"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-linear-to-r from-amber-300 to-orange-500 rounded-full blur opacity-75 animate-pulse-slow"></div>
                          <div className="relative bg-linear-to-r from-amber-400 to-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30">
                            <Crown size={14} className="fill-current" />
                            <span>ویژه</span>
                            <Sparkle size={12} className="text-yellow-200 animate-spin-slow" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="relative mb-8">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute inset-0 rounded-full border-2 ${category.gradient} opacity-30`}
                          style={{
                            width: `${100 + i * 30}%`,
                            height: `${100 + i * 30}%`,
                            top: `-${i * 15}%`,
                            left: `-${i * 15}%`,
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.1, 0.3]
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                        />
                      ))}
                      
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", damping: 10, stiffness: 200 }}
                        className="relative w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-2xl"></div>
                        <div className="relative z-10 p-2">
                          <Icon size={48} className="text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/10 to-transparent rounded-2xl animate-shimmer"></div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -bottom-4 -right-4 bg-white text-indigo-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1"
                      >
                        {/* <span>{category.products.toLocaleString()}</span> */}
                        <Gem size={12} className="text-amber-500 fill-current" />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <motion.h3 
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-extrabold text-white drop-shadow-lg"
                      >
                        {category.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/90 text-lg font-medium drop-shadow-md"
                      >
                        {category.description}
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      className="w-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 -translate-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: activeCategory === category.title ? 1 : 0 }}
                    >
                      <Link
                        href={category.href}
                        className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white bg-black/20 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-2xl relative overflow-hidden`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          مشاهده محصولات
                          <ArrowRight size={20} className="rtl:rotate-180" />
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </motion.div>
                    
                    {activeCategory === category.title && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                              width: `${Math.random() * 4 + 2}px`,
                              height: `${Math.random() * 4 + 2}px`,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              backgroundColor: category.sparkleColor
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                              x: [0, Math.random() * 40 - 20],
                              y: [0, Math.random() * 40 - 20]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.1,
                              repeat: Infinity
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${category.gradient} opacity-90`}></div>                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        
        {/* بخش توصیف و دکمه اقدام فوق‌العاده */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-28 text-center max-w-5xl mx-auto relative z-10"
        >
          {/* عنصر تزئینی بالای بخش */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-20 h-1 bg-linear-to-r from-indigo-500 to-purple-700 rounded-full"></div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-300 rounded-full border-2 border-white shadow-lg animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full border-2 border-white shadow-lg animate-ping delay-1000"></div>
            </div>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-indigo-900 to-purple-900 mb-8 relative">
            <span>انتخاب هوشمندانه برای</span>
            <span className="block mt-3 bg-clip-text text-transparent bg-linear-to-r from-amber-500 via-orange-600 to-yellow-500">
              پروژه‌های برق و روشنایی
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 via-orange-600/30 to-yellow-500/20 blur-2xl opacity-70 animate-pulse-slow"></div>
          </h3>
          
          <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed relative z-10">
            با بیش از <span className="font-bold text-indigo-700">5000 محصول</span> از <span className="font-bold text-indigo-700">150 برند معتبر</span>، 
            الکتروشهر بهترین انتخاب برای تأمین تجهیزات برق، روشنایی و تأسیسات ساختمان است. 
            <span className="block mt-2 font-semibold text-gray-900">کیفیت، تنوع و قیمت مناسب، همه در یک جا.</span>
          </p>
          
          {/* دکمه اقدام فوق‌العاده با افکت نئون پالس */}
          <Link
            href="/categories"
            className="group relative inline-flex items-center justify-center gap-4 bg-linear-to-r from-indigo-600 to-purple-800 text-white font-extrabold text-xl py-5 px-10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-linear-to-r from-indigo-700 to-purple-900 opacity-90"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
            
            {/* حلقه‌های نئون پالس */}
            <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
            <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 opacity-0 group-hover:opacity-70 animate-ping delay-1000"></div>
            
            <span className="relative z-10 flex items-center gap-3">
              <Star className="text-yellow-300 fill-current animate-pulse" size={28} />
              <span>کاوش در دنیای برق و روشنایی</span>
              <ChevronRight size={28} className="rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              <Flame className="text-orange-400 fill-current animate-pulse-slow" size={24} />
            </span>
            
            {/* ذرات نورانی */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -20, -40]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </Link>
          
          {/* آمار متحرک */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Lightbulb, title: "کیفیت تضمین‌شده", desc: "تمامی محصولات با گارانتی اصالت و کیفیت" },
              { icon: Zap, title: "ارسال سریع", desc: "ارسال فوری برای سفارشات بالای 500 هزار تومان" },
              { icon: Star, title: "رضایت مشتری", desc: "رضایت کامل یا بازگشت وجه بدون هیچ شرطی" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index }}
                  className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-100/50 hover:border-indigo-200 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-5 mx-auto">
                    <Icon size={32} className="text-indigo-700" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-center leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
          
          {/* عناصر تزئینی پایین */}
          <div className="mt-24 flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i} 
                className={`w-4 h-4 rounded-full ${
                  i === 0 ? 'bg-indigo-500' : 
                  i === 1 ? 'bg-purple-500' : 
                  i === 2 ? 'bg-amber-400' :
                  i === 3 ? 'bg-orange-500' : 'bg-pink-500'
                }`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* استایل‌های پیشرفته انیمیشن */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2.5s infinite;
        }
        
        /* سایه‌های سفارشی */
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 
                      0 0 0 1px rgba(255, 255, 255, 0.1),
                      0 0 30px rgba(124, 58, 237, 0.3);
        }
      `}</style>
    </section>
  );
};

export default CategoryGrid;