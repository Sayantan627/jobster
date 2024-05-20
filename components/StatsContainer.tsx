"use client";

import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";
import { getStatsAction } from "@/utils/actions";

const StatsContainer = () => {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard title="pending jobs" value={data?.pending || 0} />
      <StatsCard title="interviews set" value={data?.interview || 0} />
      <StatsCard title="jobs declined" value={data?.declined || 0} />
    </div>
  );
};
export default StatsContainer;
