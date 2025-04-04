import React from "react";

type SpecsTableProps = {
  specs: any;
};

const SpecsTable: React.FC<SpecsTableProps> = ({ specs }) => {
  // Convertir el objeto de especificaciones en un array de pares [clave, valor]
  const specEntries = Object.entries(specs);

  // Determinar si debemos dividir la tabla en dos columnas
  const shouldSplit = specEntries.length > 7;

  // Si debemos dividir, calcular el punto medio para una distribución equitativa
  const midPoint = shouldSplit
    ? Math.ceil(specEntries.length / 2)
    : specEntries.length;

  // Dividir las especificaciones en dos columnas si es necesario
  const leftSpecs = specEntries.slice(0, midPoint);
  const rightSpecs = shouldSplit ? specEntries.slice(midPoint) : [];

  // Renderizar una columna de la tabla
  const renderColumn = (specs: any[]) => (
    <div className="flex-1">
      {specs.map(([key, value], index) => (
        <div
          key={index}
          className="flex gap-2 border-t-2 border-gray-500 last:border-b-2"
        >
          <div className="w-1/2 py-3 px-1">{key}</div>
          <div className="w-1/2 py-3 px-1 font-light">{value}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full text-white text-sm">
      <div className="flex flex-wrap gap-8">
        {renderColumn(leftSpecs)}
        {shouldSplit && renderColumn(rightSpecs)}
      </div>
    </div>
  );
};

export default SpecsTable;
