"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDown,
  ArrowUp,
  Package,
  PackageCheck,
  PackageX,
} from "lucide-react";

interface StockSummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  className?: string;
}

const StockSummaryCard = ({
  title = "Card Title",
  value = 0,
  icon = <Package className="h-6 w-6" />,
  change,
  className = "",
}: StockSummaryCardProps) => {
  return (
    <Card className={`bg-white ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full bg-blue-50 p-2 text-blue-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="mt-1 flex items-center text-xs">
            {change.type === "increase" ? (
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span
              className={`${change.type === "increase" ? "text-green-500" : "text-red-500"}`}
            >
              {change.value}% from last week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StockSummaryCardsProps {
  totalItems?: number;
  inStockItems?: number;
  lowStockItems?: number;
  outOfStockItems?: number;
  totalItemsChange?: {
    value: number;
    type: "increase" | "decrease";
  };
  inStockItemsChange?: {
    value: number;
    type: "increase" | "decrease";
  };
  lowStockItemsChange?: {
    value: number;
    type: "increase" | "decrease";
  };
  outOfStockItemsChange?: {
    value: number;
    type: "increase" | "decrease";
  };
}

const StockSummaryCards = ({
  totalItems = 1250,
  inStockItems = 1100,
  lowStockItems = 75,
  outOfStockItems = 75,
  totalItemsChange = { value: 12, type: "increase" },
  inStockItemsChange = { value: 8, type: "increase" },
  lowStockItemsChange = { value: 5, type: "increase" },
  outOfStockItemsChange = { value: 3, type: "decrease" },
}: StockSummaryCardsProps) => {
  return (
    <div className="w-full bg-gray-50 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StockSummaryCard
          title="Total Items"
          value={totalItems}
          icon={<Package className="h-6 w-6" />}
          change={totalItemsChange}
        />
        <StockSummaryCard
          title="In Stock Items"
          value={inStockItems}
          icon={<PackageCheck className="h-6 w-6" />}
          change={inStockItemsChange}
        />
        <StockSummaryCard
          title="Low Stock Items"
          value={lowStockItems}
          icon={<Package className="h-6 w-6" />}
          change={lowStockItemsChange}
          className="border-yellow-300"
        />
        <StockSummaryCard
          title="Out of Stock Items"
          value={outOfStockItems}
          icon={<PackageX className="h-6 w-6" />}
          change={outOfStockItemsChange}
          className="border-red-300"
        />
      </div>
    </div>
  );
};

export default StockSummaryCards;
