// useAxios hook

import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

const axiosClient = axios.create({
   baseURL: 'http://localhost:5000/',
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

interface UseApiProps {
   url: string;
   method: string;
   body?: any;
   callable: boolean;
}

const useApi = ({ url, method, body, callable }: UseApiProps) => {
   const [response, setResponse] = useState(null);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(true);

   const fetchData = () => {
      axiosClient[method](url, body)
         .then((res) => {
            setResponse(res);
         })
         .catch((err) => {
            setError(err);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   useEffect(() => {
      if (callable) {
         fetchData();
      }
      // eslint-disable-next-line
   }, [callable]);

   return { response, error, loading };
};

export default useApi;
