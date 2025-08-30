import React, { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { formatNumberWithSpace } from "../../../utils/helpers";
import FiltersModal from "../modals/FiltersModal";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import { useSearchBarFilter } from "../../../hooks/useSearchBarFilter";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterSort?: () => void;
  className?: string;
  totalItems?: number;
  setLoadingItems: (loading: boolean) => void;
  currentPage?: number;
  setItems: (items: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterSort,
  className = "",
  setLoadingItems,
  currentPage,
  setItems,
}) => {
  const [query, setQuery] = useState("");
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const { store_id } = useParams();
  const { searchItems } = useStores();
  const [totalItems, setTotalItems] = useState<number>(0);
  const { filters, handleStateChange } = useSearchBarFilter();

  useEffect(() => {
    if (currentPage) {
      loadItems();
    }
  }, [currentPage]);

  const loadItems = async () => {
    setLoadingItems(true);
    if (store_id) {
      const response = await searchItems(store_id, filters, {
        page: currentPage,
      });
      if (response) {
        setItems(response.data);
        setTotalItems(response.total);
      }
    }
    setLoadingItems(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleFilterSort = () => {
    setIsFiltersModalOpen(true);
    if (onFilterSort) {
      onFilterSort();
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-3 w-3/5">
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={handleInputChange}
          className="input-custom px-3 py-2 w-3/5 mr-1"
        />
        <span className="h-[20px] bg-gray-400 w-[1px]"></span>
        <button
          onClick={handleFilterSort}
          className="px-2 py-1  text-white rounded hover:bg-blue-700 transition flex items-center gap-1"
        >
          <Settings2 size={20} />
          <p>Filtrar y ordenar</p>
        </button>
      </div>
      <div className="px-4">
        {formatNumberWithSpace(totalItems)} publicaciones
      </div>
      <FiltersModal
        filters={filters}
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApply={() => setIsFiltersModalOpen(false)}
        onChangeState={handleStateChange}
      />
    </div>
  );
};

export default SearchBar;
