import express from 'express';
import { getFuncionarioByCI, updateFuncionarioByCI, getFuncionarioByLogId, getFuncionariosSinCarnetSalud } from '../controllers/funcionariosController.js';

const router = express.Router();

router.get('/getFuncionarioByCI', getFuncionarioByCI);
router.post('/updateFuncionarioByCI', updateFuncionarioByCI);
router.get('/getFuncionarioByLogId', getFuncionarioByLogId);
router.get('/getFuncionariosSinCarnetSalud', getFuncionariosSinCarnetSalud);

export default router;
