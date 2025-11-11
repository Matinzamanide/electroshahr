'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ChevronLeft, Zap, ShieldCheck } from 'lucide-react';

interface FooterLinkItem {
    name: string;
    href: string;
}

const quickLinks: FooterLinkItem[] = [
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
    { name: "وبلاگ", href: "/blog" },
    { name: "سوالات متداول", href: "/faq" },
];

const serviceLinks: FooterLinkItem[] = [
    { name: "قوانین و مقررات", href: "/terms" },
    { name: "روش‌های ارسال", href: "/shipping" },
    { name: "روش‌های پرداخت", href: "/payment" },
    { name: "بازگشت کالا", href: "/returns" },
];

const categoryLinks: FooterLinkItem[] = [
    { name: "لوازم خانگی", href: "/products/home-appliances" },
    { name: "تجهیزات صنعتی", href: "/products/industrial" },
    { name: "کابل و سیم", href: "/products/cables" },
    { name: "تابلو برق", href: "/products/panels" },
];

const FooterLink: React.FC<FooterLinkItem> = ({ href, name }) => (
    <li className="mb-2">
        <Link 
            href={href} 
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 text-sm font-medium group"
        >
            <ChevronLeft size={14} className="text-blue-600 group-hover:text-orange-600 transition-colors" />
            {name}
        </Link>
    </li>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-white text-gray-900 pt-16 pb-6 mt-16 shadow-lg border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 border-b border-gray-200 pb-12">
                    
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-extrabold text-blue-900 mb-4">
                            <span className='text-orange-600'>الکترو</span>شهر
                        </h3>
                        <p className="text-sm text-gray-600 mb-6 max-w-[300px]">
                            بزرگترین مرجع آنلاین تأمین تجهیزات برقی، صنعتی و خانگی با ضمانت اصالت و قیمت.
                        </p>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-blue-600" />
                                <span className="text-gray-700 text-sm">  اصفهان خانه اصفهان خیابان نوبهار شمالی(۳) روبه روی باشگاه اتم (دفتر مرکزی)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-600" />
                                <span className="text-gray-700 text-sm font-sans text-left"> 0210 426 913</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-blue-600" />
                                <span className="text-gray-700 text-sm">info@example.com</span>
                            </div>
                        </div>

                        <div className='mt-8 flex gap-4 items-center'>
                            <p className='text-gray-600 text-sm font-bold flex items-center gap-2'>
                                <ShieldCheck size={20} className='text-orange-500'/>
                                نمادهای اعتماد:
                            </p>
                            
                            <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-300 shadow-md flex items-center justify-center p-1 hover:scale-105 transition-transform duration-300">
<a
  referrerPolicy="origin"
  target="_blank"
  href="https://trustseal.enamad.ir/?id=643023&Code=rzzj2s3YewhDcfP565NhNalnamHAethX"
>
  <img
    referrerPolicy="origin"
    src="https://trustseal.enamad.ir/logo.aspx?id=643023&Code=rzzj2s3YewhDcfP565NhNalnamHAethX"
    alt="اینماد"
    style={{ cursor: 'pointer' }}
  />
</a>
<span className="text-xs text-blue-900 font-bold">لوگوی اینماد</span>

                            </div>
                            
                           
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-bold text-blue-900 mb-4 border-b-2 border-orange-500 inline-block pb-1">
                            لینک‌های سریع
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, i) => <FooterLink key={i} {...link} />)}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-bold text-blue-900 mb-4 border-b-2 border-orange-500 inline-block pb-1">
                            خدمات مشتریان
                        </h4>
                        <ul className="space-y-2">
                            {serviceLinks.map((link, i) => <FooterLink key={i} {...link} />)}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-blue-900 mb-4 border-b-2 border-orange-500 inline-block pb-1  items-center gap-2">
                            دسته‌بندی‌ها
                        </h4>
                        <ul className="space-y-2">
                            {categoryLinks.map((link, i) => <FooterLink key={i} {...link} />)}
                            <li>
                                <Link href="/products" className="text-orange-600 hover:text-orange-500 transition-colors text-sm font-bold flex items-center gap-1 mt-2">
                                    مشاهده همه دسته‌ها <ChevronLeft size={14} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8">
                    
                    <div className="flex space-x-4 space-x-reverse mb-4 md:mb-0">
                        <a href="#" aria-label="اینستاگرام" className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-orange-600 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" aria-label="تلگرام" className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-orange-600 hover:text-white transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" aria-label="فیسبوک" className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-orange-600 hover:text-white transition-colors">
                            <Facebook size={20} />
                        </a>
                    </div>
                    
                    <p className="text-sm text-gray-500 text-center md:text-right">
                        © {new Date().getFullYear()} الکتروشهر. تمامی حقوق محفوظ است.
                    </p>
                </div>
                
               

            </div>
        </footer>
    );
};

export default Footer;