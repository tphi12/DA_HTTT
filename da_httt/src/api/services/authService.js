import apiClient from "../config/axiosConfig";

export const login = async (credentials) => {
  const response = await apiClient.post("/api/auth/login", credentials);
  return response.data;
};
