import { useState } from "react"
import type { RoleConfig } from "../../types/roles"
import type { NotificationItem } from "../../types/layout"
import { Icon } from "../ui/Icon"
import { RoleSwitcher } from "./RoleSwitcher"
import { NotificationsDrawer } from "./NotificationsDrawer"

export interface TopbarProps {
  roleConfig: RoleConfig
  pageTitle: string
  dark: boolean
  onToggleDark: () => void
  onOpenSidebar: () => void
  onOpenAI: () => void
  onSelectRole: (roleName: string) => void
  notifications: NotificationItem[]
  onNavigateHome?: () => void
}

export function Topbar({
  roleConfig,
  pageTitle,
  dark,
  onToggleDark,
  onOpenSidebar,
  onOpenAI,
  onSelectRole,
  notifications,
  onNavigateHome,
}: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const unreadNotifCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <div className="mobile-brand">
            <button
              type="button"
              className="button button--icon"
              onClick={onOpenSidebar}
              aria-label="Open navigation menu"
            >
              <Icon name="menu" size={20} />
            </button>
            <div
              className="logo logo--compact"
              onClick={onNavigateHome}
              role={onNavigateHome ? "button" : undefined}
              tabIndex={onNavigateHome ? 0 : undefined}
              title={
                onNavigateHome
                  ? "Return to Welcome Portal & Role Selection"
                  : undefined
              }
              style={{ cursor: onNavigateHome ? "pointer" : "default" }}
            >
              <span className="logo-mark">
                <span />
              </span>
            </div>
          </div>

          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span
              className="breadcrumb-root"
              onClick={onNavigateHome}
              role={onNavigateHome ? "button" : undefined}
              tabIndex={onNavigateHome ? 0 : undefined}
              title={
                onNavigateHome
                  ? "Return to Welcome Portal & Role Selection"
                  : undefined
              }
              style={{ cursor: onNavigateHome ? "pointer" : "default" }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && onNavigateHome) {
                  e.preventDefault()
                  onNavigateHome()
                }
              }}
            >
              WealthSphere
            </span>
            <Icon name="chevron" size={12} className="breadcrumb-separator" />
            <span className="breadcrumb-role-pill">
              {roleConfig.displayName}
            </span>
            <Icon name="chevron" size={12} className="breadcrumb-separator" />
            <b className="breadcrumb-current">{pageTitle}</b>
          </nav>
        </div>

        <div className="top-actions">
          <button
            type="button"
            className="search-box"
            onClick={() => setSearchOpen(true)}
            aria-label="Search platform"
          >
            <Icon name="search" size={14} />
            <span>Search assets, accounts, clients…</span>
            <kbd>⌘ K</kbd>
          </button>

          <RoleSwitcher currentRole={roleConfig} onSelectRole={onSelectRole} />

          <button
            type="button"
            className="button button--icon"
            onClick={onToggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
          >
            <Icon name={dark ? "sun" : "moon"} size={17} />
          </button>

          <button
            type="button"
            className="button button--icon notification-bell-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label={`Notifications (${unreadNotifCount} unread)`}
            title="Notifications"
          >
            <Icon name="notification" size={17} />
            {unreadNotifCount > 0 && (
              <span className="notification-badge-dot">
                {unreadNotifCount > 9 ? "9+" : unreadNotifCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="button button--secondary topbar-ai-btn"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>Ask Sphere AI</span>
          </button>
        </div>
      </header>

      <NotificationsDrawer
        notifications={notifications}
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
      />

      {searchOpen && (
        <div
          className="search-modal-backdrop"
          onClick={() => setSearchOpen(false)}
        >
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-input-row">
              <Icon name="search" size={18} />
              <input
                type="text"
                placeholder="Search anything across your wealth sphere..."
                autoFocus
              />
              <button
                type="button"
                className="search-close-btn"
                onClick={() => setSearchOpen(false)}
              >
                ESC
              </button>
            </div>
            <div className="search-suggestions">
              <span className="search-section-label">SUGGESTED ACTIONS</span>
              <button type="button" onClick={() => setSearchOpen(false)}>
                <Icon name="tax" size={15} />{" "}
                <span>Review 2025 Tax Harvest Offsets</span>
              </button>
              <button type="button" onClick={() => setSearchOpen(false)}>
                <Icon name="bank" size={15} />{" "}
                <span>Connect Institution via Open Banking</span>
              </button>
              <button type="button" onClick={() => setSearchOpen(false)}>
                <Icon name="family" size={15} />{" "}
                <span>Open Family Wealth Tree Map</span>
              </button>
              <button type="button" onClick={() => setSearchOpen(false)}>
                <Icon name="shield" size={15} />{" "}
                <span>Run Zero-Trust Audit Integrity Verification</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Topbar
