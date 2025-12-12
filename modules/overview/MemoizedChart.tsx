import { AreaChart } from "@/components/charts/AreaChart";
import { ChartDataPoint } from "@/components/charts/LineChart";
import React from "react";

const MemoizedAreaChart = ({ data }: { data: ChartDataPoint[] }) => {
  return (
    <AreaChart
      data={data}
      config={{
        showGrid: true,
        animated: true,
        duration: 1800,
        showYLabels: false,
        yLabelCount: 4,
        showXLabels: true,
        showPointValues: true,
      }}
    />
  );
};

export const MemoizedChart = React.memo(MemoizedAreaChart);
MemoizedChart.displayName = "MemoizedChart";
