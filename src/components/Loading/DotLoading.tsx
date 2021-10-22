import React from 'react';
import './Loading.scss';
function DotLoading() {
   return (
      <div className="loading__global">
         <div className="loading__global-dot loading__global-dot--1"></div>
         <div className="loading__global-dot loading__global-dot--2"></div>
         <div className="loading__global-dot loading__global-dot--3"></div>
      </div>
   );
}

export default DotLoading;
