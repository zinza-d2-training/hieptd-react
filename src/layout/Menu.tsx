import { useCurrentUser } from 'hooks/useCurrentUser';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Role } from 'utils/types';
import './Admin.scss';
import dashboard from 'assets/dashboard.png';

interface PropsMenu {
   classMobile: string;
}

const linkActiveStyle: React.CSSProperties = {
   color: '#FFFFFF',
   cursor: 'default',
   display: 'block',
   background: '#46546C',
};

export default function Menu(props: PropsMenu) {
   const { classMobile } = props;
   const { user: currentUser } = useCurrentUser();
   return (
      <div className={`menu ${classMobile}`}>
         <h1>Welcome to ZinZa</h1>
         <div className="menu__user">
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
            <div className="menu__user-name">
               {currentUser &&
                  ` ${currentUser?.firstName} ${currentUser?.lastName}`}
               <p>{currentUser && currentUser.email}</p>
            </div>
         </div>
         <div className="menu__option">
            <div className="menu__option-menu">
               <NavLink to="/" exact activeStyle={linkActiveStyle}>
                  <div className="menu__option-item">
                     <img src={dashboard} alt="dashboard-icon" /> Dashboard
                  </div>
               </NavLink>
               {currentUser && currentUser.role === Role.Admin && (
                  <NavLink to="/users" exact activeStyle={linkActiveStyle}>
                     <div className="menu__option-item">
                        <i className="fas fa-users"></i> Users
                     </div>
                  </NavLink>
               )}
               {currentUser && currentUser.role !== Role.Admin && (
                  <NavLink
                     to={`/users/${currentUser.id}/details`}
                     exact
                     activeStyle={linkActiveStyle}
                  >
                     <div className="menu__option-item">
                        <i className="fas fa-user"></i> Detail
                     </div>
                  </NavLink>
               )}

               <NavLink to={`/projects`} exact activeStyle={linkActiveStyle}>
                  <div className="menu__option-item">
                     <i className="fas fa-clipboard-list"></i> Projects
                  </div>
               </NavLink>
            </div>
         </div>
      </div>
   );
}
