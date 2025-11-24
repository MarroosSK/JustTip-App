import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, View } from "react-native";

import { useSettings } from "@/context/settings-context";
import { currencies } from "@/data/data";
import SettingsLanguagePicker from "@/modules/settings/SettingsLanguagePicker";
import CustomDropdown from "./CustomDropDown";

export default function SettingsPersonal() {
  const { t } = useTranslation();
  const { username, defaultPercentage, currency, setSettings } = useSettings();

  return (
    <View className="rounded-2xl mb-6 bg-cardLight dark:bg-cardDark">
      {/* Username */}
      <Text className="text-sm text-text-primaryLight dark:text-text-primaryDark mb-1">
        {t("username")}
      </Text>
      <TextInput
        className="
          text-text-primaryLight dark:text-text-primaryDark
          px-4 py-2 rounded-xl mb-4
          bg-bg-cardLight dark:bg-bg-cardDark
        "
        style={{ height: 45 }}
        value={username}
        onChangeText={(text) => setSettings({ username: text })}
      />

      {/* Default percentage */}
      <Text className="text-sm text-text-primaryLight dark:text-text-primaryDark mb-1">
        {t("default_percentage")}
      </Text>
      <TextInput
        className="
          text-text-primaryLight dark:text-text-primaryDark
          px-4 py-2 rounded-xl mb-4
          bg-bg-cardLight dark:bg-bg-cardDark
        "
        style={{ height: 45 }}
        keyboardType="numeric"
        value={defaultPercentage.toString()}
        onChangeText={(val) => {
          const numberVal = Number(val);
          const clamped = isNaN(numberVal)
            ? 10
            : Math.min(100, Math.max(0, numberVal));
          setSettings({ defaultPercentage: clamped });
        }}
      />

      {/* Language picker */}
      <Text className="text-sm text-text-primaryLight dark:text-text-primaryDark mb-1">
        {t("language")}
      </Text>
      <SettingsLanguagePicker />

      {/* Currency picker */}
      <Text className="text-sm text-text-primaryLight dark:text-text-primaryDark mb-1">
        {t("currency")}
      </Text>
      <CustomDropdown
        options={currencies.map(({ code, name, symbol }) => ({
          label: `${symbol} (${code}) - ${name}`,
          value: code,
        }))}
        selectedValue={currency}
        onValueChange={(val) => setSettings({ currency: val })}
      />
    </View>
  );
}
