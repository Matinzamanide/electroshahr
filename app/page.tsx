import Brands from "@/components/Brands";
import HeroSection from "@/components/HeroSection";
import InitialCategory from "@/components/initial/InitialCategory";
import MainCategory from "@/components/MainCategory";
import NewestProduct from "@/components/NewestProduct";


export default function Page() {
  return (
    <>
      <HeroSection />
      <InitialCategory />
      <MainCategory />
      <NewestProduct />
      <Brands />
    </>
  );
}
