import { useCallback, useState } from 'react';
import projectService from 'services/project';
import { Project, Response } from 'utils/types';
import { FilterType } from './types';

export const useApiListProject = () => {
   const [loading, setLoading] = useState(false);

   const getProjects = useCallback(
      async (
         page: number,
         limit: number,
         filterData: FilterType
      ): Promise<Response<Project[]>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await projectService.getProjects(
               page,
               limit,
               filterData
            );
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
      getProjects,
   };
};
