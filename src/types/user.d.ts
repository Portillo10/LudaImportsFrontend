import { IStore } from "./store";

export interface IUser {
  _id: string;
  username: string;
  email?: string;
  role: "admin" | "seller";
  stores: IStore[];
  createdAt: string;
}
