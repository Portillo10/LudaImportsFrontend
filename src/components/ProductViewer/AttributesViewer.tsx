import { ItemAttribute } from "../../types/item";
import Input from "../Inputs/Input";

type AttributesViewerProps = {
  attributes: ItemAttribute[];
  onChangeAttribute: (attribute: ItemAttribute) => void;
};

const AttributesViewer: React.FC<AttributesViewerProps> = ({
  attributes,
  onChangeAttribute,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      {attributes.map((attr, i) => (
        <Input
          key={i}
          label={attr.label}
          value={attr.value_name}
          required={attr.required}
          name={attr.id}
          onChange={(value) => {
            onChangeAttribute({ ...attr, value_name: value });
          }}
        />
      ))}
    </div>
  );
};

export default AttributesViewer;
