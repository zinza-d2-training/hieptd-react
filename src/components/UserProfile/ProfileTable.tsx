import React from 'react';
import { Link } from 'react-router-dom';
import { Project, Task, User } from 'utils/types';
import './index.scss';
import {
   convertProjectStatus,
   convertTaskStatus,
   convertToUserInfo,
} from './helper';

interface TableProps {
   listRender: { tasks?: Task[]; projects?: Project[] };
   currentUser: User;
}

function ProfileTable({ listRender, currentUser }: TableProps) {
   return (
      <div className="profiletable">
         {listRender.projects && <h1>Projects</h1>}

         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>EndDate</th>
                  <th>Sattus</th>
                  {listRender.projects && <th>Member</th>}
               </tr>
            </thead>
            <tbody>
               {listRender.projects &&
                  listRender.projects.map((project, index) => (
                     <tr key={index}>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.endDate}</td>
                        <td>{convertProjectStatus(project.status)}</td>
                        {listRender.projects && (
                           <td className="td-member">
                              {convertToUserInfo(project.memberId).map(
                                 (user) => {
                                    if (
                                       user.name === 'admin' &&
                                       currentUser?.role !== 'admin'
                                    ) {
                                       return (
                                          <span>
                                             {user.name}
                                             {', '}
                                          </span>
                                       );
                                    }
                                    return (
                                       <Link to={`/users/${user.id}/details`}>
                                          {user.name}
                                          {', '}
                                       </Link>
                                    );
                                 }
                              )}
                           </td>
                        )}
                     </tr>
                  ))}
            </tbody>
         </table>
         <>
            {listRender.tasks && <h1>Tasks</h1>}
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
                  {listRender.tasks &&
                     listRender.tasks.map((task, index) => (
                        <tr key={index}>
                           <td>{task.title}</td>
                           <td>{task.notes}</td>
                           <td>{task.dueDate}</td>
                           <td>{convertTaskStatus(task.status)}</td>
                        </tr>
                     ))}
               </tbody>
            </table>
         </>
      </div>
   );
}

export default ProfileTable;
