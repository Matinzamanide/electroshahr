import Brands from "@/components/Brands";
import HeroSection from "@/components/HeroSection";
import InitialCategory from "@/components/InitialCategory";
import MainCategory from "@/components/MainCategory";
import Navbar from "@/components/navbar";

const Home = () => {
    return ( 
        <>
        {/* <Navbar/> */}
        <HeroSection/>
        <InitialCategory/>
        <MainCategory/>
        <Brands/>
        </>
     );
}
 
export default Home;