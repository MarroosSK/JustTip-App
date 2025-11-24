import React from "react";
import { View } from "react-native";
import NumericKeyboard from "./NumericKeyboard";

type Props = {
  amountRaw: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isFocused: boolean;
  setIsFocused: (b: boolean) => void;
};

export default function BillInputBox({
  amountRaw,
  onChange,
  onSubmit,
  isFocused,
  setIsFocused,
}: Props) {
  return (
    <View className="bg-bg-light dark:bg-bg-dark rounded-xl">
      <NumericKeyboard
        value={amountRaw}
        onChange={onChange}
        onCancel={() => {
          onChange("");
          setIsFocused(false);
        }}
        onConfirm={() => {
          setIsFocused(false);
          onSubmit();
        }}
      />
    </View>
  );
}
