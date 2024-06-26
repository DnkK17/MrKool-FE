import { Route, Routes } from "react-router-dom";
import Home from "./pages/Common/Home.jsx";
import OurServices from "./pages/Common/OurServices.jsx";
import Dashboard from "./pages/Manager/Dashboard.jsx";
import Login from "./pages/Common/Login.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import UserLayout from "./pages/UserLayout.jsx";
// import ServiceDetail from "./pages/Common/ServiceDetail.jsx";
import Service from "./pages/Manager/Service.jsx"
import Station from "./pages/Manager/Station.jsx"
import Invoice from "./pages/Manager/Invoice.jsx"
import BookingPage from "./pages/Common/Booking/Booking.jsx";
import ServiceDetail from "./pages/Common/ServiceDetail.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/account' element={<Service />} />
          <Route path='/area' element={<Station />} />
          <Route path='/orders' element={<Invoice/>} />

        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/service" element={<OurServices />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/booking" element={<BookingPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;