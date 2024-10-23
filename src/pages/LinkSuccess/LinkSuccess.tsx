import { useEffect } from "react";
import { useLinkStore } from "../../hooks/useLinkStore";
import { useSearchParams } from "react-router-dom";
import { IStore } from "../../types/store";

const LinkSuccess: React.FC = () => {
  const { endLinkStore } = useLinkStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const _id = searchParams.get("store_id");
    const alias = searchParams.get("alias");
    if (_id && alias) {
      const store: IStore = {
        _id,
        alias,
      };
      endLinkStore(store);
    }
    window.close();
  }, []);

  return (
    <div className="basicContainer">
      Tienda vinculada con éxito, puede cerrar esta pestaña
    </div>
  );
};

export default LinkSuccess;
