import { IStore } from "./store";

export interface IUser {
  _id: string;
  username: string;
  email?: string;
  stores: IStore[];
}
