import express from 'express';
import { getCarnetSaludByCi, createCarnetSalud, updateCarnetSaludByCI } from '../controllers/carnetController.js';
import { upload } from '../util/uploadFile.js';

const router = express.Router();

router.get('/getCarnetSaludByCi', getCarnetSaludByCi);
//router.post('/createCarnetSalud', createCarnetSalud);
router.post('/createCarnetSalud', upload.single('comprobante'), createCarnetSalud);
router.post('/updateCarnetSaludByCI', updateCarnetSaludByCI);

export default router;
