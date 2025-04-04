import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<any>;
  name: any;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  register,
  name,
  label,
  placeholder = "",
  required = false,
}) => {
  const validation: RegisterOptions<any> = required
    ? { required: "Este campo es obligatorio" }
    : {};

  return (
    <span className="inputBox max-w-52">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        className="input"
        placeholder={placeholder}
        {...register(name, validation)}
      />
    </span>
  );
};

export default Input;
