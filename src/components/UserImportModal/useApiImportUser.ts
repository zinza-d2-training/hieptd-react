import { useCallback, useState } from 'react';
import userService from 'services/user';
import { UserImport } from './functions';
import { User, Response } from 'utils/types';

export const useApiImportUser = () => {
   const [loading, setLoading] = useState(false);

   const importUser = useCallback(
      async (users: UserImport[]): Promise<Response<User[]>> => {
         setLoading(true);
         try {
            const res = await userService.importUser(users);
            return res;
         } catch (e: any) {
            setLoading(false);
            throw e.response.data.message;
         }
      },
      []
   );

   return {
      loading,
      importUser,
   };
};
