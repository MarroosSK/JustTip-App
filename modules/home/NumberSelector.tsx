import AppText from "@/components/AppText";
import { useSettings } from "@/context/settings-context";
import { Percent, Split } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NumberSheetProps = {
  value: number;
  onChange: (val: number) => void;
  onReset: () => void;
  min?: number;
  max?: number;
  visible: boolean;
  onClose: () => void;
  type: "tip" | "split";
  title: string;
  description?: string;
};

export default function NumberSheetModal({
  value,
  onChange,
  onReset,
  min = 0,
  max = 100,
  visible,
  onClose,
  type,
  title,
  description,
}: NumberSheetProps) {
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState(value.toString());

  useEffect(() => {
    setInput(value.toString());
  }, [value]);

  const handleConfirm = () => {
    let num = parseInt(input, 10);
    if (isNaN(num)) num = min;
    num = Math.max(min, Math.min(max, num));
    onChange(num);
    onClose();
  };

  const Icon = type === "tip" ? Percent : Split;
  const desc =
    description ?? (type === "tip" ? "Zadaj tip %" : "Zadaj počet osôb");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Modal content */}
      <View
        style={[
          styles.modalContainer,
          {
            paddingTop: 16,
            paddingBottom: insets.bottom + 16,
            backgroundColor: isDark ? "#111" : "#fff",
          },
        ]}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View style={{ marginRight: 12 }}>
            <Icon size={28} color={isDark ? "#e4e4e4" : "#454545"} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: isDark ? "#fff" : "#000",
              }}
            >
              {title}
            </AppText>
            <AppText
              style={{
                fontSize: 14,
                color: isDark ? "#ccc" : "#555",
              }}
            >
              {desc}
            </AppText>
          </View>
        </View>

        {/* Number input */}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isDark ? "#333" : "#ccc",
              color: isDark ? "#fff" : "#000",
            },
          ]}
          value={input}
          onChangeText={(text) => {
            const filtered = text.replace(/[^0-9]/g, "");
            let num = parseInt(filtered, 10);
            if (!isNaN(num)) {
              if (type === "tip") num = Math.max(0, Math.min(100, num));
              else if (type === "split") num = Math.max(1, Math.min(100, num));
              setInput(num.toString());
            } else {
              setInput("");
            }
          }}
          keyboardType="numeric"
          placeholder={value.toString()}
          placeholderTextColor={isDark ? "#a0a0a0" : "#999"}
        />

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <Pressable
            onPress={() => {
              onReset();
              onClose();
            }}
            style={[
              styles.button,
              {
                flex: 1,
                marginRight: 10,
                backgroundColor: isDark ? "#444" : "#eee",
              },
            ]}
          >
            <AppText
              style={{ fontWeight: "600", color: isDark ? "#fff" : "#000" }}
            >
              Reset
            </AppText>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            style={[
              styles.button,
              { flex: 1, backgroundColor: isDark ? "#e4e4e4" : "#333" },
            ]}
          >
            <AppText
              style={{ fontWeight: "700", color: isDark ? "#000" : "#fff" }}
            >
              OK
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: Dimensions.get("window").width,
    paddingHorizontal: 16,
  },
  grabber: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});
