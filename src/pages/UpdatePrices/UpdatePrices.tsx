import UpdateStoreItem from "../../components/UpdateStoreItem/UpdateStoreItem";
import { usePriceUpdating } from "../../hooks/usePriceUpdating";

const UpdatePrices: React.FC = () => {
  const { stores } = usePriceUpdating();

  return (
    <div className="basicContainer gap-4">
      <span className="titlePageContainer">
        <h2>Actualizar precios</h2>
      </span>
      <div className="flex w-full">
        <section className="bg-[#232427] border border-[#5A5B60] p-4 rounded-lg">
          <p className="text-lg font-semibold pb-2">Tiendas a actualizar</p>
          {stores.map((store) => (
            <UpdateStoreItem store={store} />
          ))}
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default UpdatePrices;
