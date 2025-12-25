import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { ShoppingCart, Plus, Minus, BellRing, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IAddCart {
  id: number;
  isAvailable: boolean;
}

const AddCart: React.FC<IAddCart> = ({ isAvailable, id }) => {
  const { getProductQty, handleIncreaseQty, cartItems,handleDecreaseQty } = useShoppingCartContext();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getProductQty(id));
  }, [cartItems, id, getProductQty]);

  return (
    <div className="w-full h-14 flex items-center justify-center font-iranyekan">
      <AnimatePresence mode="wait">
        {quantity < 1 ? (
          <motion.button
            key="add-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => isAvailable && handleIncreaseQty(id)}
            disabled={!isAvailable}
            className={`group relative flex items-center justify-center gap-3 w-full h-full rounded-2xl font-bold transition-all duration-500 overflow-hidden shadow-xl ${
              isAvailable
                ? "bg-linear-to-r from-indigo-600 via-blue-600 to-blue-500 text-white shadow-blue-200/50 hover:shadow-blue-400/40"
                : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            }`}
          >
            {/* Effect Layer */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {isAvailable ? (
              <>
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ShoppingCart size={22} />
                </motion.div>
                <span className="text-base tracking-wide">افزودن به سبد خرید</span>
              </>
            ) : (
              <>
                <BellRing size={20} className="animate-pulse" />
                <span className="text-base">موجود شد خبرم کن</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.div
            key="quantity-controls"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex items-center justify-between w-full h-full bg-white border-2 border-blue-500/20 rounded-2xl p-1.5 shadow-xl shadow-blue-100/50"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDecreaseQty(id)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            >
              {quantity === 1 ? <Trash2 size={20} /> : <Minus size={22} />}
            </motion.button>

            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest opacity-60">تعداد در سبد</span>
              <motion.span 
                key={quantity}
                initial={{ scale: 1.2, color: "#2563eb" }}
                animate={{ scale: 1, color: "#1e3a8a" }}
                className="text-xl font-black tabular-nums"
              >
                {quantity}
              </motion.span>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleIncreaseQty(id)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-200"
            >
              <Plus size={22} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddCart;