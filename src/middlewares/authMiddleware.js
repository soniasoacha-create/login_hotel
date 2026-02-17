import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    // --- ERROR 401: No autenticado ---
    if (!token) {
        return res.status(401).json({ 
            ok: false, 
            message: "Acceso denegado. No se proporcionó un token." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // --- ERROR 403: Token inválido ---
        return res.status(403).json({ 
            ok: false, 
            message: "Token inválido o expirado." 
        });
    }
};