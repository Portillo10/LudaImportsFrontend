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
