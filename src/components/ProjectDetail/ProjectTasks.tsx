import React from 'react';
import './styles/Tasks.scss';

interface TasksProps {
   projectId: number;
}

function ProjectTasks({ projectId }: TasksProps) {
   return <div className="projectdetail__task">ProjectTask</div>;
}

export default ProjectTasks;
