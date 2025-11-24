import AppText from "@/components/AppText";
import { useSettings } from "@/context/settings-context";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  selectedValue: string;
  onValueChange: (val: string) => void;
};

export default function CustomDropdown({
  options,
  selectedValue,
  onValueChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  return (
    <View className="mb-4">
      {/* Trigger */}
      <Pressable
        className="flex-row items-center justify-between rounded-xl px-4 py-3 bg-bg-cardLight dark:bg-bg-cardDark"
        onPress={() => setOpen(true)}
      >
        <AppText className="text-base text-text-primaryLight dark:text-text-primaryDark">
          {options.find((o) => o.value === selectedValue)?.label}
        </AppText>

        <ChevronDown size={20} color={isDark ? "#e4e4e4" : "#454545"} />
      </Pressable>

      {/* Modal */}
      <Modal
        transparent
        visible={open}
        animationType="fade"
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center">
            <View
              className="bg-bg-cardLight dark:bg-bg-cardDark rounded-2xl w-72 p-2"
              style={{ maxHeight: 400 }}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    className={`
                      px-4 py-3 rounded-xl
                      ${
                        item.value === selectedValue
                          ? "bg-bg-cardLight/60 dark:bg-bg-cardDark/60"
                          : "bg-transparent"
                      }
                    `}
                    onPress={() => {
                      onValueChange(item.value);
                      setOpen(false);
                    }}
                  >
                    <AppText
                      className={`text-base ${
                        item.value === selectedValue
                          ? "text-text-primaryLight dark:text-text-primaryDark"
                          : "text-text-secondaryLight dark:text-text-secondaryDark"
                      }`}
                    >
                      {item.label}
                    </AppText>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
