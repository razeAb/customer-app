// hooks/useThemeColor.ts
import { useColorScheme } from "react-native";

type ThemeProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(props: ThemeProps, colorName: "background" | "text"): string {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  // fallback theme colors
  const defaultColors = {
    light: {
      background: "#fff",
      text: "#000",
    },
    dark: {
      background: "#000",
      text: "#fff",
    },
  };

  return defaultColors[theme][colorName];
}
