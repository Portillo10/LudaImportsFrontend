import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";

interface FiltersModalProps {
  filters: any;
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  filters,
  onClose,
  onApply,
}) => {
  const [newFilters, setNewFilters] = useState(filters);
  const [categories, setCategories] = useState([]);
  const [categoriesContainerHeight, setCategoriesContainerHeight] =
    useState("max-h-24");

  useEffect(() => {
    fetch("/categories.json")
      .then(async (resp) => {
        const parentCategories = (await resp.json()).filter(
          (cat: any) => cat.root,
        );

        setCategories(parentCategories);
      })
      .catch((err) => {
        console.log("Error cargando categorias en el filtro");
        console.log(err);
      });
  }, []);

  const handleStateChange = (state: string) => {
    setNewFilters((prev: any) => {
      let currentStatus = prev.productStore.state.$in;
      let currentSubStatus = prev.productStore.subStatus;
      if (
        !currentStatus.includes("under_review") ||
        (currentStatus.includes("under_review") && state == "under_review")
      ) {
        currentSubStatus = undefined;
      }
      const newState = prev.productStore.state.$in.includes(state)
        ? prev.productStore.state.$in.filter((s: any) => s !== state)
        : [...prev.productStore.state.$in, state];
      return {
        ...prev,
        productStore: {
          ...prev.productStore,
          state: { $in: newState, $nin: ["pending", "error"] },
          subStatus: currentSubStatus,
        },
      };
    });
  };

  const handleChangeFilters = (key: string, value: any) => {
    setNewFilters((prev: any) => {
      try {
        const currentValue = prev.productStore[key];
        let currentFilterStates = prev.productStore.state.$in;
        if (
          key == "subStatus" &&
          currentValue != value &&
          !currentFilterStates.includes("under_review")
        ) {
          currentFilterStates.push("under_review");
        }
        return {
          ...prev,
          productStore: {
            ...prev.productStore,
            state: { $in: currentFilterStates },
            [key]:
              currentValue !== undefined &&
              JSON.stringify(currentValue) == JSON.stringify(value)
                ? undefined
                : value,
          },
        };
      } catch (error) {
        console.log(error);
        return prev;
      }
    });
  };

  const handleChangeCategory = (newCategory: any) => {
    let currentCategories = newFilters.productStore.parentCategoryId.$in;
    const categoryIsInFilter = currentCategories.find(
      (cat: any) => cat == newCategory.id,
    );

    if (categoryIsInFilter) {
      currentCategories = currentCategories.filter(
        (cat: string) => cat != newCategory.id,
      );
    } else {
      currentCategories.push(newCategory.id);
    }

    setNewFilters({
      ...newFilters,
      productStore: {
        ...newFilters.productStore,
        parentCategoryId: { $in: currentCategories },
      },
    });
  };

  const handleClear = () => {
    setNewFilters({
      ...newFilters,
      productStore: {
        state: { $in: [], $nin: ["pending", "error"] },
      },
    });
  };

  const handleClose = () => {
    setNewFilters(filters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6 w-full max-w-2xl rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Filtrar y ordenar</h2>
        {/* Filtros recomendados */}
        <div className="py-3 flex gap-4 border-b border-gray-300">
          <label className="block mb-2 max-w-28">
            Estado de la publicación:
          </label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newFilters.productStore.state.$in.includes("paused")}
                onChange={() => handleStateChange("paused")}
              />
              Pausadas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newFilters.productStore.state.$in.includes("active")}
                onChange={() => handleStateChange("active")}
              />
              Activas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newFilters.productStore.state.$in.includes(
                  "under_review",
                )}
                onChange={() => handleStateChange("under_review")}
              />
              Inactivas
            </label>
          </div>
        </div>
        {/* Categoría */}
        <div className="py-3 border-b flex flex-col items-center border-gray-300">
          <div className="flex gap-4">
            <label className="block mb-2 max-w-32 min-w-28">Categoría:</label>
            <div
              className={`flex flex-wrap gap-3 ${categoriesContainerHeight} overflow-hidden transition-all duration-700`}
            >
              {categories.map((cat: any) => (
                <label key={cat.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={
                      newFilters.productStore.parentCategoryId.$in.includes(
                        cat.id,
                      )
                        ? true
                        : false
                    }
                    onChange={() => handleChangeCategory(cat)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={() =>
              setCategoriesContainerHeight((prev: any) => {
                const newHeight =
                  prev == "max-h-screen" ? "max-h-24" : "max-h-screen";
                return newHeight;
              })
            }
            className="text-sm cursor-pointer mt-2"
          >
            {categoriesContainerHeight == "max-h-24"
              ? "Ver más categorías..."
              : "Ver menos"}
          </button>
        </div>
        {/* Estado de la publicación */}
        <div className="py-3 flex gap-4">
          <label className="block mb-2 max-w-32 min-w-28">Otros filtros:</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  newFilters.productStore.subStatus != undefined &&
                  newFilters.productStore.subStatus == "forbidden"
                    ? true
                    : false
                }
                onChange={() => handleChangeFilters("subStatus", "forbidden")}
              />
              Categoría incorrecta
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  newFilters.productStore.views != undefined &&
                  newFilters.productStore.views == 0
                    ? true
                    : false
                }
                onChange={() => handleChangeFilters("views", 0)}
              />
              Sin vistas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  newFilters.productStore.views != undefined &&
                  typeof newFilters.productStore.views === "object"
                    ? true
                    : false
                }
                onChange={() => handleChangeFilters("views", { $gt: 0 })}
              />
              Con vistas
            </label>
          </div>
        </div>
        {/* Condición */}
        <div className="mb-4"></div>
        {/* Envío gratis */}
        <div className="mb-6"></div>
        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
            onClick={handleClear}
            type="button"
          >
            Limpiar filtros
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onApply(newFilters)}
            type="button"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FiltersModal;
