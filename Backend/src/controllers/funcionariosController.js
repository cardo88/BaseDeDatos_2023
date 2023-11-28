import connection from '../config/database.js';
import Funcionario from '../models/Funcionario.js';
import { getCurrentDate } from '../util/dateUtil.js';
import { getCarnetSaludByCi, updateCarnetSaludByCI, createCarnetSalud } from './carnetController.js';


export const getFuncionarioByCI = async (req, res) => {
    const { ci } = req.query;

    if (!ci) {
        return res.status(400).json({ message: "El número de cédula (CI) es requerido" });
    }

    try {
        // Obtener datos del funcionario por CI
        const [rowsFuncionario] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [ci]);

        if (rowsFuncionario.length > 0) {
            // Crear una instancia de la clase Funcionario con los datos del funcionario
            const funcionario = new Funcionario(
                rowsFuncionario[0].Ci,
                rowsFuncionario[0].Nombre,
                rowsFuncionario[0].Apellido,
                rowsFuncionario[0].Fch_Nacimiento,
                rowsFuncionario[0].Dirección,
                rowsFuncionario[0].Teléfono,
                rowsFuncionario[0].Email,
                rowsFuncionario[0].LogId
            );

            // Obtener el carnet de salud por CI
            const carnetResult = await getCarnetSaludByCi(ci);

            if (carnetResult.error) {
                // Manejar el error del controlador de Carnet
                return res.status(500).json({ message: "Error al obtener el Carnet de Salud" + " - " + carnetResult.error });
            }

            if (carnetResult.carnet) {
                // Si hay datos del carnet, retornar los datos del funcionario y carnet
                return res.status(200).json({ message: "Datos del funcionario y carnet obtenidos", funcionario, carnet: carnetResult.carnet });
            } else {
                // Si no hay datos del carnet, retornar solo los datos del funcionario
                return res.status(200).json({ message: "Datos del funcionario obtenidos (sin Carnet Salud)", funcionario });
            }
        } else {
            return res.status(404).json({ message: "Funcionario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los datos del funcionario" });
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

            // Obtener el carnet de salud por CI
            const carnetResult = await getCarnetSaludByCi(rows[0].Ci);

            if (carnetResult.carnet) {
                // Si hay datos del carnet, retornar los datos del funcionario y carnet
                return res.status(200).json({ message: "Datos del funcionario y carnet obtenidos", funcionario, carnet: carnetResult.carnet });
            } else {
                // Si no hay datos del carnet, retornar solo los datos del funcionario
                return res.status(200).json({ message: "Datos del funcionario obtenidos (sin Carnet Salud)", funcionario });
            }

        } else {
            return res.status(404).json({ message: "Funcionario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los datos del funcionario" });
    }
};


export const updateFuncionarioByCI = async (req, res) => {
    const { ci, nombre, apellido, fechaNacimiento, direccion, telefono, email, conCarnet } = req.body;
    console.log(req.body);

    // Obtener la fecha actual
    const currentDate = getCurrentDate();

    try {
        // Verificar si la fecha actual está dentro de algún periodo de actualización
        const [querySelectPeriodos] = await connection.query('SELECT * FROM Periodos_Actualizacion WHERE ? BETWEEN Fch_Inicio AND Fch_Fin', [currentDate]);

        if (querySelectPeriodos.length === 0) {
            return res.status(400).json({ message: "No se puede actualizar fuera de los periodos de actualización" });
        }

        // Realizar la actualización del funcionario
        const [queryUpdateFuncionario] = await connection.query(
            'UPDATE Funcionarios SET Nombre = ?, Apellido = ?, Fch_Nacimiento = ?, Dirección = ?, Teléfono = ?, Email = ? WHERE Ci = ?',
            [nombre, apellido, fechaNacimiento, direccion, telefono, email, ci]
        );

        if (queryUpdateFuncionario.affectedRows > 0) {
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

                if (conCarnet) {
                    // Lógica relacionada con Carnet
                    const [rowsCarnet] = await connection.query('SELECT * FROM Carnet_Salud WHERE Ci = ?', [ci]);

                    if (rowsCarnet.length > 0) {
                        // Existe un Carnet, actualizar
                        const carnetUpdateResult = await updateCarnetSaludByCI(req);

                        if (carnetUpdateResult.error) {
                            // Manejar el error del controlador de Carnet
                            return res.status(500).json({ message: "Error al actualizar el Carnet de Salud" + " - " + carnetUpdateResult.error });
                        }
                    } else {
                        // No existe un Carnet, crear
                        const carnetCreateResult = await createCarnetSalud(req);

                        if (carnetCreateResult.error) {
                            // Manejar el error del controlador de Carnet
                            return res.status(500).json({ message: "Error al insertar el Carnet de Salud" + " - " + carnetCreateResult.error });
                        }
                    }
                }

                return res.status(200).json({ message: "Funcionario actualizado exitosamente", funcionario });
            }
        }

        return res.status(404).json({ message: "Funcionario no encontrado o no se pudo actualizar" });
    } catch (error) {
        console.error({error});
        return res.status(500).json({ message: "Error al actualizar el funcionario", error: error.sqlMessage });
    }
};


export const getFuncionariosSinCarnetSalud = async (req, res) => {
    try {
        // Obtener la fecha actual
        const currentDate = getCurrentDate();

        // Consultar la base de datos para obtener funcionarios sin carnet de salud o con carnet vencido
        const [rows] = await connection.query('SELECT F.* FROM Funcionarios F LEFT JOIN Carnet_Salud CS ON F.Ci = CS.Ci WHERE CS.Ci IS NULL OR CS.Fch_Vencimiento < ?', [currentDate]);
        // SELECT F.*
        // FROM Funcionarios F
        // LEFT JOIN Carnet_Salud CS ON F.Ci = CS.Ci
        // WHERE CS.Ci IS NULL OR CS.Fch_Vencimiento < CURRENT_DATE();

        if (rows.length > 0) {
            return res.status(200).json({ message: "Funcionarios sin carnet de salud o con carnet vencido", funcionarios: rows });
        } else {
            return res.status(404).json({ message: "Todos los funcionarios con carnet de salud al día" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener la lista de funcionarios" });
    }
};