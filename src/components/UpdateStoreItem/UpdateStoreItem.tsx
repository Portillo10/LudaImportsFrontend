import ToggleButton from "../ToggleButton/ToggleButton";
import ActiveStoreIcon from "../../assets/icons/ActiveStoreIcon.svg";
import { useStores } from "../../hooks/useStores";

type UpdateStoreItemProps = {
  store: {
    _id: string;
    alias: string;
    user?: string;
    lastUpdate?: string;
    updating?: boolean;
    allowUpdate: boolean;
  };
};

const UpdateStoreItem: React.FC<UpdateStoreItemProps> = ({ store }) => {
  const { toggleAllowUpdate } = useStores();
  const handleChangeAllowUpdate = (value: boolean) => {
    toggleAllowUpdate(store._id, value);
  };

  return (
    <div className="flex gap-6 py-2 px-6 bg-[#414249] rounded-xl items-center">
      <section>
        <img src={ActiveStoreIcon} alt="" width={50} />
      </section>
      <section className="flex flex-col gap-0.5 font-semibold min-w-64 text-sm">
        <p>Tienda: {store.alias}</p>
        <p>Dueño: {store.user}</p>
        <p>
          {store.updating
            ? "Actualizando..."
            : `Última vez: ${store.lastUpdate ? new Date(store.lastUpdate).toLocaleDateString() : "Nunca"}`}
        </p>
      </section>
      <section>
        <ToggleButton
          id={store._id}
          allow={store.allowUpdate}
          onChange={handleChangeAllowUpdate}
        />
      </section>
    </div>
  );
};

export default UpdateStoreItem;
