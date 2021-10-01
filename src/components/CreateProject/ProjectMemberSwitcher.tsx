import { USERS } from 'fakeData/users';
import React, { useEffect, useMemo, useState } from 'react';
import { User } from 'utils/types';
import './ProjectMemberSwitcher.scss';

interface ProjectMemberSwitcherProps {
   allUsers: User[];
   onChange: (user: User[]) => void;
}

function ProjectMemberSwitcher({
   allUsers,
   onChange,
}: ProjectMemberSwitcherProps) {
   const [value, setValue] = useState<User[]>([]);
   const [userSelected, setUserSelected] = useState<Number[]>([]);
   let listSelected = useMemo(() => [...userSelected], [userSelected]);

   useEffect(() => {
      if (value.length !== 0) {
         onChange(value);
      }
      // eslint-disable-next-line
   }, [value]);

   function handleRemoveUserFromArry<T>(item: T, array: T[]): void {
      const index = array.indexOf(item);
      if (index > -1) {
         array.splice(index, 1);
      }
   }
   // onChange seletc user
   const handleOnChange = (id) => {
      try {
         if (id) {
            let _userSelected = [...userSelected];
            const _id = Number(id);

            const check = _userSelected.findIndex((item) => item === _id);
            if (check === -1) {
               _userSelected.push(_id);
            } else {
               handleRemoveUserFromArry(_id, _userSelected);
            }
            setUserSelected(_userSelected);
         }
      } catch (error) {
         console.error(error);
      }
   };
   //handle switcher
   const handleSwitcher = (type: string) => {
      if (type === 'left') {
         let _value: User[] = [...value];
         listSelected.forEach((id) => {
            const user = USERS.find((user) => user.id === id)!;
            handleRemoveUserFromArry(user, _value);
            allUsers.push(user);
         });
         setValue(_value);
         setUserSelected([]);
      }
      if (type === 'right') {
         let _value: User[] = [];
         listSelected.forEach((id) => {
            const user = USERS.find((user) => user.id === id)!;
            _value.push(user);
            handleRemoveUserFromArry(user, allUsers);
         });
         _value = [...new Set(_value.concat(value))];
         setValue(_value);
         setUserSelected([]);
      }
   };

   return (
      <div className="memberSwitcher">
         <div className="memberSwitcher__left">
            <div className="memberSwitcher__list">
               {allUsers.map((user) => (
                  <div
                     className={`${
                        listSelected.includes(user.id) ? 'active' : 'inactive'
                     } memberSwitcher__item`}
                     onClick={() => handleOnChange(user.id)}
                     key={user.id}
                  >{`${user.firstName} ${user.lastName}`}</div>
               ))}
            </div>
         </div>
         <div className="memberSwitcher__center">
            <i
               className="fas fa-circle-notch"
               onClick={() => setUserSelected([])}
            ></i>

            <i
               className="fas fa-arrow-right"
               onClick={() => handleSwitcher('right')}
            ></i>
            <i
               className="fas fa-arrow-left"
               onClick={() => handleSwitcher('left')}
            ></i>
         </div>
         <div className="memberSwitcher__right">
            <div className="memberSwitcher__list">
               {value.map((user) => (
                  <div
                     className={`${
                        listSelected.includes(user.id) ? 'active' : 'inactive'
                     } memberSwitcher__item`}
                     onClick={() => handleOnChange(user.id)}
                     key={user.id}
                  >{`${user.firstName} ${user.lastName}`}</div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ProjectMemberSwitcher;
