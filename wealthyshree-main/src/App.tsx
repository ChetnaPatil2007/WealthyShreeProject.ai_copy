import { useEffect, useMemo, useState } from "react"
import {
  getAllRoleConfigs,
  getRoleConfig,
  authorizeAction,
  hasPermission,
  getPageKey,
} from "./config/roles"
import type { RoleConfig, RoleNavSection, RoleNavItem, PageKey } from "./types/roles"
import { AppShell } from "./components/layout/AppShell"
import { useToast } from "./components/ui/Toast"
import { IndividualModulePage } from "./features/individual/IndividualPages"
import { FamilyModulePage } from "./features/family/FamilyPages"
import { StudentModulePage } from "./features/student/StudentPages"
import { AdvisorModulePage } from "./features/advisor/AdvisorPages"
import { CAModulePage } from "./features/ca/CAPages"
import { TaxConsultantModulePage } from "./features/tax/TaxConsultantPages"
import { InvestmentModulePage } from "./features/investment/InvestmentPages"
import { InsuranceModulePage } from "./features/insurance/InsurancePages"
import { WealthCoachModulePage } from "./features/coach/WealthCoachPages"
import { FamilyOfficeModulePage } from "./features/familyoffice/FamilyOfficePages"
import { PrivateBankModulePage } from "./features/privatebank/PrivateBankPages"
import { CorporateHRModulePage } from "./features/corporatehr/CorporateHRPages"
import { UniversityModulePage } from "./features/university/UniversityPages"
import { GovernmentModulePage } from "./features/government/GovernmentPages"
import { AuditorModulePage } from "./features/auditors/AuditorPages"
import { SuperAdminModulePage } from "./features/admin/SuperAdminPages"

type IconName = "activity" | "ai" | "alert" | "arrow" | "bank" | "book" | "briefcase" | "calendar" | "card" | "check" | "chevron" | "document" | "family" | "globe" | "goal" | "grid" | "home" | "insurance" | "lock" | "menu" | "moon" | "more" | "notification" | "pie" | "plus" | "search" | "settings" | "shield" | "sparkle" | "sun" | "tax" | "trending" | "user" | "wallet"

const iconPaths: Record<IconName, React.ReactNode> = {
  activity: (
    <>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3V1m0 22v-2M3 12H1m22 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4" />
      <circle cx="12" cy="12" r="6" />
      <path d="M9.5 13.5s2.5 2 5 0M9 10h.01M15 10h.01" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 2.8 19h18.4L12 3Z" />
      <path d="M12 9v4m0 3h.01" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </>
  ),
  bank: (
    <>
      <path d="m3 9 9-5 9 5M5 10v7m4-7v7m6-7v7m4-7v7M3 20h18" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Zm16 0A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18M10 12v2h4v-2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4m8-4v4M3 10h18" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20m-16 5h4" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4L19 6" />
    </>
  ),
  chevron: (
    <>
      <path d="m9 18 6-6-6-6" />
    </>
  ),
  document: (
    <>
      <path d="M6 2h8l4 4v16H6V2Z" />
      <path d="M14 2v5h5M9 12h6m-6 4h6" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M3 20c0-4 2.5-7 6-7s6 3 6 7m0-6c3 0 5 2.5 5 6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  goal: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8v10h-6v-7H9v7H3V11Z" />
    </>
  ),
  insurance: (
    <>
      <path d="M12 2 4 5v6c0 5 3.4 9.2 8 11 4.6-1.8 8-6 8-11V5l-8-3Z" />
      <path d="M9 12h6m-3-3v6" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  moon: (
    <>
      <path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  notification: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" />
    </>
  ),
  pie: (
    <>
      <path d="M11 3a9 9 0 1 0 9 9h-9V3Z" />
      <path d="M14 3.5V9h5.5A7 7 0 0 0 14 3.5Z" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19 13.5v-3l-2-.7a7 7 0 0 0-.7-1.7l.9-2-2.1-2.1-2 .9a7 7 0 0 0-1.7-.7L10.5 2h-3l-.7 2.2a7 7 0 0 0-1.7.7L3 4 1 6.1l.9 2a7 7 0 0 0-.7 1.7L-1 10.5v3l2.2.7c.2.6.4 1.2.7 1.7l-.9 2L3.1 20l2-.9c.5.3 1.1.6 1.7.7l.7 2.2h3l.7-2.2c.6-.2 1.2-.4 1.7-.7l2 .9 2.1-2.1-.9-2c.3-.5.6-1.1.7-1.7l2.2-.7Z"
        transform="translate(3)"
      />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 5v6c0 5 3.4 9.2 8 11 4.6-1.8 8-6 8-11V5l-8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  tax: (
    <>
      <path d="M7 3h10v18H7V3Zm3 4h4m-4 4h.01m4 0h.01m-4 4h.01m4 0h.01" />
    </>
  ),
  trending: (
    <>
      <path d="m3 17 6-6 4 4 8-9" />
      <path d="M15 6h6v6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.5-5 3-8 8-8s7.5 3 8 8" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 6h15a3 3 0 0 1 3 3v10H3V6Zm0 0 13-3v3m1 6h4" />
    </>
  ),
}

interface IconProps {
  name: IconName
  size?: number
}

function Icon({ name, size = 18 }: IconProps) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  className = "",
}: {
  children?: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "icon"
  icon?: IconName
  onClick?: () => void
  type?: "button" | "submit"
  className?: string
}) {
  return (
    <button
      type={type}
      className={`button button--${variant} ${className}`}
      onClick={onClick}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} placeholder={placeholder} />
    </label>
  )
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "neutral" | "success" | "warning" | "info"
}) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="logo-mark">
        <span />
      </span>
      {!compact && (
        <span className="logo-type">
          WealthSphere<span>.ai</span>
        </span>
      )}
    </div>
  )
}

const allRoleConfigs = getAllRoleConfigs()
const roles = allRoleConfigs.map((r) => r.displayName)

interface LegacyNavItem {
  name: string
  icon: IconName
}

interface LegacyNavSection {
  label: string
  items: LegacyNavItem[]
}

const navSections: LegacyNavSection[] = [
  {
    label: "Overview",
    items: [
      { name: "Wealth Dashboard", icon: "grid" },
      { name: "Financial Health", icon: "activity" },
      { name: "Net Worth", icon: "trending" },
      { name: "Cash Flow", icon: "wallet" },
    ],
  },
  {
    label: "Manage Wealth",
    items: [
      { name: "Assets & Liabilities", icon: "bank" },
      { name: "Portfolio", icon: "pie" },
      { name: "Investments", icon: "trending" },
      { name: "Goals", icon: "goal" },
    ],
  },
  {
    label: "Plan & Protect",
    items: [
      { name: "Insurance", icon: "insurance" },
      { name: "Tax Planning", icon: "tax" },
      { name: "Retirement", icon: "calendar" },
      { name: "Estate Planning", icon: "document" },
      { name: "Risk Engine", icon: "shield" },
    ],
  },
  {
    label: "Family & Knowledge",
    items: [
      { name: "Family Office", icon: "briefcase" },
      { name: "Family Wealth Tree", icon: "family" },
      { name: "Document Vault", icon: "lock" },
      { name: "Learning Academy", icon: "book" },
    ],
  },
  {
    label: "Workspaces",
    items: [
      { name: "Advisor Workspace", icon: "user" },
      { name: "Enterprise Console", icon: "globe" },
      { name: "Subscription Plans", icon: "card" },
      { name: "Super Admin", icon: "settings" },
    ],
  },
]

function Landing({
  onStart,
  onLogin,
}: {
  onStart: () => void
  onLogin: () => void
}) {
  return (
    <div className="landing">
      <div className="landing-nav">
        <Logo />
        <div className="landing-links">
          <span>Platform</span>
          <span>For professionals</span>
          <span>Security</span>
          <span>Academy</span>
        </div>
        <div className="nav-actions">
          <Button variant="ghost" onClick={onLogin}>
            Sign in
          </Button>
          <Button onClick={onStart}>
            Get started <Icon name="arrow" />
          </Button>
        </div>
      </div>
      <main className="hero">
        <div className="hero-copy">
          <Badge tone="success">
            <Icon name="sparkle" size={14} /> AI-native wealth intelligence
          </Badge>
          <div className="display">
            Your entire financial world.
            <br />
            <em>One intelligent sphere.</em>
          </div>
          <div className="hero-sub">
            Build, protect, grow and transfer wealth with a unified platform
            that brings every asset, advisor and decision into focus.
          </div>
          <div className="hero-actions">
            <Button onClick={onStart}>
              Start building wealth <Icon name="arrow" />
            </Button>
            <Button variant="secondary" onClick={onLogin}>
              <Icon name="ai" /> Explore AI agents
            </Button>
          </div>
          <div className="trust-row">
            <span>
              <Icon name="shield" /> Bank-grade security
            </span>
            <span>
              <Icon name="globe" /> Global compliance
            </span>
            <span>
              <Icon name="check" /> Human-in-the-loop AI
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="preview-card">
            <div className="preview-top">
              <div>
                <span className="eyebrow">Total net worth</span>
                <strong>$4,285,640</strong>
              </div>
              <Badge tone="success">+8.4% YTD</Badge>
            </div>
            <div className="preview-chart">
              <svg viewBox="0 0 500 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0"
                      stopColor="currentColor"
                      stopOpacity=".22"
                    />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="area"
                  d="M0 132 C50 125 72 96 110 104 S165 120 205 80 S265 92 300 58 S365 75 405 38 S460 46 500 15 L500 160 L0 160Z"
                />
                <path
                  className="line"
                  d="M0 132 C50 125 72 96 110 104 S165 120 205 80 S265 92 300 58 S365 75 405 38 S460 46 500 15"
                />
              </svg>
            </div>
            <div className="asset-row">
              <div className="mini-icon">
                <Icon name="home" />
              </div>
              <div>
                <strong>Real estate</strong>
                <span>4 properties</span>
              </div>
              <b>$1.84M</b>
            </div>
            <div className="asset-row">
              <div className="mini-icon violet">
                <Icon name="pie" />
              </div>
              <div>
                <strong>Investments</strong>
                <span>12 portfolios</span>
              </div>
              <b>$1.52M</b>
            </div>
            <div className="insight">
              <span className="insight-icon">
                <Icon name="ai" />
              </span>
              <div>
                <b>Sphere AI insight</b>
                <span>
                  Your tax-loss harvesting window could save approximately
                  $18,400.
                </span>
              </div>
              <Icon name="chevron" />
            </div>
          </div>
          <div className="float-score">
            <span>Financial health</span>
            <div>
              <strong>824</strong>
              <small>/1000</small>
            </div>
            <Badge tone="success">Excellent</Badge>
          </div>
          <div className="float-secure">
            <Icon name="shield" />
            <div>
              <strong>Protected globally</strong>
              <span>SOC 2 · ISO 27001 · GDPR</span>
            </div>
          </div>
        </div>
      </main>
      <div className="brand-strip">
        <span>TRUSTED INFRASTRUCTURE FOR</span>
        <b>Private wealth</b>
        <b>Family offices</b>
        <b>Advisory firms</b>
        <b>Financial institutions</b>
        <b>Universities</b>
      </div>
    </div>
  )
}

function Auth({
  mode,
  initialRole = "Individual",
  onBack,
  onSuccess,
}: {
  mode: "login" | "roles"
  initialRole?: string
  onBack: () => void
  onSuccess: (role: string) => void
}) {
  const [selectedRole, setSelectedRole] = useState(
    getRoleConfig(initialRole).displayName,
  )
  const [step, setStep] = useState<"credentials" | "mfa">(
    mode === "roles" ? "mfa" : "credentials",
  )
  return (
    <div className="auth-shell">
      <div className="auth-aside">
        <Logo />
        <div className="auth-quote">
          “Wealth is more than a number. It is the freedom to shape what comes
          next.”
        </div>
        <div className="auth-points">
          <span>
            <Icon name="shield" /> Institutional-grade protection
          </span>
          <span>
            <Icon name="ai" /> Ten specialized AI agents
          </span>
          <span>
            <Icon name="globe" /> Built for global wealth
          </span>
        </div>
        <div className="auth-orbits">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="auth-main">
        <Button variant="ghost" onClick={onBack} className="back-button">
          ← Back
        </Button>
        {step === "credentials" ? (
          <div className="auth-card">
            <Badge tone="success">SECURE ACCESS</Badge>
            <div className="title">Welcome back</div>
            <div className="subtext">
              Enter your credentials to access your wealth universe.
            </div>
            <Field label="Email address" placeholder="name@company.com" />
            <Field
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <div className="form-meta">
              <label className="check-label">
                <input type="checkbox" defaultChecked /> Keep me signed in
              </label>
              <span>Forgot password?</span>
            </div>
            <Button className="full" onClick={() => setStep("mfa")}>
              Continue securely <Icon name="arrow" />
            </Button>
            <div className="sso-divider">OR CONTINUE WITH</div>
            <div className="sso-grid">
              <Button variant="secondary">Google</Button>
              <Button variant="secondary">Microsoft</Button>
            </div>
            <div className="auth-foot">
              New to WealthSphere.ai?{" "}
              <span onClick={() => setStep("mfa")}>Create your account</span>
            </div>
          </div>
        ) : (
          <div className="auth-card role-card">
            <Badge tone="success">PERSONALIZE YOUR EXPERIENCE</Badge>
            <div className="title">
              {mode === "login"
                ? "Verify your identity"
                : "How will you use WealthSphere?"}
            </div>
            <div className="subtext">
              {mode === "login"
                ? "Enter the verification code sent to your trusted device, then choose your workspace."
                : "Choose a role. You can add additional workspaces later."}
            </div>
            {mode === "login" && (
              <div className="otp-row">
                {["8", "4", "2", "6", "1", "9"].map((n, i) => (
                  <input
                    key={i}
                    aria-label={`Digit ${i + 1}`}
                    defaultValue={n}
                    maxLength={1}
                  />
                ))}
              </div>
            )}
            <div className="role-grid">
              {allRoleConfigs.map((config) => (
                <button
                  key={config.key}
                  className={
                    selectedRole === config.displayName
                      ? "role-option selected"
                      : "role-option"
                  }
                  onClick={() => setSelectedRole(config.displayName)}
                >
                  <Icon name={config.icon} />
                  <span>{config.displayName}</span>
                  {selectedRole === config.displayName && <Icon name="check" />}
                </button>
              ))}
            </div>
            <Button className="full" onClick={() => onSuccess(selectedRole)}>
              Enter {selectedRole} workspace <Icon name="arrow" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Sidebar({
  roleConfig,
  active,
  onSelect,
  open,
  setOpen,
}: {
  roleConfig: RoleConfig
  active: string
  onSelect: (n: string) => void
  open: boolean
  setOpen: (v: boolean) => void
}) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="side-logo">
        <Logo />
        <Button variant="icon" icon="menu" onClick={() => setOpen(false)} />
      </div>
      <div className="workspace-pill">
        <span className="avatar">{roleConfig.persona.initials}</span>
        <div>
          <b>{roleConfig.persona.workspaceName}</b>
          <span>{roleConfig.persona.title}</span>
        </div>
        <Icon name="chevron" />
      </div>
      <nav className="side-nav">
        {roleConfig.navigationMenu.map((section: RoleNavSection) => (
          <div className="nav-section" key={section.label}>
            <span className="nav-label">{section.label}</span>
            {section.items.map((item: RoleNavItem) => (
              <button
                key={item.id}
                className={`nav-item ${active === item.name ? "active" : ""}`}
                onClick={() => {
                  onSelect(item.name)
                  setOpen(false)
                }}
              >
                <Icon name={item.icon} />
                <span>{item.name}</span>
                {active === item.name && <i />}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="security-card">
          <Icon name="shield" />
          <div>
            <b>Wealth Protection</b>
            <span>All systems secure</span>
          </div>
          <i />
        </div>
        <button className="profile-row">
          <span className="avatar">{roleConfig.persona.initials}</span>
          <div>
            <b>{roleConfig.persona.name}</b>
            <span>{roleConfig.persona.badgeLabel} plan</span>
          </div>
          <Icon name="more" />
        </button>
      </div>
    </aside>
  )
}

function MetricCard({
  label,
  value,
  detail,
  icon,
  tone,
}: {
  label: string
  value: string
  detail: string
  icon: IconName
  tone?: string
}) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${tone || ""}`}>
        <Icon name={icon} />
      </div>
      <div className="metric-label">
        {label}
        <Icon name="more" />
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">
        <span>↗</span> {detail}
      </div>
      <div className="spark">
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

const allocations = [
  { label: "Equities", value: "$1.42M", pct: "33.2%", color: "emerald" },
  { label: "Real Estate", value: "$1.18M", pct: "27.6%", color: "navy" },
  { label: "Fixed Income", value: "$684K", pct: "16.0%", color: "violet" },
  { label: "Business", value: "$516K", pct: "12.0%", color: "gold" },
  { label: "Cash & Other", value: "$486K", pct: "11.2%", color: "gray" },
]

function Dashboard({ setActive }: { setActive: (v: string) => void }) {
  const [period, setPeriod] = useState("1Y")
  return (
    <div className="dashboard-content">
      <section className="welcome">
        <div>
          <span className="eyebrow">MONDAY, 12 MAY</span>
          <div className="page-title">Good morning, Alex.</div>
          <div className="page-subtitle">
            Your wealth is moving in the right direction. Here’s what matters
            today.
          </div>
        </div>
        <Button onClick={() => setActive("Assets & Liabilities")}>
          <Icon name="plus" /> Add asset
        </Button>
      </section>
      <section className="metric-grid">
        <MetricCard
          label="Net worth"
          value="$4,285,640"
          detail="+$286,450 (7.1%) YTD"
          icon="trending"
        />
        <MetricCard
          label="Investable assets"
          value="$2,704,310"
          detail="+4.8% this quarter"
          icon="pie"
          tone="violet"
        />
        <MetricCard
          label="Monthly cash flow"
          value="+$18,460"
          detail="$6,240 above target"
          icon="wallet"
          tone="blue"
        />
        <MetricCard
          label="Total liabilities"
          value="$428,290"
          detail="↓ 3.2% this year"
          icon="bank"
          tone="gold"
        />
      </section>
      <section className="dashboard-grid">
        <div className="card wealth-chart-card">
          <div className="card-head">
            <div>
              <span className="card-title">Wealth performance</span>
              <span className="card-sub">
                Net worth growth across all connected assets
              </span>
            </div>
            <div className="period-tabs">
              {["1M", "3M", "6M", "1Y", "ALL"].map((p) => (
                <button
                  key={p}
                  className={period === p ? "active" : ""}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-value">
            <strong>$4.29M</strong>
            <Badge tone="success">+7.1%</Badge>
          </div>
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
                  <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
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
        </div>
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">Financial Health Score</span>
              <span className="card-sub">Powered by Sphere AI</span>
            </div>
            <Button
              variant="icon"
              icon="chevron"
              onClick={() => setActive("Financial Health")}
            />
          </div>
          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>824</strong>
              <span>out of 1000</span>
            </div>
          </div>
          <div className="score-grade">
            <Badge tone="success">EXCELLENT</Badge>
            <span>↑ 18 pts this month</span>
          </div>
          <div className="score-bars">
            {[
              ["Cash flow", "92%"],
              ["Protection", "78%"],
              ["Growth", "86%"],
              ["Readiness", "73%"],
            ].map(([l, v]) => (
              <div key={l}>
                <span>
                  {l}
                  <b>{v}</b>
                </span>
                <i>
                  <em style={{ width: v }} />
                </i>
              </div>
            ))}
          </div>
        </div>
        <div className="card allocation-card">
          <div className="card-head">
            <div>
              <span className="card-title">Asset allocation</span>
              <span className="card-sub">Across your global portfolio</span>
            </div>
            <Button variant="icon" icon="more" />
          </div>
          <div className="allocation-body">
            <div className="donut">
              <div>
                <strong>$4.29M</strong>
                <span>Total assets</span>
              </div>
            </div>
            <div className="legend">
              {allocations.map((a) => (
                <div key={a.label}>
                  <i className={a.color} />
                  <span>{a.label}</span>
                  <b>{a.value}</b>
                  <small>{a.pct}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card ai-card">
          <div className="ai-head">
            <span className="insight-icon">
              <Icon name="ai" />
            </span>
            <div>
              <span className="card-title">Sphere AI recommendations</span>
              <span className="card-sub">
                3 actions can improve your financial position
              </span>
            </div>
            <Badge tone="info">AI</Badge>
          </div>
          <div className="recommendations">
            <button onClick={() => setActive("Tax Planning")}>
              <span className="rec-icon green">
                <Icon name="tax" />
              </span>
              <div>
                <b>Optimize your 2025 tax position</b>
                <span>
                  Harvesting losses in two holdings could offset $18,400 in
                  gains.
                </span>
                <small>Tax Agent · High impact</small>
              </div>
              <Icon name="chevron" />
            </button>
            <button onClick={() => setActive("Insurance")}>
              <span className="rec-icon orange">
                <Icon name="insurance" />
              </span>
              <div>
                <b>Close your life insurance gap</b>
                <span>
                  Your current cover is 32% below the recommended protection
                  level.
                </span>
                <small>Insurance Agent · Review needed</small>
              </div>
              <Icon name="chevron" />
            </button>
            <button onClick={() => setActive("Portfolio")}>
              <span className="rec-icon purple">
                <Icon name="pie" />
              </span>
              <div>
                <b>Rebalance international equities</b>
                <span>
                  Allocation drifted 4.2% from your agreed investment policy.
                </span>
                <small>Portfolio Agent · Approval required</small>
              </div>
              <Icon name="chevron" />
            </button>
          </div>
          <Button
            variant="secondary"
            className="full"
            onClick={() => setActive("AI Command Center")}
          >
            View all 8 recommendations <Icon name="arrow" />
          </Button>
        </div>
      </section>
    </div>
  )
}

const moduleInfo: Record<string, {
  eyebrow: string
  title: string
  subtitle: string
  stat: string
  statLabel: string
  tone: string
}> = {
  "Financial Health": {
    eyebrow: "AI WEALTH INTELLIGENCE",
    title: "Your financial health, decoded.",
    subtitle:
      "A holistic 0–1000 score built from liquidity, protection, growth, risk and legacy readiness.",
    stat: "824",
    statLabel: "Excellent · +18 this month",
    tone: "emerald",
  },
  "Net Worth": {
    eyebrow: "WEALTH OVERVIEW",
    title: "Everything you own. Everything you owe.",
    subtitle:
      "A live global balance sheet across institutions, currencies and asset classes.",
    stat: "$4.29M",
    statLabel: "Net worth · +7.1% YTD",
    tone: "navy",
  },
  "Cash Flow": {
    eyebrow: "MONEY MOVEMENT",
    title: "Clarity for every dollar.",
    subtitle:
      "Forecast income, spending and liquidity before decisions become commitments.",
    stat: "+$18.4K",
    statLabel: "Monthly surplus",
    tone: "blue",
  },
  "Assets & Liabilities": {
    eyebrow: "GLOBAL BALANCE SHEET",
    title: "One view across your financial world.",
    subtitle:
      "Bank accounts, cards, loans, property, vehicles, gold, investments, businesses, startups and digital assets.",
    stat: "27",
    statLabel: "Connected assets · 8 institutions",
    tone: "violet",
  },
  Portfolio: {
    eyebrow: "PORTFOLIO INTELLIGENCE",
    title: "Invest with conviction, not noise.",
    subtitle:
      "Institutional-grade allocation, risk, performance attribution and AI rebalancing.",
    stat: "11.8%",
    statLabel: "Annualized return · 5Y",
    tone: "emerald",
  },
  Investments: {
    eyebrow: "INVESTMENT HUB",
    title: "Opportunities, organized.",
    subtitle:
      "Track stocks, mutual funds, fixed income, alternatives, startups and digital assets.",
    stat: "$2.70M",
    statLabel: "Investable assets",
    tone: "navy",
  },
  Goals: {
    eyebrow: "LIFE GOALS",
    title: "Turn ambition into a funded plan.",
    subtitle:
      "Model education, property, travel, entrepreneurship and legacy goals together.",
    stat: "78%",
    statLabel: "Overall goal readiness",
    tone: "gold",
  },
  Insurance: {
    eyebrow: "PROTECTION PLANNING",
    title: "Protect what wealth makes possible.",
    subtitle:
      "AI-powered coverage inventory, insurance-gap analysis and claims readiness.",
    stat: "68%",
    statLabel: "Protection score · Gap detected",
    tone: "gold",
  },
  "Tax Planning": {
    eyebrow: "GLOBAL TAX INTELLIGENCE",
    title: "Plan ahead of every tax event.",
    subtitle:
      "Scenario-led planning for income, capital gains, jurisdictions, FATCA and CRS.",
    stat: "$18.4K",
    statLabel: "Estimated savings opportunity",
    tone: "emerald",
  },
  Retirement: {
    eyebrow: "FUTURE READINESS",
    title: "See the life your wealth can fund.",
    subtitle:
      "Monte Carlo forecasting, income planning and immersive retirement scenarios.",
    stat: "91%",
    statLabel: "Plan confidence · On track",
    tone: "blue",
  },
  "Estate Planning": {
    eyebrow: "LEGACY & SUCCESSION",
    title: "Make your wishes enduring.",
    subtitle:
      "Coordinate wills, trusts, beneficiaries, ownership and transfer workflows.",
    stat: "72%",
    statLabel: "Estate readiness",
    tone: "violet",
  },
  "Risk Engine": {
    eyebrow: "CONTINUOUS PROTECTION",
    title: "Know risk before it becomes loss.",
    subtitle:
      "Fraud, concentration, liquidity, identity and compliance monitoring in real time.",
    stat: "Low",
    statLabel: "Current composite risk",
    tone: "emerald",
  },
  "Family Office": {
    eyebrow: "MULTI-GENERATIONAL WEALTH",
    title: "The family office, reimagined.",
    subtitle:
      "Governance, entities, consolidated reporting and advisor coordination in one private workspace.",
    stat: "$28.6M",
    statLabel: "Family net worth · 3 generations",
    tone: "navy",
  },
  "Family Wealth Tree": {
    eyebrow: "3D OWNERSHIP MAP",
    title: "See how wealth connects generations.",
    subtitle:
      "Explore people, trusts, entities, beneficiaries and succession paths in a living ownership map.",
    stat: "24",
    statLabel: "People & entities connected",
    tone: "violet",
  },
  "Document Vault": {
    eyebrow: "SECURE RECORDS",
    title: "Every critical document, protected.",
    subtitle:
      "Encrypted storage, intelligent extraction, e-signature and role-based sharing.",
    stat: "148",
    statLabel: "Documents · 100% encrypted",
    tone: "emerald",
  },
  "Learning Academy": {
    eyebrow: "WEALTH ACADEMY",
    title: "Financial confidence, credentialed.",
    subtitle:
      "Role-aware learning paths, assessments, digital certificates and QR-verifiable credentials.",
    stat: "68%",
    statLabel: "Current learning path",
    tone: "gold",
  },
  "Advisor Workspace": {
    eyebrow: "PROFESSIONAL WORKSPACE",
    title: "More insight. More time for people.",
    subtitle:
      "A collaborative cockpit for advisors, CAs, consultants, managers and wealth coaches.",
    stat: "84",
    statLabel: "Client households · 6 need attention",
    tone: "blue",
  },
  "Enterprise Console": {
    eyebrow: "INSTITUTIONAL COMMAND",
    title: "One platform, every wealth journey.",
    subtitle:
      "Configurable experiences for banks, universities, employers, government and auditors.",
    stat: "12,480",
    statLabel: "Active members · 98.4% verified",
    tone: "navy",
  },
  "Subscription Plans": {
    eyebrow: "FLEXIBLE ACCESS",
    title: "A plan for every stage of wealth.",
    subtitle:
      "Free, Personal, Family, Professional, Premium, Family Office, Enterprise and University.",
    stat: "Premium",
    statLabel: "Current plan · Renews 12 June",
    tone: "violet",
  },
  "Super Admin": {
    eyebrow: "PLATFORM OPERATIONS",
    title: "Global control, complete accountability.",
    subtitle:
      "Manage tenants, entitlements, AI policies, compliance, billing and system health.",
    stat: "99.99%",
    statLabel: "Platform uptime · All regions",
    tone: "emerald",
  },
  "My Wealth": {
    eyebrow: "WEALTH OVERVIEW",
    title: "Everything you own. Everything you owe.",
    subtitle:
      "A live global balance sheet across institutions, currencies and asset classes.",
    stat: "$4.29M",
    statLabel: "Net worth · +7.1% YTD",
    tone: "navy",
  },
  Transactions: {
    eyebrow: "TRANSACTION INTELLIGENCE",
    title: "Unified ledger and automated tagging.",
    subtitle:
      "Real-time reconciliation across checking, brokerage, crypto, and credit accounts.",
    stat: "128",
    statLabel: "Settled this month",
    tone: "emerald",
  },
  "Budget Planner": {
    eyebrow: "CASH FLOW OPTIMIZER",
    title: "Clarity for every dollar spent and saved.",
    subtitle:
      "Forecast dynamic runway, track fixed commitments, and optimize monthly capital allocation.",
    stat: "+$18.4K",
    statLabel: "Monthly surplus",
    tone: "blue",
  },
  "Financial Goals": {
    eyebrow: "LIFE MILESTONES",
    title: "Turn ambitions into funded realities.",
    subtitle:
      "Monitor progress toward early retirement, estate acquisitions, venture deals, and legacy trusts.",
    stat: "80%",
    statLabel: "Overall goal progress",
    tone: "gold",
  },
  "Tax Planner": {
    eyebrow: "GLOBAL TAX INTELLIGENCE",
    title: "Plan ahead of every tax event.",
    subtitle:
      "Scenario modeling for tax loss harvesting, capital gains thresholds, and deductions.",
    stat: "$18.4K",
    statLabel: "Identified savings",
    tone: "emerald",
  },
  "Retirement Planner": {
    eyebrow: "INDEPENDENCE ROADMAP",
    title: "See the future your wealth can fund.",
    subtitle:
      "Monte Carlo simulations, inflation modeling, and pension runway analytics.",
    stat: "91%",
    statLabel: "Success confidence",
    tone: "blue",
  },
  "AI Wealth Coach": {
    eyebrow: "SPHERE AI INTELLIGENCE",
    title: "Your private fiduciary intelligence partner.",
    subtitle:
      "24/7 proactive capital allocation suggestions, anomaly detection, and wealth coaching.",
    stat: "99.4%",
    statLabel: "Fiduciary alignment",
    tone: "emerald",
  },
  Documents: {
    eyebrow: "SECURE VAULT",
    title: "Every critical legal and financial document, protected.",
    subtitle:
      "Military-grade AES-256 encrypted storage, audit logs, and verified e-signing.",
    stat: "148",
    statLabel: "Protected records",
    tone: "navy",
  },
  Settings: {
    eyebrow: "SYSTEM PREFERENCES",
    title: "Security, telemetry and notification preferences.",
    subtitle:
      "Configure multi-factor authentication, API sync frequency, and notification thresholds.",
    stat: "Strict",
    statLabel: "Zero-trust security",
    tone: "violet",
  },
  "Family Members": {
    eyebrow: "FAMILY ROSTER",
    title: "Multi-generational member directory.",
    subtitle:
      "Manage roles, signatory powers, beneficiary designations, and advisory privileges.",
    stat: "5",
    statLabel: "Active family members",
    tone: "navy",
  },
  "Shared Assets": {
    eyebrow: "FAMILY BALANCE SHEET",
    title: "Consolidated multi-entity holdings.",
    subtitle:
      "Track properties, LLCs, family trust accounts, operating companies, and joint treasuries.",
    stat: "$14.2M",
    statLabel: "Total shared assets",
    tone: "emerald",
  },
  "Family Budget": {
    eyebrow: "HOUSEHOLD CASH FLOW",
    title: "Unified household inflows and operational outflows.",
    subtitle:
      "Coordinate multi-household budgets, property maintenance, and family pooling.",
    stat: "+$25.6K",
    statLabel: "Monthly family surplus",
    tone: "blue",
  },
  "Shared Goals": {
    eyebrow: "LEGACY MILESTONES",
    title: "Milestones that unite generations.",
    subtitle:
      "Track progress on family vacation estates, philanthropic endowments, and education funds.",
    stat: "88%",
    statLabel: "Average completion",
    tone: "gold",
  },
  "My Budget": {
    eyebrow: "CAMPUS CASH FLOW",
    title: "Master your student cash flow.",
    subtitle:
      "Balance tuition, housing, food, books, and social life with zero overdraft stress.",
    stat: "+$420",
    statLabel: "Monthly surplus",
    tone: "emerald",
  },
  "Savings Goals": {
    eyebrow: "STUDENT MILESTONES",
    title: "Save small, achieve big.",
    subtitle:
      "Targeted micro-funds for tech upgrades, semester abroad, and emergency buffers.",
    stat: "$5,640",
    statLabel: "Total saved",
    tone: "gold",
  },
  "Learn Finance": {
    eyebrow: "FINANCIAL LITERACY",
    title: "Interactive financial fluency.",
    subtitle:
      "Bite-sized simulations on investing, credit scores, taxes, and compound interest.",
    stat: "Level 3",
    statLabel: "Wealth Scholar",
    tone: "blue",
  },
  Courses: {
    eyebrow: "CURRICULUM",
    title: "Accredited Wealth & Capital Modules.",
    subtitle:
      "Structured learning pathways designed by chartered analysts and educators.",
    stat: "8 / 12",
    statLabel: "Modules completed",
    tone: "emerald",
  },
  Assessments: {
    eyebrow: "KNOWLEDGE EVALUATIONS",
    title: "Validate your financial mastery.",
    subtitle:
      "Real-world scenario challenges with instant AI feedback and score breakdown.",
    stat: "94%",
    statLabel: "Average score",
    tone: "gold",
  },
  Certifications: {
    eyebrow: "CREDENTIALS",
    title: "Blockchain-verified credentials.",
    subtitle:
      "Cryptographically signed micro-credentials shareable directly to LinkedIn and CV.",
    stat: "3",
    statLabel: "Earned certificates",
    tone: "violet",
  },
  "AI Finance Tutor": {
    eyebrow: "PERSONAL AI MENTOR",
    title: "Ask anything about money without judgment.",
    subtitle:
      "Context-aware tutor explaining student loans, first investments, and tax basics.",
    stat: "Instant",
    statLabel: "Response time",
    tone: "emerald",
  },
  Achievements: {
    eyebrow: "HALL OF MASTERY",
    title: "Badges and milestones unlocked.",
    subtitle:
      "Gamified milestones celebrating budgeting consistency, course mastery, and savings streaks.",
    stat: "6",
    statLabel: "Badges earned",
    tone: "gold",
  },
  Clients: {
    eyebrow: "PRACTICE CLIENT ROSTER",
    title: "Client households and entities, centralized.",
    subtitle:
      "Monitor relationship health, mandates, fiduciary disclosures, and communication history.",
    stat: "84",
    statLabel: "Total active clients",
    tone: "navy",
  },
  "Financial Plans": {
    eyebrow: "COMPREHENSIVE PLANNING",
    title: "Holistic wealth roadmaps.",
    subtitle:
      "Life goal scenario modeling, retirement forecasts, estate distribution plans, and liquidity stress tests.",
    stat: "76",
    statLabel: "Active financial plans",
    tone: "emerald",
  },
  "Client Portfolios": {
    eyebrow: "AUM & PORTFOLIO ENGINE",
    title: "Multi-custodial portfolio intelligence.",
    subtitle:
      "Track multi-asset allocations, model drift, performance attribution, and trade execution proposals.",
    stat: "$148.6M",
    statLabel: "Aggregate AUM",
    tone: "navy",
  },
  "Risk Profiles": {
    eyebrow: "FIDUCIARY RISK CONTROLS",
    title: "Reg BI & risk tolerance suitability.",
    subtitle:
      "Psychographic risk questionnaires, portfolio downside variance analysis, and Reg BI compliance logs.",
    stat: "100%",
    statLabel: "Suitability verified",
    tone: "gold",
  },
  "Goal Planning": {
    eyebrow: "MILESTONE TRACKING",
    title: "Track client aspirations in real time.",
    subtitle:
      "Education funds, legacy estates, philanthropic foundations, and retirement target tracking.",
    stat: "88%",
    statLabel: "Overall goal readiness",
    tone: "emerald",
  },
  Meetings: {
    eyebrow: "ADVISORY AGENDA",
    title: "Client consultations and review meetings.",
    subtitle:
      "Schedule, prepare tear sheets, record fiduciary meeting notes, and launch secure video rooms.",
    stat: "7",
    statLabel: "Meetings this week",
    tone: "violet",
  },
  Reports: {
    eyebrow: "CLIENT & PRACTICE REPORTING",
    title: "Institutional-grade statements & reviews.",
    subtitle:
      "Generate custom white-labeled quarterly review decks, tax summaries, and audit logs.",
    stat: "PDF/CSV",
    statLabel: "Export ready",
    tone: "blue",
  },
  "AI Planning Assistant": {
    eyebrow: "SPHERE AI CO-PILOT",
    title: "AI-driven practice intelligence.",
    subtitle:
      "Automate rebalance rationale drafting, draft client review decks, and detect allocation drift.",
    stat: "24/7",
    statLabel: "Agent readiness",
    tone: "emerald",
  },
  "Financial Records": {
    eyebrow: "STATUTORY ACCOUNTING",
    title: "Multi-entity ledgers & working papers.",
    subtitle:
      "General ledger audit trails, journal vouchers, trial balances, and supporting schedules.",
    stat: "42",
    statLabel: "Active entity ledgers",
    tone: "navy",
  },
  "Tax Filings": {
    eyebrow: "TAX COMPLIANCE COCKPIT",
    title: "Direct & indirect tax filing tracker.",
    subtitle:
      "Advance tax estimates, TDS returns, GST reconciliation, and statutory e-filing confirmations.",
    stat: "9",
    statLabel: "Upcoming filings (15d)",
    tone: "gold",
  },
  Reconciliation: {
    eyebrow: "AI RECONCILIATION ENGINE",
    title: "Automated ledger reconciliation.",
    subtitle:
      "Instant matching between bank feeds, Form 26AS, GST portal data, and general ledger accounts.",
    stat: "98.2%",
    statLabel: "Auto-match rate",
    tone: "emerald",
  },
  "Financial Statements": {
    eyebrow: "STATUTORY REPORTING",
    title: "Balance sheets & P&L statements.",
    subtitle:
      "Multi-entity financial statement consolidation, notes to accounts, and partner review sign-offs.",
    stat: "32 / 42",
    statLabel: "Certified statements",
    tone: "emerald",
  },
  "Compliance Calendar": {
    eyebrow: "STATUTORY DEADLINES",
    title: "Never miss a regulatory due date.",
    subtitle:
      "Automated countdowns for advance tax, ROC annual filings, GST returns, and tax audit reports.",
    stat: "3",
    statLabel: "Critical deadlines (7d)",
    tone: "gold",
  },
  "Tax Calculations": {
    eyebrow: "ANALYTICAL ENGINE",
    title: "Tax scenario computations & modeling.",
    subtitle:
      "Capital gains tax brackets, loss-harvesting offsets, multi-state apportionment, and foreign tax credits.",
    stat: "$2.48M",
    statLabel: "Identified savings",
    tone: "emerald",
  },
  "Filing Calendar": {
    eyebrow: "FILING DEADLINES",
    title: "Comprehensive filing calendar.",
    subtitle:
      "Federal, state, and cross-border statutory filing timeline with automated deadline tracking.",
    stat: "4",
    statLabel: "Upcoming deadlines",
    tone: "violet",
  },
  "Tax Documents": {
    eyebrow: "SECURE TAX VAULT",
    title: "Encrypted tax documentation repository.",
    subtitle:
      "W-2s, 1099s, Schedule K-1s, FBAR records, and foreign asset disclosures with 99.1% OCR extraction.",
    stat: "248",
    statLabel: "Processed records",
    tone: "navy",
  },
  Compliance: {
    eyebrow: "REGULATORY COMPLIANCE",
    title: "Cross-border & audit defense checks.",
    subtitle:
      "FATCA/CRS foreign disclosure verification, wash-sale rule audits, and PFIC test tracking.",
    stat: "8",
    statLabel: "Active compliance tasks",
    tone: "gold",
  },
  "AI Tax Assistant": {
    eyebrow: "TAX INTELLIGENCE CO-PILOT",
    title: "Expert tax intelligence at your fingertips.",
    subtitle:
      "Cross-border treaty analysis, tax-loss harvesting recommendations, and deduction optimization.",
    stat: "Instant",
    statLabel: "Analysis engine",
    tone: "emerald",
  },
  Portfolios: {
    eyebrow: "PORTFOLIO MANAGEMENT",
    title: "Institutional multi-asset strategies.",
    subtitle:
      "Monitor fund sleeves, factor sensitivity, model drift, and systematic execution mandates.",
    stat: "8",
    statLabel: "Active institutional strategies",
    tone: "navy",
  },
  "Asset Allocation": {
    eyebrow: "CAPITAL ALLOCATION",
    title: "Global multi-asset class distribution.",
    subtitle:
      "Strategic asset allocation across equities, fixed income, private equity, and real assets.",
    stat: "58% / 22%",
    statLabel: "Equity / Fixed Income ratio",
    tone: "emerald",
  },
  Equities: {
    eyebrow: "EQUITIES SLEEVE",
    title: "Global equity holdings and factors.",
    subtitle:
      "Large-cap growth, quality dividend, ESG momentum, and emerging markets equity baskets.",
    stat: "$198.8M",
    statLabel: "Equities AUM (Simulated)",
    tone: "emerald",
  },
  "Mutual Funds": {
    eyebrow: "FUND SELECTION",
    title: "Institutional mutual fund portfolios.",
    subtitle:
      "Active fund manager diligence, alpha consistency, fee compression, and manager benchmark tracking.",
    stat: "14",
    statLabel: "Approved fund vehicles",
    tone: "blue",
  },
  ETFs: {
    eyebrow: "PASSIVE & SMART BETA",
    title: "Exchange traded funds liquidity desk.",
    subtitle:
      "Low-cost core index trackers, factor smart-beta ETFs, and thematic technology baskets.",
    stat: "26",
    statLabel: "Held ETF instruments",
    tone: "navy",
  },
  Bonds: {
    eyebrow: "FIXED INCOME DESK",
    title: "Sovereign, municipal and corporate debt.",
    subtitle:
      "Yield curve positioning, duration management, credit rating distribution, and interest rate hedging.",
    stat: "$75.4M",
    statLabel: "Fixed Income AUM (Simulated)",
    tone: "violet",
  },
  "Gold and Other Assets": {
    eyebrow: "REAL ASSETS & COMMODITIES",
    title: "Macro inflation hedges & alternatives.",
    subtitle:
      "Physical allocated gold, commodities indexes, timberland, and private infrastructure funds.",
    stat: "$23.6M",
    statLabel: "Real assets holding",
    tone: "gold",
  },
  "Risk Analysis": {
    eyebrow: "INSTITUTIONAL RISK DESK",
    title: "Downside risk & parametric stress tests.",
    subtitle:
      "Historical value-at-risk (VaR), expected shortfall, macro scenario shocks, and factor correlation shifts.",
    stat: "4.1%",
    statLabel: "95% 1-Month VaR (Simulated)",
    tone: "blue",
  },
  Rebalancing: {
    eyebrow: "REBALANCE & EXECUTION",
    title: "Systematic mandate rebalance engine.",
    subtitle:
      "Automated drift detection, tax-aware trade generation, and multi-broker block order routing.",
    stat: "8",
    statLabel: "Portfolios queued",
    tone: "gold",
  },
  "Performance Reports": {
    eyebrow: "INVESTOR REPORTING",
    title: "Institutional performance attribution decks.",
    subtitle:
      "Brinson-Fachler factor attribution, Sharpe & Sortino ratios, and GIPS-compliant composite reporting.",
    stat: "PDF/CSV",
    statLabel: "Institutional export",
    tone: "emerald",
  },
  Policies: {
    eyebrow: "POLICY INVENTORY",
    title: "Active carrier contracts & protections.",
    subtitle:
      "Consolidated policy repository across life, health, disability, property, and umbrella casualty.",
    stat: "284",
    statLabel: "Active policies in force",
    tone: "navy",
  },
  "Health Insurance": {
    eyebrow: "HEALTH & DISABILITY",
    title: "Comprehensive medical and income assurance.",
    subtitle:
      "Major medical, own-occupation disability, critical illness riders, and international health coverage.",
    stat: "88",
    statLabel: "Active health contracts",
    tone: "emerald",
  },
  "Life Insurance": {
    eyebrow: "MORTALITY PROTECTION",
    title: "Term, whole life and universal structures.",
    subtitle:
      "Key-person corporate policies, irrevocable life insurance trusts (ILIT), and survivorship covers.",
    stat: "$128.0M",
    statLabel: "Life sum assured (Simulated)",
    tone: "violet",
  },
  "Vehicle Insurance": {
    eyebrow: "MOTOR & FLEET ASSURANCE",
    title: "Automobile & commercial fleet policies.",
    subtitle:
      "Comprehensive collision, exotic automobile agreed-value endorsements, and multi-vehicle fleets.",
    stat: "40",
    statLabel: "Insured vehicles",
    tone: "blue",
  },
  "Home Insurance": {
    eyebrow: "PROPERTY & ESTATE",
    title: "High-value homeowners & valuable articles.",
    subtitle:
      "Extended replacement cost, flood & wildfire endorsements, fine art riders, and private estate protection.",
    stat: "$26.3M",
    statLabel: "Insured property value",
    tone: "gold",
  },
  Claims: {
    eyebrow: "CLAIMS CONCIERGE",
    title: "Claim status and adjuster coordination.",
    subtitle:
      "Real-time carrier submission tracking, claims adjuster logs, document reconciliation, and payout approvals.",
    stat: "4",
    statLabel: "Active claims in progress",
    tone: "gold",
  },
  Renewals: {
    eyebrow: "RENEWAL TIMELINE",
    title: "Policy renewal & persistency management.",
    subtitle:
      "30-60-90 day expiration timeline, automated renewal invoicing, and premium benchmarking.",
    stat: "18",
    statLabel: "Policies due in 30d",
    tone: "gold",
  },
  "Coverage Analysis": {
    eyebrow: "PROTECTION AUDIT",
    title: "Fiduciary coverage gap diagnostics.",
    subtitle:
      "Income multiple mortality testing, liability umbrella sufficiency analysis, and multi-carrier quote comparisons.",
    stat: "28",
    statLabel: "Identified coverage gaps",
    tone: "gold",
  },
  "Coaching Sessions": {
    eyebrow: "COACHING AGENDA",
    title: "1-on-1 consultations & cohort masterminds.",
    subtitle:
      "Schedule sessions, log behavioral takeaways, manage whiteboard worksheets, and review action plans.",
    stat: "16",
    statLabel: "Sessions scheduled this week",
    tone: "violet",
  },
  "Habit Tracking": {
    eyebrow: "BEHAVIORAL HABITS",
    title: "Micro-habits for enduring wealth.",
    subtitle:
      "Daily budget checks, zero-impulse streaks, automatic savings transfers, and debt paydown consistency.",
    stat: "89.2%",
    statLabel: "Mentee adherence rate",
    tone: "emerald",
  },
  "Savings Challenges": {
    eyebrow: "GAMIFIED CHALLENGES",
    title: "Community accountability & savings sprints.",
    subtitle:
      "52-Week savings ladder, 30-day zero impulse buy, and emergency cushion blitz leaderboards.",
    stat: "5",
    statLabel: "Active cohorts",
    tone: "gold",
  },
  "Learning Resources": {
    eyebrow: "WEALTH CURRICULUM",
    title: "Behavioral finance guides & workbooks.",
    subtitle:
      "Interactive money scripts, debt avalanche calculators, couples communication templates, and goal planners.",
    stat: "42",
    statLabel: "Workbooks & tools",
    tone: "blue",
  },
  "AI Coaching Assistant": {
    eyebrow: "BEHAVIORAL AI AGENT",
    title: "Empathy-driven financial guidance.",
    subtitle:
      "Analyze spending triggers, recommend motivational nudges, and generate personalized accountability prompts.",
    stat: "Instant",
    statLabel: "Coaching suggestions",
    tone: "emerald",
  },
  "Progress Reports": {
    eyebrow: "GROWTH TELEMETRY",
    title: "Client transformation & milestone reviews.",
    subtitle:
      "Holistic wellness score trajectory, debt cleared milestones, savings accumulation curves, and habit consistency.",
    stat: "92%",
    statLabel: "Clients meeting milestones",
    tone: "emerald",
  },
  "Consolidated Wealth": {
    eyebrow: "FAMILY OFFICE BALANCE SHEET",
    title: "Multi-entity balance sheet consolidation.",
    subtitle:
      "Consolidated financial reporting across 14 legal entities, elimination of inter-company balances, and net asset valuation.",
    stat: "$84.5M",
    statLabel: "Consolidated NAV",
    tone: "navy",
  },
  Properties: {
    eyebrow: "DIRECT REAL ESTATE",
    title: "Global real estate & estate holdings.",
    subtitle:
      "Commercial office towers, alpine retreats, luxury estates, and rental cash flows with automated lease schedule tracking.",
    stat: "$26.4M",
    statLabel: "5 Direct holdings",
    tone: "blue",
  },
  "Business Holdings": {
    eyebrow: "OPERATING ENTERPRISES",
    title: "Privately held ventures & operating companies.",
    subtitle:
      "Controlling stakes, board seats, EBITDA multiples, and strategic dividend distributions across operating businesses.",
    stat: "$15.3M",
    statLabel: "Controlling equity",
    tone: "violet",
  },
  Trusts: {
    eyebrow: "FIDUCIARY STRUCTURES",
    title: "Multi-generational trust administration.",
    subtitle:
      "Dynasty trusts, GRATs, ILITs, and perpetual asset protection structures with trustee fiduciary accounting.",
    stat: "5",
    statLabel: "Active family trusts",
    tone: "gold",
  },
  "Succession Planning": {
    eyebrow: "MULTI-GENERATIONAL CONTINUITY",
    title: "Family council & governance constitution.",
    subtitle:
      "Family constitution voting, next-generation leadership preparation, and asset transfer protocols.",
    stat: "88%",
    statLabel: "Succession readiness",
    tone: "emerald",
  },
  "Wealth Portfolios": {
    eyebrow: "DISCRETIONARY WEALTH",
    title: "Ultra-HNW bespoke asset mandates.",
    subtitle:
      "Custom segregated accounts, multi-currency strategies, structured notes, and liquid alternative mandates.",
    stat: "418",
    statLabel: "Discretionary portfolios",
    tone: "navy",
  },
  "Banking Services": {
    eyebrow: "BESPOKE PRIVATE CREDIT",
    title: "Lombard credit & private banking facilities.",
    subtitle:
      "Secured credit lines, margin lending, super-yacht/aviation finance, and multi-currency foreign exchange desks.",
    stat: "$184.2M",
    statLabel: "Authorized Lombard credit",
    tone: "emerald",
  },
  "Client Requests": {
    eyebrow: "VIP EXECUTION QUEUE",
    title: "Concierge banking & transaction desk.",
    subtitle:
      "High-value wires, Lombard draws, escrow allocations, and structured note subscription authorizations.",
    stat: "14",
    statLabel: "Active execution requests",
    tone: "gold",
  },
  "Relationship Management": {
    eyebrow: "CLIENT COCKPIT",
    title: "Ultra-HNW relationship engagement.",
    subtitle:
      "Lifecycle events, banker assignments, client tiering, and confidential mandate records.",
    stat: "98.6%",
    statLabel: "Client retention rate",
    tone: "emerald",
  },
  "Investment Insights": {
    eyebrow: "CHIEF INVESTMENT OFFICE",
    title: "Macro insights & tactical asset allocation.",
    subtitle:
      "Quarterly macro outlooks, geopolitical risk reports, private market opportunities, and factor tilts.",
    stat: "6",
    statLabel: "Active research notes",
    tone: "violet",
  },
  "Risk Monitoring": {
    eyebrow: "SURVEILLANCE & CONTROLS",
    title: "Lombard margin & counterparty monitoring.",
    subtitle:
      "Real-time collateral valuation, loan-to-value stress tests, and automated margin call trigger alerts.",
    stat: "41.2%",
    statLabel: "Average division LTV",
    tone: "blue",
  },
  Employees: {
    eyebrow: "WORKFORCE PARTICIPATION",
    title: "Anonymized employee participation census.",
    subtitle:
      "Workforce enrollment, engagement rates, benefit tier adoption, and demographic wellness trends.",
    stat: "4,850",
    statLabel: "Enrolled staff",
    tone: "navy",
  },
  "Wellness Programs": {
    eyebrow: "TOTAL REWARDS INITIATIVES",
    title: "Workforce financial education tracks.",
    subtitle:
      "401(k) auto-escalation, SECURE 2.0 student loan assistance, emergency buffers, and equity compensation literacy.",
    stat: "8",
    statLabel: "Active wellness tracks",
    tone: "emerald",
  },
  "Financial Education": {
    eyebrow: "EMPLOYEE CURRICULUM",
    title: "Interactive financial fluency modules.",
    subtitle:
      "Self-paced learning paths, micro-credentials, interactive budgeting simulations, and tax planning guides.",
    stat: "82.6%",
    statLabel: "Active learning rate",
    tone: "blue",
  },
  "Learning Activities": {
    eyebrow: "ENGAGEMENT TELEMETRY",
    title: "Educational activity & completion tracker.",
    subtitle:
      "Aggregate course completions, micro-credential achievements, and anonymous learning surveys.",
    stat: "14,280",
    statLabel: "Completed lessons",
    tone: "violet",
  },
  Workshops: {
    eyebrow: "EDUCATIONAL EVENTS",
    title: "Live employee workshops & webinars.",
    subtitle:
      "Quarterly expert seminars on 401(k) matching, homebuying, student debt relief, and open enrollment.",
    stat: "12",
    statLabel: "Quarterly workshops",
    tone: "gold",
  },
  "Program Analytics": {
    eyebrow: "BENEFITS OUTCOMES & ROI",
    title: "Aggregated program outcomes analytics.",
    subtitle:
      "Year-over-year wellness score gains, emergency buffer adoption, deferral increases, and employee stress reduction.",
    stat: "91.4%",
    statLabel: "Positive outcomes rate",
    tone: "emerald",
  },
  Communications: {
    eyebrow: "WORKFORCE ENGAGEMENT",
    title: "Benefits announcements & educational campaigns.",
    subtitle:
      "Open enrollment reminders, workshop invitations, auto-escalation notices, and wellness tips broadcasts.",
    stat: "100%",
    statLabel: "Campaign delivery rate",
    tone: "blue",
  },
  Students: {
    eyebrow: "CAMPUS LEARNER ROSTER",
    title: "Enrolled campus student directory.",
    subtitle:
      "Track student enrollment, financial literacy progress, assessment completion, and micro-credential achievements across colleges.",
    stat: "14,850",
    statLabel: "Enrolled learners",
    tone: "navy",
  },
  Instructors: {
    eyebrow: "FACULTY & EDUCATORS",
    title: "Campus financial faculty & advisors.",
    subtitle:
      "Course instructors, CFP® mentors, department heads, and guest financial lecture schedules.",
    stat: "46",
    statLabel: "Active educators",
    tone: "emerald",
  },
  "Learning Programs": {
    eyebrow: "ACADEMIC CURRICULUM",
    title: "Undergraduate and graduate wealth pathways.",
    subtitle:
      "Multi-tiered learning tracks covering campus budgeting, credit health, student loan planning, and investing fundamentals.",
    stat: "28",
    statLabel: "Accredited courses",
    tone: "blue",
  },
  Events: {
    eyebrow: "CAMPUS EVENTS",
    title: "Workshops, seminars & guest speakers.",
    subtitle:
      "Live auditorium lectures, virtual career negotiation workshops, and student financial clinics.",
    stat: "8",
    statLabel: "Upcoming events",
    tone: "violet",
  },
  Analytics: {
    eyebrow: "ACADEMIC TELEMETRY",
    title: "Campus financial capability analytics.",
    subtitle:
      "Aggregated FERPA-compliant completion velocity, assessment pass rates, and demographic financial fluency trends.",
    stat: "87.4%",
    statLabel: "Average completion rate",
    tone: "emerald",
  },
  Programs: {
    eyebrow: "PUBLIC INITIATIVES",
    title: "Citizen welfare & financial programs.",
    subtitle:
      "State-level public benefit initiatives, youth savings programs, and rural financial empowerment dockets.",
    stat: "18",
    statLabel: "Active public initiatives",
    tone: "navy",
  },
  "Beneficiary Groups": {
    eyebrow: "CITIZEN BENEFICIARIES",
    title: "Demographic beneficiary cohorts.",
    subtitle:
      "Youth, agricultural smallholders, seniors, and displaced families receiving direct benefits and financial support.",
    stat: "1.85M",
    statLabel: "Direct beneficiaries",
    tone: "emerald",
  },
  "Financial Literacy": {
    eyebrow: "PUBLIC AWARENESS",
    title: "Nationwide literacy campaigns & workshops.",
    subtitle:
      "Educational outreach across public school districts, community centers, and municipal libraries.",
    stat: "12",
    statLabel: "Active public campaigns",
    tone: "blue",
  },
  "Regional Analytics": {
    eyebrow: "TERRITORIAL TELEMETRY",
    title: "District & regional welfare analytics.",
    subtitle:
      "Geographic breakdown of program completion, fund allocation efficiency, and citizen resilience indicators.",
    stat: "8",
    statLabel: "Monitored state districts",
    tone: "violet",
  },
  "Program Monitoring": {
    eyebrow: "PUBLIC OVERSIGHT",
    title: "Program milestones & disbursement tracking.",
    subtitle:
      "Milestone velocity, agency coordination, disbursement audits, and anomaly detection logs.",
    stat: "88.6%",
    statLabel: "Milestones on track",
    tone: "emerald",
  },
  "Audit Engagements": {
    eyebrow: "ASSURANCE DOCKET",
    title: "Active audit engagements & reviews.",
    subtitle:
      "AICPA SOC 2 Type II, ISO 27001, and statutory financial audits with testing timelines and partner assignments.",
    stat: "18",
    statLabel: "Active engagements",
    tone: "navy",
  },
  "Evidence Repository": {
    eyebrow: "IMMUTABLE EVIDENCE",
    title: "Cryptographically verified audit evidence.",
    subtitle:
      "Sampled bank statements, trade logs, payroll deferrals, and custodial certifications with SHA-256 seal verification.",
    stat: "14",
    statLabel: "Items awaiting verification",
    tone: "gold",
  },
  "Review Queue": {
    eyebrow: "PARTNER WORKPAPERS",
    title: "Audit workpapers awaiting sign-off.",
    subtitle:
      "Revenue cutoff testing, segregation of duties validations, and partner attestation reviews.",
    stat: "6",
    statLabel: "Workpapers queued",
    tone: "gold",
  },
  Findings: {
    eyebrow: "CONTROL EXCEPTIONS",
    title: "Audit findings & remediation tracking.",
    subtitle:
      "Low-risk exceptions, management response dockets, and corrective action milestone tracking.",
    stat: "4",
    statLabel: "Tracked findings",
    tone: "gold",
  },
  "Compliance Checks": {
    eyebrow: "FRAMEWORK COMPLIANCE",
    title: "Continuous control framework validation.",
    subtitle:
      "Automated testing across AICPA Trust Services Criteria, SOX 404, and international statutory standards.",
    stat: "98.8%",
    statLabel: "Controls verified",
    tone: "emerald",
  },
  "Audit Trail": {
    eyebrow: "IMMUTABLE LEDGER",
    title: "Cryptographic Merkle ledger audit trails.",
    subtitle:
      "Immutable write-once read-many (WORM) audit logs tracking every permission change and balance adjustment.",
    stat: "100%",
    statLabel: "Tamper-evident integrity",
    tone: "emerald",
  },
  "User Management": {
    eyebrow: "IDENTITY & ACCESS",
    title: "Global user directory and credential management.",
    subtitle:
      "Search, filter, inspect account status, enforce hardware token MFA, and manage user sessions across all 16 platform roles.",
    stat: "248.5K",
    statLabel: "Registered users",
    tone: "navy",
  },
  "Role Management": {
    eyebrow: "RBAC ENTITLEMENTS",
    title: "16 Role configuration and privilege boundaries.",
    subtitle:
      "Define granular permissions, SAML attribute mappings, and zero-trust credential verification requirements across user roles.",
    stat: "16",
    statLabel: "Platform roles",
    tone: "blue",
  },
  Organizations: {
    eyebrow: "MULTI-TENANCY",
    title: "Enterprise organizations & isolated tenants.",
    subtitle:
      "Manage dedicated customer-managed encryption keys (CMEK), isolated database partitions, and corporate tenancy policies.",
    stat: "1,420",
    statLabel: "Active organizations",
    tone: "emerald",
  },
  "Workspace Management": {
    eyebrow: "WORKSPACE ENCLAVES",
    title: "Dedicated workspaces and team environments.",
    subtitle:
      "Provision, allocate compute quotas, and audit team workspaces across enterprise, family office, and institutional tenants.",
    stat: "3,890",
    statLabel: "Active workspaces",
    tone: "violet",
  },
  Subscriptions: {
    eyebrow: "COMMERCIAL LICENSING",
    title: "Subscription tiers and ARR analytics.",
    subtitle:
      "Monitor Enterprise, Family Office, Professional, and Student tier licensing, billing cycles, and automated invoicing.",
    stat: "$4.82M",
    statLabel: "Annual recurring revenue",
    tone: "emerald",
  },
  "Access Control": {
    eyebrow: "IAM & PRIVILEGE ELEVATION",
    title: "Zero-trust access control & approval queue.",
    subtitle:
      "Review and authorize elevated privilege requests, SSO federation mappings, and temporary administrative access grants.",
    stat: "14",
    statLabel: "Pending access requests",
    tone: "gold",
  },
  "Security Logs": {
    eyebrow: "THREAT INTELLIGENCE",
    title: "WAF events & authentication security telemetry.",
    subtitle:
      "Real-time monitoring of automated WAF rate-limiting, anomalous IP blocks, failed authentication attempts, and KMS key access.",
    stat: "0",
    statLabel: "Breaches · 98 Blocks",
    tone: "gold",
  },
  "Platform Configuration": {
    eyebrow: "INFRASTRUCTURE SETTINGS",
    title: "Global platform runtime and cluster parameters.",
    subtitle:
      "Edge region routing, rate-limiting tiers, database replication policies, and disaster recovery point-in-time snapshots.",
    stat: "99.99%",
    statLabel: "Cluster availability",
    tone: "emerald",
  },
  "AI Configuration": {
    eyebrow: "AI MODEL GOVERNANCE",
    title: "Sphere AI policy engine and token guardrails.",
    subtitle:
      "Configure multi-agent model rate limits, financial advice disclaimers, human-in-the-loop approvals, and prompt guardrails.",
    stat: "10 Agents",
    statLabel: "Orchestrated policies",
    tone: "violet",
  },
  "Audit Logs": {
    eyebrow: "ROOT AUDIT TRAIL",
    title: "Immutable platform administrative audit logs.",
    subtitle:
      "Cryptographically verified SHA-256 event trail tracking root configuration modifications, role elevations, and master key rotations.",
    stat: "100%",
    statLabel: "Cryptographic hash verified",
    tone: "emerald",
  },
}

const assetItems = [
  ["Bank & cash", "$486,200", "bank"],
  ["Stocks & funds", "$1,424,600", "trending"],
  ["Property", "$1,182,000", "home"],
  ["Business equity", "$516,000", "briefcase"],
  ["Gold & alternatives", "$248,400", "sparkle"],
  ["Digital assets", "$72,730", "globe"],
]

interface PageMetadata {
  eyebrow: string
  title: string
  subtitle: string
  stat: string
  statLabel: string
  tone: string
  actions?: Array<[string, string, string]>
  assets?: Array<[string, string, string]>
}

const rolePageOverrides: Record<string, PageMetadata> = {
  "family:investments": {
    eyebrow: "MULTI-GENERATIONAL PORTFOLIO",
    title: "Consolidated Family Investment Universe",
    subtitle:
      "Unified performance, mandate compliance, and asset allocation across 5 family members, 3 generational trusts, and holding entities.",
    stat: "$12.4M",
    statLabel: "Family investable assets",
    tone: "navy",
    actions: [
      ["Rebalance Trust Allocations", "High impact · Trust mandate", "pie"],
      ["Review Next-Gen Beneficiary Portfolios", "Multi-member sync", "family"],
      ["Optimize Family Entity Tax Harvesting", "Estate shield active", "tax"],
    ],
    assets: [
      ["Morgan Revocable Living Trust", "$5,420,000", "bank"],
      ["Generational Dynastic Trust (G2/G3)", "$3,850,000", "shield"],
      ["MV Family Capital Holding LLC", "$2,100,000", "briefcase"],
      ["Alex & Elena Joint Brokerage", "$850,000", "trending"],
      ["Next-Gen Custodial 529 Portfolios", "$180,000", "book"],
    ],
  },
  "individual:investments": {
    eyebrow: "PERSONAL INVESTMENT HUB",
    title: "Personal Wealth & Market Holdings",
    subtitle:
      "Direct equity holdings, index mutual funds, high-yield cash reserves, and personal discretionary trading accounts.",
    stat: "$2.70M",
    statLabel: "Personal investable assets",
    tone: "emerald",
    actions: [
      ["Harvest $18.4K Capital Losses", "High impact · Personal offset", "tax"],
      ["Dollar-Cost Average Index Tranche", "Automated deposit", "trending"],
      ["Rebalance Tech Overweight (+3.2%)", "Risk rule alert", "alert"],
    ],
    assets: [
      ["Primary Discretionary Brokerage", "$1,424,600", "trending"],
      ["Roth & Traditional IRA Portfolios", "$580,000", "shield"],
      ["Angel Venture & Startup Notes", "$350,000", "briefcase"],
      ["Direct Treasury & Bond Holdings", "$245,400", "bank"],
      ["High-Yield Reserves & Cash Buffer", "$100,000", "wallet"],
    ],
  },
  "student:savings_goals": {
    eyebrow: "CAMPUS SAVINGS MILESTONES",
    title: "Student Savings & Financial Runway",
    subtitle:
      "Track emergency buffers, semester textbook savings, and postgraduate transition reserves.",
    stat: "$3,450",
    statLabel: "Total student savings",
    tone: "emerald",
    actions: [
      ["Deposit $25 to Emergency Fund", "Micro-saving habit", "plus"],
      ["Simulate Student Loan Payoff", "Accelerated payoff model", "trending"],
      ["Search STEM Scholarships", "3 active grant deadlines", "sparkle"],
    ],
    assets: [
      ["Campus High-Yield Savings", "$1,850", "bank"],
      ["Emergency Living Cushion", "$1,100", "shield"],
      ["Textbook & Tech Sinking Fund", "$500", "book"],
    ],
  },
  "student:budget": {
    eyebrow: "ZERO-BASED STUDENT BUDGET",
    title: "Campus Cash Flow & Allowance Tracking",
    subtitle:
      "Monitor monthly student stipend, work-study earnings, dining, dorm rent, and discretionary entertainment.",
    stat: "$1,380",
    statLabel: "Monthly campus budget",
    tone: "blue",
    actions: [
      ["Log Daily Campus Expense", "Quick receipt scan", "document"],
      ["Review Dining Plan Balance", "18 meal passes remaining", "card"],
      ["Set Weekend Spending Cap", "Guardrail active", "shield"],
    ],
    assets: [
      ["Campus Checking Account", "$640", "bank"],
      ["Work-Study Direct Deposit", "$420", "briefcase"],
      ["Campus Dining Card Balance", "$320", "card"],
    ],
  },
  "family:wealth_tree": {
    eyebrow: "3D SUCCESSION ARCHITECTURE",
    title: "Living Family Wealth & Succession Map",
    subtitle:
      "Visualize bloodline descendants, revocable trusts, holding entities, and future asset distribution paths.",
    stat: "24",
    statLabel: "Connected family entities",
    tone: "violet",
  },
  "ca:client_books": {
    eyebrow: "STATUTORY ACCOUNTING",
    title: "Client General Ledgers & Books",
    subtitle:
      "Multi-entity double-entry bookkeeping, trial balance reconciliation, and journal entry auditing.",
    stat: "42",
    statLabel: "Active corporate ledgers",
    tone: "navy",
  },
  "tax_consultant:tax_planning": {
    eyebrow: "STRATEGIC TAX ADVISORY",
    title: "Tax Scenario Modeling & Advisory",
    subtitle:
      "Multi-jurisdictional tax structuring, corporate deductions, and high-net-worth tax loss harvesting strategies.",
    stat: "$840K",
    statLabel: "Aggregate client tax savings",
    tone: "emerald",
  },
}

interface ModulePageProps {
  roleKey?: RoleConfig["key"]
  navId?: string
  navName?: string
  name?: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

function ModulePage({
  roleKey,
  navId,
  navName,
  name,
  openAI,
  onNavigate,
}: ModulePageProps) {
  const { showToast } = useToast()
  const roleConfig = roleKey ? getRoleConfig(roleKey) : getRoleConfig("individual")
  const resolvedRoleKey = roleConfig.key
  const resolvedNavId = navId || name?.toLowerCase().replace(/\s+/g, "_") || ""
  const resolvedNavName = navName || name || "Dashboard"
  const pageKey = getPageKey(resolvedRoleKey, resolvedNavId)

  const override = rolePageOverrides[pageKey]
  const baseModule = moduleInfo[resolvedNavName]

  const info: PageMetadata =
    override ||
    (baseModule
      ? {
          ...baseModule,
          eyebrow: `${roleConfig.displayName.toUpperCase()} · ${baseModule.eyebrow}`,
        }
      : {
          eyebrow: `${roleConfig.displayName.toUpperCase()} WORKSPACE`,
          title: `${resolvedNavName} Intelligence`,
          subtitle: `Specialized ${roleConfig.displayName} workspace controls, telemetry, and live analytics for ${resolvedNavName.toLowerCase()}.`,
          stat: roleConfig.relevantMetrics[0]?.value || "Active",
          statLabel: `${roleConfig.displayName} Telemetry`,
          tone: "navy",
        })

  const isPlans =
    resolvedNavId === "subscriptions" || resolvedNavName === "Subscription Plans"
  const isAcademy =
    resolvedNavId === "learning" ||
    resolvedNavId === "learn" ||
    resolvedNavId === "courses" ||
    resolvedNavId === "certifications" ||
    resolvedNavName === "Learning Academy" ||
    [
      "Courses",
      "Learn Finance",
      "Certifications",
      "Assessments",
      "Achievements",
      "Learning Resources",
    ].includes(resolvedNavName)
  const isWealthTree =
    resolvedNavId === "wealth_tree" ||
    resolvedNavName === "Family Wealth Tree"
  const isEnterprise =
    ["enterprise_console", "super_admin"].includes(resolvedNavId) ||
    ["Enterprise Console", "Super Admin", "Super Admin Console"].includes(
      resolvedNavName,
    )

  const activeActions = override?.actions || [
    [
      "Review concentration risk",
      `High impact · ${roleConfig.displayName}`,
      "alert",
    ],
    ["Approve agent recommendation", "Human approval required", "check"],
    ["Complete missing information", "Improves accuracy", "document"],
  ]

  const activeAssets =
    override?.assets ||
    (isEnterprise
      ? [
          ["KYC / AML", "99.2%", "shield"],
          ["FATCA & CRS", "Compliant", "globe"],
          ["GDPR", "Controls active", "lock"],
          ["ISO 27001", "Certified", "check"],
          ["SOC 2 Type II", "Certified", "document"],
          ["PCI DSS", "Compliant", "card"],
        ]
      : assetItems)

  return (
    <div className="module-page">
      <section className={`module-hero tone-${info.tone}`}>
        <div>
          <span className="eyebrow">{info.eyebrow}</span>
          <div className="page-title">{info.title}</div>
          <div className="page-subtitle">{info.subtitle}</div>
          <div className="hero-buttons">
            <Button onClick={openAI}>
              <Icon name="ai" /> Ask Sphere AI
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                showToast({
                  title: isPlans
                    ? "Plan Comparison"
                    : `${resolvedNavName} Scenario`,
                  message: `Simulated scenario generated for ${resolvedNavName} in ${roleConfig.displayName} workspace. Reviewing risk and allocation parameters.`,
                  tone: "info",
                })
              }}
            >
              <Icon name="plus" />{" "}
              {isPlans ? "Compare plans" : "Create scenario"}
            </Button>
          </div>
        </div>
        <div className="module-stat">
          <span>{info.statLabel}</span>
          <strong>{info.stat}</strong>
          <div className="module-mini-chart">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>
      {isPlans ? (
        <Plans />
      ) : isAcademy ? (
        <Academy />
      ) : (
        <section className="module-grid">
          <div className="card wide-card">
            <div className="card-head">
              <div>
                <span className="card-title">
                  {isEnterprise
                    ? "Operations overview"
                    : isWealthTree
                      ? "Ownership & succession map"
                      : `${resolvedNavName} Intelligence`}
                </span>
                <span className="card-sub">Live data · Updated just now</span>
              </div>
              <Badge tone="success">
                <Icon name="activity" size={13} /> Live
              </Badge>
            </div>
            {isWealthTree ? (
              <WealthTree />
            ) : (
              <div className="analysis-chart">
                <div className="analysis-bars">
                  {[48, 62, 54, 75, 68, 82, 73, 89, 84, 94, 88, 97].map(
                    (v, i) => (
                      <i key={i} style={{ height: `${v}%` }} />
                    ),
                  )}
                </div>
                <div className="chart-labels">
                  <span>Jun</span>
                  <span>Aug</span>
                  <span>Oct</span>
                  <span>Dec</span>
                  <span>Feb</span>
                  <span>Apr</span>
                </div>
              </div>
            )}
          </div>
          <div className="card action-card">
            <div className="card-head">
              <div>
                <span className="card-title">Priority actions</span>
                <span className="card-sub">Ranked by Sphere AI</span>
              </div>
              <Badge tone="info">3 NEW</Badge>
            </div>
            {activeActions.map(([t, s, i]) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  showToast({
                    title: t,
                    message: `Executing "${t}" for ${resolvedNavName} in ${roleConfig.displayName} workspace. Analyzing policy rules.`,
                    tone: i === "alert" ? "warning" : "success",
                  })
                }}
              >
                <span className="mini-icon">
                  <Icon name={i as IconName} />
                </span>
                <div>
                  <b>{t}</b>
                  <span>{s}</span>
                </div>
                <Icon name="chevron" />
              </button>
            ))}
          </div>
          <div className="card asset-list">
            <div className="card-head">
              <div>
                <span className="card-title">
                  {isEnterprise
                    ? "Compliance & controls"
                    : `${roleConfig.displayName} universe`}
                </span>
                <span className="card-sub">
                  {isEnterprise
                    ? "Global regulatory posture"
                    : "Assets & accounts monitored by this workspace"}
                </span>
              </div>
              <Button
                variant="icon"
                icon="more"
                onClick={() => {
                  showToast({
                    title: isEnterprise
                      ? "Compliance Controls"
                      : `${roleConfig.displayName} Universe`,
                    message:
                      "Continuous surveillance and automated reconciliation active.",
                    tone: "info",
                  })
                }}
              />
            </div>
            {activeAssets.map(([l, v, i]) => (
              <div
                className="list-row"
                key={l}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  showToast({
                    title: l,
                    message: `Inspecting ${l} (${v}). Telemetry feed active.`,
                    tone: "info",
                  })
                }}
              >
                <span className="mini-icon">
                  <Icon name={i as IconName} />
                </span>
                <span>{l}</span>
                <b>{v}</b>
                <Icon name="chevron" />
              </div>
            ))}
          </div>
          <div className="card agents-card">
            <div className="card-head">
              <div>
                <span className="card-title">Agent team</span>
                <span className="card-sub">
                  Specialists working on this plan
                </span>
              </div>
              <Button variant="ghost" onClick={openAI}>
                Open chat
              </Button>
            </div>
            <div className="agent-stack">
              {[
                "Financial Planner",
                "Tax",
                "Investment",
                "Insurance",
                "Estate",
                "Legal",
                "Banking",
                "Wealth Coach",
                "Family Office",
                "Rebalancing",
              ]
                .slice(0, 6)
                .map((a, i) => (
                  <div key={a}>
                    <span className={`agent-avatar a${i}`}>
                      {a.substring(0, 2).toUpperCase()}
                    </span>
                    <span>{a}</span>
                    <i className={i < 4 ? "online" : ""} />
                  </div>
                ))}
            </div>
            <div className="approval-flow">
              <span>
                <Icon name="ai" /> AI proposal
              </span>
              <Icon name="arrow" />
              <span>
                <Icon name="shield" /> Risk check
              </span>
              <Icon name="arrow" />
              <span className="current">
                <Icon name="user" /> Your approval
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function WealthTree() {
  return (
    <div className="wealth-tree">
      <div className="tree-node primary">
        <span>AM</span>
        <b>Alex Morgan</b>
        <small>Principal</small>
      </div>
      <div className="tree-line vertical" />
      <div className="tree-level">
        <div className="tree-node">
          <span>MT</span>
          <b>Morgan Trust</b>
          <small>$12.4M</small>
        </div>
        <div className="tree-node">
          <span>MF</span>
          <b>Morgan Family</b>
          <small>5 members</small>
        </div>
        <div className="tree-node">
          <span>MV</span>
          <b>MV Holdings</b>
          <small>4 entities</small>
        </div>
      </div>
    </div>
  )
}

function Academy() {
  return (
    <section className="academy-layout">
      <div className="card academy-feature">
        <Badge tone="warning">CURRENT PATH</Badge>
        <div className="feature-title">Mastering Global Wealth</div>
        <p>
          Build advanced fluency across investing, taxation, risk and legacy
          planning.
        </p>
        <div className="course-progress">
          <i>
            <em />
          </i>
          <span>8 of 12 modules</span>
          <b>68%</b>
        </div>
        <Button>
          Continue learning <Icon name="arrow" />
        </Button>
      </div>
      <div className="course-grid">
        {[
          ["Portfolio Intelligence", "Advanced · 6 modules", "pie"],
          ["Tax Strategy Essentials", "Intermediate · 8 modules", "tax"],
          ["Protecting Family Wealth", "Intermediate · 5 modules", "insurance"],
          ["Estate & Legacy Design", "Advanced · 7 modules", "family"],
        ].map(([t, s, i]) => (
          <button className="course-card" key={t}>
            <span className="course-icon">
              <Icon name={i as IconName} />
            </span>
            <b>{t}</b>
            <span>{s}</span>
            <small>
              View course <Icon name="arrow" size={14} />
            </small>
          </button>
        ))}
      </div>
      <div className="card certificate">
        <span className="cert-seal">
          <Icon name="shield" />
        </span>
        <div>
          <Badge tone="success">BLOCKCHAIN VERIFIED</Badge>
          <div className="card-title">Certified Wealth Foundations</div>
          <p>Issued 18 April 2025 · Credential WS-284-19A</p>
        </div>
        <div className="qr">
          WS
          <br />
          QR
        </div>
      </div>
    </section>
  )
}

function Plans() {
  const { showToast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState("Premium")
  const plans = [
    ["Free", "$0", "Track net worth and two goals"],
    ["Personal", "$19", "AI planning for individuals"],
    ["Family", "$39", "Shared planning for 6 members"],
    ["Professional", "$79", "Advisor and expert toolkit"],
    ["Premium", "$129", "Advanced AI and global tax"],
    ["Family Office", "Custom", "Multi-entity governance"],
    ["Enterprise", "Custom", "Bank and employer experiences"],
    ["University", "Custom", "Learning and credentials"],
  ]
  return (
    <div className="plans-grid">
      {plans.map(([name, price, desc]) => (
        <div
          className={`plan-card ${selectedPlan === name ? "featured" : ""}`}
          key={name}
        >
          {selectedPlan === name && <Badge tone="success">CURRENT PLAN</Badge>}
          <span>{name}</span>
          <strong>
            {price}
            {price.startsWith("$") && <small>/mo</small>}
          </strong>
          <p>{desc}</p>
          <div>
            <i>
              <Icon name="check" />
            </i>{" "}
            Specialized AI agents
          </div>
          <div>
            <i>
              <Icon name="check" />
            </i>{" "}
            Secure document vault
          </div>
          <div>
            <i>
              <Icon name="check" />
            </i>{" "}
            Human approval controls
          </div>
          <Button
            variant={selectedPlan === name ? "primary" : "secondary"}
            className="full"
            onClick={() => {
              setSelectedPlan(name)
              showToast({
                title: `${name} Plan`,
                message: `Active subscription switched to ${name} tier (${price}). Capabilities updated in session.`,
                tone: "success",
              })
            }}
          >
            {selectedPlan === name ? "Current plan" : "Choose plan"}
          </Button>
        </div>
      ))}
    </div>
  )
}

function AIPanel({ onClose }: { onClose: () => void }) {
  const { showToast } = useToast()
  const [message, setMessage] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [proposalApproved, setProposalApproved] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{
    sender: "ai" | "user"
    text: string
  }>>([
    {
      sender: "ai",
      text: "Good morning, Alex. I’ve reviewed your complete wealth picture. Your strongest opportunity today is a coordinated tax and portfolio action that could save approximately $18,400 while bringing risk back within your policy.",
    },
  ])

  const handleSendText = (textToSend?: string) => {
    const raw = textToSend || message
    if (!raw.trim() || isThinking) return
    const userText = raw.trim()
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }])
    setMessage("")
    setIsThinking(true)

    setTimeout(() => {
      let aiReply =
        "I have analyzed your request across all connected custodial accounts and risk policies. Scenario modeled."
      const lower = userText.toLowerCase()
      if (lower.includes("risk") || lower.includes("biggest")) {
        aiReply =
          "Concentration risk analysis: Public equities represent 38.4% of assets, with single-sector exposure to technology exceeding benchmark by 3.2%. I recommend trimming overweight positions into treasury reserves."
      } else if (lower.includes("retire") || lower.includes("55")) {
        aiReply =
          "Retirement projection: At your current savings rate of 56.8% ($18,460/mo surplus) and 7.1% portfolio return, you are projected to reach financial independence at age 51.4, safely exceeding your goal of retiring at 55."
      } else if (lower.includes("tax")) {
        aiReply =
          "Tax optimization: We identified $42,150 in harvestable capital losses and $18,400 in potential deductions across your family trusts."
      }
      setChatMessages((prev) => [...prev, { sender: "ai", text: aiReply }])
      setIsThinking(false)
    }, 500)
  }

  const handleApproveProposal = () => {
    setProposalApproved(true)
    showToast({
      title: "Proposal Approved",
      message:
        "Tax-aware portfolio rebalance ($18,400 benefit) queued for execution.",
      tone: "success",
    })
  }

  return (
    <div className="ai-panel">
      <div className="ai-panel-head">
        <span className="insight-icon">
          <Icon name="ai" />
        </span>
        <div>
          <b>Sphere AI</b>
          <span>
            <i /> 10 agents ready
          </span>
        </div>
        <Button variant="icon" onClick={onClose}>
          ×
        </Button>
      </div>
      <div className="orchestration">
        <span>ORCHESTRATION ACTIVE</span>
        <div>
          {["FP", "TX", "IN", "RS"].map((a, i) => (
            <i key={a} className={`a${i}`}>
              {a}
            </i>
          ))}
          <small>+6</small>
        </div>
      </div>
      <div className="chat">
        {chatMessages.map((m, idx) => (
          <div
            key={idx}
            className={m.sender === "ai" ? "ai-message" : "user-message"}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              background:
                m.sender === "ai" ? "var(--surface-2)" : "var(--primary-soft)",
              color: "var(--ink)",
              fontSize: "12px",
              lineHeight: 1.45,
              marginBottom: "8px",
            }}
          >
            <p style={{ margin: 0 }}>{m.text}</p>
          </div>
        ))}

        {isThinking && (
          <div
            style={{
              fontSize: "11px",
              color: "var(--primary)",
              fontStyle: "italic",
              padding: "6px 12px",
            }}
          >
            <span className="spinner-dot" /> Sphere AI orchestrating specialist
            agents...
          </div>
        )}

        <div className="agent-work">
          <span>
            <Icon name="tax" /> Tax Agent
          </span>
          <span>
            <Icon name="pie" /> Rebalancing Agent
          </span>
          <span>
            <Icon name="shield" /> Risk Engine
          </span>
        </div>
        <div className="proposal">
          <Badge tone={proposalApproved ? "success" : "warning"}>
            {proposalApproved ? "APPROVED BY PRINCIPAL" : "APPROVAL REQUIRED"}
          </Badge>
          <b>Tax-aware portfolio rebalance</b>
          <p>
            Sell two positions, harvest losses, and reinvest into equivalent
            diversified exposure.
          </p>
          <div>
            <span>
              Est. tax benefit <b>$18,400</b>
            </span>
            <span>
              Risk reduction <b>−6.2%</b>
            </span>
          </div>
          <Button
            className="full"
            variant={proposalApproved ? "secondary" : "primary"}
            onClick={handleApproveProposal}
          >
            {proposalApproved ? (
              <>
                <Icon name="check" /> Proposal Approved
              </>
            ) : (
              <>
                Review & Approve <Icon name="arrow" />
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="prompt-chips">
        <button onClick={() => handleSendText("Show my biggest risks")}>
          Biggest risks
        </button>
        <button onClick={() => handleSendText("Can I retire at 55?")}>
          Retire at 55?
        </button>
      </div>
      <div className="chat-input">
        <button
          aria-label="Voice input"
          type="button"
          onClick={() => {
            showToast({
              title: "Voice Audio Input",
              message:
                "Audio input simulated. Listening for fiduciary command...",
              tone: "info",
            })
          }}
        >
          ◎
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendText()
          }}
          placeholder="Ask anything about your wealth…"
        />
        <button
          aria-label="Send"
          type="button"
          onClick={() => handleSendText()}
        >
          <Icon name="arrow" />
        </button>
      </div>
      <div className="ai-disclaimer">
        <Icon name="shield" /> Suggestions require your approval. Your data
        remains private.
      </div>
    </div>
  )
}

type AppScreen = "landing" | "login" | "roles" | "app"

interface InitialAppState {
  screen: AppScreen
  role: string
}

function getInitialAppState(): InitialAppState {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const urlScreen = searchParams.get("screen")
    const urlRole = searchParams.get("role")

    let hashScreen: string | null = null
    let hashRole: string | null = null

    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, "")
      if (hash.includes("?")) {
        const [hashPath, hashQuery] = hash.split("?")
        const hashParams = new URLSearchParams(hashQuery)
        hashScreen = hashPath || hashParams.get("screen")
        hashRole = hashParams.get("role")
      } else if (["landing", "login", "roles", "app"].includes(hash)) {
        hashScreen = hash
      } else if (hash.startsWith("role=")) {
        hashRole = hash.replace("role=", "")
      }
    }

    const savedScreen = localStorage.getItem("wealthsphere_screen")
    const savedRole = localStorage.getItem("wealthsphere_role")

    const rawRole = urlRole || hashRole || savedRole
    const validatedRole = getRoleConfig(rawRole).displayName

    const rawScreen = urlScreen || hashScreen || savedScreen

    if ((urlRole || hashRole) && !urlScreen && !hashScreen) {
      return { screen: "app", role: validatedRole }
    }

    if (rawScreen && ["landing", "login", "roles", "app"].includes(rawScreen)) {
      return { screen: rawScreen as AppScreen, role: validatedRole }
    }

    return { screen: "landing", role: validatedRole }
  } catch {
    return { screen: "landing", role: "Individual" }
  }
}

export default function App() {
  const initial = useMemo(() => getInitialAppState(), [])
  const [screen, setScreen] = useState<AppScreen>(initial.screen)
  const [role, setRole] = useState<string>(initial.role)

  // Synchronize state with URL and localStorage
  useEffect(() => {
    try {
      const validatedRoleConfig = getRoleConfig(role)
      localStorage.setItem("wealthsphere_screen", screen)
      localStorage.setItem("wealthsphere_role", validatedRoleConfig.displayName)

      const url = new URL(window.location.href)
      if (screen === "landing") {
        url.searchParams.delete("screen")
        url.searchParams.delete("role")
        if (
          window.location.hash &&
          (window.location.hash.includes("role") ||
            window.location.hash.includes("app"))
        ) {
          url.hash = ""
        }
      } else {
        url.searchParams.set("screen", screen)
        url.searchParams.set("role", validatedRoleConfig.key)
      }

      window.history.replaceState(
        { screen, role: validatedRoleConfig.key },
        "",
        url.toString(),
      )
    } catch {
      // Graceful fallback for restricted environments
    }
  }, [screen, role])

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const state = getInitialAppState()
      setScreen(state.screen)
      setRole(state.role)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  if (screen === "landing")
    return (
      <Landing
        onStart={() => setScreen("roles")}
        onLogin={() => setScreen("login")}
      />
    )
  if (screen === "login" || screen === "roles")
    return (
      <Auth
        mode={screen}
        initialRole={role}
        onBack={() => setScreen("landing")}
        onSuccess={(r) => {
          const validated = getRoleConfig(r).displayName
          setRole(validated)
          setScreen("app")
        }}
      />
    )
  return (
    <AppShell
      currentRoleName={role}
      onRoleChange={(newRole) => {
        const validated = getRoleConfig(newRole).displayName
        setRole(validated)
      }}
      onNavigateHome={() => setScreen("landing")}
      renderModulePage={(roleKey, navId, navName, openAI, onNavigate) => {
        if (roleKey === "individual") {
          return (
            <IndividualModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "family") {
          return (
            <FamilyModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "student") {
          return (
            <StudentModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "financial_advisor") {
          return (
            <AdvisorModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "ca") {
          return (
            <CAModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "tax_consultant") {
          return (
            <TaxConsultantModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "investment_manager") {
          return (
            <InvestmentModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "insurance_advisor") {
          return (
            <InsuranceModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "wealth_coach") {
          return (
            <WealthCoachModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "family_office") {
          return (
            <FamilyOfficeModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "private_bank") {
          return (
            <PrivateBankModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "corporate_hr") {
          return (
            <CorporateHRModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "university") {
          return (
            <UniversityModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "government_organizations") {
          return (
            <GovernmentModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "auditors") {
          return (
            <AuditorModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        if (roleKey === "super_admin") {
          return (
            <SuperAdminModulePage
              navId={navId}
              navName={navName}
              openAI={openAI}
              onNavigate={onNavigate}
            />
          )
        }
        return (
          <ModulePage
            roleKey={roleKey}
            navId={navId}
            navName={navName}
            openAI={openAI}
            onNavigate={onNavigate}
          />
        )
      }}
      renderAIPanel={(onClose) => <AIPanel onClose={onClose} />}
    />
  )
}
