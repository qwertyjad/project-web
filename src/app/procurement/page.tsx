"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Truck, Users, Eye, Edit, Trash2 } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  supplier: string;
  items: number;
  totalAmount: number;
  orderDate: string;
  expectedDelivery: string;
  status: "pending" | "approved" | "shipped" | "delivered" | "cancelled";
}

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: "active" | "inactive";
}

export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Mock orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "PO-2023-001",
      supplier: "ABC Building Supplies",
      items: 5,
      totalAmount: 25000,
      orderDate: "2023-10-15",
      expectedDelivery: "2023-10-22",
      status: "pending",
    },
    {
      id: "2",
      orderNumber: "PO-2023-002",
      supplier: "Steel Masters Inc.",
      items: 2,
      totalAmount: 15000,
      orderDate: "2023-10-14",
      expectedDelivery: "2023-10-21",
      status: "approved",
    },
    {
      id: "3",
      orderNumber: "PO-2023-003",
      supplier: "Woodworks Co.",
      items: 3,
      totalAmount: 8000,
      orderDate: "2023-10-12",
      expectedDelivery: "2023-10-19",
      status: "shipped",
    },
    {
      id: "4",
      orderNumber: "PO-2023-004",
      supplier: "Paint Experts",
      items: 4,
      totalAmount: 5000,
      orderDate: "2023-10-10",
      expectedDelivery: "2023-10-17",
      status: "delivered",
    },
    {
      id: "5",
      orderNumber: "PO-2023-005",
      supplier: "Electrical Supplies Ltd.",
      items: 6,
      totalAmount: 12000,
      orderDate: "2023-10-08",
      expectedDelivery: "2023-10-15",
      status: "cancelled",
    },
  ];

  // Mock suppliers data
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "ABC Building Supplies",
      contactPerson: "John Smith",
      email: "john@abcbuilding.com",
      phone: "123-456-7890",
      address: "123 Main St, Naval, Biliran",
      category: "Building Materials",
      status: "active",
    },
    {
      id: "2",
      name: "Steel Masters Inc.",
      contactPerson: "Maria Garcia",
      email: "maria@steelmasters.com",
      phone: "234-567-8901",
      address: "456 Oak Ave, Naval, Biliran",
      category: "Reinforcement",
      status: "active",
    },
    {
      id: "3",
      name: "Woodworks Co.",
      contactPerson: "David Lee",
      email: "david@woodworks.com",
      phone: "345-678-9012",
      address: "789 Pine St, Naval, Biliran",
      category: "Wood Materials",
      status: "active",
    },
    {
      id: "4",
      name: "Paint Experts",
      contactPerson: "Sarah Johnson",
      email: "sarah@paintexperts.com",
      phone: "456-789-0123",
      address: "101 Maple Rd, Naval, Biliran",
      category: "Finishing",
      status: "active",
    },
    {
      id: "5",
      name: "Electrical Supplies Ltd.",
      contactPerson: "Michael Brown",
      email: "michael@electricalsupplies.com",
      phone: "567-890-1234",
      address: "202 Elm St, Naval, Biliran",
      category: "Electrical",
      status: "inactive",
    },
  ];

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "approved":
        return <Badge className="bg-blue-500">Approved</Badge>;
      case "shipped":
        return <Badge className="bg-purple-500">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getSupplierStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 pt-6 pb-8 px-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Procurement</h1>
          <p className="text-gray-600">Manage orders and suppliers</p>
        </div>

        <Tabs
          defaultValue="orders"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="orders" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> Suppliers
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {/* Filters and Actions */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Order
                </Button>
                <Button variant="outline">
                  <Truck className="mr-2 h-4 w-4" />
                  Track Shipments
                </Button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        ₱{order.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.expectedDelivery}</TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Order"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Cancel Order"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-4">
            {/* Filters and Actions */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Supplier
                </Button>
              </div>
            </div>

            {/* Suppliers Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">
                        {supplier.name}
                      </TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.category}</TableCell>
                      <TableCell>
                        {getSupplierStatusBadge(supplier.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Supplier"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete Supplier"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
