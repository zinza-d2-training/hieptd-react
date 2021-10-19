import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

const axiosClient = axios.create({
   baseURL: 'http://localhost:3000/',
   headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(
         localStorage.getItem('accessToken')!
      )}`,
   },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
   function (config: AxiosRequestConfig) {
      if (config.method === 'POST' || config.method === 'PUT') {
         config.data = qs.stringify(config.data);
         config.params = qs.stringify(config.params);
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
   function (response: AxiosResponse) {
      if (response && response.data) {
         return response.data;
      }
   },
   function (error) {
      return Promise.reject(error);
   }
);

export default axiosClient;
