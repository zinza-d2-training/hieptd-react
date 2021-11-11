import React, { useMemo, useState } from 'react';
import { Task, TaskStatus } from 'utils/types';
import '../Components.scss';

interface TaskTableProp {
   tasks: Task[];
}

function TaskTable({ tasks }: TaskTableProp) {
   const [isCompleted, setIsCompleted] = useState<boolean>(false);

   let listTasks = useMemo<Task[]>(
      () =>
         isCompleted
            ? tasks
            : tasks.filter((task) => task.status !== TaskStatus.Completed),
      [isCompleted, tasks]
   );
   return (
      <>
         <div className="table">
            <div className="tasktable__header">
               <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
               />{' '}
               Show completed
            </div>

            {listTasks.length !== 0 && (
               <>
                  <table>
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Description</th>
                           <th>EndDate</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {listTasks &&
                           listTasks.slice(0, 10).map((task, index) => (
                              <tr key={index}>
                                 <td>{task.title}</td>
                                 <td>{task.notes}</td>
                                 <td>{task.dueDate}</td>
                                 <td className={`${TaskStatus[task.status]}`}>
                                    {TaskStatus[task.status]}
                                 </td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
               </>
            )}

            {listTasks.length === 0 && (
               <div className="table__notfound">There are no task found!</div>
            )}
         </div>
      </>
   );
}

export default TaskTable;
