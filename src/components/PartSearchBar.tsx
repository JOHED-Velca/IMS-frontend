import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import { PartSearchParams } from "@/types/part";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PartSearchBarProps {
  onSearch: (params: PartSearchParams) => void;
  isLoading?: boolean;
}

export const PartSearchBar = ({ onSearch, isLoading = false }: PartSearchBarProps) => {
  const [searchParams, setSearchParams] = useState<PartSearchParams>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(searchParams);
  };

  const handleClear = () => {
    setSearchParams({});
    onSearch({});
  };

  const updateParam = (key: keyof PartSearchParams, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const hasActiveFilters = Object.values(searchParams).some(value => !!value);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Parts
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main search bar */}
        <div className="flex gap-2">
          <Input
            placeholder="Search by name or SKU..."
            value={searchParams.name || ""}
            onChange={(e) => updateParam("name", e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading} className="shrink-0">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Filter toggle */}
        <Collapsible open={showFilters} onOpenChange={setShowFilters}>
          <div className="flex justify-between items-center">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                {hasActiveFilters && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    Active
                  </span>
                )}
              </Button>
            </CollapsibleTrigger>
            
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  SKU
                </label>
                <Input
                  placeholder="Enter SKU"
                  value={searchParams.sku || ""}
                  onChange={(e) => updateParam("sku", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Category
                </label>
                <Input
                  placeholder="Enter category"
                  value={searchParams.category || ""}
                  onChange={(e) => updateParam("category", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Aisle
                </label>
                <Input
                  placeholder="Enter aisle"
                  value={searchParams.aisle || ""}
                  onChange={(e) => updateParam("aisle", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Side
                </label>
                <Input
                  placeholder="Left/Right"
                  value={searchParams.side || ""}
                  onChange={(e) => updateParam("side", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Level
                </label>
                <Input
                  placeholder="Enter level"
                  value={searchParams.level || ""}
                  onChange={(e) => updateParam("level", e.target.value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};