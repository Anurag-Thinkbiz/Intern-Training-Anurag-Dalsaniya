import { Outlet } from "react-router-dom";

import DashboardNavbar from "../../molecules/dashboardButtons/DashboardNavbar";
export const Home = () => {
  return (
    <>
      <DashboardNavbar></DashboardNavbar>
      <Outlet>
      </Outlet>
    </>
  );
};
