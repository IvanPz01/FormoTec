import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  name: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name: formData.name,
        password: formData.password,
      });

      if (response.status === 201) {
        // Crear token
        const loginResponse = await axios.post('http://localhost:5000/auth/login', {
          name: formData.name,
          password: formData.password,
        });

        localStorage.setItem('token', loginResponse.data.token);

        setSuccess('Usuario registrado exitosamente');
        setFormData({
          name: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/equipments');
      }
    } catch (err) {
      setError('Error en el registro. Intente nuevamente.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <label>
          Nombre de Usuario:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirmar Contraseña:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Registrar</button>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </form>
    </div>
  );
};

export default Register;
