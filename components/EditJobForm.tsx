"use client";

import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { CustomFormField, CustomFormSelect } from "./FormComponent";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const EditJobForm = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an error",
          variant: "destructive",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      toast({
        description: "Job updated",
      });
      router.push("/jobs");
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted rounded p-8"
      >
        <h2 className="capitalize text-4xl font-semibold mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField control={form.control} name="position" />
          <CustomFormField control={form.control} name="company" />
          <CustomFormField control={form.control} name="location" />
          <CustomFormSelect
            control={form.control}
            name="status"
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect
            control={form.control}
            name="mode"
            labelText="job mode"
            items={Object.values(JobMode)}
          />

          <Button
            type="submit"
            className="capitalize self-end"
            disabled={isPending}
          >
            {isPending ? "updating..." : "edit job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default EditJobForm;
