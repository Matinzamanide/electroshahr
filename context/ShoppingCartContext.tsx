"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShoppingCartContext = createContext({} as IShoppingCartContext);
export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};
interface ICartItems {
  id: number;
  qty: number;
}
interface IShoppingCartContext {
  cartItems: ICartItems[];
  cartTotalQty:number;
  handleIncreaseQty: (id: number) => void;
  handleDecreaseQty:(id:number)=>void;
  getProductQty: (id: number) => number;
  handleRemoveProduct:(id:number)=>void
}
interface IChildren {
  children: React.ReactNode;
}
export const ShoppingCartContextProvider: React.FC<IChildren> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const cartTotalQty=cartItems.reduce((totalQty,item)=>{
    return totalQty+item.qty;
  },0)
  const getProductQty = (id: number) => {
   return cartItems.find((item) => item.id == id)?.qty ??0;
  };
  const handleIncreaseQty = (id: number) => {
    setCartItems((currentItem) => {
      let isNotProductExists =
        currentItem.find((item) => item.id == id) == null;
      if (isNotProductExists) {
        return [...currentItem, { id: id, qty: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };
  const handleDecreaseQty = (id: number) => {
    toast("محصول با موفقیت حذف شد!", {
      icon: "👍🏼",
    });
    setCartItems((currentItems) => {
      const isLastOne = currentItems.find((item) => item.id === id)?.qty === 1;
      if (isLastOne) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        );
      }
    });
  };
  const handleRemoveProduct=(id:number)=>{
    setCartItems((currentItem)=>{
       return currentItem.filter((item)=>item.id !==id)
    })
  }
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);
  return (
    <ShoppingCartContext.Provider value={{ cartItems,cartTotalQty,getProductQty,handleDecreaseQty, handleIncreaseQty,handleRemoveProduct }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContextProvider;