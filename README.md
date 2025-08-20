# 🎮 Tienda de Juegos — Backend

Este es el **backend** para la aplicación web de **Tienda de Videojuegos**, desarrollado en **Node.js + Express + MongoDB**.  
Se encarga de gestionar productos (juegos y consolas) y las ventas de los mismos, proporcionando una API REST que consume el frontend hecho en **Next.js + React + Tailwind**.

---

## 🚀 Características principales

- Gestión de **productos** (juegos y consolas):
  - Crear
  - Listar
  - Editar
  - Eliminar
- Gestión de **ventas**:
  - Registrar nuevas ventas
  - Consultar el historial de ventas
- Validación de datos con reglas básicas (ej: `price >= 0`, `quantity >= 0`, campos requeridos).
- Conexión a base de datos **MongoDB**.
- Configuración de **CORS** para permitir acceso desde el frontend.

---

## 📦 Instalación

1. Clona este repositorio o descarga el código:
   ```bash
   git clone <url-del-repo>
   cd Tienda_de_juegos
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con tus variables de entorno:
   ```env
   PORT=5500
   MONGO_URI=mongodb://localhost:27017/tienda
   ```

4. Inicia el servidor en desarrollo:
   ```bash
   npm run dev
   ```
   O en producción:
   ```bash
   npm start
   ```

---

## 🛠️ Scripts disponibles

- `npm run dev` → inicia el servidor con nodemon.
- `npm start` → inicia el servidor en modo producción.

---

## 🌍 Endpoints principales

- **Productos**
  - `GET /api/products` → listar productos
  - `POST /api/products` → crear producto
  - `PATCH /api/products/:id` → actualizar producto
  - `DELETE /api/products/:id` → eliminar producto
- **Ventas**
  - `GET /api/sales` → listar ventas
  - `POST /api/sales` → crear venta

---

## 📖 Documentación de la API

La documentación completa con ejemplos está disponible en Postman:

👉 [Ver documentación de la API](https://documenter.getpostman.com/view/42985627/2sB3BKEnzF)

---

## 🤝 Relación con el Frontend

Este backend está diseñado para ser consumido por el frontend desarrollado en:

- **Next.js + React + Tailwind**
- Proyecto: `videogame-store-frontend`

En conjunto permiten gestionar y mostrar productos, añadirlos al carrito, procesar compras y administrarlos desde una interfaz amigable.

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.
