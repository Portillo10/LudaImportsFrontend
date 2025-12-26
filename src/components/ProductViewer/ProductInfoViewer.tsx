import { SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import InputWithUnit from "../Inputs/InputWithUnit";
import { Item } from "../../types/item";
import { formatNumber, isValidFloat } from "../../utils/helpers";
import { Dispatch, SetStateAction, useState } from "react";

type ProductInfoViewerProps = {
  product: Item;
  onChangeProduct: (data: Partial<Item>) => void;
};

type Inputs = {
  title: string;
  weigth: number;
  dimensions: string;
  description: string;
  price: number;
  amazonPrice: number;
};

const ProductInfoViewer: React.FC<ProductInfoViewerProps> = ({
  product,
  onChangeProduct,
}) => {
  const { handleSubmit } = useForm<Inputs>({
    defaultValues: {
      ...product,
    },
  });

  const [amazonPriceString, setAmazonPriceString] = useState<string>(
    formatNumber(product.amazonPrice)
  );
  const [shipmentPriceString, setShipmentPriceString] = useState<string>(
    formatNumber(product.shipmentPrice)
  );

  const submit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  const onChangePrice = (
    price: string,
    name: string,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const value = price.replace(/,/g, "");
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
      onChangeProduct({ [name]: 0 });
      setValue("0");
    } else if (value.endsWith(".") && isValidFloat(value)) {
      setValue(formatNumber(floatValue) + ".");
    } else {
      onChangeProduct({ [name]: parseFloat(value) });
      setValue(formatNumber(floatValue));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full max-w-md flex flex-col gap-4"
    >
      {product.title ? (
        <TextArea
          label="Título"
          name="title"
          value={product.title}
          onChange={(value: string) => {
            onChangeProduct({ title: value });
          }}
          style={{ maxHeight: "60px" }}
        />
      ) : (
        <TextArea
          label="Título"
          name="family_name"
          value={product.family_name}
          onChange={(value: string) => {
            onChangeProduct({ family_name: value });
          }}
          style={{ maxHeight: "60px" }}
        />
      )}
      <span className="w-full flex gap-4">
        <InputWithUnit
          unit="USD"
          label="Precio"
          type="text"
          value={amazonPriceString}
          name="amazonPrice"
          style={{ width: "30%" }}
          onchange={(e) => {
            onChangePrice(e.target.value, "amazonPrice", setAmazonPriceString);
          }}
        />
        <InputWithUnit
          unit="USD"
          label="Costo de envío"
          value={shipmentPriceString}
          name="shipmentPrice"
          style={{ width: "30%" }}
          type="text"
          onchange={(e) => {
            onChangePrice(
              e.target.value,
              "shipmentPrice",
              setShipmentPriceString
            );
          }}
        />
        <InputWithUnit
          unit="días"
          label="Disponibilidad"
          value={product.manufacturingTime}
          name="manufacturingTime"
          style={{ width: "30%" }}
          onchange={(e) => {
            const value = e.target.value;
            onChangeProduct({ manufacturingTime: parseInt(value) });
          }}
        />
      </span>
      <span className="w-full flex gap-4">
        <InputWithUnit
          unit="COP"
          label="Precio de venta"
          value={formatNumber(product.price)}
          name="price"
          style={{ width: "40%" }}
          type="text"
          readOnly
        />
        <InputWithUnit
          unit="lb"
          label="Peso"
          value={product.weight}
          name="weight"
          style={{ width: "20%" }}
          onchange={(e) => {
            const value = e.target.value;
            onChangeProduct({ weight: parseInt(value) });
          }}
        />
        <InputWithUnit
          unit="cm"
          label="Dimensiones"
          value={product.dimensions}
          name="dimensions"
          style={{ width: "40%" }}
          type="text"
          onchange={(e) => {
            const value = e.target.value;
            onChangeProduct({ dimensions: value });
          }}
        />
      </span>
      <span className="w-full flex gap-4">
        <InputWithUnit
          unit=""
          label="Categoría"
          type="text"
          value={product.category_id}
          name="category_id"
          style={{ width: "35%" }}
          onchange={(e) => {
            onChangeProduct({ category_id: e.target.value });
          }}
        />
        <InputWithUnit
          unit="unidades"
          label="Stock"
          type="number"
          value={product.available_quantity}
          name="available_quantity"
          style={{ width: "30%" }}
          onchange={(e) => {
            onChangeProduct({ available_quantity: parseInt(e.target.value) });
          }}
        />
        <InputWithUnit
          unit="días"
          label="Garantía"
          value={product.warrantyTime}
          name="warrantyTime"
          style={{ width: "25%" }}
          type="number"
          onchange={(e) => {
            onChangeProduct({ warrantyTime: parseInt(e.target.value) });
          }}
        />
      </span>
      {/* <button className="p-2 bg-green-700 hover:bg-green-900 transition-all rounded-md">
        Recalcular precio
      </button> */}
      <TextArea
        rows={14}
        label="Descripción"
        name="description"
        value={product.description}
        style={{ fontSize: "14px", maxHeight: "250px" }}
        onChange={(value) => {
          onChangeProduct({ description: value });
        }}
      />
    </form>
  );
};

export default ProductInfoViewer;
