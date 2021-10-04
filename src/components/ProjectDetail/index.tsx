import React, { useMemo } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import './index.scss';
import ProjectDashboard from './ProjectDashboard';
import ProjectReport from './ProjectReport';
import ProjectTasks from './ProjectTask';
import { PROJECTS } from 'fakeData/projects';
import { Project, Role, Task } from 'utils/types';
import { getUser } from 'utils/auth';
import { useHistory } from 'react-router-dom';
import { TASKS } from 'fakeData/tasks';
import Breadcrumb from 'components/Breadcrumb';

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

   let tasks = useMemo<Task[]>(
      () => TASKS.filter((task) => task.projectId === id),
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
                  activeStyle={{
                     color: '#333',
                     fontWeight: 'bold',
                     cursor: 'default',
                     background: '#e7e9eb',
                  }}
               >
                  Dashboard
               </NavLink>
               <NavLink
                  to={`/projects/${id}/tasks`}
                  exact
                  activeStyle={{
                     color: '#333',
                     fontWeight: 'bold',
                     cursor: 'default',
                     background: '#e7e9eb',
                  }}
               >
                  Tasks
               </NavLink>
               <NavLink
                  to={`/projects/${id}/reports`}
                  exact
                  activeStyle={{
                     color: '#333',
                     fontWeight: 'bold',
                     cursor: 'default',
                     background: '#e7e9eb',
                  }}
               >
                  Reports
               </NavLink>
            </div>
            {/*----- nested router-------- */}
            <Switch>
               <Route
                  component={() => (
                     <ProjectDashboard tasks={tasks} projectId={id} />
                  )}
                  path={`/projects/${id}/dashboard`}
                  exact
               />
               <Route
                  component={() => <ProjectTasks tasks={tasks} />}
                  path={`/projects/${id}/tasks`}
                  exact
               />
               <Route
                  component={() => <ProjectReport projectId={id} />}
                  path={`/projects/${id}/reports`}
                  exact
               />
            </Switch>
         </div>
      </div>
   );
}

export default ProjectDetail;
