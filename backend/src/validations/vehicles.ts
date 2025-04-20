import Joi from 'joi';
import mongoose from 'mongoose';
export const vehicleSchema = Joi.object({
  name: Joi.string().trim().required().label('Vehicle Name'),
  vehicleModel: Joi.string().trim().required().label('Vehicle Model'),
  type: Joi.string().trim().required().label('Vehicle Type'),
});


export const maintenanceSchema = Joi.object({
    vehicle: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('Invalid vehicle ID format');
        }
        return value;
      })
      .required()
      .label('Vehicle ID'),
    
    description: Joi.string().allow('').optional().label('Description'),
  
    cost: Joi.number().min(0).optional().label('Cost'),
  });