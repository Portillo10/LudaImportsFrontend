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

const isValidAmazonUrl = (url: string): boolean => {
  const amazonUrlPattern = /^https?:\/\/(www\.)?amazon\.[a-z.]+\/.+/;
  return amazonUrlPattern.test(url);
};

const isValidDimensions = (dimensions: string): boolean => {
  const dimensionsPattern =
    /^(\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?(\s*pulgadas)?)|\d+\"al\s*x\s*\d+\"prof\s*x\s*\d+\"an\s*pulgadas$/;
  return dimensionsPattern.test(dimensions);
};

export const validateObjects = (
  objects: any[]
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const allValid = objects.every((obj, index) => {
    const objKeys = Object.keys(obj);
    const expectedKeys = ["weight", "category", "url", "dimensions"];

    if (objKeys.length !== expectedKeys.length) {
      errors.push(
        `Object at index ${index} has unexpected number of attributes.`
      );
      return false;
    }

    if (!expectedKeys.every((key) => objKeys.includes(key))) {
      errors.push(`Object at index ${index} is missing required attributes.`);
      return false;
    }

    if (typeof obj.weight !== "number") {
      errors.push(
        `Object at index ${index} has an invalid 'weight' attribute.`
      );
      return false;
    }

    if (typeof obj.category !== "string" || !obj.category.startsWith("MCO")) {
      errors.push(
        `Object at index ${index} has an invalid 'category' attribute.`
      );
      return false;
    }

    if (typeof obj.url !== "string" || !isValidAmazonUrl(obj.url)) {
      errors.push(`Object at index ${index} has an invalid 'url' attribute.`);
      return false;
    }

    if (
      typeof obj.dimensions !== "string" ||
      !isValidDimensions(obj.dimensions)
    ) {
      errors.push(
        `Object at index ${index} has an invalid 'dimensions' attribute.`
      );
      return false;
    }

    return true;
  });

  return { valid: allValid, errors };
};
