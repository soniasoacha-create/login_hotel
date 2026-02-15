const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nombres, apellidos, email, password, tipo_usuario } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            nombres, apellidos, email,
            password: hashedPassword,
            tipo_usuario
        });

        res.status(201).json({ ok: true, message: "Usuario creado" });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error interno" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ ok: true, token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};