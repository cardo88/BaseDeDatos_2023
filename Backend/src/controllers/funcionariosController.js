import connection from '../config/database.js';
import Funcionario from '../models/Funcionario.js';



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
    const { ci } = req.body;
    const { nombre, apellido, fechaNacimiento, direccion, telefono, email } = req.body;

    if (!nombre || !apellido || !fechaNacimiento || !direccion || !telefono || !email) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        // Verificar si el funcionario con la cédula proporcionada existe
        const [existingFuncionarioRows] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [ci]);

        if (existingFuncionarioRows.length === 0) {
            return res.status(404).json({ message: "Funcionario no encontrado" });
        }

        // Actualizar los datos del funcionario
        const updateQuery = `
            UPDATE Funcionarios 
            SET Nombre = ?, Apellido = ?, Fch_Nacimiento = ?, Dirección = ?, Teléfono = ?, Email = ?
            WHERE Ci = ?`;

        const [updateResult] = await connection.query(updateQuery, [nombre, apellido, fechaNacimiento, direccion, telefono, email, ci]);

        if (updateResult.affectedRows > 0) {
            return res.status(200).json({ message: "Datos del funcionario actualizados correctamente" });
        } else {
            return res.status(500).json({ message: "Error al actualizar los datos del funcionario" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar los datos del funcionario" });
    }
};
