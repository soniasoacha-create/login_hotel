import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_usuarios' // Mapeo para corregir ER_WRONG_AUTO_KEY
    },
    nombres: { type: DataTypes.STRING(50), allowNull: false },
    apellidos: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { 
        type: DataTypes.STRING(255), 
        allowNull: false,
        field: 'password_hash' // Mapeo exacto a tu DB
    },
    telefono: { type: DataTypes.STRING(30) },
    rol: { 
        type: DataTypes.ENUM('administrador', 'moderador', 'cliente'),
        field: 'tipo_usuario' // Mapeo exacto a tu DB
    }
}, {
    tableName: "usuarios", // Usa la tabla con tus 5 registros
    timestamps: false      // Desactiva createdAt/updatedAt para evitar errores
});