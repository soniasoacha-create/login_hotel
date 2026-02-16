import app from "./app.js"; // Ahora funcionará la importación
import { sequelize } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // authenticate() solo conecta, NO altera la tabla. 
        // Esto elimina el error ER_WRONG_AUTO_KEY de raíz
        await sequelize.authenticate(); 
        console.log("✅ Conexión establecida con la DB existente.");
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`✅ Endpoints listos en http://localhost:${PORT}/api/auth`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
};

startServer();