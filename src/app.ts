import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import EquipamientoRoutes from './routes/EquipmentRoutes';


dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/equipamiento', EquipamientoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});