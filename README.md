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

## Datos a tener en cuenta

- employee_number usa el formato EMP-0000, por ejemplo EMP-0001.
- El code de un proyecto usa el formato PRJ-0000, por ejemplo PRJ-0001.
- start_date usa el formato YYYY-MM-DD.
- La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
- Si no se envía role al registrarse, el usuario queda como developer. Para probar las rutas de administrador hay que registrar un usuario con "role": "administrator".
- Al crear un proyecto, si no se envía leader_id, el líder es el usuario que inició sesión.
- Las technologies de un proyecto se envían como un array de ids, por ejemplo [1, 2]. Solo un administrator puede crear technologies.

Ejemplo de registro:

```json
{
  "username": "bautista",
  "email": "bautista@mail.com",
  "password": "Clave1234",
  "role": "developer",
  "profile": {
    "employee_number": "EMP-0001",
    "first_name": "Bautista",
    "last_name": "Berenfeld",
    "phone": "3704123456"
  }
}
```

Ejemplo de proyecto:

```json
{
  "code": "PRJ-0001",
  "name": "Sistema de turnos",
  "description": "Gestión de turnos para una clínica",
  "status": "planning",
  "start_date": "2026-01-01",
  "budget": 1500,
  "leader_id": 1,
  "technologies": [1, 2]
}
```

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
