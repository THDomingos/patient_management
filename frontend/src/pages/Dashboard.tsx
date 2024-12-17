import React from 'react';
import Navbar from '../components/Navbar.tsx';
import PatientList from '../components/Patient/PatientList.tsx';

const Dashboard: React.FC = () => (
  <div>
    <Navbar />
    <PatientList />
  </div>
);

export default Dashboard;
