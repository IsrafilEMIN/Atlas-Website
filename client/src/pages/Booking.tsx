import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertBookingSchema } from "@shared/schema";

export default function Booking() {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();

  const form = useForm({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceType: "",
      projectDetails: "",
    },
  });

  const onSubmit = async (data: any) => {
    // TODO: Implement booking submission
    console.log(data, date, timeSlot);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Book an Appointment
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar Section - Styles updated for proper containment */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Select Date & Time</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                classNames={{
                  root: "relative",
                  nav: "relative flex items-center justify-between px-2",
                  nav_button_previous: "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_next: "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  head_row: "flex",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_hidden: "invisible",
                }}
              />

              {date && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2 text-gray-900">Available Time Slots</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"].map((time) => (
                      <Button
                        key={time}
                        variant={timeSlot === time ? "default" : "outline"}
                        onClick={() => setTimeSlot(time)}
                        className={`w-full ${timeSlot === time ? 'bg-primary text-white' : 'text-gray-900 border-gray-300 hover:bg-gray-100'}`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Form - Updated Select component styling */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white text-gray-900 border-gray-300 w-full">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent 
                          className="bg-white text-gray-900"
                          position="item-aligned"
                        >
                          <SelectItem value="residential">Residential Painting</SelectItem>
                          <SelectItem value="commercial">Commercial Painting</SelectItem>
                          <SelectItem value="exterior">Exterior Painting</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-white text-gray-900 border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} className="bg-white text-gray-900 border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} className="bg-white text-gray-900 border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your project (size, current condition, special requirements, etc.)"
                          className="h-32 bg-white text-gray-900 border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!date || !timeSlot}
                >
                  Schedule Consultation
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}