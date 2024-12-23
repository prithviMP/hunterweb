import { BASE_URL } from "../../apiClient";


// Company Management Endpoints
export const GET_COMPANY_MANAGEMENTS = `${BASE_URL}/company-managements`;
export const POST_COMPANY_MANAGEMENT = `${BASE_URL}/company-managements`;
export const GET_COMPANY_MANAGEMENT_BY_ID = (id) => `${BASE_URL}/company-managements/${id}`;
export const PUT_COMPANY_MANAGEMENT_BY_ID = (id) => `${BASE_URL}/company-managements/${id}`;
export const DELETE_COMPANY_MANAGEMENT_BY_ID = (id) => `${BASE_URL}/company-managements/${id}`;
