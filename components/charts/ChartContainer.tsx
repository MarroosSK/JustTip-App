import { View, ViewStyle } from "react-native";
import AppText from "../AppText";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  extraRight?: React.ReactNode;
};

export const ChartContainer = ({
  title,
  description,
  children,
  extraRight,
  style,
}: Props) => {
  return (
    <View style={style}>
      {(title || extraRight) && (
        <View className="flex-row justify-between items-center p-2">
          <AppText className="text-text-primaryLight dark:text-text-primaryDark">
            {title}
          </AppText>

          {extraRight}
        </View>
      )}
      {description && (
        <AppText style={{ marginBottom: 16 }}>{description}</AppText>
      )}
      {children}
    </View>
  );
};
