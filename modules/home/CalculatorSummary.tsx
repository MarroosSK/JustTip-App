import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import { currencies } from "@/data/data";
import { formatNumber } from "@/utils/format-number";
import {
  ArrowDown,
  ArrowUp,
  Percent,
  Users,
  Wallet,
  X,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

type Props = {
  totalRounded: number;
  perPerson: number;
  roundingMode: "up" | "down" | "none";
  onSetRoundingMode: (mode: "up" | "down" | "none") => void;
  showSplit: boolean;
  currency: string;
  amount: number;
  adjustedTip: number;
};

export default function CalculatorSummary({
  totalRounded,
  perPerson,
  roundingMode,
  onSetRoundingMode,
  showSplit,
  currency,
  amount,
  adjustedTip,
}: Props) {
  const { t } = useTranslation();
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const handleRoundingPress = (mode: "up" | "down" | "none") => {
    onSetRoundingMode(mode);
  };

  const selectedCurrency = currencies.find((c) => c.code === currency);
  const currencySymbol = selectedCurrency?.symbol || "$";

  return (
    <View className="mt-0 w-full relative">
      {/* Summary */}
      <View
        className={`p-6 rounded-2xl w-full ${
          isDark ? "bg-bg-cardDark" : "bg-bg-cardLight"
        }`}
        style={{ height: 150, justifyContent: "flex-start" }}
      >
        {/* Total */}
        <AppText
          className={`${
            isDark ? "text-text-primaryDark" : "text-text-primaryLight"
          } text-base`}
        >
          {t("total_amount")}
        </AppText>
        <AppText
          className={`${
            isDark ? "text-text-primaryDark" : "text-text-primaryLight"
          } text-4xl mt-2`}
        >
          {currencySymbol}
          {formatNumber(totalRounded)}
        </AppText>

        <View
          className="absolute left-4 right-4"
          style={{
            bottom: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Per person */}
          <View className="flex-row items-center gap-1">
            <Users size={18} color={isDark ? "#e4e4e4" : "#454545"} />
            <AppText
              className={`${
                isDark ? "text-text-primaryDark" : "text-text-secondaryLight"
              } text-sm`}
            >
              {currencySymbol}
              {formatNumber(perPerson)}
            </AppText>
          </View>

          {/* Bill */}
          <View className="flex-row items-center gap-1">
            <Wallet size={18} color={isDark ? "#e4e4e4" : "#454545"} />
            <AppText
              className={`${
                isDark ? "text-text-primaryDark" : "text-text-secondaryLight"
              } text-sm`}
            >
              {currencySymbol}
              {formatNumber(amount)}
            </AppText>
          </View>

          {/* Tip */}
          <View className="flex-row items-center gap-1">
            <Percent size={18} color={isDark ? "#e4e4e4" : "#454545"} />
            <AppText
              className={`${
                isDark ? "text-text-primaryDark" : "text-text-secondaryLight"
              } text-sm`}
            >
              {currencySymbol}
              {formatNumber(adjustedTip)}
            </AppText>
          </View>
        </View>
      </View>

      {/* Rounding icons */}
      <View className="absolute right-3 top-0 items-center space-y-2">
        {amount !== 0 && (
          <>
            <Pressable
              onPress={() => handleRoundingPress("up")}
              android_ripple={{ color: "#00000020", borderless: true }}
              className="p-2"
            >
              <ArrowUp
                size={24}
                color={
                  roundingMode === "up"
                    ? isDark
                      ? "#ffffff"
                      : "#000000"
                    : isDark
                    ? "#e4e4e4"
                    : "#333333"
                }
              />
            </Pressable>

            <Pressable
              onPress={() => handleRoundingPress("none")}
              android_ripple={{ color: "#00000020", borderless: true }}
              className="p-2"
            >
              <X
                size={24}
                color={
                  roundingMode === "none"
                    ? isDark
                      ? "#ffffff"
                      : "#000000"
                    : isDark
                    ? "#e4e4e4"
                    : "#333333"
                }
              />
            </Pressable>

            {/* Arrow Down */}
            <Pressable
              onPress={() => handleRoundingPress("down")}
              android_ripple={{ color: "#00000020", borderless: true }}
              className="p-2"
            >
              <ArrowDown
                size={24}
                color={
                  roundingMode === "down"
                    ? isDark
                      ? "#ffffff"
                      : "#000000"
                    : isDark
                    ? "#e4e4e4"
                    : "#333333"
                }
              />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
