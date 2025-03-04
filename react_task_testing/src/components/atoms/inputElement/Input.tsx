import { formInputTextType } from "../../../data/modal/types/formType/formType";
import { FormSection, Label } from "../../styles/formStyle/formMolecules.style";
import { InputField } from "../../styles/formStyle/formMolecules.style";

interface InputProps extends formInputTextType {
  error?: string;
  registerProps: any;
  touchedFields?: boolean;
  areaLabel?: string;
  onBlur?: (e: Event) => void;
}
export const Input = ({
  type,
  name,
  value,
  labelText,
  htmlForLabel,
  placeholder,
  registerProps,
  touchedFields,
  error,
  onBlur,
  areaLabel,
}: InputProps) => {
  return (
    <>
      {" "}
      <FormSection>
        <Label htmlFor={htmlForLabel}>{labelText}</Label>
        <InputField
          type={type}
          name={name}
          value={value}
          aria-label={areaLabel ? areaLabel : labelText}
          placeholder={placeholder}
          {...registerProps}
          onBlur={onBlur}
        />
      </FormSection>
      {touchedFields && error}
    </>
  );
};
