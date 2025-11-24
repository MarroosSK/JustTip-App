import AppText from "@/components/AppText";
import LottieView from "lottie-react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";
import { TipListItem } from "./OverviewTipItem";

type TipItem = {
  bill: number;
  amount: number;
  splitCount?: number;
  timestamp: number;
  percent: number;
};

type OverviewHistoryContentProps = {
  visibleTips: TipItem[];
  loadMore: () => void;
  currency: string;
  loading?: boolean;
  total?: number;
};

const ITEM_HEIGHT = 70;
const SEPARATOR_HEIGHT = 8;

const OverviewHistoryContent = ({
  visibleTips,
  loadMore,
  currency,
  loading = false,
  total = 0,
}: OverviewHistoryContentProps) => {
  const { t } = useTranslation();

  const renderItem: ListRenderItem<TipItem> = useCallback(
    ({ item }) => <TipListItem item={item} currency={currency} />,
    [currency]
  );

  const getItemLayout = useCallback(
    (_data: ArrayLike<TipItem> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT + SEPARATOR_HEIGHT,
      offset: index * (ITEM_HEIGHT + SEPARATOR_HEIGHT),
      index,
    }),
    []
  );

  const renderFooter = () => {
    if (!loading || visibleTips.length >= total) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  };

  return (
    <FlatList
      data={visibleTips}
      keyExtractor={(item) => item.timestamp.toString()}
      contentContainerStyle={{ paddingBottom: 16 }}
      ItemSeparatorComponent={() => (
        <View style={{ height: SEPARATOR_HEIGHT }} />
      )}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center mt-16">
          <AppText className="text-center text-text-primaryLight dark:text-text-primaryDark">
            {t("chartList.listEmpty")}
          </AppText>
          <LottieView
            source={require("@/assets/Not Found.json")}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
        </View>
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.6}
      initialNumToRender={10}
      maxToRenderPerBatch={15}
      windowSize={11}
      removeClippedSubviews
      getItemLayout={getItemLayout}
      ListFooterComponent={renderFooter}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default OverviewHistoryContent;
