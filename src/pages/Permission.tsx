import React from 'react';
import './styles/Permission.scss';

function Permission() {
   return (
      <div className="permission">
         <h1>You do not have permission</h1>
         <p>Please Logout and Login as Admin to see more</p>
      </div>
   );
}

export default Permission;
