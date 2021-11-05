import React from 'react';
import {
   Droppable,
   DroppableProvided,
   DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Task, TaskStatus } from 'utils/types';
import '../index.scss';
import TaskItem from './TaskItem';

interface StatusColumnProp {
   tasks: Task[];
   category: TaskStatus;
   reFetch: () => void;
}

function StatusColumn({ tasks, category, reFetch }: StatusColumnProp) {
   return (
      <div className="statuscolumn">
         <div className="statuscolumn__header">{TaskStatus[category]}</div>
         <Droppable droppableId={TaskStatus[category]}>
            {(
               provided: DroppableProvided,
               snapshot: DroppableStateSnapshot
            ) => (
               <div
                  className="statuscolumn__body"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                     backgroundColor: snapshot.isDraggingOver
                        ? '#e1e1e1'
                        : '#efeff0',
                  }}
               >
                  {tasks &&
                     tasks.map((task, index) => (
                        <TaskItem reFetch={reFetch} index={index} task={task} />
                     ))}

                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </div>
   );
}

export default StatusColumn;
