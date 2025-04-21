import express from 'express';
import dotenv from 'dotenv';
import vehicleRoutes from './routes/vehicle.routes';
import { swaggerUi, swaggerSpec } from './utils/swagger';
import cors from 'cors';
import { logger } from './middlewares/logger';

dotenv.config()

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/vehicles', vehicleRoutes);

export default app;