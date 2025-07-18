import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useScraping } from "../../hooks/useScraping";

import CategoryPredictor from "../../components/CategoryPredictor/CategoryPredictor";
import CategoriesTree from "../../components/CategoriesTree/CategoriesTree";
import ProductViewer from "../../components/ProductViewer/ProductViewer";
import Modal from "../../components/Modal/Modal";

import { useSideBarStore } from "../../store/MenuStore";
import PostBySkuForm, { PublisherFormInputs } from "./Forms/PostBySkuForm";
import { Item } from "../../types/item";
import Toast from "../../components/Toast/Toast";

const Publisher: React.FC<{ pageIndex?: number }> = ({ pageIndex }) => {
  const { user } = useAuth();
  const { setCurrentIndexPage } = useSideBarStore();
  const { scrapeBySku, closeToast, toastMsg, toastType, activeToast } =
    useScraping();

  const [scrapedProduct, setScrapedProduct] = useState<Item | null>(null);

  useEffect(() => {
    setCurrentIndexPage(pageIndex || 0);
  }, []);

  const onSubmit = async (data: PublisherFormInputs) => {
    const response = await scrapeBySku(
      data.sku,
      data.store_id,
      data.category_id,
      parseInt(data.weight),
      data.dimensions
    );
    if (response?.item) {
      console.log(response.item);
      setScrapedProduct(response.item);
    }
  };

  const onChangeProduct = (data: Partial<Item>) => {
    if (scrapedProduct) {
      const newData = { ...scrapedProduct, ...data };
      setScrapedProduct(newData);
    }
  };

  return (
    <div className="basicContainer gap-5 fade-in px-6">
      <span className="titlePageContainer">
        <h2>Publicador</h2>
        {user?.role == "admin" && (
          <NavLink to="/publisher/pending">Publicaciones pendientes</NavLink>
        )}
      </span>
      <div className="w-full flex flex-col gap-8 items-center">
        <PostBySkuForm onSubmitHandler={onSubmit} user={user} />
      </div>
      <div className="w-full h-full flex flex-col gap-3 py-5 border-t border-gray-500">
        <p>Predictor de categorías</p>
        <div className="w-full flex justify-center">
          <CategoryPredictor />
        </div>
        <hr className="border-t border-gray-500 w-full" />
        <p>Categorías de MercadoLibre</p>
        <CategoriesTree />
      </div>
      {scrapedProduct && (
        <Modal
          isOpen={!!scrapedProduct}
          onClose={() => setScrapedProduct(null)}
          title="Publicar producto"
          className="max-w-[1020px]"
        >
          <ProductViewer
            onChangeProduct={onChangeProduct}
            product={scrapedProduct}
          />
        </Modal>
      )}
      {activeToast && (
        <Toast type={toastType} message={toastMsg} onClose={closeToast} />
      )}
    </div>
  );
};

export default Publisher;
