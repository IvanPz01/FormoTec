import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EquipmentForm from '../Components/EquipmentForm';
import '../EquipmentList.css'

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formEquipment, setFormEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          setIsAdmin(decoded.role === 'Admin');
        } catch (e) {
          console.error('Error decoding token', e);
        }
      }

      try {
        const res = await axios.get('http://localhost:5000/equipamiento/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEquipments(res.data);
      } catch (error) {
        console.error('Error fetching equipment', error);
      }
    };

    fetchEquipments();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/equipamiento/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEquipments(equipments.filter((equipment) => equipment.id !== id));
    } catch (error) {
      console.error('Error deleting equipment', error);
    }
  };

  const handleEdit = (equipment: Equipment) => {
    setFormEquipment(equipment);
    setShowForm(true);
  };

  const handleAdd = () => {
    setFormEquipment(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setFormEquipment(null);
    const fetchEquipments = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/equipamiento/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEquipments(res.data);
        } catch (error) {
          console.error('Error fetching equipment', error);
        }
      }
    };

    fetchEquipments();
  };

  return (
    <div className="container">
      <h2>Lista de Equipos</h2>
      {isAdmin && (
        <button onClick={handleAdd}>
          {showForm ? 'Cerrar Formulario' : 'Agregar'}
        </button>
      )}
      {showForm && <EquipmentForm onSuccess={handleFormSuccess} equipment={formEquipment} />}
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            <p>Nombre: {equipment.name}</p>
            <p>Descripción: {equipment.description}</p>
            <p>Estado: {equipment.status}</p>
            <p>Ubicación: {equipment.location}</p>
            <p>Fecha de Adquisición: {equipment.acquisitionDate}</p>
            {isAdmin && (
              <>
                <button onClick={() => handleEdit(equipment)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(equipment.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
