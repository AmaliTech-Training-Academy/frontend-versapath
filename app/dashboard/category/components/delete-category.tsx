import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/api-request";
import { revalidateAllClusters } from "@/lib/api/clusters";
import { toast } from "sonner";

export const DeleteCategoryButton = ({
  clusterId,
  revalidateAction,
}: {
  clusterId: string;
  revalidateAction: () => void;
}) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const res = await apiRequest(`/clusters/${clusterId}`, "DELETE");

    if (!res.success) {
      toast.error("Failed to delete category");
      return;
    }

    toast.success("Category deleted successfully!");
    revalidateAction();
    revalidateAllClusters(); 
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      className="cursor-pointer"
    >
      Delete
    </Button>
  );
};
