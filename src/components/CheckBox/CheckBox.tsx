import "./styles.css";

type CheckBoxProps = {
  onChange: (checked: boolean, name: string) => void;
  name: string;
  checked: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({ name, onChange, checked }) => {
  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    onChange(element.target.checked, name);
  };

  return (
    <label htmlFor={name} className="checkboxContainer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id={name}
      />
      <span></span>
    </label>
  );
};

export default CheckBox;
