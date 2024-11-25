import axios from "axios";

export const fetchCategories = async () => {
  const response = await axios.get("/categories.json");
  const data = await response.data;
  return data;
};
