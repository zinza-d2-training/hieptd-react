import React, { useMemo, useState } from 'react';
import { User } from 'utils/types';
import './styles.scss';

interface ProjectMembersFieldProps {
   allUsers: User[];
   value: User[];
   onChange: (user: User[]) => void;
}

const sortByName = (a: User, b: User) => {
   const aName = `${a.firstName} ${a.lastName} (${a.email})`;
   const bName = `${b.firstName} ${b.lastName} (${b.email})`;
   if (aName < bName) {
      return -1;
   }
   if (aName > bName) {
      return 1;
   }
   return 0;
};

function ProjectMembersField({
   allUsers,
   onChange,
   value,
}: ProjectMembersFieldProps) {
   const availableMembers = useMemo(() => {
      return allUsers
         .filter((item) => {
            return !value.some((user) => user.id === item.id);
         })
         .sort(sortByName);
   }, [allUsers, value]);
   const sortedValue = useMemo(() => {
      return value.sort(sortByName);
   }, [value]);

   const [selectedAvailableMemberIds, setSelectedAvailableMemberIds] = useState<
      number[]
   >([]);

   const [selectedPickedMemberIds, setSelectedPickedMemberIds] = useState<
      number[]
   >([]);

   const selectedAvailableMembers = useMemo(() => {
      return allUsers.filter((user) =>
         selectedAvailableMemberIds.includes(+user.id!)
      );
   }, [allUsers, selectedAvailableMemberIds]);

   const addMembers = () => {
      onChange([...value, ...selectedAvailableMembers]);
      setSelectedAvailableMemberIds([]);
   };

   const removeMembers = () => {
      onChange(
         value.filter((user) => !selectedPickedMemberIds.includes(+user.id!))
      );
      setSelectedPickedMemberIds([]);
   };

   return (
      <div className="memberSwitcher">
         <div className="switcherControl">
            <label htmlFor="unPicked">Available Members:</label>

            <select
               className="switcherMembersSelect"
               name="availableMembers"
               id="unPicked"
               multiple
               value={selectedAvailableMemberIds.map((id) => '' + id)}
               onChange={(e) => {
                  let value = Array.from(
                     e.target.selectedOptions,
                     (option) => option.value
                  );
                  setSelectedAvailableMemberIds(value.map((id) => Number(id)));
               }}
            >
               {availableMembers.map((member) => {
                  return (
                     <option
                        key={member.id}
                        value={member.id}
                     >{`${member.firstName} ${member.lastName} (${member.email})`}</option>
                  );
               })}
            </select>
         </div>
         <div className="switcherButtonGroup">
            <button
               onClick={() => {
                  setSelectedAvailableMemberIds([]);
                  setSelectedPickedMemberIds([]);
               }}
               disabled={
                  !selectedAvailableMemberIds.length &&
                  !selectedPickedMemberIds.length
               }
            >
               <i className="fas fa-circle-notch"></i>
            </button>
            <button
               onClick={addMembers}
               disabled={!selectedAvailableMemberIds.length}
            >
               <i className="fas fa-arrow-right"></i>
            </button>
            <button
               onClick={removeMembers}
               disabled={!selectedPickedMemberIds.length}
            >
               <i className="fas fa-arrow-left"></i>
            </button>
         </div>
         <div className="switcherControl">
            <label htmlFor="picked">Selected Members:</label>

            <select
               className="switcherMembersSelect"
               name="pickedMembers"
               id="picked"
               multiple
               value={selectedPickedMemberIds.map((id) => '' + id)}
               onChange={(e) => {
                  let value = Array.from(
                     e.target.selectedOptions,
                     (option) => option.value
                  );
                  setSelectedPickedMemberIds(value.map((id) => Number(id)));
               }}
            >
               {sortedValue.map((member) => {
                  return (
                     <option
                        onClick={(e) => {}}
                        key={member.id}
                        value={member.id}
                     >{`${member.firstName} ${member.lastName} (${member.email})`}</option>
                  );
               })}
            </select>
         </div>
      </div>
   );
}

export default ProjectMembersField;
