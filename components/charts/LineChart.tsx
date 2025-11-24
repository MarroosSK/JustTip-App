import { useSettings } from "@/context/settings-context";
import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type ChartDataPoint = { x: string | number; y: number; label?: string };

interface Props {
  data: ChartDataPoint[];
  config?: {
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
  };
  style?: ViewStyle;
}

export const LineChart = ({ data, config = {}, style }: Props) => {
  const [width, setWidth] = useState(300);
  const { themeMode } = useSettings();
  const isLightMode = themeMode === "light";

  const lineColor = isLightMode ? "#454545" : "#e4e4e4";

  // Gradient použije farbu bg card pre cool efekt
  const gradientColor = isLightMode ? "#F2F2F2" : "#27272a";

  const {
    height = 150,
    padding = 20,
    gradient = true,
    animated = true,
    duration = 1000,
    showYLabels = true,
    yLabelCount = 5,
    showXLabels = true,
    showPointValues = true,
    showGrid = false, // grid vypnutý
  } = config;

  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = animated ? withTiming(1, { duration }) : 1;
  }, [data]);

  const handleLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  const max = Math.max(...data.map((d) => d.y));
  const min = Math.min(...data.map((d) => d.y));
  const range = max - min || 1;

  const innerWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((p, i) => ({
    x: padding + (i / (data.length - 1)) * innerWidth,
    y: padding + ((max - p.y) / range) * chartHeight,
  }));

  const createPath = (pts: typeof points) => {
    if (!pts.length) return "";
    let path = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      path += ` L${pts[i].x},${pts[i].y}`;
    }
    return path;
  };

  // Area path – iba do spodku chartu (padding + chartHeight)
  const areaPath = gradient
    ? createPath(points) +
      ` L${points[points.length - 1].x},${padding + chartHeight} ` +
      `L${points[0].x},${padding + chartHeight} Z`
    : "";

  const lineProps = useAnimatedProps(() => ({
    strokeDasharray: undefined,
  }));

  return (
    <View style={[{ width: "100%", height }, style]} onLayout={handleLayout}>
      <Svg width={width} height={height}>
        {/* Gradient */}
        {gradient && (
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={gradientColor} stopOpacity="0.2" />
              <Stop
                offset="100%"
                stopColor={gradientColor}
                stopOpacity="0.01"
              />
            </LinearGradient>
          </Defs>
        )}

        {/* Area */}
        {gradient && (
          <AnimatedPath
            d={areaPath}
            fill="url(#grad)"
            animatedProps={lineProps}
          />
        )}

        {/* Line */}
        <AnimatedPath
          d={createPath(points)}
          stroke={lineColor}
          strokeWidth={2}
          fill="none"
          animatedProps={lineProps}
        />

        {/* Points a hodnoty */}
        {points.map((p, i) => (
          <React.Fragment key={`point-${i}`}>
            <Circle cx={p.x} cy={p.y} r={3} fill={lineColor} />
            {showPointValues && (
              <SvgText
                x={p.x}
                y={p.y - 10}
                fontSize={12}
                fill={lineColor}
                textAnchor="middle"
              >
                {data[i].y}
              </SvgText>
            )}
          </React.Fragment>
        ))}

        {/* X-axis labels */}
        {showXLabels && (
          <G>
            {data.map((point, i) => (
              <SvgText
                key={`x-${i}`}
                x={points[i].x}
                y={height - 5}
                fontSize={10}
                fill={lineColor}
                textAnchor="middle"
              >
                {point.label ?? point.x.toString()}
              </SvgText>
            ))}
          </G>
        )}

        {/* Y-axis labels */}
        {showYLabels && (
          <G>
            {Array.from({ length: yLabelCount }).map((_, i) => {
              const y = padding + (i / (yLabelCount - 1)) * chartHeight;
              const val = max - (i / (yLabelCount - 1)) * range;
              return (
                <SvgText
                  key={`y-${i}`}
                  x={padding - 5}
                  y={y + 4}
                  fontSize={10}
                  textAnchor="end"
                  fill={lineColor}
                >
                  {Math.round(val)}
                </SvgText>
              );
            })}
          </G>
        )}
      </Svg>
    </View>
  );
};
