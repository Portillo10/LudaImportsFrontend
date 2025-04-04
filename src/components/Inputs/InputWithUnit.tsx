import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputWithUnitProps {
  register: UseFormRegister<any>;
  name: any;
  label: string;
  placeholder?: string;
  required?: boolean;
  unit: string; // La unidad a mostrar (kg, lb, usd, etc.)
  unitPosition?: "left" | "right"; // Si la unidad va antes o después del valor
  className?: string;
  style?: React.CSSProperties;
}

const InputWithUnit: React.FC<InputWithUnitProps> = ({
  register,
  name,
  label,
  placeholder = "",
  required = false,
  unit,
  unitPosition = "right",
  className = "",
  style = {},
}) => {
  const validation: RegisterOptions<any> = required
    ? { required: "Este campo es obligatorio" }
    : {};

  return (
    <span style={style} className={`inputBox ${className}`}>
      <label htmlFor={name}>{label}</label>
      <div className="relative flex items-center">
        {unitPosition === "left" && (
          <div className="absolute left-0 pl-2 text-gray-500 pointer-events-none">
            {unit}
          </div>
        )}
        <input
          id={name}
          type="text"
          className={`input w-full ${
            unitPosition === "left" ? "pl-10" : "pr-10"
          }`}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {unitPosition === "right" && (
          <div className="absolute right-0 pr-2 text-gray-400 pointer-events-none">
            {unit}
          </div>
        )}
      </div>
    </span>
  );
};

export default InputWithUnit;
