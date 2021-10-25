import { User } from './../../utils/types';
import { useEffect, useState } from 'react';
import userService from 'services/user';

type ListUser = User & { createdAt: string; updatedAt: string };

export const useApi = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string>();
   const [response, setResponse] = useState<ListUser[]>();
   useEffect(() => {
      async function fetchData() {
         setLoading(true);
         try {
            const res = await userService.getAllUser();
            setResponse((res as any).data);
         } catch (e) {
            setError(e as string);
         } finally {
            setTimeout(() => setLoading(false), 400);
         }
      }
      if (error) {
         alert(error);
      }
      fetchData();
      // eslint-disable-next-line
   }, []);

   return {
      loading,
      error,
      response,
   };
};
