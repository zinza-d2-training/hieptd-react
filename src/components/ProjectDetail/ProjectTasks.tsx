import { TASKS } from 'fakeData/tasks';
import React, { useMemo, useState } from 'react';
import { Priority, Project, TaskStatus } from 'utils/types';
import './index.scss';
import TaskFilter from './TaskFilter';
import { useGetTaskListByFilter } from './TaskFilter/useGetTaskListFilter';
import TaskListBoard from './TaskListBoard';
interface TasksProps {
   currentProject: Project;
}
export type TasksFilter = {
   search: string;
   assignTo: boolean;
   createBy: boolean;
   statuses: TaskStatus[];
   priority: Priority | null;
};

function ProjectTasks({ currentProject }: TasksProps) {
   const allTasks = useMemo(
      () => TASKS.filter((task) => task.projectId === 1),
      []
   );

   const [filter, setFilter] = useState<TasksFilter>({
      search: '',
      assignTo: true,
      createBy: false,
      statuses: [],
      priority: null,
   });
   const { tasksFilter } = useGetTaskListByFilter(filter, allTasks);

   return (
      <div className="projectdetail__task">
         <TaskFilter
            currentProject={currentProject}
            filter={filter}
            handleFilter={setFilter}
         />
         <TaskListBoard tasks={tasksFilter} />
      </div>
   );
}

export default ProjectTasks;
