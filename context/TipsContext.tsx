import { BADGES } from "@/data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface TipEntry {
  amount: number;
  percent: number;
  bill: number;
  timestamp: number;
  splitCount?: number;
}

interface TipStatsContextValue {
  tipCount: number;
  bestTip: number;
  totalTips: number;
  tipHistory: TipEntry[];
  badges: any[];
  addTip: (
    tipAmount: number,
    tipPercent: number,
    billAmount: number,
    splitCount?: number,
    onBadgesUnlocked?: (badges: any[]) => void
  ) => void;
  resetBadges: () => void;
}

const TipStatsContext = createContext<TipStatsContextValue | undefined>(
  undefined
);

export const TipStatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tipCount, setTipCount] = useState(0);
  const [bestTip, setBestTip] = useState(0);
  const [totalTips, setTotalTips] = useState(0);
  const [tipHistory, setTipHistory] = useState<TipEntry[]>([]);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);
  const [totalUsageTimeMs, setTotalUsageTimeMs] = useState(0);

  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    (async () => {
      const [count, best, total, badgeList, historyRaw, storedTime] =
        await Promise.all([
          AsyncStorage.getItem("tipCount"),
          AsyncStorage.getItem("bestTip"),
          AsyncStorage.getItem("totalTips"),
          AsyncStorage.getItem("badges"),
          AsyncStorage.getItem("tipHistory"),
          AsyncStorage.getItem("totalUsageTimeMs"),
        ]);

      setTipCount(count ? parseInt(count) : 0);
      setBestTip(best ? parseFloat(best) : 0);
      setTotalTips(total ? parseFloat(total) : 0);
      setUnlockedBadgeIds(badgeList ? JSON.parse(badgeList) : []);
      setTipHistory(historyRaw ? JSON.parse(historyRaw) : []);
      setTotalUsageTimeMs(storedTime ? parseInt(storedTime) : 0);
      lastUpdateRef.current = Date.now();
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      if (delta > 0) {
        setTotalUsageTimeMs((prev) => {
          const updated = prev + delta;
          AsyncStorage.setItem("totalUsageTimeMs", updated.toString());
          return updated;
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkBadges = async () => {
      const newUnlocked = [...unlockedBadgeIds];
      const newlyUnlocked: any[] = [];
      let updated = false;

      for (const badge of BADGES) {
        if (newUnlocked.includes(badge.id)) continue;

        if (
          badge.condition({
            count: tipCount,
            lastTipPercent: 0,
            lastTipAmount: 0,
            billAmount: 0,
            unlockedBadgeIds: newUnlocked,
            totalUsageTimeMs,
          })
        ) {
          newUnlocked.push(badge.id);
          newlyUnlocked.push(badge);
          updated = true;
        }
      }

      if (updated) {
        setUnlockedBadgeIds(newUnlocked);
        await AsyncStorage.setItem("badges", JSON.stringify(newUnlocked));
      }
    };

    checkBadges();
  }, [tipCount, totalUsageTimeMs]);

  const addTip = async (
    tipAmount: number,
    tipPercent: number,
    billAmount: number,
    splitCount = 1,
    onBadgesUnlocked?: (badges: any[]) => void
  ) => {
    const newEntry: TipEntry = {
      amount: tipAmount,
      percent: tipPercent,
      bill: billAmount,
      splitCount,
      timestamp: Date.now(),
    };

    const newCount = tipCount + 1;
    const newTotal = totalTips + tipAmount;
    const newBest = Math.max(bestTip, tipAmount);
    const updatedHistory = [...tipHistory, newEntry];
    const newUnlocked = [...unlockedBadgeIds];
    const newlyUnlocked: any[] = [];

    for (const badge of BADGES) {
      if (
        !newUnlocked.includes(badge.id) &&
        badge.condition({
          count: newCount,
          lastTipPercent: tipPercent,
          lastTipAmount: tipAmount,
          billAmount,
          timestamp: Date.now(),
          unlockedBadgeIds: newUnlocked,
          totalUsageTimeMs,
        })
      ) {
        newUnlocked.push(badge.id);
        newlyUnlocked.push(badge);
      }
    }

    setTipCount(newCount);
    setTotalTips(newTotal);
    setBestTip(newBest);
    setTipHistory(updatedHistory);
    setUnlockedBadgeIds(newUnlocked);

    await AsyncStorage.multiSet([
      ["tipCount", newCount.toString()],
      ["bestTip", newBest.toString()],
      ["totalTips", newTotal.toString()],
      ["tipHistory", JSON.stringify(updatedHistory)],
      ["badges", JSON.stringify(newUnlocked)],
    ]);

    if (onBadgesUnlocked && newlyUnlocked.length > 0) {
      onBadgesUnlocked(newlyUnlocked);
    }
  };

  const resetBadges = async () => {
    await AsyncStorage.multiRemove([
      "tipCount",
      "bestTip",
      "totalTips",
      "badges",
      "tipHistory",
      "totalUsageTimeMs",
    ]);

    setTipCount(0);
    setBestTip(0);
    setTotalTips(0);
    setUnlockedBadgeIds([]);
    setTipHistory([]);
    setTotalUsageTimeMs(0);
    lastUpdateRef.current = Date.now();
  };

  const badgesWithState = BADGES.map((badge) => ({
    ...badge,
    unlocked: unlockedBadgeIds.includes(badge.id),
  }));

  return (
    <TipStatsContext.Provider
      value={{
        tipCount,
        bestTip,
        totalTips,
        tipHistory,
        badges: badgesWithState,
        addTip,
        resetBadges,
      }}
    >
      {children}
    </TipStatsContext.Provider>
  );
};

export const useTipStats = () => {
  const context = useContext(TipStatsContext);
  if (!context)
    throw new Error("useTipStats must be used within TipStatsProvider");
  return context;
};
