"use client";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import Image from "next/image";
import { Plus, Minus, Trash2, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/types";
import axios from "axios";

interface ICartItem {
  id: number;
  qty: number;
}

const CartItem: React.FC<ICartItem> = ({ id, qty }) => {
  const { handleIncreaseQty, handleDecreaseQty, handleRemoveProduct } =
    useShoppingCartContext();
  const [data, setData] = useState<IProduct | null>(null);

  useEffect(() => {
    axios(`https://apitak.ir/electroshahr/getProducts.php?id=${id}`).then(
      (res) => {
        setData(res.data);
      }
    );
  }, [id]);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white border border-slate-100 shadow-sm hover:shadow-xl my-4 p-3 md:p-4 flex flex-row gap-4 md:gap-6 rounded-4xl transition-all duration-300 items-center md:items-stretch"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-50 shrink-0 w-24 h-24 md:w-32 md:h-32">
        <Image
          src={data.images?.[0] || "/placeholder.png"}
          alt={data.title}
          fill
          className="object-contain p-3 transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col justify-between grow py-1 min-w-0">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-black text-slate-800 text-sm md:text-lg line-clamp-2 leading-6 md:leading-7 tracking-tight">
              {data?.title}
            </h3>
            {/* دکمه حذف در موبایل همیشه در دسترس باشد */}
            <button
              onClick={() => handleRemoveProduct(id)}
              className="md:hidden text-slate-300 hover:text-red-500 transition-colors shrink-0"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Tag size={12} className="md:w-3.5 md:h-3.5" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
              ID: {id}
            </span>
          </div>
        </div>

        {/* قیمت و کنترلر - در موبایل زیر هم یا کنار هم با مدیریت فضا */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-3 gap-3">
          {/* بخش قیمت */}
          <div className="flex flex-col">
            <span className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase italic">
              Subtotal
            </span>
            <div className="flex items-center gap-1">
              <span className="text-lg md:text-2xl font-black text-blue-600 tracking-tighter font-sans">
                {(Number(data?.price) * qty).toLocaleString()}
              </span>
              <span className="text-[9px] md:text-[11px] font-bold text-slate-500">
                تومان
              </span>
            </div>
          </div>

          {/* کنترلر تعداد شیک */}
          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1 gap-1 md:gap-3 w-fit self-end sm:self-auto">
            <button
              onClick={() => handleIncreaseQty(id)}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-white text-blue-600 rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <Plus size={16} />
            </button>

            <span className="w-6 text-center font-black text-slate-700 tabular-nums text-sm md:text-base">
              {qty}
            </span>

            <button
              onClick={() =>
                qty > 1 ? handleDecreaseQty(id) : handleRemoveProduct(id)
              }
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                qty === 1
                  ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm shadow-red-100"
                  : "bg-white text-slate-500 hover:bg-slate-200"
              }`}
            >
              {qty === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleRemoveProduct(id)}
          className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
