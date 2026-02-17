import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON (Obligatorio para recibir req.body)
app.use(express.json()); 

// --- DEFINICIÓN DE RUTAS ---
// Prefijo principal para el módulo de autenticación
app.use('/api/auth', authRoutes);

// --- MANEJO DE ERROR 404 (Ruta no encontrada) ---
// Este middleware captura cualquier petición a una URL que no esté definida arriba
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: "La ruta solicitada no existe en el servidor."
    });
});

// --- MANEJO DE ERROR 500 (Opcional: Capturador global de excepciones) ---
// Actúa como red de seguridad si un error no fue capturado por un try/catch
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        ok: false,
        message: "Ha ocurrido un error interno en el servidor.",
        error: err.message
    });
});

// Exportación por defecto para server.js
export default app;