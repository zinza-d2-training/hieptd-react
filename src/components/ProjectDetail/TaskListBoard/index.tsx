import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Task, TaskStatus } from 'utils/types';
import StatusColumn from './StatusColumn';

interface TasksMap {
   [key: string]: Task[];
}
interface TaskListBoardProp {
   tasks: Task[];
}
export const categories = [
   TaskStatus.Requesting,
   TaskStatus.Unscheduled,
   TaskStatus.Doing,
   TaskStatus.Reviewing,
   TaskStatus.Completed,
   TaskStatus.Cancelled,
];

function TaskListBoard({ tasks }: TaskListBoardProp) {
   const [tasksMap, setTasksMap] = useState<TasksMap>({});
   useEffect(() => {
      let lists: TasksMap = {};

      lists[TaskStatus.Requesting] = tasks.filter(
         (task) => task.status === TaskStatus.Requesting
      );
      lists[TaskStatus.Unscheduled] = tasks.filter(
         (task) => task.status === TaskStatus.Unscheduled
      );
      lists[TaskStatus.Doing] = tasks.filter(
         (task) => task.status === TaskStatus.Doing
      );
      lists[TaskStatus.Reviewing] = tasks.filter(
         (task) => task.status === TaskStatus.Reviewing
      );
      lists[TaskStatus.Completed] = tasks.filter(
         (task) => task.status === TaskStatus.Completed
      );
      lists[TaskStatus.Cancelled] = tasks.filter(
         (task) => task.status === TaskStatus.Cancelled
      );
      setTasksMap(lists);
   }, [tasks]);

   const onDragEnd = (result) => {
      const { destination, source, draggableId } = result;
      if (!destination) {
         return;
      }
      if (
         destination.index === source.index &&
         destination.droppableId === source.droppableId
      ) {
         return;
      }
      let newListTasks = { ...tasksMap };

      const task = newListTasks[TaskStatus[source.droppableId]].find(
         (item) => item.id === Number(draggableId)
      );

      if (task) {
         newListTasks[TaskStatus[source.droppableId]].splice(
            newListTasks[TaskStatus[source.droppableId]].indexOf(task),
            1
         );

         newListTasks[TaskStatus[destination.droppableId]].push(task);
      }
      setTasksMap(newListTasks);
   };

   const onDropEnter = (e) => {
      e.preventDefault();
   };
   return (
      <div className="projectdetail__task-dropAndDrag">
         <DragDropContext onDragEnd={onDragEnd} onDropEnter={onDropEnter}>
            {categories.map((item, index) => (
               <StatusColumn
                  key={index}
                  category={item}
                  tasks={tasksMap[item]}
               />
            ))}
         </DragDropContext>
      </div>
   );
}
export default TaskListBoard;
