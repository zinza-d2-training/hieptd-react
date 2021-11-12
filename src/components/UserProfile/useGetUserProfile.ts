import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import userService from 'services/user';
import { Project, Task, User } from 'utils/types';
interface GetUsersProfileProps {
   id: number;
}

export const useGetUserProfile = ({ id }: GetUsersProfileProps) => {
   const [loading, setLoading] = useState(false);
   const [user, setUser] = useState<User>();
   const [projects, setProjects] = useState<Project[]>();
   const [tasks, setTasks] = useState<Task[]>();

   const fetchUser = useCallback(async () => {
      setLoading(true);
      try {
         const { data } = await userService.getUser(id);
         setUser(data);
      } catch (error) {
         toast.error((error as any).response.data.message as string);
      }
   }, [id]);
   const fetchProjectsOfUser = useCallback(async () => {
      setLoading(true);
      try {
         setLoading(false);
         const { data } = await userService.getProjectsOfUser(id);
         setProjects(data || []);
      } catch (error) {
         console.error(error);
      }
   }, [id]);

   const fetchTasksOfUser = useCallback(async () => {
      setLoading(true);
      try {
         setLoading(false);
         const { data } = await userService.getTasksOfUser(id);
         setTasks(data || []);
      } catch (error) {
         console.error(error);
      }
   }, [id]);

   return {
      user,
      projects,
      loading,
      fetchUser,
      fetchProjectsOfUser,
      fetchTasksOfUser,
      tasks,
   };
};
