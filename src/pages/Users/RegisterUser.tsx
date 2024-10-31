import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";
import Spinner from "../../components/Spinner/Spinner";

interface Inputs {
  username: string;
  password: string;
  role: "admin" | "seller";
}

const RegisterUser: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [message, setMessage] = useState<string>("");
  const [toastState, setToastState] = useState<"success" | "error">("success");
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { registerUser } = useAuth();

  const onCloseToast = () => {
    setActiveToast(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const response = await registerUser(data);
      if (!response)
        throw new Error("Cuerpo de respuesta con valor indefinido");
      if (response.error) {
        setToastState("error");
        setMessage(response.error);
        setActiveToast(true);
      } else if (response.userId) {
        setToastState("success");
        setMessage("Usuario registrado con éxito");
        setActiveToast(true);
        setValue("username", "");
        setValue("password", "");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="basicContainer">
      <span className="w-full flex justify-between pt-4 px-4">
        <h2 className="text-3xl font-semibold">Registrar usuario</h2>
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-96 flex flex-col items-center gap-6 pt-10"
      >
        <div className="flex flex-col gap-4 p-4 border border-black rounded-md">
          <span className="inputBox">
            <label htmlFor="">Nombre de usuario</label>
            <input
              {...register("username", { required: true })}
              className="input"
              type="text"
            />
          </span>
          <span className="inputBox">
            <label htmlFor="">Contraseña</label>
            <input
              {...register("password", { required: true })}
              className="input"
              type="text"
              autoComplete="off"
            />
          </span>
          <span className="inputBox">
            <label htmlFor="">Rol</label>
            <select
              {...register("role", { required: true })}
              className="input"
              name="role"
              autoComplete="off"
              id=""
            >
              <option value="seller">Vendedor</option>
              <option value="admin">Administrador</option>
            </select>
          </span>
        </div>

        <button disabled={loading} className="button" type="submit">
          {loading ? <Spinner size={20} /> : "Registrar"}
        </button>
      </form>
      {activeToast && (
        <Toast message={message} type={toastState} onClose={onCloseToast} />
      )}
    </div>
  );
};

export default RegisterUser;
