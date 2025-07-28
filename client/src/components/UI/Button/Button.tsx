import { Loader2 } from "lucide-react";
import type { ButtonProps } from "../../../types/ButtonTypes";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) => {
  const buttonClasses = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && "btn-full-width",
    loading && "btn-loading",
    disabled && "btn-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      {loading && <Loader2 className="btn-loader" size={16} />}
      <span className={loading ? "btn-content-loading" : "btn-content"}>
        {children}
      </span>
    </button>
  );
};

export default Button;
