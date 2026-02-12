import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/types/types';

export default async function NewestProduct() {
  const res = await fetch('https://apitak.ir/electroshahr/getProducts.php', {
    next: { revalidate: 60 },
  });

  const json = await res.json();

  const products: IProduct[] = Array.isArray(json)
    ? json.slice(0, 8)
    : [];
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
              className="min-w-[220px] sm:min-w-[260px] snap-start group bg-white rounded-2xl  shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                <Image
                  src={product.images?.[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.title}
                </h3>

                <span className="text-blue-600 font-bold text-sm">
                  {product.price?.toLocaleString()} تومان
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
