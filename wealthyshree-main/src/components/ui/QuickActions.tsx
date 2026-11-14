import { useState } from "react"
import type {
  RoleQuickAction,
  UserSession,
  RoleConfig,
} from "../../types/roles"
import { authorizeAction } from "../../config/roles"
import { Icon } from "./Icon"

export interface QuickActionsProps {
  actions: RoleQuickAction[]
  roleConfig: RoleConfig
  userSession?: UserSession
  onExecuteAction?: (action: RoleQuickAction) => void
}

export function QuickActions({
  actions,
  roleConfig,
  userSession,
  onExecuteAction,
}: QuickActionsProps) {
  const [activeFeedback, setActiveFeedback] = useState<{
    id: string
    message: string
    type: "success" | "warning"
  } | null>(null)

  const authorizeQuickAction = (action: RoleQuickAction) => {
    const authorization = authorizeAction(userSession, action, roleConfig)
    if (
      roleConfig.key === "super_admin" &&
      action.requiredPermission &&
      userSession?.activeRoleKey !== "super_admin"
    ) {
      return {
        ...authorization,
        allowed: false,
        reason: "This action requires verified permissions.",
      }
    }
    return authorization
  }

  const handleClick = (action: RoleQuickAction) => {
    const auth = authorizeQuickAction(action)

    if (!auth.allowed) {
      setActiveFeedback({
        id: action.id,
        message: auth.reason || "Action requires verified role credentials.",
        type: "warning",
      })
      setTimeout(() => setActiveFeedback(null), 4000)
      return
    }

    setActiveFeedback({
      id: action.id,
      message: `Executing "${action.label}"...`,
      type: "success",
    })
    setTimeout(() => setActiveFeedback(null), 3000)

    if (onExecuteAction) {
      onExecuteAction(action)
    }
  }

  return (
    <section className="quick-actions-section" aria-label="Quick Actions">
      <div className="section-header-row">
        <div>
          <span className="section-eyebrow">WORKFLOW LAUNCHPAD</span>
          <h3 className="section-heading">Quick Actions</h3>
        </div>
        <span className="section-subtitle">
          Role-tailored shortcuts for {roleConfig.displayName}
        </span>
      </div>
      {actions.some(
        (action) =>
          action.requiredPermission &&
          !authorizeQuickAction(action).allowed,
      ) && (
        <p className="action-restriction-notice" role="note">
          This action requires verified permissions.
        </p>
      )}

      <div className="quick-actions-grid">
        {actions.map((action) => {
          const isFeedbackActive = activeFeedback?.id === action.id
          const authorization = authorizeQuickAction(action)
          const isDisabled =
            Boolean(action.requiredPermission) && !authorization.allowed

          return (
            <button
              key={action.id}
              type="button"
              className={`quick-action-card ${
                action.primary ? "primary-action" : ""
              }`}
              onClick={() => handleClick(action)}
              disabled={isDisabled}
              title={
                isDisabled
                  ? "This action requires verified permissions."
                  : undefined
              }
            >
              <div className="quick-action-top">
                <span className="action-icon-pill">
                  <Icon name={action.icon} size={18} />
                </span>
                {action.primary ? (
                  <span className="action-badge primary">Primary</span>
                ) : action.requiredPermission ? (
                  <span
                    className="action-badge secured"
                    title="Zero-Trust Protected"
                  >
                    <Icon name="lock" size={10} /> Protected
                  </span>
                ) : null}
              </div>

              <div className="quick-action-body">
                <strong className="action-title">{action.label}</strong>
                <p className="action-desc">{action.description}</p>
              </div>

              <div className="quick-action-arrow">
                <span>Run</span>
                <Icon name="arrow" size={13} />
              </div>

              {isFeedbackActive && (
                <div className={`action-toast ${activeFeedback.type}`}>
                  <span>{activeFeedback.message}</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default QuickActions
