import React from "react";
import Modal from "../../../components/Modal/Modal";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FiltersState) => void;
  onChangeState?: (state: string) => void;
  filters: any;
}

interface FiltersState {
  category: string;
  priceRange: [number, number];
  condition: string;
  shipping: boolean;
  state: string[];
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  onApply,
  onChangeState,
  filters,
}) => {
  const handleStateChange = (state: string) => {
    if (onChangeState) onChangeState(state);
  };

  const handleClear = () => {
    // setFilters({
    //   category: "",
    //   priceRange: [0, 10000],
    //   condition: "",
    //   shipping: false,
    //   state: [],
    // });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-md rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Filtrar y ordenar</h2>
        {/* Filtros recomendados */}
        <div className="py-3 flex gap-4">
          <label className="block mb-2">Filtros recomendados:</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.productStore.state.$in.includes("paused")}
                onChange={() => handleStateChange("paused")}
              />
              Pausadas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.productStore.state.$in.includes("active")}
                onChange={() => handleStateChange("active")}
              />
              Activas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.productStore.state.$in.includes(
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
          <label className="block mb-2">Estado de la publicación:</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.productStore.subStatus?.includes("paused")}
                onChange={() => handleStateChange("paused")}
              />
              Pausadas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.productStore.state.$in.includes("active")}
                onChange={() => handleStateChange("active")}
              />
              Activas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.productStore.state.$in.includes(
                  "under_review"
                )}
                onChange={() => handleStateChange("under_review")}
              />
              Inactivas
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
            className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
            onClick={handleClear}
            type="button"
          >
            Limpiar filtros
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onApply(filters)}
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
