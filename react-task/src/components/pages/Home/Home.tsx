import { useTranslation } from "react-i18next";
import { HomeTemplate } from "../../templates/HomeTemplate";
export const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <HomeTemplate></HomeTemplate>
      <h1>{t("greeting")}</h1>
      <h1>{t("newGreeting")}</h1>
    </>
  );
};
