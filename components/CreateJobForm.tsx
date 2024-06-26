"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomFormField, CustomFormSelect } from "./FormComponent";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { createJobAction } from "@/utils/actions";

const CreateJobForm = () => {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          variant: "destructive",
          description: "There was an error",
        });
        return;
      }
      toast({
        description: "Job created",
      });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      router.push("/jobs");
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize text-4xl font-semibold mb-6">add job</h2>
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
            {isPending ? "loading" : "create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default CreateJobForm;
