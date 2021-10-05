import React from 'react';
import { Task } from 'utils/types';
import '../styles/TaskItem.scss';
import { Draggable } from 'react-beautiful-dnd';

interface TaskItemProp {
   task: Task;
   index: number;
}

function TaskItem({ task, index }: TaskItemProp) {
   return (
      <Draggable
         draggableId={task.id.toString()}
         key={task.id}
         index={index}
         type="Task"
      >
         {(provided) => (
            <>
               <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="taskItem"
                  key={task.id}
               >
                  <div>{task.notes}</div>
               </div>
            </>
         )}
      </Draggable>
   );
}

export default TaskItem;
