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
  status: string;
}

interface StatusInfo {
  label: string;
  color: string; // Tailwind classes
  status: SubscriptionStatus;
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
      color: "bg-red-100 text-red-800",
      status: "cancelled",
    };
  }
  if (status === "suspended") {
    return {
      label: "Suspendida",
      color: "bg-orange-100 text-orange-800",
      status: "suspended",
    };
  }

  // Lógica basada en fechas
  if (now <= end) {
    return {
      label: "Activa",
      color: "bg-green-100 text-green-800",
      status: "active",
    };
  }

  if (grace && now <= grace) {
    return {
      label: "Pago pendiente",
      color: "bg-yellow-100 text-yellow-800",
      status: "grace",
    };
  }

  return {
    label: "Expirada",
    color: "bg-gray-200 text-gray-700",
    status: "expired",
  };
}
