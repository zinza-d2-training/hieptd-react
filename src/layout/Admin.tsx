import { useVisible } from 'hooks';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from 'utils/auth';
import './Admin.scss';
import Menu from './Menu';

interface Props {
   children: React.ReactNode;
}

const Admin = ({ children }: Props) => {
   const { user: currentUser } = useCurrentUser();

   const [showMenuMobile, setShowMenuMobile] = useState(false);
   const { ref, isVisible, setIsVisible } = useVisible(false);
   return (
      <>
         {showMenuMobile && (
            <div
               className="menu__mobile-overlay"
               onClick={() => setShowMenuMobile(false)}
            ></div>
         )}
         <div className="admin">
            <div>
               <div className="dashboard">
                  <div className="dashboard__nav">
                     <div className="dashboard__left">
                        <label htmlFor="menu">
                           <i
                              className="fas fa-bars"
                              onClick={() => setShowMenuMobile(true)}
                           ></i>
                        </label>
                     </div>
                     <div className="dashboard__right">
                        <i className="fas fa-bell showMess">
                           <div className="dashboard__message">
                              <span className="dashboard__header">
                                 Notifications
                              </span>
                              <div className="dashboard__message-list">
                                 <div className="dashboard__message-item dashboard__message-item--read">
                                    Hello, your notification message is
                                    available
                                 </div>
                                 <div className="dashboard__message-item">
                                    Hello, your notification message is
                                    available
                                 </div>
                              </div>
                              <div className="dashboard__message-options">
                                 <div>Mark all as read</div>
                                 <div>View all notifications</div>
                              </div>
                           </div>
                        </i>

                        <div
                           onClick={() => setIsVisible(!isVisible)}
                           className="dashboard__user-header"
                        >
                           {currentUser?.avatar ? (
                              <img
                                 src={`${process.env.REACT_APP_BASEURL}${currentUser.avatar}`}
                                 alt="user-avt"
                              />
                           ) : (
                              <img
                                 src="https://upload.wikimedia.org/wikipedia/commons/6/6b/G-Dragon_Infinite_Challenge_2015.jpg"
                                 alt="user-avt"
                              />
                           )}
                           <div className="dashboard__user-name">
                              {currentUser &&
                                 ` ${currentUser?.firstName} ${currentUser?.lastName}`}
                           </div>
                        </div>
                        {isVisible && (
                           <div ref={ref} className="dashboard__user">
                              <div className="dashboard__user-list">
                                 {' '}
                                 <div className="dashboard__user-item">
                                    <Link to={`/users/change-pass`}>
                                       Change password
                                    </Link>
                                 </div>
                                 <div
                                    className="dashboard__user-item"
                                    onClick={() => logout()}
                                 >
                                    Logout
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <Menu classMobile={`${showMenuMobile && 'menu__mobile'}`} />
            </div>
            <div className="dashboard__children"> {children}</div>
         </div>
      </>
   );
};

export default Admin;
