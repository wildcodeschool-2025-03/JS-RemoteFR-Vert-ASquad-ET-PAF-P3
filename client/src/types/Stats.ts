import type { LucideIcon } from "lucide-react";

export interface Metric {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export interface StatsCardProps {
  metrics: Metric[];
  loading?: boolean;
  error?: boolean;
  className?: string;
}
