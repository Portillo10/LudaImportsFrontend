import React, { useState } from "react";
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
          state: { $in: newState },
          subStatus: currentSubStatus,
        },
      };
    });
  };

  // const setFilterStates = (states: string[]) => {
  //   const result = {
  //     ...newFilters,
  //     productStore: {
  //       ...newFilters.productStore,
  //       state: { $in: states },
  //     },
  //   };
  //   setNewFilters(result);
  // };

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

  const handleClear = () => {
    setNewFilters({
      ...newFilters,
      productStore: {
        state: { $in: [] },
      },
    });
  };

  const handleClose = () => {
    setNewFilters(filters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6 w-full max-w-md rounded-lg shadow-lg">
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
                  "under_review"
                )}
                onChange={() => handleStateChange("under_review")}
              />
              Inactivas
            </label>
          </div>
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
