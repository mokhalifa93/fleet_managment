import { Router } from 'express';
import {
    registerVehicle,
    getVehicle,
    getVehicles,

    CreateMaintenance,
    updateVehicleLocation
} from '../controllers/vehicles.controller';
import { validateBody } from '../middlewares/validator'
import { maintenanceSchema, vehicleSchema } from '../validations/vehicles'
const router = Router();

router.post('/register', validateBody(vehicleSchema), registerVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicle);
router.post('/track/:id', updateVehicleLocation);
router.post('/maintenance/:id',validateBody(maintenanceSchema), CreateMaintenance);

export default router;
