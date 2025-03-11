"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Plus,
  FileEdit,
  Trash2,
  FileSearch,
  Download,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InventoryActionButtonsProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
  className?: string;
}

const InventoryActionButtons = ({
  onAdd = () => console.log("Add item clicked"),
  onEdit = () => console.log("Edit item clicked"),
  onDelete = () => console.log("Delete item clicked"),
  onView = () => console.log("View details clicked"),
  onExport = () => console.log("Export clicked"),
  onFilter = () => console.log("Filter clicked"),
  className,
}: InventoryActionButtonsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2 bg-background p-4", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onAdd} variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new inventory item</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onEdit} variant="outline">
              <FileEdit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit selected item</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onDelete} variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected item</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onView} variant="secondary">
              <FileSearch className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View item details</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onExport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Export inventory data</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onFilter} variant="ghost">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Filter inventory items</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default InventoryActionButtons;
