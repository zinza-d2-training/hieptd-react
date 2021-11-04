import React, { useEffect, useState } from 'react';
import { Project, TaskPriority, TaskStatus } from 'utils/types';
import './index.scss';
import TaskFilter from './TaskFilter';
import TaskListBoard from './TaskListBoard';
import { useGetTasksInProject } from './useGetData/useGetTaskInProject';

interface TasksProps {
   currentProject: Project;
}
export type TasksFilter = {
   keyword?: string;
   assignToId?: number;
   requestById?: number;
   statuses: TaskStatus[] | [];
   priority?: TaskPriority;
};

function ProjectTasks({ currentProject }: TasksProps) {
   const [filter, setFilter] = useState<TasksFilter>({ statuses: [] });

   const { tasks, getTasksInProject } = useGetTasksInProject({
      projectId: currentProject?.id,
      filter,
   });

   // check props change and get data
   useEffect(() => {
      if (currentProject?.id) {
         getTasksInProject();
      }
      // eslint-disable-next-line
   }, [currentProject?.id, filter]);

   return (
      <>
         {tasks && tasks.length > 0 ? (
            <div className="projectdetail__task">
               <TaskFilter
                  currentProject={currentProject}
                  filter={filter}
                  handleFilter={setFilter}
               />
               <TaskListBoard tasks={tasks!} />
            </div>
         ) : (
            <div>There are no task in the projects</div>
         )}
      </>
   );
}

export default ProjectTasks;
