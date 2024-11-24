import { useState } from "react";
import "./styles.css";

type ToogleButtonProps = {
  id: string;
  allow: boolean;
  onChange: (value: boolean) => void;
};

const ToggleButton: React.FC<ToogleButtonProps> = ({ id, allow, onChange }) => {
  const [checked, setChecked] = useState<boolean>(allow);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleToggle}
      />
      <label htmlFor={id} className="switch"></label>
    </div>
  );
};

export default ToggleButton;
