import type React from "react";
import "../../../assets/styles/PageHeader.css";

interface PageHeaderProps {
  title: string;
  badge?: boolean;
  actionButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  badge = true,
  actionButton,
  className = "",
}) => {
  const headerClass = actionButton
    ? "page-header page-header-with-action"
    : "page-header page-header-centered";

  return (
    <div className={`${headerClass} ${className}`}>
      {badge ? (
        <div className="page-badge">
          <h1>{title}</h1>
        </div>
      ) : (
        <h1 className="page-title">{title}</h1>
      )}

      {actionButton && (
        <button
          type="button"
          className={`action-btn action-btn-${actionButton.variant || "primary"}`}
          onClick={actionButton.onClick}
        >
          {actionButton.icon}
          {actionButton.label}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
