import AppText from "@/components/AppText";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { useSettings } from "@/context/settings-context";
import { useTipStats } from "@/context/tips-context";
import LottieView from "lottie-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native"; // Importuj Text
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MemoizedChart } from "./MemoizedChart";
import OverviewHistoryContent from "./OverviewHistoryContent";
import OverviewHistoryFilter, { FilterSortType } from "./OverviewHistoryFilter";
import OverviewStats from "./OverviewStats";

function formatDateSimple(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month}`;
}

const PAGE_SIZE = 5;

const OverviewScreen = () => {
  const insets = useSafeAreaInsets();
  const { totalTips, tipHistory, tipCount, bestTip } = useTipStats();
  const { t } = useTranslation();
  const { currency } = useSettings();

  const [filterSort, setFilterSort] = useState<FilterSortType>("date-asc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  const filteredTips = useMemo(() => {
    let data = [...tipHistory];
    const [field, order] = filterSort.split("-") as [string, "asc" | "desc"];
    switch (field) {
      case "date":
        data.sort((a, b) =>
          order === "asc"
            ? a.timestamp - b.timestamp
            : b.timestamp - a.timestamp
        );
        break;
      case "tip":
        data.sort((a, b) =>
          order === "asc" ? a.amount - b.amount : b.amount - a.amount
        );
        break;
    }
    return data;
  }, [tipHistory, filterSort]);

  const chartData = useMemo(() => {
    const lastTen = filteredTips.slice(0, 10);
    const mapped = lastTen.map((tip) => {
      const value = Number(tip.amount) || 0; // 👈 len tip, nie bill + tip
      const label = formatDateSimple(tip.timestamp);
      return { x: label, y: Math.round(value * 100) / 100, label };
    });
    if (mapped.length === 1) return [{ x: "–", y: 0, label: "–" }, ...mapped];
    return mapped;
  }, [filteredTips]);

  const visibleTips = useMemo(
    () => filteredTips.slice(0, visibleCount),
    [filteredTips, visibleCount]
  );

  const loadMore = useCallback(() => {
    if (loadingMore || visibleCount >= filteredTips.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setLoadingMore(false);
    }, 200);
  }, [loadingMore, visibleCount, filteredTips.length]);

  return (
    <View className="flex-1 px-4 ">
      <OverviewStats
        tipCount={tipCount}
        totalTips={totalTips}
        bestTip={bestTip}
        t={t}
      />
      <View className="flex-1 my-6">
        {/* Kontrola a podmienené vykresľovanie */}
        {filteredTips.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-6">
            <AppText className="text-center text-text-primaryLight dark:text-text-primaryDark">
              {t("chartList.chartEmpty")}
            </AppText>
            <LottieView
              source={require("@/assets/Not Found.json")}
              autoPlay
              loop={true}
              style={{ width: 150, height: 150 }}
            />
          </View>
        ) : (
          <ChartContainer
            title={t("chartList.chartTitle")}
            description=""
            extraRight={
              <OverviewHistoryFilter
                filterSort={filterSort}
                setFilterSort={setFilterSort}
              />
            }
          >
            <MemoizedChart data={chartData} />
          </ChartContainer>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <OverviewHistoryContent
          visibleTips={visibleTips}
          loadMore={loadMore}
          currency={currency}
          loading={loadingMore}
          total={filteredTips.length}
        />
      </View>
    </View>
  );
};

export default OverviewScreen;
