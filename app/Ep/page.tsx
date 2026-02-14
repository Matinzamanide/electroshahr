"use client"
import { useAuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
const Exit = () => {
  const { handleLogout } = useAuthContext();

  return (
    <div className="relative group max-w-max my-8">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-linear-to-r from-red-500 via-orange-500 to-red-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-red-500/40 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm border border-red-400/30 font-medium"
        aria-label="خروج اضطراری"
      >
        <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
        خروج اضطراری
      </button>
      <div className="absolute top-full left-0 mt-3 p-3 bg-gray-900/90 backdrop-blur-sm text-gray-200 text-sm rounded-lg border border-gray-700/50 max-w-80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl z-10">
        ⚠️ این دکمه را فقط در مواقعی فشار دهید که صفحه پنل کاربری لود نمی‌شود و نمی‌توانید از حساب خود خارج شوید.
      </div>
    </div>
  );
};

export default Exit;