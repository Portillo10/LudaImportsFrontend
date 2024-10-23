import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

type Inputs = {
  username: string;
  password: string;
};

const LogIn: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { handleLogin, isAuthenticated, loading, checkToken } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleLogin(data);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isAuthenticated && !loading) {
    return <Navigate to="/publisher"></Navigate>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-semibold text-2xl">Bienvenido</p>
        <div className="flex flex-col gap-3 p-6 rounded-md border border-gray-900">
          <span className="inputBox">
            <label htmlFor="">Usuario:</label>
            <input
              type="text"
              id="username"
              className="input"
              autoComplete="off"
              {...register("username", { required: true })}
            />
          </span>
          <span className="inputBox">
            <label htmlFor="">Contraseña:</label>
            <input
              type="password"
              id="password"
              className="input"
              {...register("password", { required: true })}
            />
          </span>
        </div>
        <button className="button">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LogIn;
