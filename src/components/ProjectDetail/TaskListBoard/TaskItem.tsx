import React, { useState } from 'react';
import {
   Draggable,
   DroppableProvided,
   DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { Task } from 'utils/types';
import TaskDrawer from './TaskDrawer';
import '../index.scss';

interface TaskItemProp {
   task: Task;
   index: number;
}

function TaskItem({ task, index }: TaskItemProp) {
   const [showTaskDrawer, setShowTaskDrawer] = useState<boolean>(false);
   return (
      <>
         {showTaskDrawer && (
            <TaskDrawer task={task} onClose={() => setShowTaskDrawer(false)} />
         )}
         <Draggable
            draggableId={task.id.toString()}
            key={task.id}
            index={index}
         >
            {(
               provided: DroppableProvided,
               snapshot: DroppableStateSnapshot
            ) => {
               return (
                  <div
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     className="taskItem"
                     key={task.id}
                     onClick={() => setShowTaskDrawer(true)}
                  >
                     <div className="taskItem__title">
                        <i className="fas fa-sticky-note"></i>{' '}
                        <strong>{task.title}</strong>
                     </div>
                     <div className="taskItem__note">{task.notes}</div>
                     <div className="taskItem__member">
                        <small>
                           <i className="far fa-address-card"></i> Assign to
                        </small>
                        <Link
                           to={`/users/${task.assignTo?.id}/details`}
                        >{` ${task.assignTo?.firstName} ${task.assignTo?.lastName}`}</Link>
                     </div>
                     <div className="taskItem__member">
                        <small>
                           <i className="far fa-address-card"></i> Create by
                        </small>
                        <Link
                           to={`/users/${task.requestByUser?.id}/details`}
                        >{` ${task.requestByUser?.firstName} ${task.requestByUser?.lastName}`}</Link>
                     </div>
                  </div>
               );
            }}
         </Draggable>
      </>
   );
}

export default TaskItem;
