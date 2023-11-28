import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(403).send({ message: 'No se proporcionó token de autenticación.' });
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