import { useEffect } from "react";
import { useStores } from "../../hooks/useStores";
import { useSearchParams } from "react-router-dom";
// import { IStore } from "../../types/store";
import { sleep } from "../../utils/helpers";

const LinkSuccess: React.FC = () => {
  const { handleSuccessLinkStore } = useStores();
  const [searchParams] = useSearchParams();

  const handleLoad = async () => {
    const code = searchParams.get("code");
    if (code) {
      const response = await handleSuccessLinkStore(code);
      console.log(response);
    }
    await sleep(10000);
    window.close();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="basicContainer pt-10">
      Tienda vinculada con éxito, puede cerrar esta pestaña
    </div>
  );
};

export default LinkSuccess;
