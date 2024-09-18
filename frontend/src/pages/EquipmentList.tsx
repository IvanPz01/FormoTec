import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Equipment {
  id: number;
  name: string;
  description: string;
  status: string;
  location: string;
  acquisitionDate: string;
}

const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/equipments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEquipments(res.data);
    };

    fetchEquipments();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/equipments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEquipments(equipments.filter((equipment) => equipment.id !== id));
    } catch (error) {
      console.error('Error al eliminar el equipo', error);
    }
  };

  return (
    <div>
      <h2>Lista de Equipos</h2>
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            <p>Nombre: {equipment.name}</p>
            <p>Descripción: {equipment.description}</p>
            <p>Estado: {equipment.status}</p>
            <p>Ubicación: {equipment.location}</p>
            <p>Fecha de Adquisición: {equipment.acquisitionDate}</p>
            <button onClick={() => handleDelete(equipment.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;

