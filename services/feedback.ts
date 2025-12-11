export type FeedbackPayload = {
  app: string;
  title: string;
  message: string;
};

export const sendFeedback = async (payload: FeedbackPayload): Promise<void> => {
  const apiUrl = process.env.EXPO_PUBLIC_FEEDBACK_API_URL;

  if (!apiUrl) {
    throw new Error("Missing FEEDBACK_API_URL in environment variables.");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Feedback submission failed");
  }
};
