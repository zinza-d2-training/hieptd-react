import CircleLoading from 'components/Loading/CircleLoading';
import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, UserStatus } from 'utils/types';
import './styles/Users.scss';
import { useApiUser } from '../../hooks/useApiUser';
import { toast } from 'react-toastify';
interface TableUserProps {
   data: User[];
   refetch: (page?: number) => void;
}

function UserTable({ data, refetch }: TableUserProps) {
   const [deletingUser, setDeletingUser] = useState<User | undefined>();
   const [updateUser, setUpdateUser] = useState<User | undefined>();
   const [newStatus, setNewStatus] = useState<UserStatus | undefined>();
   const { loading, editUser, deleteUser, deleteUsers } = useApiUser();
   const [selectedRows, setSelectedRows] = useState<number[]>([]);
   const [showModalDeleteUsers, setShowModalDeleteUsers] =
      useState<boolean>(false);

   // handle multiple rows selection
   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      if (checked) {
         setSelectedRows(data.map((user) => Number(user.id!)));
      } else {
         setSelectedRows([]);
      }
   };
   // handle one row selection
   const handleSelectRow = (
      e: React.ChangeEvent<HTMLInputElement>,
      id: number
   ) => {
      const { checked } = e.target;
      if (checked) {
         setSelectedRows([...selectedRows, id]);
      } else {
         setSelectedRows(selectedRows.filter((row) => row !== id));
      }
   };

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
         }
      }
   };

   // handle confirm delete multiple users
   const handleConfirmDeleteUsers = async () => {
      if (selectedRows.length > 0) {
         try {
            const response = await deleteUsers(selectedRows);
            if (response) {
               toast.success('Delete Users successfully!');
               setSelectedRows([]);
               refetch(1);
            }
         } catch (e) {
            toast.error(e as string);
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
         <ModalConfirm
            show={showModalDeleteUsers}
            onClose={() => setShowModalDeleteUsers(false)}
            handleConfirm={() => handleConfirmDeleteUsers()}
            title="Confirm Delete"
            content={`Are you sure you want to delete ?`}
         />
         <div className="table">
            {selectedRows.length > 0 && (
               <div className="table-select">
                  <span>{selectedRows.length} Selected</span>
                  <button onClick={() => setShowModalDeleteUsers(true)}>
                     Delete
                  </button>
               </div>
            )}
            <table>
               <thead>
                  <tr>
                     <th className="th-checkbox">
                        <input
                           type="checkbox"
                           onChange={handleSelectAll}
                           checked={selectedRows.length > 0}
                        />
                     </th>
                     <th className="th-name">Name</th>
                     <th>Email</th>
                     <th>DateOfBirth</th>
                     <th>Role</th>
                     <th>Status</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((user) => (
                     <tr key={user.id}>
                        <td className="td-checkbox">
                           <input
                              type="checkbox"
                              onChange={(e) =>
                                 handleSelectRow(e, Number(user.id!))
                              }
                              checked={selectedRows.includes(Number(user.id!))}
                           />
                        </td>
                        <td className="td-name">
                           <Link
                              to={`/users/${user.id}/details`}
                           >{`${user.firstName} ${user.lastName}`}</Link>
                        </td>
                        <td>{user.email}</td>
                        <td className="td-date">{user.dateOfBirth}</td>
                        <td className="td-role">{user.role}</td>

                        <td className="td-active">
                           <select
                              className={`${
                                 user.status === UserStatus.active
                                    ? 'active'
                                    : 'inactive'
                              }`}
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
                              <Link
                                 className="edit--link"
                                 to={`/users/${user.id}/update`}
                              >
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
                  ))}
                  {data.length === 0 && (
                     <tr>
                        <td colSpan={6}>There are no user found!</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
}

export default UserTable;
