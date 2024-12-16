import { IStore } from "./store";

export interface IUser {
  _id: string;
  username: string;
  email?: string;
  role: "admin" | "seller";
  stores: Store[];
  createdAt: string;
  storeCount?: number;
}

type Store = {
  _id: string;
  alias: string;
};
