"use client";

import { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RocketIcon,
  HospitalIcon,
  PhoneIcon,
  MailIcon,
  CrosshairIcon,
  CalendarClockIcon,
  MapPinned,
} from "lucide-react";
const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const center = {
  lat: 23.8103, // Default center (Dhaka)
  lng: 90.4125,
};

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [hospitalName, setHospitalName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation || !hospitalName) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: hospitalName,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      alert("Hospital registered successfully!");
      setHospitalName("");
      setSelectedLocation(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-5">
      <Card className="max-w-screen mx-auto shadow-xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <MapPinned className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl font-bold">
                Google Maps Integration
              </CardTitle>
              <p className="text-sm font-light mt-1 opacity-90">
                Join our network of premium healthcare providers
              </p>
            </div>
          </div>
        </CardHeader>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter hospital name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Location on Map
              </label>
              {!isLoaded ? (
                <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={12}
                  onClick={handleMapClick}>
                  {selectedLocation && <Marker position={selectedLocation} />}
                </GoogleMap>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Click on the map to select hospital location
              </p>
            </div>

            <button
              type="submit"
              disabled={!selectedLocation || !hospitalName || isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
              {isSubmitting ? "Registering..." : "Register Hospital"}
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
