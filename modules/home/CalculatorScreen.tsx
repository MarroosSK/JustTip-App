import VictoryModal from "@/components/modals/VictoryModal";
import { useSettings } from "@/context/SettingsContext";
import { useTipStats } from "@/context/TipsContext";
import { useTranslation } from "react-i18next";

import AppText from "@/components/AppText";
import { StatusBar } from "expo-status-bar";
import { Ellipsis, Minus, Percent, Plus, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import BillInputBox from "./CalculatorBillInput";
import CalculatorSummary from "./CalculatorSummary";
import NumberSheet from "./NumberSelector";

type Badge = {
  id: string;
  name: string;
  description: string;
  icon: number;
  condition: (...args: any[]) => boolean;
};
type ActiveSheet = "tip" | "split" | null;

export default function CalculatorScreen() {
  const { t } = useTranslation();
  const { currency, defaultPercentage, themeMode } = useSettings();
  const { addTip } = useTipStats();

  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
  const [amountRaw, setAmountRaw] = useState("");
  const [amount, setAmount] = useState(0);
  const [tipPercent, setTipPercent] = useState(defaultPercentage);
  const [unlockedBadges, setUnlockedBadges] = useState<Badge[]>([]);
  const [victoryModalVisible, setVictoryModalVisible] = useState(false);
  const [splitCount, setSplitCount] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [roundingMode, setRoundingMode] = useState<"none" | "up" | "down">(
    "none"
  );

  const getTipValue = () => amount * (tipPercent / 100);
  const getTotalOriginal = () => amount + getTipValue();
  const getTotalRounded = () => {
    const total = getTotalOriginal();
    if (roundingMode === "up") return Math.ceil(total);
    if (roundingMode === "down") return Math.floor(total);
    return total;
  };
  const getAdjustedTip = () =>
    getTipValue() + (getTotalRounded() - getTotalOriginal());

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(",", ".");
    if (cleaned.trim() === "") {
      setAmount(0);
      setAmountRaw("");
      return;
    }

    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed)) setAmount(parsed);
    setAmountRaw(text);
  };

  const handleSubmit = () => {
    if (amount <= 0) return;
    const adjustedTip = getAdjustedTip();
    addTip(adjustedTip, tipPercent, amount, splitCount, (badges) => {
      setUnlockedBadges(badges);
      if (badges.length > 0) setVictoryModalVisible(true);
    });
    setAmount(0);
    setAmountRaw("");
    setTipPercent(defaultPercentage);
    setSplitCount(1);
    setRoundingMode("none");
  };

  // keyboard offset pre animácie
  const keyboardOffset = useSharedValue(0);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      keyboardOffset.value = withTiming(e.endCoordinates.height, {
        duration: 300,
      });
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      keyboardOffset.value = withTiming(0, { duration: 300 });
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const isDark = themeMode === "dark";

  return (
    <View className="flex-1 px-4 bg-bg-light dark:bg-bg-dark">
      <StatusBar translucent style={isDark ? "light" : "dark"} />

      {/* Summary */}
      <View className="mb-4">
        <CalculatorSummary
          totalRounded={getTotalRounded()}
          perPerson={getTotalRounded() / splitCount}
          roundingMode={roundingMode}
          onSetRoundingMode={setRoundingMode}
          showSplit={splitCount > 1}
          currency={currency}
          amount={amount}
          adjustedTip={getAdjustedTip()}
        />
      </View>

      {/* Inputs - Split + Tip % */}
      <View className="flex-row gap-3 mb-4">
        {/* Split */}
        <View className="flex-1 rounded-xl p-3 relative bg-bg-cardLight dark:bg-bg-cardDark h-[105px]">
          <View className="items-start mb-2">
            <Users size={24} color={isDark ? "#e4e4e4" : "#454545"} />

            <Pressable
              className="absolute top-1 right-1"
              onPress={() => setActiveSheet("split")}
            >
              <Ellipsis size={24} color={isDark ? "#e4e4e4" : "#454545"} />
            </Pressable>
          </View>

          <View className="flex-row items-center justify-center gap-3 mt-4">
            <Pressable
              onPress={() => setSplitCount(Math.max(1, splitCount - 1))}
              disabled={splitCount === 1}
              className="w-10 h-10 rounded-xl items-center justify-center"
            >
              <Minus size={28} color={isDark ? "#e4e4e4" : "#454545"} />
            </Pressable>

            <View className="w-16 h-12 rounded-xl items-center justify-center">
              <AppText className="text-xl text-text-primaryLight dark:text-text-primaryDark">
                {splitCount}
              </AppText>
            </View>

            <Pressable
              onPress={() => setSplitCount(splitCount + 1)}
              className="w-10 h-10 rounded-xl items-center justify-center"
            >
              <Plus size={28} color={isDark ? "#e4e4e4" : "#454545"} />
            </Pressable>
          </View>
        </View>

        {/* Tip % */}
        <View className="flex-1 rounded-xl p-3 relative bg-bg-cardLight dark:bg-bg-cardDark h-[105px]">
          <View className="items-start mb-2">
            <Percent size={24} color={isDark ? "#e4e4e4" : "#454545"} />

            <Pressable
              className="absolute top-1 right-1"
              onPress={() => setActiveSheet("tip")}
            >
              <Ellipsis size={24} color={isDark ? "#e4e4e4" : "#454545"} />
            </Pressable>
          </View>

          <View className="flex-row items-center justify-center gap-3 mt-4">
            <Pressable
              onPress={() => setTipPercent(Math.max(0, tipPercent - 1))}
              disabled={tipPercent <= 0}
              className="w-10 h-10 rounded-xl items-center justify-center"
            >
              <Minus size={28} color={isDark ? "#e4e4e4" : "#454545"} />
            </Pressable>

            <View className="w-16 h-12 rounded-xl items-center justify-center">
              <AppText className="text-xl text-text-primaryLight dark:text-text-primaryDark">
                {tipPercent}%
              </AppText>
            </View>

            <Pressable
              onPress={() => setTipPercent(Math.min(100, tipPercent + 1))}
              className="w-10 h-10 rounded-xl items-center justify-center"
            >
              <Plus size={28} color={isDark ? "#e4e4e4" : "#454545"} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Bill Input */}
      <BillInputBox
        amountRaw={amountRaw}
        onChange={handleAmountChange}
        onSubmit={handleSubmit}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />

      {/* Victory Modal */}
      <VictoryModal
        visible={victoryModalVisible}
        badges={unlockedBadges}
        onClose={() => setVictoryModalVisible(false)}
      />

      {/* Number Sheets */}
      <NumberSheet
        visible={activeSheet === "tip"}
        onClose={() => setActiveSheet(null)}
        value={tipPercent}
        onChange={setTipPercent}
        onReset={() => setTipPercent(defaultPercentage)}
        min={0}
        max={100}
        keyboardOffset={keyboardOffset}
        type="tip"
        title={t("numsheetTip.title")}
        description={t("numsheetTip.desc")}
      />

      <NumberSheet
        visible={activeSheet === "split"}
        onClose={() => setActiveSheet(null)}
        value={splitCount}
        onChange={setSplitCount}
        onReset={() => setSplitCount(1)}
        min={1}
        keyboardOffset={keyboardOffset}
        type="split"
        title={t("numsheetSplit.title")}
        description={t("numsheetSplit.desc")}
      />
    </View>
  );
}
