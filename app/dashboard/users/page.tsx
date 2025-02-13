import RecentOrders from "@/app/components/RecentOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinned, Users, UserRound } from "lucide-react";
import React, { use } from "react";

export default async function UsersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-5">
      <Card className="max-w-screen mx-auto shadow-xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <UserRound className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl font-bold">Users</CardTitle>
              <p className="text-sm font-light mt-1 opacity-90">
                Join our network of premium healthcare providers
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <RecentOrders />
        </CardContent>
      </Card>
    </div>
  );
}
