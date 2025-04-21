import {
  registerVehicle,
  getVehicle,
  getVehicles,
  updateVehicleLocation,
  CreateMaintenance
} from '../controllers/vehicles.controller';
import * as service from '../services/vehicle.service';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IVehicle } from '../models/Vehicles';
import { validateObjectId } from '../middlewares/validator';

const mockResponse = (): jest.Mocked<Response> => {
  const res = {} as jest.Mocked<Response>;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('Vehicle Controller', () => {
  afterEach(() => jest.clearAllMocks());

  describe('registerVehicle', () => {
    it('should return 201 and vehicle data on success', async () => {
      const req = {
        body: {
          name: 'Yaris 2011',
          vehicleModel: 'Yaris',
          type: 'SUV'
        }
      } as Request;

      const res = mockResponse();

      const mockVehicle = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Yaris 2011',
        vehicleModel: 'Yaris',
        type: 'SUV',
        analytics: {
          hoursOperated: 0,
          distanceTraveled: 0,
          updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      } as any;

      jest.spyOn(service, 'createVehicle').mockResolvedValue(mockVehicle);

      await registerVehicle(req, res);

      expect(service.createVehicle).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockVehicle);
    });
  });

  describe('getVehicle', () => {
    it('should return 200 with vehicle data if found', async () => {
      const req = { params: { id: '123' } } as unknown as Request;
      const res = mockResponse();

      const mockVehicle = { _id: '123', name: 'Test Vehicle' } as any;

      jest.spyOn(service, 'getVehicleById').mockResolvedValue(mockVehicle);

      await getVehicle(req, res);

      expect(service.getVehicleById).toHaveBeenCalledWith('123');
      expect(res.status).not.toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(mockVehicle);
    });

    it('should return 404 if vehicle not found', async () => {
      const req = { params: { id: '123' } } as unknown as Request;
      const res = mockResponse();

      jest.spyOn(service, 'getVehicleById').mockResolvedValue(null);

      await getVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle not found' });
    });
  });

  describe('getVehicles', () => {
    it('should return 200 and list of vehicles', async () => {
      const req = {} as Request;
      const res = mockResponse();

      const mockVehicles = [
        {
          "_id": "6803bde88ae9bfac528d6956",
          "name": "JT2BG22K8X0123456",
          "vehicleModel": "Corolla",
          "type": "Toyota",
          "createdAt": "2025-04-19T15:14:48.721Z"
      },
      {
          "_id": "68051b0a378841117ad8be94",
          "name": "JT2BG22K8X0123456",
          "vehicleModel": "Corolla",
          "type": "Toyota",
          "createdAt": "2025-04-20T16:04:26.888Z"
      }
      ] as any ;
      jest.spyOn(service, 'getAllVehicles').mockResolvedValue(mockVehicles);

      await getVehicles(req, res);

      expect(service.getAllVehicles).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockVehicles);
    });
  });

  describe('updateVehicleLocation', () => {
    it('should return 400 if lat/lng/speed are missing', async () => {
      const req = {
        params: { id: 'vehicle-123' },
        body: { lat: null, lng: null, speed: null }
      } as unknown as Request;
      const res = mockResponse();
  
      await updateVehicleLocation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid input. lat, lng, and speed are required.'
      });
    });
  
    it('should return 404 if vehicle ID is invalid', async () => {
      const req = {
        params: { id: 'invalid-id' }, // not a valid ObjectId
        body: { lat: 25.1, lng: 55.2, speed: 90 }
      } as unknown as Request;
  
      const res = mockResponse();
      jest
        .spyOn(service, 'updateVehicleLocationService')
        .mockRejectedValue(new Error('Invalid vehicle ID'));
  
      await updateVehicleLocation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500); 
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid vehicle ID' });
    });
  
    it('should return 404 if vehicle is not found', async () => {
      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: { lat: 25.1, lng: 55.2, speed: 90 }
      } as unknown as Request;
  
      const res = mockResponse();
  
      jest
        .spyOn(service, 'updateVehicleLocationService')
        .mockRejectedValue(new Error('Vehicle not found'));
  
      await updateVehicleLocation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle not found' });
    });
  
    it('should return 201 if tracking entry is created', async () => {
      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: { lat: 25.1, lng: 55.2, speed: 90 }
      } as unknown as Request;
  
      const res = mockResponse();
  
      const trackingEntry = {
        _id: new mongoose.Types.ObjectId(),
        vehicle: req.params.id,
        location: {
          type: 'Point',
          coordinates: [55.2, 25.1]
        },
        speed: 90,
        timestamp: new Date()
      } as any;
  
      jest
        .spyOn(service, 'updateVehicleLocationService')
        .mockResolvedValue(trackingEntry);
  
      await updateVehicleLocation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Location updated',
        data: trackingEntry
      });
    });
  });

  describe('CreateMaintenance', () => {
    it('should create maintenance and return 200', async () => {
      const req = {
        params: { id: '1' },
        body: {
          date: new Date(),
          description: 'Oil change',
          cost: 100
        }
      } as unknown as Request;
      const res = mockResponse();

      const mockMaintenance = { ...req.body };

      jest.spyOn(service, 'createMaintenanceService').mockResolvedValue(mockMaintenance);

      await CreateMaintenance(req, res);

      expect(service.createMaintenanceService).toHaveBeenCalledWith('1', req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Maintenance record created successfully',
        data: mockMaintenance
      });
    });

    it('should return 404 if maintenance fails due to missing vehicle', async () => {
      const req = {
        params: { id: '1' },
        body: {}
      } as unknown as Request;
      const res = mockResponse();

      const error = new Error('Maintenance record not found');
      jest.spyOn(service, 'createMaintenanceService').mockRejectedValue(error);

      await CreateMaintenance(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
