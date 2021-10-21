import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import _ from 'lodash';
import qs from 'qs';
import { STORAGE_KEYS } from 'utils/constants';

const axiosClient = axios.create({
   baseURL: process.env.REACT_APP_BASEURL,
});
// Add a request interceptor
axiosClient.interceptors.request.use(
   function (config: AxiosRequestConfig) {
      const token = localStorage.getItem(STORAGE_KEYS.accessToken);
      if (token) {
         config.headers = {
            Authorization: `Bearer ` + JSON.parse(token),
         };
      }

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
}
export const useApi = ({ url, method, body }: UseApiProps) => {
   const [response, setResponse] = useState({});
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>();
   const [initBody, setInitBody] = useState(body);

   const callApi = useCallback(
      async (newBody = {}) => {
         if (!_.isEqual(newBody, initBody)) {
            setInitBody(newBody);
            setLoading(true);
         }
      },
      [initBody]
   );

   useEffect(() => {
      const fetchData = () => {
         axiosClient[method](url, initBody)
            .then((res) => {
               setResponse(res);
            })
            .catch((err) => {
               setError(err);
            })
            .finally(() => {
               setTimeout(() => setLoading(false), 2000);
            });
      };
      if (!loading) {
         return;
      } else fetchData();
      // eslint-disable-next-line
   }, [loading, initBody, url, method]);

   return { response, error, loading, callApi };
};
