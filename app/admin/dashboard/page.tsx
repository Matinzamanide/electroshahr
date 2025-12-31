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
  Search,
  Plus,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { IProduct } from "@/types/types";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
      fetchProducts();
    }
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://apika.ir/electroshahr/getProducts.php");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteProduct = (id_num: number) => {
    Swal.fire({
      title: "مطمئنی ؟",
      text: "مطمئنی میخوای این محصول رو حذفش کنی ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "آره حذفش کن",
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post("https://apika.ir/electroshahr/deleteProduct.php", {
            id: id_num,
          });



        Swal.fire({
          title: "حذف شد!",
          text: "محصول با موفقیت حذف شد .",
          icon: "success",
        });
      }
    });

   
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace("/login");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="font-bold text-slate-400 italic">
          در حال تایید دسترسی...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" dir="rtl">
      <aside className="w-80 bg-slate-900 m-4 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl">
        <div className="space-y-10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              پنل مدیریت
            </span>
          </div>

          <nav className="space-y-2">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="پیشخوان"
              active
            />
            <NavItem icon={<Package size={20} />} label="مدیریت محصولات" />
            <NavItem icon={<Users size={20} />} label="لیست مشتریان" />
            <NavItem icon={<Settings size={20} />} label="تنظیمات سیستم" />
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-slate-400 font-bold hover:text-red-400 hover:bg-red-400/10 p-4 rounded-2xl transition-all w-full"
        >
          <LogOut size={20} /> خروج از حساب
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-slate-900">لیست محصولات</h1>
            <p className="text-slate-500 font-medium mt-1">
              مدیریت موجودی و ویرایش کاتالوگ الکتروشهر
            </p>
          </div>
          <Link href={'/example'}
           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all">
            <Plus size={20} /> افزودن محصول جدید
          </Link>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="جستجوی نام محصول یا برند..."
              className="w-full bg-white border border-slate-100 rounded-2xl text-center py-4 pr-14 pl-5 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchProducts}
            className="bg-white p-4 rounded-2xl border border-slate-100 text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Loader2 className="animate-spin" size={40} />
              <span className="font-bold">در حال بارگذاری لیست...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-sm font-black text-slate-400 uppercase tracking-widest">
                      تصویر
                    </th>
                    <th className="p-6 text-sm font-black text-slate-400 uppercase tracking-widest">
                      نام محصول
                    </th>
                    <th className="p-6 text-sm font-black text-slate-400 uppercase tracking-widest">
                      برند
                    </th>
                    <th className="p-6 text-sm font-black text-slate-400 uppercase tracking-widest text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProducts.map((product, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="p-6">
                        <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-100">
                          <Image
                            src={product.images[0]}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="font-black text-slate-900">
                          {product.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-mono">
                          ID: {index + 1000}
                        </p>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black">
                          {product.brand || "متفرقه"}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            href={`/edit/${product.id}`}
                            className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="ویرایش"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="حذف"
                          >
                            <Trash2 size={18} />
                          </button>
                          <Link href={product.url?? ""}
                            className="p-3 text-slate-400 hover:text-slate-900 rounded-xl transition-all"
                            title="نمایش در سایت"
                          >
                            <ExternalLink size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="p-20 text-center text-slate-400 font-bold italic">
                  محصولی پیدا نشد!
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}
