import { Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import RegisterPage from "./components/pages/Register/Register";
import LoginPage from "./components/pages/login/Login";
import Navbar from "./components/organisms/navbar/Navbar";

const AppRoutes = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
