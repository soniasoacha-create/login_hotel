API REST de Autenticación - Proyecto Hotel 🏨
Este proyecto consiste en una API REST profesional desarrollada con Node.js, diseñada para gestionar la autenticación de usuarios mediante tokens seguros. Implementa el registro de nuevos usuarios, el inicio de sesión con validación de credenciales y la protección de rutas privadas, cumpliendo con los estándares de seguridad y manejo de errores exigidos por la guía técnica.
+4

🛠️ Tecnologías y Herramientas

Backend: Node.js y Express.js.
Base de Datos: MySQL con Sequelize (ORM) para la persistencia de datos.
Seguridad: * Bcrypt: Para el hasheo y protección de contraseñas (Prohibido guardar en texto plano).
JSON Web Token (JWT): Para la creación de sesiones seguras y firmadas.
Variables de Entorno: Dotenv para la protección de claves secretas y credenciales.
Desarrollo: Nodemon para agilizar el ciclo de desarrollo.

📁 Estructura del Proyecto
El código sigue una arquitectura de separación de responsabilidades para garantizar un mantenimiento limpio:
src/config/: Configuración de la conexión a MySQL.
src/models/: Definición del modelo de Usuario (mapeo de tabla).
src/controllers/: Lógica de negocio (Registro, Login y Perfil).
src/routes/: Definición de los endpoints de la API.
src/middlewares/: Validación de tokens JWT para proteger recursos.
src/app.js: Configuración global y punto de entrada del servidor.

⚙️ Configuración del Entorno (.env)
Es obligatorio crear un archivo .env en la raíz del proyecto para que el sistema funcione correctamente. Nota: Nunca subas este archivo a repositorios públicos.

Fragmento de código
PORT=3000
DB_NAME=proyecto_login
DB_USER=root
DB_PASS=tu_contraseña_mysql
DB_HOST=localhost
JWT_SECRET=tu_clave_secreta_para_firmar_tokens
🚀 Instalación y Ejecución
Clonar el repositorio.

Instalar dependencias: npm install.

Base de Datos: Asegúrate de tener activa tu instancia de MySQL y que el esquema coincida con el modelo definido.

Ejecutar servidor:
Bash
npm run dev
El servidor se activará en: http://localhost:3000/api/auth.

📖 Especificación de Endpoints
Todas las peticiones deben utilizar el encabezado Content-Type: application/json.

1. Registro de Usuario
Crea una cuenta nueva y encripta la contraseña automáticamente.

Ruta: POST /api/auth/register 
Body:

JSON
{
  "nombres": "Sonia",
  "apellidos": "Soacha",
  "email": "sonia@hotel.com",
  "password": "mi_clave_segura"
}
Nota: Se incluyó el campo apellidos como obligatorio para evitar errores de integridad en la base de datos.

2. Login
Valida identidad y genera el token de acceso.
Ruta: POST /api/auth/login 
Body: { "email": "...", "password": "..." }
Retorna: Un token JWT con el identificador y rol del usuario.


3. Perfil (Ruta Protegida)
Ruta de ejemplo que requiere autenticación.
Ruta: GET /api/auth/profile 
Header Obligatorio: Authorization: Bearer <tu_token_aquí>.


🚦 Manejo de Errores Controlado
El API está diseñado para responder con códigos HTTP estandarizados:
400 Bad Request: Datos incompletos (ej. falta el campo apellidos).
401 Unauthorized: La contraseña es incorrecta.
403 Forbidden: Token inválido, expirado o no proporcionado.
404 Not Found: El correo ingresado no existe en la base de datos.
500 Internal Error: Error inesperado en el servidor o base de datos.