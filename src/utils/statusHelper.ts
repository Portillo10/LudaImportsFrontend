type SubscriptionStatus =
  | "active"
  | "cancelled"
  | "suspended"
  | "grace"
  | "expired"
  | "pending";

interface SubscriptionDates {
  endDate: Date; // Fin del período pagado
  graceUntil?: Date; // Fin del período de gracia, si aplica
  status?: string;
}

export interface StatusInfo {
  label: string;
  textColor: string; // Tailwind classes
  status: SubscriptionStatus;
  graceDays?: number;
  bgColor: string;
}

export function getStatusInfo({
  endDate,
  graceUntil,
  status,
}: SubscriptionDates): StatusInfo {
  const now = new Date();
  const end = new Date(endDate);
  const grace = graceUntil ? new Date(graceUntil) : null;

  if (status === "cancelled") {
    return {
      label: "Cancelada",
      textColor: "text-red-800",
      status: "cancelled",
      bgColor: "bg-red-100",
    };
  }
  if (status === "suspended") {
    return {
      label: "Suspendida",
      textColor: "text-orange-800",
      status: "suspended",
      bgColor: "bg-orange-100",
    };
  }

  // Lógica basada en fechas
  if (now <= end) {
    return {
      label: "Activa",
      textColor: "text-green-800",
      status: "active",
      bgColor: "bg-green-100 ",
    };
  }

  if (grace && now <= grace) {
    const difference = Math.abs(grace.getTime() - now.getTime());
    const graceDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return {
      graceDays,
      status: "grace",
      label: "Pago pendiente",
      textColor: "text-yellow-900",
      bgColor: "bg-yellow-100",
    };
  }

  return {
    label: "Expirada",
    textColor: "text-gray-700",
    status: "expired",
    bgColor: "bg-gray-200",
  };
}
