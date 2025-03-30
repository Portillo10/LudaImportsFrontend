import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";
import { useScraping } from "../../hooks/useScraping";
import {
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import CategoriesTree from "../../components/CategoriesTree/CategoriesTree";

import CategoryPredictor from "../../components/CategoryPredictor/CategoryPredictor";
import { NavLink } from "react-router-dom";
import { Store } from "../../types/user";

type Inputs = {
  sku: string;
  store_id: string;
  category_id: string;
  dimensions: string;
  weight: string;
};

interface SelectProps {
  register: UseFormRegister<Inputs>;
  name: keyof Inputs;
  options: Store[];
  label: string;
  required?: boolean;
}

interface InputProps {
  register: UseFormRegister<Inputs>;
  name: keyof Inputs;
  label: string;
  placeholder: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  register,
  name,
  options,
  label,
  required = false,
}) => {
  const validation: RegisterOptions<Inputs> = required
    ? { required: "Este campo es obligatorio" }
    : {};

  return (
    <span className="inputBox min-w-52">
      <label htmlFor={name}>{label}</label>
      <select id={name} className="select" {...register(name, validation)}>
        <option value="">Seleccionar...</option>
        {options?.map((store) => (
          <option key={store._id} value={store._id}>
            {store.alias}
          </option>
        ))}
      </select>
    </span>
  );
};

const Input: React.FC<InputProps> = ({
  register,
  name,
  label,
  placeholder,
  required = false,
}) => {
  const validation: RegisterOptions<Inputs> = required
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

const Publisher: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { scrapeBySku } = useScraping();

  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await scrapeBySku(data.sku, data.store_id);
    setLoading(false);
  };

  return (
    <div className="basicContainer gap-5 fade-in">
      <span className="titlePageContainer">
        <h2>Publicador</h2>
        {user?.role == "admin" && (
          <NavLink to="/publisher/pending">Publicaciones pendientes</NavLink>
        )}
      </span>

      <div className="w-full flex flex-col gap-8 items-center">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-4 p-6 border border-black shadow-sm shadow-black rounded-md">
            <div className="flex gap-4">
              <Select
                label="Tienda"
                name="store_id"
                register={register}
                options={user?.stores || []}
                required
              />
              <Input
                label="SKU"
                name="sku"
                placeholder="SKU del producto"
                register={register}
                required
              />
            </div>
            <div className="flex gap-4">
              <Input
                label="Categoría"
                name="category_id"
                placeholder="ID de la categoría"
                register={register}
                required
              />
              <Input
                label="Peso"
                name="weight"
                placeholder="Peso en libras"
                register={register}
                required
              />
            </div>
            <div className="flex gap-4">
              <Input
                label="Dimensiones"
                name="dimensions"
                placeholder="Lado x Ancho x Alto"
                register={register}
                required
              />
            </div>
          </div>
          <button
            disabled={loading}
            className={`${loading ? "bg-[#3B6541]" : "bg-[#4A7F50]"} rounded-md px-2 py-2 hover:bg-[#3B6541] w-min mt-2`}
          >
            {loading ? <Spinner size={16} /> : "Publicar"}
          </button>
        </form>
      </div>
      <div className="w-full h-full flex flex-col gap-3 py-5 border-t border-gray-500">
        <p>Predictor de categorías</p>
        <div className="w-full flex justify-center">
          <CategoryPredictor />
        </div>
        <hr className="border-t border-gray-500 w-full" />
        <p>Categorías de MercadoLibre</p>
        <CategoriesTree />
      </div>
    </div>
  );
};

export default Publisher;
