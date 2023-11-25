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
    const { cedula, username, password } = req.body;

    // Chequear que los datos requeridos no estén vacíos
    if (!cedula || !username || !password) {
        return res.status(400).json({ message: "Cédula es requerida" });
    }

    // Chequear que la cédula no esté en la base de datos
    let [rows] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [cedula]);
    if (rows.length > 0) {
        // Cédula encontrada
        return res.status(400).json({ message: "Cédula ya registrada" });
    }

    // Chequear que el username no esté en la base de datos
    [rows] = await connection.query('SELECT * FROM Logins WHERE LogId = ?', [username]);
    if (rows.length > 0) {
        return res.status(400).json({ message: "Username ya registrado" });
    }

    // Chequea si la cédula está en la base de datos. Si no está, permite el registro
    try {
        const passwordHash = await hashPassword(password);
        [rows] = await connection.query('INSERT INTO Logins (LogId, Password) VALUES (?, ?)', [username, passwordHash]);
        if (rows.affectedRows > 0) {
            // Registro exitoso
            return res.status(201).json({ message: "Registro exitoso" });
        } else {
            // Error al registrar
            return res.status(500).json({ message: "Error al registrar" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar la cédula" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Los datos no pueden estar vacíos." });
    }

    // Chequea si el username y la contraseña coinciden con los de la base de datos
    try {
        const [rows] = await connection.query('SELECT * FROM Logins WHERE LogId = ?', [username]);
        console.log("llegó");
        if (rows.length > 0) {
            // Chequea si la contraseña coincide
            const passwordHash = rows[0].Password;
            if (compararPassword(password, passwordHash)) {
                // Login exitoso
                const token = generarTokenDeUsuario(username);
                res.json({ token });
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