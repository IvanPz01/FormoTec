import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import EquipmentList from './pages/EquipmentList.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/equipments" element={<EquipmentList />} />
      </Routes>
    </Router>
  );
};

export default App;
