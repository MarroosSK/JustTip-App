import React, { ReactNode } from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  children: ReactNode;
  className?: string;
  style?: TextStyle | TextStyle[];
}

export default function AppText({
  className = "",
  children,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text className={`font-inter ${className}`} style={style} {...props}>
      {children}
    </Text>
  );
}
