import express from 'express';
import { getFuncionarioByCI, updateFuncionarioByCI, getFuncionarioByLogId } from '../controllers/funcionariosController.js';

const router = express.Router();

router.get('/getFuncionarioByCI', getFuncionarioByCI);
router.post('/updateFuncionarioByCI', updateFuncionarioByCI);
router.get('/getFuncionarioByLogId', getFuncionarioByLogId);

export default router;
