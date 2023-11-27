import express from 'express';
import { getCarnetSaludByCi, getCarnetSaludByCiController, createCarnetSalud, updateCarnetSaludByCI } from '../controllers/carnetController.js';

const router = express.Router();

//router.get('/getCarnetSaludByCiController', getCarnetSaludByCiController);
//router.post('/createCarnetSalud', upload.single('comprobante'), createCarnetSalud);
//router.post('/updateCarnetSaludByCI', upload.single('comprobante'), updateCarnetSaludByCI);


export default router;
