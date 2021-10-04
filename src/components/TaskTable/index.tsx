import React, { useMemo, useState } from 'react';
import { Task, TaskStatus } from 'utils/types';
import '../ProjectTable/ProjectTable.scss';
import './index.scss';

interface TaskTableProp {
   tasks: Task[];
}

function TaskTable({ tasks }: TaskTableProp) {
   const [isCompleted, setIsCompleted] = useState<boolean>(false);

   let listTasks = useMemo<Task[]>(
      () =>
         isCompleted
            ? tasks.filter((task) => task.status === TaskStatus.Completed)
            : tasks,
      [isCompleted, tasks]
   );
   return (
      <>
         <div className="profiletable">
            <div className="tasktable__header">
               <h1>Task</h1>
               <div>
                  <input
                     type="checkbox"
                     checked={isCompleted}
                     onChange={(e) => setIsCompleted(e.target.checked)}
                  />{' '}
                  Show completed
               </div>
            </div>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Description</th>
                     <th>EndDate</th>
                     <th>Status</th>
                  </tr>
               </thead>
               {listTasks.length !== 0 && (
                  <tbody>
                     {listTasks &&
                        listTasks.map((task, index) => (
                           <tr key={index}>
                              <td>{task.title}</td>
                              <td>{task.notes}</td>
                              <td>{task.dueDate}</td>
                              <td>{TaskStatus[task.status]}</td>
                           </tr>
                        ))}
                  </tbody>
               )}
            </table>
            {listTasks.length === 0 && (
               <div className="projecttable__notfound">
                  There are no task found!
               </div>
            )}
         </div>
      </>
   );
}

export default TaskTable;
