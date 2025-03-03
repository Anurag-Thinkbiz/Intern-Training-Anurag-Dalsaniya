import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../data/modal/types/hookTypes/hookType";
import { UserContextProvider } from "../context/userContext";



const  ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.token);
  

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
};

export default ProtectedRoute;
