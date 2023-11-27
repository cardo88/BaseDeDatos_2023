import connection from '../config/database.js';
import CarnetSalud from '../models/CarnetSalud.js';
import path from 'path';


export const getCarnetSaludByCI = async (req, res) => {
    const { ci } = req.params;

    if (!ci) {
        return res.status(400).json({ message: "La cédula es requerida" });
    }

    try {
        const [rows] = await connection.query('SELECT * FROM Carnet_Salud WHERE Ci = ?', [ci]);

        if (rows.length > 0) {
            const carnetSalud = new CarnetSalud(
                rows[0].Ci,
                rows[0].Fch_Emision,
                rows[0].Fch_Vencimiento,
                rows[0].Comprobante
            );

            return res.status(200).json({ message: "Carnet de salud obtenido", carnetSalud });
        } else {
            return res.status(404).json({ message: "Carnet de salud no encontrado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el carnet de salud" });
    }
};


export const createCarnetSalud_old = async (req, res) => {
    const { ci, fechaEmision, fechaVencimiento, comprobante } = req.body;

    // Chequear que los datos requeridos no estén vacíos
    if (!ci || !fechaEmision || !fechaVencimiento || !comprobante) {
        console.log(req.body);
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        await connection.query('INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante) VALUES (?, ?, ?, ?)', [ci, fechaEmision, fechaVencimiento, comprobante]);

        return res.status(201).json({ message: "Carnet de salud creado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el carnet de salud" });
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
