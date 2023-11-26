import connection from '../config/database.js';
import Funcionario from '../models/Funcionario.js';
import { getCurrentDate } from '../util/dateUtil.js';


export const getFuncionarioByCI = async (req, res) => {
    const { ci } = req.query;

    if (!ci) {
        return res.status(400).json({ message: "El número de cédula (CI) es requerido" });
    }

    try {
        // Obtener datos del funcionario por CI
        const [rows] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [ci]);
        console.log(rows);
        if (rows.length > 0) {
            // Crear una instancia de la clase Funcionario con los datos del funcionario
            const funcionario = new Funcionario(
                rows[0].Ci,
                rows[0].Nombre,
                rows[0].Apellido,
                rows[0].Fch_Nacimiento,
                rows[0].Dirección,
                rows[0].Teléfono,
                rows[0].Email,
                rows[0].LogId
            );

            return res.status(200).json({ message: "Datos del funcionario obtenidos", funcionario });
        } else {
            return res.status(404).json({ message: "Funcionario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los datos del funcionario" });
    }
};


export const updateFuncionarioByCI = async (req, res) => {
    const { ci, nombre, apellido, fechaNacimiento, direccion, telefono, email } = req.body;

    // Obtener la fecha actual
    const currentDate = getCurrentDate();

    try {
        // Verificar si la fecha actual está dentro de algún periodo de actualización
        const [periodos] = await connection.query('SELECT * FROM Periodos_Actualizacion WHERE ? BETWEEN Fch_Inicio AND Fch_Fin', [currentDate]);

        if (periodos.length === 0) {
            return res.status(400).json({ message: "No se puede actualizar fuera de los periodos de actualización" });
        }

        // Realizar la actualización del funcionario
        const [result] = await connection.query(
            'UPDATE Funcionarios SET Nombre = ?, Apellido = ?, Fch_Nacimiento = ?, Dirección = ?, Teléfono = ?, Email = ? WHERE Ci = ?',
            [nombre, apellido, fechaNacimiento, direccion, telefono, email, ci]
        );
        console.log(result);
        if (result.affectedRows > 0) {
            // Obtener y devolver los nuevos datos del funcionario actualizado
            const [updatedRows] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [ci]);

            if (updatedRows.length > 0) {
                const funcionario = new Funcionario(
                    updatedRows[0].Ci,
                    updatedRows[0].Nombre,
                    updatedRows[0].Apellido,
                    updatedRows[0].Fch_Nacimiento,
                    updatedRows[0].Dirección,
                    updatedRows[0].Teléfono,
                    updatedRows[0].Email,
                    updatedRows[0].LogId
                );

                return res.status(200).json({ message: "Funcionario actualizado exitosamente", funcionario });
            }
        }

        return res.status(404).json({ message: "Funcionario no encontrado o no se pudo actualizar" });
    } catch (error) {
        console.error(error.sqlMessage);
        return res.status(500).json({ message: "Error al actualizar el funcionario", error: error.sqlMessage });
    }
};


export const getFuncionarioByLogId = async (req, res) => {
    const { logId } = req.query;

    if (!logId) {
        return res.status(400).json({ message: "El logId es requerido" });
    }

    try {
        // Obtener datos del funcionario por LogId
        const [rows] = await connection.query('SELECT * FROM Funcionarios WHERE LogId = ?', [logId]);

        if (rows.length > 0) {
            // Crear una instancia de la clase Funcionario con los datos del funcionario
            const funcionario = new Funcionario(
                rows[0].Ci,
                rows[0].Nombre,
                rows[0].Apellido,
                rows[0].Fch_Nacimiento,
                rows[0].Dirección,
                rows[0].Teléfono,
                rows[0].Email,
                rows[0].LogId
            );

            return res.status(200).json({ message: "Datos del funcionario obtenidos", funcionario });
        } else {
            return res.status(404).json({ message: "Funcionario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los datos del funcionario" });
    }
};