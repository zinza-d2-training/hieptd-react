import React from 'react';
import { Task, TaskStatus } from 'utils/types';
import TaskItem from './TaskItem';
import '../styles/StatusColumn.scss';
import { Droppable } from 'react-beautiful-dnd';

interface StatusColumnProp {
   tasks: Task[];
   category: TaskStatus;
}

function StatusColumn({ tasks, category }: StatusColumnProp) {
   return (
      <div className="statuscolumn">
         <div className={`statuscolumn__container statuscolumn-${category}`}>
            <div
               className={`statuscolumn__header statuscolumn__header-${category}`}
            >
               {TaskStatus[category]}
            </div>

            <Droppable droppableId={TaskStatus[category]}>
               {(provided) => (
                  <>
                     <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks &&
                           tasks.map((task, index) => (
                              <TaskItem index={index} task={task} />
                           ))}
                     </div>
                     {provided.placeholder}
                  </>
               )}
            </Droppable>
         </div>
      </div>
   );
}

export default StatusColumn;
