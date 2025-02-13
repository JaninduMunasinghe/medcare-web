"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RocketIcon,
  HospitalIcon,
  PhoneIcon,
  MailIcon,
  CrosshairIcon,
  CalendarClockIcon,
} from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  hospitalName: z.string().min(2),
  address: z.string().min(5),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  specialities: z.string().min(5),
  emergencyUnit: z.enum(["yes", "no"]),
  icu: z.enum(["yes", "no"]),
  pharmacy: z.enum(["yes", "no"]),
});

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalName: "",
      address: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      specialities: "",
      emergencyUnit: "no",
      icu: "no",
      pharmacy: "no",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting form...", values);
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url; // Redirect to Stripe
      }

      console.log("Form submitted successfully!");

      // Optionally, redirect or show success message
      //alert("Hospital registered successfully!");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-5">
      <Card className="max-w-screen mx-auto shadow-xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <RocketIcon className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl font-bold">
                Hospital Registration
              </CardTitle>
              <p className="text-sm font-light mt-1 opacity-90">
                Join our network of premium healthcare providers
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("🚨 Form submit event triggered");
                form.handleSubmit((values) => {
                  console.log("🔥 Inside handleSubmit callback");
                  onSubmit(values);
                })(e);
              }}
              className="space-y-8">
              {/* Basic Information */}
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <HospitalIcon className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Basic Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="hospitalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Hospital Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="St. Mary's Hospital"
                              {...field}
                              className="focus-visible:ring-blue-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Hospital Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Address"
                              {...field}
                              className="focus-visible:ring-blue-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Postal Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Postal Code"
                              {...field}
                              className="focus-visible:ring-blue-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Country
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Country"
                              {...field}
                              className="focus-visible:ring-blue-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Add other basic fields with similar styling */}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <PhoneIcon className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Contact Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 234 567 890"
                              {...field}
                              className="focus-visible:ring-green-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="contact@hospital.com"
                              {...field}
                              className="focus-visible:ring-green-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Medical Facilities */}
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CrosshairIcon className="h-5 w-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Medical Facilities
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="emergencyUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Emergency Unit
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4">
                              {["yes", "no"].map((option) => (
                                <div
                                  key={option}
                                  className={`flex items-center space-x-2 p-3 rounded-lg border ${
                                    field.value === option
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 hover:border-blue-300"
                                  }`}>
                                  <RadioGroupItem value={option} id={option} />
                                  <FormLabel
                                    htmlFor={option}
                                    className="font-normal capitalize text-gray-600">
                                    {option}
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="icu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">ICU</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4">
                              {["yes", "no"].map((option) => (
                                <div
                                  key={option}
                                  className={`flex items-center space-x-2 p-3 rounded-lg border ${
                                    field.value === option
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 hover:border-blue-300"
                                  }`}>
                                  <RadioGroupItem value={option} id={option} />
                                  <FormLabel
                                    htmlFor={option}
                                    className="font-normal capitalize text-gray-600">
                                    {option}
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pharmacy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Pharmacy
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4">
                              {["yes", "no"].map((option) => (
                                <div
                                  key={option}
                                  className={`flex items-center space-x-2 p-3 rounded-lg border ${
                                    field.value === option
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 hover:border-blue-300"
                                  }`}>
                                  <RadioGroupItem value={option} id={option} />
                                  <FormLabel
                                    htmlFor={option}
                                    className="font-normal capitalize text-gray-600">
                                    {option}
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Similar styling for other radio groups */}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarClockIcon className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Additional Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="specialities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Specialities
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Cardiology, Neurology..."
                              className="min-h-[100px] focus-visible:ring-purple-500 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Other fields with similar styling */}
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-6 text-md font-semibold transition-all transform hover:scale-[1.01] shadow-lg">
                {loading ? "Processing..." : "Submit & Pay"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
