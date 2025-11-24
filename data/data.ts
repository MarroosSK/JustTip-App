import { ImageSourcePropType } from "react-native";

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
  condition: ConditionFn;
  description: string;
};

export const BADGES: Badge[] = [
  // Number of Tips
  {
    id: "one_tip",
    name: "badges.one_tip.name",
    description: "badges.one_tip.description",
    icon: require("../assets/b1x.webp"),
    condition: ({ count }) => count >= 1,
  },
  {
    id: "five_tips",
    name: "badges.five_tips.name",
    description: "badges.five_tips.description",
    icon: require("../assets/b5x.webp"),
    condition: ({ count }) => count >= 5,
  },
  {
    id: "ten_tips",
    name: "badges.ten_tips.name",
    description: "badges.ten_tips.description",
    icon: require("../assets/b10x.webp"),
    condition: ({ count }) => count >= 10,
  },
  {
    id: "twenty_tips",
    name: "badges.twenty_tips.name",
    description: "badges.twenty_tips.description",
    icon: require("../assets/b20x.webp"),
    condition: ({ count }) => count >= 20,
  },
  {
    id: "fifty_tips",
    name: "badges.fifty_tips.name",
    description: "badges.fifty_tips.description",
    icon: require("../assets/b50x.webp"),
    condition: ({ count }) => count >= 50,
  },

  // Tips by %
  {
    id: "tip_5_percent",
    name: "badges.tip_5_percent.name",
    description: "badges.tip_5_percent.description",
    icon: require("../assets/b5%.webp"),
    condition: ({ lastTipPercent }) => lastTipPercent === 5,
  },
  {
    id: "tip_10_percent",
    name: "badges.tip_10_percent.name",
    description: "badges.tip_10_percent.description",
    icon: require("../assets/b10%.webp"),
    condition: ({ lastTipPercent }) => lastTipPercent === 10,
  },
  {
    id: "tip_15_percent",
    name: "badges.tip_15_percent.name",
    description: "badges.tip_15_percent.description",
    icon: require("../assets/b15%.webp"),
    condition: ({ lastTipPercent }) => lastTipPercent === 15,
  },
  {
    id: "tip_20_percent",
    name: "badges.tip_20_percent.name",
    description: "badges.tip_20_percent.description",
    icon: require("../assets/b20%.webp"),
    condition: ({ lastTipPercent }) => lastTipPercent === 20,
  },

  // Tips by Sum (value)
  {
    id: "tip_2_amount",
    name: "badges.tip_2_amount.name",
    description: "badges.tip_2_amount.description",
    icon: require("../assets/bd-2.webp"),
    condition: ({ lastTipAmount }) => lastTipAmount >= 2,
  },
  {
    id: "tip_5_amount",
    name: "badges.tip_5_amount.name",
    description: "badges.tip_5_amount.description",
    icon: require("../assets/bd-5.webp"),
    condition: ({ lastTipAmount }) => lastTipAmount >= 5,
  },
  {
    id: "tip_10_amount",
    name: "badges.tip_10_amount.name",
    description: "badges.tip_10_amount.description",
    icon: require("../assets/bd-7.webp"),
    condition: ({ lastTipAmount }) => lastTipAmount >= 7,
  },

  // Levels
  {
    id: "level_1",
    name: "badges.level_1.name",
    description: "badges.level_1.description",
    icon: require("../assets/blvl1.webp"),
    condition: ({ unlockedBadgeIds }) => (unlockedBadgeIds?.length ?? 0) >= 5,
  },
  {
    id: "level_2",
    name: "badges.level_2.name",
    description: "badges.level_2.description",
    icon: require("../assets/blvl2.webp"),
    condition: ({ unlockedBadgeIds }) => (unlockedBadgeIds?.length ?? 0) >= 10,
  },
  {
    id: "level_3",
    name: "badges.level_3.name",
    description: "badges.level_3.description",
    icon: require("../assets/blvl3.webp"),
    condition: ({ unlockedBadgeIds }) => (unlockedBadgeIds?.length ?? 0) >= 15,
  },

  // Timed Badges
  {
    id: "used_1_minute",
    name: "badges.used_1_minute.name",
    description: "badges.used_1_minute.description",
    icon: require("../assets/b60s.webp"),
    condition: ({ totalUsageTimeMs }) => (totalUsageTimeMs ?? 0) >= 60000,
  },
  {
    id: "used_5_minutes",
    name: "badges.used_5_minutes.name",
    description: "badges.used_5_minutes.description",
    icon: require("../assets/b5m.webp"),
    condition: ({ totalUsageTimeMs }) => (totalUsageTimeMs ?? 0) >= 300000,
  },
  {
    id: "used_30_minutes",
    name: "badges.used_30_minutes.name",
    description: "badges.used_30_minutes.description",
    icon: require("../assets/b30m.webp"),
    condition: ({ totalUsageTimeMs }) => (totalUsageTimeMs ?? 0) >= 1800000,
  },
  {
    id: "used_1_hour",
    name: "badges.used_1_hour.name",
    description: "badges.used_1_hour.description",
    icon: require("../assets/b1h.webp"),
    condition: ({ totalUsageTimeMs }) => (totalUsageTimeMs ?? 0) >= 3600000,
  },
];

// Codes & symbols
export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
];
