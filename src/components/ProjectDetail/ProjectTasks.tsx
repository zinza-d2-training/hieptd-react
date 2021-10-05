import { TASKS } from 'fakeData/tasks';
import React, { useMemo } from 'react';
import './styles/Tasks.scss';
import TaskListBoard from './TaskListBoard';
interface TasksProps {
   projectId: number;
}

function ProjectTasks({ projectId }: TasksProps) {
   let tasks = useMemo(
      () => TASKS.filter((task) => task.projectId === projectId),
      [projectId]
   );

   return (
      <div className="projectdetail__task">
         <TaskListBoard tasks={tasks} />
      </div>
   );
}

export default ProjectTasks;
