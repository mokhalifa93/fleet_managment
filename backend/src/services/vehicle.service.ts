import {Vehicle, IVehicle } from '../models/Vehicles';
import { Types } from 'mongoose';
import { VehicleTracking } from '../models/VehicleTracking';
// services/maintenance.service.ts
import Maintenance ,{ IMaintenance } from '../models/Maintenance';


export const createVehicle = async (data: Partial<IVehicle>) => {
  const vehicle = new Vehicle(data);
  return await vehicle.save();
};

export const getVehicleById = async (id: string) => {
    
  const vehicle =  await Vehicle.aggregate([
    {
        $match: {
          _id: new Types.ObjectId(id),
        }
      },
    {
      $lookup: {
        from: 'maintenances',
        localField: '_id',
        foreignField: 'vehicle',
        as: 'maintenanceRecords',
      },
    },
  ]);
  return vehicle.length > 0 ? vehicle[0] : {} 
};

export const getAllVehicles = async () => {
    return await Vehicle.find().select('name vehicleModel createdAt type').lean();
      
};



export const updateVehicleLocationService = async (
  vehicleId: string,
  lat: number,
  lng: number,
  speed: number
) => {
  if (!Types.ObjectId.isValid(vehicleId)) {
    throw new Error('Invalid vehicle ID');
  }

  const vehicle = await Vehicle.findById(vehicleId).lean();
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  const trackingEntry = await VehicleTracking.create({
    vehicle: vehicle._id,
    location: {
      type: 'Point',
      coordinates: [lng, lat], // Note: [lng, lat] — GeoJSON format
    },
    speed,
    timestamp: new Date(),
  });

  return trackingEntry;
};



export const createMaintenanceService = async (
    id: string,
    body: Partial<IMaintenance>
  ) => {

  
    const vehicleExists = await Vehicle.exists({_id:id}).lean();
    if (!vehicleExists) {
      throw new Error('Vehicle not found, cannot create maintenance record.');
    }
  
    // Create new maintenance record
    const newMaintenance = await Maintenance.create({
      vehicle: id,
      date: body.date ?? new Date(),
      description: body.description ?? '',
      cost: body.cost ?? 0,
    });
  
    return newMaintenance;
  };