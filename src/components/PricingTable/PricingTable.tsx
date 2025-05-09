import { useState } from "react";
import Toast from "../Toast/Toast";
import Spinner from "../Spinner/Spinner";
import { PercentRange } from "../../types/sellerPricing";

import "./styles.css";
import { formatNumber } from "../../utils/helpers";

type PricingtableProps = {
  checkData: (
    index: number,
    newData: PercentRange[],
    type?: "profit" | "fixed_costs"
  ) => void;
  onSave: () => Promise<boolean>;
  data: PercentRange[];
  title: string;
  onChangePriceInput?: (value: number) => void;
  type?: "profit" | "fixed_costs";
  price?: number;
};

const PricingTable: React.FC<PricingtableProps> = ({
  onSave,
  title,
  checkData,
  data,
  type,
  price,
  onChangePriceInput,
}) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"error" | "success" | "warning">(
    "success"
  );

  const saveChanges = async () => {
    setSaving(true);
    if (await onSave()) {
      setActiveToast(true);
      setToastType("success");
      setToastMsg("Cambios guardados");
    } else {
      setToastType("error");
      setToastMsg("Error al guardar");
    }
    setSaving(false);
  };

  const onChangeInput = (value: number) => {
    if (
      (!isNaN(value) || price?.toString().length == 1) &&
      value.toString().length <= 6 &&
      onChangePriceInput
    ) {
      onChangePriceInput(isNaN(value) ? 0 : value);
    }
  };

  const updateRange = (index: number, key: "from" | "to", value: number) => {
    const updated = [...data];
    updated[index].range[key] = isNaN(value) ? 0 : value;
    checkData(index, updated, type);
  };

  const updatePercentage = (index: number, value: number) => {
    const updated = [...data];
    updated[index].percentage = isNaN(value) ? 0 : value / 100;
    checkData(index, updated, type);
  };

  const addRow = () => {
    if (data.length <= 5) {
      const updated = [...data];
      const lastRange = updated.pop();
      let penultRange;
      let newRange: PercentRange = {
        range: { from: 0, to: 1 },
        percentage: 0,
      };
      if (updated.length > 0) {
        penultRange = updated[updated.length - 1];
        newRange = {
          percentage: 0,
          range: {
            from: (penultRange?.range.to || 0) + 1,
            to: (penultRange?.range.to || 0) + 2,
          },
        };
      }

      if (lastRange && newRange.range.to) {
        lastRange.range.from = newRange.range.to + 1;
        checkData(0, [...updated, newRange, lastRange], type);
      }
    } else {
      setActiveToast(true);
      setToastMsg("Ya no se pueden añadir más filas");
      setToastType("warning");
    }
  };

  const deleteRow = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    checkData(0, updated, type);
  };

  const onBlur = (index: number) => {
    const updateData = [...data];
    const range = updateData[index];
    if (range.range.to != null && range.range.to <= range.range.from) {
      updateData[index].range.to = range.range.from + 1;
      if (index == data.length - 2) {
        updateData[updateData.length - 1].range.from = range.range.from + 1;
      }
    } else {
      console.log(range.range.to);
    }
    checkData(index, updateData, type);
  };

  return (
    <div className="w-[280px] bg-[#1e1f23] text-white rounded-2xl overflow-hidden shadow-lg transition">
      <span className="flex items-center justify-center gap-2">
        <h2 className="text-center text-lg font-semibold text-sky-300 pt-3 pb-1">
          {title}
        </h2>
        {price != undefined && (
          <span className="relative flex items-center pt-3 ">
            <input
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                onChangeInput(parseInt(value));
              }}
              className="mini-input w-28 text-left text-base"
              type="text"
              value={formatNumber(price)}
            />
            <div className="absolute right-0 pr-2 text-gray-400 pointer-events-none">
              COP
            </div>
          </span>
        )}
      </span>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-300">
          <tr>
            <th className="px-4 py-2 border-b border-gray-600 font-normal">
              Rangos (en USD)
            </th>
            <th className="px-4 py-2 border-b border-gray-600 font-normal">
              Porcent (%)
            </th>
            <th className="py-2 border-b border-gray-600 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-700 hover:bg-[#333438]"
            >
              <td className="px-3 py-2">
                {row.range.to !== null ? (
                  <div className="flex items-center gap-1 justify-center">
                    <input
                      disabled
                      type="text"
                      className="mini-input outline-none w-12"
                      value={row.range.from}
                      onChange={(e) =>
                        updateRange(idx, "from", parseInt(e.target.value))
                      }
                    />
                    <span>-</span>
                    <input
                      type="text"
                      className="mini-input outline-none w-12"
                      value={row.range.to}
                      onBlur={() => onBlur(idx)}
                      onChange={(e) =>
                        updateRange(idx, "to", parseInt(e.target.value))
                      }
                    />
                    {/* <span>USD</span> */}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    <span>más de</span>
                    <input
                      type="text"
                      disabled
                      className="mini-input outline-none"
                      value={row.range.from - 1}
                      onChange={(e) =>
                        updateRange(idx, "from", parseInt(e.target.value))
                      }
                    />
                    {/* <span>USD</span> */}
                  </div>
                )}
              </td>
              <td className="px-3 py-2 border-l border-gray-700">
                <div className="flex items-center justify-center gap-1">
                  <input
                    type="text"
                    className="mini-input outline-none w-12"
                    value={row.percentage * 100}
                    onChange={(e) =>
                      updatePercentage(idx, parseFloat(e.target.value))
                    }
                  />
                  <span className="">%</span>
                </div>
              </td>
              <td className="py-2 text-right flex w-4">
                {idx < data.length - 1 && idx > 0 && (
                  <button
                    onClick={() => deleteRow(idx)}
                    className="text-red-400 hover:text-red-600 font-bold text-xl"
                    title="Eliminar"
                  >
                    ×
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right p-3 border-t border-gray-700 flex gap-2 justify-center">
        <button
          onClick={addRow}
          className="bg-cyan-800 hover:bg-cyan-900 text-white px-3 py-1 rounded text-sm transition-all"
        >
          Agregar fila
        </button>
        <button
          disabled={saving}
          onClick={() => saveChanges()}
          className={`w-[81px] flex justify-center ${saving ? "bg-green-900" : "bg-green-800"} hover:bg-green-900 text-white px-3 py-1 rounded text-sm transition-all`}
        >
          {saving ? <Spinner size={20} /> : "Guardar"}
        </button>
      </div>
      {activeToast && (
        <Toast
          message={toastMsg}
          onClose={() => setActiveToast(false)}
          type={toastType}
        />
      )}
    </div>
  );
};

export default PricingTable;
