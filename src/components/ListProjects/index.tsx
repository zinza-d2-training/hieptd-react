import ProjectTable from 'components/ProjectTable';
import React, { useState } from 'react';
import { getUser } from 'utils/auth';
import Filter from './Filter';
import './ListProject.scss';
import { ProjectFilter, useGetListProject } from './useGetListProject';
import Breadcrumb from 'components/Breadcrumb';

function ListProjects() {
   const currentUser = getUser();
   const userId = currentUser?.id;
   const [filter, setFilter] = useState<ProjectFilter>({
      search: '',
      endDate: '',
      status: '',
   });
   const listProjects = useGetListProject({ filter, userId });

   return (
      <div className="listproject">
         <Breadcrumb
            listLink={[
               { name: 'Home', link: '/' },
               { name: 'Users', link: '/users' },
               { name: 'List Projects', link: '/list-projects' },
            ]}
         />
         <h1>ListProjects</h1>
         {listProjects ? (
            <div className="listproject__body">
               <Filter filter={filter} handleFilter={setFilter} />
               <ProjectTable projects={listProjects} />
            </div>
         ) : (
            <div>Not Found Project</div>
         )}
      </div>
   );
}
export default ListProjects;
