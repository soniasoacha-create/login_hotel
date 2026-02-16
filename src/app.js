import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(express.json()); // Middleware obligatorio

// Rutas
app.use('/api/auth', authRoutes);

// Exportación por defecto para que server.js lo reconozca
export default app;