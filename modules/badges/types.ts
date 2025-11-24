import { ImageSourcePropType } from "react-native";

export type BadgeFilterProps = {
  filter: "all" | "unlocked" | "locked";
  setFilter: (f: "all" | "unlocked" | "locked") => void;
  themeColor: string;
};

type ConditionFn = (params: {
  count: number;
  lastTipPercent: number;
  lastTipAmount: number;
  billAmount: number;
  timestamp?: number;
  unlockedBadgeIds?: string[];
  totalUsageTimeMs?: number; 
}) => boolean;

export type Badge = {
  id: string;
  name: string;
  icon: ImageSourcePropType;
  description: string;
  unlocked: boolean;
    condition: ConditionFn;
};

export type BadgeGridProps = {
  badges: Badge[];
  lightBg: string;
  onSelectBadge: (badge: Badge) => void;
  t: (key: string) => string;
};

export type BadgeModalProps = {
  visible: boolean;
  onClose: () => void;
  badge: Badge | null;
};
