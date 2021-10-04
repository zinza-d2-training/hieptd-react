import React from 'react';
import './index.scss';
import TaskTable from 'components/TaskTable';
import { Task, TaskStatus } from 'utils/types';
import ReportTable from 'components/ReportTable';
import { getUser } from 'utils/auth';
import './styles/Dashboard.scss';

interface DashboardProps {
   tasks: Task[];
   projectId: number;
}

function ProjectDashboard({ tasks, projectId }: DashboardProps) {
   const currentUser = getUser();

   const progressCalculation = (): Number => {
      if (tasks.length !== 0) {
         let count = 0;
         tasks.forEach(
            (task) => task.status === TaskStatus.Completed && count++
         );
         if (count === 0) {
            return 0;
         } else return Math.floor((count / tasks.length) * 100);
      }
      return 0;
   };

   return (
      <div className="projectdetail__dashboard">
         <div className="projectdetail__dashboard-info">
            <h2>Tasks</h2>
            <div className="projectdetail__dashboard-progress">
               <span>{progressCalculation()}%</span>
               <p>
                  {`${Math.ceil(
                     (tasks.length * Number(progressCalculation())) / 100
                  )}/${tasks.length}`}{' '}
                  Tasks Completed
               </p>
            </div>
         </div>
         <TaskTable tasks={tasks} />
         {currentUser && currentUser.id && (
            <ReportTable recordLimit={true} projectId={projectId} />
         )}
      </div>
   );
}

export default ProjectDashboard;
