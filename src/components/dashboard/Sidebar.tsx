"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/", icon: <Home className="h-5 w-5 mr-2" /> },
    {
      name: "Inventory",
      href: "/inventory",
      icon: <Package className="h-5 w-5 mr-2" />,
    },
    {
      name: "Procurement",
      href: "/procurement",
      icon: <ShoppingCart className="h-5 w-5 mr-2" />,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <BarChart3 className="h-5 w-5 mr-2" />,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 z-40 shadow-sm">
      <div className="p-6">
        <div className="text-blue-600 font-bold text-xl mb-8">ConstructInv</div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          onClick={() => router.push("/settings")}
        >
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 mt-2"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
