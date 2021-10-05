import Breadcrumb from 'components/Breadcrumb';
import { PROJECTS } from 'fakeData/projects';
import React, { CSSProperties, useMemo } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { getUser } from 'utils/auth';
import { Project, Role } from 'utils/types';
import './index.scss';
import ProjectDashboard from './ProjectDashboard';
import ProjectReports from './ProjectReports';
import ProjectTasks from './ProjectTasks';

interface ProjectDetailProps {
   id: number;
}

const linkActiveStyle: CSSProperties = {
   color: '#333',
   fontWeight: 'bold',
   cursor: 'default',
   background: '#e7e9eb',
};

function ProjectDetail({ id }: ProjectDetailProps) {
   const history = useHistory();
   const currentUser = getUser();

   let project = useMemo<Project | undefined>(
      () => PROJECTS.find((project) => project.id === id),
      [id]
   );

   return (
      <div className="projectdetail">
         <Breadcrumb
            listLink={[
               { name: 'Home', link: '/' },
               { name: `Projects`, link: `/projects` },
               { name: `${project?.name}`, link: '' },
            ]}
         />
         <div className="projectdetail__header">
            <span> {project?.name}</span>
            {/*--------- select projects  of user ---------*/}
            <select
               onChange={(e) => {
                  history.push(`/projects/${e.target.value}/dashboard`);
               }}
            >
               {PROJECTS.map((project) => {
                  if (currentUser?.role !== Role.Admin) {
                     return (
                        project.pm?.id === currentUser?.id ||
                        (project.members &&
                           project.members.findIndex(
                              (member) => member.id === currentUser?.id
                           ) !== -1 && (
                              <option value={project.id}>{project.name}</option>
                           ))
                     );
                  }
                  return <option value={project.id}>{project.name}</option>;
               })}
            </select>
         </div>
         <div className="projectdetail__body">
            <div className="projectdetail__tab">
               <NavLink
                  to={`/projects/${id}/dashboard`}
                  exact
                  activeStyle={linkActiveStyle}
               >
                  Dashboard
               </NavLink>
               <NavLink
                  to={`/projects/${id}/tasks`}
                  exact
                  activeStyle={linkActiveStyle}
               >
                  Tasks
               </NavLink>
               <NavLink
                  to={`/projects/${id}/reports`}
                  exact
                  activeStyle={linkActiveStyle}
               >
                  Reports
               </NavLink>
            </div>
            {/*----- nested router-------- */}
            <Switch>
               <Route
                  component={() => <ProjectDashboard projectId={id} />}
                  path={`/projects/${id}/dashboard`}
                  exact
               />
               <Route
                  component={() => <ProjectTasks projectId={id} />}
                  path={`/projects/${id}/tasks`}
                  exact
               />
               <Route
                  component={() => <ProjectReports projectId={id} />}
                  path={`/projects/${id}/reports`}
                  exact
               />
            </Switch>
         </div>
      </div>
   );
}

export default ProjectDetail;
