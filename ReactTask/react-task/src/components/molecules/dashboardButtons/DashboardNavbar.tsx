import { useContext } from "react";
import { NavBar } from "../../styles/navbar/dashboardNavbar";
import UserContext from "../../../context/userContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DashboardNavbar = () => {
  const user = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <>
      <NavBar>
        <NavLink to={"/details"}>{t("myDetails")}</NavLink>
        {user?.role === "admin" && (
          <NavLink to={"/details/report"}>{t("report")}</NavLink>
        )}
      </NavBar>
    </>
  );
};

export default DashboardNavbar;
