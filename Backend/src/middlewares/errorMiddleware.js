function errorHandler(err, req, res, next) {
    // Log del error para el debugging
    console.error(err);

    // Determinar el código de estado del error
    const statusCode = err.statusCode || 500;

    // Enviar respuesta de error
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack // Oculta el stack trace en producción
        }
    });
}

export default errorHandler;