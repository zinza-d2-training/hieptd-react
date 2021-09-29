import { PROJECTS } from 'fakeData/projects';
import { TASKS } from 'fakeData/tasks';
import { USERS } from 'fakeData/users';
import { useMemo } from 'react';
import { getUser } from 'utils/auth';
import { UserProfileType } from 'utils/types';

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
                  (project.pm?.id === currentUser.id &&
                     project.members &&
                     project.members.some((member) => member.id === paramsId))
            ),
            tasks: TASKS.filter((task) => {
               return (
                  task.assign?.id === paramsId ||
                  task.requestByUser.id === paramsId
               );
            }),
         };
      }
      return undefined;
   }, [paramsId, currentUser]);
};
