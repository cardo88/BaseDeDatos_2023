import connection from '../config/database.js';
import Agenda from '../models/Agenda.js';



export const getAllRecords = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM Agenda');

        const agendaRecords = rows.map(row => {
            return new Agenda(row.Nro, row.Ci, row.Fch_Agenda);
        });

        return res.status(200).json({ message: "Registros de Agenda obtenidos", agenda: agendaRecords });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los registros de Agenda" });
    }
};


export const insertCita = async (req, res) => {
    const { ci, fechaAgenda } = req.body;

    if (!ci || !fechaAgenda) {
        return res.status(400).json({ message: "Ci y fechaAgenda son campos requeridos" });
    }

    try {
        // Verificar si el funcionario con la ci existe
        const [funcionarioRows] = await connection.query('SELECT * FROM Funcionarios WHERE Ci = ?', [ci]);

        if (funcionarioRows.length === 0) {
            return res.status(404).json({ message: "Funcionario no encontrado" });
        }

        // Verificar si ya hay una cita en la Agenda para la fecha proporcionada
        const [existingCitaRows] = await connection.query('SELECT * FROM Agenda WHERE Fch_Agenda = ?', [fechaAgenda]);

        if (existingCitaRows.length > 0) {
            return res.status(400).json({ message: "Ya hay una cita programada para la fecha proporcionada" });
        }

        // Insertar la cita en la Agenda
        const [insertResult] = await connection.query('INSERT INTO Agenda (Ci, Fch_Agenda) VALUES (?, ?)', [ci, fechaAgenda]);

        if (insertResult.affectedRows > 0) {
            // Obtener el número asignado a la nueva cita
            const [newCita] = await connection.query('SELECT * FROM Agenda WHERE Nro = ?', [insertResult.insertId]);

            // Crear una instancia de la clase Agenda con la nueva cita
            const nuevaCita = new Agenda(newCita[0].Nro, newCita[0].Ci, newCita[0].Fch_Agenda);

            return res.status(201).json({ message: "Cita agregada correctamente", nuevaCita });
        } else {
            return res.status(500).json({ message: "Error al insertar la cita en la Agenda" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al insertar la cita en la Agenda" });
    }
};
