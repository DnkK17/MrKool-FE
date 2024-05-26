// import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectCurrentToken } from '../redux/slice/authSlice'
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// const requireAuth = () => {
//     const token = useSelector(selectCurrentToken);
//     const location = useLocation();
//   return (
//     token
//     ? <Outlet/>
//     : <Navigate to="/login" state={{ from: location }} replace />
//   )
// }

// export default requireAuth