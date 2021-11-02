import { useCallback, useState } from 'react';
import projectService from 'services/project';
import { CreateProject, Project, Response } from 'utils/types';

export const useApiCreateProject = () => {
   const [loading, setLoading] = useState(false);

   const createProject = useCallback(
      async (project: CreateProject): Promise<Response<Project>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await projectService.createProject(project);
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
      createProject,
   };
};
