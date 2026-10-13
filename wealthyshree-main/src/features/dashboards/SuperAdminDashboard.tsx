import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals/ExportModal"

export interface SuperAdminDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function SuperAdminDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: SuperAdminDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] =
    useState<"roles" | "organizations" | "accessRequests" | "securityLogs">(
      "roles",
    )
  const [userFilter, setUserFilter] =
    useState<"all" | "admin" | "pro" | "flagged">("all")
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false)
  const [showExportModal, setShowExportModal] = useState<boolean>(false)
  const [pendingActionTitle, setPendingActionTitle] = useState<string>("")

  const triggerProtectedAction = (actionName: string) => {
    setPendingActionTitle(actionName)
    setShowSecurityModal(true)
  }

  // 16 Role Distribution mock data
  const roleDistribution = [
    {
      category: "Personal (3 Roles)",
      roles: "Individual (124.5K), Family (42.1K), Student (38.2K)",
      userCount: "204,800 Users",
      pct: 82.4,
      color: "var(--primary)",
    },
    {
      category: "Professional (6 Roles)",
      roles:
        "Financial Advisor (8.2K), CA (4.1K), Tax Consultant (3.8K), Investment Mgr (2.4K), Insurance (3.1K), Wealth Coach (1.8K)",
      userCount: "23,400 Users",
      pct: 9.4,
      color: "#0ea5e9",
    },
    {
      category: "Institutional (4 Roles)",
      roles:
        "Family Office (620), Private Bank (480), Corporate HR (2,100), University (340)",
      userCount: "3,540 Users",
      pct: 1.4,
      color: "#8b5cf6",
    },
    {
      category: "Governance & Audit (3 Roles)",
      roles: "Government Orgs (180), Auditors (420), Super Admin (18)",
      userCount: "618 Users",
      pct: 0.2,
      color: "#f59e0b",
    },
  ]

  // Microservice Health status mock data
  const microserviceHealth = [
    {
      id: "srv1",
      name: "Auth & SAML 2.0 Enclave",
      uptime: "99.99%",
      latency: "14ms",
      status: "Operational",
      statusTone: "success",
    },
    {
      id: "srv2",
      name: "Ledger & Reconciliation Core",
      uptime: "100.0%",
      latency: "24ms",
      status: "Operational",
      statusTone: "success",
    },
    {
      id: "srv3",
      name: "Sphere AI Policy & Agent Gateway",
      uptime: "99.98%",
      latency: "84ms",
      status: "Operational",
      statusTone: "success",
    },
    {
      id: "srv4",
      name: "Real-Time Market Telemetry Bus",
      uptime: "99.99%",
      latency: "18ms",
      status: "Operational",
      statusTone: "success",
    },
    {
      id: "srv5",
      name: "Document Vault & CMEK HSM",
      uptime: "100.0%",
      latency: "22ms",
      status: "Guarded",
      statusTone: "success",
    },
    {
      id: "srv6",
      name: "WebSocket Push Event Pipeline",
      uptime: "99.99%",
      latency: "8ms",
      status: "Operational",
      statusTone: "success",
    },
  ]

  // Organizations & Tenancy mock data
  const organizationsList = [
    {
      id: "org1",
      name: "Pendelton Family Office",
      tier: "Family Office Dedicated",
      workspaces: "14 Workspaces",
      cmekId: "kms-del-0824-dy",
      status: "Active & Isolated",
      statusTone: "success",
    },
    {
      id: "srv_org2",
      name: "Banque Privée Sphere",
      tier: "Enterprise Financial",
      workspaces: "48 Workspaces",
      cmekId: "kms-che-1984-pb",
      status: "Active & Isolated",
      statusTone: "success",
    },
    {
      id: "org3",
      name: "Sterling Private Advisory LLC",
      tier: "Professional Advisory",
      workspaces: "8 Workspaces",
      cmekId: "kms-adv-3420-st",
      status: "Active",
      statusTone: "success",
    },
    {
      id: "org4",
      name: "Enterprise Total Rewards Corp",
      tier: "Enterprise Corporate",
      workspaces: "12 Workspaces",
      cmekId: "kms-ent-9120-tr",
      status: "Active",
      statusTone: "success",
    },
    {
      id: "org5",
      name: "St. Jude University System",
      tier: "Higher Ed Consortium",
      workspaces: "6 Workspaces",
      cmekId: "kms-edu-4210-sj",
      status: "Active",
      statusTone: "success",
    },
  ]

  // Pending Access Requests mock data
  const accessRequests = [
    {
      id: "req1",
      user: "marcus.sterling@wealthsphere.ai",
      requestedRole: "Financial Advisor (Lead)",
      organization: "Sterling Private Advisory",
      reason: "Quarterly portfolio drift batch authorization rights",
      urgency: "High Priority",
      status: "Approval Queued",
      statusTone: "warning",
    },
    {
      id: "req2",
      user: "karen.mitchell@wealthsphere.ai",
      requestedRole: "Corporate HR (Enterprise)",
      organization: "Enterprise Total Rewards Corp",
      reason: "Open enrollment 401(k) auto-escalation broadcast key",
      urgency: "Standard",
      status: "Security Verified",
      statusTone: "info",
    },
    {
      id: "req3",
      user: "teresa.bradley@wealthsphere.ai",
      requestedRole: "Auditor (Lead Partner)",
      organization: "Independent Audit Assurance Desk",
      reason: "Cryptographic hash audit trail verification export",
      urgency: "Standard",
      status: "MFA Completed",
      statusTone: "success",
    },
  ]

  // Security & Authentication Logs mock data
  const securityLogs = [
    {
      id: "sec1",
      timestamp: "Today · 11:42:18 UTC",
      actor: "system.waf.shield",
      event: "DDoS Mitigation Rate-Limit Triggered (IP: 198.51.100.24)",
      severity: "Automated Block",
      status: "Blocked (429)",
      statusTone: "success",
    },
    {
      id: "sec2",
      timestamp: "Today · 10:15:02 UTC",
      actor: "alex.morgan@wealthsphere.ai",
      event: "Zero-Trust Session Role Switch: super_admin (Read-Only Mode)",
      severity: "Audited Action",
      status: "Enforced Read-Only",
      statusTone: "info",
    },
    {
      id: "sec3",
      timestamp: "Today · 09:22:45 UTC",
      actor: "kms.vault.service",
      event: "Quarterly Key Attestation Check: All 1,420 CMEK Keys Intact",
      severity: "Cryptographic Audit",
      status: "Verified (Clean)",
      statusTone: "success",
    },
    {
      id: "sec4",
      timestamp: "Yesterday · 23:58:11 UTC",
      actor: "auth.saml.gateway",
      event: "Enterprise SSO SAML 2.0 Token Refresh (Tenant #42)",
      severity: "Authentication",
      status: "Authorized",
      statusTone: "success",
    },
  ]

  // User Management Directory mock data
  const usersDirectory = [
    {
      id: "usr1",
      name: "Security Operations Admin",
      email: "root.secops@wealthsphere.ai",
      role: "Super Admin",
      roleCategory: "Governance",
      organization: "WealthSphere Root Enclave",
      accountStatus: "Active · Hardware Token MFA",
      lastActive: "Active Now",
      statusTone: "success",
    },
    {
      id: "usr2",
      name: "Alex Morgan",
      email: "alex.morgan@wealthsphere.ai",
      role: "Individual / Personal",
      roleCategory: "Personal",
      organization: "Morgan Family Household",
      accountStatus: "Active · MFA Enforced",
      lastActive: "2 mins ago",
      statusTone: "success",
    },
    {
      id: "usr3",
      name: "Marcus Sterling, CFP®",
      email: "marcus.sterling@wealthsphere.ai",
      role: "Financial Advisor",
      roleCategory: "Professional",
      organization: "Sterling Private Advisory",
      accountStatus: "Active · Reg BI Verified",
      lastActive: "14 mins ago",
      statusTone: "success",
    },
    {
      id: "usr4",
      name: "Arthur Pendelton",
      email: "arthur.pendelton@familyoffice.ai",
      role: "Family Office",
      roleCategory: "Institutional",
      organization: "Pendelton Family Office",
      accountStatus: "Active · CMEK Encrypted",
      lastActive: "1 hour ago",
      statusTone: "success",
    },
    {
      id: "usr5",
      name: "Teresa Bradley, CIA",
      email: "teresa.bradley@auditassurance.com",
      role: "Auditors",
      roleCategory: "Governance",
      organization: "Independent Audit Assurance",
      accountStatus: "Active · Certified Auditor",
      lastActive: "3 hours ago",
      statusTone: "success",
    },
    {
      id: "usr6",
      name: "Suspended Test Account #91",
      email: "suspicious.login@external-mail.org",
      role: "Individual",
      roleCategory: "Personal",
      organization: "Unverified Sandbox",
      accountStatus: "Suspended (Anomalous IP)",
      lastActive: "3 days ago",
      statusTone: "warning",
    },
  ]

  // Filter users directory
  const filteredUsers = useMemo(() => {
    if (userFilter === "admin")
      return usersDirectory.filter((u) => u.role === "Super Admin")
    if (userFilter === "pro")
      return usersDirectory.filter((u) => u.roleCategory === "Professional")
    if (userFilter === "flagged")
      return usersDirectory.filter((u) => u.accountStatus.includes("Suspended"))
    return usersDirectory
  }, [userFilter])

  const userColumns = [
    {
      key: "name",
      header: "User Identity & Account",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
            {row.email}
          </small>
        </div>
      ),
    },
    {
      key: "role",
      header: "Assigned Role & Tier",
      render: (row: any) => (
        <div>
          <span className="badge badge--navy">{row.role}</span>
          <small
            style={{
              display: "block",
              color: "var(--muted)",
              fontSize: "10px",
              marginTop: "2px",
            }}
          >
            Category: {row.roleCategory}
          </small>
        </div>
      ),
    },
    {
      key: "organization",
      header: "Organization / Tenant",
      render: (row: any) => (
        <span
          style={{ fontSize: "12px", color: "var(--ink)", fontWeight: 500 }}
        >
          {row.organization}
        </span>
      ),
    },
    {
      key: "accountStatus",
      header: "Security & Account Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>
          {row.accountStatus}
        </span>
      ),
    },
    {
      key: "lastActive",
      header: "Last Session",
      render: (row: any) => (
        <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
          {row.lastActive}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <button
          type="button"
          className="button button--sm button--secondary"
          onClick={() =>
            triggerProtectedAction(`Manage User Permissions: ${row.name}`)
          }
        >
          Manage
        </button>
      ),
    },
  ]

  return (
    <div className="role-dashboard super-admin-dashboard">
      {/* 1. Hero Header & Root Infrastructure Authority Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--navy">
              WEALTHSPHERE ROOT ADMINISTRATION & GOVERNANCE
            </span>
            <span>
              248,500 Users · 1,420 Organizations · 99.99% Cluster Uptime
            </span>
          </div>
          <h1 className="hero-title">Security Operations Admin</h1>
          <p className="hero-subtitle">
            Global Principal System Architect · WealthSphere Root Console.
            Multi-tenant user registry, role entitlements, organization
            workspaces, subscription billing, AI safety guardrails, and
            real-time security telemetry.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() =>
              triggerProtectedAction("Provision Enterprise Organization")
            }
          >
            <Icon name="plus" size={16} />
            <span>Provision Org</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() =>
              triggerProtectedAction("Root Cryptographic MFA Verification")
            }
          >
            <Icon name="lock" size={16} />
            <span>Root MFA Check</span>
          </button>
        </div>
      </section>

      {/* 2. Zero-Trust Administrative Security Shield Notice (Mandatory Guard) */}
      <section
        style={{
          marginTop: "16px",
          padding: "14px 18px",
          background:
            "linear-gradient(135deg, rgba(12, 53, 44, 0.12) 0%, rgba(20, 112, 84, 0.06) 100%)",
          border: "1px solid rgba(20, 112, 84, 0.3)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
        }}
      >
        <div
          style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }}
        >
          <Icon name="shield" size={22} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <strong style={{ color: "var(--primary-dark)", fontSize: "13px" }}>
              Zero-Trust Administration Active: Observability Mode Enforced
            </strong>
            <span className="badge badge--warning" style={{ fontSize: "9px" }}>
              ZERO-TRUST RBAC ENFORCED
            </span>
          </div>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "11.5px",
              color: "var(--ink-secondary)",
              lineHeight: 1.5,
            }}
          >
            Selecting the Super Admin role from the client switcher operates in
            safe, read-only observability mode. In accordance with zero-trust
            security policies, administrative privileges (such as revoking user
            credentials, rotating master KMS keys, or elevating role
            permissions) are strictly protected and require secondary hardware
            token MFA authentication.
          </p>
        </div>
      </section>

      {/* 3. Seven Core Super Admin Metric Cards */}
      <section
        className="metric-grid"
        aria-label="Super Admin Platform Metrics"
        style={{ marginTop: "20px" }}
      >
        {roleConfig.relevantMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
            icon={metric.icon}
            tone={metric.tone}
            trend="up"
          />
        ))}
      </section>

      {/* 4. Quick Actions Component */}
      <QuickActions
        actions={roleConfig.quickActions}
        roleConfig={roleConfig}
        onExecuteAction={(act) => {
          if (act.id === "provision_tenant") {
            triggerProtectedAction("Provision New Enterprise Organization")
          } else if (act.id === "review_access_reqs") {
            setActiveTab("accessRequests")
          } else if (act.id === "adjust_ai_limits") {
            triggerProtectedAction("Configure AI Safety & Token Guardrails")
          } else if (act.id === "rotate_keys") {
            triggerProtectedAction("Rotate Platform Master KMS Keys")
          } else {
            onOpenAI()
          }
        }}
      />

      {/* 5. User Role Distribution Matrix & Microservice Health Status */}
      <section className="dashboard-grid">
        {/* Card 1: 16 User Role Distribution Matrix */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">16 Role Platform Distribution</span>
              <span className="card-sub">
                Total Users: 248,500 across Personal, Professional,
                Institutional & Governance
              </span>
            </div>
            <span className="badge badge--success">184.2K (74.1%) Active</span>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Active Category Breakdown
              </span>
              <strong
                style={{ font: "700 18px 'Manrope'", color: "var(--ink)" }}
              >
                248,500 Registered
              </strong>
            </div>

            {/* Visual Multi-segment Bar */}
            <div
              style={{
                height: "14px",
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                background: "var(--surface-3)",
              }}
            >
              <div
                style={{ width: "82.4%", background: "var(--primary)" }}
                title="Personal (82.4%)"
              />
              <div
                style={{ width: "9.4%", background: "#0ea5e9" }}
                title="Professional (9.4%)"
              />
              <div
                style={{ width: "7.0%", background: "#8b5cf6" }}
                title="Institutional & Governance (8.2%)"
              />
              <div
                style={{ width: "1.2%", background: "#f59e0b" }}
                title="Governance (0.2%)"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {roleDistribution.map((group) => (
                <div
                  key={group.category}
                  style={{
                    padding: "10px 12px",
                    background: "var(--surface-2)",
                    borderRadius: "8px",
                    borderLeft: `3px solid ${group.color}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <b
                      style={{
                        color: "var(--ink)",
                        fontSize: "12.5px",
                        display: "block",
                      }}
                    >
                      {group.category}
                    </b>
                    <small
                      style={{ color: "var(--muted)", fontSize: "10.5px" }}
                    >
                      {group.roles}
                    </small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong
                      style={{
                        color: "var(--primary-dark)",
                        fontSize: "12.5px",
                      }}
                    >
                      {group.userCount}
                    </strong>
                    <small
                      style={{
                        display: "block",
                        color: "var(--muted)",
                        fontSize: "10px",
                      }}
                    >
                      {group.pct}% of total
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Microservice Cluster Health Indicators */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Cluster Service Health Indicators
              </span>
              <span className="card-sub">
                18 Global Microservices · 12 Edge Regions (US, EU, AP)
              </span>
            </div>
            <span className="badge badge--success">99.99% Operational</span>
          </div>

          <div
            style={{
              marginTop: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {microserviceHealth.map((srv) => (
              <div
                key={srv.id}
                style={{
                  padding: "10px 12px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10b981",
                      display: "inline-block",
                      boxShadow: "0 0 6px #10b981",
                    }}
                  />
                  <div>
                    <b
                      style={{
                        color: "var(--ink)",
                        fontSize: "12.5px",
                        display: "block",
                      }}
                    >
                      {srv.name}
                    </b>
                    <small
                      style={{ color: "var(--muted)", fontSize: "10.5px" }}
                    >
                      P99 Latency: {srv.latency} · Uptime: {srv.uptime}
                    </small>
                  </div>
                </div>
                <span
                  className={`badge badge--${srv.statusTone}`}
                  style={{ fontSize: "10px" }}
                >
                  {srv.status}
                </span>
              </div>
            ))}

            <div
              style={{
                marginTop: "6px",
                padding: "10px",
                background: "var(--surface)",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "11px",
              }}
            >
              <span style={{ color: "var(--muted)" }}>
                Global Multi-Region Edge Replication:
              </span>
              <span style={{ fontWeight: 600, color: "var(--primary-dark)" }}>
                US-East (38ms) · EU-Central (42ms) · AP-East (46ms)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tabbed Card: Roles Matrix, Organizations, Access Requests, Security Logs */}
      <section className="card" style={{ marginTop: "24px", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "14px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                font: "600 16px 'Manrope'",
                color: "var(--ink)",
              }}
            >
              Enterprise Administration & Governance Engine
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
              Manage multi-tenant organizations, role entitlements, access
              approvals, and audit logs
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "roles" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setActiveTab("roles")}
            >
              <Icon name="shield" size={14} />
              <span>Roles (16)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "organizations"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("organizations")}
            >
              <Icon name="globe" size={14} />
              <span>Organizations (1,420)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "accessRequests"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("accessRequests")}
            >
              <Icon name="alert" size={14} />
              <span>Access Requests (14)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "securityLogs"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("securityLogs")}
            >
              <Icon name="lock" size={14} />
              <span>Security Logs</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Roles Matrix */}
        {activeTab === "roles" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {[
              [
                "Individual",
                "Personal",
                "Read/Write own wealth",
                "124,500 Users",
                "success",
              ],
              [
                "Family",
                "Personal",
                "Family group read/write",
                "42,100 Users",
                "success",
              ],
              [
                "Student",
                "Personal",
                "Campus budget & modules",
                "38,200 Users",
                "success",
              ],
              [
                "Financial Advisor",
                "Professional",
                "Client portfolios, proposals",
                "8,200 Users",
                "info",
              ],
              [
                "CA",
                "Professional",
                "Statutory accounts & filing",
                "4,100 Users",
                "info",
              ],
              [
                "Tax Consultant",
                "Professional",
                "Tax returns & schedules",
                "3,800 Users",
                "info",
              ],
              [
                "Investment Manager",
                "Professional",
                "Block trade execution & AUM",
                "2,400 Users",
                "info",
              ],
              [
                "Insurance Advisor",
                "Professional",
                "Quotes, policies & claims",
                "3,100 Users",
                "info",
              ],
              [
                "Wealth Coach",
                "Professional",
                "Coaching cohorts & habits",
                "1,800 Users",
                "info",
              ],
              [
                "Family Office",
                "Institutional",
                "Multi-entity consolidation",
                "620 Users",
                "warning",
              ],
              [
                "Private Bank",
                "Institutional",
                "Lombard credit & UHNW",
                "480 Users",
                "warning",
              ],
              [
                "Corporate HR",
                "Institutional",
                "Aggregated workforce wellness",
                "2,100 Users",
                "info",
              ],
              [
                "University",
                "Institutional",
                "Academic literacy & grants",
                "340 Users",
                "info",
              ],
              [
                "Government Orgs",
                "Governance",
                "Public welfare & regional",
                "180 Users",
                "warning",
              ],
              [
                "Auditors",
                "Governance",
                "Immutable audit trail & SoD",
                "420 Users",
                "warning",
              ],
              [
                "Super Admin",
                "Governance",
                "Root platform management",
                "18 Users",
                "danger",
              ],
            ].map(([name, cat, perm, count, tone]) => (
              <div
                key={name}
                style={{
                  padding: "12px 14px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <b
                    style={{
                      color: "var(--ink)",
                      fontSize: "13px",
                      display: "block",
                    }}
                  >
                    {name}
                  </b>
                  <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
                    {cat} · {perm}
                  </small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    className={`badge badge--${tone}`}
                    style={{ fontSize: "9.5px" }}
                  >
                    {count}
                  </span>
                  <button
                    type="button"
                    style={{
                      display: "block",
                      marginTop: "4px",
                      background: "none",
                      border: "none",
                      color: "var(--primary-dark)",
                      fontSize: "10.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() =>
                      triggerProtectedAction(
                        `Configure Entitlements for Role: ${name}`,
                      )
                    }
                  >
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Organizations */}
        {activeTab === "organizations" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {organizationsList.map((org) => (
              <div
                key={org.id}
                style={{
                  padding: "16px",
                  background: "var(--surface-2)",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <b style={{ color: "var(--ink)", fontSize: "13.5px" }}>
                      {org.name}
                    </b>
                    <span className={`badge badge--${org.statusTone}`}>
                      {org.status}
                    </span>
                  </div>

                  <small
                    style={{
                      display: "block",
                      color: "var(--muted)",
                      fontSize: "11px",
                      margin: "4px 0 10px",
                    }}
                  >
                    Plan: {org.tier} · {org.workspaces}
                  </small>

                  <div
                    style={{
                      padding: "8px 10px",
                      background: "var(--surface)",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10.5px",
                        color: "var(--muted)",
                        display: "block",
                      }}
                    >
                      Isolated Customer-Managed Encryption Key (CMEK)
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px monospace",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {org.cmekId}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: "10px",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "11px",
                    color: "var(--muted)",
                  }}
                >
                  <span>Encrypted Enclave Active</span>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    onClick={() =>
                      triggerProtectedAction(
                        `Inspect Tenancy Enclave: ${org.name}`,
                      )
                    }
                  >
                    Manage Tenancy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Access Requests */}
        {activeTab === "accessRequests" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {accessRequests.map((req) => (
              <div
                key={req.id}
                style={{
                  padding: "16px",
                  background: "var(--surface-2)",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <b
                        style={{
                          color: "var(--ink)",
                          fontSize: "13px",
                          display: "block",
                        }}
                      >
                        {req.user}
                      </b>
                      <small
                        style={{
                          color: "var(--primary-dark)",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        Role: {req.requestedRole}
                      </small>
                    </div>
                    <span className={`badge badge--${req.statusTone}`}>
                      {req.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    Reason: {req.reason}
                  </p>

                  <div
                    style={{
                      padding: "8px 10px",
                      background: "var(--surface)",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10.5px",
                        color: "var(--muted)",
                        display: "block",
                      }}
                    >
                      Target Organization
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px 'Manrope'",
                        color: "var(--ink)",
                      }}
                    >
                      {req.organization}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: "10px",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "11px",
                  }}
                >
                  <span style={{ color: "var(--muted)" }}>
                    Urgency: {req.urgency}
                  </span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      className="button button--sm button--primary"
                      onClick={() =>
                        triggerProtectedAction(
                          `Approve Role Request for ${req.user}`,
                        )
                      }
                    >
                      Authorize
                    </button>
                    <button
                      type="button"
                      className="button button--sm button--secondary"
                      onClick={() =>
                        triggerProtectedAction(
                          `Deny Role Request for ${req.user}`,
                        )
                      }
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Security Logs */}
        {activeTab === "securityLogs" && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {securityLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: "12px 14px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <strong
                      style={{
                        font: "600 12.5px monospace",
                        color: "var(--ink)",
                      }}
                    >
                      {log.actor}
                    </strong>
                    <span
                      className="badge badge--info"
                      style={{ fontSize: "9.5px" }}
                    >
                      {log.severity}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "11.5px",
                      color: "var(--ink-secondary)",
                    }}
                  >
                    {log.event}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    className={`badge badge--${log.statusTone}`}
                    style={{ fontSize: "10px" }}
                  >
                    {log.status}
                  </span>
                  <small
                    style={{
                      display: "block",
                      color: "var(--muted)",
                      fontSize: "10px",
                      marginTop: "3px",
                    }}
                  >
                    {log.timestamp}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Filterable User Management Directory Table */}
      <section
        className="dashboard-table-section"
        style={{ marginTop: "24px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                font: "600 16px 'Manrope'",
                color: "var(--ink)",
              }}
            >
              Platform User Registry & Entitlement Directory (
              {filteredUsers.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              User search, role assignment audits, organization tenancy, and
              security status
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                userFilter === "all" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setUserFilter("all")}
            >
              All Users (6)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                userFilter === "admin" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setUserFilter("admin")}
            >
              Super Admins (1)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                userFilter === "pro" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setUserFilter("pro")}
            >
              Professional (1)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                userFilter === "flagged"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setUserFilter("flagged")}
            >
              Suspended (1)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={userColumns}
          data={filteredUsers}
          searchPlaceholder="Search user identity, email, role, or organization..."
          actionButton={{
            label: "Export Platform User Audit CSV",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 8. Root Administrative Security & Simulated Telemetry Disclaimer */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Super Admin Security Policy & Simulation Notice:</strong> Root
          administrative permissions require cryptographic hardware token
          verification. Selecting this view demonstrates enterprise
          administration controls under safe, read-only observability mode. All
          system uptime figures and user metrics represent simulated platform
          telemetry.
        </div>
      </section>

      {/* 9. Zero-Trust Protected Administrative Action Modal */}
      {showSecurityModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(12, 53, 44, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "14px",
              padding: "24px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div style={{ color: "var(--gold)" }}>
                <Icon name="lock" size={24} />
              </div>
              <h3
                style={{
                  margin: 0,
                  font: "700 16px 'Manrope'",
                  color: "var(--ink)",
                }}
              >
                Administrative Privilege Challenge
              </h3>
            </div>

            <p
              style={{
                fontSize: "12.5px",
                color: "var(--ink-secondary)",
                lineHeight: 1.5,
                margin: "0 0 16px",
              }}
            >
              <strong>Protected Action:</strong> {pendingActionTitle}
              <br />
              <br />
              In accordance with WealthSphere.ai zero-trust RBAC architecture,
              selecting the Super Admin view in Demo Mode does not bestow
              administrative mutating capabilities. Executing this action
              requires a verified hardware security key (FIDO2 / WebAuthn) and
              Root KMS quorum approval.
            </p>

            <div
              style={{
                padding: "10px 12px",
                background: "var(--surface-2)",
                borderRadius: "8px",
                fontSize: "11px",
                color: "var(--muted)",
                marginBottom: "20px",
              }}
            >
              Session:{" "}
              <code style={{ color: "var(--primary-dark)" }}>
                usr_active_session
              </code>{" "}
              · Verified Credentials:{" "}
              <code style={{ color: "var(--primary-dark)" }}>
                ["individual"]
              </code>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowSecurityModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Zero-Trust Enforcement",
                    message: `Action "${pendingActionTitle}" requires production Root Hardware Security Token. Access denied in read-only demo mode.`,
                    tone: "warning",
                  })
                  setShowSecurityModal(false)
                }}
              >
                Verify Token (Simulate)
              </button>
            </div>
          </div>
        </div>
      )}

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Platform User Audit Directory"
        defaultFilename="platform_users_audit.csv"
        headers={[
          "User ID",
          "Name",
          "Email",
          "Role",
          "Role Category",
          "Organization",
          "Account Status",
          "Last Active",
        ]}
        data={filteredUsers.map((u) => [
          u.id,
          u.name,
          u.email,
          u.role,
          u.roleCategory,
          u.organization,
          u.accountStatus,
          u.lastActive,
        ])}
      />
    </div>
  )
}

export default SuperAdminDashboard
