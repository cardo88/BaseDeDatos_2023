import express from 'express';
import { getAllPeriodos, insertPeriodo, updatePeriodo } from '../controllers/periodosController.js';

const router = express.Router();

router.get('/getAllPeriodos', getAllPeriodos);
router.post('/insertPeriodo', insertPeriodo);
router.post('/updatePeriodo', updatePeriodo);

export default router;
