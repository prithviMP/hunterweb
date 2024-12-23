import axios from "axios";
import StorageService from "../utils/userToken";

export const BASE_URL = 'http://localhost:1337/api';
export const MEDIA_BASE_URL = 'http://localhost:1337';

// export const BASE_URL = 'http://192.168.0.233:1337/api';
// export const MEDIA_BASE_URL = 'http://192.168.0.233:1337';


const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await StorageService.getToken(); // Ensure the function call is correct
      // console.log('Fetched token:', token); // Debugging log

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        //console.log("Token set in headers"); // Debugging log
      } else {
        //console.warn("No token available"); // Warn if no token is found
      }
    } catch (error) {
      console.error("Error fetching token:", error); // Log any error in fetching the token
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
