import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types/types";

const VideoIntercom = async () => {
  const res = await fetch("https://apika.ir/electroshahr/getProducts.php");
  const data = (await res.json()) as IProduct[];
  console.log(data);


  const filteredProducts=data.filter((item)=>item.categories.includes('لوازم کمپینگ'));
  console.log(filteredProducts);
  return (
    <div className="">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 my-10">
        <span className="border-b-4 border-orange-500 pb-1">
            انواع لوازم کمپینگ 
        </span>
      </h2>{" "}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-20">
        {data.map((item) => {
          return <div className="">
            {item.url}
          </div>
        })}
      </div>
    </div>
  );
};

export default VideoIntercom;
