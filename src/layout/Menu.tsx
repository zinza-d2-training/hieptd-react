import React from 'react';
import { Link } from 'react-router-dom';
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
         <h1>Welcome to Dashboard</h1>
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
               <Link to="user">
                  <div className="menu__option-item">
                     <i className="fas fa-users"></i> Users
                  </div>
               </Link>
               <Link to="project">
                  <div className="menu__option-item">
                     <i className="fas fa-project-diagram"></i> Projects
                  </div>
               </Link>
            </div>
         </div>
      </div>
   );
}
