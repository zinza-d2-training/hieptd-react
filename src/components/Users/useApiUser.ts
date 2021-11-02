import { useCallback, useState } from 'react';
import userService from 'services/user';
import { User, Response } from 'utils/types';
import { FilterType } from './types';

export const useApiUser = () => {
   const [loading, setLoading] = useState(false);

   const getUsers = useCallback(
      async (
         page: number,
         limit: number,
         filterData: FilterType
      ): Promise<Response<User[]>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await userService.getUsers(page, limit, filterData);
            return res;
         } catch (e) {
            setLoading(false);
            throw e;
         }
      },
      []
   );

   const editUser = useCallback(
      async (id: number, editData: Partial<User>): Promise<Response<User>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await userService.editUser(id, editData);
            return res;
         } catch (e) {
            setLoading(false);
            throw e;
         }
      },
      []
   );
   const deleteUser = useCallback(async (id: number) => {
      setLoading(true);
      try {
         setLoading(false);
         const res = await userService.deleteUSer(id);
         return res;
      } catch (e) {
         setLoading(false);
         throw e;
      }
   }, []);
   const deleteUsers = useCallback(async (ids: number[]) => {
      setLoading(true);
      try {
         setLoading(false);
         const res = await userService.deleteUsers(ids);
         return res;
      } catch (e) {
         setLoading(false);
         throw e;
      }
   }, []);

   return {
      loading,
      editUser,
      deleteUser,
      getUsers,
      deleteUsers,
   };
};
