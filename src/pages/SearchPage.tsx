import { useState } from "react";
import { PartSearchBar } from "@/components/PartSearchBar";
import { PartCard } from "@/components/PartCard";
import { PartSearchParams, Part } from "@/types/part";
import { useAllParts, useSearchParts, useDeletePart } from "@/hooks/useParts";
import { Loader2, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useState<PartSearchParams>({});
  const [isSearching, setIsSearching] = useState(false);
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);
  
  // Use search query when there are search parameters, otherwise get all parts
  const hasSearchParams = Object.values(searchParams).some(value => !!value);
  
  const { 
    data: allParts, 
    isLoading: isLoadingAll, 
    error: allPartsError 
  } = useAllParts();
  
  const { 
    data: searchResults, 
    isLoading: isLoadingSearch, 
    error: searchError 
  } = useSearchParts(searchParams);

  const deletePartMutation = useDeletePart();

  // Only show parts if a search has been performed
  const parts = hasPerformedSearch && hasSearchParams ? searchResults : undefined;
  const isLoading = hasSearchParams ? isLoadingSearch : false;
  const error = hasSearchParams ? searchError : null;

  const handleSearch = (params: PartSearchParams) => {
    setSearchParams(params);
    setIsSearching(true);
    setHasPerformedSearch(true);
    // Reset searching state after a brief delay to show feedback
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleDeletePart = async (partId: string) => {
    if (window.confirm("Are you sure you want to delete this part?")) {
      try {
        await deletePartMutation.mutateAsync(partId);
      } catch (error) {
        // Error is handled by the mutation hook with toast
        console.error("Failed to delete part:", error);
      }
    }
  };

  const handleEditPart = (part: Part) => {
    // TODO: Open edit modal or navigate to edit page
    console.log("Edit part:", part);
    // For now, just log - this would open an edit dialog/form
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Inventory Search</h1>
        <p className="text-muted-foreground">
          Search and manage your inventory parts
        </p>
      </div>

      <PartSearchBar 
        onSearch={handleSearch} 
        isLoading={isSearching || isLoading} 
      />

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
          <span className="ml-2">Searching parts...</span>
        </div>
      ) : !hasPerformedSearch ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Search Your Inventory
          </h3>
          <p className="text-muted-foreground mb-4">
            Use the search bar above to find parts by name, SKU, location, or category.
          </p>
        </div>
      ) : parts && parts.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {parts.length} part{parts.length !== 1 ? 's' : ''} found
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                handleSearch({});
                setHasPerformedSearch(false);
              }}
            >
              Clear Search
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {parts.map((part) => (
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
            No parts found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or search for different terms.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              handleSearch({});
              setHasPerformedSearch(false);
            }}
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};