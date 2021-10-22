import React from 'react';
import './Loading.scss';
function CircleLoading() {
   return (
      <div className="loading__wrap">
         <div className="loading__circle"></div>
         <div className="loading__text">Loading...</div>
      </div>
   );
}

export default CircleLoading;
