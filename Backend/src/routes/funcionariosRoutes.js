import express from 'express';
import { getFuncionarioByCI, updateFuncionarioByCI } from '../controllers/funcionariosController.js';

const router = express.Router();

router.get('/getFuncionarioByCI', getFuncionarioByCI);
router.post('/updateFuncionarioByCI', updateFuncionarioByCI);

export default router;
