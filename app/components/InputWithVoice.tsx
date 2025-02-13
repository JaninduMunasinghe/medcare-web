"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface InputWithVoiceProps {
  value: string;
  onChange: (value: string) => void;
  [key: string]: any;
}

export default function InputWithVoice({
  value,
  onChange,
  ...props
}: InputWithVoiceProps) {
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = false;
        recognition.current.interimResults = false;
        recognition.current.lang = "en-US";

        recognition.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          onChange(transcript);
          setIsListening(false);
        };

        recognition.current.onerror = () => {
          setIsListening(false);
        };

        recognition.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onChange]);

  const startListening = () => {
    if (isListening) return;

    if (recognition.current) {
      recognition.current.start();
      setIsListening(true);

      timeoutRef.current = setTimeout(() => {
        setIsListening(false);
        recognition.current?.stop();
      }, 10000); // Stop after 10 seconds
    }
  };

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded pr-10"
      />
      <button
        type="button"
        onClick={startListening}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${
          isListening ? "text-red-500" : "text-gray-500 hover:text-blue-500"
        }`}
        disabled={!recognition.current}
        title={
          recognition.current
            ? "Voice input"
            : "Speech recognition not supported"
        }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>
    </div>
  );
}
