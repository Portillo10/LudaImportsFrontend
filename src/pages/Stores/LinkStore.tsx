import { useForm, SubmitHandler } from "react-hook-form";
import { useStores } from "../../hooks/useStores";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useSideBarStore } from "../../store/MenuStore";

type Inputs = {
  client_id: string;
  client_secret: string;
  alias: string;
};

const LinkStore: React.FC<{ pageIndex?: number }> = ({ pageIndex = 1 }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { user } = useAuth();
  const { handleLinkStore } = useStores();
  const [searchParams] = useSearchParams();
  const { setCurrentIndexPage } = useSideBarStore();

  useEffect(() => {
    const user_id = searchParams.get("user_id") || undefined;
    if (user_id) {
      setCurrentIndexPage(4);
    } else {
      setCurrentIndexPage(pageIndex);
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user_id = searchParams.get("user_id") || undefined;
    await handleLinkStore(data, user_id);
  };

  if (
    user?.stores.length == 0 ||
    user?.role == "admin" ||
    user?.role == "seller"
  ) {
    return (
      <div className="basicContainer gap-8 px-6 py-8">
        {user && user.stores.length == 0 && (
          <h2 className="font-medium text-xl w-1/2 text-center">
            Aún no tienes ninguna tienda vinculada, vincula tu primera tienda.
          </h2>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 border-black border rounded-lg flex flex-col items-center gap-6"
        >
          <div className="flex flex-col items-center gap-3 w-full h-full min-w-80">
            <span className="inputBox">
              <label htmlFor="">Nombre de la tienda:</label>
              <input
                type="text"
                className="input"
                placeholder="Elije un nombre para tu tienda"
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
  } else {
    return <Navigate to="/stores" />;
  }
};

export default LinkStore;
