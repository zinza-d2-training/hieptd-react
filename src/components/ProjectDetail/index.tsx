import Breadcrumb from 'components/Breadcrumb';
import { PROJECTS } from 'fakeData/projects';
import React, { useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getUser } from 'utils/auth';
import { Project, Role } from 'utils/types';
import './index.scss';
import ProjectTasks from './ProjectTasks';

interface ProjectDetailProps {
   id: number;
}

function ProjectDetail({ id }: ProjectDetailProps) {
   const history = useHistory();
   const currentUser = getUser();

   let project = useMemo<Project | undefined>(
      () => PROJECTS.find((project) => project.id === id),
      [id]
   );

   return (
      <div className="projectdetail">
         <div className="projectdetail__header">
            <Breadcrumb
               listLink={[
                  { name: 'Home', link: '/' },
                  { name: `Projects`, link: `/projects` },
                  { name: `${project?.name}`, link: '' },
               ]}
            />
            <div className="projectdetail__header-item">
               {/*--------- select projects  of user ---------*/}
               <select
                  onChange={(e) => {
                     history.push(`/projects/${e.target.value}/tasks`);
                  }}
               >
                  {currentUser?.role !== Role.Admin
                     ? PROJECTS.filter((project) => {
                          if (
                             project.pm?.id === currentUser?.id ||
                             (project.members &&
                                project.members.findIndex(
                                   (member) => member.id === currentUser?.id
                                ) !== -1)
                          ) {
                             return true;
                          }
                          return false;
                       }).map((project) => (
                          <option key={project.id} value={project.id}>
                             {project.name}
                          </option>
                       ))
                     : PROJECTS.map((project) => (
                          <option key={project.id} value={project.id}>
                             {project.name}
                          </option>
                       ))}
               </select>
            </div>
         </div>
         <div className="projectdetail__body">
            {/*----- nested router-------- */}
            <Switch>
               <Route
                  component={() => <ProjectTasks projectId={id} />}
                  path={`/projects/${id}/tasks`}
                  exact
               />
            </Switch>
         </div>
      </div>
   );
}

export default ProjectDetail;
