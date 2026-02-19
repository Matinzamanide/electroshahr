import Image from "next/image";
import Link from "next/link";
import { Award, ArrowLeft } from "lucide-react";

const data = [
  { src: "/logo.png", brand: "شاهچراغ", link: "/product-brands/شاهچراغ" },
  { src: "/modi.png", brand: "مودی", link: "product-brands/مودی" },
  {
    src: "/veera.png",
    brand: "ویرا الکتریک",
    link: "product-brands/ویرا الکتریک",
  },
  { src: "/iran.png", brand: "ایران الکتریک", link: "ایران الکتریک" },
  { src: "/peyk.webp", brand: "الکتروپیک", link: "product-brands/الکتروپیک" },
  { src: "/taba.png", brand: "تابا", link: "product-brands/تابا" },
  { src: "/suzuki.jpg", brand: "سوزوکی", link: "product-brands/سوزوکی" },
  { src: "/welion.png", brand: "welion", link: "product-brands/welion" },
  {
    src: "https://apitak.ir/images/apika2.svg",
    brand: "آپیکا",
    link: "https://apitak.ir/",
  },
];

const Brands = () => {

  return (
    <section className="w-full py-16 bg-linear-to-b from-gray-50 via-white to-gray-50">
      <div className="text-center mb-12 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-2 flex items-center justify-center gap-2">
          <Award size={30} className="text-orange-500" />
          برندهای{" "}
          <span className="border-b-4 border-orange-500 pb-1">معتبر</span> همکار
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          انتخاب ما کیفیت، اصالت و خدمات پس از فروش است.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4">
        {data.map((item, i) => (
          <Link
            href={item.link || "#"}
            key={i}
            target="_blank"
            className="group flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm 
                rounded-2xl border-2 border-transparent shadow-lg 
                hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/70 
                transition-all duration-300 transform hover:-translate-y-1"
            aria-label={`مشاهده محصولات برند ${item.brand}`}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.brand}
                fill
                sizes="(max-width: 768px) 100px, 120px"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <h3 className="font-bold text-blue-800 text-center text-base md:text-lg group-hover:text-orange-600 transition-colors duration-300">
              {item.brand}
            </h3>

            <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
              مشاهده محصولات <ArrowLeft size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="w-40 h-1 bg-linear-to-r from-blue-700 via-blue-500 to-orange-500 rounded-full shadow-lg"></div>
      </div>
    </section>
  );
};

export default Brands;