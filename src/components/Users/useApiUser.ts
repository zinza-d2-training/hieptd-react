import { useCallback, useState } from 'react';
import userService from 'services/user';
import { User } from 'utils/types';
import { FilterType } from './types';

export const useApiUser = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string>();
   const [response, setResponse] = useState<any>();

   const getUsers = useCallback(
      async (page: number, limit: number, filterData: FilterType) => {
         setLoading(false);
         setResponse(null);
         setError(undefined);
         userService
            .getUsers(page, limit, filterData)
            .then((res) => {
               setResponse(res);
            })
            .catch((err) => {
               setError(err.response.data.message);
               alert(err.response.data.message);
            });
      },
      []
   );

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
            setLoading(false);
            window.location.reload();
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
            setLoading(false);
            window.location.reload();
         });
   }, []);

   return {
      response,
      error,
      loading,
      editUser,
      deleteUser,
      getUsers,
   };
};
