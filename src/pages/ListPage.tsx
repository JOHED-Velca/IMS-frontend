import { useState } from "react";
import { PartCard } from "@/components/PartCard";
import { Part } from "@/types/part";
import { useAllParts, useDeletePart } from "@/hooks/useParts";
import { Loader2, Package, AlertCircle, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = "name" | "sku";

export const ListPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>("name");
  
  const { 
    data: parts, 
    isLoading, 
    error 
  } = useAllParts();

  const deletePartMutation = useDeletePart();

  const handleDeletePart = async (partId: string) => {
    if (window.confirm("Are you sure you want to delete this part?")) {
      try {
        await deletePartMutation.mutateAsync(partId);
      } catch (error) {
        console.error("Failed to delete part:", error);
      }
    }
  };

  const handleEditPart = (part: Part) => {
    console.log("Edit part:", part);
    // TODO: Open edit modal or navigate to edit page
  };

  // Sort parts based on selected option
  const sortedParts = parts ? [...parts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.sku.localeCompare(b.sku);
    }
  }) : [];

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "name":
        return "Name (A-Z)";
      case "sku":
        return "SKU (A-Z)";
      default:
        return "Name (A-Z)";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Parts</h1>
          <p className="text-muted-foreground">
            Complete inventory list
          </p>
        </div>
        
        {parts && parts.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort by: {getSortLabel(sortBy)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("sku")}>
                SKU (A-Z)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading parts: {error instanceof Error ? error.message : "Unknown error"}
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading parts...</span>
        </div>
      ) : sortedParts && sortedParts.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {sortedParts.length} part{sortedParts.length !== 1 ? 's' : ''} in inventory
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedParts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onEdit={handleEditPart}
                onDelete={handleDeletePart}
                showActions={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            No parts available
          </h3>
          <p className="text-muted-foreground mb-4">
            Start by adding some parts to your inventory.
          </p>
        </div>
      )}
    </div>
  );
};
