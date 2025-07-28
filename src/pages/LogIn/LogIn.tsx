import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Toast from "../../components/Toast/Toast";
import Spinner from "../../components/Spinner/Spinner";

type Inputs = {
  username: string;
  password: string;
};

const LogIn: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const {
    handleLogin,
    isAuthenticated,
    loading,
    checkToken,
    activeToast,
    toastMsg,
    closeToast,
    toastType,
  } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!loading) await handleLogin(data);
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
        <button
          className={`button w-32 ${loading ? "cursor-default bg-button-hover" : ""}`}
        >
          {loading ? <Spinner size={24} /> : <p>Iniciar Sesión</p>}
        </button>
      </form>
      {activeToast && (
        <Toast
          message={toastMsg}
          onClose={closeToast}
          type={toastType || "warning"}
        />
      )}
    </div>
  );
};

export default LogIn;
