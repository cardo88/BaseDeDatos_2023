import connection from '../config/database.js';

export const checkCedula = async (req, res) => {
    const { cedula } = req.query;

    if (!cedula) {
        return res.status(400).json({ message: "Cédula es requerida" });
    }

    try {
        const [rows] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [cedula]);
        if (rows.length > 0) {
            // Cédula encontrada
            return res.status(200).json({ message: "Cédula encontrada", funcionario: rows[0] });
        } else {
            // Cédula no encontrada
            return res.status(404).json({ message: "Cédula no encontrada" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar la cédula" });
    }
};
