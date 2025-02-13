import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, FileText, PhoneCall, User } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950">
      <header className="p-4 bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Image
            src="/placeholder.svg?height=40&width=200"
            alt="Hospital Logo"
            width={200}
            height={40}
            className="dark:invert"
          />
          <nav className="space-x-4">
            <Link
              href="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline">
              About
            </Link>
            <Link
              href="/services"
              className="text-blue-600 dark:text-blue-400 hover:underline">
              Services
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-blue-800 dark:text-blue-200">
            Welcome to Admin Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your health is our priority. Register now for personalized care.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              <Link href="/sign-in">
                <User className="mr-2 h-5 w-5" />
                Sign In
              </Link>
            </Button>
            {/*             <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900">
              <Link href="/login">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
          </div>
        </div>
      </main>

      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <Calendar className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Book Appointment
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Schedule your visit with our expert doctors
            </p>
          </div>
          <div className="space-y-4">
            <FileText className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              View Records
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access your medical history securely online
            </p>
          </div>
          <div className="space-y-4">
            <PhoneCall className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              24/7 Support
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get help anytime with our dedicated support team
            </p>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 Hospital Name. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
