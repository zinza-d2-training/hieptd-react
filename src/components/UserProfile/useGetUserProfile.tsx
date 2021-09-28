import { PROJECTS } from 'fakeData/projects';
import { TASKS } from 'fakeData/tasks';
import { USERS } from 'fakeData/users';
import { useMemo } from 'react';
import { getUser } from 'utils/auth';
import { Project, Task, User, UserProfileType } from 'utils/types';

interface GetUsersProfileProps {
   id: number;
}
type ListRender = {
   tasks?: Task[];
   projects?: Project[];
};

export const useGetUserProfile = ({ id }: GetUsersProfileProps) => {
   const currentUser = getUser();

   let userProfile = useMemo<UserProfileType | undefined>(() => {
      if (id) {
         const listTasks: number[] = [],
            listProjects: number[] = [];
         const user: User = USERS.find((item) => item.id === id)!;
         PROJECTS.map(
            (item) => item.memberId.includes(id) && listProjects.push(item.id)
         );
         TASKS.map((item) => item.userId === id && listTasks.push(item.id));

         if (user) {
            return {
               email: user.email,
               username: user.username,
               firstName: user.firstName,
               lastName: user.lastName,
               password: user.password,
               dateOfBirth: user.dateOfBirth,
               role: user.role,
               id: user.id,
               avatar: user.avatar,
               active: user.active,
               listProjects: listProjects,
               listTasks: listTasks,
            };
         }
      }
      return undefined;
   }, [id]);

   const { listProjects, listTasks } = userProfile!;

   let listRender = useMemo<ListRender>(() => {
      let result: ListRender = {};

      // role as Admin
      if (currentUser?.role === 'admin') {
         if (listTasks) {
            const res = TASKS.filter((task) => listTasks.includes(task.id));
            if (res) {
               result.tasks = res;
            }
         }
         if (listProjects) {
            const res = PROJECTS.filter((project) =>
               listProjects.includes(project.id)
            );
            if (res) {
               result.projects = res;
            }
         }
      }
      // role as Member or PM
      else {
         if (listTasks) {
            const res = TASKS.filter((task) => listTasks.includes(task.id));
            if (res) {
               result.tasks = res;
            }
         }
         if (listProjects) {
            const idFromParam = id;
            const res = PROJECTS.filter((project) => {
               if (currentUser) {
                  // show profile of user in login
                  if (currentUser.id === idFromParam) {
                     return listProjects.includes(project.id);
                  }
                  // show info of other users with same project as user
                  else
                     return (
                        listProjects.includes(project.id) &&
                        project.memberId.includes(currentUser.id) &&
                        project.memberId.includes(idFromParam)
                     );
               }
               return false;
            });
            if (res) {
               result.projects = res;
            }
         }
      }

      return result;
   }, [listTasks, listProjects, currentUser, id]);
   return { userProfile, listRender, currentUser };
};
