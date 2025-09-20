import { ICategoryOption } from "../../types/apiResponses";

type SuggestedCategoryItemProps = {
  category: ICategoryOption;
  bgColor: string;
};

const SuggestedCategoryItem: React.FC<SuggestedCategoryItemProps> = ({
  category,
  bgColor,
}) => {
  return (
    <li
      className={`w-full bg-[${bgColor}] p-2 flex justify-between items-center`}
    >
      <span className="flex flex-col gap-0.5">
        <p className="font-light text-sm">{category.domain_name}</p>
        <p>{`${category.category_name} (${category.category_id})`}</p>
      </span>
    </li>
  );
};

type SuggestedCategoriesProps = {
  categories: ICategoryOption[] | null;
};

const SuggestedCategories: React.FC<SuggestedCategoriesProps> = ({
  categories,
}) => {
  return (
    <ul
      className={`flex flex-col w-full pr-10 transition-normal overflow-hidden ${categories?.length == 0 ? "max-h-0" : "max-h-96"}`}
    >
      {categories?.map((category, i) => (
        <SuggestedCategoryItem
          key={i}
          category={category}
          bgColor={`${i % 2 == 0 ? "#232427" : "#414249"}`}
        />
      ))}
    </ul>
  );
};

export default SuggestedCategories;
