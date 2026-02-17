import express from "express";
// Importación de controladores: Asegura que 'register' y 'login' existan en el controlador
import { register, login } from "../controllers/authController.js";
// Importación del middleware de seguridad
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registro de nuevos usuarios con encriptación bcrypt
 * @access  Público (Maneja errores 400 y 500)
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Autenticación de usuario y generación de JWT
 * @access  Público (Maneja errores 400, 401, 404 y 500)
 */
router.post("/login", login);

/**
 * @route   GET /api/auth/profile
 * @desc    Ruta protegida para ver datos del perfil
 * @access  Privado (Maneja errores 401 y 403 vía middleware)
 */
router.get("/profile", verificarToken, (req, res) => {
  // Si el token es válido, el middleware pasa el control aquí
  res.status(200).json({ 
    ok: true, 
    message: "Acceso concedido al perfil", 
    user: req.user 
  });
});

export default router;