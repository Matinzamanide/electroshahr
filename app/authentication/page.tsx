"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ShieldCheck, UserCircle, ArrowRight, Loader2, RefreshCw } from "lucide-react";

const AuthFlow = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);
  const [showResendButton, setShowResendButton] = useState(false);

  const router = useRouter();
  const { 
    isLoggedIn, 
    setIsLoggedIn, 
    setPhoneNumber, 
    setName: setContextName, 
    setFamily: setContextFamily 
  } = useAuthContext();

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 100 : -100, opacity: 0 }),
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setShowResendButton(true);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [step, timer]);

  useEffect(() => {
    if (isLoggedIn) router.push("/UserPanel");
  }, [isLoggedIn, router]);

  // ۱. ارسال کد تایید
  const handleSendOtp = async (isResend = false) => {
    if (phone.length < 11) { setError("شماره موبایل معتبر نیست."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://apitak.ir/electroshahr/auth/send-otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ phone }),
      });
      const data = await res.json();
      
      // هماهنگ با status: 1 در PHP
      if (data.status === 1 || data.otp) {
        if (!isResend) setStep(2);
        setTimer(120);
        setShowResendButton(false);
      } else {
        setError(data.message || "خطا در ارسال کد.");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  };

  // ۲. تایید کد و بررسی وضعیت کاربر
  const handleVerifyOtp = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://apitak.ir/electroshahr/auth/verify-otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ phone, code: otp }),
      });
      const data = await res.json();
      
      if (data.status === "existing") {
        setPhoneNumber(phone);
        if (data.user) {
          setContextName(data.user.name);
          setContextFamily(data.user.family);
        }
        setIsLoggedIn(true);
      } else if (data.status === "new") {
        setIsNewUser(true);
        setStep(3);
      } else {
        setError(data.message || "کد وارد شده صحیح نیست.");
      }
    } catch (err) {
      setError("خطا در تایید کد.");
    } finally {
      setLoading(false);
    }
  };

  // ۳. ثبت‌نام کاربر جدید
  const handleRegister = async () => {
    if (!name || !family) { setError("لطفاً اطلاعات را کامل کنید."); return; }
    setLoading(true);
    try {
      const res = await fetch("https://apitak.ir/electroshahr/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ phone, name, family }),
      });
      const data = await res.json();
      if (data.success) {
        setPhoneNumber(phone);
        setContextName(name);
        setContextFamily(family);
        setIsLoggedIn(true);
      } else {
        setError(data.message);
      }
    } catch {
      setError("خطا در ثبت‌نام.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) return null;

  return (
    <div className="min-h-[500px] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_22px_70px_4px_rgba(0,0,0,0.1)] border border-white p-8 relative overflow-hidden">
        
        {/* هدر */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-3xl bg-blue-50 text-blue-600 mb-4">
            {step === 1 && <Phone size={32} />}
            {step === 2 && <ShieldCheck size={32} />}
            {step === 3 && <UserCircle size={32} />}
          </div>
          <h1 className="text-2xl font-black text-gray-800">
            {step === 1 && "خوش آمدید"}
            {step === 2 && "تایید هویت"}
            {step === 3 && "ساخت حساب کاربری"}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {step === 1 && "برای شروع شماره موبایل خود را وارد کنید"}
            {step === 2 && `کد پیامک شده به ${phone} را وارد کنید`}
            {step === 3 && "اطلاعات خود را برای اولین بار تکمیل کنید"}
          </p>
        </div>

        <AnimatePresence mode="wait" custom={step}>
          <motion.div
            key={step}
            custom={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-5"
          >
            {error && (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-red-50 text-red-600 p-3 rounded-2xl text-xs text-center border border-red-100">
                {error}
              </motion.div>
            )}

            {step === 1 && (
              <>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912XXXXXXX"
                    className="w-full bg-gray-50/50 border-2 border-gray-100 focus:border-blue-500 focus:bg-white rounded-2xl p-4 pr-12 outline-none transition-all text-left font-bold tracking-widest"
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button onClick={() => handleSendOtp()} disabled={loading} className="group w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : <>دریافت کد تایید <ArrowRight size={18} className="group-hover:-translate-x-1 transition-transform" /></>}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="• • • • • •"
                  maxLength={6}
                  className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-2xl p-4 text-center text-2xl font-black tracking-[1rem] outline-none transition-all"
                />
                <div className="flex justify-between items-center px-2 text-sm">
                  {showResendButton ? (
                    <button onClick={() => handleSendOtp(true)} className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
                      <RefreshCw size={14} /> ارسال مجدد کد
                    </button>
                  ) : (
                    <span className="text-gray-400 font-medium">ارسال مجدد تا {timer} ثانیه دیگر</span>
                  )}
                  <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-tighter">ویرایش شماره</button>
                </div>
                <button onClick={handleVerifyOtp} disabled={loading || otp.length < 6} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 text-white p-4 rounded-2xl font-bold shadow-lg shadow-green-100 transition-all">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "تایید و ادامه"}
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="نام" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 outline-none focus:border-purple-500 transition-all" />
                  <input type="text" value={family} onChange={(e) => setFamily(e.target.value)} placeholder="نام خانوادگی" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 outline-none focus:border-purple-500 transition-all" />
                </div>
                <button onClick={handleRegister} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-2xl font-bold shadow-lg shadow-purple-200 transition-all">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "تکمیل ثبت‌نام"}
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthFlow;