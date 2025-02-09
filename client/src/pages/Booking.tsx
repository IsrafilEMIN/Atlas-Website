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
            {/* Calendar Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Select Date & Time</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border bg-white p-3"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day: "text-gray-900 hover:bg-gray-100",
                  day_disabled: "text-gray-400",
                  head_cell: "text-gray-600",
                  nav_button: "text-gray-600 hover:bg-gray-100",
                  caption: "text-gray-900",
                  nav: "space-x-1 flex items-center",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  head_row: "flex",
                  head_cell: "text-gray-600 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-gray-400 opacity-50",
                  day_disabled: "text-gray-400 opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                  root: "relative"
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

            {/* Booking Form */}
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
                          <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent 
                          className="bg-white text-gray-900 w-[var(--radix-select-trigger-width)]" 
                          position="popper"
                          sideOffset={4}
                          align="start"
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