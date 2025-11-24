import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const colors = ["#FFC700", "#FF4E50", "#4ECDC4", "#556270", "#C7F464"];

interface LiteConfettiProps {
  visible: boolean;
  count?: number;
  duration?: number;
  onComplete?: () => void;
}

const LiteConfetti: React.FC<LiteConfettiProps> = ({
  visible,
  count = 30,
  duration = 3000,
  onComplete,
}) => {
  const animations = useRef(
    [...Array(count)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (visible) {
      const animatedArr = animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      );

      Animated.stagger(50, animatedArr).start(() => {
        animations.forEach((anim) => anim.setValue(0));
        if (onComplete) onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {animations.map((anim, i) => {
        // náhodné pozície a veľkosti
        const startX = Math.random() * width;
        const size = 6 + Math.random() * 8;
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, height + size * 2],
        });
        const translateX = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, (Math.random() - 0.5) * 100],
        });
        const rotate = anim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", `${Math.random() * 360}deg`],
        });
        const opacity = anim.interpolate({
          inputRange: [0, 0.8, 1],
          outputRange: [1, 1, 0],
        });

        return (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              top: -size,
              left: startX,
              width: size,
              height: size,
              backgroundColor: colors[i % colors.length],
              borderRadius: 2,
              opacity,
              transform: [
                { translateY },
                { translateX },
                { rotate },
                { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] }) },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

export default LiteConfetti;
