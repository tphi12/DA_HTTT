import apiClient from "../config/axiosConfig";

export const fetchModels = async () => {
  const response = await apiClient.get("/api/types/");
  return response.data;
};
