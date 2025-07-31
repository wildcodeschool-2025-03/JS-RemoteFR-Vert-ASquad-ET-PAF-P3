import "../../assets/styles/StatsCard.css";
import type { Metric, StatsCardProps } from "../../types/Stats.ts";

const StatsCard = ({
  metrics,
  loading = false,
  error = false,
  className = "",
}: StatsCardProps) => {
  return (
    <div className={`stats-card ${className}`}>
      <div className="stats-card__content">
        {metrics.map((metric: Metric) => {
          const displayValue = loading ? "..." : error ? "!" : metric.value;
          const Icon = metric.icon;

          return (
            <div key={metric.label} className="metric-badge">
              <div className="metric-badge__icon">
                <Icon size={24} />
              </div>
              <div className="metric-badge__number">{displayValue}</div>
              <div className="metric-badge__label">{metric.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCard;
