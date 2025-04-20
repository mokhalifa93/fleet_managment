import { EventEmitter } from 'events';
import axios from 'axios';

class GPSEventEmitter extends EventEmitter { }

export const gpsEmitter = new GPSEventEmitter();


gpsEmitter.on('locationUpdate', async (data: { lat: number; lng: number; speed: number; vehicleId: string }) => {
  try {

    const response = await axios.post(`http://localhost:5000/api/vehicles/track/${data.vehicleId}`, {
      lat: data.lat,
      lng: data.lng,
      speed: data.speed
    });
    console.log(`📍 Vehicle ${data.vehicleId} updated location: ${data.lat},${data.lng} with statusCode: ${response.status}`);

  } catch (error) {
    throw error
  }
});


