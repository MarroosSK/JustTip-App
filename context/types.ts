export type TippingStyle = "mandatory" | "optional" | "none";

export type Settings = {
  currency: string;
  themeMode: "light" | "dark";
  username: string;
  defaultPercentage: number;
  tippingStyle: "mandatory" | "optional" | "none";
  language: string;
};

export type SettingsContextType = {
  currency: string;
  themeColor: string;
  themeMode: "light" | "dark";
  username: string;
  defaultPercentage: number;
  tippingStyle: TippingStyle;
  setSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
  language: string;
};
