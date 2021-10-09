import React, { useMemo } from 'react';
import TaskTable from 'components/TaskTable';
import { Report, Task, TaskStatus } from 'utils/types';
import ReportTable from 'components/ReportTable';
import { getUser } from 'utils/auth';
import './index.scss';
import { REPORTS } from 'fakeData/reports';
import { TASKS } from 'fakeData/tasks';

interface DashboardProps {
   projectId: number;
}

function ProjectDashboard({ projectId }: DashboardProps) {
   const currentUser = getUser();
   let tasks = useMemo<Task[]>(
      () => TASKS.filter((task) => task.projectId === projectId),
      [projectId]
   );

   // number of tasks were completed
   let numberOfTasksCompleted = useMemo(
      () => tasks.filter((task) => task.status === TaskStatus.Completed).length,
      [tasks]
   );
   //list  reports
   let reports = useMemo<Report[]>(
      () =>
         REPORTS.filter((report) => report.projectId === projectId).slice(
            0,
            10
         ), // max 10 records in dashboard
      [projectId]
   );

   return (
      <div className="projectdetail__dashboard">
         <div className="projectdetail__dashboard-info">
            <h2>Tasks Progress</h2>
            <div className="projectdetail__dashboard-progress">
               <span>
                  {Math.floor((numberOfTasksCompleted / tasks.length) * 100)}%
               </span>
               <progress
                  value={Math.floor(
                     (numberOfTasksCompleted / tasks.length) * 100
                  )}
                  max={100}
               />
               <p>
                  {`${numberOfTasksCompleted}/${tasks.length}`} Tasks Completed
               </p>
            </div>
         </div>
         <TaskTable tasks={tasks} />
         {currentUser && currentUser.id && <ReportTable reports={reports} />}
      </div>
   );
}

export default ProjectDashboard;
