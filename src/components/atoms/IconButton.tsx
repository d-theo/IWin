import {
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
} from "@shopify/restyle";
import { Theme } from "../../theme/appTheme";

type Props = SpacingProps<Theme> & VariantProps<Theme, "iconButtonVariants">;
const IconButton = createRestyleComponent<Props, Theme>([
  spacing,
  createVariant({ themeKey: "iconButtonVariants" }),
]);

export default IconButton;
