interface IChildren{
    children:React.ReactNode;
}
import Footer from "./footer";
import Navbar from "./navbar";

const Layout :React.FC<IChildren> = ({children}) => {
    return ( 
        <div className="bg-linear-to-b from-gray-50 via-white to-gray-50">
            <Navbar/>
            {children}
            <Footer/>
        </div>
     );
}
 
export default Layout;