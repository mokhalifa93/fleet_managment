import { gpsEmitter } from './receiveLocation';


const sendLocation = (locationData: object, vehicleId: string) => {
    gpsEmitter.emit('locationUpdate', locationData);
};


setInterval(() => {
    const vehicleId = '6803bde88ae9bfac528d6956';
    const locationData = {
        lat: 12.9716 + Math.random() * 0.01,
        lng: 77.5946 + Math.random() * 0.01,
        speed: Math.floor(Math.random() * (180 - 20 + 1)) + 20,
        vehicleId
    }
    sendLocation(locationData, vehicleId);
}, 2000)