"use client";

import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Phone, LogOut, ShoppingBag,
  MapPin, Calendar, Hash, Copy, 
  Check, Clock, ShieldCheck, ChevronRight, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OrderItem from "@/components/OrderItem";

interface IUserInfo {
  name: string;
  family: string;
}

interface IOrder {
  id: number;
  total_price: number;
  old_total_price: number;
  created_at: string;
  payment_status: string;
  shipping_method: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  products: string;
}

const UserPanel = () => {
  const { phoneNumber, setFamily, setName, isLoggedIn, name, family, handleLogout } = useAuthContext();
  const router = useRouter();

  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    // if (!isLoggedIn) router.push("/Sign_in&up");
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn || !phoneNumber) return;
    setLoadingUser(true);
    axios(`https://apitak.ir/electroshahr/auth/get_user_info.php?phone=${phoneNumber}`)
      .then((result) => {
        setUserData(result.data);
        setName(result.data.name);
        setFamily(result.data.family);
      })
      .finally(() => setLoadingUser(false));
  }, [isLoggedIn, phoneNumber, setName, setFamily]);

  useEffect(() => {
    if (!isLoggedIn || !phoneNumber) return;
    setLoadingOrders(true);
    axios(`https://apitak.ir/electroshahr/orders/submit_order.php?user_phone=${phoneNumber}`)
      .then((res) => setOrders(res.data))
      .finally(() => setLoadingOrders(false));
  }, [isLoggedIn, phoneNumber]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-[vazirmatn] text-slate-900 overflow-x-hidden" dir="rtl">
      <div className="h-64 sm:h-80 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-blue-600/30 via-transparent to-indigo-500/20"></div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
          className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full blur-[80px] sm:blur-[120px]"
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 sm:-mt-48 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          <aside className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-4xl lg:rounded-[2.5rem] shadow-xl p-6 lg:p-8 border border-white"
            >
              <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 lg:text-center">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 lg:w-28 lg:h-28 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl lg:rounded-3xl flex items-center justify-center text-white shadow-2xl">
                    <User size={32} className="lg:hidden" />
                    <User size={54} className="hidden lg:block" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 bg-emerald-500 p-1 lg:p-1.5 rounded-lg lg:rounded-xl border-2 lg:border-4 border-white shadow-lg">
                    <ShieldCheck size={14} className="text-white lg:w-5 lg:h-5" />
                  </div>
                </div>

                <div className="flex flex-col lg:items-center">
                  <h2 className="text-lg lg:text-2xl font-black mt-0 lg:mt-6 text-slate-800">
                    {name || userData?.name} {family || userData?.family}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] lg:text-xs font-bold mt-1 lg:mt-3 border border-blue-100">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                    کاربر سطح طلایی
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-10 space-y-2 lg:space-y-3">
                <ProfileStat icon={<Phone size={18}/>} label="شماره تماس" value={phoneNumber} />
                <ProfileStat icon={<MapPin size={18}/>} label="استان" value="اصفهان" />
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-8 lg:mt-10 flex items-center justify-center gap-3 py-4 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-2xl lg:rounded-3xl font-black transition-all duration-300 group"
              >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                خروج از حساب
              </button>
            </motion.div>

            <div className="hidden lg:block bg-linear-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <ShoppingBag className="absolute -right-8 -bottom-8 opacity-10 rotate-12" size={180} />
                <h4 className="text-lg font-black mb-3 relative z-10">سوالی دارید؟</h4>
                <p className="text-blue-100/80 text-sm leading-relaxed mb-6 relative z-10">پشتیبانان ما آماده پاسخگویی به شما هستند.</p>
                <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white hover:text-blue-700 transition-all">ارسال تیکت</button>
            </div>
          </aside>

          <section className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-4xl lg:rounded-[3rem] shadow-xl border border-white min-h-[500px] overflow-hidden"
            >
              <div className="px-6 py-6 lg:px-10 lg:py-10 flex items-center justify-between border-b border-slate-100/50">
                <div>
                  <h2 className="text-lg lg:text-2xl font-black text-slate-800">تاریخچه سفارشات</h2>
                  <p className="hidden sm:block text-slate-400 text-sm font-bold mt-1">لیست تمامی خریدهای شما در آپیکاتک</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {orders.length}
                </div>
              </div>

              <div className="p-4 lg:p-10 space-y-6 lg:space-y-10">
                {loadingOrders ? (
                  <div className="space-y-6">
                    {[1, 2].map(i => <div key={i} className="h-48 bg-slate-50 rounded-4xl animate-pulse" />)}
                  </div>
                ) : (
                  orders.map((order, index) => (
                    <OrderCard key={order.id} order={order} index={index} onPay={() => setSelectedOrder(order)} />
                  ))
                )}
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {selectedOrder && (
          <PaymentModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileStat = ({ icon, label, value }: any) => (
  <div className="flex items-center justify-between p-3 lg:p-4 bg-slate-50/50 rounded-xl lg:rounded-2xl border border-transparent hover:border-slate-100 transition-all group">
    <div className="flex items-center gap-3">
      <div className="text-blue-600 bg-white p-2 rounded-lg lg:rounded-xl shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-slate-400 text-[10px] lg:text-xs font-bold">{label}</span>
    </div>
    <span className="text-slate-700 font-black text-xs lg:text-sm">{value}</span>
  </div>
);

const OrderCard = ({ order, index, onPay }: { order: IOrder, index: number, onPay: () => void }) => {
  let products = [];
  try { products = JSON.parse(order.products); } catch (e) { products = []; }
  const isPaid = order.payment_status === "پرداخت شده" || order.payment_status.includes("موفق");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl lg:rounded-[2.5rem] p-1 border border-slate-100 hover:border-blue-200 transition-all duration-500"
    >
      <div className="p-5 lg:p-7">
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] lg:text-[10px] font-black text-slate-300 uppercase">کد سفارش</span>
              <span className="text-slate-900 font-black flex items-center gap-1.5 text-sm lg:text-base">
                <Hash size={14} className="text-blue-500"/> {order.id}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-100 mx-1"></div>
            <div className="flex flex-col">
              <span className="text-[9px] lg:text-[10px] font-black text-slate-300 uppercase">تاریخ</span>
              <span className="text-slate-500 font-bold text-[11px] lg:text-sm flex items-center gap-1.5">
                <Calendar size={13}/> {order.created_at}
              </span>
            </div>
          </div>
          <div className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-xl lg:rounded-2xl text-[10px] lg:text-[11px] font-black border ${
            isPaid ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
          }`}>
            {order.payment_status}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center bg-slate-50/80 rounded-2xl lg:rounded-4xl p-5 lg:p-7 border border-slate-50">
          <div className="lg:col-span-4 text-center lg:text-right">
            <p className="text-[9px] lg:text-[10px] text-slate-400 font-black mb-1 uppercase">مبلغ نهایی</p>
            <p className="text-xl lg:text-2xl font-black text-blue-600">
              {Number(order.total_price).toLocaleString()}
              <span className="text-xs font-normal text-slate-400 mr-1.5">تومان</span>
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-5 border-r border-slate-200 pr-6">
            <p className="text-[10px] text-slate-400 font-black mb-1.5 uppercase">آدرس مقصد</p>
            <p className="text-sm font-bold text-slate-600 line-clamp-1">{order.province}، {order.city}، {order.address}</p>
          </div>

          <div className="lg:col-span-3">
             {!isPaid ? (
               <button
                  onClick={onPay}
                  className="w-full py-3 lg:py-4 bg-blue-600 text-white rounded-xl lg:rounded-2xl font-black text-xs lg:text-sm shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
               >
                  پرداخت <ChevronRight size={18} className="hidden lg:block" />
               </button>
             ) : (
               <button className="w-full py-3 lg:py-4 bg-white border border-slate-200 text-slate-600 rounded-xl lg:rounded-2xl font-bold text-xs lg:text-sm">
                 مشاهده فاکتور
               </button>
             )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
           {products.slice(0, 3).map((p: any, i: number) => (
             <OrderItem key={i} id={p.id} qty={p.qty} />
           ))}
           {products.length > 3 && <span className="text-[10px] text-slate-400 font-bold">+{products.length - 3} مورد دیگر</span>}
        </div>
      </div>
    </motion.div>
  );
};

const PaymentModal = ({ order, onClose }: { order: IOrder; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const cardNumber = "6037997365819722";

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        className="bg-white w-full max-w-md rounded-t-4xl sm:rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl p-6 sm:p-8"
      >
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 sm:hidden" />
        <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-6 text-center">جزئیات واریز وجه</h3>

        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-2xl mb-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8 italic opacity-60 text-xs">
            <span>Melli Bank</span>
            <Info size={16} />
          </div>
          <p className="text-xl sm:text-2xl font-black tracking-[0.15em] text-center mb-6" dir="ltr">
            {cardNumber.match(/.{1,4}/g)?.join(" - ")}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold opacity-50">مدیریت بازرگانی آپیکا</p>
            <button onClick={handleCopy} className="bg-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copied ? "کپی شد" : "کپی کارت"}
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <span className="text-xs font-bold text-blue-700">مبلغ قابل واریز:</span>
            <span className="text-lg font-black text-blue-800">{Number(order.total_price).toLocaleString()} تومان</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-[11px] font-bold text-slate-500 leading-relaxed">
            <div className="flex items-center gap-2"><Phone size={14} className="text-blue-500" /> تماس تایید: ۰۳۱-۳۴۲۵۸۰۷۰</div>
            <div className="flex items-center gap-2"><Clock size={14} className="text-amber-500" /> شنبه تا پنجشنبه (ساعات اداری)</div>
          </div>
        </div>

        <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm transition-all active:scale-95">
          متوجه شدم
        </button>
      </motion.div>
    </div>
  );
};

export default UserPanel;