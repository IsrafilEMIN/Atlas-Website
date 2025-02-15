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
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceType: "",
      projectDetails: "",
      timeSlotId: 0, // This will be set based on date and timeSlot
    },
  });

  const onSubmit = async (data: any) => {
    if (!date || !timeSlot) {
      toast({
        title: "Error",
        description: "Please select a date and time slot",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert date and timeSlot to a proper timestamp for the backend
      const [hours, minutes] = timeSlot.split(':')[0].split(' ')[0].split(':');
      const isPM = timeSlot.includes('PM');
      let hour = parseInt(hours);
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;

      const bookingDate = new Date(date);
      bookingDate.setHours(hour);
      bookingDate.setMinutes(parseInt(minutes));

      const response = await fetch('/api/booking/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timeSlotId: 1, // This should be replaced with actual time slot ID from backend
          status: 'pending',
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book appointment');
      }

      // Reset form
      form.reset();
      setDate(undefined);
      setTimeSlot(undefined);

      toast({
        title: "Success",
        description: "Booking successful! You will receive confirmation via email.",
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to book appointment. Please try again.',
        variant: "destructive",
      });
    }
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(date || new Date());
    newDate.setFullYear(year);
    setDate(newDate);
    setIsYearSelectOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-32 pb-16 relative">
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
                className="rounded-md border"
                showOutsideDays={false}
                fromYear={2024}
                toYear={2025}
                classNames={{
                  root: "w-full",
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-black hover:bg-gray-100 rounded-md px-2 py-1 cursor-pointer",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 text-black hover:bg-gray-100 rounded-md",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-black rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-black",
                  day: `h-8 w-8 p-0 font-normal text-black hover:bg-gray-100 rounded-md
                    aria-selected:bg-black aria-selected:text-white
                    focus:bg-black focus:text-white
                    focus-visible:bg-black focus-visible:text-white`,
                  day_today: "bg-gray-100 text-black font-semibold",
                  day_outside: "text-gray-400",
                  day_disabled: "text-gray-300",
                  day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-black",
                  day_hidden: "invisible",
                  caption_dropdowns: "flex justify-center space-x-2",
                  dropdown: "relative inline-block",
                  dropdown_month: "text-black font-semibold",
                  dropdown_year: "text-black font-semibold cursor-pointer",
                  dropdown_icon: "ml-1 h-4 w-4"
                }}
                components={{
                  Caption: ({ displayMonth }) => {
                    const year = displayMonth.getFullYear();
                    const month = displayMonth.toLocaleString('default', { month: 'long' });

                    return (
                      <div className="flex justify-center items-center space-x-2">
                        <span className="text-black font-semibold">{month}</span>
                        <span 
                          className="text-black font-semibold cursor-pointer"
                          onClick={() => setIsYearSelectOpen(!isYearSelectOpen)}
                        >
                          {year}
                        </span>
                        {isYearSelectOpen && (
                          <div className="absolute top-8 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50">
                            {Array.from({ length: 5 }, (_, i) => currentYear + i).map((y) => (
                              <div
                                key={y}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                                onClick={() => handleYearSelect(y)}
                              >
                                {y}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                }}
              />

              {date && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2 text-gray-900">Available Time Slots</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = Math.floor(i / 2) + 8;
                      const minute = i % 2 === 0 ? '00' : '30';
                      const ampm = hour >= 12 ? 'PM' : 'AM';
                      const hour12 = hour > 12 ? hour - 12 : hour;
                      return `${hour12}:${minute} ${ampm}`;
                    }).map((time) => (
                      <Button
                        key={time}
                        variant={timeSlot === time ? "default" : "outline"}
                        onClick={() => setTimeSlot(time)}
                        className={
                          timeSlot === time
                            ? 'bg-black text-white hover:bg-black/90'
                            : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Service Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            side="bottom"
                            position="popper"
                            className="bg-white text-gray-900 z-50"
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
                    className="w-full bg-black hover:bg-black/90 text-white"
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
    </div>
  );
}