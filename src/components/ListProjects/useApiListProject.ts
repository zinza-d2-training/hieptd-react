import { useCallback, useState } from 'react';
import projectService from 'services/project';
import userService from 'services/user';
import { Project, Response } from 'utils/types';
import { FilterType } from './types';

export const useApiListProject = () => {
   const [loading, setLoading] = useState(false);

   const getAllProjects = useCallback(
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

   const getProjectsWithMember = useCallback(
      async (
         id: number,
         page: number,
         limit: number,
         filterData: FilterType
      ): Promise<Response<Project[]>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await userService.getProjects(
               id,
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
      getAllProjects,
      getProjectsWithMember,
   };
};
