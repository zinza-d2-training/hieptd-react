import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from 'utils/auth';
import { Project, ProjectStatus, Role } from 'utils/types';
import './ProjectTable.scss';

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
                        projects.map((project) => (
                           <tr key={project.id}>
                              <td>{project.name}</td>
                              <td>{project.description}</td>
                              <td>{project.endDate}</td>
                              {currentUser?.role === Role.Admin ? (
                                 <td>
                                    <select
                                       onChange={(e) =>
                                          handleChangeStatus(e, project.status)
                                       }
                                    >
                                       <option
                                          value={ProjectStatus[project.status]}
                                       >
                                          {ProjectStatus[project.status]}
                                       </option>
                                       {Object.keys(ProjectStatus)
                                          .filter((key) =>
                                             isNaN(Number(ProjectStatus[key]))
                                          )
                                          .filter(
                                             (item) =>
                                                Number(item) !== project.status
                                          )
                                          .map((item, index) => (
                                             <option key={index}>
                                                {ProjectStatus[item]}
                                             </option>
                                          ))}
                                    </select>
                                 </td>
                              ) : (
                                 <td> {ProjectStatus[project.status]}</td>
                              )}

                              <td className="td-member">
                                 {project.members?.map((member, index) => (
                                    <Link
                                       key={index}
                                       to={`/users/${member.id}/details`}
                                    >
                                       {member.username},{' '}
                                    </Link>
                                 ))}
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