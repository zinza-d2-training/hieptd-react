import { useState } from 'react';
import { toast } from 'react-toastify';
import { Project } from 'utils/types';
import { useApiProjectDetail } from './useApiProjectDetail';

export const useGetProjectDetail = () => {
   const [currentProject, setCurrentProject] = useState<Project | null>(null);
   const [projects, setProjects] = useState<Project[]>([]);

   const { loading, getProjectById, getAllProjects } = useApiProjectDetail();

   const getProject = async (id: number) => {
      try {
         const { data } = await getProjectById(id);
         setCurrentProject(data);
         toast.success('Project loaded');
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
