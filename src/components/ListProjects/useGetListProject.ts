import { useEffect, useMemo, useState } from 'react';
import { getUser } from 'utils/auth';
import { PaginationType, Project, ProjectStatus } from 'utils/types';
import { useApiListProject } from './useApiListProject';

export type ProjectFilter = {
   keyword?: string;
   endDate?: string;
   status?: ProjectStatus;
};
interface UseGetListProject {
   filter: ProjectFilter;
   userId: number | undefined;
}

export const useGetListProject = ({ filter, userId }: UseGetListProject) => {
   const { loading, getProjects } = useApiListProject();
   const [projects, setProjects] = useState<Project[]>([]);
   const [pagination, setPagination] = useState<PaginationType>({
      page: 1,
      limit: 10,
   });
   const currentUser = getUser();
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
         const { data, pagination: paginationRes } = await getProjects(
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

   return { loading, projects };
};
