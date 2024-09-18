##Gestión de Inventario de Equipos Informáticos - FORMOTEX

Aplicación web para gestionar el inventario de equipos informáticos de FORMOTEX. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) protegidas por autenticación JWT, con un backend en Node.js y un frontend en React, utilizando PostgreSQL o MongoDB.
Funcionalidades Clave

Autenticación segura: Acceso restringido a través de tokens JWT.
Gestión completa: Operaciones CRUD para equipos.
Interfaz intuitiva: Front-end React para una experiencia de usuario óptima.
Flexibilidad de base de datos: Soporte para PostgreSQL y MongoDB.

#Tecnologías

Backend: Node.js, Express, TypeScript, JWT, PostgreSQL, bcryptjs
Frontend: React, TypeScript, Vite, Axios

#Instalación y Configuración
    Clonar:
```
git clone https://github.com/usuario/inventario-equipos.git
```
##Backend:
    npm install
    Configurar .env con credenciales de base de datos, clave JWT, etc.
    Crear base de datos y ejecutar migraciones.
    npm start
##Frontend:
        cd frontend
        npm install
        npm run dev
