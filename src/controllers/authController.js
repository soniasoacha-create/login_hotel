import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// --- LOGICA DE LOGIN (Maneja 400, 401, 404, 500) ---
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ ok: false, message: "Email y password requeridos" });
        }

        const usuario = await User.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }

        // BCRYPT ENCADENADO: Comparamos la clave plana con el hash de la DB
        const validPassword = bcrypt.compareSync(password, usuario.password_hash || usuario.password);
        if (!validPassword) {
            return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: usuario.id_usuarios || usuario.id, rol: usuario.tipo_usuario || usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(200).json({ 
            ok: true, 
            token, 
            user: { 
                nombres: usuario.nombres, 
                rol: usuario.tipo_usuario || usuario.rol 
            } 
        });
        
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error interno del servidor", error: error.message });
    }
};

// --- LOGICA DE REGISTRO (Maneja 400 con validación de apellidos) ---
export const register = async (req, res) => {
    try {
        const { nombres, apellidos, email, password } = req.body;

        // VALIDACIÓN AJUSTADA: Ahora incluimos 'apellidos' para evitar el Error 500 de la DB
        if (!nombres || !apellidos || !email || !password) {
            return res.status(400).json({ 
                ok: false, 
                message: "Faltan campos obligatorios (nombres, apellidos, email y password)" 
            });
        }

        // BCRYPT ENCADENADO: Generamos el hash antes de guardar
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        // Guardamos en la base de datos mapeando el password al campo correcto
        const nuevoUsuario = await User.create({
            nombres,
            apellidos,
            email,
            password: passwordHash // Sequelize se encargará de enviarlo a password_hash según tu modelo
        });

        res.status(201).json({ 
            ok: true, 
            message: "Usuario creado exitosamente", 
            id: nuevoUsuario.id_usuarios || nuevoUsuario.id 
        });

    } catch (error) {
        // Si el email ya existe, Sequelize lanzará un error que capturamos aquí como 500 o 400 según prefieras
        res.status(500).json({ ok: false, message: "Error al registrar el usuario", error: error.message });
    }
};