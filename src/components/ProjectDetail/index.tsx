import Breadcrumb from 'components/Breadcrumb';
import CircleLoading from 'components/Loading/CircleLoading';
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './index.scss';
import ProjectTasks from './ProjectTasks';
import { useGetProjectDetail } from './useGetData/useGetProjectDetail';

interface ProjectDetailProps {
   id: number;
}

function ProjectDetail({ id }: ProjectDetailProps) {
   const history = useHistory();

   const { projects, currentProject, loading, getProjects, getProject } =
      useGetProjectDetail(id);

   useEffect(() => {
      getProjects();
      getProject();
      // eslint-disable-next-line
   }, [id]);
   if (loading) return <CircleLoading />;
   return (
      <div className="projectdetail">
         <div className="projectdetail__header">
            <Breadcrumb
               listLink={[
                  { name: 'Home', link: '/' },
                  { name: `Projects`, link: `/projects` },
                  { name: `${currentProject?.name}`, link: '' },
               ]}
            />
            <div className="projectdetail__header-item">
               {/*--------- select projects  of user ---------*/}
               <select
                  onChange={(e) => {
                     history.push(`/projects/${e.target.value}/tasks`);
                  }}
               >
                  {projects.map((project) => (
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
                  component={() => (
                     <ProjectTasks currentProject={currentProject!} />
                  )}
                  path={`/projects/${id}/tasks`}
                  exact
               />
            </Switch>
         </div>
      </div>
   );
}

export default ProjectDetail;
