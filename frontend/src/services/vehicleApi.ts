
import axios from 'axios';
import { Vehicle, VehicleBasic } from '@/types/vehicle';

const BASE_URL = 'http://localhost:5000/api';

export const getVehicles = async (): Promise<VehicleBasic[]> => {
  const response = await axios.get(`${BASE_URL}/vehicles`);
  return response.data;
};

export const getVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await axios.get(`${BASE_URL}/vehicles/${id}`);
  return response.data;
};
