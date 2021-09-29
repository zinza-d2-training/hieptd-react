import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
   return (
      <div className="NotFoundPage">
         <h1>NotFoundPage</h1>
         <Link to="/">Back to Dashboard</Link>
      </div>
   );
}

export default NotFoundPage;
