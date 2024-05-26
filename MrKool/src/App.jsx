import { Route, Routes } from "react-router-dom";
import Home from "./pages/Common/Home.jsx";
import Header from "./components/Layout/Header/Header.jsx";
import Footer from "./components/Layout/Footer/Footer.jsx";
import OurServices from "./pages/Common/OurServices.jsx";
import Dashboard from "./pages/Manager/Dashboard.jsx";
import Service from "./pages/Manager/Service.jsx";
import Order from "./pages/Manager/Order/Order.jsx";
import OrderDetailPage from "./pages/Manager/Order/OrderDetail.jsx";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/ourservices" element={<OurServices />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/team" element={<Service />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/orderdetai" element={<OrderDetailPage />}></Route>

      </Routes>
      <Footer />
    </div>
  )
}

export default App
