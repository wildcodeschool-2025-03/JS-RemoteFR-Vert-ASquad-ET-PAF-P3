import type { ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "cancel"
  | "ghost"
  | "about-main"
  | "about-secondary"
  | "icon-edit"
  | "icon-delete"
  | "icon-close"
  | "theme"
  | "menu";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}
