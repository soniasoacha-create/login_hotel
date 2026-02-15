const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargamos variables de entorno (.env) para seguridad

// Creamos la conexión con los datos de tu MySQL Workbench
const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Evita llenar la consola con comandos SQL
    }
);

module.exports = db;