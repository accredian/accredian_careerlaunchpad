import axios from "axios";

const HOST = import.meta.env.VITE_SERVER_URL;

// || "http://localhost:5001"

// "https://accredian-backend-v1-image-7dra35jwyq-uc.a.run.app";

// Create a new Axios instance
const api = axios.create({
  baseURL: HOST,
  // withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // If the response was successful, there's no need to do anything
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the server returned a 401 status (unauthorized). if the message is not token error and this is not a retry request,
    // then refresh the token and retry the request
    if (
      error.response.data.message !== "Token Error" &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      // Retry the original request
      return api(originalRequest);
    }

    // If the error was not 401 or this was a retry request, reject the promise
    return Promise.reject(error);
  }
);

export default api;
