import { Part } from "@/types/part";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Package, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PartCardProps {
  part: Part;
  onEdit?: (part: Part) => void;
  onDelete?: (partId: string) => void;
  showActions?: boolean;
}

export const PartCard = ({ part, onEdit, onDelete, showActions = true }: PartCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/part/${part.id}`);
  };

  const getQuantityStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity < 10) return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const quantityStatus = getQuantityStatus(part.quantity);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-2">
            {part.name}
          </CardTitle>
          <Badge variant={quantityStatus.variant} className="ml-2 shrink-0">
            {quantityStatus.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">SKU: {part.sku}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-primary" />
          <span className="font-medium">{part.quantity}</span>
          <span className="text-muted-foreground">units</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            Aisle {part.aisle}, {part.side} Side, Level {part.level}
          </span>
        </div>

        {part.category && (
          <Badge variant="outline" className="w-fit">
            {part.category}
          </Badge>
        )}

        {part.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {part.description}
          </p>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="flex gap-2 pt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleViewDetails}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          {onEdit && (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onEdit(part)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(part.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};