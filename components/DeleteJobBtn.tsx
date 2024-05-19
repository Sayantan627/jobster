import { deleteJobAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const DeleteJobBtn = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          variant: "destructive",
          description: "There was an error",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast({
        description: "Job removed",
      });
    },
  });
  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};
export default DeleteJobBtn;
