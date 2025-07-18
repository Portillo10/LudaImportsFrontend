import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  register?: UseFormRegister<any>;
  name: any;
  label: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  type?: string;
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  register = (name: string) => {
    name;
  },
  name,
  label,
  placeholder = "",
  required = false,
  value,
  type = "text",
  onChange,
}) => {
  const validation: RegisterOptions<any> = required
    ? { required: "Este campo es obligatorio" }
    : {};

  return (
    <span className="inputBox max-w-52">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      <input
        id={name}
        type={type}
        className="input"
        placeholder={placeholder}
        {...register(name, validation)}
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
    </span>
  );
};

export default Input;
