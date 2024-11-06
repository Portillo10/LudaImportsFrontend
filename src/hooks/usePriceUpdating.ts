import { useState } from "react";

type Store = {
  alias: string;
  user: string;
  lastUpdate: Date;
  updating: boolean;
};

export const usePriceUpdating = () => {
  const [stores, setStores] = useState<Store[]>([
    {
      alias: "Salud y belleza",
      lastUpdate: new Date(),
      updating: false,
      user: "Portillo",
    },
  ]);

  return { stores };
};
