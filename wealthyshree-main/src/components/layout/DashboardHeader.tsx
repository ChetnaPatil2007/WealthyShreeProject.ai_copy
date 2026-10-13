import type { RoleConfig, RoleQuickAction } from "../../types/roles"
import { Icon } from "../ui/Icon"

export interface DashboardHeaderProps {
  roleConfig: RoleConfig
  onPrimaryAction?: () => void
  activeQuickAction?: RoleQuickAction
}

export function DashboardHeader({
  roleConfig,
  onPrimaryAction,
  activeQuickAction,
}: DashboardHeaderProps) {
  const primaryAction =
    activeQuickAction ||
    roleConfig.quickActions.find((a) => a.primary) ||
    roleConfig.quickActions[0]

  return (
    <header className="dashboard-header-container">
      <div className="header-meta">
        <div className="header-date-row">
          <span className="header-eyebrow">MONDAY, 12 MAY</span>
          <span className="header-separator">•</span>
          <span className="header-status-pill">
            <span className="live-indicator-dot" /> Live Financial Sphere
          </span>
          <span className="header-role-pill">
            <Icon name={roleConfig.icon} size={13} /> {roleConfig.displayName}
          </span>
        </div>

        <h1 className="header-greeting">
          Good morning, {roleConfig.persona.name}.
        </h1>

        <p className="header-subtitle">{roleConfig.subtitle}</p>
      </div>

      <div className="header-actions">
        {primaryAction && (
          <button
            type="button"
            className="button button--primary header-primary-btn"
            onClick={onPrimaryAction}
          >
            <Icon name={primaryAction.icon} size={16} />
            <span>{primaryAction.label}</span>
          </button>
        )}
      </div>
    </header>
  )
}

export default DashboardHeader
