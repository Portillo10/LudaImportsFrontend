import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "../../types/product";
import TextArea from "../Inputs/TextArea";
import InputWithUnit from "../Inputs/InputWithUnit";

type ProductInfoViewerProps = {
  product: IProduct;
};

type Inputs = {
  title: string;
  weigth: number;
  dimensions: string;
  description: string;
  price: number;
};

const ProductInfoViewer: React.FC<ProductInfoViewerProps> = ({ product }) => {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      ...product,
    },
  });

  const submit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full max-w-md flex flex-col gap-4"
    >
      <TextArea
        label="Título"
        name="title"
        register={register}
        style={{ maxHeight: "60px" }}
      />
      <span className="w-full flex gap-4">
        <InputWithUnit
          unit="usd"
          label="Precio"
          register={register}
          name="price"
          style={{ width: "30%" }}
        />
        <InputWithUnit
          unit="lb"
          label="Peso"
          register={register}
          name="weight"
          style={{ width: "20%" }}
        />
        <InputWithUnit
          unit="cm"
          label="Dimensiones"
          register={register}
          name="dimensions"
          style={{ width: "45%" }}
        />
      </span>
      <TextArea
        rows={8}
        label="Descripción"
        name="description"
        register={register}
        style={{ fontSize: "14px", maxHeight: "180px" }}
      />
    </form>
  );
};

export default ProductInfoViewer;
