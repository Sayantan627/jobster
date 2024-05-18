import { JobType } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJobBtn from "./DeleteJobBtn";
import JobInfo from "./JobInfo";
import { Briefcase, CalendarDays, MapPinned, RadioTower } from "lucide-react";
import { Badge } from "./ui/badge";

// write a function to format job.createdAt in DD/MM/YYYY format
const formatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const JobCard = ({ job }: { job: JobType }) => {
  const date = new Date(job.createdAt).toLocaleDateString("en-IN");
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4 grid-cols-2 mt-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPinned />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className="justify-center w-32">
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button size="sm" asChild>
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobBtn />
      </CardFooter>
    </Card>
  );
};
export default JobCard;
