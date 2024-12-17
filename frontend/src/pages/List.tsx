import React from 'react';
import Navbar from '../components/Navbar.tsx';
import PatientForm from '../components/Patient/PatientForm.tsx';

const List: React.FC = () => (
  <div>
    <Navbar />
    <PatientForm />
  </div>
);

export default List;