import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://serverswd.ddnsking.com/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  console.log("Request config:", config);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;
