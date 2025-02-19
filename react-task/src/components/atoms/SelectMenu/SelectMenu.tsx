type selectMenuPropsType = {
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
};

const SelectMenu = ({ options, onChange, value }: selectMenuPropsType) => {
  return (
    <select onChange={onChange} value={value}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
