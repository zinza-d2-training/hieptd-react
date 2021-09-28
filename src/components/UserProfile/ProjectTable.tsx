import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from 'utils/auth';
import { Project, ProjectStatus, Role } from 'utils/types';
import { convertProjectStatus } from './helper';
import ModalConfirm from 'components/ModalConfirm';

interface ProjectTableProp {
   projects: Project[];
}

function ProjectTable({ projects }: ProjectTableProp) {
   const currentUser = getUser();
   const [showModalChangeStatus, setShowModalChangeStatus] =
      useState<boolean>(false);

   // handleChangeStatus
   const handleChangeStatus = (e, status: ProjectStatus) => {
      const value = e?.target.value;
      const check = value === status;
      if (check === !status) {
         setShowModalChangeStatus(true);
      } else return;
   };

   // handle generate select options
   const handleGenerateSelect = (status: ProjectStatus) => {
      const listStatus: string[] = Object.keys(ProjectStatus)
         .filter((key) => isNaN(Number(ProjectStatus[key])))
         .filter((item) => Number(item) !== status);
      return (
         <select onChange={(e) => handleChangeStatus(e, status)}>
            <option value={convertProjectStatus(status)}>
               {convertProjectStatus(status)}
            </option>
            {listStatus.map((item, index) => (
               <option key={index}>{convertProjectStatus(Number(item))}</option>
            ))}
         </select>
      );
   };

   return (
      <>
         <ModalConfirm
            show={showModalChangeStatus}
            setShow={setShowModalChangeStatus}
            handleConfirm={handleChangeStatus}
            title="Confirm Change"
            content="Are you sure you want to change?"
         />
         {projects.length !== 0 && (
            <div className="profiletable">
               <h1>Projects</h1>

               <table>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>EndDate</th>
                        <th>Sattus</th>
                        {projects && <th>Member</th>}
                     </tr>
                  </thead>
                  <tbody>
                     {projects &&
                        projects.map((project, index) => (
                           <tr key={index}>
                              <td>{project.name}</td>
                              <td>{project.description}</td>
                              <td>{project.endDate}</td>
                              {currentUser?.role === Role.Admin ? (
                                 <td>{handleGenerateSelect(project.status)}</td>
                              ) : (
                                 <td>{convertProjectStatus(project.status)}</td>
                              )}

                              <td className="td-member">
                                 {project.members?.map((item, index) => {
                                    if (
                                       item.role === Role.Admin &&
                                       currentUser?.role === Role.Admin
                                    ) {
                                       return (
                                          <span key={index}>
                                             {item.username}
                                          </span>
                                       );
                                    }
                                    return (
                                       <Link
                                          key={index}
                                          to={`/users/${item.id}/details`}
                                       >
                                          {item.username},{' '}
                                       </Link>
                                    );
                                 })}
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         )}
      </>
   );
}

export default ProjectTable;
