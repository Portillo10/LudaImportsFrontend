import { ItemAttribute } from "../../types/item";
import Input from "../Inputs/Input";

type AttributesViewerProps = {
  attributes: ItemAttribute[];
};

const AttributesViewer: React.FC<AttributesViewerProps> = ({ attributes }) => {
  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      {attributes.map((attr, i) => (
        <Input
          key={i}
          label={attr.label}
          value={attr.value_name}
          required={attr.required}
          name={attr.id}
        />
      ))}
    </div>
  );
};

export default AttributesViewer;
