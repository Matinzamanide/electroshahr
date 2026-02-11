// "use client";
// import CartItem from "@/components/cart-item";
// import { useShoppingCartContext } from "@/context/ShoppingCartContext";
// import { IProduct } from "@/types/types";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   ShoppingBag,
//   CreditCard,
//   TicketPercent,
//   ArrowLeft,
//   ShieldCheck,
// } from "lucide-react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const Cart = () => {
//   const [data, setData] = useState<IProduct[]>([]);
//   const { cartItems } = useShoppingCartContext();

//   useEffect(() => {
//     axios("https://apitak.ir/electroshahr/getProducts.php").then((res) => {
//       setData(res.data);
//     });
//   }, []);

  // const totalBeforeDiscount = cartItems.reduce((total, item) => {
  //   const productData = data.find((p) => p.id == item.id);
  //   const price =
  //     Number(productData?.before_discount_price) ||
  //     Number(productData?.price) ||
  //     0;
  //   return total + price * item.qty;
  // }, 0);

//   const totalFinalPrice = cartItems.reduce((total, item) => {
//     const productData = data.find((p) => p.id == item.id);
//     const price = Number(productData?.price) || 0;
//     return total + price * item.qty;
//   }, 0);

//   const totalProfit = totalBeforeDiscount - totalFinalPrice;

//   if (cartItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
//         <ShoppingBag size={80} className="text-gray-200" />
//         <h2 className="text-2xl font-bold text-gray-400 font-iranyekan">
//           سبد خرید شما خالی است!
//         </h2>
//         <Link
//           href="/"
//           className="text-blue-600 flex items-center gap-2 hover:underline"
//         >
//           مشاهده محصولات <ArrowLeft size={18} />
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="max-w-7xl mx-auto p-4 md:p-8 font-iranyekan text-right"
//       dir="rtl"
//     >
//       <header className="flex items-center gap-4 mb-10">
//         <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-100">
//           <ShoppingBag className="text-white" size={28} />
//         </div>
//         <div>
//           <h1 className="text-2xl md:text-3xl font-black text-gray-800">
//             سبد خرید
//           </h1>
//           <p className="text-gray-400 text-sm mt-1">
//             {cartItems.length} کالا در لیست خرید شما
//           </p>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         <div className="lg:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             <CartItem id={item.id} qty={item.qty} key={item.id} />
//           ))}
//         </div>

//         {/* فاکتور پرداخت */}
//         <div className="lg:col-span-1">
//           <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/40 sticky top-24">
//             <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
//               <CreditCard size={22} className="text-blue-600" />
//               جزئیات صورتحساب
//             </h2>

//             <div className="space-y-6">
//               <div className="flex justify-between items-center text-gray-500">
//                 <span className="text-sm">قیمت کل کالاها</span>
//                 <span className="font-bold text-lg">
//                   {totalBeforeDiscount.toLocaleString()}{" "}
//                   <small className="text-[10px] mr-1">تومان</small>
//                 </span>
//               </div>

//               {totalProfit > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex justify-between items-center bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-100/50"
//                 >
//                   <div className="flex items-center gap-2">
//                     <TicketPercent size={20} />
//                     <span className="text-sm font-bold">
//                       سود شما از این خرید:
//                     </span>
//                   </div>
//                   <span className="text-lg font-black">
//                     {totalProfit.toLocaleString()}{" "}
//                     <small className="text-[10px] mr-1">تومان</small>
//                   </span>
//                 </motion.div>
//               )}

//               <div className="h-px bg-gray-100 my-6" />

//               <div className="flex justify-between items-center">
//                 <span className="font-black text-gray-800 text-lg">
//                   مبلغ قابل پرداخت
//                 </span>
//                 <div className="flex flex-col items-end">
//                   <span className="text-3xl font-black text-blue-600 tracking-tighter">
//                     {totalFinalPrice.toLocaleString()}
//                   </span>
//                   <span className="text-[10px] font-bold text-blue-500 mt-1">
//                     تومان
//                   </span>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 mt-6"
//               >
//                 ادامه فرآیند خرید
//                 <ArrowLeft size={20} />
//               </motion.button>

//               <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-[11px] bg-gray-50 py-3 rounded-xl">
//                 <ShieldCheck size={16} className="text-emerald-500" />
//                 <span>پرداخت امن و ضمانت بازگشت وجه</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { useAuthContext } from "@/context/AuthContext";
import CartItem from "@/components/cart-item";
import OrderForm from "@/components/order-form";

interface IProductData {
  id: number;
  price: number;
  old_price?: number;
}

const Cart = () => {
  const { cartItems } = useShoppingCartContext();
  const [productsData, setProductsData] = useState<IProductData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null); // New state for login message
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const promises = cartItems.map((item) =>
        axios(`https://apitak.ir/electroshahr/getProducts.php?id=${item.id}`).then(
          (res) => {
            const data = Array.isArray(res.data) ? res.data[0] : res.data;
            return {
              id: item.id,
              price: data.price,
              old_price: data.old_price || Math.round(data.price / 0.9),
            };
          }
        )
      );

      const allData = await Promise.all(promises);
      setProductsData(allData);
    };

    if (cartItems.length > 0) fetchData();
  }, [cartItems]);

  // محاسبه قیمت‌ها
  const totalPrice = cartItems.reduce((acc, item) => {
    const product = productsData.find((p) => p.id === item.id);
    return acc + (product?.price || 0) * item.qty;
  }, 0);

  const totalOldPrice = cartItems.reduce((acc, item) => {
    const product = productsData.find((p) => p.id === item.id);
    const baseOldPrice =
      typeof product?.old_price === "number"
        ? product.old_price
        : product?.price || 0;
    return acc + baseOldPrice * item.qty;
  }, 0);

  const handleContinueCheckout = () => {
    if (!isLoggedIn) {
      setLoginMessage(
        "برای ادامه فرآیند خرید، ابتدا باید وارد حساب کاربری خود شوید."
      );
    } else {
      setLoginMessage(null);
      setShowForm(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center">سبد خرید شما</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">سبد خرید شما خالی است.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} id={item.id} qty={item.qty} />
          ))}

          <div className="text-right mt-10 space-y-2 border-t pt-4">
            <div className="text-gray-500 text-lg">
              قیمت قبل تخفیف:{" "}
              <span className="line-through">
                {totalOldPrice.toLocaleString()} تومان
              </span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              مجموع نهایی: {totalPrice.toLocaleString()} تومان
            </div>

            {loginMessage && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-sm mt-4">
                {loginMessage}
              </div>
            )}

            {!showForm && (
              <button
                onClick={handleContinueCheckout}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                ادامه فرآیند خرید
              </button>
            )}
          </div>

          {showForm && (
            <OrderForm totalPrice={totalPrice} totalOldPrice={totalOldPrice} />
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
