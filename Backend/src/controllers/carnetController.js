import connection from '../config/database.js';
import CarnetSalud from '../models/CarnetSalud.js';
import path from 'path';


export const getCarnetSaludByCi = async (ci) => {
   
    try {
        // Verificar que el CI no esté vacío
        if (!ci) {
            throw new Error("El número de cédula (CI) es requerido");
        }

        // Consultar la base de datos para obtener el carnet por CI
        const [rows] = await connection.query('SELECT * FROM Carnet_Salud WHERE Ci = ?', [ci]);

        if (rows.length > 0) {
            // Crear una instancia de la clase CarnetSalud con los datos del carnet
            const carnet = new CarnetSalud(
                rows[0].Ci,
                rows[0].Fch_Emision,
                rows[0].Fch_Vencimiento,
                rows[0].Comprobante
            );

            // Convertir el Buffer a Base64
            //console.log("carnet.comprobante: " + carnet.comprobante);
            const comprobanteBase64 = Buffer.from(carnet.comprobante).toString('base64');

            // Modificar el objeto carnet para incluir el comprobante Base64
            carnet.comprobante = comprobanteBase64;

            return { message: "Datos del carnet de salud obtenidos", carnet };
        } else {
            throw new Error("Carnet de salud no encontrado");
        }
    } catch (error) {
        throw new Error("Error al obtener los datos del carnet de salud: " + error.message);
    }
};


// Controlador para obtener el carnet de salud por CI
export const getCarnetSaludByCiController = async (req, res) => {
    const { ci } = req.query;

    try {
        const result = await getCarnetSaludByCi(ci);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


export const createCarnetSalud = async (req, res) => {
    const { ci, fechaEmision, fechaVencimiento } = req.body;

    try {

        // Chequear que los datos requeridos no estén vacíos
        if (!ci || !fechaEmision || !fechaVencimiento) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        // Verificar si se ha enviado un archivo
        if (!req.file) {
            return res.status(400).json({ message: "El comprobante es requerido" });
        }

        const filePath = req.file.path;
        console.log(filePath);

        // Insertar en la base de datos
        await connection.query(
            'INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante) VALUES (?, ?, ?, ?)',
            [ci, fechaEmision, fechaVencimiento, filePath]
        );

        return res.status(201).json({ message: "Carnet de salud creado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el carnet de salud" });
    }
};


export const updateCarnetSaludByCI = async (req, res) => {
    const { ci } = req.params;
    const { fechaEmision, fechaVencimiento, comprobante } = req.body;

    // Chequear que los datos requeridos no estén vacíos
    if (!fechaEmision || !fechaVencimiento || !comprobante) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        const [result] = await connection.query('UPDATE Carnet_Salud SET Fch_Emision = ?, Fch_Vencimiento = ?, Comprobante = ? WHERE Ci = ?', [fechaEmision, fechaVencimiento, comprobante, ci]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Carnet de salud actualizado exitosamente" });
        } else {
            return res.status(404).json({ message: "Carnet de salud no encontrado o no se pudo actualizar" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el carnet de salud" });
    }
};
