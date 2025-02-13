"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  useEffect(() => {
    const saveData = async () => {
      if (!data) return;
      const values = JSON.parse(decodeURIComponent(data));

      try {
        const response = await fetch("/api/hospitals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        alert("Hospital registered successfully!");
        router.push("/dashboard");
      } catch (error) {
        console.error("Save error:", error);
      }
    };

    saveData();
  }, [data, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          {/* Animated checkmark circle */}
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-emerald-500 rounded-full flex items-center justify-center mb-6 animate-icon-pop animate-bounce">
            <svg
              className="w-12 h-12 text-white animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
            Payment Successful!
          </h1>

          <p className="text-gray-600 text-lg text-center tracking-wide">
            Processing your registration. You'll be received a confirmation
            email shortly.
          </p>

          {/* Animated loading dots */}
          <div className="flex space-x-1 pt-4">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}></div>
            <div
              className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>

      {/* Optional: Additional decorative elements */}
      <div className="absolute bottom-8">
        <p className="text-sm text-gray-400 flex items-center">
          <span>Secure connection</span>
          <svg
            className="w-4 h-4 ml-2 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      </div>
    </div>
  );
}
