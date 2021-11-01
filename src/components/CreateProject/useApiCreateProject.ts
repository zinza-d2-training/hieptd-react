import { useCallback, useState } from 'react';
import projectService from 'services/project';
import userService from 'services/user';
import { Response, Project, CreateProject, User } from 'utils/types';

export const useApiCreateProject = () => {
   const [loading, setLoading] = useState(false);

   const getAllUsers = useCallback(async (): Promise<Response<User[]>> => {
      setLoading(true);
      setLoading(true);
      try {
         setLoading(false);
         const res = await userService.getAllUser();
         return res;
      } catch (e) {
         setLoading(false);
         throw e;
      }
   }, []);

   const createProject = useCallback(
      async (project: CreateProject): Promise<Response<Project>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await projectService.createProject(project);
            return res;
         } catch (e) {
            setLoading(false);
            throw e;
         }
      },
      []
   );

   return {
      loading,
      createProject,
      getAllUsers,
   };
};
