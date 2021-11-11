import Breadcrumb from 'components/Breadcrumb';
import Pagination from 'components/Pagination';
import ProjectTable from 'components/ProjectTable';
import React, { useState } from 'react';
import Filter from './Filter';
import './ListProject.scss';
import { ProjectFilter, useGetListProject } from './useGetListProject';

function ListProjects() {
   const [filter, setFilter] = useState<ProjectFilter>({
      keyword: '',
      status: undefined,
      endDate: '',
   });
   const { projects, pagination, handlePagination, refetch } =
      useGetListProject({
         filter,
      });

   return (
      <div className="listproject">
         <Breadcrumb
            listLink={[
               { name: 'Home', link: '/' },
               { name: 'Projects', link: '/projects' },
            ]}
         />

         {projects && (
            <div className="listproject__body">
               <h1>Projects</h1>
               <Filter filter={filter} handleFilter={setFilter} />
               <ProjectTable
                  projects={projects}
                  refetch={() => refetch(pagination.page)}
               />
               <Pagination info={pagination} onChange={handlePagination} />
            </div>
         )}
      </div>
   );
}
export default ListProjects;
