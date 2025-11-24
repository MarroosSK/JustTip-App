import { useSettings } from "@/context/settings-context";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";

type ChartType = "totalPayment" | "totalTip" | "topTips";

type ChartPickerProps = {
  chartType: ChartType;
  setChartType: (value: ChartType) => void;
  themeColor: string;
};

const OverviewChartFilter = ({
  chartType,
  setChartType,
  themeColor,
}: ChartPickerProps) => {
  const { t } = useTranslation();
  const { themeMode } = useSettings();

  return (
    <View className="mb-2 rounded-xl overflow-hidden">
      <Picker
        selectedValue={chartType}
        onValueChange={setChartType}
        dropdownIconColor={themeMode === "dark" ? "#e4e4e4" : "#454545"}
        style={{ color: themeMode === "dark" ? "#e4e4e4" : "#454545" }}
        mode={Platform.OS === "android" ? "dropdown" : undefined}
      >
        <Picker.Item label={t("chart.totalPayment")} value="totalPayment" />
        <Picker.Item label={t("chart.totalTip")} value="totalTip" />
        <Picker.Item label={t("chart.topTips")} value="topTips" />
      </Picker>
    </View>
  );
};

export default OverviewChartFilter;
