import EditProjectModal from 'components/EditProjectModal';
import ModalConfirm from 'components/ModalConfirm';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project, ProjectStatus, Role } from 'utils/types';
import '../Components.scss';

interface ProjectTableProp {
   projects: Project[];
   refetch?: () => void;
}

function ProjectTable({ projects, refetch }: ProjectTableProp) {
   const { user: currentUser } = useCurrentUser();
   const [showModalChangeStatus, setShowModalChangeStatus] =
      useState<boolean>(false);
   const [showEditModal, setShowEditModal] = useState<boolean>(false);
   const [editProject, setEditProject] = useState<Project>();

   // handleChangeStatus
   const handleChangeStatus = (
      e: React.ChangeEvent<HTMLSelectElement>,
      status: ProjectStatus
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
         <EditProjectModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            project={editProject!}
            refetch={refetch!}
         />

         {projects && (
            <div className="table">
               <table>
                  <thead>
                     <tr>
                        <th className="th-name">Name</th>
                        <th className="th-description">Description</th>
                        <th>EndDate</th>
                        <th>Status</th>
                        <th>Member</th>
                        {(currentUser?.role === Role.Admin ||
                           currentUser?.role === Role.PM) && <th>Action</th>}
                     </tr>
                  </thead>

                  <tbody>
                     {projects &&
                        projects.map((project) => (
                           <tr key={project.id}>
                              <td className="td-name">
                                 <Link to={`/projects/${project.id}/tasks`}>
                                    {project.name}
                                 </Link>
                              </td>
                              <td className="td-description">
                                 {project.description}
                              </td>
                              <td className="td-date">{project.endDate}</td>
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
                              {currentUser?.role !== Role.Member && (
                                 <td className="user__edit">
                                    <i
                                       className="fas fa-edit"
                                       onClick={() => {
                                          setEditProject(project);
                                          setShowEditModal(true);
                                       }}
                                    ></i>
                                 </td>
                              )}
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
