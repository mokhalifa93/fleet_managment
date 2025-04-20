
import { useQuery } from "@tanstack/react-query";
import { getVehicleById } from "@/services/vehicleApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface MaintenanceDetailsProps {
  vehicleId: string;
}

const MaintenanceDetails = ({ vehicleId }: MaintenanceDetailsProps) => {
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => getVehicleById(vehicleId),
  });

  if (isLoading) {
    return <div className="py-2 text-sm text-muted-foreground">Loading maintenance records...</div>;
  }

  if (!vehicle || vehicle.maintenanceRecords.length === 0) {
    return <div className="py-2 text-sm text-muted-foreground">No maintenance records found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicle.maintenanceRecords.map((record) => (
          <TableRow key={record._id}>
            <TableCell>{format(new Date(record.date), 'yyyy-MM-dd')}</TableCell>
            <TableCell>{record.description}</TableCell>
            <TableCell>${record.cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaintenanceDetails;
