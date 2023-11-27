import express from 'express';
import { getCarnetSaludByCI, createCarnetSalud, updateCarnetSaludByCI } from '../controllers/carnetController.js';
import { upload } from '../util/uploadFile.js';

const router = express.Router();

router.get('/getCarnetSaludByCI', getCarnetSaludByCI);
//router.post('/createCarnetSalud', createCarnetSalud);
router.post('/createCarnetSalud', upload.single('comprobante'), createCarnetSalud);
router.post('/updateCarnetSaludByCI', updateCarnetSaludByCI);

export default router;
