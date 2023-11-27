import connection from '../config/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

function generarTokenDeUsuario(username) {
    if (!process.env.JWT_SECRET) {
        throw new Error('La clave secreta JWT no está definida');
    }
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function compararPassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
}

export const register = async (req, res) => {
    const { ci, logId, password } = req.body;

    // Chequear que los datos requeridos no estén vacíos
    if (!ci || !logId || !password) {
        return res.status(400).json({ message: "Cédula, logId y contraseña son requeridos" });
    }

    try {
        // Iniciar la transacción
        await connection.beginTransaction();

        // Chequear que la cédula no esté en la base de datos
        const [rowsCi] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [ci]);
        if (rowsCi.length > 0) {
            // Cédula encontrada, rollback y devolver error
            await connection.rollback();
            return res.status(400).json({ message: "Cédula ya registrada" });
        }

        // Chequear que el logId no esté en la base de datos
        const [rowsLogId] = await connection.query('SELECT * FROM Logins WHERE LogId = ?', [logId]);
        if (rowsLogId.length > 0) {
            // LogId encontrado, rollback y devolver error
            await connection.rollback();
            return res.status(400).json({ message: "Username ya registrado" });
        }

        // Insertar el logId y contraseña en la tabla Logins
        const passwordHash = await hashPassword(password);
        await connection.query('INSERT INTO Logins (LogId, Password) VALUES (?, ?)', [logId, passwordHash]);

        // Insertar en la tabla Funcionarios
        await connection.query('INSERT INTO Funcionarios (Ci, LogId) VALUES (?, ?)', [ci, logId]);

        // Confirmar la transacción
        await connection.commit();

        return res.status(201).json({ message: "Registro exitoso" });

    } catch (error) {
        console.error(error);

        // Rollback en caso de error
        await connection.rollback();

        return res.status(500).json({ message: "Error al registrar" });
    }
};

export const login = async (req, res) => {
    const { logId, password } = req.body;

    if (!logId || !password) {
        return res.status(400).json({ message: "Los datos no pueden estar vacíos." });
    }

    // Chequea si el logId y la contraseña coinciden con los de la base de datos
    try {
        const [rows] = await connection.query('SELECT * FROM Logins WHERE LogId = ?', [logId]);
        if (rows.length > 0) {
            // Chequea si la contraseña coincide
            const passwordHash = rows[0].Password;
            if (compararPassword(password, passwordHash)) {
                // Login exitoso
                const token = generarTokenDeUsuario(logId);
                res.cookie('token', token, {
                    secure: true,
                })
                res.send();
            } else {
                // Contraseña incorrecta
                return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
            }
        } else {
            // Usuario no encontrado
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar el usuario" });
    }
};