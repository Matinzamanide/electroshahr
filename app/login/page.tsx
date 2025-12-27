"use client";

import { useState, useEffect } from "react";
import { Lock, User, Eye, EyeOff, LogIn, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const VALID_USERNAME = "electroshahrzare";
  const VALID_PASSWORD = "electroshahrzxcvb";

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    setTimeout(() => {
      if (formData.username === VALID_USERNAME && formData.password === VALID_PASSWORD) {
        localStorage.setItem("isLoggedIn", "true");
        router.replace("/admin/dashboard");
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 font-[vazir,system-ui]" dir="rtl">
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -z-10" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[450px]">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/5 border border-white">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-4xl text-white mb-6 shadow-xl">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-black text-slate-900">الکتروشهر زارع</h1>
            <p className="text-slate-400 text-sm mt-2 font-bold uppercase tracking-widest">Admin Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 mr-2">نام کاربری</label>
              <div className="relative group">
                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" size={20} />
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 text-center   pl-5 focus:bg-white focus:border-blue-500 outline-none transition-all font-bold"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 mr-2">رمز عبور</label>
              <div className="relative group">
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="w-full bg-slate-50 border text-center border-slate-100 rounded-2xl py-5 pr-14 pl-14 focus:bg-white focus:border-blue-500 outline-none transition-all font-sans font-bold"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-xs font-bold">
                  <AlertCircle size={16} /> نام کاربری یا رمز عبور اشتباه است.
                </motion.div>
              )}
            </AnimatePresence>

            <button disabled={isLoading} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
              {isLoading ? "در حال بررسی..." : "ورود به مدیریت"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}