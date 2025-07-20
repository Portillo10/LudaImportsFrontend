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
import { Item, ItemAttribute } from "../../types/item";
import Toast from "../../components/Toast/Toast";
import { useMLApi } from "../../hooks/useMLApi";

const Publisher: React.FC<{ pageIndex?: number }> = ({ pageIndex }) => {
  const { user } = useAuth();
  const { setCurrentIndexPage } = useSideBarStore();
  const { scrapeBySku, closeToast, toastMsg, toastType, activeToast } =
    useScraping();
  const {
    activeToast: activePostingToast,
    closeToast: closePostingToast,
    toastType: postingToastType,
    toastMsg: postingToastMsg,
    postItem,
  } = useMLApi();

  const [scrapedProduct, setScrapedProduct] = useState<Item | null>(null);
  const [pricing, setPricing] = useState<any>(null);
  const [postingData, setPostingData] = useState<PublisherFormInputs | null>(
    null
  );

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
    setPostingData(data);
    if (response?.item) {
      setPricing(response.pricing);
      setScrapedProduct(response.item);
    }
  };

  const onChangeProduct = (data: Partial<Item>) => {
    if (scrapedProduct) {
      const newData = { ...scrapedProduct, ...data };
      setScrapedProduct(newData);
    }
  };

  const onChangeAttribute = (attribute: ItemAttribute) => {
    if (scrapedProduct) {
      const { attributes, ...rest } = scrapedProduct;
      const newAttributes = attributes.map((attr) => {
        if (attr.id == attribute.id) {
          return {
            ...attr,
            value_name: attribute.value_name,
          };
        } else {
          return attr;
        }
      });
      const newData = { ...rest, attributes: newAttributes };
      setScrapedProduct(newData);
    }
  };

  const publishItem = async (item: any) => {
    console.log(item);
    if (postingData && pricing) {
      const { sku, store_id } = postingData;
      await postItem(sku, store_id, scrapedProduct, pricing);
    } else {
      console.log("postingData or pricing undefined");
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
            onPublish={publishItem}
            onChangeAttribute={onChangeAttribute}
            onChangeProduct={onChangeProduct}
            product={scrapedProduct}
          />
          {activePostingToast && (
            <Toast
              message={postingToastMsg}
              onClose={closePostingToast}
              type={postingToastType || "warning"}
            />
          )}
        </Modal>
      )}
      {activeToast && (
        <Toast
          type={toastType || "warning"}
          message={toastMsg}
          onClose={() => {
            closeToast();
            closePostingToast();
          }}
        />
      )}
    </div>
  );
};

export default Publisher;
