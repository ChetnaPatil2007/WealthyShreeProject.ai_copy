import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { SubmitClaimModal, ExportModal } from "../../components/modals"

export interface InsuranceAdvisorDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function InsuranceAdvisorDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: InsuranceAdvisorDashboardProps) {
  const { showToast } = useToast()
  const [activeQueueTab, setActiveQueueTab] = useState<"renewals" | "claims">(
    "renewals",
  )
  const [policyFilter, setPolicyFilter] =
    useState<"all" | "life" | "health" | "vehicle" | "home" | "gaps">("all")
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Upcoming renewals mock data
  const upcomingRenewals = [
    {
      id: "rn1",
      client: "Harrison & Eleanor Vance",
      policyType: "Whole Life Survivorship & Umbrella",
      carrier: "Northwestern Mutual",
      renewalDate: "June 18 (9 days left)",
      premium: "$18,400 / yr",
      status: "Invoice Dispatched",
      statusTone: "info",
    },
    {
      id: "rn2",
      client: "Dr. Arthur Pendelton",
      policyType: "Own-Occupation Disability Income",
      carrier: "Guardian Life",
      renewalDate: "June 24 (15 days left)",
      premium: "$6,200 / yr",
      status: "Auto-Renew Active",
      statusTone: "success",
    },
    {
      id: "rn3",
      client: "Meridian Logistics Fleet",
      policyType: "Commercial Fleet & Motor Liability",
      carrier: "Travelers Commercial",
      renewalDate: "June 12 (3 days left)",
      premium: "$42,500 / yr",
      status: "Grace Period",
      statusTone: "warning",
    },
    {
      id: "rn4",
      client: "Sophia Lin Household",
      policyType: "High-Value Homeowners & Fine Art",
      carrier: "Chubb Private Client",
      renewalDate: "July 02 (23 days left)",
      premium: "$14,800 / yr",
      status: "Invoice Dispatched",
      statusTone: "info",
    },
  ]

  // Pending claims mock data
  const pendingClaims = [
    {
      id: "cl1",
      client: "Beauchamp Holdings",
      claimType: "Commercial Property Water Intrusion",
      carrier: "Chubb Insurance",
      claimAmount: "$48,500 (Claimed)",
      filedDate: "May 28",
      status: "Adjuster Assigned",
      statusTone: "warning",
      details:
        "Water damage assessment completed; waiting on restoration contractor estimate.",
    },
    {
      id: "cl2",
      client: "Dr. Rachel Thorne",
      claimType: "Emergency Out-of-Network Surgery",
      carrier: "Aetna Global Health",
      claimAmount: "$18,200 (Claimed)",
      filedDate: "June 02",
      status: "Docs Under Review",
      statusTone: "info",
      details:
        "Itemized medical records submitted; awaiting medical necessity sign-off.",
    },
    {
      id: "cl3",
      client: "Montgomery Family Trust",
      claimType: "Auto Collision & Third-Party Damage",
      carrier: "State Farm Premier",
      claimAmount: "$12,400 (Claimed)",
      filedDate: "May 19",
      status: "Approved - Payout Scheduled",
      statusTone: "success",
      details:
        "Carrier approved payout minus $1,000 deductible; funds releasing this week.",
    },
    {
      id: "cl4",
      client: "Kensington Residence",
      claimType: "Storm & Roof Tile Damage",
      carrier: "Travelers P&C",
      claimAmount: "$4,900 (Claimed)",
      filedDate: "June 04",
      status: "Initial Intake",
      statusTone: "neutral",
      details: "Claim registered online; photos uploaded to carrier portal.",
    },
  ]

  // Client policies directory mock data
  const clientPolicies = [
    {
      id: "pol1",
      clientName: "Harrison & Eleanor Vance",
      policyNo: "POL-NWM-89421",
      carrier: "Northwestern Mutual",
      category: "Life Insurance",
      sumAssured: "$12,000,000 (Simulated)",
      annualPremium: "$18,400",
      coverageGap: "Adequate (15x income)",
      gapTone: "success",
      status: "Active",
      statusTone: "success",
    },
    {
      id: "pol2",
      clientName: "Arthur & Maya Pendelton",
      policyNo: "POL-PRU-11204",
      carrier: "Prudential Financial",
      category: "Health Insurance",
      sumAssured: "$2,000,000 (Simulated)",
      annualPremium: "$9,800",
      coverageGap: "Critical Illness Gap (-$500K)",
      gapTone: "warning",
      status: "Gap Flagged",
      statusTone: "warning",
    },
    {
      id: "pol3",
      clientName: "Meridian Logistics Fleet",
      policyNo: "POL-TRV-55690",
      carrier: "Travelers Commercial",
      category: "Vehicle Insurance",
      sumAssured: "$5,000,000 (Simulated)",
      annualPremium: "$42,500",
      coverageGap: "Adequate",
      gapTone: "success",
      status: "Renewal Due",
      statusTone: "warning",
    },
    {
      id: "pol4",
      clientName: "Sophia Lin Household",
      policyNo: "POL-CHB-90231",
      carrier: "Chubb Private Client",
      category: "Home Insurance",
      sumAssured: "$8,500,000 (Simulated)",
      annualPremium: "$14,800",
      coverageGap: "Adequate",
      gapTone: "success",
      status: "Active",
      statusTone: "success",
    },
    {
      id: "pol5",
      clientName: "Kensington Family Office",
      policyNo: "POL-MET-33418",
      carrier: "MetLife Premier",
      category: "Life Insurance",
      sumAssured: "$25,000,000 (Simulated)",
      annualPremium: "$38,000",
      coverageGap: "Adequate (Dynasty Trust)",
      gapTone: "success",
      status: "Active",
      statusTone: "success",
    },
    {
      id: "pol6",
      clientName: "Dr. Rachel Thorne",
      policyNo: "POL-GUA-44129",
      carrier: "Guardian Life",
      category: "Health Insurance",
      sumAssured: "$1,500,000 (Simulated)",
      annualPremium: "$6,200",
      coverageGap: "Disability Cap Below Earnings",
      gapTone: "danger",
      status: "Gap Flagged",
      statusTone: "danger",
    },
    {
      id: "pol7",
      clientName: "Montgomery Household",
      policyNo: "POL-STF-77812",
      carrier: "State Farm",
      category: "Vehicle Insurance",
      sumAssured: "$1,000,000 (Simulated)",
      annualPremium: "$3,400",
      coverageGap: "Umbrella Missing (-$2M)",
      gapTone: "warning",
      status: "Gap Flagged",
      statusTone: "warning",
    },
  ]

  // Filter policies
  const filteredPolicies = useMemo(() => {
    if (policyFilter === "life")
      return clientPolicies.filter((p) => p.category === "Life Insurance")
    if (policyFilter === "health")
      return clientPolicies.filter((p) => p.category === "Health Insurance")
    if (policyFilter === "vehicle")
      return clientPolicies.filter((p) => p.category === "Vehicle Insurance")
    if (policyFilter === "home")
      return clientPolicies.filter((p) => p.category === "Home Insurance")
    if (policyFilter === "gaps")
      return clientPolicies.filter((p) => p.status === "Gap Flagged")
    return clientPolicies
  }, [policyFilter])

  const policyColumns = [
    {
      key: "clientName",
      header: "Policyholder / Client",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>
            {row.clientName}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "10px" }}>
            Policy #{row.policyNo} · {row.carrier}
          </small>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row: any) => (
        <span className="badge badge--neutral">{row.category}</span>
      ),
    },
    {
      key: "sumAssured",
      header: "Sum Assured (Simulated)",
      render: (row: any) => (
        <b style={{ color: "var(--ink)" }}>{row.sumAssured}</b>
      ),
    },
    {
      key: "annualPremium",
      header: "Annual Premium",
      render: (row: any) => <span>{row.annualPremium}</span>,
    },
    {
      key: "coverageGap",
      header: "Coverage Gap Analysis",
      render: (row: any) => (
        <span className={`badge badge--${row.gapTone}`}>{row.coverageGap}</span>
      ),
    },
    {
      key: "status",
      header: "Policy Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard insurance-dashboard">
      {/* 1. Hero Header & Protection Practice Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--success">
              CLU® & PRODUCER LICENSE VERIFIED
            </span>
            <span>
              Managing 142 Households · $214.5M Aggregate Protection In Force
            </span>
          </div>
          <h1 className="hero-title">Sarah Jenkins, CLU®</h1>
          <p className="hero-subtitle">
            Senior Risk & Protection Specialist · Jenkins Risk & Assurance.
            Policy inventory monitoring, comprehensive mortality and disability
            gap diagnostics, carrier quote analysis, and claims support.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Coverage Analysis")}
          >
            <Icon name="shield" size={16} />
            <span>Gap Analysis</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setShowClaimModal(true)}
          >
            <Icon name="alert" size={16} />
            <span>Claims Hub</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Metric Cards */}
      <section className="metric-grid" aria-label="Insurance Advisor Metrics">
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

      {/* 3. Quick Actions Component */}
      <QuickActions
        actions={roleConfig.quickActions}
        roleConfig={roleConfig}
        onExecuteAction={(act) => {
          if (act.id === "run_gap_analysis") onNavigate("Coverage Analysis")
          else if (act.id === "issue_quote") onNavigate("Policies")
          else if (act.id === "dispatch_renewals") onNavigate("Renewals")
          else onOpenAI()
        }}
      />

      {/* 4. Coverage Inventory & Protection Distribution Grid */}
      <section className="dashboard-grid">
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Coverage Inventory & Carrier Distribution
              </span>
              <span className="card-sub">
                Simulated sum assured allocation across 284 active client
                policies
              </span>
            </div>
            <span className="badge badge--success">98.4% Persistency</span>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
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
                Total Active Sum Assured
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                $214,500,000
              </strong>
            </div>

            <div className="score-bars">
              {[
                ["Life & Key-Person Insurance ($128.0M / 104 policies)", "60%"],
                [
                  "Health, Disability & Critical Illness ($48.2M / 88 policies)",
                  "23%",
                ],
                [
                  "Property & High-Value Homeowners ($26.3M / 52 policies)",
                  "12%",
                ],
                [
                  "Comprehensive Auto & Umbrella Liability ($12.0M / 40 policies)",
                  "5%",
                ],
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

            <button
              type="button"
              className="button button--secondary"
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => onNavigate("Coverage Analysis")}
            >
              <span>Launch Multi-Carrier Gap Audit</span>
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>

        {/* Coverage Gap Health Shield Card */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">
                Practice Protection Health Index
              </span>
              <span className="card-sub">
                Ratio of adequately protected vs underinsured households
              </span>
            </div>
            <span className="badge badge--warning">28 Gaps Detected</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>80.3%</strong>
              <span>Protection Ratio</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">114 ADEQUATE</span>
            <span>28 households flagged with underinsurance risk</span>
          </div>

          <div className="score-bars">
            {[
              ["Life Insurance Adequacy (10x income standard)", "84%"],
              ["Own-Occupation Disability Protection", "76%"],
              ["Umbrella Excess Liability Coverage", "78%"],
              ["Property Replacement Value Indexing", "83%"],
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
      </section>

      {/* 5. Policy Renewal Timeline & Claims Tracker */}
      <section className="card education-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">Renewal Operations & Claims Desk</span>
            <span className="card-sub">
              {activeQueueTab === "renewals"
                ? "Policies expiring within the next 30 days and grace period tracker"
                : "Active claims in progress, adjuster evaluations, and payout authorizations"}
            </span>
          </div>
          <div className="tabs" style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeQueueTab === "renewals"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveQueueTab("renewals")}
            >
              <Icon name="calendar" size={14} />
              <span>Renewals Due (18)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeQueueTab === "claims"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveQueueTab("claims")}
            >
              <Icon name="alert" size={14} />
              <span>Pending Claims (4)</span>
            </button>
          </div>
        </div>

        {activeQueueTab === "renewals" ? (
          <div className="agenda-list">
            {upcomingRenewals.map((rn) => (
              <div key={rn.id} className="agenda-item">
                <div className="agenda-time-pill">
                  <span>{rn.premium.split(" / ")[0]}</span>
                  <small>Annual</small>
                </div>
                <div className="agenda-info">
                  <div className="agenda-title">
                    {rn.client} ·{" "}
                    <span style={{ fontWeight: 500, color: "var(--muted)" }}>
                      {rn.policyType}
                    </span>
                  </div>
                  <div className="agenda-meta">
                    <span>Carrier: {rn.carrier}</span>
                    <span>·</span>
                    <span
                      style={{
                        color:
                          rn.status === "Grace Period"
                            ? "#dc2626"
                            : "var(--primary-dark)",
                        fontWeight: 600,
                      }}
                    >
                      {rn.renewalDate}
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className={`badge badge--${rn.statusTone}`}>
                    {rn.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() =>
                      showToast({
                        title: "Renewal Dispatched",
                        message: `Electronic renewal invoice & carrier notice dispatched to ${rn.client}.`,
                        tone: "success",
                      })
                    }
                  >
                    Send Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="deadline-timeline">
            {pendingClaims.map((cl) => (
              <div
                key={cl.id}
                className={`deadline-card ${
                  cl.statusTone === "success"
                    ? "normal"
                    : cl.statusTone === "warning"
                      ? "urgent"
                      : "normal"
                }`}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <b
                    style={{ font: "600 13px 'Manrope'", color: "var(--ink)" }}
                  >
                    {cl.client} · {cl.claimType}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Carrier: {cl.carrier} · Amount: {cl.claimAmount} · Filed:{" "}
                    {cl.filedDate}
                  </span>
                  <small
                    style={{
                      fontSize: "10px",
                      color: "var(--ink)",
                      marginTop: "2px",
                    }}
                  >
                    {cl.details}
                  </small>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span className={`badge badge--${cl.statusTone}`}>
                    {cl.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => onNavigate("Claims")}
                  >
                    Track Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Client Policies & Gap Analysis Table */}
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
              Client Policies & Coverage Analysis Directory (
              {filteredPolicies.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Active carrier contracts, simulated sum assured, annual premiums,
              and protection gap indicators
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                policyFilter === "all" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setPolicyFilter("all")}
            >
              All (7)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                policyFilter === "life"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPolicyFilter("life")}
            >
              Life (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                policyFilter === "health"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPolicyFilter("health")}
            >
              Health (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                policyFilter === "vehicle"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPolicyFilter("vehicle")}
            >
              Vehicle (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                policyFilter === "home"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPolicyFilter("home")}
            >
              Home (1)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                policyFilter === "gaps"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPolicyFilter("gaps")}
            >
              Gaps Only (3)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={policyColumns}
          data={filteredPolicies}
          searchPlaceholder="Search client, policy number, or carrier..."
          actionButton={{
            label: "Export Policy Roster",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Underwriting & Simulation Disclaimer Banner */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Underwriting & Simulated Data Notice:</strong> All sum assured
          metrics, premium estimates, and coverage gap projections displayed on
          this dashboard represent modeled simulations. Actual policy terms,
          claim settlements, and premium schedules are governed strictly by
          formal carrier insurance contracts and underwriting approvals.
        </div>
      </section>

      {/* Interactive Modals */}
      <SubmitClaimModal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        onClaimSubmitted={(c) => {
          showToast({
            title: "Claim Submitted",
            message: `Claim ${c.claimNumber} for ${c.client} submitted to carrier claims portal.`,
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Insurance Policy Inventory & Gap Analysis"
        defaultFilename="wealthsphere_insurance_policies"
        headers={[
          "Policyholder",
          "Policy Number",
          "Carrier",
          "Category",
          "Sum Assured",
          "Annual Premium",
          "Coverage Gap",
          "Status",
        ]}
        data={filteredPolicies.map((p) => [
          p.clientName,
          p.policyNo,
          p.carrier,
          p.category,
          p.sumAssured,
          p.annualPremium,
          p.coverageGap,
          p.status,
        ])}
      />
    </div>
  )
}
export default InsuranceAdvisorDashboard
