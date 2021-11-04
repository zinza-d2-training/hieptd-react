import { TasksFilter } from 'components/ProjectDetail/ProjectTasks';
import { useMemo, useState } from 'react';
import { Task } from 'utils/types';
import { useApiTask } from '../useApi/useApiTasksInProject';

interface UseGetTaskProps {
   projectId: number;
   filter: TasksFilter;
}

export const useGetTasksInProject = ({
   projectId,
   filter,
}: UseGetTaskProps) => {
   const [tasks, setTasks] = useState<Task[]>();
   const { loading, getTasks } = useApiTask();

   let _projectId = useMemo(() => Number(projectId), [projectId]);

   // remove undefined in filter
   let _filter = useMemo(() => {
      Object.keys(filter).forEach(
         (key) => filter[key] === undefined && delete filter[key]
      );
      return filter;
   }, [filter]);

   const getTasksInProject = async () => {
      try {
         const { data } = await getTasks(_projectId, _filter);
         setTasks(data);
      } catch (e) {
         setTasks([]);
      }
   };
   return { loading, tasks, getTasksInProject };
};
