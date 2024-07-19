import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Common/Login.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import Station from './pages/Manager/Station.jsx';
import ServiceList from './pages/Admin/ServiceList.jsx';
import ManageModel from './pages/Admin/ModelList.jsx';
import Area from './pages/Admin/Area.jsx';
import TechinicianLayout from './pages/TechnicianLayout.jsx';
import ManagerLayout from './pages/ManagerLayout.jsx';
import ViewOrderPage from './pages/Manager/Order/Order.jsx';
import ViewRequestsPage from './pages/Manager/Request.jsx';
import ManageStation from './pages/Manager/Station.jsx';
import ManageAccount from './pages/Admin/Account.jsx';
import Schedule from './pages/Technician/request.jsx';
import Calendar from './pages/Technician/Calendar.jsx';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = true; 

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/station" element={<Station />} />
          <Route path="/serviceList" element={<ServiceList />} />
          <Route path="/modelList" element={<ManageModel />} />
          <Route path="/area" element={<Area />} />
          <Route path="/account" element={<ManageAccount/>}/>
        </Route>
        <Route element={<TechinicianLayout />}>
        <Route path='/calendar' element={<Schedule/>}/>
        <Route path='/orderList' element = {<Calendar/>}/>
        </Route>
        <Route element={<ManagerLayout />}>
        <Route path='/order' element={<ViewOrderPage/>}/>
        <Route path='/requestList' element={<ViewRequestsPage/>}/>
        <Route path='/station' element={<ManageStation/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
