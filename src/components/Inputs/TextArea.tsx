import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  register: UseFormRegister<any>;
  name: any;
  label: string;
  placeholder?: string;
  required?: boolean;
  resizeY?: boolean;
  resizeX?: boolean;
  rows?: number;
  style?: React.CSSProperties;
}

const TextArea: React.FC<TextAreaProps> = ({
  register,
  name,
  label,
  placeholder = "",
  required = false,
  resizeX,
  resizeY,
  rows = 2,
  style = {},
}) => {
  const validation: RegisterOptions<any> = required
    ? { required: "Este campo es obligatorio" }
    : {};

  return (
    <span className="inputBox">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        className={`textarea ${resizeX && "resize-x"} ${resizeY && "resize-y"}`}
        placeholder={placeholder}
        rows={rows}
        style={style}
        {...register(name, validation)}
      />
    </span>
  );
};

export default TextArea;
