import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js';
import verificarToken from './middlewares/authMiddleware.js';
import errorHandler from './middlewares/errorMiddleware.js';
import agenda from './routes/agendaRoutes.js';
import funcionarios from './routes/funcionariosRoutes.js';
import periodos from './routes/periodosRoutes.js';
import carnet from './routes/carnetRoutes.js';

const allowedOrigin = process.env.FRONTEND_HOST ?? 'http://localhost:5174';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Rutas públicas que no requieren autenticación
app.use('/api/auth', authRoutes);

// Middleware que verifica el token para todas las rutas siguientes
app.use(verificarToken);

// Rutas protegidas que requieren autenticación
app.use('/api/agenda', agenda);
app.use('/api/funcionarios', funcionarios);
app.use('/api/periodos', periodos);
app.use('/api/carnet/', carnet);


// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
