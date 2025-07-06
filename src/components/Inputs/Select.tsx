import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { Store } from "../../types/user";

interface SelectProps {
  register: UseFormRegister<any>;
  name: any;
  options: Store[];
  label: string;
  placholder?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  register,
  name,
  options,
  label,
  placholder = "Seleccionar...",
  required = false,
}) => {
  const validation: RegisterOptions<any> = required
    ? { required: "Este campo es obligatorio" }
    : {};

  return (
    <span className="inputBox min-w-52">
      <label htmlFor={name}>{label}</label>
      <select id={name} className="select" {...register(name, validation)}>
        <option value="" className="text-gray-400">
          {placholder}
        </option>
        {options?.map((store) => (
          <option className="cursor-pointer" key={store._id} value={store._id}>
            {store.alias}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Select;
