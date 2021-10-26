import { useCallback, useState } from 'react';
import userService from 'services/user';
import { User } from '../../utils/types';

type ListUser = User & { createdAt: string; updatedAt: string };

export const useApiExportUser = () => {
   const [loading, setLoading] = useState(false);

   const [response, setResponse] = useState<ListUser[]>();

   const fetchData = useCallback(async () => {
      setLoading(true);
      userService
         .getAllUser()
         .then((res) => setResponse(res['data'] as ListUser[]))
         .catch((err) => alert(err.response.data.message))
         .finally(() => setLoading(false));
   }, []);

   return {
      loading,
      response,
      fetchData,
   };
};
