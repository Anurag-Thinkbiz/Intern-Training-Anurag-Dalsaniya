import { useTranslation } from "react-i18next";
import LoginForm from "../organisms/loginForm/loginForm";

const LoginTemplate = () => {
  const { t } = useTranslation();
  return (
    <>
      <LoginForm formHeading={t("login")}></LoginForm>
    </>
  );
};
export default LoginTemplate;
