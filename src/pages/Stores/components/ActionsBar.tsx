import React from "react";
import { TrashIcon, PlayIcon, PauseIcon, Undo2 } from "lucide-react";

interface ActionsBarProps {
  onPause?: () => void;
  onDelete?: () => void;
  onReactivate?: () => void;
  onRepublish?: () => void;
  disabledPause?: boolean;
  disabledDelete?: boolean;
  disabledReactivate?: boolean;
  disabledRepublish?: boolean;
}

const ActionsBar: React.FC<ActionsBarProps> = ({
  onPause,
  onDelete,
  onReactivate,
  onRepublish,
  disabledPause,
  disabledDelete,
  disabledReactivate,
  disabledRepublish,
}) => {
  const actions = [
    {
      label: "Pausar",
      icon: PauseIcon,
      onClick: onPause,
      bg: "bg-gray-400",
      hoverBg: "hover:bg-gray-500",
    },
    {
      label: "Eliminar",
      icon: TrashIcon,
      onClick: onDelete,
      bg: "bg-red-400",
      hoverBg: "hover:bg-red-500",
    },
    {
      label: "Reactivar",
      icon: PlayIcon,
      onClick: onReactivate,
      bg: "bg-green-400",
      hoverBg: "hover:bg-green-500",
    },
    {
      label: "Republicar",
      icon: Undo2,
      onClick: onRepublish,
      bg: "bg-cyan-300",
      hoverBg: "hover:bg-cyan-500",
    },
  ];

  return (
    <div
      className="flex gap-2 items-center justify-end w-full bg-[#1a1b1f] p-3 rounded-t-md"
      aria-label="actions bar"
    >
      {actions.map((action, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-2 py-1 rounded font-medium text-sm ${action.bg} text-gray-900 transition-colors
        ${
          (action.label === "Pausar" && disabledPause) ||
          (action.label === "Eliminar" && disabledDelete) ||
          (action.label === "Reactivar" && disabledReactivate) ||
          (action.label === "Republicar" && disabledRepublish)
            ? "opacity-50 cursor-default"
            : action.hoverBg
        }`}
          onClick={action.onClick}
          disabled={
            (action.label === "Pausar" && disabledPause) ||
            (action.label === "Eliminar" && disabledDelete) ||
            (action.label === "Reactivar" && disabledReactivate) ||
            (action.label === "Republicar" && disabledRepublish)
          }
          type="button"
        >
          <action.icon size={18} />
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionsBar;
