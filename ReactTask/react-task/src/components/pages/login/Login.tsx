import { Navigate, Outlet } from 'react-router-dom';
import LoginTemplate from '../../templates/loginTemplate';
import { useAppSelector } from '../../../data/modal/types/hookTypes/hookType';

const LoginPage = () => {
  const isLogin=useAppSelector((state)=>state.auth.token)
  if(isLogin) return  <Navigate to={'/'}></Navigate>
  return (
    <>
    <LoginTemplate ></LoginTemplate>
    <Outlet></Outlet>
    </>
  )
}
export default LoginPage;