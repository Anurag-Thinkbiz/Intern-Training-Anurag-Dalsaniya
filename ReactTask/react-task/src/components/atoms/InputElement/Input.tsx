import { formInputTextType } from "../../../data/modal/types/formType/formType";
import { FormSection, Label, } from "../../styles/formStyle/formMolecules.style";
import { InputField } from "../../styles/formStyle/formMolecules.style";

interface InputProps extends formInputTextType {
  error?: string;
  registerProps: any;
  touchedFields: {
    name?: boolean | undefined;
    password?: boolean | undefined;
    email?: boolean | undefined;
    address?: boolean | undefined;
    role?: boolean | undefined;
  };
}

export const Input = ({
  type,
  name,
  value,
  labelText,
  htmlForLabel,
  placeholder,
  error,
  registerProps,
  touchedFields,
}: InputProps) => {
  return (
   <FormSection>
      <Label htmlFor={htmlForLabel}>{labelText}</Label>
      <InputField
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        {...registerProps}
      />
      {touchedFields.address &&
        touchedFields.email &&
        touchedFields.name &&
        touchedFields.password &&
        touchedFields.role &&
        error && <p style={{ color: "red" }}>{error}</p>}
    </FormSection>
  );
};
