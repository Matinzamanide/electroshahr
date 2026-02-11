// "use client";

// import { useAuthContext } from "@/context/AuthContext";
// import { useShoppingCartContext } from "@/context/ShoppingCartContext";
// import {
//   Home,
//   Menu,
//   Phone,
//   ShoppingCart,
//   X,
//   Zap,
//   Settings,
//   Lightbulb,
//   Cable,
//   Hammer,
//   Box,
//   User,
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState, useRef } from "react";

// const categoryIcons = {
//   1: Zap, 
//   2: Settings, 
//   3: Lightbulb, 
//   4: Cable, 
//   5: Box, 
//   6: Hammer, 
// };

// const productCategories = [
//   {
//     id: 1,
//     name: "لوازم خانگی",
//     link: "/products/home-appliances",
//     desc: "پمپ، جوش‌آور، فن",
//   },
//   {
//     id: 2,
//     name: "تجهیزات صنعتی",
//     link: "/products/industrial",
//     desc: "موتور، گیربکس، کنتاکتور",
//   },
//   {
//     id: 3,
//     name: "چراغ‌ها و روشنایی",
//     link: "/products/lighting",
//     desc: "LED، لوستر، پروژکتور",
//   },
//   {
//     id: 4,
//     name: "کابل و سیم",
//     link: "/products/cables",
//     desc: "سیم برق، کابل کنترل",
//   },
//   {
//     id: 5,
//     name: "تابلو برق",
//     link: "/products/panels",
//     desc: "تابلو صنعتی، خانگی",
//   },
//   {
//     id: 6,
//     name: "ابزار برقی",
//     link: "/products/tools",
//     desc: "دریل، اره، کمپرسور",
//   },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
//   const [storedName, setStoredName] = useState<string | null>(null);
// const [storedFamily, setStoredFamily] = useState<string | null>(null);

//   const megaMenuRef = useRef<HTMLDivElement>(null);

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const {cartTotalQty}=useShoppingCartContext();
//   const {isLoggedIn,name,family}=useAuthContext();
//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);
//   useEffect(() => {
//     const name = localStorage.getItem("name");
//     const family = localStorage.getItem("lastName");
  
//     setStoredName(name);
//     setStoredFamily(family);
//   }, []);
  
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         megaMenuRef.current &&
//         !megaMenuRef.current.contains(e.target as Node)
//       ) {
//         setIsMegaMenuOpen(false);
//       }
//     };
//     if (isMegaMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMegaMenuOpen]);

//   return (
//     <div className="relative">
//       <div
//         className={`fixed z-50 h-screen transition-all duration-300 ease-in-out 
//           bg-linear-to-br from-blue-700/80 to-blue-500/80 backdrop-blur-md
//           ${isOpen ? "w-[75%] opacity-100 visible" : "w-0 opacity-0 invisible"} 
//           overflow-hidden shadow-2xl border-r border-blue-400/50`}
//       >
//         <div className="flex justify-between items-center px-5 py-4 border-b border-blue-400/50">
//         <h3 className="text-3xl font-extrabold text-blue-100 mb-4">
//             <span className="text-orange-500">الکترو</span>شهر
//           </h3>
//           <button
//             onClick={toggleMenu}
//             className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
//             aria-label="بستن منو"
//           >
//             <X size={22} className="cursor-pointer" />
//           </button>
//         </div>
//         <ul className="flex flex-col mt-6 px-4 gap-3">
//           {[
//             { href: "/", label: "خانه", icon: Home },
//             { href: "/products", label: "محصولات", icon: Zap },
//             {
//               href: "/cart",
//               label: "سبد خرید",
//               icon: ShoppingCart,
//               isHighlighted: true,
//             },
//             { href: "/contact", label: "تماس با ما", icon: Phone },
//           ].map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group duration-300
//                 ${
//                   item.isHighlighted
//                     ? "text-orange-700 bg-white hover:bg-orange-50 shadow-md shadow-orange-300/50"
//                     : "text-white hover:bg-white/10"
//                 }`}
//               onClick={() => setIsOpen(false)}
//             >
//               <item.icon
//                 size={20}
//                 className={`transition-transform duration-300 group-hover:scale-110 ${
//                   item.isHighlighted ? "text-orange-700" : "text-white"
//                 }`}
//               />
//               {item.label}
//             </Link>
//           ))}
//           {isLoggedIn ? (
//             <Link
//             href="/UserPanel"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-3 p-4 mt-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-cyan-400/30"
//             >
//               <User size={22} /> {name} {family}
//             </Link>
//           ) : (
//             <Link
//             href="/authentication"
//               onClick={() => setIsOpen(false)}
//               className="block text-center p-4 mt-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-indigo-500/40 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-indigo-400/30 font-medium"
//             >
//               ورود | ثبت نام
//             </Link>
//           )}
//         </ul>
//       </div>

//       {isOpen && (
//         <div
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//         />
//       )}

//       <div className="flex justify-between items-center shadow-sm px-4  md:px-6 py-5 bg-white/90 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-100">
//         <div className="">
//           <h3 className="text-3xl font-extrabold text-blue-900 hover:text-orange-600">
//             <span className="text-orange-600 hover:text-blue-900">الکترو</span>شهر
//           </h3>
//         </div>

//         <ul className="hidden md:flex items-center gap-1">
//           <Link
//             href="/"
//             className="flex items-center gap-2 px-5 py-2.5 text-blue-900 rounded-xl font-medium transition-all hover:bg-blue-50 hover:text-blue-800 group"
//           >
//             <Home
//               size={18}
//               className="group-hover:rotate-12 transition-transform"
//             />
//             خانه
//           </Link>

//           <div
//             className="relative"
//             onMouseEnter={() => setIsMegaMenuOpen(true)}
//             onMouseLeave={() => setIsMegaMenuOpen(false)}
//             ref={megaMenuRef}
//           >
//             <button
//               className="px-5 py-2.5 text-blue-900 rounded-xl font-medium transition-all hover:bg-blue-50 hover:text-blue-800 flex items-center gap-1"
//               aria-haspopup="true"
//               aria-expanded={isMegaMenuOpen}
//             >
//               محصولات
//               <span className="inline-block ml-1 text-blue-500">▼</span>
//             </button>

//             {isMegaMenuOpen && (
//               <div className="absolute top-9 left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 opacity-0 animate-fade-in-up">
//                 <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
//                   <Zap className="text-blue-700" size={22} />
//                   <h3 className="text-xl font-bold text-gray-900">
//                     دسته‌بندی‌های محصولات
//                   </h3>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {productCategories.map((cat) => {
//                     const Icon =
//                       categoryIcons[cat.id as keyof typeof categoryIcons];
//                     return (
//                       <Link
//                         key={cat.id}
//                         href={cat.link}
//                         className="group p-3 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:-translate-y-0.5"
//                         onClick={() => setIsMegaMenuOpen(false)}
//                       >
//                         <div className="flex items-start gap-3">
//                           <div className="mt-0.5 p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                             <Icon
//                               className="text-blue-700 group-hover:text-blue-800"
//                               size={18}
//                             />
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900 group-hover:text-blue-800">
//                               {cat.name}
//                             </h4>
//                             <p className="text-sm text-gray-600 mt-1">
//                               {cat.desc}
//                             </p>
//                           </div>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>

//                 <div className="mt-6 pt-4 border-t border-gray-100 text-center">
//                   <Link
//                     href="/products"
//                     className="inline-block bg-linear-to-r from-blue-700 to-blue-800 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-800 hover:to-blue-900 transition-all shadow-md hover:shadow-lg"
//                     onClick={() => setIsMegaMenuOpen(false)}
//                   >
//                     مشاهده همه محصولات
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Link
//             href="/cart"
//             className="flex items-center gap-2 px-5 py-2.5 text-orange-600 relative rounded-xl font-medium transition-all hover:bg-orange-50 hover:text-orange-700 group"
//           >
//             {
//               cartTotalQty>0 &&(
//                 <span className="bg-orange-100 p-1 absolute top-0 right-1 rounded-[50%]">{cartTotalQty}</span>
//               )
//             }
//             <ShoppingCart
//               size={18}
//               className="group-hover:scale-110 transition-transform"
//             />
//             سبد خرید
//           </Link>
//           <Link
//             href="/contact"
//             className="flex items-center gap-2 px-5 py-2.5 text-blue-900 rounded-xl font-medium transition-all hover:bg-blue-50 hover:text-blue-800 group"
//           >
//             <Phone
//               size={18}
//               className="group-hover:scale-110 transition-transform"
//             />
//             تماس با ما
//           </Link>
//         </ul>

//         <div className="hidden md:flex">
//               {isLoggedIn ? (
//                 <Link
//                 href="/UserPanel"
//                   className="flex items-center gap-2 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-cyan-400/30"
//                 >
//                   <User size={20} /> {name} {family}
//                 </Link>
//               ) : (
//                 <Link
//                 href="/authentication"
//                   className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-indigo-400/30 font-medium"
//                 >
//                   ورود | ثبت نام
//                 </Link>
//               )}
//             </div>

//         <button
//           onClick={toggleMenu}
//           className="md:hidden p-2 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
//           aria-label="باز کردن منو"
//         >
//           <Menu size={24} className="cursor-pointer" />
//         </button>
//       </div>

//       <style jsx global>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(12px) scaleY(0.98);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scaleY(1);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)
//             forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Navbar;








"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import {
  Home,
  Menu,
  Phone,
  ShoppingCart,
  X,
  Zap,
  Settings,
  Lightbulb,
  Cable,
  Hammer,
  Box,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const categoryIcons = {
  1: Zap,
  2: Settings,
  3: Lightbulb,
  4: Cable,
  5: Box,
  6: Hammer,
};

const productCategories = [
  { id: 1, name: "لوازم خانگی", link: "/products/home-appliances", desc: "پمپ، جوش‌آور، فن" },
  { id: 2, name: "تجهیزات صنعتی", link: "/products/industrial", desc: "موتور، گیربکس، کنتاکتور" },
  { id: 3, name: "چراغ‌ها و روشنایی", link: "/products/lighting", desc: "LED، لوستر، پروژکتور" },
  { id: 4, name: "کابل و سیم", link: "/products/cables", desc: "سیم برق، کابل کنترل" },
  { id: 5, name: "تابلو برق", link: "/products/panels", desc: "تابلو صنعتی، خانگی" },
  { id: 6, name: "ابزار برقی", link: "/products/tools", desc: "دریل، اره، کمپرسور" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
  
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const { cartTotalQty } = useShoppingCartContext();
  const { isLoggedIn, name, family } = useAuthContext();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    if (isMegaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMegaMenuOpen]);

  // کلاس‌های مشترک
  const navLinkClass = "flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-gray-700 hover:text-blue-700 hover:bg-blue-50";

  return (
    <div className="relative" dir="rtl">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 transition-transform duration-500 ease-in-out bg-white shadow-2xl w-72 
        ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h3 className="text-2xl font-black text-gray-900">
            <span className="text-orange-600">الکترو</span>شهر
          </h3>
          <button onClick={toggleMenu} className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-2">
          {[
            { href: "/", label: "خانه", icon: Home },
            { href: "/products", label: "محصولات", icon: Zap },
            { href: "/cart", label: "سبد خرید", icon: ShoppingCart },
            { href: "/contact", label: "تماس با ما", icon: Phone },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass} onClick={() => setIsOpen(false)}>
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
          
          <div className="border-t border-gray-100 my-4" />
          
          {isLoggedIn ? (
            <Link href="/UserPanel" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 bg-gray-900 text-white rounded-xl shadow-lg">
              <User size={20} /> {name} {family}
            </Link>
          ) : (
            <Link href="/authentication" onClick={() => setIsOpen(false)} className="text-center p-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
              ورود | ثبت نام
            </Link>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" />}

      {/* Main Navbar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-3">
          
          {/* Logo */}
          <Link href="/" className="text-3xl font-black text-gray-900">
            <span className="text-orange-600">الکترو</span>شهر
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            <Link href="/" className={navLinkClass}> <Home size={18} /> خانه </Link>

            {/* Mega Menu Trigger */}
            <div className="relative" onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)} ref={megaMenuRef}>
              <button className={`${navLinkClass} ${isMegaMenuOpen ? "bg-blue-50 text-blue-700" : ""}`}>
                <Zap size={18} /> محصولات <ChevronDown size={14} className={`transition-transform ${isMegaMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 animate-fade-in-up overflow-hidden">
                  <div className="grid grid-cols-2 gap-2">
                    {productCategories.map((cat) => {
                      const Icon = categoryIcons[cat.id as keyof typeof categoryIcons];
                      return (
                        <Link key={cat.id} href={cat.link} className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-blue-50/50" onClick={() => setIsMegaMenuOpen(false)}>
                          <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl group-hover:bg-blue-200 transition-colors">
                            <Icon size={22} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-800">{cat.name}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{cat.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <Link href="/products" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md" onClick={() => setIsMegaMenuOpen(false)}>
                      مشاهده همه محصولات
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className={navLinkClass}> <Phone size={18} /> تماس با ما </Link>
          </ul>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative p-3 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-700 transition-colors">
              <ShoppingCart size={22} />
              {cartTotalQty > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 bg-orange-600 text-white text-xs font-bold rounded-full animate-pulse">
                  {cartTotalQty}
                </span>
              )}
            </Link>

            <div className="hidden md:block">
              {isLoggedIn ? (
                <Link href="/UserPanel" className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg">
                  <User size={18} /> {name} {family}
                </Link>
              ) : (
                <Link href="/authentication" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg">
                  ورود | ثبت نام
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Navbar;