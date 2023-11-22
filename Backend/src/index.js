import express from 'express';
import 'dotenv/config';
import errorHandler from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());

// Rutas públicas que no requieren autenticación

// Middleware que verifica el token para todas las rutas siguientes

// Rutas protegidas que requieren autenticación

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
