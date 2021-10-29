import { useCallback, useState } from 'react';
import userService, { UserInProject } from 'services/user';
import { User, Response } from 'utils/types';

export const useApiProjectTable = () => {
   const [loading, setLoading] = useState(false);

   const getUserInProject = useCallback(
      async (listUserInProject: UserInProject[]): Promise<Response<User[]>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await userService.getUserInProject(listUserInProject);
            return res;
         } catch (e) {
            setLoading(false);
            throw e;
         }
      },
      []
   );
   return { loading, getUserInProject };
};
