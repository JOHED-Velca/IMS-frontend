import { useParams, useNavigate } from "react-router-dom";
import { PartDetailPanel } from "@/components/PartDetailPanel";
import { usePart, useDeletePart } from "@/hooks/useParts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Part } from "@/types/part";

export const PartDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: part, isLoading, error } = usePart(id!);
  const deletePartMutation = useDeletePart();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditPart = (part: Part) => {
    // TODO: Navigate to edit page or open edit modal
    console.log("Edit part:", part);
    // For now, just log - this would navigate to edit page or open edit dialog
    // navigate(`/part/${part.id}/edit`);
  };

  const handleDeletePart = async (partId: string) => {
    if (window.confirm("Are you sure you want to delete this part? This action cannot be undone.")) {
      try {
        await deletePartMutation.mutateAsync(partId);
        // Navigate back to search page after successful deletion
        navigate("/");
      } catch (error) {
        // Error is handled by the mutation hook with toast
        console.error("Failed to delete part:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading part details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading part details: {error instanceof Error ? error.message : "Unknown error"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!part) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Part not found. It may have been deleted or the ID is incorrect.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Button>

      <PartDetailPanel
        part={part}
        onEdit={handleEditPart}
        onDelete={handleDeletePart}
        showActions={true}
      />
    </div>
  );
};