import { useState } from "react";
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";

type CustomTableProps = {
  data: any[];
  columns: any[];
  actions: any[];
  expandableMenuStyle?: string; // 'floating' o 'expanded'
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  stripedRows?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  compact?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
};

const CustomTable: React.FC<CustomTableProps> = ({
  data = [],
  columns = [],
  actions = [],
  expandableMenuStyle = "floating", // 'floating' o 'expanded'
  tableClassName = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
  stripedRows = true,
  hoverable = true,
  bordered = false,
  rounded = true,
  compact = false,
  sortable = true,
  pagination = true,
  itemsPerPage = 5,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);

  // Ordenamiento de datos
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      const keyA = a[sortConfig.key];
      const keyB = b[sortConfig.key];

      if (keyA < keyB) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (keyA > keyB) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = pagination
    ? sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : sortedData;

  // Función para cambiar el ordenamiento
  const requestSort = (key: any) => {
    if (!sortable) return;

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Función para manejar el menú de acciones
  const handleActionMenu = (index: number) => {
    if (actionMenuOpen === index) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(index);
      if (expandableMenuStyle === "expanded") {
        setExpandedRow(index);
      }
    }
  };

  // Función para manejar click en una acción
  const handleActionClick = (action: any, item: any) => {
    if (action.onClick) {
      action.onClick(item);
    }
    setActionMenuOpen(null);
    if (expandableMenuStyle === "expanded") {
      setExpandedRow(null);
    }
  };

  // Clases base para la tabla
  const tableBaseClasses = `w-full ${rounded ? "rounded-lg overflow-hidden" : ""} ${bordered ? "border border-gray-200" : ""} ${tableClassName}`;
  const headerBaseClasses = `bg-[#232427] text-left font-medium ${compact ? "p-2 text-sm" : "p-4"} ${headerClassName}`;
  const rowBaseClasses = `${hoverable ? "hover:bg-gray-50" : ""} ${bordered ? "border-b border-gray-200" : ""} ${rowClassName}`;
  const cellBaseClasses = `${compact ? "p-2 text-sm" : "p-4"} ${cellClassName}`;

  return (
    <div className="overflow-x-auto">
      <table className={tableBaseClasses}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${headerBaseClasses} ${sortable && column.sortable !== false ? "cursor-pointer" : ""}`}
                onClick={() =>
                  column.sortable !== false ? requestSort(column.key) : null
                }
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {sortable &&
                    column.sortable !== false &&
                    sortConfig.key === column.key &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </th>
            ))}
            {actions.length > 0 && (
              <th className={headerBaseClasses} style={{ width: "60px" }}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, rowIndex) => {
            const actualIndex = pagination
              ? (currentPage - 1) * itemsPerPage + rowIndex
              : rowIndex;
            const isExpanded = expandedRow === actualIndex;
            const isMenuOpen = actionMenuOpen === actualIndex;

            return (
              <>
                <tr
                  key={`row-${actualIndex}`}
                  className={`${rowBaseClasses} bg-[#414249] ${stripedRows && rowIndex % 2 === 1 ? "" : ""}`}
                >
                  {columns.map((column) => (
                    <td
                      key={`cell-${column.key}-${actualIndex}`}
                      className={cellBaseClasses}
                    >
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className={cellBaseClasses}>
                      <div className="relative">
                        <button
                          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                          onClick={() => handleActionMenu(actualIndex)}
                          aria-label="Acciones"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {/* Menú flotante de acciones */}
                        {expandableMenuStyle === "floating" && isMenuOpen && (
                          <div className="absolute right-0 z-10 mt-1 bg-[#414249] rounded-md shadow-lg border border-gray-200 min-w-40">
                            <div className="py-1">
                              {actions.map((action, idx) => (
                                <button
                                  key={`action-${idx}`}
                                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-600"
                                  onClick={() =>
                                    handleActionClick(action, item)
                                  }
                                  disabled={action.disabled}
                                >
                                  {action.icon && (
                                    <span className="mr-2">{action.icon}</span>
                                  )}
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>

                {/* Fila expandida para acciones (en modo expandido) */}
                {expandableMenuStyle === "expanded" &&
                  isExpanded &&
                  isMenuOpen && (
                    <tr key={`expanded-${actualIndex}`}>
                      <td
                        colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                        className="bg-gray-50 p-0"
                      >
                        <div className="p-4 border-t border-gray-200">
                          <div className="flex space-x-4">
                            {actions.map((action, idx) => (
                              <button
                                key={`exp-action-${idx}`}
                                className={`flex items-center px-3 py-2 rounded-md text-sm ${
                                  action.variant === "danger"
                                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                                    : action.variant === "success"
                                      ? "bg-green-50 text-green-700 hover:bg-green-100"
                                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                }`}
                                onClick={() => handleActionClick(action, item)}
                                disabled={action.disabled}
                              >
                                {action.icon && (
                                  <span className="mr-2">{action.icon}</span>
                                )}
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
              </>
            );
          })}

          {paginatedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="text-center py-8 text-gray-500"
              >
                No hay datos para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} de{" "}
            {sortedData.length} registros
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded border ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#414249] text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={`page-${pageNum}`}
                  className={`w-8 h-8 rounded ${currentPage === pageNum ? "bg-blue-100 text-blue-700" : "bg-[#414249] text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className={`px-3 py-1 rounded border ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#414249] text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Ejemplo de uso
// const TableExample = () => {
//   // Datos de ejemplo
//   const userData = [
//     {
//       id: 1,
//       name: "Juan Pérez",
//       email: "juan@ejemplo.com",
//       role: "Admin",
//       status: "Activo",
//     },
//     {
//       id: 2,
//       name: "María García",
//       email: "maria@ejemplo.com",
//       role: "Editor",
//       status: "Inactivo",
//     },
//     {
//       id: 3,
//       name: "Carlos López",
//       email: "carlos@ejemplo.com",
//       role: "Usuario",
//       status: "Activo",
//     },
//     {
//       id: 4,
//       name: "Ana Martínez",
//       email: "ana@ejemplo.com",
//       role: "Admin",
//       status: "Activo",
//     },
//     {
//       id: 5,
//       name: "Roberto Sánchez",
//       email: "roberto@ejemplo.com",
//       role: "Usuario",
//       status: "Inactivo",
//     },
//     {
//       id: 6,
//       name: "Laura Rodríguez",
//       email: "laura@ejemplo.com",
//       role: "Editor",
//       status: "Activo",
//     },
//   ];

//   // Definición de columnas
//   const columns = [
//     { key: "id", label: "ID", sortable: true },
//     { key: "name", label: "Nombre", sortable: true },
//     { key: "email", label: "Email", sortable: true },
//     { key: "role", label: "Rol", sortable: true },
//     {
//       key: "status",
//       label: "Estado",
//       sortable: true,
//       render: (item: any) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             item.status === "Activo"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {item.status}
//         </span>
//       ),
//     },
//   ];

//   // Definición de acciones
//   const actions = [
//     {
//       label: "Editar",
//       onClick: (item: any) => alert(`Editando a ${item.name}`),
//       icon: <span className="material-icons">edit</span>,
//     },
//     {
//       label: "Eliminar",
//       onClick: (item: any) => alert(`Eliminando a ${item.name}`),
//       icon: <span className="material-icons">delete</span>,
//       variant: "danger",
//     },
//     {
//       label: "Ver detalles",
//       onClick: (item: any) => alert(`Viendo detalles de ${item.name}`),
//       icon: <span className="material-icons">visibility</span>,
//     },
//   ];

//   // Estado para controlar el tipo de menú
//   const [menuStyle, setMenuStyle] = useState<string>("floating");
//   const [compact, setCompact] = useState(false);
//   const [striped, setStriped] = useState(true);
//   const [bordered, setBordered] = useState(false);
//   const [rounded, setRounded] = useState(true);

//   return (
//     <div className="p-6 max-w-full mx-auto bg-[#414249] rounded-lg shadow-sm">
//       <h2 className="text-2xl font-bold mb-6">Tabla Personalizable</h2>

//       <div className="mb-6 space-y-4">
//         <div className="flex flex-wrap gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Estilo de menú
//             </label>
//             <select
//               className="px-3 py-2 border rounded-md"
//               value={menuStyle}
//               onChange={(e) => setMenuStyle(e.target.value)}
//             >
//               <option value="floating">Menú flotante</option>
//               <option value="expanded">Fila expandida</option>
//             </select>
//           </div>

//           <div className="flex items-center space-x-6">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={compact}
//                 onChange={() => setCompact(!compact)}
//                 className="rounded"
//               />
//               <span>Compacto</span>
//             </label>

//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={striped}
//                 onChange={() => setStriped(!striped)}
//                 className="rounded"
//               />
//               <span>Filas alternas</span>
//             </label>

//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={bordered}
//                 onChange={() => setBordered(!bordered)}
//                 className="rounded"
//               />
//               <span>Bordes</span>
//             </label>

//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={rounded}
//                 onChange={() => setRounded(!rounded)}
//                 className="rounded"
//               />
//               <span>Esquinas redondeadas</span>
//             </label>
//           </div>
//         </div>
//       </div>

//       <CustomTable
//         data={userData}
//         columns={columns}
//         actions={actions}
//         expandableMenuStyle={menuStyle}
//         compact={compact}
//         stripedRows={striped}
//         bordered={bordered}
//         rounded={rounded}
//         pagination={true}
//         itemsPerPage={4}
//       />
//     </div>
//   );
// };

export default CustomTable;
