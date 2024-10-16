import queryString from 'query-string';
import axios from "axios";
import {access_Token, API_URL} from "../constants";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});


axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(access_Token);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    if (response.data.status === '400') {
      throw response.data;
    }
    return response.data;
  }
  return response;
}, (error) => {
  if (error.data) {
    return error.data;
  }
  throw error;
});
export default axiosClient;
