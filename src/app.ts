import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import EquipamientoRoutes from './routes/EquipmentRoutes';
import { createTables } from './config/migrations';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/equipamiento', EquipamientoRoutes);

const PORT = process.env.PORT || 5000;

createTables().then(() => {
    app.listen(PORT, () => {
        console.log(`El servidor está corriendo en el puerto ${PORT}`);
    });
});
