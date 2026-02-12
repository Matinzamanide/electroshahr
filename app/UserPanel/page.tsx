"use client";

import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Phone, LogOut, ShoppingBag,
  MapPin, Calendar, Hash, Copy, 
  Check, Clock, Info
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
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  // Fix: Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) router.push("/authentication");
  }, [isLoggedIn, router]);

  // Fix: API URL spacing bug + cleanup
  useEffect(() => {
    if (!isLoggedIn || !phoneNumber) return;
    
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`https://apitak.ir/electroshahr/auth/get_user_info.php?phone=${phoneNumber}`);
        setUserData(res.data);
        setName(res.data.name);
        setFamily(res.data.family);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    
    fetchUserData();
  }, [isLoggedIn, phoneNumber, setName, setFamily]);

  // Fix: API URL spacing bug
  useEffect(() => {
    if (!isLoggedIn || !phoneNumber) return;
    
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await axios.get(`https://apitak.ir/electroshahr/orders/submit_order.php?user_phone=${phoneNumber}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoadingOrders(false);
      }
    };
    
    fetchOrders();
  }, [isLoggedIn, phoneNumber]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-[vazirmatn] text-slate-800" dir="rtl">
      {/* Simplified header */}
      <div className="h-32 bg-blue-600 relative">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-2xl"></div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Profile Card - Simplified */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-lg">
                    {name || userData?.name} {family || userData?.family}
                  </h2>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    <span className="text-xs text-amber-700 font-medium">سطح طلایی</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <ProfileStat icon={<Phone size={16}/>} label="شماره تماس" value={phoneNumber || "-"} />
                <ProfileStat icon={<MapPin size={16}/>} label="استان" value="اصفهان" />
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-100 hover:bg-red-50 text-red-600 rounded-xl font-medium transition-colors"
              >
                <LogOut size={18} />
                خروج از حساب
              </button>
            </div>
          </aside>

          {/* Orders Section - Streamlined */}
          <section className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">تاریخچه سفارشات</h2>
                  <p className="text-gray-500 text-sm mt-0.5">همه سفارش‌های شما در یکجا</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {orders.length}
                </div>
              </div>

              <div className="p-4 space-y-3">
                {loadingOrders ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : orders.length > 0 ? (
                  orders.map((order, index) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      onPay={() => setSelectedOrder(order)} 
                    />
                  ))
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>سفارشی وجود ندارد</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Simplified Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <PaymentModal 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Simplified ProfileStat
const ProfileStat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
    <span className="font-medium">{value}</span>
  </div>
);

// Streamlined OrderCard
const OrderCard = ({ order, onPay }: { order: IOrder; onPay: () => void }) => {
  const products = (() => {
    try { return JSON.parse(order.products); } 
    catch { return []; }
  })();
  
  const isPaid = order.payment_status === "پرداخت شده" || order.payment_status.includes("موفق");
  const statusColor = isPaid ? "bg-green-50 text-green-700 border-green-100" : "bg-amber-50 text-amber-700 border-amber-100";

  return (
    <div className="border border-gray-100 rounded-xl p-4 hover:border-blue-100 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <div className="text-xs text-gray-500">کد سفارش</div>
            <div className="font-bold flex items-center gap-1.5 mt-0.5">
              <Hash size={14} className="text-blue-500" /> {order.id}
            </div>
          </div>
          <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>
          <div>
            <div className="text-xs text-gray-500">تاریخ</div>
            <div className="flex items-center gap-1 mt-0.5 text-sm text-gray-600">
              <Calendar size={14} /> {order.created_at}
            </div>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
          {order.payment_status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-50 rounded-lg p-3 mb-3">
        <div>
          <div className="text-xs text-gray-500 mb-0.5">مبلغ</div>
          <div className="font-bold text-blue-600">
            {Number(order.total_price).toLocaleString()} تومان
          </div>
        </div>
        
        <div className="hidden md:block border-l border-gray-200 pl-3">
          <div className="text-xs text-gray-500 mb-0.5">آدرس</div>
          <div className="text-sm text-gray-700 line-clamp-1">
            {order.province}، {order.city}
          </div>
        </div>
        
        <div className="md:border-l md:border-gray-200 md:pl-3">
          <div className="text-xs text-gray-500 mb-0.5">روش ارسال</div>
          <div className="text-sm font-medium text-gray-700">{order.shipping_method || "استاندارد"}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {products.slice(0, 3).map((p: any, i: number) => (
          <OrderItem key={i} id={p.id} qty={p.qty} />
        ))}
        {products.length > 3 && (
          <span className="text-xs text-gray-500">+{products.length - 3} آیتم دیگر</span>
        )}
      </div>

      <div className="flex justify-end pt-2 border-t border-gray-100">
        {isPaid ? (
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
            مشاهده جزئیات
          </button>
        ) : (
          <button
            onClick={onPay}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5"
          >
            پرداخت سفارش
          </button>
        )}
      </div>
    </div>
  );
};

// Minimalist PaymentModal
const PaymentModal = ({ order, onClose }: { order: IOrder; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const cardNumber = "6037-9973-6581-9722";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cardNumber.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden relative z-10"
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-4 sm:hidden" />
        
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-center">پرداخت سفارش #{order.id}</h3>
        </div>

        <div className="p-5 space-y-5">
          <div className="border-2 border-dashed rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-2 flex items-center justify-center gap-1.5">
              <Info size={14} /> شماره کارت بانک ملی
            </div>
            <div 
              className="font-mono text-lg font-bold tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleCopy}
            >
              {cardNumber}
            </div>
            <div className="mt-2 flex justify-center">
              {copied ? (
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <Check size={14} /> کپی شد!
                </span>
              ) : (
                <button 
                  onClick={handleCopy}
                  className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                >
                  <Copy size={14} /> کپی شماره کارت
                </button>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">مبلغ قابل پرداخت:</span>
              <span className="font-bold text-blue-700 text-lg">
                {Number(order.total_price).toLocaleString()} تومان
              </span>
            </div>
            <div className="text-xs text-blue-800/80 mt-1 flex items-center gap-1">
              <Clock size={12} /> پس از پرداخت فیش را برای ما ارسال کنید
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
              <Phone size={16} className="text-blue-500 shrink-0" />
              <span>پشتیبانی: ۰۳۱-۳۴۲۵۸۰۷۰ (شنبه تا چهارشنبه ۸ الی ۱۷)</span>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-amber-800 text-sm">
              <strong className="ml-1">نکته:</strong> حتماً شماره سفارش را در توضیحات واریز بنویسید
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            متوجه شدم
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserPanel;