
import { Link } from "react-router-dom";
import { Car, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center">Fleet Management System</h1>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <Button asChild variant="outline" className="h-32 flex flex-col gap-2">
            <Link to="/register">
              <Car className="h-8 w-8" />
              <span>Vehicle Registration</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-32 flex flex-col gap-2">
            <Link to="/maintenance">
              <Wrench className="h-8 w-8" />
              <span>Vehicle Maintenance</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
