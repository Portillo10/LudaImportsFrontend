import { useState } from "react";
import mlService from "../services/mercadoLibreService";
import { CalcPriceResponse } from "../types/apiResponses";
import { formatCurrency } from "../utils/helpers";
import { useAuth } from "./useAuth";
import { isAxiosError } from "axios";
import priceService from "../services/priceService";

const initialPriceInfo = {
  amazonShipment: 0,
  customShipment: 0,
  fixedCosts: 0,
  importTax: 0,
  internationalShipment: 0,
  mlCommission: 0,
  mlShipment: 0,
  nationalSalesTax: 0,
  price: 0,
  profit: 0,
  profitPercent: 0,
  purchaseTax: 0,
  totalCopPurchase: 0,
  totalPurchase: 0,
  totalUsdPurchase: 0,
  unitPrice: 0,
  usdRate: 0,
  weight: 0,
};

export const useCalcPrice = () => {
  const { user } = useAuth();
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [priceRows, setPriceRows] = useState<
    { label: string; value: string }[]
  >([]);

  const getCategories = async () => {
    try {
      const response = await mlService.getCategories();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const calcPrice = async (params: any) => {
    setLoading(true);
    setMissingFields([]);
    try {
      if (!user || user?.stores.length == 0) {
        throw new Error("Debe tener por lo menos una tienda vinculada");
      }
      const { data, status } = await priceService.calcPrice(params);
      if (status == 202) {
        setActiveModal(true);
        if (data.missingFields) {
          setMissingFields(data.missingFields);
        }
      } else {
        const priceInfo = convertPriceToRows(data);
        setPriceRows(priceInfo);
      }

      return { data, status };
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        if (isAxiosError(error)) {
          if (error.response?.data) {
            setErrorMsg(error.response?.data.message);
          } else {
            setErrorMsg(error.message);
          }
        } else {
          setErrorMsg(error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const convertPriceToRows = (priceInfo: CalcPriceResponse) => {
    const indexAttr: Record<
      any,
      { currency: "USD" | "COP"; index: number; label: string }
    > = {
      price: { index: 1, currency: "USD", label: "Costo en Amazon" },
      amazonShipment: {
        index: 2,
        currency: "USD",
        label: "Envío de Amazon",
      },
      purchaseTax: {
        index: 3,
        currency: "USD",
        label: "Impuesto Amazon 7%",
      },
      totalPurchase: {
        index: 4,
        currency: "USD",
        label: "Total de la compra en Amazon",
      },
      profit: { index: 5, currency: "USD", label: "Ganancia" },
      internationalShipment: { index: 6, currency: "USD", label: "Peso" },
      customShipment: { index: 7, currency: "USD", label: "Envío custom" },
      importTax: {
        index: 8,
        currency: "USD",
        label: "Impuesto de importación",
      },
      fixedCosts: { index: 9, currency: "USD", label: "Costos fijos" },
      totalUsdPurchase: {
        index: 10,
        currency: "USD",
        label: "Subtotal",
      },
      usdRate: { index: 11, currency: "COP", label: "Precio del dolar" },
      totalCopPurchase: {
        index: 12,
        currency: "COP",
        label: "Total en pesos",
      },
      mlShipment: {
        index: 13,
        currency: "COP",
        label: "Envío de MercadoLibre",
      },
      mlCommission: {
        index: 14,
        currency: "COP",
        label: "Comisión de MercadoLibre",
      },
      nationalSalesTax: {
        index: 15,
        currency: "COP",
        label: "Impuesto de venta 2%",
      },
      unitPrice: { index: 16, currency: "COP", label: "Precio final" },
      weight: { index: 17, currency: "COP", label: "" },
      profitPercent: { index: 18, currency: "COP", label: "" },
    };
    const rows = [];
    const ignoreAttrs = ["weight", "profitPercent"];
    for (const [key, value] of Object.entries(indexAttr)) {
      const cost = JSON.parse(JSON.stringify(priceInfo))[key];
      const row = {
        label: value.label,
        value: formatCurrency(value.currency, cost),
      };

      if (key == "internationalShipment") {
        row.label += `: ${priceInfo.weight} libras`;
      } else if (key == "profit") {
        row.label += ` ${priceInfo.profitPercent * 100}%`;
      }

      if (!ignoreAttrs.includes(key)) {
        rows.push(row);
      }
    }
    return rows;
  };

  const getInitialPriceInfo = () => {
    try {
      const rows = convertPriceToRows(initialPriceInfo);
      setPriceRows(rows);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  return {
    getInitialPriceInfo,
    getCategories,
    closeModal,
    calcPrice,
    setActiveModal,
    setErrorMsg,
    missingFields,
    activeModal,
    priceRows,
    loading,
    errorMsg,
  };
};
