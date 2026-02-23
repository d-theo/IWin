import { IconButton as IB, useTheme } from "react-native-paper";
import { AppTheme, theme } from "../../theme/theme";
import { Animated, StyleProp, ViewStyle } from "react-native";

type Props = {
  onPress: () => void;
  icon: string;
  variant: "primary" | "secondary" | "tertiary";
  size?: keyof typeof theme.iconButton.sizes;
  style?: StyleProp<ViewStyle>;
};

export const IconButton = ({
  onPress,
  icon,
  variant,
  style,
  size = "m",
}: Props) => {
  const theme = useTheme<AppTheme>();
  return (
    <IB
      icon={icon}
      iconColor="white"
      style={[{ backgroundColor: theme.colors[variant] }, style]}
      onPress={onPress}
      size={theme.iconButton.sizes[size]}
    />
  );
};
