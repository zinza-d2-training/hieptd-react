import React, { useLayoutEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { TaskStatusAndSequence } from 'services/task';
import { Task, TaskStatus } from 'utils/types';
import { useApiTask } from '../useApi/useApiTasksInProject';
import StatusColumn from './StatusColumn';

interface TasksMap {
   [key: string]: Task[];
}
interface TaskListBoardProp {
   tasks: Task[];
   reFetch: () => void;
}
export const categories = [
   TaskStatus.Unscheduled,
   TaskStatus.Doing,
   TaskStatus.Reviewing,
   TaskStatus.Completed,
   TaskStatus.Cancelled,
];

function TaskListBoard({ tasks, reFetch }: TaskListBoardProp) {
   const [tasksMap, setTasksMap] = useState<TasksMap>({});
   const { updateTaskStatusAndSequence } = useApiTask();

   // handle update task
   const handleUpdateTask = async (
      taskId: number,
      updateTask: TaskStatusAndSequence
   ) => {
      try {
         const { data } = await updateTaskStatusAndSequence(taskId, updateTask);
         if (data) {
            toast.success(`${data.title} updated successfully`);
         }
      } catch (error) {
         toast.error(error as string);
      }
   };

   useLayoutEffect(() => {
      let lists: TasksMap = {};
      categories.forEach((column) => {
         lists[column] = tasks?.filter((task) => task.status === column) || [];
      });

      setTasksMap(lists);
   }, [tasks]);

   const onDragEnd = async (result) => {
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
      let task = newListTasks[startDes].find(
         (item) => Number(item.id) === Number(draggableId)
      );

      if (task) {
         // in column
         if (startDes === endDes) {
            newListTasks[startDes].splice(source.index, 1);
            newListTasks[startDes].splice(destination.index, 0, task);
            setTasksMap(newListTasks);
            const sequence = Number(destination.index) + 1;
            await handleUpdateTask(task.id, {
               status: endDes as unknown as TaskStatus,
               sequence,
            });
         }

         //to another column
         else {
            task.status = Number(endDes) as TaskStatus;
            newListTasks[endDes].splice(destination.index, 0, task);
            newListTasks[startDes] = newListTasks[startDes].filter(
               (item) => item !== task
            );
            setTasksMap(newListTasks);

            const sequence = Number(destination.index) + 1;
            await handleUpdateTask(task.id, {
               status: endDes as unknown as TaskStatus,
               sequence,
            });
         }

         reFetch();
      }
   };

   return (
      <div className="projectdetail__task-dropAndDrag">
         <DragDropContext onDragEnd={onDragEnd}>
            {categories.map((item, index) => (
               <StatusColumn
                  reFetch={reFetch}
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
