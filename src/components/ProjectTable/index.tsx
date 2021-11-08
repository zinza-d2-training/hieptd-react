import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project, ProjectStatus } from 'utils/types';
import '../Components.scss';

interface ProjectTableProp {
   projects: Project[];
}

function ProjectTable({ projects }: ProjectTableProp) {
   const [showModalChangeStatus, setShowModalChangeStatus] =
      useState<boolean>(false);

   // handleChangeStatus
   const handleChangeStatus = (
      e: React.ChangeEvent<HTMLSelectElement>,
      status: ProjectStatus,
      id: number
   ) => {
      const value = e?.target.value;
      const check = (value as unknown as ProjectStatus) === status;
      if (check === !status) {
         setShowModalChangeStatus(true);
      } else return;
   };

   return (
      <>
         <ModalConfirm
            show={showModalChangeStatus}
            onClose={() => setShowModalChangeStatus(false)}
            handleConfirm={() => handleChangeStatus}
            title="Confirm Change"
            content="Are you sure you want to change?"
         />
         {projects && (
            <div className="table">
               <h1>Projects</h1>
               <table>
                  <thead>
                     <tr>
                        <th className="th-name">Name</th>
                        <th className="th-description">Description</th>
                        <th>EndDate</th>
                        <th>Status</th>
                        <th>Member</th>
                     </tr>
                  </thead>

                  <tbody>
                     {projects &&
                        projects.map((project) => (
                           <tr key={project.id}>
                              <td>
                                 <Link to={`/projects/${project.id}/tasks`}>
                                    {project.name}
                                 </Link>
                              </td>
                              <td className="td-description">
                                 {project.description}
                              </td>
                              <td>{project.endDate}</td>
                              <td>
                                 <div
                                    className={`${
                                       ProjectStatus[project.status]
                                    }`}
                                 >
                                    {ProjectStatus[project.status]}
                                 </div>
                              </td>
                              <td className="td-member">
                                 {project.members?.map((member, index) => (
                                    <Link
                                       key={index}
                                       to={`/users/${member.id}/details`}
                                    >
                                       {member.username}
                                    </Link>
                                 ))}
                              </td>
                           </tr>
                        ))}
                     {projects.length === 0 && (
                        <tr>
                           <td colSpan={5}>There are no project found!</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         )}
      </>
   );
}

export default ProjectTable;
