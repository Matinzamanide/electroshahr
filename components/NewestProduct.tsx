import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/types/types";
import { ShoppingCart } from "lucide-react";

export default async function NewestProduct() {
  const res = await fetch("https://apitak.ir/electroshahr/getProducts.php", {
    next: { revalidate: 60 },
  });

  const json = await res.json();

  const products: IProduct[] = Array.isArray(json) ? json.slice(0, 8) : [];
  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            جدیدترین محصولات
          </h2>
          <Link
            href="/Productss"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            مشاهده همه →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}/${product.title}`}
              className="min-w-[290px] px-6 p-2 sm:min-w-[350px] snap-start group bg-white rounded-2xl  shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="">
                <Image
                  width={200}
                  height={200}
                  alt={product.title}
                  src={product.images[0]}
                  className="rounded-4xl text m-auto"
                />
              </div>
              <div className="pt-4">
                <p className="text-sm line-clamp-1 font-bold">
                  {product.title}
                </p>
                <div className="flex justify-between items-center mt-4 pb-3">
                  <div className="">
                    <p className="text-[12px] text-gray-600 line-through ">
                      {Number(product.before_discount_price).toLocaleString()}
                    </p>
                    <p className="text-blue-600">
                      {Number(product.price).toLocaleString()}{" "}
                      <span className="text-orange-500">تومان</span>{" "}
                    </p>
                  </div>
                  <div className="bg-blue-100 flex items-center text-blue-700 px-4 py-1 rounded-lg"> <span className="mx-2">خرید و مشاهده </span>  <ShoppingCart size={18} /> </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
