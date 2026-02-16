import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ where: { email } });

        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        // Compara contra la columna password_hash mapeada
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ ok: true, token, user: { nombres: usuario.nombres, rol: usuario.rol } });
    } catch (error) {
        res.status(500).json({ message: "Error interno", error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { nombres, apellidos, email, password, telefono, rol } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const nuevoUsuario = await User.create({
            nombres, apellidos, email, password: passwordHash, telefono, rol
        });

        res.status(201).json({ message: "Usuario creado", id: nuevoUsuario.id });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar", error: error.message });
    }
};