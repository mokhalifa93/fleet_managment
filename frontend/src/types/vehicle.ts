
export interface MaintenanceRecord {
  _id: string;
  vehicle: string;
  date: string;
  description: string;
  cost: number;
}

export interface VehicleAnalytics {
  hoursOperated: number;
  distanceTraveled: number;
  updatedAt: string;
}

export interface VehicleBasic {
  _id: string;
  name: string;
  vehicleModel: string;
  type: string;
  createdAt: string;
}

export interface Vehicle extends VehicleBasic {
  analytics: VehicleAnalytics;
  maintenanceRecords: MaintenanceRecord[];
  updatedAt: string;
}
