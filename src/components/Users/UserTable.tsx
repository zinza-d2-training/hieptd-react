import CircleLoading from 'components/Loading/CircleLoading';
import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, UserStatus } from 'utils/types';
import './styles/Users.scss';
import { useApiUser } from './useApiUser';
import { toast } from 'react-toastify';
interface TableUserProps {
   data: User[];
   refetch: (page?: number) => void;
}

function UserTable({ data, refetch }: TableUserProps) {
   const [deletingUser, setDeletingUser] = useState<User | undefined>();
   const [updateUser, setUpdateUser] = useState<User | undefined>();
   const [newStatus, setNewStatus] = useState<UserStatus | undefined>();
   const { loading, editUser, deleteUser } = useApiUser();

   // show modal
   const handleChangeActive = (e, user: User) => {
      const value = e?.target.value;
      if (+value !== user.status) {
         setNewStatus(value as UserStatus);
         setUpdateUser({ ...user, status: value as UserStatus });
      } else return;
   };
   // confirm change
   const handleConfirmEditUser = async () => {
      if (updateUser?.id && newStatus) {
         try {
            const response = await editUser(updateUser.id, updateUser);
            if (response) {
               setUpdateUser(undefined);
               toast.success('Update user status successfully!');
               refetch(1);
            }
         } catch (e) {
            toast.error(e as string);
            console.log(e);
         }
      }
   };

   const handleConfirmDelete = async () => {
      if (deletingUser?.id) {
         try {
            const response = await deleteUser(deletingUser.id);
            if (response) {
               // use Toast here
               toast.success('Delete User successfully!');
               setDeletingUser(undefined);
               refetch(1);
            }
         } catch (e) {
            toast.error(e as string);
            console.log(e);
         }
      }
   };

   if (loading) {
      return <CircleLoading />;
   }

   return (
      <>
         <ModalConfirm
            show={!!updateUser}
            onClose={() => setUpdateUser(undefined)}
            handleConfirm={() => handleConfirmEditUser()}
            title="Confirm Change"
            content={`Are you sure you want to change ?`}
         />
         <ModalConfirm
            show={!!deletingUser}
            onClose={() => setDeletingUser(undefined)}
            handleConfirm={() => handleConfirmDelete()}
            title="Confirm Delete"
            content={`Are you sure you want to delete ?`}
         />
         <div className="table">
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>DateOfBirth</th>
                     <th>Role</th>
                     <th>Status</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {data.length > 0 ? (
                     data.map((user) => (
                        <tr key={user.id}>
                           <td>
                              <Link
                                 to={`/users/${user.id}/details`}
                              >{`${user.firstName} ${user.lastName}`}</Link>
                           </td>
                           <td>{user.email}</td>
                           <td>{user.dateOfBirth}</td>
                           <td>{user.role}</td>

                           <td className="td-active">
                              <select
                                 onChange={(e) => handleChangeActive(e, user)}
                                 value={user.status}
                              >
                                 {user.status ? (
                                    <>
                                       <option value={UserStatus.active}>
                                          Active
                                       </option>
                                       <option value={UserStatus.inactive}>
                                          Inactive
                                       </option>
                                    </>
                                 ) : (
                                    <>
                                       <option value={UserStatus.inactive}>
                                          Inactive
                                       </option>
                                       <option value={UserStatus.active}>
                                          Active
                                       </option>
                                    </>
                                 )}
                              </select>
                           </td>

                           <td className="user__edit">
                              <span className="user__edit-edit">
                                 <Link to={`/users/${user.id}/update`}>
                                    <i className="fas fa-edit"></i>
                                 </Link>
                              </span>{' '}
                              <span
                                 onClick={() => {
                                    setDeletingUser(user);
                                 }}
                                 className="user__edit-delete"
                              >
                                 <i className="fas fa-trash-alt"></i>
                              </span>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <div className="table__notfound">
                        There are no user found!
                     </div>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
}

export default UserTable;
