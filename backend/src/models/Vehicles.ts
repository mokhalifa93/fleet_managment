import { Schema, model, Document } from 'mongoose';

export interface IVehicle extends Document {
  name: string;
  vehicleModel: string;
  type: string;
  analytics: {
    hoursOperated: number;
    distanceTraveled: number;
    updatedAt: Date;
  };
}

const AnalyticsSchema = new Schema(
  {
    hoursOperated: { type: Number, default: 0 },
    distanceTraveled: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
  },
  { _id: false } // embedded schema, no separate _id
);

const VehicleSchema = new Schema<IVehicle>(
  {
    name: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    type: { type: String, required: true },
    analytics: {
      type: AnalyticsSchema,
      default: () => ({}) // default empty analytics block
    }
  },
  {
    timestamps: true
  }
);

export const Vehicle = model<IVehicle>('Vehicle', VehicleSchema);
