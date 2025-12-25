"use client";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import Image from "next/image";
import { Plus, Minus, Trash2, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/types";
import axios from "axios";
interface ICartItem{
    id:number;
    qty:number;
}
const CartItem :React.FC<ICartItem> = ({id,qty}) => {
  const { cartItems, handleIncreaseQty, handleDecreaseQty,handleRemoveProduct } = useShoppingCartContext();
  // فرض می‌کنیم در حال حاضر برای تست اولین آیتم را نشان می‌دهیم 
  // یا این کامپوننت داخل یک Map قرار می‌گیرد
  const item = cartItems[0] || { id: 1, quantity: 1, price: 45000, name: "الکتروموتور موتوژن 3000 دور" };
const [data,setData]=useState<IProduct | null>(null);
  useEffect(()=>{
    axios(`https://apika.ir/electroshahr/getProducts.php?id=${id}`).then((res)=>{
    setData(res.data)
    console.log(res.data)
    })
  },[id])
  if(!data) return null
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative bg-white border border-gray-100 shadow-sm hover:shadow-md my-4 p-4 flex gap-5 rounded-3xl transition-all duration-300"
    >
      {/* بخش تصویر محصول */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shrink-0">
        <Image
          src={data.images?.[0] || "/placeholder.png"}
          alt={data.title}
          width={120}
          height={120}
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* بخش اطلاعات محصول */}
      <div className="flex flex-col justify-between grow py-1">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 leading-7">
            {data?.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-400">
            <Tag size={14} />
            <span className="text-xs font-medium">کد کالا: {item.id}MS</span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-4">
          {/* قیمت */}
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium">قیمت واحد</span>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-blue-600">
                {(Number(data?.price) * qty).toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-gray-500">تومان</span>
            </div>
          </div>

          {/* کنترلر تعداد */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl p-1 gap-3">
            <button 
              onClick={() => handleIncreaseQty(item.id)}
              className="w-8 h-8 flex items-center justify-center bg-white text-blue-600 rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <Plus size={18} />
            </button>
            
            <span className="w-6 text-center font-bold text-gray-700 tabular-nums">
              {qty}
            </span>

            <button 
              onClick={() => handleDecreaseQty(item.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                qty === 1 
                ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white" 
                : "bg-white text-gray-500 hover:bg-gray-200"
              }`}
            >
              {qty === 1 ? <Trash2 size={16} /> : <Minus size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* دکمه حذف سریع در گوشه (اختیاری) */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
         <button className="text-gray-300 hover:text-red-400 transition-colors">
            <Trash2 onClick={()=>handleRemoveProduct(id)} size={18} />
         </button>
      </div>
    </motion.div>
  );
};

export default CartItem;