import React from 'react';
import { Task } from 'utils/types';
import './styles/Tasks.scss';

interface TasksProps {
   tasks: Task[];
}

function ProjectTask({ tasks }: TasksProps) {
   return <div className="projectdetail__task">Task</div>;
}

export default ProjectTask;
