import { PROJECTS } from 'fakeData/projects';
import { TASKS } from 'fakeData/tasks';
import { USERS } from 'fakeData/users';
import { useMemo } from 'react';
import { getUser } from 'utils/auth';
import { Role, UserProfileType } from 'utils/types';

interface GetUsersProfileProps {
   paramsId: number;
}

export const useGetUserProfile = ({
   paramsId,
}: GetUsersProfileProps): UserProfileType | undefined => {
   const currentUser = getUser();
   return useMemo<UserProfileType | undefined>(() => {
      const user = USERS.find((item) => item.id === paramsId);
      if (user && currentUser) {
         return {
            ...user,
            projects: PROJECTS.filter(
               (project) =>
                  (project.members &&
                     project.members.some(
                        (member) => member.id === paramsId
                     )) ||
                  project.pm?.id === currentUser.id
            ),
            tasks: TASKS.filter((task) => {
               if (currentUser.role === Role.Admin) {
                  return true;
               }
               return (
                  task.assign?.id === currentUser.id ||
                  task.requestByUser.id === currentUser.id
               );
            }),
         };
      }
      return undefined;
   }, [paramsId, currentUser]);
};
