type CategoryItemProps = {
  category_id: string;
  category_name: string;
  level: number;
  active?: boolean;
  onClick: (category_id: string, level: number) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category_id,
  category_name,
  level,
  active = false,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(category_id, level)}
      className={`text-sm font-light px-2 py-0.5 cursor-pointer hover:bg-[#4a4453] ${active ? "bg-[#4a4453]" : ""}`}
    >
      <span>
        <p className="">{`${category_name} (${category_id})`}</p>
      </span>
    </div>
  );
};

export default CategoryItem;
