import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

interface BreadcrumbProps {
   listLink: string[];
}

function Breadcrumb({ listLink }: BreadcrumbProps) {
   return (
      <div className="breadcrumb">
         {listLink.map((link: string) => (
            <span>
               <Link to={link}>{link}</Link> /
            </span>
         ))}
      </div>
   );
}

export default Breadcrumb;
