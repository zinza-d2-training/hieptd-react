import { PROJECTS } from 'fakeData/projects';
import { useMemo } from 'react';
import { nonAccentVietnameses } from 'utils/convert';
import { Project, ProjectStatus } from 'utils/types';

export type ProjectFilter = {
   search: string;
   endDate: string;
   status: any;
};
interface UseGetListProject {
   filter: ProjectFilter | undefined;
   userId: number | undefined;
}

export const useGetListProject = ({
   filter,
   userId,
}: UseGetListProject): Project[] | undefined => {
   //--------handle filter----------
   const handleFilterMultiple = (filter: ProjectFilter, list: Project[]) => {
      const filterKeys = Object.keys(filter);
      let result: Project[] = list.filter((project) => {
         return filterKeys.every((eachKey) => {
            if (!filter[eachKey].length) {
               return true;
            }
            switch (eachKey) {
               case 'search':
                  return true;
               case 'endDate':
                  return (
                     project[eachKey]?.toString().toLowerCase() ===
                     filter[eachKey]?.toString().toLowerCase()
                  );
               case 'status':
                  return (
                     project[eachKey].toString() ===
                     ProjectStatus[filter[eachKey]].toString()
                  );
               default:
                  return true;
            }
         });
      });

      return result;
   };
   return useMemo(() => {
      if (userId) {
         let listProjects: Project[] = PROJECTS.filter(
            (project) =>
               project.members?.some((member) => member.id === userId) ||
               project.pm?.id === userId
         );
         if (filter) {
            listProjects = listProjects.filter((project) => {
               return (
                  nonAccentVietnameses(project.name)
                     .toLowerCase()
                     .includes(
                        nonAccentVietnameses(filter.search).toLowerCase()
                     ) ||
                  nonAccentVietnameses(project?.description!)
                     .toLowerCase()
                     .includes(
                        nonAccentVietnameses(filter.search).toLowerCase()
                     )
               );
            });
            return handleFilterMultiple(filter, listProjects);
         }
      }
      return undefined;
   }, [userId, filter]);
};
