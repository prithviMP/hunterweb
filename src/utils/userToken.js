const TOKEN_KEY = "userToken";

const StorageService = {
  // Save token to localStorage
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if token exists
  hasToken: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Save token to sessionStorage
  setSessionToken: (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  // Get token from sessionStorage
  getSessionToken: () => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  // Remove token from sessionStorage
  removeSessionToken: () => {
    sessionStorage.removeItem(TOKEN_KEY);
  },
};

export default StorageService;
