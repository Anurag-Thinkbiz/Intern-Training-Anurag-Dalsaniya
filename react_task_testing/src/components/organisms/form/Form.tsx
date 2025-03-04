import FormMoleculer from "../../molecules/from/Form";
import {
  FormContainer,
  FormHeading,
} from "../../styles/formStyle/formOrganisms.style";
interface FormProps {
  formHeading: string;
}

export const Form = ({ formHeading }: FormProps) => {
  return (
    <FormContainer>
      <FormHeading>{formHeading}</FormHeading>
      <FormMoleculer />
    </FormContainer>
  );
};
