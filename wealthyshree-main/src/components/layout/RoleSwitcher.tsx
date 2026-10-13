import { useState, useRef, useEffect } from "react"
import type { RoleConfig } from "../../types/roles"
import { getAllRoleConfigs } from "../../config/roles"
import { Icon } from "../ui/Icon"

export interface RoleSwitcherProps {
  currentRole: RoleConfig
  onSelectRole: (roleName: string) => void
}

export function RoleSwitcher({ currentRole, onSelectRole }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const allConfigs = getAllRoleConfigs()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="role-switcher-container" ref={containerRef}>
      <button
        type="button"
        className="role-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="role-dot" />
        <span className="role-name-text">{currentRole.displayName}</span>
        <Icon name="chevron" size={13} className={isOpen ? "rotate-up" : ""} />
      </button>

      {isOpen && (
        <div className="role-switcher-dropdown" role="listbox">
          <div className="role-dropdown-header">
            <span>SWITCH WORKSPACE PERSPECTIVE</span>
            <small>16 Role Views</small>
          </div>

          <div className="role-dropdown-grid">
            {allConfigs.map((config) => {
              const isSelected = config.key === currentRole.key

              return (
                <button
                  key={config.key}
                  type="button"
                  className={`role-dropdown-item ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => {
                    onSelectRole(config.displayName)
                    setIsOpen(false)
                  }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="role-item-icon">
                    <Icon name={config.icon} size={15} />
                  </div>
                  <div className="role-item-info">
                    <strong className="role-item-title">
                      {config.displayName}
                    </strong>
                    <span className="role-item-cat">{config.category}</span>
                  </div>
                  {isSelected && (
                    <Icon name="check" size={14} className="role-check-icon" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="role-dropdown-footer">
            <Icon name="shield" size={12} />
            <span>
              Zero-Trust: Perspective only. Permissions are not auto-granted.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoleSwitcher
