import type { IconName } from "../../types/roles"
import { Icon } from "./Icon"

export interface MetricCardProps {
  label: string
  value: string
  detail: string
  icon: IconName
  tone?: "violet" | "blue" | "gold" | "emerald" | "navy" | string
  trend?: "up" | "down" | "neutral"
  onClick?: () => void
}

export function MetricCard({
  label,
  value,
  detail,
  icon,
  tone,
  trend = "up",
  onClick,
}: MetricCardProps) {
  const trendArrow = trend === "down" ? "↘" : trend === "neutral" ? "→" : "↗"

  return (
    <div
      className={`metric-card ${onClick ? "clickable" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={`metric-icon ${tone || ""}`}>
        <Icon name={icon} />
      </div>
      <div className="metric-label">
        <span>{label}</span>
        <button
          className="metric-more-btn"
          type="button"
          aria-label={`Options for ${label}`}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Icon name="more" size={14} />
        </button>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">
        <span className={`trend-indicator trend-${trend}`}>{trendArrow}</span>{" "}
        {detail}
      </div>
      <div className="spark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

export default MetricCard
