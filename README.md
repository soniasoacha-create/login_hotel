# API REST de Autenticación - Proyecto Hotel 🏨

Este proyecto consiste en una API REST profesional desarrollada con **Node.js**, diseñada para gestionar la autenticación de usuarios mediante tokens seguros. Implementa el registro de nuevos usuarios, el inicio de sesión con validación de credenciales y la protección de rutas privadas.

## 🛠️ Tecnologías y Herramientas
* **Backend:** Node.js y Express.js.
* **Base de Datos:** MySQL con Sequelize (ORM).
* **Seguridad:** * **Bcrypt:** Para el hasheo y protección de contraseñas.
    * **JSON Web Token (JWT):** Para la creación de sesiones seguras y firmadas.
* **Variables de Entorno:** Dotenv (Protección de credenciales).
* **Desarrollo:** Nodemon para reinicio automático del servidor.

## 📁 Estructura del Proyecto
El código sigue una arquitectura de separación de responsabilidades:
* `src/config/`: Configuración de la conexión a la base de datos MySQL.
* `src/models/`: Definición de los esquemas de datos (Usuario).
* `src/controllers/`: Lógica de negocio (Registro, Login y Perfil).
* `src/routes/`: Definición de los endpoints de la API.
* `src/middlewares/`: Validación de tokens JWT para proteger rutas.
* `src/app.js`: Punto de entrada y configuración del servidor.

## ⚙️ Configuración del Entorno
Para ejecutar este proyecto, es necesario crear un archivo `.env` en la raíz con los siguientes parámetros:
```env
PORT=3000
DB_NAME=proyecto_login
DB_USER=root
DB_PASS=tu_contraseña_mysql
DB_HOST=localhost
JWT_SECRET=tu_clave_secreta_para_firmar_tokens