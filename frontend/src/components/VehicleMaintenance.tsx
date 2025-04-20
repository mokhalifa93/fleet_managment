import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVehicles, getVehicleById } from "@/services/vehicleApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MaintenanceDetails from "./MaintenanceDetails";
import VehicleAnalytics from "./VehicleAnalytics";

const VehicleMaintenanceAndAnalytics = () => {
  const [expandedVehicleId, setExpandedVehicleId] = useState<string>("");
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  const handleAccordionValueChange = async (value: string) => {
    if (!value || value === expandedVehicleId) {
      setExpandedVehicleId(null);
      return;
    }
    
    setExpandedVehicleId(value);
    setLoadingDetails(prev => ({ ...prev, [value]: true }));
    
    try {
      await getVehicleById(value);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    } finally {
      setLoadingDetails(prev => ({ ...prev, [value]: false }));
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading vehicles...</div>;
  }

  return (
    <div className="space-y-6">
      <VehicleAnalytics />
      
      <Accordion 
        type="single" 
        collapsible 
        className="w-full"
        value={expandedVehicleId}
        onValueChange={handleAccordionValueChange}
      >
        {vehicles?.map((vehicle) => (
          <AccordionItem key={vehicle._id} value={vehicle._id}>
            <AccordionTrigger className="text-left">
              {vehicle.type} {vehicle.vehicleModel} ({vehicle.name})
            </AccordionTrigger>
            <AccordionContent>
              {loadingDetails[vehicle._id] ? (
                <div className="py-2">Loading maintenance details...</div>
              ) : (
                <MaintenanceDetails vehicleId={vehicle._id} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default VehicleMaintenanceAndAnalytics;
