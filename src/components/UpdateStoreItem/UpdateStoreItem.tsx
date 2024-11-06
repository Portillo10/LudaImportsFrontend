import ToggleButton from "../ToggleButton/ToggleButton";
import ActiveStoreIcon from "../../assets/icons/ActiveStoreIcon.svg";

type ItemProps = {
  store: {
    alias: string;
    user: string;
    lastUpdate: Date;
    updating: boolean;
  };
};

const UpdateStoreItem: React.FC<ItemProps> = ({ store }) => {
  return (
    <div className="flex gap-6 py-2 px-6 bg-[#414249] rounded-xl items-center cursor-pointer">
      <section>
        <img src={ActiveStoreIcon} alt="" width={50} />
      </section>
      <section className="flex flex-col gap-0.5 font-semibold min-w-64">
        <p>Tienda: {store.alias}</p>
        <p>Dueño: {store.user}</p>
        <p>
          {store.updating
            ? "Actualizando..."
            : `Última vez: ${store.lastUpdate.toLocaleDateString()}`}
        </p>
      </section>
      <section>
        <ToggleButton />
      </section>
    </div>
  );
};

export default UpdateStoreItem;
