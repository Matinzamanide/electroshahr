// "use client";

// import { useState, FormEvent, ReactNode } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Phone, User, Lock, ArrowLeft, 
//   CheckCircle2, Loader2, Sparkles, UserPlus 
// } from "lucide-react";

// interface RegisterForm {
//   phone: string;
//   firstName: string;
//   lastName: string;
//   password: string;
// }

// // تعریف تایپ برای پروپ‌های InputField
// interface InputFieldProps {
//   label: string;
//   icon: ReactNode;
//   type?: "text" | "password" | "tel";
//   value: string;
//   onChange: (val: string) => void;
//   placeholder?: string;
// }

// export default function RegisterPage() {
//   const [step, setStep] = useState<1 | 2>(1);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

//   const [form, setForm] = useState<RegisterForm>({
//     phone: "",
//     firstName: "",
//     lastName: "",
//     password: "",
//   });

//   const handlePhoneSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!/^09\d{9}$/.test(form.phone)) {
//       setMessage({ type: 'error', text: "شماره موبایل معتبر نیست" });
//       return;
//     }
//     setMessage(null);
//     setStep(2);
//   };

//   const handleRegister = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const res = await fetch("https://apika.ir/electroshahr/registerUser.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         setMessage({ type: 'error', text: data.error || "خطا در ثبت‌نام" });
//       } else {
//         setMessage({ type: 'success', text: "خوش آمدید! ثبت‌نام با موفقیت انجام شد ✅" });
//       }
//     } catch {
//       setMessage({ type: 'error', text: "خطا در ارتباط با سرور" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden p-4 font-[vazir,sans-serif]">
      
//       {/* المان‌های تزئینی پس‌زمینه */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[120px] opacity-50" />

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-[450px] bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 md:p-10 relative z-10"
//       >
//         <div className="text-center space-y-2 mb-10">
//           <div className="inline-flex p-4 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-200 mb-2">
//             <UserPlus size={28} />
//           </div>
//           <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
//             {step === 1 ? "ایجاد حساب" : "تکمیل پروفایل"}
//           </h1>
//           <p className="text-slate-500 font-medium text-sm">
//             {step === 1 ? "برای شروع شماره موبایل خود را وارد کنید" : "اطلاعات فردی خود را تکمیل کنید"}
//           </p>
//         </div>

//         <div className="flex items-center justify-center gap-2 mb-8">
//           <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'w-8 bg-blue-600' : 'w-4 bg-slate-200'}`} />
//           <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 2 ? 'w-8 bg-blue-600' : 'w-4 bg-slate-200'}`} />
//         </div>

//         <AnimatePresence mode="wait">
//           {message && (
//             <motion.div 
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
//                 message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
//               }`}
//             >
//               <CheckCircle2 size={18} />
//               {message.text}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <form onSubmit={step === 1 ? handlePhoneSubmit : handleRegister} className="space-y-5">
//           <AnimatePresence mode="wait">
//             {step === 1 ? (
//               <motion.div 
//                 key="step1"
//                 initial={{ opacity: 0, x: 20 }} 
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//               >
//                 <InputField 
//                   label="شماره موبایل" 
//                   icon={<Phone size={18} />}
//                   type="tel"
//                   placeholder="09123456789"
//                   value={form.phone}
//                   onChange={(val) => setForm(prev => ({ ...prev, phone: val }))}
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 group mt-6 shadow-xl shadow-slate-200"
//                 >
//                   ادامه مسیر
//                   <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//                 </button>
//               </motion.div>
//             ) : (
//               <motion.div 
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }} 
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-4"
//               >
//                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4">
//                     <span className="text-xs font-bold text-slate-400">شماره موبایل شما:</span>
//                     <span className="text-sm font-black text-blue-600">{form.phone}</span>
//                     <button type="button" onClick={() => setStep(1)} className="mr-auto text-[10px] bg-white px-2 py-1 rounded-lg border text-slate-500 hover:text-blue-600 transition-colors">اصلاح</button>
//                  </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <InputField 
//                     label="نام" 
//                     icon={<User size={18} />}
//                     value={form.firstName}
//                     onChange={(val) => setForm(prev => ({ ...prev, firstName: val }))}
//                   />
//                   <InputField 
//                     label="نام خانوادگی" 
//                     icon={<User size={18} />}
//                     value={form.lastName}
//                     onChange={(val) => setForm(prev => ({ ...prev, lastName: val }))}
//                   />
//                 </div>

//                 <InputField 
//                   label="رمز عبور" 
//                   type="password"
//                   icon={<Lock size={18} />}
//                   placeholder="حداقل ۶ کاراکتر"
//                   value={form.password}
//                   onChange={(val) => setForm(prev => ({ ...prev, password: val }))}
//                 />

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
//                 >
//                   {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
//                   {loading ? "در حال ایجاد حساب..." : "تایید و عضویت"}
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </form>

//         <p className="text-center mt-8 text-slate-400 text-xs font-bold">
//           قبلاً ثبت‌نام کرده‌اید؟ <a href="/login" className="text-blue-600 hover:underline">وارد شوید</a>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// function InputField({ label, icon, type = "text", value, onChange, placeholder }: InputFieldProps) {
//   return (
//     <div className="space-y-2 text-right">
//       <label className="block text-xs font-black text-slate-700 mr-2">{label}</label>
//       <div className="relative group">
//         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
//           {icon}
//         </div>
//         <input
//           type={type}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder}
//           className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pr-12 pl-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-medium text-slate-900 placeholder:text-slate-300"
//           required
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Lock, ArrowRight, Loader2, Sparkles, UserPlus, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

interface FormState {
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function Register() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false); // وضعیت جدید برای جلوگیری از ثبت نام مجدد

  const [form, setForm] = useState<FormState>({
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    const registrationStatus = localStorage.getItem('isRegistered');
    if (registrationStatus === 'true') {
      setIsAlreadyRegistered(true);
    }
  }, []);

  const showAlert = (title: string, text: string, icon: 'success' | 'error' | 'warning') => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'متوجه شدم',
      confirmButtonColor: '#2563eb',
      customClass: {
        popup: 'rounded-[2rem] font-[vazir]',
        confirmButton: 'rounded-xl px-8 py-3'
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneSubmit = () => {
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      showAlert('شماره نامعتبر', 'لطفاً یک شماره موبایل صحیح وارد کنید (مثلاً 09123456789)', 'warning');
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    if (!form.firstName.trim() || !form.lastName.trim() || form.password.length < 6) {
      showAlert('اطلاعات ناقص', 'لطفاً تمام فیلدها را پر کنید (رمز عبور حداقل ۶ کاراکتر)', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://apika.ir/electroshahr/registerUser.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          first_name: form.firstName,
          last_name: form.lastName,
          password: form.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isRegistered', 'true');
        localStorage.setItem('name', form.firstName);
        localStorage.setItem('lastName', form.lastName);
        localStorage.setItem('phoneNumber', form.phone);

        Swal.fire({
          title: 'تبریک! 🎉',
          text: 'حساب کاربری شما با موفقیت ساخته شد',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: { popup: 'rounded-[2rem] font-[vazir]' }
        });

        setIsAlreadyRegistered(true);
      } else {
        showAlert('خطای سیستم', data.error || "مشکلی در ثبت اطلاعات پیش آمد", 'error');
      }
    } catch (error) {
      showAlert('خطای شبکه', 'ارتباط با سرور برقرار نشد. اینترنت خود را بررسی کنید', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (isAlreadyRegistered) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-[vazir,sans-serif]" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-10 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">شما قبلاً عضو شده‌اید!</h2>
          <p className="text-slate-500 mb-8 font-medium">حساب کاربری شما فعال است. می‌توانید وارد پنل کاربری خود شوید.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'} // یا هر صفحه دیگری
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all"
          >
            ورود به پنل کاربری
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-[vazir,sans-serif]" dir="rtl">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        layout
        className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-200">
            <UserPlus size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {step === 1 ? "ایجاد حساب" : "تکمیل پروفایل"}
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            {step === 1 ? "خوش آمدید! شماره خود را وارد کنید" : "جزییات پروفایل را تکمیل کنید"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <InputGroup
                label="شماره موبایل"
                icon={<Phone size={18} />}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="09xxxxxxxxx"
                type="tel"
              />
              <button
                onClick={handlePhoneSubmit}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200"
              >
                ادامه مسیر
                <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <InputGroup
                  label="نام"
                  icon={<User size={18} />}
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="علی"
                />
                <InputGroup
                  label="نام خانوادگی"
                  icon={<User size={18} />}
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="زارع"
                />
              </div>

              <InputGroup
                label="رمز عبور"
                icon={<Lock size={18} />}
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="******"
              />

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                  {loading ? "در حال پردازش..." : "تایید و ثبت نام نهایی"}
                </button>
                
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-400 text-xs font-bold hover:text-blue-600 transition-colors"
                >
                  ویرایش شماره ({form.phone})
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function InputGroup({ label, icon, ...props }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black text-slate-500 mr-2">{label}</label>
      <div className="relative group">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
          {icon}
        </div>
        <input
          {...props}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pr-11 pl-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-medium text-slate-800 placeholder:text-slate-300"
        />
      </div>
    </div>
  );
}