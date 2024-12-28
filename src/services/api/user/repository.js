import apiClient from "../../apiClient";
import { FETCH_USERS, LOGIN_USER } from "./endPoint";

// Get all uploaded files
export const loginUser = async (data) => {
  try {
    const response = await apiClient.post(LOGIN_USER, data);
    return response;
  } catch (error) {
    console.error("Error while login:", error);
    return error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get(FETCH_USERS);
    return response;
  } catch (error) {
    console.error("Error while fetching users:", error);
    return error;
  }
};

