export interface IStore {
  _id: string;
  alias: string;
  user?: string;
  lastUpdate?: string;
  updating?: boolean;
  allowUpdate: boolean;
}
