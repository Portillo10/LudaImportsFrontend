export const reputationColors: Record<
  string,
  { class: string; label: string; color: string }
> = {
  "1_red": {
    class: "bg-[#FBB3C0] text-[#CC2020]",
    label: "Rojo",
    color: "bg-red-400",
  },
  "2_orange": {
    class: "bg-[#F0B790] text-[#E35F04]",
    label: "Naranja",
    color: "bg-orange-300",
  },
  "3_yellow": {
    class: "bg-[#EEDDB4] text-[#D2B300]",
    label: "Amarillo",
    color: "bg-yellow-200",
  },
  "4_light_green": {
    class: "bg-[#D5E8CF] text-[#37A316]",
    label: "Verde claro",
    color: "bg-green-300",
  },
  "5_green": {
    class: "bg-[#A8F0A2] text-[#128408]",
    label: "Verde",
    color: "bg-green-500",
  },
  default: {
    class: "bg-[#E0E0E0] text-[#808080]",
    label: "Sin reputación",
    color: "bg-gray-400",
  },
};
