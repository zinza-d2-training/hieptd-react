import { PROJECTS } from 'fakeData/projects';
import { TASKS } from 'fakeData/tasks';
import { USERS } from 'fakeData/users';
import { useMemo } from 'react';
import { getUser } from 'utils/auth';
import { Role, UserProfileType } from 'utils/types';

export const useGetUserProfile = (id: number): UserProfileType | undefined => {
   const currentUser = getUser();
   return useMemo<UserProfileType | undefined>(() => {
      const user = USERS.find((item) => item.id === id);
      if (user && currentUser) {
         return {
            ...user,
            projects: PROJECTS.filter(
               (project) =>
                  (project.members &&
                     project.members.some((member) => member.id === id)) ||
                  project.pm?.id === currentUser.id
            ),
            tasks: TASKS.filter((task) => {
               return currentUser.role === Role.Member
                  ? currentUser.id === id &&
                       (task.assign?.id === id || task.requestByUser.id === id)
                  : task.assign?.id === id || task.requestByUser.id === id;
            }),
         };
      }
      return undefined;
   }, [id, currentUser]);
};
