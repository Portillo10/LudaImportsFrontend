import { useState } from "react";
import { Item, ItemAttribute } from "../../types/item";
import AttributesViewer from "./AttributesViewer";
import ImageViewer from "./ImageViewer";
import ProductInfoViewer from "./ProductInfoViewer";
import Spinner from "../Spinner/Spinner";

type ProductViewerProps = {
  product: Item | null;
  onChangeProduct: (data: Partial<Item>) => void;
  onChangeAttribute: (attribute: ItemAttribute) => void;
  onPublish: (item: any) => Promise<void>;
};

const ProductViewer: React.FC<ProductViewerProps> = ({
  product,
  onPublish,
  onChangeProduct,
  onChangeAttribute,
}) => {
  const [postingLoading, setPostingLoading] = useState<boolean>(false);

  const onClickPublish = async () => {
    setPostingLoading(true);
    await onPublish(product);
    setPostingLoading(false);
  };

  if (product)
    return (
      <div className="flex flex-col gap-12 px-6 pt-4 items-end">
        <div className="flex gap-8 items-start">
          <div className="flex-shrink-0 sticky top-4">
            <ImageViewer
              deleteImage={onChangeProduct}
              pictures={product.pictures}
            />
          </div>
          <div>
            <ProductInfoViewer
              onChangeProduct={onChangeProduct}
              product={product}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg">
            Características del producto (los campos marcados con{" "}
            <span className="text-red-400">*</span> son obligatorios)
          </p>
          <AttributesViewer
            onChangeAttribute={onChangeAttribute}
            attributes={product.attributes}
          />
        </div>
        <button
          onClick={() => onClickPublish()}
          className={`${postingLoading ? "bg-cyan-900 cursor-default" : "bg-cyan-800"} hover:bg-cyan-900 py-2 px-3 transition-all rounded-md sticky bottom-3 flex items-center justify-center w-24`}
        >
          {postingLoading ? <Spinner size={24} /> : "Publicar"}
        </button>
      </div>
    );
};

export default ProductViewer;
