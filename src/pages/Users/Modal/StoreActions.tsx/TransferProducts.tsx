import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { IUser } from "../../../../types/user";
import { useForm } from "react-hook-form";

// import { useStores } from "../../../../hooks/useStores";
import Action from "./Action";
import { sleep } from "../../../../utils/helpers";

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

const TransferProducts: React.FC<{
  store_id: string;
  index: number;
  displayed: boolean;
}> = ({ index, displayed }) => {
  const { getUsers } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const { register } = useForm<Inputs>();
  // const [loading, setLoading] = useState<boolean>(false);

  // const { transferProducts } = useStores();

  useEffect(() => {
    const loadUsers = async () => {
      const response = await getUsers();
      if (response) {
        setUsers(response);
      }
    };
    loadUsers();
  }, []);

  // const onSubmit: SubmitHandler<Inputs> = async (data) => {
  //   const { target_store_id } = data;
  //   setLoading(true);
  //   await transferProducts(target_store_id, store_id);
  //   setLoading(false);
  // };

  return (
    <Action
      displayed={displayed}
      index={index}
      label="Transferir productos a otra tienda"
      onSubmit={async () => {
        await sleep(2000);
      }}
    >
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
    </Action>
  );
};

export default TransferProducts;
