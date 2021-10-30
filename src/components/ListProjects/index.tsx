import ProjectTable from 'components/ProjectTable';
import React, { useState } from 'react';
import { getUser } from 'utils/auth';
import Filter from './Filter';
import './ListProject.scss';
import { ProjectFilter, useGetListProject } from './useGetListProject';
import Breadcrumb from 'components/Breadcrumb';
import Pagination from 'components/Pagination';

function ListProjects() {
   const currentUser = getUser();
   const { id, role } = currentUser!;
   const [filter, setFilter] = useState<ProjectFilter>({
      keyword: '',
      status: undefined,
      endDate: '',
   });
   const { projects, pagination, handlePagination } = useGetListProject({
      filter,
      userId: id,
      role,
   });

   return (
      <div className="listproject">
         <Breadcrumb
            listLink={[
               { name: 'Home', link: '/' },
               { name: 'Projects', link: '/projects' },
            ]}
         />
         <h1>ListProjects</h1>
         {projects && (
            <div className="listproject__body">
               <Filter filter={filter} handleFilter={setFilter} />

               <ProjectTable projects={projects} />
               <Pagination info={pagination} onChange={handlePagination} />
            </div>
         )}
      </div>
   );
}
export default ListProjects;
