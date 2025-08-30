import React from "react";
import { TrashIcon, PlayIcon, PauseIcon, Undo2 } from "lucide-react";

interface ActionsBarProps {
  onPause?: () => void;
  onDelete?: () => void;
  onReactivate?: () => void;
  disabledPause?: boolean;
  disabledDelete?: boolean;
  disabledReactivate?: boolean;
}

const ActionsBar: React.FC<ActionsBarProps> = ({
  onPause,
  onDelete,
  onReactivate,
  disabledPause,
  disabledDelete,
  disabledReactivate,
}) => (
  <div
    className="flex gap-2 items-center justify-end w-full bg-[#1a1b1f] p-3 rounded-t-md"
    aria-label="actions bar"
  >
    <button
      className={`flex items-center gap-2 px-2 py-1 rounded font-medium text-sm bg-gray-400 text-gray-900 transition-colors
        hover:bg-gray-500
        ${disabledPause ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onPause}
      disabled={disabledPause}
      type="button"
    >
      <PauseIcon size={18} />
      Pausar
    </button>
    <button
      className={`flex items-center gap-2 px-2 py-1 rounded font-medium text-sm bg-red-400 text-gray-900 transition-colors
        hover:bg-red-500
        ${disabledDelete ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onDelete}
      disabled={disabledDelete}
      type="button"
    >
      <TrashIcon size={18} />
      Eliminar
    </button>
    <button
      className={`flex items-center gap-2 px-2 py-1 rounded font-medium text-sm bg-green-400 text-gray-900 transition-colors
        hover:bg-green-500
        ${disabledReactivate ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onReactivate}
      disabled={disabledReactivate}
      type="button"
    >
      <PlayIcon size={18} />
      Reactivar
    </button>
    <button
      className={`flex items-center gap-2 px-2 py-1 rounded font-medium text-sm bg-cyan-300 text-gray-900 transition-colors
        hover:bg-cyan-500
        ${disabledReactivate ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onReactivate}
      disabled={disabledReactivate}
      type="button"
    >
      <Undo2 size={18} />
      Republicar
    </button>
  </div>
);

export default ActionsBar;
