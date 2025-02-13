import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  BarChart,
  CreditCard,
  DollarSign,
  PieChart,
  Users,
} from "lucide-react";
import SalesChart from "../components/SalesChart";
import BarCharts from "../components/BarCharts";
import RecentOrders from "../components/RecentOrders";
import ChatBot from "../components/ChatBot";
import PieCharts from "../components/PieChart";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden transition-all hover:scale-[101%]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-30" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <div className="text-2xl font-bold">$45,231.89</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 p-3">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="flex items-center text-sm text-green-500">
              <span className="mr-1">↑</span>
              20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all hover:scale-[101%]">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-orange-500/20 opacity-30" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Subscriptions
              </CardTitle>
              <div className="text-2xl font-bold">+2350</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-pink-400 to-orange-500 p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="flex items-center text-sm text-green-500">
              <span className="mr-1">↑</span>
              180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all hover:scale-[101%]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 opacity-30" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sales
              </CardTitle>
              <div className="text-2xl font-bold">+12,234</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 p-3">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="flex items-center text-sm text-green-500">
              <span className="mr-1">↑</span>
              19% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all hover:scale-[101%]">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-fuchsia-500/20 opacity-30" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Now
              </CardTitle>
              <div className="text-2xl font-bold">+573</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-500 p-3">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="flex items-center text-sm text-green-500">
              <span className="mr-1">↑</span>
              201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <SalesChart />
        <BarCharts />
      </div>

      <div className="mt-8">
        <RecentOrders />
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="min-h-[300px] rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieCharts />
          </CardContent>
        </Card>

        <Card className="min-h-[300px] rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex animate-pulse items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded bg-gray-200" />
                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <ChatBot />
    </div>
  );
}
