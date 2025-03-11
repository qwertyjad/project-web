"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import StockSummaryCards from "@/components/dashboard/StockSummaryCards";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";
import QuickViewInventory from "@/components/dashboard/QuickViewInventory";
import InventoryActionButtons from "@/components/dashboard/InventoryActionButtons";

export default function Home() {
  // Mock handlers for actions
  const handleProcurementClick = (itemId: string) => {
    console.log(`Navigate to procurement for item: ${itemId}`);
  };

  const handleViewItem = (id: string) => {
    console.log(`View item details for: ${id}`);
  };

  const handleEditItem = (id: string) => {
    console.log(`Edit item: ${id}`);
  };

  const handleDeleteItem = (id: string) => {
    console.log(`Delete item: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 pt-6 pb-8 px-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your inventory status</p>
        </div>

        {/* Stock Summary Cards */}
        <div className="mb-6">
          <StockSummaryCards
            totalItems={1250}
            inStockItems={1100}
            lowStockItems={75}
            outOfStockItems={75}
            totalItemsChange={{ value: 12, type: "increase" }}
            inStockItemsChange={{ value: 8, type: "increase" }}
            lowStockItemsChange={{ value: 5, type: "increase" }}
            outOfStockItemsChange={{ value: 3, type: "decrease" }}
          />
        </div>

        {/* Low Stock Alerts */}
        <div className="mb-6">
          <LowStockAlerts
            onProcurementClick={handleProcurementClick}
            items={[
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
            ]}
          />
        </div>

        {/* Inventory Action Buttons */}
        <div className="mb-4">
          <InventoryActionButtons className="bg-white rounded-lg shadow-sm" />
        </div>

        {/* Quick View Inventory Table */}
        <div>
          <QuickViewInventory
            onView={handleViewItem}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            items={[
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
            ]}
          />
        </div>
      </main>
    </div>
  );
}
