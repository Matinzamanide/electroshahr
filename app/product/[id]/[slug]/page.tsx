// "use client";

// import { useEffect, useState } from "react";

// interface Product {
//   id: string;
//   title: string;
//   slug: string;
//   url: string;
//   images: string[];
//   categories: string[];
//   features: Record<string, any>[];
// }

// interface Props {
//   params: { id: string; slug: string };
// }

// export default function ProductClient({ params }: Props) {
//   const { id, slug } = params;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [mainImage, setMainImage] = useState<string>("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const encodedSlug = encodeURIComponent(slug);
//         const res = await fetch(
//           `http://localhost/electroshahr/getProducts.php?id=${id}&slug=${encodedSlug}`
//         );
//         const data: Product = await res.json();
//         setProduct(data);
//         if (data.images?.length > 0) setMainImage(data.images[0]);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [id, slug]);

//   if (!product) return <div className="p-8 text-center">در حال بارگذاری...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* عنوان */}
//       <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* بخش تصاویر */}
//         <div className="md:w-1/2 flex flex-col items-center">
//           <img
//             src={mainImage}
//             alt={product.title}
//             className="w-full h-auto rounded-lg object-cover border mb-4 shadow-sm"
//           />

//           {product.images?.length > 1 && (
//             <div className="flex gap-2 overflow-x-auto mt-2">
//               {product.images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`${product.title} ${idx + 1}`}
//                   className="w-20 h-20 object-cover rounded-lg border hover:border-blue-500 cursor-pointer transition"
//                   onClick={() => setMainImage(img)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* بخش جزئیات */}
//         <div className="md:w-1/2 flex flex-col gap-4">
//           {/* دسته‌بندی */}
//           {product.categories?.length > 0 && (
//             <p className="text-sm text-gray-500">
//               دسته‌بندی: {product.categories.join(", ")}
//             </p>
//           )}

//           {/* ویژگی‌ها */}
//           {product.features?.length > 0 && (
//             <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
//               <h2 className="font-semibold mb-2">ویژگی‌ها</h2>
//               <ul className="list-disc list-inside text-gray-700">
//                 {product.features.map((f, idx) => (
//                   <li key={idx}>
//                     {Object.entries(f)
//                       .map(([k, v]) => `${k}: ${v}`)
//                       .join(", ")}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* دکمه خرید */}
//           <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
//             افزودن به سبد خرید
//           </button>
//         </div>
//       </div>

//       {/* توضیحات / اطلاعات بیشتر */}
//       <div className="mt-8 bg-gray-50 p-6 rounded-lg border shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">توضیحات محصول</h2>
//         <p className="text-gray-700">
//           این بخش می‌تواند شامل توضیحات طولانی محصول، مشخصات فنی و نکات مهم
//           برای خریدار باشد.
//         </p>
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { Check, Tag, ChevronLeft, X, Lightbulb } from "lucide-react";
import AddCart from "@/components/add-cart";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";
import { Metadata } from "next";

const API_BASE_URL = "https://apitak.ir/electroshahr";

/* =========================
   گرفتن اطلاعات محصول
========================= */
async function getProduct(id: string, slug: string) {
  const encodedSlug = encodeURIComponent(slug);

  const res = await fetch(
    `${API_BASE_URL}/getProducts.php?id=${id}&url=${encodedSlug}`,
    { cache: "no-store" } // مهم برای ترب
  );

  if (!res.ok) return null;

  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

/* =========================
   متاتگ‌های ترب
========================= */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string; slug: string }> }
): Promise<Metadata> {

  const { id, slug } = await params;
  const product = await getProduct(id, slug);

  if (!product) return {};

  const inventory = parseInt(product.inventory ?? "0", 10);
  const isAvailable = inventory > 0;

  return {
    title: product.title,
    description: product.description?.slice(0, 160) || "",
    openGraph: {
      title: product.title,
      images: [product.images?.[0] || ""],
    },
    other: {
      product_id: String(product.id),
      product_name: product.title,
      product_price: String(product.price ?? 0),
      product_old_price: String(product.before_discount_price ?? ""),
      availability: isAvailable ? "instock" : "outofstock",
      "product:availability": isAvailable ? "instock" : "outofstock",
    },
  };
}

/* =========================
   صفحه محصول
========================= */
export default async function ProductPage(
  { params }: { params: Promise<{ id: string; slug: string }> }
) {

  const { id, slug } = await params;
  const product = await getProduct(id, slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-50 p-6 mx-auto my-10 max-w-xl rounded-xl border border-red-300">
        <X size={32} className="text-red-600 mb-3" />
        <h2 className="text-2xl font-bold text-red-800 mb-2">محصول پیدا نشد</h2>
        <Link href="/" className="mt-4 text-blue-600 underline">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const inventory = parseInt(product.inventory ?? "0", 10);
  const isAvailable = inventory > 0;

  const discountPercentage = product.before_discount_price
    ? Math.round(
        ((product.before_discount_price - product.price) /
          product.before_discount_price) * 100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">

      {/* 🔥 متن مخفی SSR مخصوص ترب */}
      <div style={{ display: "none" }}>
        وضعیت موجودی: {isAvailable ? "موجود" : "ناموجود"}
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">خانه</Link>
        <ChevronLeft size={16} className="mx-2" />
        <span className="text-gray-800 font-medium">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-6 lg:p-10 border border-gray-100">

        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col gap-6">

          <h1 className="lg:text-4xl text-lg font-extrabold text-blue-900">
            {product.title}
          </h1>

          {/* قیمت */}
          <div className="flex flex-col gap-2 bg-blue-50/50 rounded-xl p-5 border border-blue-100">
            {product.before_discount_price > product.price && (
              <p className="text-base text-gray-500 line-through">
                {Number(product.before_discount_price).toLocaleString()} تومان
              </p>
            )}
            <div className="flex items-baseline gap-3">
              <span className="text-lg lg:text-4xl font-extrabold text-orange-600">
                {Number(product.price).toLocaleString()} تومان
              </span>
              {discountPercentage > 0 && (
                <span className="bg-orange-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                  %{discountPercentage} تخفیف
                </span>
              )}
            </div>
          </div>

          {/* وضعیت موجودی نمایشی */}
          <p className={`flex items-center gap-1 font-medium ${
            isAvailable ? "text-green-600" : "text-red-600"
          }`}>
            {isAvailable ? <Check size={20} /> : <X size={20} />}
            {isAvailable
              ? `موجود در انبار (${inventory} عدد)`
              : "ناموجود"}
          </p>

          <AddCart isAvailable={isAvailable} id={Number(id)} />
        </div>
      </div>

      <ProductTabs
        description={product.description}
        features={product.features}
      />

      <div className="mt-10 p-5 bg-orange-50 border-r-4 border-orange-600 rounded-xl">
        سؤالی دارید؟ با ما تماس بگیرید.
      </div>
    </div>
  );
}
