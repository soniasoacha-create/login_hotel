import express from "express";
import { register, login } from "../controllers/authController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Ruta protegida (Requisito C de la guía)
router.get("/profile", verificarToken, (req, res) => {
  res.json({ ok: true, message: "Acceso concedido al perfil", user: req.user });
});

export default router;