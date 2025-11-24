import { LineChart } from "@/components/charts/LineChart";
import { ViewStyle } from "react-native";

interface ChartConfig {
  height?: number;
  padding?: number;
  gradient?: boolean;
  animated?: boolean;
  duration?: number;
  showYLabels?: boolean;
  yLabelCount?: number;
  showXLabels?: boolean;
  showPointValues?: boolean;
  showGrid?: boolean;
}

interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

type Props = {
  data: ChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const AreaChart = ({ data, config = {}, style }: Props) => {
  return (
    <LineChart
      data={data}
      config={{ ...config, gradient: true }}
      style={style}
    />
  );
};
