import  { useContext } from "react";
import UserContext from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";



const UserDetail = () => {
  const user = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <>
    <Outlet></Outlet>
      {user ? (
        <>
          <h5>
            {t("hello")} <span> {user.name}</span>
          </h5>
          <h5>
            {t("email")} <span>{user.email}</span>
          </h5>
          <h5>
            {t("role")} <span>{user.role}</span>
          </h5>
        </>
      ) : (
        <>
          <h1>{t("greeting")}</h1>
          <h1>{t("newGreeting")}</h1>
        </>
      )}
    </>
  );
};
export default UserDetail;
