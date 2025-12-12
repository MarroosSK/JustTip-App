import { useSettings } from "@/context/SettingsContext";
import { X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Platform, Pressable, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type FloatingInputProps = {
  id: string;
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
  placeholder: string;
  onFocusChange?: (id: string | null) => void;
  initialBottom?: number;
};

export function FloatingInput({
  id,
  value,
  onChange,
  onClear,
  placeholder,
  onFocusChange,
  initialBottom = 200,
}: FloatingInputProps) {
  const { themeColor } = useSettings();
  const keyboardOffset = useSharedValue(initialBottom);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<TextInput>(null);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 16,
    right: 16,
    bottom: keyboardOffset.value,
    zIndex: 50,
  }));

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        if (isInputFocused) {
          keyboardOffset.value = withTiming(e.endCoordinates.height + 16, {
            duration: 250,
          });
        }
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        keyboardOffset.value = withTiming(initialBottom, { duration: 250 });
        setIsInputFocused(false);
        onFocusChange?.(null);
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [initialBottom, isInputFocused]);

  const handleFocus = () => {
    setIsInputFocused(true);
    onFocusChange?.(id);

    keyboardOffset.value = withTiming(keyboardHeight + 16, { duration: 250 });
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <Animated.View style={animatedStyle}>
      <View
        className="rounded-xl p-2"
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: themeColor,
        }}
      >
        <TextInput
          ref={inputRef}
          className="flex-1 text-base text-white"
          placeholder={placeholder}
          maxLength={12}
          placeholderTextColor="#fff"
          value={value}
          onChangeText={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {value.length > 0 && (
          <Pressable onPress={onClear}>
            <X size={20} color="#fff" />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
