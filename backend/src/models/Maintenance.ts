import mongoose, { Document, Schema,Types  } from 'mongoose';

export interface IMaintenance extends Document {
  vehicle: Types.ObjectId | string;
  date: Date;
  description: string;
  cost: number;
}

const maintenanceSchema = new Schema<IMaintenance>({
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, required: true },
  description: String,
  cost: Number,
});

maintenanceSchema.index({ vehicle: 1, timestamp: -1 });


export default mongoose.model<IMaintenance>('Maintenance', maintenanceSchema);
