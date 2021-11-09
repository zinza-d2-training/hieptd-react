import { useEffect, useMemo, useState } from 'react';
import { PaginationType, Project, ProjectStatus } from 'utils/types';
import { useApiListProject } from './useApiListProject';
export type ProjectFilter = {
   keyword?: string;
   endDate?: string;
   status?: ProjectStatus;
};
interface UseGetListProject {
   filter: ProjectFilter;
}

export const useGetListProject = ({ filter }: UseGetListProject) => {
   const { loading, getAllProjects } = useApiListProject();

   const [projects, setProjects] = useState<Project[]>([]);
   const [pagination, setPagination] = useState<PaginationType>({
      page: 1,
      limit: 10,
   });

   // remove undefined in filter
   let _filter = useMemo(() => {
      Object.keys(filter).forEach(
         (key) => filter[key] === undefined && delete filter[key]
      );
      return filter;
   }, [filter]);
   const handlePagination = (newPage: number) =>
      setPagination({ ...pagination, page: newPage });

   const fetchData = async () => {
      try {
         const { data, pagination: paginationRes } = await getAllProjects(
            pagination.page,
            pagination.limit,
            _filter
         );
         setProjects(data || []);
         setPagination(paginationRes || { page: 1, limit: 10 });
      } catch (e) {
         console.log(e);
         setProjects([]);
      }
   };
   // get users
   useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pagination.page, pagination.limit, _filter]);

   const refetch = async (page?: number) => {
      if (page) {
         handlePagination(page);
      }
      await fetchData();
   };

   return { loading, projects, pagination, handlePagination, refetch };
};
