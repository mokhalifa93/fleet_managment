import { Router } from 'express';
import {
    registerVehicle,
    getVehicle,
    getVehicles,
    CreateMaintenance,
    updateVehicleLocation
} from '../controllers/vehicles.controller';
import { validateBody, validateObjectId } from '../middlewares/validator'
import { maintenanceSchema, vehicleSchema } from '../validations/vehicles'
const router = Router();

router.post('/register', validateBody(vehicleSchema), registerVehicle);
router.get('/', getVehicles);
router.get('/:id', validateObjectId(), getVehicle);
router.post('/track/:id', validateObjectId(), updateVehicleLocation);
router.post('/maintenance/:id', validateObjectId(), validateBody(maintenanceSchema), CreateMaintenance);

export default router;
