import { USERS } from 'fakeData/users';
import React from 'react';
import { User } from 'utils/types';
import './AddMember.scss';

interface AddMemberProps {
   listUsers: User[];
   setListUsers: (list: User[]) => void;
   listUsersInProject: User[];
   setListUsersInProject: (list: User[]) => void;
}

function AddMember({
   listUsers,
   setListUsers,
   setListUsersInProject,
   listUsersInProject,
}: AddMemberProps) {
   const handleRemoveUserFromArry = (item: User, array: User[]) => {
      const index = array.indexOf(item);
      if (index > -1) {
         array.splice(index, 1);
      }
   };

   const handleAddUser = (id: number) => {
      try {
         const user = listUsers.find((user) => user.id === id);
         if (user) {
            let oldListUsersInProject: User[] = [...listUsersInProject];
            oldListUsersInProject.push(user);
            setListUsersInProject(oldListUsersInProject);
            let oldListUsers: User[] = [...listUsers];
            handleRemoveUserFromArry(user, oldListUsers);
            setListUsers(oldListUsers);
         }
      } catch (error) {}
   };
   const handleRemoveUser = (id: number) => {
      try {
         const user = USERS.find((user) => user.id === id);
         if (user) {
            let oldListUsers: User[] = [...listUsers];
            oldListUsers.push(user);
            setListUsers(oldListUsers);
            let oldListUsersInProject: User[] = [...listUsersInProject];
            handleRemoveUserFromArry(user, oldListUsersInProject);
            console.log(oldListUsersInProject);
            setListUsersInProject(oldListUsersInProject);
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="addmember">
         <ul className="listmember">
            {listUsers.map((item) => (
               <li
                  key={item.id}
                  onClick={() => handleAddUser(item.id)}
               >{`${item.firstName} ${item.lastName}`}</li>
            ))}
         </ul>
         <div className="addmember__arrow">
            <i className="fas fa-arrows-alt-h"></i>
         </div>
         <ul className="listmember">
            {listUsersInProject.length !== 0 ? (
               listUsersInProject.map((item) => (
                  <li
                     key={item.id}
                     onClick={() => handleRemoveUser(item.id)}
                  >{`${item.firstName} ${item.lastName}`}</li>
               ))
            ) : (
               <div>No members yet</div>
            )}
         </ul>
      </div>
   );
}

export default AddMember;
