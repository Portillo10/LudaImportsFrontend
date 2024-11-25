import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { ICategory, IChildrenCategory } from "../../types/category";
import { fetchCategories } from "../../utils/fetchHelper";
import Toast from "../Toast/Toast";

type ActiveCategory = {
  level: number;
  id: string;
};

interface CategoryItem extends IChildrenCategory {
  parent: boolean;
}

const CategoriesTree: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[][]>([]);
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [activeCategories, setActiveCategories] = useState<ActiveCategory[]>(
    []
  );
  const [categoriesJson, setCategoriesJson] = useState<Record<
    string,
    ICategory
  > | null>(null);

  useEffect(() => {
    (async () => {
      const categoriesResponse: ICategory[] = await fetchCategories();
      const categoriesJsonResponse = categoriesResponse.reduce(
        (acc: Record<string, ICategory>, val) => {
          acc[val.id] = val;
          return acc;
        },
        {}
      );
      setCategoriesJson(categoriesJsonResponse);

      const rootCategories = categoriesResponse
        .filter((category: ICategory) => category.root)
        .map((category) => ({ ...category, parent: true }));
      setCategories([rootCategories]);
    })();
  }, []);

  const handleClickItem = (category_id: string, level: number) => {
    try {
      if (categoriesJson) {
        const chlidrenCategories = categoriesJson[
          category_id
        ]?.children_categories?.map((category) => {
          if (categoriesJson[category.id]?.children_categories.length > 0) {
            return { ...category, parent: true };
          } else {
            return { ...category, parent: false };
          }
        });
        if (chlidrenCategories && chlidrenCategories.length > 0) {
          const currentCategories = [];
          for (let i = 0; i <= level; i++) {
            currentCategories.push(categories[i]);
          }
          setCategories([...currentCategories, chlidrenCategories]);
          const currentActive = [];
          currentActive.push({ id: category_id, level });
          for (const category of activeCategories) {
            if (category.level != level && category.level <= level) {
              currentActive.push(category);
            }
          }
          setActiveCategories(currentActive);
        } else {
          setActiveToast(false);
          setActiveToast(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseToast = () => {
    setActiveToast(false);
  };

  const isActive = (category_id: string) => {
    const category = activeCategories.find(
      (category) => category.id == category_id
    );
    return !!category;
  };

  return (
    <div className="w-full flex py-2">
      {categories.map((categoryChunk, index) => (
        <div key={index} className="flex">
          {index > 0 && <hr className="bg-[#4b5563] w-[2px] h-full" />}
          <div className="flex flex-col">
            {categoryChunk.map((category, j) => (
              <CategoryItem
                parent={category.parent}
                level={index}
                key={j}
                category_id={category.id}
                category_name={category.name}
                onClick={handleClickItem}
                active={isActive(category.id)}
              />
            ))}
          </div>
        </div>
      ))}
      {activeToast && (
        <Toast
          message="Esa categoría no tiene categorías hijas"
          type="warning"
          onClose={handleCloseToast}
          duration={1000}
        />
      )}
    </div>
  );
};

export default CategoriesTree;
