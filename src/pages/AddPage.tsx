import { useEffect, useState } from "react";
import { apiService } from "@/services/ApiService";
import { PartCreateInput, Level } from "@/types/part";
import { useAllParts, useCreatePart } from "@/hooks/useParts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Package, Plus } from "lucide-react";

export const AddPage = () => {
  const [formData, setFormData] = useState<PartCreateInput>({
    name: "",
    sku: "",
    quantity: 0,
    aisle: "",
    side: "",
    level: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    apiService.getAllLevels().then(setLevels).catch(console.error);
  }, []);

  const { data: existingParts } = useAllParts();
  const createPartMutation = useCreatePart();

  const validateForm = (): string[] => {
    const newErrors: string[] = [];

    // Required field validation
    if (!formData.name.trim()) newErrors.push("Name is required");
    if (!formData.sku.trim()) newErrors.push("SKU is required");
    if (formData.quantity < 0) newErrors.push("Quantity cannot be negative");
    if (!formData.aisle.trim()) newErrors.push("Aisle is required");
    if (!formData.side.trim()) newErrors.push("Shelf is required");
    if (!formData.level.trim()) newErrors.push("Level is required");

    // Check if part already exists (by SKU)
    if (existingParts && formData.sku.trim()) {
      const existingPart = existingParts.find(
        part => part.sku.toLowerCase() === formData.sku.toLowerCase()
      );
      if (existingPart) {
        newErrors.push("Part already exists");
      }
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof PartCreateInput, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      await createPartMutation.mutateAsync(formData);
      // Reset form on success
      setFormData({
        name: "",
        sku: "",
        quantity: 0,
        aisle: "",
        side: "",
        level: "",
      });
    } catch (error: any) {
      console.error('Full error details:', error);
      
      // Extract detailed error messages from backend
      const errorMessages = [];
      
      if (error.details?.errors) {
        // Handle field-specific validation errors from backend
        Object.entries(error.details.errors).forEach(([field, message]) => {
          errorMessages.push(`${field}: ${message}`);
        });
      } else if (error.details?.message) {
        errorMessages.push(error.details.message);
      } else if (error.message) {
        errorMessages.push(error.message);
      } else {
        errorMessages.push("Failed to create part. Please try again.");
      }
      
      setErrors(errorMessages);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Add New Part</h1>
          </div>
          <p className="text-muted-foreground">
            Fill in the information below to add a new part to your inventory
          </p>
        </div>

        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Part Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Part Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter part name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value.toUpperCase())}
                    placeholder="Enter SKU"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aisle">Aisle *</Label>
                  <Input
                    id="aisle"
                    type="number"
                    min="1"
                    value={formData.aisle}
                    onChange={(e) => handleInputChange("aisle", e.target.value)}
                    placeholder="e.g., 1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="side">Shelf *</Label>
                  <Select 
                    value={formData.side} 
                    onValueChange={(value) => handleInputChange("side", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shelf" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LEFT">Left</SelectItem>
                      <SelectItem value="RIGHT">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleInputChange("level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level"/>
                    </SelectTrigger>
                    <option value="">Select Level</option>
                    {levels.map(level => (
                      <option key={level.id} value={level.id}>
                        Aisle {level.shelf.aisle.number}, {level.shelf.side} Side, Level {level.levelNumber}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding Part...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Part
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      name: "",
                      sku: "",
                      quantity: 0,
                      aisle: "",
                      side: "",
                      level: "",
                    });
                    setErrors([]);
                  }}
                  disabled={isSubmitting}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
