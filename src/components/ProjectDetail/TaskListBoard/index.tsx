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

   // add sequence of tasks
   function addSequence(task: Task[]) {
      task.forEach((task, index) => (task.sequence = index));
   }

   useEffect(() => {
      let lists: TasksMap = {};
      categories.forEach((column) => {
         lists[column] = tasks.filter((task) => task.status === column);
      });

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

      //name of column when dragStart and dragEnd
      const startDes = TaskStatus[source.droppableId];
      const endDes = TaskStatus[destination.droppableId];

      let newListTasks = { ...tasksMap };
      // find the task dragging
      const task = newListTasks[startDes].find(
         (item) => item.id === Number(draggableId)
      );
      if (task) {
         // in column
         if (startDes === endDes) {
            newListTasks[startDes].splice(source.index, 1);
            newListTasks[startDes].splice(destination.index, 0, task);
            addSequence(newListTasks[startDes]);
            addSequence(newListTasks[endDes]);
         }

         //to another column
         else {
            newListTasks[endDes].splice(destination.index, 0, task);
            newListTasks[startDes] = newListTasks[startDes].filter(
               (item) => item !== task
            );
            addSequence(newListTasks[startDes]);
            addSequence(newListTasks[endDes]);
         }
         setTasksMap(newListTasks);
      }
   };

   return (
      <div className="projectdetail__task-dropAndDrag">
         <DragDropContext onDragEnd={onDragEnd}>
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
