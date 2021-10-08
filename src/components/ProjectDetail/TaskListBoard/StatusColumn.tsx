import React, { useMemo } from 'react';
import { Task, TaskStatus } from 'utils/types';
import TaskItem from './TaskItem';
import '../styles/StatusColumn.scss';
import {
   Droppable,
   DroppableProvided,
   DroppableStateSnapshot,
} from 'react-beautiful-dnd';

interface StatusColumnProp {
   tasks: Task[];
   category: TaskStatus;
}

function StatusColumn({ tasks, category }: StatusColumnProp) {
   function sortBySequence(a: Task, b: Task) {
      if (a.sequence && b.sequence) {
         if (a.sequence < b.sequence) {
            return -1;
         }
         if (a.sequence > b.sequence) {
            return 1;
         }
      }
      return 0;
   }
   const tasksSorted = useMemo<Task[]>(
      () => tasks && tasks.sort(sortBySequence),
      [tasks]
   );
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
                  {tasksSorted &&
                     tasksSorted.map((task, index) => (
                        <TaskItem index={index} task={task} />
                     ))}

                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </div>
   );
}

export default StatusColumn;
