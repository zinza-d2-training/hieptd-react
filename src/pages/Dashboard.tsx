import React from 'react';
import { useTitle } from 'hooks/useTitle';

function Dashboard() {
   useTitle('Dashboard');
   return <div className="Dashboard">Dashboard</div>;
}

export default Dashboard;
