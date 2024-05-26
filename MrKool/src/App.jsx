import { Route, Routes } from "react-router-dom";
import Home from "./pages/Common/Home.jsx";
// import Header from "./components/Layout/Header/Header.jsx";
// import Footer from "./components/Layout/Footer/Footer.jsx";
import OurServices from "./pages/Common/OurServices.jsx";
import Dashboard from "./pages/Manager/Dashboard.jsx";

function App() {

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/ourservices" element={<OurServices />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
