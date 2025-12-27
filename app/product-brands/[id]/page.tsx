import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types/types";
import { ChevronRight, LayoutGrid, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

interface IProps {
  params: Promise<{ id: string }>;
}

const ProductBrands = async ({ params }: IProps) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-8 bg-red-50 rounded-3xl border border-red-100">
          <Zap className="mx-auto text-red-400 mb-4" size={40} />
          <h2 className="text-red-600 font-black text-xl">برند مورد نظر یافت نشد</h2>
        </div>
      </div>
    );
  }

  const decodedId = decodeURIComponent(id);

  const data = await fetch("https://apika.ir/electroshahr/getProducts.php", {
    cache: 'no-store'
  });
  const res = (await data.json()) as IProduct[];
  
  const filteredProduct = res.filter((item) => 
    item.brand && item.brand.toLowerCase().includes(decodedId.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-20" >
      <div className="bg-white border-b border-slate-100 p-10 mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">الکتروشهر</Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">برندها</span>
            <ChevronRight size={12} />
            <span className="text-blue-600">{decodedId}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} />
                Original Brand Products
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter italic">
                محصولات برند <span className="text-blue-600">{decodedId}</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
                مجموعه‌ای از باکیفیت‌ترین تجهیزات  و متریال های تولید شده توسط کمپانی {decodedId} با ضمانت اصالت و خدمات پس از فروش اختصاصی.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Items</p>
                <p className="text-2xl font-black text-slate-900 font-sans">{filteredProduct.length}</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
                <LayoutGrid size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {filteredProduct.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProduct.map((item, index) => (
              <div key={index} className="flex flex-col h-full transform transition-all duration-500 hover:-translate-y-2">
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-2 border-dashed border-slate-100 rounded-[3rem]">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap size={40} className="text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-400">هیچ محصولی برای این برند موجود نیست</h3>
            <Link href="/" className="inline-block mt-6 px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all">
                بازگشت به فروشگاه
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBrands;