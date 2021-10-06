import React from 'react';
import { Priority, TaskStatus } from 'utils/types';
import { TaskFilterType } from '../ProjectTasks';
import '../styles/TaskFilter.scss';
import { categories } from '../TaskListBoard/index';

interface TaskFilterProps {
   filter: TaskFilterType;
   handleFilter: (filter: TaskFilterType) => void;
}

function TaskFilter({ filter, handleFilter }: TaskFilterProps) {
   return (
      <div className="taskFilter">
         <div className="taskFilter__item">
            <label htmlFor="taskFilter-search"></label>
            <input
               id="taskFilter-search"
               type="text"
               placeholder="Search"
               value={filter.search}
               onChange={(e) =>
                  handleFilter({ ...filter, search: e.target.value })
               }
            />
         </div>
         <div className="taskFilter__item">
            <input
               id="taskFilter-checkbox"
               type="checkbox"
               checked={filter.assignTo}
               onChange={(e) =>
                  handleFilter({ ...filter, assignTo: e.target.checked })
               }
            />
            <label htmlFor="taskFilter-checkbox">Assign to me</label>
         </div>
         <div className="taskFilter__item">
            <input
               id="taskFilter-checkbox-2"
               type="checkbox"
               checked={filter.createBy}
               onChange={(e) => {
                  handleFilter({ ...filter, createBy: e.target.checked });
                  console.log(filter.createBy);
               }}
            />
            <label htmlFor="taskFilter-checkbox-2">Create by me</label>
         </div>{' '}
         <div className="taskFilter__item">
            <select
               onChange={(e) => {
                  if (e.target.value) {
                     handleFilter({
                        ...filter,
                        status: e.target.value,
                     });
                  } else {
                     handleFilter({
                        ...filter,
                        status: '',
                     });
                  }
               }}
            >
               <option value="">Status(multiple)</option>
               {categories.map((item, index) => (
                  <option key={index} value={item}>
                     {TaskStatus[item]}
                  </option>
               ))}
            </select>
         </div>
         <div className="taskFilter__item">
            <select
               onChange={(e) => {
                  if (e.target.value) {
                     handleFilter({
                        ...filter,
                        priority: e.target.value,
                     });
                  } else {
                     handleFilter({
                        ...filter,
                        priority: '',
                     });
                  }
               }}
            >
               <option value="">Sequence</option>
               <option value={Priority.High}>{Priority.High}</option>
               <option value={Priority.Medium}>{Priority.Medium}</option>
            </select>
         </div>
         <div className="taskFilter__item">
            <button type="button">Add/Request</button>
         </div>
      </div>
   );
}

export default TaskFilter;
