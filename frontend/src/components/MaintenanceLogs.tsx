
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getVehicles, getVehicleById } from "@/services/vehicleApi";
import { format } from "date-fns";
import { MaintenanceRecord } from "@/types/vehicle";

const MaintenanceLogs = () => {
  const [allMaintenanceRecords, setAllMaintenanceRecords] = useState<(MaintenanceRecord & { vehicleName: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  useEffect(() => {
    const fetchAllMaintenanceRecords = async () => {
      if (!vehicles) return;
      
      try {
        setIsLoading(true);
        const records: (MaintenanceRecord & { vehicleName: string })[] = [];
        
        for (const vehicle of vehicles) {
          const fullVehicle = await getVehicleById(vehicle._id);
          const vehicleRecords = fullVehicle.maintenanceRecords.map(record => ({
            ...record,
            vehicleName: `${vehicle.type} ${vehicle.vehicleModel}`,
          }));
          records.push(...vehicleRecords);
        }
        
        setAllMaintenanceRecords(records);
      } catch (error) {
        console.error("Error fetching maintenance records:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMaintenanceRecords();
  }, [vehicles]);

  if (isLoading) {
    return <div className="p-4">Loading maintenance records...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allMaintenanceRecords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">No maintenance records found</TableCell>
            </TableRow>
          ) : (
            allMaintenanceRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.vehicleName}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{format(new Date(record.date), 'yyyy-MM-dd')}</TableCell>
                <TableCell>${record.cost}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceLogs;
