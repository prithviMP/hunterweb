import { BASE_URL } from "../../apiClient";

// Upload Endpoints
export const UPLOAD_FILE = `${BASE_URL}/upload`; // POST
export const GET_UPLOADED_FILES = `${BASE_URL}/upload/files`; // GET
export const GET_FILE_BY_ID = (id) => `${BASE_URL}/upload/files/${id}`; // GET
export const DELETE_FILE_BY_ID = (id) => `${BASE_URL}/upload/files/${id}`; // DELETE