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
         {listLink.map((item, index) =>
            index === listLink.length - 1 ? (
               <span key={index}>
                  <Link to={item.link} className="link__disabled">
                     {item.name}
                  </Link>
               </span>
            ) : (
               <span key={index}>
                  <Link to={item.link}>{item.name}</Link> /&nbsp;
               </span>
            )
         )}
      </div>
   );
}

export default Breadcrumb;
