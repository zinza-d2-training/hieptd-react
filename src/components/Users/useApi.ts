import { useCallback, useState } from 'react';
import userService from 'services/user';
import { User } from 'utils/types';

export const useApi = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string>();
   const [response, setResponse] = useState<any>();

   const editUser = useCallback(async (id: number, editData: Partial<User>) => {
      setLoading(true);
      setResponse(null);
      setError(undefined);
      userService
         .editUser(id, editData)
         .then((res) => {
            setResponse(res['data']);
         })
         .catch((err) => {
            setError(err.response.data.message);
            alert(err.response.data.message);
         })
         .finally(() => {
            setTimeout(() => {
               setLoading(false);
               window.location.reload();
            }, 300);
         });
   }, []);
   const deleteUser = useCallback(async (id: number) => {
      setLoading(true);
      setResponse(null);
      setError(undefined);
      userService
         .deleteUSer(id)
         .then((res) => {
            setResponse(res['data']);
         })
         .catch((err) => {
            setError(err.response.data.message);
            alert(err.response.data.message);
         })
         .finally(() => {
            setTimeout(() => {
               setLoading(false);
               window.location.reload();
            }, 300);
         });
   }, []);

   return {
      response,
      error,
      loading,
      editUser,
      deleteUser,
   };
};
