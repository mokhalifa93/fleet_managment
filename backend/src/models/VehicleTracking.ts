// models/VehicleTracking.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IVehicleTracking extends Document {
  vehicle: Types.ObjectId; // Reference to Vehicle
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  speed: number;
  timestamp: Date;
}

const VehicleTrackingSchema = new Schema<IVehicleTracking>(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    speed: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Geo index for location
VehicleTrackingSchema.index({ location: '2dsphere' });
VehicleTrackingSchema.index({ vehicle: 1, timestamp: -1 });

export const VehicleTracking = model<IVehicleTracking>('VehicleTracking', VehicleTrackingSchema);
