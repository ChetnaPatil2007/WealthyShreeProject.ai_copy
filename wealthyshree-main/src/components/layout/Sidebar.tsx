import type { RoleConfig } from "../../types/roles"
import { Icon } from "../ui/Icon"

export interface SidebarProps {
  roleConfig: RoleConfig
  active?: string
  activeId?: string
  onSelect: (navId: string) => void
  open: boolean
  setOpen: (v: boolean) => void
  onNavigateHome?: () => void
}

export function Sidebar({
  roleConfig,
  active,
  activeId,
  onSelect,
  open,
  setOpen,
  onNavigateHome,
}: SidebarProps) {
  const currentActive = activeId ?? active
  return (
    <>
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${open ? "open" : ""}`}
        aria-label="Main Navigation"
      >
        <div className="side-logo">
          <div
            className="logo"
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
            <span className="logo-mark">
              <span />
            </span>
            <span className="logo-type">
              WealthSphere<span>.ai</span>
            </span>
          </div>
          <button
            type="button"
            className="button button--icon side-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="menu" size={18} />
          </button>
        </div>

        <div className="workspace-pill">
          <span className="avatar">{roleConfig.persona.initials}</span>
          <div className="workspace-info">
            <b title={roleConfig.persona.workspaceName}>
              {roleConfig.persona.workspaceName}
            </b>
            <span title={roleConfig.persona.title}>
              {roleConfig.persona.title}
            </span>
          </div>
          <Icon name="chevron" size={14} />
        </div>

        <nav className="side-nav">
          {roleConfig.navigationMenu.map((section) => (
            <div className="nav-section" key={section.label}>
              <span className="nav-label">{section.label}</span>
              {section.items.map((item) => {
                const isActive = currentActive
                  ? item.id === currentActive || item.name === currentActive
                  : false

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`nav-item ${isActive ? "active" : ""}`}
                    onClick={() => {
                      onSelect(item.id)
                      setOpen(false)
                    }}
                  >
                    <Icon name={item.icon} size={16} />
                    <span className="nav-item-text">{item.name}</span>
                    {item.badge && (
                      <span className="nav-item-badge">{item.badge}</span>
                    )}
                    {isActive && <i className="nav-active-bar" />}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="security-card">
            <Icon name="shield" size={16} />
            <div>
              <b>Wealth Protection</b>
              <span>Continuous Surveillance Active</span>
            </div>
            <i className="status-live-dot" />
          </div>

          <button type="button" className="profile-row">
            <span className="avatar">{roleConfig.persona.initials}</span>
            <div className="profile-info">
              <b>{roleConfig.persona.name}</b>
              <span>{roleConfig.persona.badgeLabel} Workspace</span>
            </div>
            <Icon name="more" size={16} />
          </button>

          {onNavigateHome && (
            <button
              type="button"
              className="exit-workspace-btn"
              onClick={onNavigateHome}
              title="Return to Welcome Portal & Role Selection"
            >
              <Icon name="arrow" size={14} className="exit-icon-flipped" />
              <span>Exit to Portal</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
