export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatCurrency = (currency: "USD" | "COP", number: number) => {
  const currencyFormatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency, // Puedes cambiarlo a USD, MXN, etc.
  });

  return currencyFormatter.format(number);
};

export const convertToQueryParams = (obj: any) => {
  const queryParams = [];
  for (const key of Object.keys(obj)) {
    queryParams.push(`${key}=${obj[key]}`);
  }
  return queryParams.join("&");
};

const spaceFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 20,
});

export const formatNumberWithSpace = (number: number) => {
  return spaceFormatter.format(number).replace(/,/g, " ");
};
const formatter = new Intl.NumberFormat("en-US");
export const formatNumber = (number: number) => {
  const result = formatter.format(number);
  return result;
};

export function isValidFloat(texto: string) {
  if (!texto.endsWith(".")) return false;

  // Contar todos los puntos
  const totalPuntos = (texto.match(/\./g) || []).length;

  return totalPuntos === 1;
}

export const getResizedImageUrl = (
  imageId: string,
  size: number = 1080,
  prefix: "SL" | "US" = "US",
  urlType: "amazon" | "censored" = "amazon"
) => {
  let source;
  switch (urlType) {
    case "amazon":
      source = `https://m.media-amazon.com/images/I/${imageId}._AC_${
        prefix + size
      }_.jpg`;
      break;
    case "censored":
      source = `https://api.notiludaimport.com/images/${imageId}?width=${size}&height=${size}`;
      break;
    default:
      throw new Error("formatUrlType invalid");
  }

  return source;
};
export const cutText = (text: string, maxLength: number): string => {
  const trimmedText = text.trim();

  if (trimmedText.length <= maxLength) return trimmedText;

  const excludedWords = new Set([
    "con",
    "y",
    "a",
    "de",
    "gran",
    "o",
    "para",
    "la",
    "en",
    "una",
    "un",
    "que",
    ",",
    "el",
    "-",
  ]);

  // Recorta hasta el máximo de caracteres
  let shortText = trimmedText.slice(0, maxLength);

  // Si el corte cae a mitad de una palabra, retrocede hasta el espacio anterior
  if (
    trimmedText.length > maxLength &&
    trimmedText[maxLength] !== " " &&
    shortText[shortText.length - 1] !== " "
  ) {
    const lastSpace = shortText.lastIndexOf(" ");
    if (lastSpace !== -1) {
      shortText = shortText.slice(0, lastSpace);
    }
  }

  // Elimina posibles palabras vacías o de poco valor al final
  const words = shortText.trim().split(" ");
  while (
    words.length > 0 &&
    excludedWords.has(words[words.length - 1].toLowerCase())
  ) {
    words.pop();
  }

  return words.join(" ");
};

export function hasPassedDays(fromDate: Date, days: number): boolean {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const start = new Date(fromDate);
  const now = new Date();

  // Normalizar ambas fechas a medianoche
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor((now.getTime() - start.getTime()) / MS_PER_DAY);

  return diffInDays >= days;
}
