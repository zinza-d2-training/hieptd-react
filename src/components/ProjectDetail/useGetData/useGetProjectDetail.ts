import { useState } from 'react';
import { toast } from 'react-toastify';
import { Project } from 'utils/types';
import { useApiProjectDetail } from '../useApi/useApiProjectDetail';

export const useGetProjectDetail = (ProjectId: number) => {
   const [currentProject, setCurrentProject] = useState<Project>();
   const [projects, setProjects] = useState<Project[]>([]);

   const { loading, getProjectById, getAllProjects } = useApiProjectDetail();

   const getProject = async () => {
      try {
         const { data } = await getProjectById(ProjectId);
         setCurrentProject(data);
      } catch (error) {
         toast.error(error as string);
      }
   };
   const getProjects = async () => {
      try {
         const { data } = await getAllProjects();
         setProjects(data);
      } catch (error) {
         toast.error(error as string);
      }
   };

   return {
      loading,
      getProject,
      getProjects,
      currentProject,
      projects,
   };
};
