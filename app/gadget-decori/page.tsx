import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types/types";

const Gadjet = async () => {
  const res = await fetch("https://apitak.ir/electroshahr/getProducts.php", {
    next: { revalidate: 30 },
  });

  const data = (await res.json()) as IProduct[];
  console.log(data);

  const filteredProducts = data.filter((item) =>
    item.categories.includes("گجت و دکوری")
  );
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
