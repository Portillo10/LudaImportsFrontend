import { IProduct } from "../../types/product";
import SpecsTable from "../SpecsTable/SpecsTable";
import ImageViewer from "./ImageViewer";
import ProductInfoViewer from "./ProductInfoViewer";

type ProductViewerProps = {
  product: IProduct | null;
  onChangeProduct: (data: Partial<IProduct>) => void;
};

const ProductViewer: React.FC<ProductViewerProps> = ({
  product,
  onChangeProduct,
}) => {
  if (product)
    return (
      <div className="flex flex-col gap-16 overflow-y-auto max-h-[480px] px-6 py-4">
        <section className="flex gap-8">
          <ImageViewer
            deleteImage={onChangeProduct}
            pictures={product.pictures}
          />
          <ProductInfoViewer product={product} />
        </section>
        <section className="flex flex-col gap-6">
          <p>Características de Amazon</p>
          <SpecsTable specs={product.attributes} />
        </section>
      </div>
    );
};

export default ProductViewer;
