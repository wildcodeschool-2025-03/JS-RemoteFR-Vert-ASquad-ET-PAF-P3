import * as LucideIcons from "lucide-react";
import { COLORS } from "../../constants/colors";

type LucideIconProps = {
  iconName: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
};

export default function LucideIcon({
  iconName,
  size = 20,
  color = COLORS.primary,
  style = {},
}: LucideIconProps) {
  const Icon = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as React.ElementType;

  if (!Icon) {
    return null;
  }

  return <Icon size={size} style={{ color, ...style }} />;
}
