"use client";

import React from "react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AlertTriangle, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LowStockItem {
  id: string;
  name: string;
  category: string;
  currentQuantity: number;
  minQuantity: number;
  status: "low" | "critical";
}

interface LowStockAlertsProps {
  items?: LowStockItem[];
  onProcurementClick?: (itemId: string) => void;
}

const LowStockAlerts = ({
  items = [
    {
      id: "1",
      name: "Cement",
      category: "Building Materials",
      currentQuantity: 5,
      minQuantity: 10,
      status: "low",
    },
    {
      id: "2",
      name: "Steel Rebar",
      category: "Structural Materials",
      currentQuantity: 2,
      minQuantity: 15,
      status: "critical",
    },
    {
      id: "3",
      name: "Plywood Sheets",
      category: "Wood Materials",
      currentQuantity: 8,
      minQuantity: 20,
      status: "low",
    },
  ],
  onProcurementClick = () => {},
}: LowStockAlertsProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Low Stock Alerts
        </h2>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => onProcurementClick("all")}
        >
          <ShoppingCart className="h-4 w-4" />
          Order All Low Stock Items
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No low stock items to display
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Alert
              key={item.id}
              className={cn(
                "border-l-4",
                item.status === "critical"
                  ? "border-l-red-500 bg-red-50"
                  : "border-l-yellow-500 bg-yellow-50",
              )}
            >
              <div className="flex items-start">
                <AlertTriangle
                  className={cn(
                    "h-5 w-5 mr-2",
                    item.status === "critical"
                      ? "text-red-500"
                      : "text-yellow-500",
                  )}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <AlertTitle className="text-gray-900">
                        {item.name}
                      </AlertTitle>
                      <AlertDescription className="text-sm text-gray-600">
                        Category: {item.category} | Current Stock:{" "}
                        {item.currentQuantity} | Minimum Required:{" "}
                        {item.minQuantity}
                      </AlertDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.status === "critical"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          item.status === "critical"
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }
                      >
                        {item.status === "critical" ? "Critical" : "Low Stock"}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => onProcurementClick(item.id)}
                        className={cn(
                          "ml-2",
                          item.status === "critical"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-yellow-600 hover:bg-yellow-700",
                        )}
                      >
                        Order Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowStockAlerts;
