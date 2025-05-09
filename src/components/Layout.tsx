import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";
import Header from "./header.tsx";


const Layout = () => {
    return (
        <div className="app-wrapper">
                <Header/>
            <div className="app-container">
                <div className="content">
                    <Outlet/>
                </div>
            </div>
            <div className="footer-container">
                <Footer/>
            </div>
        </div>

    );
};

export default Layout;
