import React from 'react';
import { NavLink } from 'react-router-dom';
import './Admin.scss';
import { getUser } from 'utils/auth';
import { Role } from 'utils/types';

interface PropsMenu {
   classMobile: string;
}

export default function Menu(props: PropsMenu) {
   const { classMobile } = props;
   const currentUser = getUser();
   return (
      <div className={`menu ${classMobile}`}>
         <h1>Welcome to ZinZa</h1>
         <div className="menu__user">
            <img
               src="https://upload.wikimedia.org/wikipedia/commons/6/6b/G-Dragon_Infinite_Challenge_2015.jpg"
               alt="user-avt"
            />
            <div className="menu__user-name">
               {currentUser &&
                  ` ${currentUser?.firstName} ${currentUser?.lastName}`}
               <p>{currentUser && currentUser.email}</p>
            </div>
         </div>
         <div className="menu__option">
            <div className="menu__option-menu">
               <NavLink
                  to="/"
                  exact
                  activeStyle={{
                     color: '#fff',
                     fontWeight: 'bold',
                     cursor: 'default',
                     display: 'block',
                     background: 'rgba(255,255,255,0.04)',
                  }}
               >
                  <div className="menu__option-item">
                     <i className="fas fa-chalkboard-teacher"></i> Dashboard
                  </div>
               </NavLink>
               {currentUser && currentUser.role === Role.Admin && (
                  <NavLink
                     to="/users"
                     exact
                     activeStyle={{
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'default',
                        display: 'block',
                        background: 'rgba(255,255,255,0.04)',
                     }}
                  >
                     <div className="menu__option-item">
                        <i className="fas fa-users"></i> Users
                     </div>
                  </NavLink>
               )}
               {currentUser && currentUser.role !== Role.Admin && (
                  <>
                     <NavLink
                        to={`/users/${currentUser.id}/details`}
                        exact
                        activeStyle={{
                           color: '#fff',
                           fontWeight: 'bold',
                           cursor: 'default',
                           display: 'block',
                           background: 'rgba(255,255,255,0.04)',
                        }}
                     >
                        <div className="menu__option-item">
                           <i className="fas fa-user"></i> Detail
                        </div>
                     </NavLink>{' '}
                     <NavLink
                        to={`/users/projects`}
                        exact
                        activeStyle={{
                           color: '#fff',
                           fontWeight: 'bold',
                           cursor: 'default',
                           display: 'block',
                           background: 'rgba(255,255,255,0.04)',
                        }}
                     >
                        <div className="menu__option-item">
                           <i className="fas fa-clipboard-list"></i> List
                           Projects
                        </div>
                     </NavLink>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
