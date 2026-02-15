const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Carga las variables del .env como DB_PASS

const app = express();

// Middleware para entender JSON (vital para recibir datos de Postman)
app.use(express.json());

// Uso de las rutas de autenticación con el prefijo solicitado
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar modelos con la base de datos y arrancar el servidor
db.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor funcionando en: http://localhost:${PORT}`);
            console.log('✅ Conexión exitosa a MySQL: proyecto_login');
        });
    })
    .catch(err => {
        console.error('❌ Error fatal al conectar la base de datos:', err);
    });