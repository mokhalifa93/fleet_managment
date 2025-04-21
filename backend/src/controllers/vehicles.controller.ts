import { Request, Response } from 'express';
import {
    createVehicle,
    getVehicleById,
    getAllVehicles,
    updateVehicleLocationService,
    createMaintenanceService
} from '../services/vehicle.service';
import mongoose from 'mongoose';

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Register a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               vin:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicle registered successfully
 *       500:
 *         description: Failed to register vehicle
 */

export const registerVehicle = async (req: Request, res: Response): Promise<any> => {
  try {
    const vehicle = await createVehicle(req.body);
    return res.status(201).json(vehicle);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to register vehicle' });
  }
};
/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle data
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Failed to get vehicle
 */
export const getVehicle = async (req: Request, res: Response): Promise<any> => {
    try {
        const vehicle = await getVehicleById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        return res.json(vehicle);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get vehicle' });
    }
};
/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of vehicles
 *       500:
 *         description: Failed to get vehicles
 */
export const getVehicles = async (_req: Request, res: Response): Promise<any> => {
    try {
        const vehicles = await getAllVehicles();
        return res.json(vehicles);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get vehicles' });
    }
};

/**
 * @swagger
 * /vehicles/track/{id}:
 *   post:
 *     summary: Update vehicle location
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lat
 *               - lng
 *               - speed
 *             properties:
 *               lat:
 *                 type: number
 *                 example: 25.276987
 *               lng:
 *                 type: number
 *                 example: 55.296249
 *               speed:
 *                 type: number
 *                 example: 80
 *     responses:
 *       201:
 *         description: Location updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */

export const updateVehicleLocation = async (req: Request, res: Response): Promise<void> => {
    const vehicleId = req.params.id;
    const { lat, lng, speed } = req.body;
  
    if (!lat || !lng || typeof speed !== 'number') {
      res.status(400).json({ message: 'Invalid input. lat, lng, and speed are required.' });
      return;
    }
  
    try {
      const trackingEntry = await updateVehicleLocationService(vehicleId, lat, lng, speed);
      res.status(201).json({
        message: 'Location updated',
        data: trackingEntry,
      });
    } catch (error: any) {
      console.error('Error updating vehicle location:', error.message);
      res.status(error.message === 'Vehicle not found' ? 404 : 500).json({ message: error.message });
    }
  };

/**
 * @swagger
 * /vehicles/maintenance/{id}:
 *   post:
 *     summary: Create a new maintenance record for a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-04-19
 *               description:
 *                 type: string
 *                 example: "Oil change"
 *               cost:
 *                 type: number
 *                 example: 120.5
 *     responses:
 *       200:
 *         description: Maintenance record created successfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

  export const CreateMaintenance = async (req: Request, res: Response): Promise<void> => {

    try {
      const updated = await createMaintenanceService(req.params.id, req.body);
      res.status(200).json({
        message: 'Maintenance record created successfully',
        data: updated,
      });
    } catch (error: any) {
      console.error('Error updating maintenance:', error.message);
      res.status(error.message === 'Maintenance record not found' ? 404 : 500).json({
        message: error.message,
      });
    }
  };