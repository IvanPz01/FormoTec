import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import EquipmentList from './pages/EquipmentList.tsx';
import Register from './pages/Register.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/equipments" element={<EquipmentList />} />
      <Route path="/" element={<Register />} />
    </Routes>
  </Router>
);
};

export default App;
