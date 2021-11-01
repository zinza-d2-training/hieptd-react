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
import dashboard2 from 'assets/dashboard2.png';
import task from 'assets/task.png';
import report from 'assets/report.png';

interface ProjectDetailProps {
   id: number;
}

const linkActiveStyle: CSSProperties = {
   cursor: 'default',
   borderBottomColor: '#007bff',
   backgroundColor: '#ffff',
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
                     history.push(`/projects/${e.target.value}/dashboard`);
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
            <div className="projectdetail__tab">
               <div className="projectdetail__tab-item">
                  <NavLink
                     to={`/projects/${id}/dashboard`}
                     exact
                     activeStyle={linkActiveStyle}
                  >
                     <img src={dashboard2} alt="dashboard-icon" /> Dashboard
                  </NavLink>
               </div>
               <div className="projectdetail__tab-item">
                  <NavLink
                     to={`/projects/${id}/tasks`}
                     exact
                     activeStyle={linkActiveStyle}
                  >
                     <img src={task} alt="task-icon" /> Tasks
                  </NavLink>
               </div>
               <div className="projectdetail__tab-item">
                  <NavLink
                     to={`/projects/${id}/reports`}
                     exact
                     activeStyle={linkActiveStyle}
                  >
                     <img src={report} alt="report-icon" /> Reports
                  </NavLink>
               </div>
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
