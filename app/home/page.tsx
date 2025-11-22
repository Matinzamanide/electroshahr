import Brands from "@/components/Brands";
import HeroSection from "@/components/HeroSection";
import InitialCategory from "@/components/InitialCategory";
import MainCategory from "@/components/MainCategory";
import Navbar from "@/components/navbar";
import NewestProduct from "@/components/NewestProduct";

const Home = () => {
    return ( 
        <>
        {/* <Navbar/> */}
        <HeroSection/>
        <InitialCategory/>
        <MainCategory/>
        <NewestProduct/>
        <Brands/>
        </>
     );
}
 
export default Home;