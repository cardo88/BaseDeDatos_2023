import express from 'express';
import { getAllRecords, insertCita } from '../controllers/agendaController.js';

const router = express.Router();

router.get('/getAllRecords', getAllRecords);
router.post('/insertCita', insertCita);

export default router;
