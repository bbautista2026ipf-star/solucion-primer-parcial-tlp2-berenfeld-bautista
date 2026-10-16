# Primer Parcial TLP2 - Sistema de Gestión de Proyectos de Software

API REST hecha con Node.js, Express y Sequelize (MySQL) para gestionar usuarios, proyectos y tecnologías. La sesión se maneja con un JWT guardado en una cookie httpOnly.

## Requisitos

- Node.js 18 o superior
- MySQL o MariaDB (por ejemplo, el de XAMPP)
- Postman

## Instalación y configuración

1. Clonar el repositorio y entrar a la carpeta del proyecto.

2. Instalar las dependencias:

```
npm install
```

3. Iniciar MySQL desde XAMPP y crear la base de datos, desde phpMyAdmin o la consola:

```
CREATE DATABASE gestion_proyectos;
```

4. Crear el archivo .env a partir de .env.example y completar los valores:

```
PORT=3005
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gestion_proyectos
DB_USER=root
DB_PASSWORD=
JWT_SECRET=una_clave_secreta
```

La colección de Postman apunta al puerto 3005, por eso conviene usar ese valor en PORT.

5. Iniciar el servidor:

```
npm run dev
```

o sin nodemon:

```
npm start
```

Al iniciar se verifica la conexión y se crean las tablas con sequelize.sync(). Como sync() no modifica tablas que ya existen, si la base tiene tablas de una versión anterior del proyecto hay que borrarlas antes de iniciar.

6. Importar en Postman el archivo Primer-Parcial.postman_collection.json. Después del login, Postman guarda la cookie token y la envía en las siguientes peticiones.

## Endpoints

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | /api/auth/register | público |
| POST | /api/auth/login | público |
| POST | /api/auth/logout | sesión iniciada |
| GET | /api/users | administrator |
| DELETE | /api/users/:id | administrator (eliminación lógica) |
| POST | /api/technologies | administrator |
| GET | /api/technologies | sesión iniciada |
| DELETE | /api/technologies/:id | administrator |
| POST | /api/projects | sesión iniciada |
| GET | /api/projects | administrator |
| GET | /api/projects/my-projects | sesión iniciada |
| PUT | /api/projects/:id | líder del proyecto |
| DELETE | /api/projects/:id | líder del proyecto |
