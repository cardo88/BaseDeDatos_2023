import connection from '../config/database.js';
import PeriodoActualizacion from '../models/PeriodoActualizacion.js';


// Obtener todos los periodos de actualización
export const getAllPeriodos = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM Periodos_Actualizacion');
        const periodos = rows.map(row => new PeriodoActualizacion(row.Año, row.Semestre, row.Fch_Inicio, row.Fch_Fin));

        return res.status(200).json({ message: "Todos los periodos obtenidos", periodos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los periodos de actualización" });
    }
};

// Insertar un nuevo periodo de actualización
export const insertPeriodo = async (req, res) => {
    const { año, semestre, fechaInicio, fechaFin } = req.body;

    try {
        const [result] = await connection.query('INSERT INTO Periodos_Actualizacion (Año, Semestre, Fch_Inicio, Fch_Fin) VALUES (?, ?, ?, ?)', [año, semestre, fechaInicio, fechaFin]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: "Periodo de actualización creado exitosamente" });
        } else {
            return res.status(500).json({ message: "Error al crear el periodo de actualización" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el periodo de actualización" });
    }
};

// Actualizar un periodo de actualización existente
export const updatePeriodo = async (req, res) => {
    const { año, semestre, fechaInicio, fechaFin } = req.body;

    try {
        const [result] = await connection.query('UPDATE Periodos_Actualizacion SET Fch_Inicio = ?, Fch_Fin = ? WHERE Año = ? AND Semestre = ?', [fechaInicio, fechaFin, año, semestre]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Periodo de actualización actualizado exitosamente" });
        } else {
            return res.status(404).json({ message: "Periodo de actualización no encontrado o no se pudo actualizar" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el periodo de actualización" });
    }
};
