"use client";
import AddProduct from "@/components/AddProduct";
import ProductDetailPage from "@/components/ProductDetailPage";
import axios from "axios";

const Example = () => {
  const deleteHandler = () => {
    axios
      .post("https://apitak.ir/electroshahr/deleteProduct.php", {
        id: 24,
      })
      .then((res) => {
        console.log("Success:", res.data);
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err);
      });
  };
  return (
    <>
      <AddProduct />
      {/* <ProductDetailPage /> */}

      {/* <button className="bg-red-300 text-red-700 px-3 py-1 rounded mr-5" onClick={deleteHandler}>
        حذف محصول
      </button> */}
    </>
  );
};

export default Example;
