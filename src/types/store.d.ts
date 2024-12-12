export interface IStore {
  _id: string;
  alias: string;
  lastUpdate?: string;
  updating?: boolean;
  allowUpdate: boolean;
  reputation?: string;
  canceled?: number;
  delayed?: number;
  completed?: number;
  claims?: number;
  total?: number;
}
