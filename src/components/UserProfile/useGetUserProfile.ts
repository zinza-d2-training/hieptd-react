import { PROJECTS } from 'fakeData/projects';
import { TASKS } from 'fakeData/tasks';
import { useEffect, useMemo, useState } from 'react';
import userService from 'services/user';
import { getUser } from 'utils/auth';
import { Role, User, UserProfileType } from 'utils/types';
interface GetUsersProfileProps {
   id: number;
}

export const useGetUserProfile = ({ id }: GetUsersProfileProps) => {
   const currentUser = getUser();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string>();
   const [user, setUser] = useState<User>();

   useEffect(() => {
      async function fetchData(id: number) {
         setLoading(true);
         try {
            const res = await userService.getUser(id);
            setUser(res['data'] as User);
         } catch (error) {
            setError(error as string);
         } finally {
            setTimeout(() => setLoading(false), 500);
         }
      }
      fetchData(id);
   }, [id]);

   let userProfile = useMemo<UserProfileType | undefined>(() => {
      if (user && currentUser) {
         return {
            ...user,
            projects: PROJECTS.filter((project) => {
               if (currentUser.role === Role.Admin) {
                  return (
                     (project.members &&
                        project.members.some((member) => member.id === id)) ||
                     project.pm?.id === id
                  );
               } else
                  return (
                     (project.members &&
                        project.members.some((member) => member.id === id)) ||
                     project.pm?.id === currentUser.id
                  );
            }),
            tasks: TASKS.filter((task) => {
               return currentUser.role === Role.Member
                  ? currentUser.id === id &&
                       (task.assignTo?.id === id ||
                          task.requestByUser.id === id)
                  : task.assignTo?.id === id || task.requestByUser.id === id;
            }),
         };
      }
      return undefined;
   }, [id, currentUser, user]);
   return { userProfile, error, loading };
};
