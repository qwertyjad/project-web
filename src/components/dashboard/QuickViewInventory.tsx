"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Edit, Eye, Trash2, AlertCircle } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  threshold: number;
  status: "in-stock" | "low" | "critical" | "out-of-stock";
}

interface QuickViewInventoryProps {
  items?: InventoryItem[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const QuickViewInventory = ({
  items = [
    {
      id: "1",
      name: "Cement",
      category: "Building Materials",
      quantity: 15,
      threshold: 20,
      status: "low",
    },
    {
      id: "2",
      name: "Steel Bars (10mm)",
      category: "Reinforcement",
      quantity: 5,
      threshold: 10,
      status: "critical",
    },
    {
      id: "3",
      name: "Plywood Sheets",
      category: "Wood Materials",
      quantity: 0,
      threshold: 5,
      status: "out-of-stock",
    },
    {
      id: "4",
      name: "Paint (White)",
      category: "Finishing",
      quantity: 25,
      threshold: 10,
      status: "in-stock",
    },
    {
      id: "5",
      name: "Electrical Wires",
      category: "Electrical",
      quantity: 8,
      threshold: 15,
      status: "low",
    },
  ],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: QuickViewInventoryProps) => {
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
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Critical Inventory Items
        </h2>
        <Button variant="outline" size="sm">
          View All Inventory
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <AlertCircle className="h-12 w-12 mb-2" />
          <p>No inventory items to display</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(item.id)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item.id)}
                      title="Edit Item"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      title="Delete Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default QuickViewInventory;
