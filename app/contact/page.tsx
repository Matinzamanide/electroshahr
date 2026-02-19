import { 
  Mail, Phone, MapPin, Clock, ShieldCheck, 
  Instagram, Linkedin, ExternalLink, 
  MessageCircle, Headphones, Truck, Award,
} from "lucide-react";

const ContactPage = () => {
  const contactItems = [
    { 
      icon: Phone, 
      label: "تلفن پشتیبانی", 
      value: "۰۲۱-۱۲۳۴۵۶۷۸", 
      sub: "پاسخگویی: شنبه تا چهارشنبه ۸ الی ۲۰",
      action: "tel:02112345678",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
      shadow: "shadow-blue-200"
    },
    { 
      icon: Mail, 
      label: "ایمیل سازمانی", 
      value: "info@electroshahr.com", 
      sub: "پاسخ در کمتر از ۲ ساعت کاری",
      action: "mailto:info@electroshahr.com",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
      shadow: "shadow-purple-200"
    },
    { 
      icon: MapPin, 
      label: "آدرس فروشگاه", 
      value: "تهران، لاله زار، کوچه برق، پلاک ۱۰", 
      sub: "بازدید حضوری: شنبه تا پنجشنبه",
      action: "https://goo.gl/maps/example",
      gradient: "bg-gradient-to-br from-orange-500 to-amber-500",
      shadow: "shadow-orange-200"
    },
    { 
      icon: Clock, 
      label: "ساعات کاری", 
      value: "شنبه تا چهارشنبه: ۹ الی ۱۸", 
      sub: "پنجشنبه: ۹ الی ۱۴ | جمعه: تعطیل",
      action: null,
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-200"
    },
  ];

  const stats = [
    { icon: Award, num: "۲۰+", label: "سال تجربه درخشان" },
    { icon: Truck, num: "۵۰۰+", label: "پروژه موفق صنعتی" },
    { icon: Headphones, num: "۹۸٪", label: "رضایت مشتریان" },
    { icon: ShieldCheck, num: "۱۰۰٪", label: "ضمانت اصالت کالا" },
  ];

  return (
    <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden" dir="rtl">
      
      {/* المان‌های تزئینی پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 border border-orange-100 shadow-sm">
            <ShieldCheck className="text-orange-600" size={18} />
            <span className="text-sm font-bold text-gray-700">بیش از ۲ دهه سابقه در صنعت برق</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            با ما در <span className="text-orange-600">تماس</span> باشید
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            گروه مهندسی ما آماده ارائه مشاوره تخصصی در زمینه خرید تجهیزات برقی، اینورتر و پروژه‌های روشنایی است.
          </p>
        </div>

        {/* آمار */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 mb-4">
                <stat.icon size={24} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.num}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* کارت‌های تماس */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactItems.map((item, idx) => {
            const Tag = item.action ? 'a' : 'div';
            return (
              <Tag
                key={idx}
                href={item.action || undefined}
                className={`group bg-white p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-6 ${item.action ? 'cursor-pointer hover:-translate-y-1' : ''}`}
              >
                <div className={`shrink-0 w-16 h-16 rounded-2xl ${item.gradient} flex items-center justify-center text-white shadow-lg ${item.shadow}`}>
                  <item.icon size={30} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-400 mb-1">{item.label}</h3>
                  <p className="text-xl font-black text-gray-800 mb-2">{item.value}</p>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
                {item.action && <ExternalLink size={20} className="text-gray-300 group-hover:text-orange-500 transition-colors" />}
              </Tag>
            );
          })}
        </div>

        {/* بخش نقشه */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="text-orange-600" size={32} />
                مراجعه حضوری
              </h3>
              <p className="text-gray-600 text-lg leading-loose mb-8">
                منتظر دیدار شما در فروشگاه مرکزی هستیم. لاله زار قلب تپنده صنعت برق ایران است و ما در اینجا آماده خدمت‌رسانی به شما عزیزان هستیم.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Check size={20} className="text-green-500" />
                  <span>دسترسی آسان به مترو امام خمینی</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check size={20} className="text-green-500" />
                  <span>امکان بارگیری مستقیم برای خریدهای عمده</span>
                </div>
              </div>
            </div>
            
            {/* نقشه مجازی */}
            <div className="h-80 lg:h-full min-h-[400px] bg-slate-100 relative group">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/40.7128,-74.0060,12/600x600?access_token=YOUR_TOKEN')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2"
                >
                  <MapPin size={20} />
                  مسیریابی با گوگل مپ
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های اجتماعی */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 font-bold mb-8 italic">پاسخگویی سریع در شبکه‌های اجتماعی</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: MessageCircle, name: "واتس‌اپ", color: "text-emerald-600 bg-emerald-50" },
              { icon: Instagram, name: "اینستاگرام", color: "text-pink-600 bg-pink-50" },
              { icon: Linkedin, name: "لینکدین", color: "text-blue-700 bg-blue-50" },
            ].map((soc, i) => (
              <a key={i} href="#" className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1 ${soc.color}`}>
                <soc.icon size={22} />
                {soc.name}
              </a>
            ))}
          </div>
        </div>
      </div>

     
    </section>
  );
};

const Check = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ContactPage;