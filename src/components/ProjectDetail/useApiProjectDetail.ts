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
            console.log(e);
            throw e;
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
         console.log(e);
         throw e;
      }
   }, []);

   return {
      loading,
      getProjectById,
      getAllProjects,
   };
};
