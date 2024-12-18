import Action from "./Action";

const DeleteItems: React.FC<{ index: number; displayed: boolean }> = ({
  index,
  displayed,
}) => {
  const onSubmit = async () => {};

  return (
    <Action
      index={index}
      displayed={displayed}
      label="Eliminar productos"
      onSubmit={onSubmit}
    >
      <div>Orale wey</div>
    </Action>
  );
};

export default DeleteItems;
