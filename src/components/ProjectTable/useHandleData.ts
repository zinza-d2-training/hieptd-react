import { useApiProjectTable } from './useApiProjectTable';
import { useState } from 'react';
import { Project } from 'utils/types';

export const useHandleData = (data: Project[]) => {
   const [projects, setProjects] = useState<Project[]>([]);
   const { loading, getUserInProject } = useApiProjectTable();

   return projects;
};
