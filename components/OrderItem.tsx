"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IOrderItem {
  id: number;
  qty: number;
}

const OrderItem: React.FC<IOrderItem> = ({ id, qty }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://apitak.ir/electroshahr/getProducts.php?id=${id}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات محصول:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading || !data) {
    return <p className="text-gray-500 text-sm">در حال بارگذاری...</p>;
  }

  const totalPrice = data.price * qty;
  const hasDiscount =
    data.before_discount_price > data.price && data.before_discount_price > 0;
  const totalBeforeDiscount = data.before_discount_price * qty;
  const discountPercent = hasDiscount
    ? Math.round(100 - (data.price / data.before_discount_price) * 100)
    : 0;

  return (
    <Link href={`/ProductPage/${data.title}`}>
     <div className="bg-white flex px-7 py-10 rounded-lg shadow-lg ">
       <div className="right">
         <Image width={150} height={150} src={data.images[0]} alt="hello" />
       </div>
       <div className="left">
         <p className="text-lg font-semibold">{data.title}</p>
         <div>
           <span>تعداد : </span>
           <span>{qty}</span>
           <div className="text-right">

                 <p className="text-green-700">
                     <span>قیمت تکی :</span>
                     <span>{data.price.toLocaleString()} تومان</span>
                 </p>


             <div className="text-blue-600 font-bold text-base whitespace-nowrap">
               {totalPrice.toLocaleString()} تومان
             </div>
             {hasDiscount && (
               <div className="text-gray-400 line-through text-sm whitespace-nowrap">
                 {totalBeforeDiscount.toLocaleString()} تومان
               </div>
             )}
             {hasDiscount && (
               <div className="text-red-500 text-xs font-bold mt-1">
                 ٪{discountPercent} تخفیف
               </div>
             )}
           </div>
         </div>
       </div>
     </div>
     </Link>
  );
};
export default OrderItem;
