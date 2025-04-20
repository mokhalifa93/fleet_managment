
import { ChartBar, FileText } from "lucide-react";
import MaintenanceLogs from "@/components/MaintenanceLogs";
import VehicleAnalytics from "@/components/VehicleAnalytics";

const Logs = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Vehicle Management Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Maintenance Logs</h2>
          </div>
          <MaintenanceLogs />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ChartBar className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Analytics</h2>
          </div>
          <VehicleAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Logs;
