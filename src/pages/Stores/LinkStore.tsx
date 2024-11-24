import { useForm, SubmitHandler } from "react-hook-form";
import { useStores } from "../../hooks/useStores";
import { useAuth } from "../../hooks/useAuth";

type Inputs = {
  client_id: string;
  client_secret: string;
  alias: string;
};

const LinkStore: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { user } = useAuth();
  const { handleLinkStore } = useStores();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleLinkStore(data);
  };

  if (user) {
    return (
      <div className="basicContainer gap-8">
        {user && user.stores.length == 0 && (
          <h2 className="font-medium text-xl w-1/2 text-center mt-5">
            Aún no tienes ninguna tienda vinculada, vincula tu primera tienda.
          </h2>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 border-black border rounded-lg flex flex-col items-center gap-10"
        >
          <div className="flex flex-col items-center gap-3 w-full h-full min-w-80">
            <span className="inputBox">
              <label htmlFor="">Client ID:</label>
              <input
                type="text"
                className="input"
                placeholder="ID de la aplicación"
                {...register("client_id", { required: true })}
              />
            </span>
            <span className="inputBox">
              <label htmlFor="">Client Secret:</label>
              <input
                type="text"
                className="input"
                placeholder="Cliente secreto de la aplicación"
                {...register("client_secret", { required: true })}
              />
            </span>
            <span className="inputBox">
              <label htmlFor="">Nombre de la tienda:</label>
              <input
                type="text"
                className="input"
                placeholder="Elija un nombre para su tienda"
                {...register("alias", { required: true })}
              />
            </span>
          </div>
          <button className="button" type="submit">
            Vincular tienda
          </button>
        </form>
      </div>
    );
  }
};

export default LinkStore;
