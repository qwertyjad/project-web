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
import { Edit, Eye, Trash2, Plus, Download, Filter } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  threshold: number;
  unit: string;
  location: string;
  lastUpdated: string;
  status: "in-stock" | "low" | "critical" | "out-of-stock";
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: "1",
      name: "Cement",
      category: "Building Materials",
      quantity: 15,
      threshold: 20,
      unit: "Bags",
      location: "Warehouse A",
      lastUpdated: "2023-10-15",
      status: "low",
    },
    {
      id: "2",
      name: "Steel Bars (10mm)",
      category: "Reinforcement",
      quantity: 5,
      threshold: 10,
      unit: "Pieces",
      location: "Warehouse B",
      lastUpdated: "2023-10-14",
      status: "critical",
    },
    {
      id: "3",
      name: "Plywood Sheets",
      category: "Wood Materials",
      quantity: 0,
      threshold: 5,
      unit: "Sheets",
      location: "Warehouse A",
      lastUpdated: "2023-10-13",
      status: "out-of-stock",
    },
    {
      id: "4",
      name: "Paint (White)",
      category: "Finishing",
      quantity: 25,
      threshold: 10,
      unit: "Gallons",
      location: "Warehouse C",
      lastUpdated: "2023-10-12",
      status: "in-stock",
    },
    {
      id: "5",
      name: "Electrical Wires",
      category: "Electrical",
      quantity: 8,
      threshold: 15,
      unit: "Rolls",
      location: "Warehouse B",
      lastUpdated: "2023-10-11",
      status: "low",
    },
    {
      id: "6",
      name: "PVC Pipes (2 inch)",
      category: "Plumbing",
      quantity: 30,
      threshold: 10,
      unit: "Pieces",
      location: "Warehouse A",
      lastUpdated: "2023-10-10",
      status: "in-stock",
    },
    {
      id: "7",
      name: "Concrete Blocks",
      category: "Building Materials",
      quantity: 200,
      threshold: 50,
      unit: "Pieces",
      location: "Warehouse A",
      lastUpdated: "2023-10-09",
      status: "in-stock",
    },
  ];

  // Get unique categories for filter
  const categories = [...new Set(inventoryItems.map((item) => item.category))];

  // Filter items based on search term and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesStatus = statusFilter ? item.status === statusFilter : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-500">In Stock</Badge>;
      case "low":
        return <Badge className="bg-yellow-500">Low Stock</Badge>;
      case "critical":
        return <Badge className="bg-orange-500">Critical</Badge>;
      case "out-of-stock":
        return <Badge className="bg-red-500">Out of Stock</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 pt-6 pb-8 px-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Manage your construction materials and equipment
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="ghost">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.quantity} / {item.threshold}
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit Item">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete Item">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
