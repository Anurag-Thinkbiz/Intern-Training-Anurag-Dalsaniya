import { useTranslation } from "react-i18next";
import { Form } from "../organisms/form/Form";
import { RegisterContainer } from "../styles/formStyle/formTemplate.style";

const RegisterTemplate = () => {
  const { t } = useTranslation();
  return (
    <RegisterContainer>
      <Form formHeading={t("register")} />
    </RegisterContainer>
  );
};

export default RegisterTemplate;
