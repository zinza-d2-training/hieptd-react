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
      <Droppable droppableId={TaskStatus[category]}>
         {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
               className="statuscolumn"
               ref={provided.innerRef}
               {...provided.droppableProps}
               style={{
                  backgroundColor: snapshot.isDraggingOver
                     ? '#42a5f5'
                     : '#f6f8fa',
               }}
            >
               <div className="statuscolumn__container">
                  <div className="statuscolumn__header">
                     {TaskStatus[category]}
                  </div>
                  <div className="statuscolumn__body">
                     {tasksSorted &&
                        tasksSorted.map((task, index) => (
                           <TaskItem index={index} task={task} />
                        ))}
                  </div>
               </div>
               {provided.placeholder}
            </div>
         )}
      </Droppable>
   );
}

export default StatusColumn;
