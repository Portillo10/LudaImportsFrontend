import ToggleButton from "../ToggleButton/ToggleButton";
import ActiveStoreIcon from "../../assets/icons/ActiveStoreIcon.svg";
import { useStores } from "../../hooks/useStores";
import "./styles.css";

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
    <div className="itemContainer">
      {store.updating ? <div className="rotate" /> : <></>}

      <section className="span-1">
        <img src={ActiveStoreIcon} alt="" width={50} />
      </section>
      <section className="span-2">
        <p>Tienda: {store.alias}</p>
        <p>Dueño: {store.user}</p>
        <p>
          {store.updating
            ? "Actualizando..."
            : `Última vez: ${store.lastUpdate ? new Date(store.lastUpdate).toLocaleDateString() : "Nunca"}`}
        </p>
      </section>
      <section className="span-3">
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
