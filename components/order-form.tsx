"use client";

import { useState, useMemo, ChangeEvent } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { MapPin, Phone, Truck, CheckCircle, Loader2, Hash, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import iranData from "../data/iran-cities.json";

const OrderForm = ({ totalPrice, totalOldPrice }: { totalPrice: number; totalOldPrice: number }) => {
  const { phoneNumber } = useAuthContext();
  const { cartItems } = useShoppingCartContext();

  const [formData, setFormData] = useState({
    province: "",
    city: "",
    postalCode: "",
    address: "",
    phone: "",
    shippingMethod: "پست",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const availableCities = useMemo(() => {
    const selected = iranData.find((item) => item.name === formData.province);
    return selected ? selected.cities : [];
  }, [formData.province]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "province" ? { city: "" } : {}),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.province || !formData.city || !formData.address || formData.postalCode.length < 10) {
      setMessage({ text: "⚠️ تکمیل تمام فیلدها و کد پستی ۱۰ رقمی الزامی است.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://apitak.ir/electroshahr/orders/submit_order.php", {
        userPhone: phoneNumber,
        ...formData,
        products: cartItems,
        totalPrice,
        totalOldPrice,
        paymentStatus: "در انتظار پرداخت",
      });

      if (res.data.success) {
        setMessage({ text: "✅ سفارش با موفقیت ثبت شد.", type: "success" });
      } else {
        setMessage({ text: res.data.error || "❌ خطا در ثبت سفارش.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "❌ خطا در ارتباط با سرور.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium";
  const labelStyle = "flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 mr-1 uppercase";

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 mb-20" dir="rtl">
      <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden text-right">
        
        <div className="bg-slate-900 p-8 text-white">
          <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
            <Navigation className="text-blue-400" /> جزئیات ارسال سفارش
          </h2>
          <p className="text-slate-400 text-sm">لطفاً آدرس و مشخصات را با دقت وارد کنید</p>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-1">
              <label className={labelStyle}><MapPin size={14}/> استان</label>
              <select name="province" value={formData.province} onChange={handleChange} className={inputStyle}>
                <option value="">انتخاب استان...</option>
                {iranData.map((p:any) => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className={labelStyle}><Navigation size={14}/> شهر</label>
              <select name="city" value={formData.city} onChange={handleChange} className={inputStyle} disabled={!formData.province}>
                <option value="">انتخاب شهر...</option>
                {availableCities.map((city:any) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className={labelStyle}><Hash size={14}/> کد پستی</label>
              <input 
                name="postalCode" 
                maxLength={10} 
                placeholder="۱۰ رقم بدون خط تیره" 
                onChange={handleChange} 
                className={inputStyle + " tracking-[0.2em] font-mono"} 
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3 space-y-1">
              <label className={labelStyle}><MapPin size={14}/> آدرس پستی دقیق</label>
              <textarea name="address" rows={3} onChange={handleChange} placeholder="خیابان، کوچه، پلاک، واحد..." className={inputStyle + " resize-none"} />
            </div>
          </section>

          <hr className="border-gray-100" />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className={labelStyle}><Phone size={14}/> شماره تماس پشتیبان</label>
              <input name="phone" type="tel" placeholder="۰۲۱XXXXXXX" onChange={handleChange} className={inputStyle} />
            </div>

            <div className="space-y-4">
              <label className={labelStyle}><Truck size={14}/> روش ارسال</label>
              <div className="grid grid-cols-2 gap-3">
                {["پست", "تیپاکس"].map((method) => (
                  <label key={method} className={`relative flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.shippingMethod === method ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-100 bg-gray-50/50 hover:bg-gray-100"}`}>
                    <input type="radio" name="shippingMethod" value={method} checked={formData.shippingMethod === method} onChange={handleChange} className="hidden" />
                    <span className="text-sm font-bold">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <div className="pt-6">
            <AnimatePresence>
              {message.text && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-2xl text-sm mb-8 font-bold flex items-center gap-3 ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
                  <CheckCircle size={20} /> {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={24} />}
              {loading ? "در حال ثبت سفارش..." : "تایید نهایی و پرداخت"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderForm;