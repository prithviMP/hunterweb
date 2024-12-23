import apiClient from "../../apiClient";
import {
  UPLOAD_FILE,
  GET_UPLOADED_FILES,
  GET_FILE_BY_ID,
  DELETE_FILE_BY_ID,
} from "./endPoints";

// Upload a single file
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("files", file); // Append the file to the FormData object

    const response = await apiClient.post(UPLOAD_FILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure proper content type
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Get all uploaded files
export const getUploadedFiles = async () => {
  try {
    const response = await apiClient.get(GET_UPLOADED_FILES);
    return response.data;
  } catch (error) {
    console.error("Error fetching uploaded files:", error);
    throw error;
  }
};

// Get a single file by ID
export const getFileById = async (id) => {
  try {
    const response = await apiClient.get(GET_FILE_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching file with ID ${id}:`, error);
    throw error;
  }
};

// Delete a file by ID
export const deleteFileById = async (id) => {
  try {
    const response = await apiClient.delete(DELETE_FILE_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Error deleting file with ID ${id}:`, error);
    throw error;
  }
};
