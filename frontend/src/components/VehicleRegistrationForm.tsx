
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Vehicle name must be at least 2 characters"),
  model: z.string().min(2, "Model must be at least 2 characters"),
  type: z.string().min(2, "Type must be at least 2 characters"),
});

export default function VehicleRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      type: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post('http://localhost:5000/api/vehicles/register', {
        name: values.name,
        vehicleModel: values.model,
        type: values.type,
      });
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Vehicle registered successfully!");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to register vehicle. Please try again.");
      console.error("Registration error:", error);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Vehicle Registration</h1>
        <p className="text-gray-500">Enter your vehicle details below</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Register Vehicle</Button>
        </form>
      </Form>
    </div>
  );
}
