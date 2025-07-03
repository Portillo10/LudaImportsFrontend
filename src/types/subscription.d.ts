export interface ISubscription {
  seller_id: string;
  store_id: string;
  plan_id: string;
  startDate: Date;
  endDate: Date;
  graceUntil: Date;
  status: "active" | "grace" | "expired" | "cancelled" | "renewed";
}
