import Papa from "papaparse";

interface ParsedData {
  dimensions: string;
  weight: number;
  category: string;
  url: string;
}

// Función que recibe un archivo CSV y lo parsea a una lista de objetos
export function parseCSV(file: File): Promise<ParsedData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Evento que se ejecuta cuando el archivo se ha leído correctamente
    reader.onload = function (e) {
      const csvText = e.target?.result as string; // El contenido leído es de tipo string

      // Usamos PapaParse para parsear el archivo CSV
      Papa.parse(csvText, {
        quoteChar: "'",
        complete: function (results: any) {
          // Convertimos las filas CSV en objetos con las propiedades deseadas
          const parsedData: ParsedData[] = results.data.map((row: any[]) => {
            return {
              dimensions: row[0], // Primera columna
              weight: parseFloat(row[1].replace(",", ".")), // Segunda columna
              category: row[2], // Tercera columna
              url: row[3], // Cuarta columna
            };
          });

          resolve(parsedData); // Retornamos la lista de objetos parseados
        },
        skipEmptyLines: true, // Ignoramos las líneas vacías
        error: function (error: Error) {
          reject(error); // Si hay algún error, lo rechazamos
        },
      });
    };

    // Leemos el archivo como texto
    reader.readAsText(file);
  });
}
