import { Outlet } from 'react-router-dom';
import LoginTemplate from '../../templates/loginTemplate';



const LoginPage = () => {
  return (
    <>
    <LoginTemplate ></LoginTemplate>
    <Outlet></Outlet>
    </>
  )
}
export default LoginPage;