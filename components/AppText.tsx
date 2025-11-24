// components/AppText.tsx
import React, { ReactNode } from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  children: ReactNode;
  className?: string; // voliteľné, default ""
  style?: TextStyle | TextStyle[]; // explicitne typované style
}

export default function AppText({
  className = "",
  children,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`font-inter ${className}`} // default font
      style={style} // inline štýly sa aplikujú spolu s className
      {...props}
    >
      {children}
    </Text>
  );
}
