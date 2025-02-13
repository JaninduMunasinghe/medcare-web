"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I assist you?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const assistantAvatar = "/images/avatar.png";

  const SYSTEM_PROMPT = `
You are an AI chatbot designed to assist users with the hospital registration process. Your goal is to provide clear, step-by-step instructions to non-technical users.

When a user asks about how to register a hospital, respond with the following steps:

1. **Access the Registration Page**: Instruct the user to go to the hospital registration page on the website.

2. **Fill Out the Registration Form**: 
   - Explain that they need to provide various details such as:
     - Hospital Name
     - Address
     - City
     - State
     - Postal Code
     - Country
     - Phone Number
     - Email Address
   - Mention that there are some fields marked as required.

3. **Submit the Registration Form**:
   - After filling in all the necessary information, instruct the user to click on the “Submit & Pay” button.

4. **Proceed to Payment**:
   - Inform them that they will be redirected to a secure payment page.
   - Explain that they need to enter their payment details (like credit card information) to complete the registration process.
   - Mention the registration fee $50 and any other relevant details about payment.

5. **Payment Confirmation**:
   - After the payment is processed, inform them that they will be redirected to a success page.
   - Let them know that the system will process their registration in the background.

6. **Registration Completion**:
   - Assure them that they will receive a confirmation message once their registration is successfully completed.

7. **Support**: 
   - Encourage users to ask questions if they need further assistance during any part of the registration process.
   - When user say hey, hello, hi, respond with a greeting message.
`;

  const generateGeminiResponse = async (chatHistory: typeof messages) => {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    if (!API_KEY) {
      console.error("Gemini API key not found");
      return "Error: API key not configured";
    }

    try {
      // Structure the API request with system prompt and conversation history
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            // System prompt as the first context message
            {
              role: "user",
              parts: [{ text: SYSTEM_PROMPT }],
            },
            // Initial assistant response
            {
              role: "model",
              parts: [{ text: "Understood. I'm ready to help customers." }],
            },
            // Map chat history to API format
            ...chatHistory.map((msg) => ({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.content }],
            })),
          ],
        }),
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error:", error);
      return "I apologize, but I encountered an error. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update messages with user input
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Get response from Gemini with full conversation context
    const geminiResponse = await generateGeminiResponse(newMessages);

    const assistantMessage = {
      role: "assistant",
      content: geminiResponse,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 pr-8 ">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-blue-700 animate-bounce">
          <MessageCircle className="h-6 w-6" />
        </button>

        {isOpen && (
          <div className="absolute bottom-20 right-0 w-96 overflow-hidden rounded-xl border bg-white shadow-xl">
            <div className="bg-blue-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Support Chat</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-blue-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm">How can we help you today?</p>
            </div>
            <div className="h-96 p-4">
              <div className="flex h-full flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      } items-start space-x-2 ${
                        message.role === "user" ? "space-x-reverse" : ""
                      }`}>
                      <div
                        className={`h-8 w-8 rounded-full ${
                          message.role === "user"
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}>
                        {message.role === "assistant" && (
                          <img
                            src={assistantAvatar}
                            alt="Assistant Avatar"
                            className="h-full w-full rounded-full"
                          />
                        )}
                      </div>
                      <div
                        className={`max-w-[70%] rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        } p-3`}>
                        <p className="text-sm">{message.content}</p>
                        <span
                          className={`text-xs ${
                            message.role === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 delay-75"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 delay-100"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 delay-150"></div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
