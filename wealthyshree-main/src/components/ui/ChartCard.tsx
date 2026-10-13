import React, { useState } from "react"
import type { ChartLegendItem } from "../../types/layout"
import { Icon } from "./Icon"

export interface ChartCardProps {
  title: string
  subtitle?: string
  value?: string
  badge?: {
    label: string
    tone?: "success" | "warning" | "info" | "neutral"
  }
  periods?: string[]
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
  legends?: ChartLegendItem[]
  children?: React.ReactNode
  className?: string
}

export function ChartCard({
  title,
  subtitle,
  value,
  badge,
  periods = ["1M", "3M", "6M", "1Y", "ALL"],
  selectedPeriod: controlledPeriod,
  onPeriodChange,
  legends,
  children,
  className = "",
}: ChartCardProps) {
  const [internalPeriod, setInternalPeriod] = useState(periods[3] || "1Y")
  const activePeriod =
    controlledPeriod !== undefined ? controlledPeriod : internalPeriod

  const handlePeriodClick = (p: string) => {
    if (onPeriodChange) {
      onPeriodChange(p)
    } else {
      setInternalPeriod(p)
    }
  }

  return (
    <div className={`card chart-card-container ${className}`.trim()}>
      <div className="card-head">
        <div>
          <span className="card-title">{title}</span>
          {subtitle && <span className="card-sub">{subtitle}</span>}
        </div>
        {periods && periods.length > 0 && (
          <div
            className="period-tabs"
            role="tablist"
            aria-label="Chart time range"
          >
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={activePeriod === p}
                className={activePeriod === p ? "active" : ""}
                onClick={() => handlePeriodClick(p)}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {value && (
        <div className="chart-value">
          <strong>{value}</strong>
          {badge && (
            <span className={`badge badge--${badge.tone || "success"}`}>
              {badge.label}
            </span>
          )}
        </div>
      )}

      <div className="chart-content-body">
        {children || (
          <div className="axis-chart">
            <div className="y-axis">
              <span>$4.5M</span>
              <span>$4.0M</span>
              <span>$3.5M</span>
              <span>$3.0M</span>
              <span>$2.5M</span>
            </div>
            <div className="line-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <svg viewBox="0 0 700 230" preserveAspectRatio="none">
                <defs>
                  <linearGradient
                    id="chartCardFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0"
                      stopColor="currentColor"
                      stopOpacity=".18"
                    />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="area"
                  d="M0 192 C60 184 86 161 138 165 S220 178 270 128 S350 150 400 105 S475 120 524 73 S610 83 700 28 L700 230 L0 230Z"
                  fill="url(#chartCardFill)"
                />
                <path
                  className="line"
                  d="M0 192 C60 184 86 161 138 165 S220 178 270 128 S350 150 400 105 S475 120 524 73 S610 83 700 28"
                />
                <circle cx="700" cy="28" r="5" />
              </svg>
              <div className="x-axis">
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {legends && legends.length > 0 && (
        <div className="chart-legend-row">
          {legends.map((item) => (
            <div key={item.label} className="legend-chip">
              <span className={`legend-dot ${item.color}`} />
              <span className="legend-label">{item.label}</span>
              <strong className="legend-val">{item.value}</strong>
              {item.pct && <small className="legend-pct">{item.pct}</small>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChartCard
