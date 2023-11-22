import express from 'express';
import { checkCedula } from '../controllers/authController.js';

const router = express.Router();

router.get('/verify-cedula', checkCedula);

export default router;
