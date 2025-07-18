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
