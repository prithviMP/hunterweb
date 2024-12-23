import apiClient from "../../apiClient";
import {
  GET_COMPANY_MANAGEMENT_BY_ID,
  GET_COMPANY_MANAGEMENTS,
  POST_COMPANY_MANAGEMENT,
} from "./endPoints";

// Fetch all company managements
export const fetchCompanyManagements = async () => {
  try {
    const response = await apiClient.get(GET_COMPANY_MANAGEMENTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching company managements:", error);
  }
};

// Fetch a single company management by ID
export const fetchCompanyManagementById = async (id) => {
  try {
    const response = await apiClient.get(GET_COMPANY_MANAGEMENT_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching company management by ID:", error);
  }
};

// Create a new company management entry
export const createCompanyManagement = async (data) => {
  try {
    const response = await apiClient.post(POST_COMPANY_MANAGEMENT, data);
    return response.data;
  } catch (error) {
    console.error("Error creating company management:", error);
  }
};
