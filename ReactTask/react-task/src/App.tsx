import { Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import RegisterPage from "./components/pages/Register/Register";
import LoginPage from "./components/pages/login/Login";
import Navbar from "./components/organisms/navbar/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./components/pages/notFound/NotFound";
import Report from "./components/templates/Report";
import UserDetail from "./components/templates/userDetail";

const AppRoutes = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/details" element={<Home></Home>}>
            <Route index element={<UserDetail></UserDetail>}></Route>
            <Route path="report" element={<Report />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
