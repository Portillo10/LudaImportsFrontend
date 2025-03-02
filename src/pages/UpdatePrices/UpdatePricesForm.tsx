import { SubmitHandler, useForm } from "react-hook-form";
import CheckBox from "../../components/CheckBox/CheckBox";

type Inputs = {
  update_stores: boolean;
  update_all: boolean;
  tracking: boolean;
  track_all: boolean;
};

type UpdatePriceFormProps = {
  onSubmit: (data: any) => Promise<void>;
};
const UpdatePricesForm: React.FC<UpdatePriceFormProps> = ({ onSubmit }) => {
  const { setValue, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      update_all: true,
      tracking: true,
      update_stores: true,
      track_all: false,
    },
  });

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    await onSubmit(data);
  };

  const handleChangeChecked = (checked: boolean, name: string) => {
    if (
      name == "update_stores" ||
      name == "update_all" ||
      name == "tracking" ||
      name == "track_all"
    ) {
      setValue(name, checked);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full flex flex-col gap-3 items-center text-base"
    >
      <span className="checkItemContainer">
        <p>Actualizar las tiendas en MercadoLibre</p>
        <CheckBox
          onChange={handleChangeChecked}
          name="update_stores"
          checked={watch().update_stores}
        />
      </span>
      <span className="checkItemContainer">
        <p>Actualizar todas las publicaciones</p>
        <CheckBox
          checked={watch().update_all}
          onChange={handleChangeChecked}
          name="update_all"
        />
      </span>
      <span className="checkItemContainer">
        <p>Comparar precios con Amazon</p>
        <CheckBox
          checked={watch().tracking}
          onChange={handleChangeChecked}
          name="tracking"
        />
      </span>
      <span className="checkItemContainer">
        <p>Comparar precios no actualizados</p>
        <CheckBox
          checked={watch().track_all}
          onChange={handleChangeChecked}
          name="track_all"
        />
      </span>
      <button className="button mt-2">Iniciar actualización</button>
    </form>
  );
};

export default UpdatePricesForm;
