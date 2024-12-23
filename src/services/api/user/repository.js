import apiClient from "../../apiClient";
import { LOGIN_USER } from "./endPoint";

// Get all uploaded files
export const loginUser = async (data) => {
  try {
    const response = await apiClient.post(LOGIN_USER, data);
    return response.data;
  } catch (error) {
    console.error("Error while login:", error);
    throw error;
  }
};
