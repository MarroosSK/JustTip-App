import AppText from "@/components/AppText";
import { useSettings } from "@/context/settings-context";
import { ArrowDown, ArrowUp } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

export type FilterSortType = "date-asc" | "date-desc" | "tip-asc" | "tip-desc";

type Props = {
  filterSort: FilterSortType;
  setFilterSort: (value: FilterSortType) => void;
};

const options: {
  value: FilterSortType;
  labelKey: string;
  icon: React.ElementType;
}[] = [
  { value: "date-asc", labelKey: "filter.dateAsc", icon: ArrowUp },
  { value: "date-desc", labelKey: "filter.dateDesc", icon: ArrowDown },
  { value: "tip-asc", labelKey: "filter.tipAsc", icon: ArrowUp },
  { value: "tip-desc", labelKey: "filter.tipDesc", icon: ArrowDown },
];

const OverviewHistoryFilter = ({ filterSort, setFilterSort }: Props) => {
  const { t } = useTranslation();
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const [open, setOpen] = useState(false);

  const currentOption = options.find((o) => o.value === filterSort);
  const CurrentIcon = currentOption?.icon ?? ArrowDown;

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between px-3 py-1.5 rounded-md bg-bg-light dark:bg-bg-dark gap-2"
      >
        <AppText className="text-text-primaryLight dark:text-text-primaryDark">
          {t(currentOption?.labelKey ?? "")}
        </AppText>
        <CurrentIcon size={16} color={isDark ? "#e4e4e4" : "#454545"} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        statusBarTranslucent
      >
        <Pressable
          className="flex-1 bg-black/20 justify-center items-center"
          onPress={() => setOpen(false)}
        >
          <View className="bg-bg-light dark:bg-bg-dark rounded-xl py-2 w-52 shadow-lg">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isActive = filterSort === opt.value;

              // border a farba ikonky podľa módu
              const borderColor = isActive
                ? isDark
                  ? "#ffffff" // svetlý border v dark mode
                  : "#000000" // tmavý border v light mode
                : "transparent";

              const iconColor = isActive
                ? isDark
                  ? "#ffffff"
                  : "#000000"
                : isDark
                ? "#e4e4e4"
                : "#454545";

              return (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    setFilterSort(opt.value);
                    setOpen(false);
                  }}
                  className="flex-row items-center px-4 py-2 mx-1.5 my-0.5 rounded-md"
                  style={{ borderWidth: 1, borderColor }}
                >
                  <Icon size={16} color={iconColor} />
                  <AppText className="ml-2 text-text-primaryLight dark:text-text-primaryDark">
                    {t(opt.labelKey)}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default OverviewHistoryFilter;
