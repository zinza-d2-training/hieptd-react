import { useCallback, useState } from 'react';
import userService from 'services/user';
import { User } from 'utils/types';

export function useApiUserForm() {
   const [loading, setLoading] = useState(false);

   const createUser = useCallback(async (user: Partial<User>) => {
      setLoading(true);

      try {
         setLoading(false);

         return await userService.createUser(user);
      } catch (e: any) {
         setLoading(false);
         throw e.response.data.message;
      }
   }, []);
   const editUser = useCallback(async (id: number, user: Partial<User>) => {
      setLoading(true);

      try {
         setLoading(false);
         return await userService.editUser(id, user);
      } catch (e: any) {
         setLoading(false);
         throw e.response.data.message;
      }
   }, []);
   const getUser = useCallback(async (id: number) => {
      setLoading(true);

      try {
         setLoading(false);
         return await userService.getUser(id);
      } catch (e: any) {
         setLoading(false);
         throw e.response.data.message;
      }
   }, []);

   return {
      loading,
      createUser,
      getUser,
      editUser,
   };
}
