import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useScraping } from "../../hooks/useScraping";

import CategoriesTree from "../../components/CategoriesTree/CategoriesTree";

import CategoryPredictor from "../../components/CategoryPredictor/CategoryPredictor";
import { NavLink } from "react-router-dom";
import { IProduct } from "../../types/product";
import Modal from "../../components/Modal/Modal";
import ProductViewer from "../../components/ProductViewer/ProductViewer";
import PostBySkuForm, { PublisherFormInputs } from "./Forms/PostBySkuForm";
import { useSideBarStore } from "../../store/MenuStore";

const Publisher: React.FC<{ pageIndex?: number }> = ({ pageIndex }) => {
  const { user } = useAuth();
  const { scrapeBySku } = useScraping();
  const { setCurrentIndexPage } = useSideBarStore();

  const [scrapedProduct, setScrapedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    setCurrentIndexPage(pageIndex || 0);
  }, []);

  const onSubmit = async (data: PublisherFormInputs) => {
    const product = await scrapeBySku(
      data.sku,
      data.store_id,
      data.category_id,
      parseInt(data.weight),
      data.dimensions
    );
    if (product) {
      console.log(product);
      setScrapedProduct(product);
    }
  };

  const onChangeProduct = (data: Partial<IProduct>) => {
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
    </div>
  );
};

export default Publisher;
