import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "1234", customer: "John Doe", status: "Completed", amount: "$123.45" },
  {
    id: "2345",
    customer: "Jane Smith",
    status: "Processing",
    amount: "$234.56",
  },
  { id: "3456", customer: "Bob Johnson", status: "Shipped", amount: "$345.67" },
  { id: "4567", customer: "Alice Brown", status: "Pending", amount: "$456.78" },
  {
    id: "5678",
    customer: "Charlie Davis",
    status: "Completed",
    amount: "$567.89",
  },
];

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Completed" ? "default" : "secondary"
                    }>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
