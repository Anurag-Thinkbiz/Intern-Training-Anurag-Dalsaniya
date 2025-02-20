import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
export const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Outlet></Outlet>
      <h1>{t("greeting")}</h1>
      <h1>{t("newGreeting")}</h1>
    </>
  );
};
