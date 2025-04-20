
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getVehicles, getVehicleById } from "@/services/vehicleApi";
import { Vehicle } from "@/types/vehicle";

const VehicleAnalytics = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const { data: vehicles, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  const { data: vehicleDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['vehicle', selectedVehicleId],
    queryFn: () => selectedVehicleId ? getVehicleById(selectedVehicleId) : null,
    enabled: !!selectedVehicleId,
  });

  if (isLoadingVehicles) {
    return <div className="p-4">Loading analytics...</div>;
  }

  const vehicleMaintenanceData = vehicles?.map(vehicle => ({
    vehicleName: `${vehicle.type} ${vehicle.vehicleModel}`,
    name: vehicle.name,
    id: vehicle._id,
  }));

  // Safely create analytics data and handle the case when analytics might be undefined
  const analyticsData = vehicleDetails ? [
    {
      name: vehicleDetails.name,
      hoursOperated: vehicleDetails.analytics?.hoursOperated || 0,
      distanceTraveled: vehicleDetails.analytics?.distanceTraveled || 0,
      maintenanceCount: vehicleDetails.maintenanceRecords?.length || 0,
    }
  ] : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {vehicleMaintenanceData?.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => setSelectedVehicleId(vehicle.id)}
            className={`p-4 rounded-lg border ${
              selectedVehicleId === vehicle.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="text-sm font-medium">{vehicle.vehicleName}</div>
            <div className="text-xs text-muted-foreground">{vehicle.name}</div>
          </button>
        ))}
      </div>

      {selectedVehicleId && (
        <div className="h-[400px] w-full rounded-md border p-4">
          {isLoadingDetails ? (
            <div className="flex items-center justify-center h-full">
              Loading vehicle details...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="hoursOperated" fill="#8884d8" name="Hours Operated" />
                <Bar yAxisId="right" dataKey="distanceTraveled" fill="#82ca9d" name="Distance Traveled" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleAnalytics;
