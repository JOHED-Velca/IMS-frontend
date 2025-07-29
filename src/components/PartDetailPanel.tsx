import { Part } from "@/types/part";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  MapPin, 
  Edit, 
  Trash2, 
  DollarSign, 
  Building, 
  Calendar,
  Tag
} from "lucide-react";

interface PartDetailPanelProps {
  part: Part;
  onEdit?: (part: Part) => void;
  onDelete?: (partId: string) => void;
  showActions?: boolean;
}

export const PartDetailPanel = ({ 
  part, 
  onEdit, 
  onDelete, 
  showActions = true 
}: PartDetailPanelProps) => {
  const getQuantityStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity < 10) return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const quantityStatus = getQuantityStatus(part.quantity);
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">{part.name}</CardTitle>
            <p className="text-lg text-muted-foreground">SKU: {part.sku}</p>
          </div>
          <Badge variant={quantityStatus.variant} className="text-sm px-3 py-1">
            {quantityStatus.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        {part.description && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{part.description}</p>
          </div>
        )}

        <Separator />

        {/* Inventory Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inventory Information</h3>
            
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Quantity</p>
                <p className="text-2xl font-bold text-primary">{part.quantity}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground">
                  Aisle {part.level.shelf.aisle.number}, {part.level.shelf.side} Side, Level {part.level.levelNumber}
                </p>
              </div>
            </div>

            {part.category && (
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Category</p>
                  <Badge variant="outline">{part.category}</Badge>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Details</h3>

            {part.price && (
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Price</p>
                  <p className="text-lg font-semibold">${part.price.toFixed(2)}</p>
                </div>
              </div>
            )}

            {part.supplier && (
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Supplier</p>
                  <p className="text-muted-foreground">{part.supplier}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Created</p>
                <p className="text-muted-foreground">{formatDate(part.createdAt)}</p>
              </div>
            </div>

            {part.updatedAt && (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-muted-foreground">{formatDate(part.updatedAt)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showActions && (onEdit || onDelete) && (
          <>
            <Separator />
            <div className="flex gap-3">
              {onEdit && (
                <Button onClick={() => onEdit(part)} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Part
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="destructive" 
                  onClick={() => onDelete(part.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Part
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};