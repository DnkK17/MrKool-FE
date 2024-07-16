import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Common/Home.jsx';
import OurServices from './pages/Common/OurServices.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import Login from './pages/Common/Login.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import UserLayout from './pages/UserLayout.jsx';
import Station from './pages/Manager/Station.jsx';
import BookingPage from './pages/Common/Booking.jsx';
import ServiceDetail from './pages/Common/ServiceDetail.jsx';
import ServiceList from './pages/Admin/ServiceList.jsx';
import ManageModel from './pages/Admin/ModelList.jsx';
import Area from './pages/Admin/Area.jsx';
import CheckoutPage from './pages/Common/Checkout.jsx';
import TechinicianLayout from './pages/TechnicianLayout.jsx';
import ManagerLayout from './pages/ManagerLayout.jsx';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = false; // Set this based on your authentication logic

  useEffect(() => {
    // Redirect to login if not logged in and accessing private routes
    if (!isLoggedIn && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/station" element={<Station />} />
          <Route path="/serviceList" element={<ServiceList />} />
          <Route path="/modelList" element={<ManageModel />} />
          <Route path="/area" element={<Area />} />
        </Route>
        <Route element={<TechinicianLayout />}>
          {/* Add routes for technician layout if needed */}
        </Route>
        <Route element={<ManagerLayout />}>
          {/* Add routes for manager layout if needed */}
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/service" element={<OurServices />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
