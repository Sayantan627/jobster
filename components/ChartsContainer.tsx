"use client";

import { getChartsDataAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartsContainer = () => {
  const { data } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  if (!data || data.length < 1) return null;
  return (
    <section className="mt-16">
      <h1 className="text-4xl font-semibold text-center">
        Monthly Applications
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" barSize={75} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};
export default ChartsContainer;
