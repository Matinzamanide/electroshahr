// import ProductCards from "@/components/ProductCard";

// const Gadjets=()=>{
//     const products=[
//         {
// id: '1',
// name: 'چراغ خواب سیلیکونی مدل اسب شاخدار',
// imageUrl: 'https://zamanigallerry.ir/uploads/products/672746.jpg?m=thumb&w=640&h=640&q=high',
// currentPrice: 1250000,
// oldPrice: 1580000,
// rating: 4.5,
// href: '/products/1',
// },
// {
// id: '2',
// name: 'چراغ خواب سیلیکونی مدل پاندا ',
// imageUrl: 'https://zamanigallerry.ir/uploads/products/cb8efa.webp?m=thumb&w=640&h=640&q=high',
// currentPrice: 3200000,
// oldPrice: 3490000,
// rating: 4.8,
// href: '/products/2',
// },
// {
// id: '3',
// name: 'چراغ خواب سیلیکونی مدل  آووکادو',
// imageUrl: 'https://zamanigallerry.ir/uploads/products/842de7.jpeg?m=thumb&w=640&h=640&q=high',
// currentPrice: 6800000,
// oldPrice: 7200000,
// rating: 4.6,
// href: '/products/3',
// },
// {
// id: '4',
// name: 'چراغ خواب سیلیکونی مدل گوسفند ',
// imageUrl: 'https://zamanigallerry.ir/uploads/products/c30087.jpeg?m=thumb&w=640&h=640&q=high',
// currentPrice: 1890000,

// rating: 4.2,
// href: '/products/4',
// },
//     ]
// return(
//     <div className="">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 w-[85%] mx-auto mt-20">
//             {
//                 products.map((item,index)=>{
//                     return <ProductCards key={index} {...item} />
//                 })
//             }
        
//         </div>
//     </div>
// )
// }
// export default Gadjets;

import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types/types";

const Gadjet = async () => {
  const res = await fetch("http://localhost/electroshahr/getProducts.php");
  const data = (await res.json()) as IProduct[];
  console.log(data);


  const filteredProducts=data.filter((item)=>item.categories.includes('گجت و دکوری'));
  console.log(filteredProducts);
  return (
    <div className="">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 my-10">
        <span className="border-b-4 border-orange-500 pb-1">
           انواع گجت و دکوری
        </span>
      </h2>{" "}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-20">
        {filteredProducts.map((item) => {
          return <ProductCard key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Gadjet;
