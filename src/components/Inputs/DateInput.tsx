import { UseFormRegister } from "react-hook-form";

type DateInputProps = {
  name: any;
  value: string;
  label: string;
  required: boolean;
  register: UseFormRegister<any>;
};

const DateInput: React.FC<DateInputProps> = ({
  name,
  label,
  value,
  register,
  required = false,
}) => {
  return (
    <div className="flex gap-3 items-center">
      <label className="" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type="date"
        className="input p-1"
        value={value}
        required={required}
        {...register(name, { required })}
      />
    </div>
  );
};

export default DateInput;
