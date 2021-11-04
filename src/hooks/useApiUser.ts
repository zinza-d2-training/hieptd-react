import { useCallback, useState } from 'react';
import userService from 'services/user';
import { Response, User } from 'utils/types';
import { FilterType } from '../components/Users/types';

export const useApiUser = () => {
   const [loading, setLoading] = useState(false);
   const getAllUsers = useCallback(async (): Promise<Response<User[]>> => {
      setLoading(true);
      setLoading(true);
      try {
         setLoading(false);
         const res = await userService.getAllUsers();
         return res;
      } catch (e: any) {
         setLoading(false);
         throw e.response.data.message;
      }
   }, []);

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
         } catch (e: any) {
            setLoading(false);
            throw e.response.data.message;
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
         } catch (e: any) {
            setLoading(false);
            throw e.response.data.message;
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
      } catch (e: any) {
         setLoading(false);
         throw e.response.data.message;
      }
   }, []);
   const deleteUsers = useCallback(async (ids: number[]) => {
      setLoading(true);
      try {
         setLoading(false);
         const res = await userService.deleteUsers(ids);
         return res;
      } catch (e: any) {
         setLoading(false);
         throw e.response.data.message;
      }
   }, []);

   return {
      loading,
      editUser,
      deleteUser,
      getUsers,
      deleteUsers,
      getAllUsers,
   };
};
