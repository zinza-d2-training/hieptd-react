import React from 'react';
import { Task, TaskStatus } from 'utils/types';
import '../ProjectTable/ProjectTable.scss';

interface TaskTableProp {
   tasks: Task[];
}

function TaskTable({ tasks }: TaskTableProp) {
   return (
      <>
         {tasks.length !== 0 && (
            <div className="profiletable">
               <h1>Task</h1>
               <table>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>EndDate</th>
                        <th>Sattus</th>
                     </tr>
                  </thead>
                  <tbody>
                     {tasks &&
                        tasks.map((task, index) => (
                           <tr key={index}>
                              <td>{task.title}</td>
                              <td>{task.notes}</td>
                              <td>{task.dueDate}</td>
                              <td>{TaskStatus[task.status]}</td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         )}
      </>
   );
}

export default TaskTable;
