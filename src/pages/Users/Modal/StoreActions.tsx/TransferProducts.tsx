import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { IUser } from "../../../../types/user";
import { SubmitHandler, useForm } from "react-hook-form";

import ArrowIcon from "../../../../assets/icons/ArrowIcon.svg";
import { useStores } from "../../../../hooks/useStores";
import Spinner from "../../../../components/Spinner/Spinner";

const OptionsList: React.FC<{ users: IUser[] }> = ({ users }) => {
  if (!users || users.length === 0)
    return <option>No hay usuarios disponibles</option>;

  return (
    <>
      {users.map((user) =>
        user.stores.length > 0 ? (
          <optgroup key={user._id} label={user.username}>
            {user.stores?.length > 0 ? (
              user.stores.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.alias}
                </option>
              ))
            ) : (
              <option disabled>No hay tiendas</option>
            )}
          </optgroup>
        ) : (
          <></>
        )
      )}
    </>
  );
};

type Inputs = {
  target_store_id: string;
};

const TransferProducts: React.FC<{ store_id: string }> = ({ store_id }) => {
  const { getUsers } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const { register, handleSubmit } = useForm<Inputs>();
  const [displayed, setDisplayed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { transferProducts } = useStores();

  useEffect(() => {
    const loadUsers = async () => {
      const response = await getUsers();
      if (response) {
        setUsers(response);
      }
    };
    loadUsers();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { target_store_id } = data;
    setLoading(true);
    await transferProducts(target_store_id, store_id);
    setLoading(false);
  };

  const handleClick = () => {
    setDisplayed(!displayed);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#1e1e1e]">
      <span className="flex flex-col justify-between w-full border-b border-t border-[#383838]">
        <div
          onClick={() => handleClick()}
          className="flex items-center w-full justify-between py-2 px-3 cursor-pointer"
        >
          <p>Transferir productos a otra tienda</p>
          <img
            width={16}
            src={ArrowIcon}
            className={displayed ? "rotate-180" : ""}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${displayed ? "max-h-36 py-4" : "max-h-0"} transition-all flex flex-col items-center w-full overflow-hidden px-4 gap-4`}
        >
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <>
              <span className="inputBox">
                <select {...register("target_store_id", { required: true })}>
                  <option selected={true} value="" disabled>
                    Selecciona una tienda
                  </option>
                  <OptionsList users={users} />
                </select>
              </span>
              <button className="button">Transferir</button>
            </>
          )}
        </form>
      </span>
    </div>
  );
};

export default TransferProducts;
