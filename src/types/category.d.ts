export interface ICategory {
  id: string;
  name: string;
  children_categories: IChildrenCategory[];
  root: boolean;
}

export interface IChildrenCategory {
  id: string;
  name: string;
}
