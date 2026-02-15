const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
    id_usuario: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombres: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: false },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true // Requisito: email único [cite: 54]
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false // Aquí guardaremos el hash de bcrypt [cite: 24, 55]
    },
    tipo_usuario: { 
        type: DataTypes.ENUM('admin', 'moderador', 'cliente'), 
        defaultValue: 'cliente' 
    }
}, {
    tableName: 'usuarios', // Nombre exacto de tu tabla en MySQL
    timestamps: false     // Desactivado porque usas 'fecha_registro' manual
});

module.exports = User;