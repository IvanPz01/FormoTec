import React, { useState } from 'react';
import axios from 'axios';

interface EquipmentFormProps {
  onSuccess: () => void;
  existingEquipment?: {
    id: number;
    name: string;
    description: string;
    status: string;
    location: string;
    acquisitionDate: string;
  };
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ onSuccess, existingEquipment }) => {
  const [name, setName] = useState(existingEquipment?.name || '');
  const [description, setDescription] = useState(existingEquipment?.description || '');
  const [status, setStatus] = useState(existingEquipment?.status || '');
  const [location, setLocation] = useState(existingEquipment?.location || '');
  const [acquisitionDate, setAcquisitionDate] = useState(existingEquipment?.acquisitionDate || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (existingEquipment) {
        await axios.put(`http://localhost:3000/equipments/${existingEquipment.id}`, {
          name, description, status, location, acquisitionDate
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:3000/equipments', {
          name, description, status, location, acquisitionDate
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Error al guardar el equipo', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{existingEquipment ? 'Actualizar Equipo' : 'Agregar Nuevo Equipo'}</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Estado"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="date"
        value={acquisitionDate}
        onChange={(e) => setAcquisitionDate(e.target.value)}
      />
      <button type="submit">{existingEquipment ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default EquipmentForm;
