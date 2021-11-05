import React, { useState } from 'react';
import {
   Draggable,
   DroppableProvided,
   DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Task, TaskPriority } from 'utils/types';
import '../index.scss';
import TaskDrawer from './TaskDrawer';
import ReactTooltip from 'react-tooltip';

interface TaskItemProp {
   task: Task;
   index: number;
   reFetch: () => void;
}

function TaskItem({ task, index, reFetch }: TaskItemProp) {
   const [showTaskDrawer, setShowTaskDrawer] = useState<boolean>(false);
   return (
      <>
         {showTaskDrawer && (
            <TaskDrawer
               reFetch={reFetch}
               task={task}
               onClose={() => setShowTaskDrawer(false)}
            />
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
                     <div
                        className="taskItem__title"
                        data-tip
                        data-for={`taskTitle-${task.id}`}
                     >
                        <strong>{task.title}</strong>
                     </div>
                     <ReactTooltip
                        id={`taskTitle-${task.id}`}
                        aria-haspopup="true"
                        backgroundColor="#03a9f4"
                     >
                        <span>{task.title}</span>
                     </ReactTooltip>
                     {task.notes && (
                        <>
                           <div
                              data-tip
                              data-for={`taskNote-${task.id}`}
                              className="taskItem__note"
                           >
                              {task.notes}
                           </div>
                           <ReactTooltip
                              id={`taskNote-${task.id}`}
                              aria-haspopup="true"
                              backgroundColor="#03a9f4"
                           >
                              <span className="span-note">{task.notes}</span>
                           </ReactTooltip>
                        </>
                     )}
                     <div className="taskItem__footer">
                        {task.assignTo?.avatar ? (
                           <img
                              data-tip
                              data-for={`taskUser-${task.id}`}
                              src={`${process.env.REACT_APP_BASEURL}${task.assignTo?.avatar}`}
                              alt="user-avt"
                           />
                        ) : (
                           <i
                              data-tip
                              data-for={`taskUser-${task.id}`}
                              className="fas fa-user"
                           ></i>
                        )}
                        <ReactTooltip
                           id={`taskUser-${task.id}`}
                           aria-haspopup="true"
                           backgroundColor="#03a9f4"
                        >
                           <span>{`${task.assignTo?.firstName} ${task.assignTo?.lastName}`}</span>
                        </ReactTooltip>
                        <div className="task__dueDate">
                           {task.dueDate}
                           <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div
                           className={`task__${TaskPriority[task.priority]}`}
                           data-tip
                           data-for={`taskPriority-${task.id}`}
                        ></div>
                        <ReactTooltip
                           id={`taskPriority-${task.id}`}
                           aria-haspopup="true"
                           backgroundColor="#03a9f4"
                        >
                           <span>{TaskPriority[task.priority]}</span>
                        </ReactTooltip>
                     </div>
                  </div>
               );
            }}
         </Draggable>
      </>
   );
}

export default TaskItem;
