import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    let token = req.headers['authorization']; // O 'x-access-token', dependiendo de cómo lo envíes

    if (!token) {
        return res.status(403).send({ message: 'No se proporcionó token de autenticación.' });
    }

    // Si estás enviando el token con el prefijo 'Bearer ', necesitas extraer el token de la cadena
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Extrae el token sin 'Bearer '
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'No autorizado.' });
        }
        req.usuario = decoded; // Agrega el payload decodificado a la solicitud para su uso en otros middlewares o controladores
        next(); // Pasa el control al siguiente middleware o controlador
    });
};

export default verificarToken;