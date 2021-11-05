import MultipleSelect from 'components/MultipleSelect';
import React, { useState } from 'react';
import { getUser } from 'utils/auth';
import { TaskPriority, Project, Role, TaskStatus } from 'utils/types';
import { TasksFilter } from '../ProjectTasks';
import '../index.scss';
import { categories } from '../TaskListBoard/index';
import { textFromTaskStatus } from './functions';
import CreateTaskForm from 'components/CreateTaskForm';
import { PlusIcon } from 'components/icons/PlusIcon';

interface TaskFilterProps {
   filter: TasksFilter;
   handleFilter: (filter: TasksFilter) => void;
   currentProject: Project;
   reFetch: () => void;
}
export type TaskStatusOption = {
   text: string;
   value: TaskStatus;
};

function TaskFilter({
   filter,
   handleFilter,
   currentProject,
   reFetch,
}: TaskFilterProps) {
   const currentUser = getUser();
   const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

   const options = React.useMemo<TaskStatusOption[]>(() => {
      return categories.map((status) => ({
         text: textFromTaskStatus(status),
         value: status,
      }));
   }, []);

   const handleMultipleStatus = (listSelected: TaskStatus[]) => {
      handleFilter({ ...filter, statuses: listSelected });
   };
   return (
      <>
         {' '}
         {showTaskForm && (
            <CreateTaskForm
               currentProject={currentProject}
               onClose={() => setShowTaskForm(false)}
               reFetchTaskList={reFetch}
            />
         )}{' '}
         <div className="taskFilter">
            <div className="taskFilter__left">
               {' '}
               <div className="taskFilter__item">
                  <label htmlFor="taskFilter-search"></label>
                  <input
                     id="taskFilter-search"
                     type="text"
                     placeholder="Search"
                     value={filter.keyword}
                     onChange={(e) =>
                        handleFilter({ ...filter, keyword: e.target.value })
                     }
                  />
               </div>
               <div className="taskFilter__item">
                  <input
                     type="checkbox"
                     onChange={(e) => {
                        if (e.target.checked) {
                           handleFilter({
                              ...filter,
                              assignToId: currentUser?.id,
                           });
                        } else {
                           handleFilter({
                              ...filter,
                              assignToId: undefined,
                           });
                        }
                     }}
                  />
                  <label>Assign to me</label>
               </div>
               <div className="taskFilter__item">
                  <MultipleSelect
                     title={'Statues'}
                     value={filter.statuses!}
                     options={options}
                     onChange={handleMultipleStatus}
                  />
               </div>
               <div className="taskFilter__item">
                  <select
                     onChange={(e) => {
                        if (e.target.value) {
                           handleFilter({
                              ...filter,
                              priority: e.target
                                 .value as unknown as TaskPriority,
                           });
                        } else {
                           handleFilter({
                              ...filter,
                              priority: undefined,
                           });
                        }
                     }}
                  >
                     <option value="">Priority</option>
                     <option value={TaskPriority.High}>High</option>
                     <option value={TaskPriority.Medium}>Medium</option>
                  </select>
               </div>
            </div>
            <div className="taskFilter__right">
               <div className="taskFilter__item">
                  {currentUser?.role === Role.PM && (
                     <button
                        type="button"
                        onClick={() => setShowTaskForm(true)}
                     >
                        <PlusIcon />
                        Add
                     </button>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}

export default TaskFilter;
