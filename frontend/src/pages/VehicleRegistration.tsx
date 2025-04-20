
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleRegistrationForm from "@/components/VehicleRegistrationForm";

const VehicleRegistration = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold">Vehicle Registration</h1>
        <VehicleRegistrationForm />
      </div>
    </div>
  );
};

export default VehicleRegistration;
