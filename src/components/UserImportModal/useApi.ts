import { useCallback, useState } from 'react';
import userService from 'services/user';
import { UserImport } from './functions';

export const useApi = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string>();
   const importUser = useCallback(async (users: UserImport[]) => {
      setLoading(true);
      userService
         .importUser(users)
         .then((res) => {
            alert('Successfully import');
         })
         .catch((err) => {
            setError(err.response.data.message);
            alert(err.response.data.message);
         })
         .finally(() => {
            setTimeout(() => {
               setLoading(false);
            }, 300);
         });
   }, []);

   return {
      loading,
      error,
      importUser,
   };
};
