interface ParsedData {
  dimensions?: string;
  weight?: number;
  category?: string;
  url: string;
}

export const parseTSVFromFile = async (file: File): Promise<ParsedData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;

      // Dividir líneas
      const lines = content.trim().split("\n");

      // Procesar cada línea
      let data: ParsedData[] = [];

      // let lineLenght;
      data = lines
        .map((line) => {
          if (line.trim() == "") return null;

          const values = line.split("\t");
          // lineLenght = values.length;

          if (values.length == 4)
            return {
              dimensions: values[0],
              weight: parseFloat(values[1].split(" ")[0]),
              category: values[2],
              url: values[3],
            };
          else if (values.length == 1)
            return {
              url: values[0],
            };
          else
            return {
              dimensions: values[0],
              weight: parseFloat(values[1].split(" ")[0]),
              url: values[2],
            };
        })
        .filter((value) => value != null);
      resolve(data);
    };
    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"));
    };
    reader.readAsText(file, "utf-8"); // Leer archivo como texto
  });
};

const isValidAmazonUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url.trim());
    return parsed.hostname.includes("amazon.");
  } catch {
    return false;
  }
};
// const isValidDimensions = (dimensions: string): boolean => {
//   const dimensionsPattern =
//     /^(\d+([.,]\d+)?\s*x\s*\d+([.,]\d+)?\s*x\s*\d+([.,]\d+)?(\s*pulgadas)?)|\d+\"al\s*x\s*\d+\"prof\s*x\s*\d+\"an\s*pulgadas$/;
//   return dimensionsPattern.test(dimensions);
// };

export const validateObjects = (
  objects: any[],
): { valid: boolean; errors: string[]; validObjects: any[] } => {
  const errors: string[] = [];

  const allValid = objects.every((obj, index) => {
    // const objKeys = Object.keys(obj);
    // const expectedKeys = ["weight", "url", "dimensions"];

    // if (objKeys.length < expectedKeys.length) {
    //   errors.push(
    //     `Object at index ${index} has unexpected number of attributes.`
    //   );
    //   return false;
    // }

    // if (!expectedKeys.every((key) => objKeys.includes(key))) {
    //   errors.push(`Object at index ${index} is missing required attributes.`);
    //   return false;
    // }

    // if (typeof obj.weight !== "number") {
    //   errors.push(
    //     `Object at index ${index} has an invalid 'weight' attribute.`
    //   );
    //   return false;
    // }

    // if (typeof obj.category !== "string" || !obj.category.startsWith("MCO")) {
    //   errors.push(
    //     `Object at index ${index} has an invalid 'category' attribute.`
    //   );
    //   return false;
    // }

    if (typeof obj.url !== "string" || !isValidAmazonUrl(obj.url)) {
      errors.push(`Object at index ${index} has an invalid 'url' attribute.`);
      return false;
    }

    return true;
  });

  const validUrls = objects.filter((obj, i) => {
    if (typeof obj.url === "string" && isValidAmazonUrl(obj.url)) return true;
    else console.log(i, "invalid url: ", obj.url);
    return false;
  });

  return { valid: allValid, errors, validObjects: validUrls };
};
