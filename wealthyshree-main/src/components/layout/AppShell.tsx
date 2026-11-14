import { useState, useMemo } from "react"
import type {
  RoleConfig,
  UserSession,
  RoleQuickAction,
} from "../../types/roles"
import {
  getRoleConfig,
  authorizeAction,
  getDefaultNavItem,
  findNavItem,
  isDefaultDashboard,
} from "../../config/roles"
import { ExportAuthorizationProvider } from "../../config/ExportAuthorizationContext"
import { getNotificationsForRole } from "../../config/notifications"
import { getTableConfigForRole } from "../../config/roleTableData"
import { Icon } from "../ui/Icon"
import { MetricCard } from "../ui/MetricCard"
import { QuickActions } from "../ui/QuickActions"
import { ChartCard } from "../ui/ChartCard"
import { DataTable } from "../ui/DataTable"
import { useToast } from "../ui/Toast"
import { ExportModal } from "../modals"
import { Topbar } from "./Topbar"
import { Sidebar } from "./Sidebar"
import { DashboardHeader } from "./DashboardHeader"
import { IndividualDashboard } from "../../features/dashboards/IndividualDashboard"
import { FamilyDashboard } from "../../features/dashboards/FamilyDashboard"
import { StudentDashboard } from "../../features/dashboards/StudentDashboard"
import { FinancialAdvisorDashboard } from "../../features/dashboards/FinancialAdvisorDashboard"
import { CADashboard } from "../../features/dashboards/CADashboard"
import { TaxConsultantDashboard } from "../../features/dashboards/TaxConsultantDashboard"
import { InvestmentManagerDashboard } from "../../features/dashboards/InvestmentManagerDashboard"
import { InsuranceAdvisorDashboard } from "../../features/dashboards/InsuranceAdvisorDashboard"
import { WealthCoachDashboard } from "../../features/dashboards/WealthCoachDashboard"
import { FamilyOfficeDashboard } from "../../features/dashboards/FamilyOfficeDashboard"
import { PrivateBankDashboard } from "../../features/dashboards/PrivateBankDashboard"
import { CorporateHRDashboard } from "../../features/dashboards/CorporateHRDashboard"
import { UniversityDashboard } from "../../features/dashboards/UniversityDashboard"
import { GovernmentDashboard } from "../../features/dashboards/GovernmentDashboard"
import { AuditorDashboard } from "../../features/dashboards/AuditorDashboard"
import { SuperAdminDashboard } from "../../features/dashboards/SuperAdminDashboard"

export interface AppShellProps {
  currentRoleName: string
  userName: string
  userEmail: string
  userId: string
  onRoleChange: (newRole: string) => void
  renderModulePage: (
    roleKey: RoleConfig["key"],
    navId: string,
    navName: string,
    openAI: () => void,
    onNavigate: (target: string) => void,
    userName: string,
    userEmail: string,
    userSession: UserSession,
  ) => React.ReactNode
  renderAIPanel: (onClose: () => void) => React.ReactNode
  onNavigateHome?: () => void
  onLogout: () => void
}

export function AppShell({
  currentRoleName,
  userName,
  userEmail,
  userId,
  onRoleChange,
  renderModulePage,
  renderAIPanel,
  onNavigateHome,
  onLogout,
}: AppShellProps) {
  const roleConfig: RoleConfig = useMemo(
    () => getRoleConfig(currentRoleName),
    [currentRoleName],
  )

  const defaultNavItem = useMemo(
    () => getDefaultNavItem(roleConfig),
    [roleConfig],
  )

  const [activeNavId, setActiveNavId] = useState<string>(defaultNavItem.id)
  const [dark, setDark] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const { showToast } = useToast()

  // Synchronize activeNavId when user switches roles
  const [lastRoleKey, setLastRoleKey] = useState(roleConfig.key)
  if (lastRoleKey !== roleConfig.key) {
    setLastRoleKey(roleConfig.key)
    setActiveNavId(defaultNavItem.id)
  }

  // Zero-trust user session: selecting a role view DOES NOT grant permissions
  const userSession: UserSession = useMemo(
    () => ({
      userId,
      email: userEmail,
      activeRoleKey: roleConfig.key,
      verifiedRoleKeys: [],
      grantedPermissions: [],
      isDemoMode: true,
    }),
    [roleConfig, userEmail, userId],
  )
  const isPreviewMode = !userSession.verifiedRoleKeys.includes(roleConfig.key)

  const notifications = useMemo(
    () => getNotificationsForRole(roleConfig.key),
    [roleConfig.key],
  )

  const tableConfig = useMemo(
    () => getTableConfigForRole(roleConfig.key),
    [roleConfig.key],
  )

  const currentNavItem = useMemo(
    () => findNavItem(roleConfig, activeNavId) || defaultNavItem,
    [roleConfig, activeNavId, defaultNavItem],
  )

  const isHomeTab = isDefaultDashboard(roleConfig, currentNavItem.id)
  const pageTitle = isHomeTab ? roleConfig.dashboardTitle : currentNavItem.name

  const handleNavigate = (target: string) => {
    const matched = findNavItem(roleConfig, target)
    if (matched) {
      setActiveNavId(matched.id)
    } else {
      setActiveNavId(target)
    }
  }

  const handleQuickAction = (action: RoleQuickAction) => {
    const auth = authorizeAction(userSession, action, roleConfig)
    if (!auth.allowed) {
      showToast({
        title: "Access Restricted",
        message: auth.reason || "Action requires verified role credentials.",
        tone: "warning",
      })
      return
    }

    if (action.id === "export_csv" || action.id === "export_ledger") {
      setExportModalOpen(true)
      return
    }

    showToast({
      title: action.label,
      message: `Workflow "${action.label}" activated for ${roleConfig.displayName}.`,
      tone: "success",
    })
  }

  const tableColumns = useMemo(
    () => [
      { key: "col1", header: tableConfig.headers[0] },
      { key: "col2", header: tableConfig.headers[1] },
      { key: "col3", header: tableConfig.headers[2] },
      { key: "col4", header: tableConfig.headers[3] },
      {
        key: "status",
        header: tableConfig.headers[4],
        render: (row: any) => (
          <span className={`badge badge--${row.statusTone || "neutral"}`}>
            {row.status}
          </span>
        ),
      },
    ],
    [tableConfig],
  )

  const exportPermissionByRole = {
    individual: "export:own_assets",
    family: "export:family_group",
    student: "export:student_budget",
    financial_advisor: "export:client_roster",
    ca: "export:statutory_audit",
    tax_consultant: "export:tax_returns",
    investment_manager: "export:investment_portfolios",
    insurance_advisor: "export:insurance_policies",
    wealth_coach: "export:coaching_cohorts",
    family_office: "export:family_office_entities",
    private_bank: "export:private_bank_book",
    corporate_hr: "export:workforce_wellness",
    university: "export:scholarship_disbursements",
    government_organizations: "export:public_funds",
    auditors: "export:audit_reports",
    super_admin: "export:platform_users",
  } as const
  const requiredExportPermission = exportPermissionByRole[roleConfig.key]

  return (
    <ExportAuthorizationProvider value={{ roleConfig, userSession }}>
    <div className={`app-shell ${dark ? "dark" : ""}`}>
      <Sidebar
        roleConfig={roleConfig}
        userName={userName}
        activeId={currentNavItem.id}
        onSelect={handleNavigate}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onNavigateHome={onNavigateHome}
      />

      <div className="main-shell">
        <Topbar
          roleConfig={roleConfig}
          pageTitle={pageTitle}
          dark={dark}
          onToggleDark={() => setDark(!dark)}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenAI={() => setAiOpen(true)}
          onSelectRole={onRoleChange}
          notifications={notifications}
          onNavigateHome={onNavigateHome}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />

        <main className="main-content">
          <aside className="demo-data-notice" role="note">
            {isPreviewMode && (
              <>
                <span className="badge badge--warning">PREVIEW MODE</span>{" "}
                <span>
                  {roleConfig.displayName} is not backend-verified. Privileged
                  actions require verified permissions.
                </span>
                <br />
              </>
            )}
            Demo data: organization names, role descriptions, business records,
            and financial figures are illustrative until backend integration.
          </aside>
          {isHomeTab ? (
            roleConfig.key === "individual" ? (
              <IndividualDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "family" ? (
              <FamilyDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "student" ? (
              <StudentDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "financial_advisor" ? (
              <FinancialAdvisorDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "ca" ? (
              <CADashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "tax_consultant" ? (
              <TaxConsultantDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "investment_manager" ? (
              <InvestmentManagerDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "insurance_advisor" ? (
              <InsuranceAdvisorDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "wealth_coach" ? (
              <WealthCoachDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "family_office" ? (
              <FamilyOfficeDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "private_bank" ? (
              <PrivateBankDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "corporate_hr" ? (
              <CorporateHRDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "university" ? (
              <UniversityDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "government_organizations" ? (
              <GovernmentDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "auditors" ? (
              <AuditorDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                userName={userName}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : roleConfig.key === "super_admin" ? (
              <SuperAdminDashboard
                roleConfig={roleConfig}
                userSession={userSession}
                onNavigate={handleNavigate}
                onOpenAI={() => setAiOpen(true)}
              />
            ) : (
              <div className="dashboard-content">
                {/* Dashboard Header */}
                <DashboardHeader
                  roleConfig={roleConfig}
                  userName={userName}
                  onPrimaryAction={() => {
                    const primary =
                      roleConfig.quickActions.find((a) => a.primary) ||
                      roleConfig.quickActions[0]
                    if (primary) handleQuickAction(primary)
                  }}
                />

                {/* Metric Cards Grid */}
                <section
                  className="metric-grid"
                  aria-label="Key Performance Indicators"
                >
                  {roleConfig.relevantMetrics.map((metric) => (
                    <MetricCard
                      key={metric.id}
                      label={metric.label}
                      value={metric.value}
                      detail={metric.detail}
                      icon={metric.icon}
                      tone={metric.tone}
                      trend={metric.trend || "up"}
                    />
                  ))}
                </section>

                {/* Quick Actions Component */}
                <QuickActions
                  actions={roleConfig.quickActions}
                  roleConfig={roleConfig}
                  userSession={userSession}
                  onExecuteAction={handleQuickAction}
                />

                {/* Dashboard Charts & Widgets Grid */}
                <section className="dashboard-grid">
                  <ChartCard
                    title={`${roleConfig.displayName} Intelligence & Performance`}
                    subtitle="Live trends across all monitored assets, mandates & accounts"
                    value={roleConfig.relevantMetrics[0]?.value || "$4.29M"}
                    badge={{ label: "+7.1% YTD", tone: "success" }}
                    legends={[
                      {
                        label: "Equities",
                        value: "$1.42M",
                        color: "emerald",
                        pct: "33%",
                      },
                      {
                        label: "Real Estate",
                        value: "$1.18M",
                        color: "navy",
                        pct: "28%",
                      },
                      {
                        label: "Fixed Income",
                        value: "$684K",
                        color: "violet",
                        pct: "16%",
                      },
                      {
                        label: "Reserves",
                        value: "$486K",
                        color: "gray",
                        pct: "11%",
                      },
                    ]}
                  />

                  <div className="card score-card">
                    <div className="card-head">
                      <div>
                        <span className="card-title">
                          Fiduciary & Health Index
                        </span>
                        <span className="card-sub">
                          Powered by Sphere AI Engine
                        </span>
                      </div>
                      <button
                        type="button"
                        className="button button--icon"
                        onClick={() => handleNavigate("financial_health")}
                        aria-label="View financial health"
                      >
                        <Icon name="chevron" size={16} />
                      </button>
                    </div>

                    <div className="score-ring">
                      <svg viewBox="0 0 180 100">
                        <path
                          className="ring-bg"
                          d="M20 90a70 70 0 0 1 140 0"
                        />
                        <path
                          className="ring-value"
                          d="M20 90a70 70 0 0 1 140 0"
                        />
                      </svg>
                      <div>
                        <strong>824</strong>
                        <span>out of 1000</span>
                      </div>
                    </div>

                    <div className="score-grade">
                      <span className="badge badge--success">OPTIMAL</span>
                      <span>↑ 18 pts this evaluation period</span>
                    </div>

                    <div className="score-bars">
                      {[
                        ["Liquidity & Cash Flow", "92%"],
                        ["Risk & Protection", "78%"],
                        ["Yield & Growth", "86%"],
                        ["Compliance Readiness", "94%"],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <span>
                            {label}
                            <b>{val}</b>
                          </span>
                          <i>
                            <em style={{ width: val }} />
                          </i>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card allocation-card">
                    <div className="card-head">
                      <div>
                        <span className="card-title">Asset allocation</span>
                        <span className="card-sub">
                          Across your global portfolio
                        </span>
                      </div>
                      <button
                        type="button"
                        className="button button--icon"
                        aria-label="Allocation details"
                      >
                        <Icon name="more" size={16} />
                      </button>
                    </div>
                    <div className="allocation-body">
                      <div className="donut">
                        <div>
                          <strong>
                            {roleConfig.relevantMetrics[0]?.value || "$4.29M"}
                          </strong>
                          <span>Total sphere</span>
                        </div>
                      </div>
                      <div className="legend">
                        {[
                          {
                            label: "Equities",
                            value: "$1.42M",
                            pct: "33.2%",
                            color: "emerald",
                          },
                          {
                            label: "Real Estate",
                            value: "$1.18M",
                            pct: "27.6%",
                            color: "navy",
                          },
                          {
                            label: "Fixed Income",
                            value: "$684K",
                            pct: "16.0%",
                            color: "violet",
                          },
                          {
                            label: "Business Equity",
                            value: "$516K",
                            pct: "12.0%",
                            color: "gold",
                          },
                          {
                            label: "Reserves & Cash",
                            value: "$486K",
                            pct: "11.2%",
                            color: "gray",
                          },
                        ].map((a) => (
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
                        <Icon name="ai" size={18} />
                      </span>
                      <div>
                        <span className="card-title">
                          Sphere AI recommendations
                        </span>
                        <span className="card-sub">
                          3 prioritized actions for {roleConfig.displayName}
                        </span>
                      </div>
                      <span className="badge badge--info">AI Co-Pilot</span>
                    </div>
                    <div className="recommendations">
                      <button
                        type="button"
                        onClick={() => handleNavigate("tax_planning")}
                      >
                        <span className="rec-icon green">
                          <Icon name="tax" size={16} />
                        </span>
                        <div>
                          <b>Optimize 2025 tax position</b>
                          <span>
                            Harvesting losses in two holdings could offset
                            $18,400 in gains.
                          </span>
                          <small>Tax Agent · High impact</small>
                        </div>
                        <Icon name="chevron" size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate("insurance")}
                      >
                        <span className="rec-icon orange">
                          <Icon name="insurance" size={16} />
                        </span>
                        <div>
                          <b>Review liability & protection gap</b>
                          <span>
                            Coverage is 32% below recommended fiduciary
                            multiple.
                          </span>
                          <small>Insurance Agent · Review needed</small>
                        </div>
                        <Icon name="chevron" size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate("portfolio")}
                      >
                        <span className="rec-icon purple">
                          <Icon name="pie" size={16} />
                        </span>
                        <div>
                          <b>Rebalance asset drift</b>
                          <span>
                            Allocation drifted 4.2% from agreed mandate.
                          </span>
                          <small>Portfolio Agent · Approval required</small>
                        </div>
                        <Icon name="chevron" size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="button button--secondary full"
                      onClick={() => setAiOpen(true)}
                    >
                      <span>View all specialist recommendations</span>
                      <Icon name="arrow" size={14} />
                    </button>
                  </div>
                </section>

                {/* Role-Specific Data Table */}
                <section className="dashboard-table-section">
                  <DataTable
                    title={tableConfig.title}
                    subtitle={tableConfig.subtitle}
                    columns={tableColumns}
                    data={tableConfig.rows}
                    searchPlaceholder={`Filter ${tableConfig.title.toLowerCase()}…`}
                    actionButton={{
                      label: "Export CSV",
                      icon: "document",
                      onClick: () => setExportModalOpen(true),
                      requiredPermission: requiredExportPermission,
                      requiredActiveRole:
                        roleConfig.key === "super_admin"
                          ? "super_admin"
                          : undefined,
                      disabledMessage:
                        roleConfig.key === "super_admin"
                          ? "This action requires verified permissions."
                          : undefined,
                    }}
                  />
                </section>
              </div>
            )
          ) : (
            renderModulePage(
              roleConfig.key,
              currentNavItem.id,
              currentNavItem.name,
              () => setAiOpen(true),
              handleNavigate,
              userName,
              userEmail,
              userSession,
            )
          )}
        </main>

        {/* Mobile Navigation */}
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          {roleConfig.navigationMenu[0]?.items.slice(0, 4).map((i) => (
            <button
              key={i.id}
              type="button"
              className={currentNavItem.id === i.id ? "active" : ""}
              onClick={() => handleNavigate(i.id)}
            >
              <Icon name={i.icon} size={16} />
              <span>{i.name.replace("Wealth ", "")}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="More navigation items"
          >
            <Icon name="menu" size={16} />
            <span>More</span>
          </button>
        </nav>
      </div>

      {aiOpen && (
        <>
          <div
            className="scrim"
            onClick={() => setAiOpen(false)}
            aria-hidden="true"
          />
          {renderAIPanel(() => setAiOpen(false))}
        </>
      )}

      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title={tableConfig.title}
        headers={tableConfig.headers}
        data={tableConfig.rows.map((r: any) => [
          r.col1 || "",
          r.col2 || "",
          r.col3 || "",
          r.col4 || "",
          r.status || "",
        ])}
        defaultFilename={`${roleConfig.key}_table_export`}
        requiredPermission={requiredExportPermission}
        requiredActiveRole={
          roleConfig.key === "super_admin" ? "super_admin" : undefined
        }
        authorizationRequiredForAllFormats={roleConfig.key === "super_admin"}
        authorizationDeniedMessage={
          roleConfig.key === "super_admin"
            ? "This action requires verified permissions."
            : undefined
        }
      />
    </div>
    </ExportAuthorizationProvider>
  )
}

export default AppShell
