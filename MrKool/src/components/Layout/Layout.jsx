import Home from "../../pages/Home";
import Footer from "./Footer/Footer"
import Header from "./Header/Header"

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <Home />
            </div>
            <Footer /></div>

    )
};
export default Layout
