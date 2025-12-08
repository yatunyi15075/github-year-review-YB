"use client";

import { PieChart, Pie, Tooltip } from "recharts";

export default function LanguagesChart({ data }: any) {
  const chartData = Object.keys(data).map(key => ({
    name: key,
    value: data[key],
  }));

  return (
    <PieChart width={350} height={350}>
      <Pie
        dataKey="value"
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={120}
      />
      <Tooltip />
    </PieChart>
  );
}
