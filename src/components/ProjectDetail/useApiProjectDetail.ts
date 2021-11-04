import { useCallback, useState } from 'react';
import projectService from 'services/project';
import { Project, Response } from 'utils/types';

export const useApiProjectDetail = () => {
   const [loading, setLoading] = useState<boolean>(false);

   const getProjectById = useCallback(
      async (id: number): Promise<Response<Project>> => {
         setLoading(true);
         try {
            setLoading(false);
            const data = await projectService.getProjectById(id);
            return data;
         } catch (e: any) {
            setLoading(false);

            throw e.response.data.message;
         }
      },
      []
   );
   const getAllProjects = useCallback(async (): Promise<
      Response<Project[]>
   > => {
      setLoading(true);
      try {
         setLoading(false);
         const res = await projectService.getProjects();

         return res;
      } catch (e: any) {
         setLoading(false);

         throw e.response.data.message;
      }
   }, []);

   return {
      loading,
      getProjectById,
      getAllProjects,
   };
};
