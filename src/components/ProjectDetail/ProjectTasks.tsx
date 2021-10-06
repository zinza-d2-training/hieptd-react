import { TASKS } from 'fakeData/tasks';
import React, { useMemo, useState } from 'react';
import './styles/Tasks.scss';
import TaskFilter from './TaskFilter';
import { useGetTaskListByFilter } from './TaskFilter/useGetTaskListFilter';
import TaskListBoard from './TaskListBoard';
interface TasksProps {
   projectId: number;
}
export type TaskFilterType = {
   search: string;
   assignTo: boolean;
   createBy: boolean;
   status: any;
   priority: any;
};

function ProjectTasks({ projectId }: TasksProps) {
   let tasks = useMemo(
      () => TASKS.filter((task) => task.projectId === projectId),
      [projectId]
   );

   const [filter, setFilter] = useState<TaskFilterType>({
      search: '',
      assignTo: true,
      createBy: false,
      status: '',
      priority: '',
   });
   const { tasksFilter } = useGetTaskListByFilter(filter, tasks);

   return (
      <div className="projectdetail__task">
         <TaskFilter filter={filter} handleFilter={setFilter} />
         <TaskListBoard tasks={tasksFilter} />
      </div>
   );
}

export default ProjectTasks;
