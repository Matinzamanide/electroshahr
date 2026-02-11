"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  LogOut,
  LayoutDashboard,
  Package,
  Users,
  Settings,
  Trash2,
  Edit3,
  Plus,
  Phone,
  User as UserIcon,
  ShoppingBag,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { IProduct } from "@/types/types";
import AddProduct from "@/components/AddProduct";

const MySwal = withReactContent(Swal);

interface ICustomer {
  name: string;
  family: string;
  phone: string;
}

interface IOrderItem {
  id: number;
  qty: number;
}

interface IOrder {
  id: string;
  user_id: string;
  province: string;
  city: string;
  postal_code: string;
  address: string;
  phone: string;
  shipping_method: string;
  products: string; // رشته JSON
  total_price: string;
  old_total_price: string;
  payment_status: string;
  created_at: string;
  name: string;
  family: string;
  user_phone: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "customers" | "orders" | "newProduct">("products");
  
  // States
  const [products, setProducts] = useState<IProduct[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Loading states for actions
  const [loadingOrderItems, setLoadingOrderItems] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
      fetchProducts();
    }
  }, [router]);

  // --- API Functions ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://apitak.ir/electroshahr/getProducts.php");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("خطا:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://apitak.ir/electroshahr/auth/get_user.php");
      setCustomers(res.data.data || []);
    } catch (error) {
      console.error("خطا:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://apitak.ir/electroshahr/orders/submit_order.php");
      const orderData = Array.isArray(res.data) ? res.data : res.data.data;
      setOrders(orderData || []);
    } catch (error) {
      console.error("خطا در دریافت سفارشات:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = (id_num: number) => {
    Swal.fire({
      title: "مطمئنی ؟",
      text: "محصول حذف شود؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("https://apitak.ir/electroshahr/deleteProduct.php", { id: id_num })
          .then(() => {
            setProducts(products.filter(p => p.id !== id_num));
            Swal.fire("حذف شد!", "", "success");
          });
      }
    });
  };

  // --- Order Items Modal ---
  const showOrderItems = async (orderId: string, productsStr: string) => {
    setLoadingOrderItems(orderId);
    try {
      const items: IOrderItem[] = JSON.parse(productsStr);
      const productDetails = [];

      for (const item of items) {
        const res = await axios.get(`https://apitak.ir/electroshahr/getProducts.php?id=${item.id}`);
        productDetails.push({
          ...res.data,
          qty: item.qty
        });
      }

      MySwal.fire({
        title: 'اقلام سفارش',
        html: (
          <div className="space-y-4 text-right" dir="rtl">
            {productDetails.map((item: any, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg bg-slate-50">
                <Image src={item.images?.[0] || '/placeholder.png'} alt={item.title} width={60} height={60} className="rounded-md object-cover" />
                <div>
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="text-sm text-blue-600">تعداد: {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        ),
        confirmButtonText: 'بستن',
        confirmButtonColor: '#2563eb'
      });

    } catch (error) {
      console.error("خطا در پردازش محصولات:", error);
      Swal.fire("خطا", "امکان دریافت جزئیات محصولات وجود ندارد", "error");
    } finally {
      setLoadingOrderItems(null);
    }
  }

  // --- Update Order Status ---
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      await axios.post("https://apitak.ir/electroshahr/orders/submit_order.php", {
        id: orderId,
        payment_status: newStatus
      });

      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, payment_status: newStatus } : order
        )
      );

      Swal.fire({
        title: "وضعیت به‌روز شد",
        text: `وضعیت سفارش به "${newStatus}" تغییر کرد.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("خطا در به‌روزرسانی وضعیت:", error);
      Swal.fire("خطا", "امکان تغییر وضعیت وجود ندارد", "error");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatPrice = (price: string) => {
    if (!price || isNaN(parseInt(price))) return "0 تومان";
    return parseInt(price).toLocaleString() + " تومان";
  };

  if (!isAuthorized) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" dir="rtl">
      <aside className="w-80 bg-slate-900 m-4 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl shrink-0">
        <div className="space-y-10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">پنل مدیریت</span>
          </div>

          <nav className="space-y-2">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="مدیریت محصولات"
              active={activeTab === "products"}
              onClick={() => { setActiveTab("products"); fetchProducts(); }}
            />
            <NavItem
              icon={<ShoppingBag size={20} />}
              label="سفارشات جدید"
              active={activeTab === "orders"}
              onClick={() => { setActiveTab("orders"); fetchOrders(); }}
            />
            <NavItem
              icon={<Users size={20} />}
              label="لیست مشتریان"
              active={activeTab === "customers"}
              onClick={() => { setActiveTab("customers"); fetchCustomers(); }}
            />
            <NavItem
              icon={<Users size={20} />}
              label="اضافه کردن محصول"
              active={activeTab === "newProduct"}
              onClick={() => { setActiveTab("newProduct"); }}
            />
            <NavItem icon={<Settings size={20} />} label="تنظیمات سیستم" />
          </nav>
        </div>

        <button onClick={() => { localStorage.removeItem("isLoggedIn"); router.replace("/login"); }}
          className="flex items-center gap-3 text-slate-400 font-bold hover:text-red-400 hover:bg-red-400/10 p-4 rounded-2xl transition-all">
          <LogOut size={20} /> خروج
        </button>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              {activeTab === "products" ? "لیست محصولات" : activeTab === "orders" ? "مدیریت سفارشات" : "لیست مشتریان"}
            </h1>
            <p className="text-slate-500 font-medium mt-1">پنل مدیریت فروشگاه الکتروشهر</p>
          </div>
          {activeTab === "products" && (
            <Link href="/example" className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg">
              <Plus size={20} /> افزودن محصول
            </Link>
          )}
        </header>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400 gap-4">
            <Loader2 className="animate-spin" size={40} />
            <span className="font-bold">در حال دریافت اطلاعات...</span>
          </div>
        ) : (
          <div className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              {activeTab === "products" && (
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="p-6 text-sm font-black text-slate-400">تصویر</th>
                      <th className="p-6 text-sm font-black text-slate-400">نام محصول</th>
                      <th className="p-6 text-sm font-black text-slate-400">برند</th>
                      <th className="p-6 text-sm font-black text-slate-400 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50">
                        <td className="p-6">
                          <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden relative">
                            <Image src={product.images[0] || ""} alt={product.title} fill className="object-cover" unoptimized />
                          </div>
                        </td>
                        <td className="p-6 font-black text-slate-900">{product.title}</td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black">{product.brand || "متفرقه"}</span>
                        </td>
                        <td className="p-6 flex justify-center gap-3">
                          <Link href={`/edit/${product.id}`} className="p-3 text-slate-400 hover:text-blue-600"><Edit3 size={18} /></Link>
                          <button onClick={() => deleteProduct(product.id)} className="p-3 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "customers" && (
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="p-6 text-sm font-black text-slate-400">نام مشتری</th>
                      <th className="p-6 text-sm font-black text-slate-400">شماره تماس</th>
                      <th className="p-6 text-sm font-black text-slate-400 text-center">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((user, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 border-b border-slate-50">
                        <td className="p-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><UserIcon size={20} /></div>
                          <span className="font-black text-slate-900">{user.name} {user.family}</span>
                        </td>
                        <td className="p-6 font-mono text-slate-600">{user.phone}</td>
                        <td className="p-6 text-center"><span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-black">فعال</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
              {activeTab === "orders" && (
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="p-6 text-sm font-black text-slate-400">جزئیات مشتری</th>
                      <th className="p-6 text-sm font-black text-slate-400">آدرس ارسال</th>
                      <th className="p-6 text-sm font-black text-slate-400">مبلغ کل</th>
                      <th className="p-6 text-sm font-black text-slate-400 text-center">وضعیت پرداخت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <div className="space-y-1">
                            <p className="font-black text-slate-900">{order.name} {order.family}</p>
                            <p className="flex items-center gap-1 text-xs text-slate-500 font-mono"><Phone size={12} /> {order.user_phone}</p>
                            <p className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><Calendar size={10}/> {order.created_at}</p>
                            
                            <button 
                              onClick={() => showOrderItems(order.id, order.products)}
                              disabled={loadingOrderItems === order.id}
                              className="bg-blue-100 rounded-md text-center py-2 text-blue-700 w-full text-sm font-bold flex items-center justify-center gap-2"
                            >
                              {loadingOrderItems === order.id ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
                              مشاهده اقلام
                            </button>
                          </div>
                        </td>
                        <td className="p-6 max-w-xs">
                          <div className="flex flex-col gap-1 text-xs text-slate-600">
                            <span className="font-bold text-slate-900 flex items-center gap-1"><MapPin size={14} className="text-red-400"/> {order.province}، {order.city}</span>
                            <span className="line-clamp-1">{order.address}</span>
                            <span className="text-slate-400">کد پستی: {order.postal_code}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            <p className="font-black text-blue-600">{formatPrice(order.total_price)}</p>
                            <p className="text-[10px] text-slate-400 line-through">{formatPrice(order.old_total_price)}</p>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col items-center gap-2">
                            {updatingStatus === order.id ? (
                              <Loader2 className="animate-spin text-blue-600" size={20} />
                            ) : (
                              <select 
                                value={order.payment_status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className={`px-3 py-1 rounded-lg text-xs font-black cursor-pointer border ${
                                  order.payment_status.includes("پرداخت شده") 
                                    ? "bg-green-50 text-green-700 border-green-200" 
                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}
                              >
                                <option value="پرداخت شده">پرداخت شده</option>
                                <option value="در انتظار پرداخت">در انتظار پرداخت</option>
                              </select>
                            )}
                            <span className="text-[10px] text-slate-400 font-bold">{order.shipping_method}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {
                activeTab==="newProduct"&&(
                  <AddProduct/>
                )
              }
              {((activeTab === "products" && products.length === 0) || (activeTab === "orders" && orders.length === 0)) && (
                <div className="p-20 text-center text-slate-400 font-bold italic">داده‌ای یافت نشد.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void; }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
      active ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`}>
      {icon}
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}