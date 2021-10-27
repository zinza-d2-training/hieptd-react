import { useCallback, useState } from 'react';
import userService from 'services/user';
import { UserExport, Response } from 'utils/types';

export const useApiExportUser = () => {
   const [loading, setLoading] = useState(false);

   const getUsers = useCallback(async (): Promise<Response<UserExport[]>> => {
      setLoading(true);
      try {
         setLoading(false);
         const res = await userService.getAllUserToExport();
         return res;
      } catch (e: any) {
         setLoading(false);
         throw e.response.data.message;
      }
   }, []);

   return {
      loading,

      getUsers,
   };
};
