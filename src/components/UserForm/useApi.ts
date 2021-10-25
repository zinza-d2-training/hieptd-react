import { useCallback, useState } from 'react';
import userService from 'services/user';
import { User } from 'utils/types';

export function useApi() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string>();
   const [response, setResponse] = useState<any>();
   const createUser = useCallback((user: Partial<User>) => {
      setLoading(true);
      setResponse(null);
      setError(undefined);
      userService
         .createUser(user)
         .then((res) => {
            setResponse(res['data']);
         })
         .catch((err) => {
            setError(err.response.data.message);
            alert(err.response.data.message);
         })
         .finally(() => {
            setTimeout(() => setLoading(false), 300);
         });
   }, []);
   const editUser = useCallback(async (id: number, user: Partial<User>) => {
      setLoading(true);
      setResponse(null);
      setError(undefined);
      userService
         .editUser(id, user)
         .then((res) => {
            setResponse(res['data']);
         })
         .catch((err) => {
            setError(err.response.data.message);
            alert(err.response.data.message);
         })
         .finally(() => {
            setTimeout(() => setLoading(false), 300);
         });
   }, []);
   const getUser = useCallback(async (id: number) => {
      setLoading(true);
      setResponse(null);
      setError(undefined);
      userService
         .getUser(id)
         .then((res) => {
            setResponse(res['data']);
         })
         .catch((err) => {
            setError(err.response.data.message);
            // alert(err.response.data.message);
         })
         .finally(() => {
            setTimeout(() => setLoading(false), 300);
         });
   }, []);

   return {
      loading,
      error,
      response,
      createUser,
      getUser,
      editUser,
   };
}
