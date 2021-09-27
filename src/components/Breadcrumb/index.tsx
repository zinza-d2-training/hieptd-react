import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

interface BreadcrumbProps {
   listLink: {
      link: string;
      name: string;
   }[];
}

function Breadcrumb({ listLink }: BreadcrumbProps) {
   return (
      <div className="breadcrumb">
         {listLink.map((item, index) => (
            <span key={index}>
               <Link to={item.link}>{item.name}</Link> /
            </span>
         ))}
      </div>
   );
}

export default Breadcrumb;
