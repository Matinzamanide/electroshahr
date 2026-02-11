import Link from 'next/link';
import { ArrowLeft, Briefcase, Users, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      dir="rtl"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="w-[350px] xl:w-[500px] md:w-[700px] lg:w-[500px] xl:text-5xl text-4xl flex-col rounded-4xl h-[400px] bg-black flex justify-center items-center text-yellow-500 font-bold">
          <p className='my-4'>ElectroShahr</p> 
          <p>الکتروشهر اصفهان</p>
        </div>

        <div className="space-y-8">

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
            <CheckCircle size={16} />
            تامین‌کننده رسمی تجهیزات برق صنعتی
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              تجربه، تخصص و اعتماد  
              <br />
              <span className="text-blue-600">در الکتروشهر اصفهان</span>
            </h1>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
            با بیش از یک دهه تجربه در حوزه تجهیزات برق صنعتی، موتور، اینورتر و
            تابلو برق، همراه صنایع بزرگ و پروژه‌های زیرساختی کشور بوده‌ایم.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <StatItem
              icon={<Briefcase className="text-blue-600" />}
              value="+12"
              label="سال سابقه کاری"
            />
            <StatItem
              icon={<CheckCircle className="text-emerald-600" />}
              value="+480"
              label="پروژه موفق"
            />
            <StatItem
              icon={<Users className="text-amber-600" />}
              value="+120"
              label="مشتری صنعتی"
            />
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/shop"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              مشاهده محصولات
              <ArrowLeft size={20} />
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-2xl font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
            >
              درباره ما
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md border border-slate-100">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
      </div>
    </div>
  );
};