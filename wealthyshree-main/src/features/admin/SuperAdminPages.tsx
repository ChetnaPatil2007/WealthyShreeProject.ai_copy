import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"
import { getAllRoleConfigs } from "../../config/roles"

export interface SuperAdminPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface PlatformUserItem {
  id: string
  name: string
  email: string
  role: string
  organization: string
  mfaStatus: "Enforced FIDO2" | "TOTP Active" | "SMS Fallback"
  accountStatus: "Active" | "Suspended" | "Locked"
  lastLogin: string
}

interface OrganizationTenantItem {
  id: string
  orgCode: string
  name: string
  tier: "Enterprise Sovereign" | "RIA Advisory Practice" | "Institutional Campus" | "Pro Desk"
  userCount: number
  storageUsed: string
  kmekStatus: "Active Dedicated CMEK" | "Shared KMS Key"
  status: "Active Healthy" | "Provisioning" | "Billing Review"
}

interface SubscriptionItem {
  id: string
  tierName: string
  annualPrice: string
  activeTenants: number
  annualRecurringRevenue: string
  churnRate: string
  features: string
}

interface SecurityTelemetryEvent {
  id: string
  timestamp: string
  eventType: "WAF IP Block" | "Failed MFA Challenge" | "KMS Key Rotation" | "Privilege Elevation Attempt"
  severity: "Informational" | "Warning" | "Critical Alert"
  sourceIp: string
  location: string
  details: string
}

export function SuperAdminModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: SuperAdminPageProps) {
  const { showToast } = useToast()
  const [showExportModal, setShowExportModal] = useState(false)

  // 1. User Management State
  const [users, setUsers] = useState<PlatformUserItem[]>([
    {
      id: "usr-1",
      name: "Arthur Pendelton",
      email: "arthur@pendelton-family.org",
      role: "Family Office",
      organization: "Pendelton Family Office",
      mfaStatus: "Enforced FIDO2",
      accountStatus: "Active",
      lastLogin: "12 mins ago",
    },
    {
      id: "usr-2",
      name: "Jean-Paul Laurent",
      email: "jp.laurent@banque-privee-sphere.ch",
      role: "Private Bank",
      organization: "Banque Privée Sphere",
      mfaStatus: "Enforced FIDO2",
      accountStatus: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: "usr-3",
      name: "Karen Mitchell",
      email: "karen.m@enterprise-global.com",
      role: "Corporate HR",
      organization: "Enterprise People Console",
      mfaStatus: "TOTP Active",
      accountStatus: "Active",
      lastLogin: "Yesterday",
    },
    {
      id: "usr-4",
      name: "Dr. Robert Vance",
      email: "rvance@university-trust.edu",
      role: "University",
      organization: "University Academic Console",
      mfaStatus: "Enforced FIDO2",
      accountStatus: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: "usr-5",
      name: "Marcus Sterling, CFP®",
      email: "marcus@sterlingadvisory.com",
      role: "Financial Advisor",
      organization: "Sterling Advisory Group",
      mfaStatus: "Enforced FIDO2",
      accountStatus: "Active",
      lastLogin: "Just now",
    },
  ])
  const [userSearch, setUserSearch] = useState("")

  // 2. Role Permissions Matrix State (All 16 Platform Roles)
  const allRoles = useMemo(() => getAllRoleConfigs(), [])
  const [rolePermissions, setRolePermissions] = useState<
    Record<string, { read: boolean; write: boolean; approve: boolean; export: boolean; admin: boolean }>
  >(() => {
    const map: Record<string, any> = {}
    allRoles.forEach((r) => {
      map[r.key] = {
        read: true,
        write: !["auditors"].includes(r.key),
        approve: ["family_office", "private_bank", "super_admin", "auditors", "corporate_hr"].includes(r.key),
        export: true,
        admin: r.key === "super_admin",
      }
    })
    return map
  })

  // 3. Organizations / Tenants State
  const [organizations, setOrganizations] = useState<OrganizationTenantItem[]>([
    {
      id: "org-1",
      orgCode: "TENANT-001",
      name: "Pendelton Family Office Multi-Entity",
      tier: "Enterprise Sovereign",
      userCount: 18,
      storageUsed: "42.8 GB",
      kmekStatus: "Active Dedicated CMEK",
      status: "Active Healthy",
    },
    {
      id: "org-2",
      orgCode: "TENANT-002",
      name: "Banque Privée Sphere (Zurich HQ)",
      tier: "Enterprise Sovereign",
      userCount: 140,
      storageUsed: "128.4 GB",
      kmekStatus: "Active Dedicated CMEK",
      status: "Active Healthy",
    },
    {
      id: "org-3",
      orgCode: "TENANT-003",
      name: "Enterprise People Console (Global HR)",
      tier: "Enterprise Sovereign",
      userCount: 4850,
      storageUsed: "340.2 GB",
      kmekStatus: "Active Dedicated CMEK",
      status: "Active Healthy",
    },
    {
      id: "org-4",
      orgCode: "TENANT-004",
      name: "University Academic Trust Console",
      tier: "Institutional Campus",
      userCount: 14850,
      storageUsed: "840.5 GB",
      kmekStatus: "Active Dedicated CMEK",
      status: "Active Healthy",
    },
  ])

  // 4. Subscriptions State
  const [subscriptions] = useState<SubscriptionItem[]>([
    {
      id: "sub-1",
      tierName: "Enterprise Sovereign Tier",
      annualPrice: "$48,000 / year",
      activeTenants: 48,
      annualRecurringRevenue: "$2,304,000",
      churnRate: "0.2%",
      features: "Dedicated CMEK KMS, Custom ABAC/RBAC, 99.99% SLA, Dedicated Support",
    },
    {
      id: "sub-2",
      tierName: "Institutional Campus & Government",
      annualPrice: "$24,000 / year",
      activeTenants: 62,
      annualRecurringRevenue: "$1,488,000",
      churnRate: "0.4%",
      features: "Unlimited Learners, Verifiable Micro-Credentials, FedRAMP High",
    },
    {
      id: "sub-3",
      tierName: "RIA Advisory Practice & CA Desk",
      annualPrice: "$12,000 / year",
      activeTenants: 85,
      annualRecurringRevenue: "$1,020,000",
      churnRate: "0.8%",
      features: "Up to 500 Households, Tax Simulation, Rebalance Engine, Client Portal",
    },
  ])

  // 5. Security Telemetry Logs
  const [securityLogs] = useState<SecurityTelemetryEvent[]>([
    {
      id: "sec-1",
      timestamp: "2 mins ago",
      eventType: "WAF IP Block",
      severity: "Warning",
      sourceIp: "194.26.29.14",
      location: "Frankfurt, Germany",
      details: "Automated volumetric credential stuffing blocked by perimeter WAF shield.",
    },
    {
      id: "sec-2",
      timestamp: "18 mins ago",
      eventType: "KMS Key Rotation",
      severity: "Informational",
      sourceIp: "Internal System",
      location: "AWS KMS (us-east-1)",
      details: "Scheduled cryptographic customer master key rotation completed for Tenant #001.",
    },
    {
      id: "sec-3",
      timestamp: "1 hour ago",
      eventType: "Failed MFA Challenge",
      severity: "Warning",
      sourceIp: "185.220.101.5",
      location: "Tor Exit Node",
      details: "Invalid FIDO2 credential response rejected. Account temporarily locked.",
    },
  ])

  // 6. Platform Runtime Configuration State
  const [platformConfig, setPlatformConfig] = useState({
    maintenanceMode: false,
    readReplicaPooling: true,
    strictZeroTrust: true,
    webhookRetryLimit: 5,
    sessionTimeoutMins: 15,
  })

  // 7. AI Configuration State
  const [aiConfig, setAiConfig] = useState({
    modelProvider: "Google Gemini 1.5 Pro",
    temperature: 0.2,
    maxOutputTokens: 4096,
    strictHumanInTheLoop: true,
    financialSafetyGuardrails: true,
  })

  // Handlers
  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.accountStatus === "Active" ? "Locked" : "Active"
          showToast({
            title: `User ${nextStatus}`,
            message: `Account status for ${u.email} changed to ${nextStatus}.`,
            tone: nextStatus === "Active" ? "success" : "warning",
          })
          return { ...u, accountStatus: nextStatus }
        }
        return u
      }),
    )
  }

  const handleTogglePermission = (roleKey: string, permKey: "read" | "write" | "approve" | "export" | "admin") => {
    setRolePermissions((prev) => ({
      ...prev,
      [roleKey]: {
        ...prev[roleKey],
        [permKey]: !prev[roleKey][permKey],
      },
    }))
    showToast({
      title: "RBAC Matrix Updated",
      message: `Permission [${permKey.toUpperCase()}] toggled for role "${roleKey}".`,
      tone: "info",
    })
  }

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.role.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.organization.toLowerCase().includes(userSearch.toLowerCase()),
    )
  }, [users, userSearch])

  /* =========================================================================
     PAGE RENDERER
     ========================================================================= */

  return (
    <div className="page" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span className="badge badge--gold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
              GLOBAL PLATFORM ROOT OPERATIONS
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              WealthSphere Super Admin Console · FIDO2 Root Quorum
            </span>
          </div>
          <h1 style={{ font: "700 26px 'Manrope', sans-serif", color: "var(--ink)", margin: 0 }}>
            {navName}
          </h1>
          <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "13.5px" }}>
            Global user registry, dynamic RBAC permission matrix, multi-tenant isolation, telemetry, and platform configurations.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowExportModal(true)}
          >
            <Icon name="document" size={15} />
            Export Admin Telemetry
          </button>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => {
              showToast({
                title: "KMS Master Key Rotated",
                message: "Cryptographic KMS envelope key rotation triggered across all tenant partitions.",
                tone: "success",
              })
            }}
          >
            <Icon name="lock" size={15} />
            Rotate Platform Master Keys
          </button>
        </div>
      </div>

      {/* 1. USER MANAGEMENT */}
      {navId === "user_mgmt" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Registered Platform Users"
              value="248,500 Users"
              detail="184.2K Active 30-Day"
              icon="user"
              tone="navy"
            />
            <MetricCard
              label="FIDO2 Hardware MFA"
              value="84.2% Enforced"
              detail="Mandatory for Fiduciary Roles"
              icon="shield"
              tone="emerald"
            />
            <MetricCard
              label="Account Lockouts"
              value="3 Suspended"
              detail="Anomalous Geolocation Attempts"
              icon="alert"
              tone="gold"
            />
            <MetricCard
              label="Active Sessions"
              value="4,812 Live"
              detail="P99 Session Latency: 38ms"
              icon="activity"
              tone="blue"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <h3 className="card-title" style={{ margin: 0 }}>
                  Global Platform User Directory
                </h3>
                <span className="card-sub">
                  Inspect user accounts across all 16 roles, enforce multi-factor credentials, or toggle lockouts.
                </span>
              </div>
              <input
                type="text"
                placeholder="Search user, email, role, org..."
                className="input"
                style={{ width: "260px", fontSize: "12px", padding: "6px 12px" }}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>

            <DataTable
              title="Users"
              data={filteredUsers}
              columns={[
                {
                  key: "name",
                  header: "User & Email",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.name}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.email}</span>
                    </div>
                  ),
                },
                {
                  key: "role",
                  header: "Assigned Platform Role",
                  render: (row) => <span className="badge badge--navy">{row.role}</span>,
                },
                {
                  key: "organization",
                  header: "Tenant Organization",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.organization}</span>,
                },
                {
                  key: "mfaStatus",
                  header: "MFA Security",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.mfaStatus.includes("FIDO2")
                          ? "badge--success"
                          : row.mfaStatus.includes("TOTP")
                          ? "badge--blue"
                          : "badge--warning"
                      }`}
                    >
                      {row.mfaStatus}
                    </span>
                  ),
                },
                {
                  key: "accountStatus",
                  header: "Status & Control",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        className={`badge ${
                          row.accountStatus === "Active" ? "badge--success" : "badge--danger"
                        }`}
                      >
                        {row.accountStatus}
                      </span>
                      <button
                        className={`btn ${row.accountStatus === "Active" ? "btn-outline" : "btn-primary"}`}
                        style={{ fontSize: "11px", padding: "4px 8px" }}
                        onClick={() => handleToggleUserStatus(row.id)}
                      >
                        {row.accountStatus === "Active" ? "Lock Account" : "Unlock"}
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 2. ROLE MANAGEMENT (RBAC Matrix for 16 Platform Roles) */}
      {navId === "role_mgmt" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <h3 className="card-title" style={{ margin: 0 }}>
                  Role-Based Access Control (RBAC) Entitlement Matrix
                </h3>
                <span className="card-sub">
                  Fine-grained capability configuration across all 16 canonical platform roles.
                </span>
              </div>
              <span className="badge badge--gold">Zero-Trust Enforcement Active</span>
            </div>

            <DataTable
              title="RBAC Roles"
              data={allRoles}
              columns={[
                {
                  key: "displayName",
                  header: "Platform Role",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.displayName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Category: {row.category}</span>
                    </div>
                  ),
                },
                {
                  key: "read",
                  header: "Read Access",
                  render: (row) => (
                    <input
                      type="checkbox"
                      checked={rolePermissions[row.key]?.read ?? true}
                      onChange={() => handleTogglePermission(row.key, "read")}
                    />
                  ),
                },
                {
                  key: "write",
                  header: "Write / Mutate",
                  render: (row) => (
                    <input
                      type="checkbox"
                      checked={rolePermissions[row.key]?.write ?? false}
                      onChange={() => handleTogglePermission(row.key, "write")}
                    />
                  ),
                },
                {
                  key: "approve",
                  header: "Approval Quorum",
                  render: (row) => (
                    <input
                      type="checkbox"
                      checked={rolePermissions[row.key]?.approve ?? false}
                      onChange={() => handleTogglePermission(row.key, "approve")}
                    />
                  ),
                },
                {
                  key: "export",
                  header: "Data Export",
                  render: (row) => (
                    <input
                      type="checkbox"
                      checked={rolePermissions[row.key]?.export ?? true}
                      onChange={() => handleTogglePermission(row.key, "export")}
                    />
                  ),
                },
                {
                  key: "admin",
                  header: "Super Admin",
                  render: (row) => (
                    <input
                      type="checkbox"
                      checked={rolePermissions[row.key]?.admin ?? false}
                      onChange={() => handleTogglePermission(row.key, "admin")}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 3. ORGANIZATIONS */}
      {navId === "organizations" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Tenant Organizations"
              value="1,420 Orgs"
              detail="Multi-Tenant Cloud Enclaves"
              icon="globe"
              tone="navy"
            />
            <MetricCard
              label="Isolated CMEK Partitions"
              value="100% CMEK"
              detail="Customer-Managed Encryption Keys"
              icon="lock"
              tone="emerald"
            />
            <MetricCard
              label="Total Storage Consumed"
              value="1.42 Petabytes"
              detail="Encrypted at Rest & in Flight"
              icon="activity"
              tone="blue"
            />
            <MetricCard
              label="SLA Adherence"
              value="99.99% Uptime"
              detail="Zero Platform Outages"
              icon="check"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <h3 className="card-title" style={{ margin: 0 }}>
                  Multi-Tenant Organization Accounts
                </h3>
                <span className="card-sub">
                  Cryptographically separated database enclaves, user populations, and custom encryption keys.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => {
                  showToast({
                    title: "Organization Provisioned (Simulated)",
                    message: "Initialized isolated multi-tenant database enclave with dedicated KMS root keys.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="plus" size={14} />
                Provision New Organization
              </button>
            </div>

            <DataTable
              title="Organizations"
              data={organizations}
              columns={[
                {
                  key: "name",
                  header: "Organization Name & Code",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.name}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.orgCode}</span>
                    </div>
                  ),
                },
                {
                  key: "tier",
                  header: "Subscription Tier",
                  render: (row) => <span className="badge badge--navy">{row.tier}</span>,
                },
                {
                  key: "userCount",
                  header: "User Population",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.userCount.toLocaleString()}</strong>,
                },
                {
                  key: "storageUsed",
                  header: "Storage Consumed",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.storageUsed}</span>,
                },
                {
                  key: "kmekStatus",
                  header: "Encryption Enclave",
                  render: (row) => <span className="badge badge--success">{row.kmekStatus}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 4. WORKSPACE MANAGEMENT */}
      {navId === "workspace_mgmt" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Workspace Partition Allocations & Resource Quotas
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Manage isolated compute instances, API rate allocations, and memory quotas per tenant workspace.
            </p>

            <DataTable
              title="Workspaces"
              data={[
                {
                  id: "ws-1",
                  name: "Pendelton Family Fiduciary Vault",
                  computeLimit: "8 vCPU / 32 GB RAM",
                  apiQuota: "50,000 req/hr",
                  status: "Healthy",
                },
                {
                  id: "ws-2",
                  name: "Banque Privée Sphere Discretionary Engine",
                  computeLimit: "16 vCPU / 64 GB RAM",
                  apiQuota: "200,000 req/hr",
                  status: "Healthy",
                },
                {
                  id: "ws-3",
                  name: "Stanford University Academic Portal",
                  computeLimit: "32 vCPU / 128 GB RAM",
                  apiQuota: "500,000 req/hr",
                  status: "Healthy",
                },
              ]}
              columns={[
                {
                  key: "name",
                  header: "Workspace Instance",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.name}</strong>,
                },
                {
                  key: "computeLimit",
                  header: "Compute Resources",
                  render: (row) => <span className="badge badge--navy">{row.computeLimit}</span>,
                },
                {
                  key: "apiQuota",
                  header: "API Rate Limit",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.apiQuota}</span>,
                },
                {
                  key: "status",
                  header: "Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 5. SUBSCRIPTIONS */}
      {navId === "subscriptions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Annual Recurring Revenue (ARR)"
              value="$4,812,000"
              detail="+$620K Net New ARR YTD"
              icon="card"
              tone="emerald"
            />
            <MetricCard
              label="Blended Gross Churn"
              value="0.4% Annually"
              detail="Best-in-Class Enterprise SaaS"
              icon="trending"
              tone="blue"
            />
            <MetricCard
              label="Enterprise Contracts"
              value="195 Tenancies"
              detail="Multi-Year Prepaid Contracts"
              icon="briefcase"
              tone="navy"
            />
            <MetricCard
              label="Net Expansion Rate"
              value="124% NRR"
              detail="Seat & Volume Expansion"
              icon="sparkle"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Commercial Subscription Tiers & Billing Analytics
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Contract tiers, pricing structures, tenant distributions, and recurring revenues.
            </p>

            <DataTable
              title="Subscriptions"
              data={subscriptions}
              columns={[
                {
                  key: "tierName",
                  header: "Plan Tier",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.tierName}</strong>,
                },
                {
                  key: "annualPrice",
                  header: "Contract Pricing",
                  render: (row) => <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>{row.annualPrice}</span>,
                },
                {
                  key: "activeTenants",
                  header: "Active Tenancies",
                  render: (row) => (
                    <strong style={{ color: "var(--ink)" }}>{row.activeTenants} Tenants</strong>
                  ),
                },
                {
                  key: "annualRecurringRevenue",
                  header: "Total ARR",
                  render: (row) => (
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                      {row.annualRecurringRevenue}
                    </span>
                  ),
                },
                {
                  key: "features",
                  header: "Included SLA & Features",
                  render: (row) => (
                    <span style={{ fontSize: "11px", color: "var(--muted)", maxWidth: "320px", display: "block" }}>
                      {row.features}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 6. ACCESS CONTROL */}
      {navId === "access_control" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Zero-Trust Network Access & IAM Security Policies
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Enforce strict IP allowlisting, device health attestation, and enterprise SAML 2.0 Identity Providers.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                  Institutional IP Allowlist Range (CIDR)
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue="192.168.1.0/24, 10.0.0.0/16, 204.14.23.0/22"
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                  Session Idle Inactivity Timeout
                </label>
                <select
                  className="select"
                  value={platformConfig.sessionTimeoutMins}
                  onChange={(e) =>
                    setPlatformConfig((prev) => ({
                      ...prev,
                      sessionTimeoutMins: Number(e.target.value),
                    }))
                  }
                  style={{ width: "100%" }}
                >
                  <option value={10}>10 Minutes (Strict Banking)</option>
                  <option value={15}>15 Minutes (Default Safe)</option>
                  <option value={30}>30 Minutes</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                    SAML 2.0 / Okta / Azure AD Enterprise SSO
                  </strong>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Automated SCIM user provisioning and instant deprovisioning
                  </span>
                </div>
                <span className="badge badge--success">Active Connected</span>
              </div>

              <button
                className="btn btn-primary"
                style={{ alignSelf: "flex-start", marginTop: "8px" }}
                onClick={() => {
                  showToast({
                    title: "Access Control Policies Saved",
                    message: "Zero-trust session timeouts and IP allowlists updated platform-wide.",
                    tone: "success",
                  })
                }}
              >
                Save Security Policies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. SECURITY LOGS */}
      {navId === "security_logs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Real-Time Security Event Telemetry
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Automated intrusion prevention alerts, WAF mitigation, and suspicious authentication attempts.
            </p>

            <DataTable
              title="Security Events"
              data={securityLogs}
              columns={[
                {
                  key: "timestamp",
                  header: "Time",
                  render: (row) => <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>{row.timestamp}</span>,
                },
                {
                  key: "eventType",
                  header: "Event Classification",
                  render: (row) => <span className="badge badge--navy">{row.eventType}</span>,
                },
                {
                  key: "severity",
                  header: "Threat Level",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.severity === "Critical Alert"
                          ? "badge--danger"
                          : row.severity === "Warning"
                          ? "badge--warning"
                          : "badge--info"
                      }`}
                    >
                      {row.severity}
                    </span>
                  ),
                },
                {
                  key: "sourceIp",
                  header: "Origin IP & Geo",
                  render: (row) => (
                    <div>
                      <code style={{ fontSize: "11px", color: "var(--ink)" }}>{row.sourceIp}</code>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        {row.location}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "details",
                  header: "Investigation Details",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>{row.details}</span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 8. PLATFORM CONFIGURATION */}
      {navId === "platform_config" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Platform Runtime Architecture Flags
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Global database read-replica pooling, webhook retry counters, and maintenance flags.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                    Global System Maintenance Mode
                  </strong>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Locks all non-admin users into read-only status for scheduled migrations
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={platformConfig.maintenanceMode}
                  onChange={(e) =>
                    setPlatformConfig((prev) => ({
                      ...prev,
                      maintenanceMode: e.target.checked,
                    }))
                  }
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                    Multi-Region Database Read-Replica Pooling
                  </strong>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Distributes analytical dashboard queries to closest geographical read replicas
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={platformConfig.readReplicaPooling}
                  onChange={(e) =>
                    setPlatformConfig((prev) => ({
                      ...prev,
                      readReplicaPooling: e.target.checked,
                    }))
                  }
                />
              </div>

              <button
                className="btn btn-primary"
                style={{ alignSelf: "flex-start", marginTop: "8px" }}
                onClick={() => {
                  showToast({
                    title: "Platform Configuration Updated",
                    message: "Runtime parameters and replica distribution updated across all clusters.",
                    tone: "success",
                  })
                }}
              >
                Apply Architecture Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. AI CONFIGURATION */}
      {navId === "ai_config" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              WealthSphere AI Engine Policy & Safety Guardrails
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Configure LLM foundation models, temperature, financial guardrails, and human-in-the-loop policies.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                  Active LLM Foundation Model Provider
                </label>
                <select
                  className="select"
                  value={aiConfig.modelProvider}
                  onChange={(e) =>
                    setAiConfig((prev) => ({
                      ...prev,
                      modelProvider: e.target.value,
                    }))
                  }
                  style={{ width: "100%" }}
                >
                  <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro (Recommended)</option>
                  <option value="Google Gemini 1.5 Flash">Google Gemini 1.5 Flash (Low-Latency)</option>
                  <option value="Enterprise Private Dedicated LLM Enclave">
                    Enterprise Private Dedicated LLM Enclave
                  </option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                  Temperature ({aiConfig.temperature}) - Factual Precision vs Creativity
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={aiConfig.temperature}
                  onChange={(e) =>
                    setAiConfig((prev) => ({
                      ...prev,
                      temperature: parseFloat(e.target.value),
                    }))
                  }
                  style={{ width: "100%" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                    Human-in-the-Loop Financial Gating
                  </strong>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Requires explicit user confirmation before executing any simulated or real funds transfers
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={aiConfig.strictHumanInTheLoop}
                  onChange={(e) =>
                    setAiConfig((prev) => ({
                      ...prev,
                      strictHumanInTheLoop: e.target.checked,
                    }))
                  }
                />
              </div>

              <button
                className="btn btn-primary"
                style={{ alignSelf: "flex-start", marginTop: "8px" }}
                onClick={() => {
                  showToast({
                    title: "AI Configuration Saved",
                    message: "Model safety guardrails and temperature parameters updated.",
                    tone: "success",
                  })
                }}
              >
                Save AI Engine Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. AUDIT LOGS */}
      {navId === "audit_logs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Global Root Administrative Audit Logs
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Root administrator actions, role assignment mutations, and security key rotations.
            </p>

            <DataTable
              title="Admin Logs"
              data={[
                {
                  id: "adm-log-1",
                  timestamp: "Today 10:14:22 UTC",
                  admin: "Security Operations Admin",
                  action: "MUTATE_RBAC_PERMISSION",
                  targetRole: "Auditors (Restricted Read-Only)",
                  result: "Success",
                },
                {
                  id: "adm-log-2",
                  timestamp: "Today 08:30:00 UTC",
                  admin: "Security Operations Admin",
                  action: "PROVISION_TENANT",
                  targetRole: "Tenant #004 (Stanford University)",
                  result: "Success",
                },
                {
                  id: "adm-log-3",
                  timestamp: "Yesterday 16:45:12 UTC",
                  admin: "Root System Quorum",
                  action: "ROTATE_KMS_MASTER_KEYS",
                  targetRole: "All 1,420 Enclaves",
                  result: "Success",
                },
              ]}
              columns={[
                {
                  key: "timestamp",
                  header: "Timestamp",
                  render: (row) => <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>{row.timestamp}</span>,
                },
                {
                  key: "admin",
                  header: "Administrator",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.admin}</strong>,
                },
                {
                  key: "action",
                  header: "Action",
                  render: (row) => <span className="badge badge--navy">{row.action}</span>,
                },
                {
                  key: "targetRole",
                  header: "Target Resource",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.targetRole}</span>,
                },
                {
                  key: "result",
                  header: "Result",
                  render: (row) => <span className="badge badge--success">{row.result}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 11. SETTINGS */}
      {navId === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Global Platform Branding
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Root instance branding and international localization presets.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Platform Master Title
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="WealthSphere.ai Multi-Persona Platform"
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Root Environment Domain
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="app.wealthsphere.ai"
                    style={{ width: "100%" }}
                  />
                </div>

                <button
                  className="btn btn-outline"
                  style={{ alignSelf: "flex-start", fontSize: "12px" }}
                  onClick={() => {
                    showToast({
                      title: "Settings Saved",
                      message: "Platform branding settings updated.",
                      tone: "success",
                    })
                  }}
                >
                  Save Branding
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Disaster Recovery & Hot Failover
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Continuous automated backup snapshots and geographic failover policies.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Continuous Point-in-Time Recovery (PITR)
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Continuous transaction log streaming (RPO: 0 seconds)
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Active-Active Hot Cross-Region Standby
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Instant failover to Frankfurt / Tokyo / Ireland (RTO &lt; 30s)
                    </span>
                  </div>
                  <span className="badge badge--success">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Global Platform Telemetry"
        defaultFilename="Super_Admin_Global_Platform_Telemetry"
        headers={[
          "User Name",
          "Email",
          "Role",
          "Organization",
          "MFA Status",
          "Account Status",
          "Last Login",
        ]}
        data={users.map((u) => [
          u.name,
          u.email,
          u.role,
          u.organization,
          u.mfaStatus,
          u.accountStatus,
          u.lastLogin,
        ])}
      />
    </div>
  )
}
