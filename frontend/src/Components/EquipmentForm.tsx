import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../EquipmentList.css'

interface Equipment {
  id: number;
  name: string;
  description: string;
  status: string;
  location: string;
  acquisitionDate: string;
}

interface EquipmentFormProps {
  onSuccess: () => void;
  equipment?: Equipment | null;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ onSuccess, equipment }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [acquisitionDate, setAcquisitionDate] = useState<string>('');

  useEffect(() => {
    if (equipment) {
      setName(equipment.name);
      setDescription(equipment.description);
      setStatus(equipment.status);
      setLocation(equipment.location);
      setAcquisitionDate(equipment.acquisitionDate);
    } else {
      // Reset form fields if no equipment is provided (for adding new equipment)
      setName('');
      setDescription('');
      setStatus('');
      setLocation('');
      setAcquisitionDate('');
    }
  }, [equipment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = equipment
      ? `http://localhost:5000/equipamiento/${equipment.id}`
      : 'http://localhost:5000/equipamiento';
    const method = equipment ? 'put' : 'post';
    
    try {
      await axios({
        method,
        url,
        data: { name, description, status, location, acquisitionDate },
        headers: { Authorization: `Bearer ${token}` },
      });
      onSuccess();
    } catch (error) {
      console.error('Error saving equipment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="equipment-form">
      <label className="form-label">
        Nombre:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="form-input"
        />
      </label>
      <label className="form-label">
        Descripción:
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          className="form-input"
        />
      </label>
      <label className="form-label">
        Estado:
        <input 
          type="text" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          required 
          className="form-input"
        />
      </label>
      <label className="form-label">
        Ubicación:
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
          className="form-input"
        />
      </label>
      <label className="form-label">
        Fecha de Adquisición:
        <input 
          type="date" 
          value={acquisitionDate} 
          onChange={(e) => setAcquisitionDate(e.target.value)} 
          required 
          className="form-input"
        />
      </label>
      <button type="submit" className="form-button">
        {equipment ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default EquipmentForm;
