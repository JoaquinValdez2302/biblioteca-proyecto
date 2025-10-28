# Biblioteca San Martín - Sistema de Gestión

Este proyecto es un sistema de gestión para una biblioteca ficticia, desarrollado como parte de una actividad académica. Permite gestionar libros, socios, préstamos y multas.

## Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### **Prerrequisitos**

Asegúrate de tener instalados los siguientes programas:

* **Node.js:** (Versión 22.x LTS o superior recomendada) - Incluye npm. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
* **PostgreSQL:** (Versión 16.x o superior recomendada) - La base de datos del sistema. Puedes descargarlo desde [postgresql.org](https://www.postgresql.org/download/).
* **Git:** Para clonar el repositorio. Puedes descargarlo desde [git-scm.com](https://git-scm.com/).

### **Instalación**

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/biblioteca-proyecto.git](https://github.com/tu-usuario/biblioteca-proyecto.git) 
    cd biblioteca-proyecto
    ```
    *(Reemplazá `tu-usuario/biblioteca-proyecto.git` con la URL real de tu repositorio)*

2.  **Configurar la Base de Datos:**
    * Abre PostgreSQL (usando `psql` o pgAdmin).
    * Crea una nueva base de datos llamada `biblioteca`.
    * Ejecuta el script `database.sql` (ubicado en la raíz del proyecto) en la base de datos `biblioteca` para crear las tablas.
        * *En `psql`: `\c biblioteca` luego `\i ruta/completa/a/database.sql`*
        * *En pgAdmin: Abre el Query Tool para la DB `biblioteca`, pega el contenido de `database.sql` y ejecútalo.*
    * **Importante:** Actualiza la contraseña de la base de datos en `backend/src/config/database.js` si es diferente a la del script.

3.  **Instalar Dependencias del Backend:**
    ```bash
    cd backend
    npm install
    ```
    Esto instalará los paquetes listados en `backend/package.json`, como `express`, `pg`, `cors`, `bcrypt`, `express-session`, etc.

4.  **Instalar Dependencias del Frontend:**
    ```bash
    cd ../frontend 
    npm install
    ```
    Esto instalará los paquetes listados en `frontend/package.json`, como `next`, `react`, `@mui/material`, `@emotion/react`, etc.

### **Ejecutar la Aplicación**

Necesitas ejecutar ambos servidores (backend y frontend) en terminales separadas:

1.  **Iniciar el Backend:**
    * Abrí una terminal en la carpeta `backend`.
    * Ejecutá: `npm start` (o `node index.js`)
    * El backend estará disponible en `http://localhost:3001`.

2.  **Iniciar el Frontend:**
    * Abrí **otra** terminal en la carpeta `frontend`.
    * Ejecutá: `npm run dev`
    * La aplicación estará disponible en `http://localhost:3000`.

3.  **Acceder:** Abrí tu navegador y visitá `http://localhost:3000`.

## Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Frontend:** Next.js, React
* **Base de Datos:** PostgreSQL
* **Estilos:** Material-UI (MUI), CSS Modules
* **Autenticación:** express-session, bcrypt
* **Control de Versiones:** Git, GitHub

*(Las versiones específicas de las dependencias clave se encuentran en los archivos `package.json` de cada módulo).*

---

Este `README.md` cubre los puntos esenciales: qué es el proyecto, qué necesitás para instalarlo, los pasos exactos de instalación (incluyendo `npm install` como pediste), cómo ejecutarlo y las tecnologías principales. Podés añadir más secciones si lo necesitás (por ejemplo, sobre cómo ejecutar las pruebas o detalles de la configuración