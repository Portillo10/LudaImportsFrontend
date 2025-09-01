import React, { useState } from "react";
import { Settings2 } from "lucide-react";
import { formatNumberWithSpace } from "../../../utils/helpers";

interface SearchBarProps {
  total: number;
  className?: string;
  onSearch?: (query: string) => void;
  openFiltersModal: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  total = 0,
  className = "",
  openFiltersModal,
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
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
          onClick={openFiltersModal}
          className="px-2 py-1  text-white rounded hover:bg-blue-700 transition flex items-center gap-1"
        >
          <Settings2 size={20} />
          <p>Filtrar y ordenar</p>
        </button>
      </div>
      <div className="px-4">{formatNumberWithSpace(total)} publicaciones</div>
    </div>
  );
};

export default SearchBar;
