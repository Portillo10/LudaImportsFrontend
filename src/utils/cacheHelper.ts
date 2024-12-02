const storesLengthKey = "storesLength";

export const getStoresLength = () => {
  return localStorage.getItem(storesLengthKey);
};

export const setStoresLength = (storesLength: number) => {
  localStorage.setItem(storesLengthKey, storesLength.toString());
};
