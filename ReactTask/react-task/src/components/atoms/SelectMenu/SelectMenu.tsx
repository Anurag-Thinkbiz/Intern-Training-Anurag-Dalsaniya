import { StyledSelect } from "../../styles/select.style";

type selectMenuPropsType = {
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
};

const SelectMenu = ({ options, onChange, value }: selectMenuPropsType) => {
  return (
    <StyledSelect onChange={onChange} value={value}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectMenu;

