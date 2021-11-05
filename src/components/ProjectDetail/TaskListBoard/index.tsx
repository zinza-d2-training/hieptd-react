import CircleLoading from 'components/Loading/CircleLoading';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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
   const { loading, updateTaskStatusAndSequence } = useApiTask();

   useEffect(() => {
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
            const sequence = Number(destination.index) + 1;
            await updateTaskStatusAndSequence(task.id, {
               status: endDes as unknown as TaskStatus,
               sequence,
            });
            reFetch();
         }

         //to another column
         else {
            const sequence = Number(destination.index) + 1;
            await updateTaskStatusAndSequence(task.id, {
               status: endDes as unknown as TaskStatus,
               sequence,
            });
            reFetch();
         }
      }
   };

   if (loading) return <CircleLoading />;

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
