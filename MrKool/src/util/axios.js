import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://serverswd.ddnsking.com/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true, // Ensure credentials are sent with cross-origin requests
});

axiosClient.interceptors.request.use(async (config) => {
  console.log("Request config:", config);
  // You can inspect or manipulate the config object here if needed
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response;
  },
  (error) => {
    if (error.response) {
      // Handle specific CORS error
      if (error.response.status === 403 && error.response.data.error === 'CORS') {
        console.error('CORS error:', error.response.data.message);
        // Handle the error gracefully or redirect to a login page
      } else {
        // Handle other types of errors (e.g., 404, 500, etc.)
        console.error('Other error:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      // Handle network errors (e.g., no response received)
      console.error('Network error:', error.request);
    } else {
      // Handle other errors
      console.error('Error:', error.message);
    }
    // Throw the error to propagate it further
    throw error;
  }
);

export default axiosClient;
