import React from 'react';
import { NavLink } from 'react-router-dom';
import './Admin.scss';
import { getUser } from 'utils/auth';

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
                     color: 'black',
                     fontWeight: 'bold',
                     cursor: 'default',
                  }}
               >
                  <div className="menu__option-item">
                     <i className="fas fa-chalkboard-teacher"></i> Dashboard
                  </div>
               </NavLink>
               <NavLink
                  to="/user"
                  exact
                  activeStyle={{
                     color: 'black',
                     fontWeight: 'bold',
                     cursor: 'default',
                  }}
               >
                  <div className="menu__option-item">
                     <i className="fas fa-users"></i> Users
                  </div>
               </NavLink>
               <NavLink
                  to="project"
                  exact
                  activeStyle={{
                     color: 'black',
                     fontWeight: 'bold',
                     cursor: 'default',
                  }}
               >
                  <div className="menu__option-item">
                     <i className="fas fa-project-diagram"></i> Projects
                  </div>
               </NavLink>
            </div>
         </div>
      </div>
   );
}
