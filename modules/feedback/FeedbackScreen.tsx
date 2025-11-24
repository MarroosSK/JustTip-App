import AppText from "@/components/AppText";
import { useSettings } from "@/context/settings-context";
import { sendFeedback } from "@/services/feedback";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";

export default function FeedbackScreen() {
  const { themeMode } = useSettings();
  const { t } = useTranslation();
  const isDark = themeMode === "dark";

  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastFeedbackTime, setLastFeedbackTime] = useState<number | null>(null);
  const [errors, setErrors] = useState({ title: "", message: "" });

  useEffect(() => {
    AsyncStorage.getItem("lastFeedbackTime").then((time) => {
      if (time) setLastFeedbackTime(Number(time));
    });
  }, []);

  const onSendFeedback = () => {
    const now = Date.now();
    if (lastFeedbackTime && now - lastFeedbackTime < 60 * 1000) {
      Toast.show({
        type: "error",
        text1: t("feedback.wait_title"),
        text2: t("feedback.wait_message"),
        theme: isDark ? "dark" : "light",
      });
      return;
    }

    setErrors({ title: "", message: "" });
    let hasError = false;

    if (!feedbackTitle.trim()) {
      setErrors((e) => ({ ...e, title: t("feedback.required_subject") }));
      hasError = true;
    }
    if (!feedbackMessage.trim()) {
      setErrors((e) => ({ ...e, message: t("feedback.required_message") }));
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    sendFeedback({
      app: "TippingApp",
      title: feedbackTitle.trim(),
      message: feedbackMessage.trim(),
    })
      .then(() => {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: t("feedback.thank_you_title"),
          text2: t("feedback.thank_you_message"),
          theme: isDark ? "dark" : "light",
        });
        setFeedbackTitle("");
        setFeedbackMessage("");
        setLastFeedbackTime(now);
      })
      .catch((err) => {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: t("feedback.error_title"),
          text2: t("feedback.error_message"),
          theme: isDark ? "dark" : "light",
        });
        console.error("Feedback error:", err);
      });
  };

  const inputBg = isDark ? "#1f1f1f" : "#f3f3f3"; // bg-card
  const inputBorder = isDark ? "#333" : "#ddd"; // jemný border
  const buttonBg = isDark ? "#1f1f1f" : "#f3f3f3"; // bg-card
  const buttonTextColor = isDark ? "#e4e4e4" : "#454545";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 px-4"
    >
      <View className="flex-1 gap-4">
        <AppText className="text-3xl text-text-primaryLight dark:text-text-primaryDark mt-2 mb-1">
          {t("feedback.title")}
        </AppText>

        {/* Title input */}
        {errors.title ? (
          <AppText style={{ color: "red", marginBottom: 4 }}>
            {errors.title}
          </AppText>
        ) : null}
        <TextInput
          placeholder={t("feedback.placeholder_subject")}
          placeholderTextColor={isDark ? "#a1a1aa" : "#6b7280"}
          value={feedbackTitle}
          onChangeText={(text) => {
            setFeedbackTitle(text);
            if (text.trim().length > 0 && errors.title) {
              setErrors((e) => ({ ...e, title: "" }));
            }
          }}
          editable={!loading}
          style={{
            backgroundColor: inputBg,
            borderColor: errors.title ? "red" : inputBorder,
            borderWidth: 1,
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            color: isDark ? "#fff" : "#000",
          }}
        />

        {/* Message input */}
        {errors.message ? (
          <AppText style={{ color: "red", marginBottom: 4 }}>
            {errors.message}
          </AppText>
        ) : null}
        <TextInput
          placeholder={t("feedback.placeholder_message")}
          placeholderTextColor={isDark ? "#a1a1aa" : "#6b7280"}
          value={feedbackMessage}
          onChangeText={(text) => {
            setFeedbackMessage(text);
            if (text.trim().length > 0 && errors.message) {
              setErrors((e) => ({ ...e, message: "" }));
            }
          }}
          editable={!loading}
          multiline
          numberOfLines={4}
          style={{
            backgroundColor: inputBg,
            borderColor: errors.message ? "red" : inputBorder,
            borderWidth: 1,
            borderRadius: 12,
            padding: 12,
            textAlignVertical: "top",
            marginBottom: 16,
            minHeight: 120,
            color: isDark ? "#fff" : "#000",
          }}
        />

        {/* Button */}
        <Pressable
          onPress={onSendFeedback}
          disabled={loading}
          className="w-full py-4 rounded-lg items-center bg-bg-dark dark:bg-bg-light"
        >
          {loading ? (
            <ActivityIndicator color={buttonTextColor} />
          ) : (
            <AppText className="text-text-primaryDark dark:text-text-primaryLight font-bold text-center">
              {t("feedback.send")}
            </AppText>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
