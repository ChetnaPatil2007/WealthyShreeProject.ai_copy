import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal, ScheduleMeetingModal } from "../../components/modals"

export interface PrivateBankDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function PrivateBankDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: PrivateBankDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"requests" | "compliance">(
    "requests",
  )
  const [clientFilter, setClientFilter] =
    useState<"all" | "tier1" | "lombard" | "review">("all")
  const [showExportModal, setShowExportModal] = useState(false)
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [selectedClientForMeeting, setSelectedClientForMeeting] = useState("")

  // Client Service Requests mock data (Lombard credit, FX & wires)
  const serviceRequests = [
    {
      id: "sr1",
      client: "Laurent Family Holdings",
      requestType: "Lombard Facility Expansion",
      details:
        "Requesting +$5.0M credit line increase against $38.4M pledged blue-chip equities.",
      amount: "+$5,000,000",
      banker: "Jean-Paul Laurent (Lead MD)",
      urgency: "High Priority",
      status: "Credit Committee",
      statusTone: "warning",
    },
    {
      id: "sr2",
      client: "Novak Capital Partners",
      requestType: "Cross-Border FX Hedging",
      details:
        "EUR/USD forward contract execution (€12.5M notional) for real estate closing in Frankfurt.",
      amount: "€12,500,000",
      banker: "Claire DeWitt (Senior Banker)",
      urgency: "Standard",
      status: "Ready for Signature",
      statusTone: "success",
    },
    {
      id: "sr3",
      client: "Geneva Trust Structure",
      requestType: "Structured Note Subscription",
      details:
        "Allocation of $3.0M into 8.4% Autocallable Reverse Convertible note (MSFT/NVDA/ASML).",
      amount: "$3,000,000",
      banker: "Marc von Berg (Structured Desk)",
      urgency: "Standard",
      status: "Trade Confirmed",
      statusTone: "info",
    },
    {
      id: "sr4",
      client: "Monaco Ultra HNW Account",
      requestType: "Urgent Wire & Collateral Review",
      details:
        "Large international wire request; LTV currently at 66.3% near 70% threshold.",
      amount: "$1,850,000",
      banker: "Jean-Paul Laurent (Lead MD)",
      urgency: "Risk Alert",
      status: "Collateral Review",
      statusTone: "warning",
    },
  ]

  // KYC / AML Surveillance & Cross-Border Alerts mock data
  const complianceAlerts = [
    {
      id: "ca1",
      entity: "Balkan Maritime Ventures Ltd",
      alertType: "PEP & Beneficial Ownership Re-Check",
      details:
        "Periodic 12-month re-verification triggered due to updated board composition in Cyprus subsidiary.",
      jurisdiction: "Switzerland / Cyprus",
      riskScore: "Medium Risk (62/100)",
      deadline: "5 Days Remaining",
      status: "Document Pending",
      statusTone: "warning",
    },
    {
      id: "ca2",
      entity: "Vanguard Tech Founder Trust",
      alertType: "FATCA / CRS Cross-Border Tax Filing",
      details:
        "Dual-citizen tax certification renewal; Form W-8BEN-E annual reciprocity check.",
      jurisdiction: "Singapore / USA",
      riskScore: "Low Risk (28/100)",
      deadline: "14 Days Remaining",
      status: "Under Legal Review",
      statusTone: "info",
    },
  ]

  // UHNW Client Directory & Mandate directory
  const uhnwClients = [
    {
      id: "c1",
      name: "Laurent Family Holdings",
      tier: "tier1",
      tierLabel: "Tier 1 Ultra ($25M+)",
      leadBanker: "Jean-Paul Laurent",
      mandate: "Discretionary Multi-Asset + Lombard",
      aum: "$68,400,000",
      lombardDrawn: "$11.8M (LTV 30.7%)",
      status: "Optimal Relationship",
      statusTone: "success",
    },
    {
      id: "c2",
      name: "Novak Capital Partners",
      tier: "tier2",
      tierLabel: "Tier 2 UHNW ($10M-$25M)",
      leadBanker: "Claire DeWitt",
      mandate: "Advisory Equities & FX Hedging",
      aum: "$22,500,000",
      lombardDrawn: "$8.2M (LTV 49.7%)",
      status: "Active Mandate",
      statusTone: "success",
    },
    {
      id: "c3",
      name: "Geneva Trust Structure",
      tier: "tier1",
      tierLabel: "Tier 1 Ultra ($25M+)",
      leadBanker: "Marc von Berg",
      mandate: "Discretionary Global Fixed Income & Notes",
      aum: "$54,000,000",
      lombardDrawn: "$18.4M (LTV 43.8%)",
      status: "Optimal Relationship",
      statusTone: "success",
    },
    {
      id: "c4",
      name: "Monaco Ultra HNW Account",
      tier: "tier3",
      tierLabel: "Core UHNW ($5M-$10M)",
      leadBanker: "Jean-Paul Laurent",
      mandate: "Lombard Credit Facility & Advisory",
      aum: "$9,200,000",
      lombardDrawn: "$6.1M (LTV 66.3%)",
      status: "Margin Monitored",
      statusTone: "warning",
    },
    {
      id: "c5",
      name: "Al-Mansoor Family Treasury",
      tier: "tier1",
      tierLabel: "Tier 1 Ultra ($25M+)",
      leadBanker: "Claire DeWitt",
      mandate: "Global Sovereign & Real Assets",
      aum: "$114,000,000",
      lombardDrawn: "Unfunded Facility ($25M limit)",
      status: "Optimal Relationship",
      statusTone: "success",
    },
    {
      id: "c6",
      name: "Zurich BioTech Founder Holding",
      tier: "tier2",
      tierLabel: "Tier 2 UHNW ($10M-$25M)",
      leadBanker: "Marc von Berg",
      mandate: "Discretionary ESG Momentum",
      aum: "$16,800,000",
      lombardDrawn: "$2.4M (LTV 21.0%)",
      status: "Review Scheduled",
      statusTone: "info",
    },
  ]

  // Filter UHNW clients
  const filteredClients = useMemo(() => {
    if (clientFilter === "tier1")
      return uhnwClients.filter((c) => c.tier === "tier1")
    if (clientFilter === "lombard")
      return uhnwClients.filter((c) => !c.lombardDrawn.includes("Unfunded"))
    if (clientFilter === "review")
      return uhnwClients.filter(
        (c) => c.status.includes("Margin") || c.status.includes("Review"),
      )
    return uhnwClients
  }, [clientFilter])

  const clientColumns = [
    {
      key: "name",
      header: "Client Family / Legal Vehicle",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
            Lead Banker: {row.leadBanker}
          </small>
        </div>
      ),
    },
    {
      key: "tierLabel",
      header: "Relationship Tier",
      render: (row: any) => (
        <span className="badge badge--navy">{row.tierLabel}</span>
      ),
    },
    {
      key: "mandate",
      header: "Wealth Mandate",
      render: (row: any) => (
        <span style={{ fontSize: "12px", color: "var(--ink)" }}>
          {row.mandate}
        </span>
      ),
    },
    {
      key: "aum",
      header: "Total AUM & Lombard Credit",
      render: (row: any) => (
        <div>
          <strong
            style={{ color: "var(--primary-dark)", font: "700 13px 'Manrope'" }}
          >
            {row.aum}
          </strong>
          <small
            style={{
              display: "block",
              color: "var(--muted)",
              fontSize: "10px",
            }}
          >
            Lombard: {row.lombardDrawn}
          </small>
        </div>
      ),
    },
    {
      key: "status",
      header: "Account Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard private-bank-dashboard">
      {/* 1. Hero Header & Private Bank Institutional Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--navy">
              BANQUE PRIVÉE SPHERE · GENEVA & ZURICH
            </span>
            <span>Managing $1.24B AUM Across 320 Ultra-HNW Families</span>
          </div>
          <h1 className="hero-title">Jean-Paul Laurent</h1>
          <p className="hero-subtitle">
            Managing Director, UHNW Division · Banque Privée Sphere. Ultra-HNW
            tiering, bespoke Lombard credit facilities, structured products,
            fiduciary multi-currency treasury, and regulatory cross-border
            surveillance.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Banking Services")}
          >
            <Icon name="bank" size={16} />
            <span>Structure Lombard Loan</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>Sphere AI Macro Analyst</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Private Banking Metric Cards */}
      <section className="metric-grid" aria-label="Private Banking Metrics">
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
          if (act.id === "issue_term_sheet") onNavigate("Banking Services")
          else if (act.id === "bespoke_note") onNavigate("Wealth Portfolios")
          else if (act.id === "aml_review") onNavigate("Compliance")
          else if (act.id === "client_onboard") onNavigate("Clients")
          else onOpenAI()
        }}
      />

      {/* 4. Division AUM Breakdown & Lombard Facility Monitor */}
      <section className="dashboard-grid">
        {/* Card 1: Division AUM Distribution by UHNW Tiers */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">Division AUM Tier Distribution</span>
              <span className="card-sub">
                $1.24 Billion Total AUM across 320 client households
              </span>
            </div>
            <span className="badge badge--success">+$84M QTD Inflows</span>
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
                Ultra-HNW Tier Capital Concentration
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                $1,240,000,000
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
                style={{ width: "54.8%", background: "var(--primary)" }}
                title="Tier 1 Ultra ($25M+: $680M)"
              />
              <div
                style={{ width: "31.5%", background: "#0ea5e9" }}
                title="Tier 2 High UHNW ($10M-$25M: $390M)"
              />
              <div
                style={{ width: "13.7%", background: "#8b5cf6" }}
                title="Tier 3 Core UHNW ($5M-$10M: $170M)"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  borderLeft: "3px solid var(--primary)",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Tier 1 ($25M+)
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>
                  $680M (54.8%)
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--primary-dark)",
                    display: "block",
                  }}
                >
                  42 Client Families
                </span>
              </div>

              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  borderLeft: "3px solid #0ea5e9",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Tier 2 ($10M-$25M)
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>
                  $390M (31.5%)
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#0284c7",
                    display: "block",
                  }}
                >
                  118 Households
                </span>
              </div>

              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  borderLeft: "3px solid #8b5cf6",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Tier 3 ($5M-$10M)
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>
                  $170M (13.7%)
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#7c3aed",
                    display: "block",
                  }}
                >
                  160 Households
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "4px",
                padding: "12px",
                background: "var(--surface-2)",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <b
                  style={{
                    fontSize: "12px",
                    color: "var(--ink)",
                    display: "block",
                  }}
                >
                  Bank Relationship Retention & NPS
                </b>
                <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                  Retention: 98.6% · Net Promoter Score: +82 across UHNW cohort
                </small>
              </div>
              <span className="badge badge--success">Top Tier Practice</span>
            </div>
          </div>
        </div>

        {/* Card 2: Lombard Credit Facilities & Collateral Monitor */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Lombard Facility & Margin Monitor
              </span>
              <span className="card-sub">
                $184.2M Total Facilities · $76.4M Drawn Credit
              </span>
            </div>
            <span className="badge badge--info">Avg LTV 41.2%</span>
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
                Aggregate Pledged Collateral Health
              </span>
              <strong
                style={{ font: "700 18px 'Manrope'", color: "var(--ink)" }}
              >
                $298.5M Pledged Securities
              </strong>
            </div>

            <div className="cat-track" style={{ height: "10px" }}>
              <div className="cat-fill emerald" style={{ width: "41.2%" }} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "var(--muted)",
              }}
            >
              <span>Current LTV: 41.2%</span>
              <span>Watch Hurdle: 60.0%</span>
              <span>Margin Call: 70.0%</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Active Credit Facilities
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>
                  64 Lines
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--primary-dark)",
                    display: "block",
                  }}
                >
                  $184.2M Authorized
                </span>
              </div>

              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Margin Safety Buffer
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  Healthy
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Only 1 account monitored
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "10px",
                background: "var(--surface-2)",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <b
                  style={{
                    fontSize: "12px",
                    color: "var(--ink)",
                    display: "block",
                  }}
                >
                  Basel III / Swiss FINMA Liquidity
                </b>
                <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
                  Tier 1 Capital Ratio: 16.8% (Target: &gt;12.5%)
                </small>
              </div>
              <span className="badge badge--success">16.8% Tier 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabbed Card: Client Service Requests vs KYC/AML Surveillance Alerts */}
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
              Private Banking Execution & Regulatory Cockpit
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
              Manage UHNW banking requests, Lombard wires, and compliance
              surveillance queues
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "requests"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("requests")}
            >
              <Icon name="briefcase" size={14} />
              <span>Service Requests (14)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "compliance"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("compliance")}
            >
              <Icon name="shield" size={14} />
              <span>KYC / AML Surveillance (2)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Service Requests */}
        {activeTab === "requests" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {serviceRequests.map((req) => (
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
                      <b style={{ color: "var(--ink)", fontSize: "13.5px" }}>
                        {req.client}
                      </b>
                      <small
                        style={{
                          display: "block",
                          color: "var(--primary-dark)",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {req.requestType}
                      </small>
                    </div>
                    <span className={`badge badge--${req.statusTone}`}>
                      {req.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "10px 0",
                      fontSize: "12px",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {req.details}
                  </p>

                  <div
                    style={{
                      padding: "8px 10px",
                      background: "var(--surface)",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Requested Amount
                    </span>
                    <strong
                      style={{
                        font: "700 14px 'Manrope'",
                        color: "var(--ink)",
                      }}
                    >
                      {req.amount}
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
                  <span>Banker: {req.banker}</span>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    onClick={() => {
                      setSelectedClientForMeeting(req.client)
                      showToast({
                        title: "Client Workflow Opened",
                        message: `Authorizing high-priority workflow for ${req.client} (${req.requestType}). Banker: ${req.banker}.`,
                        tone: "info",
                      })
                      setShowMeetingModal(true)
                    }}
                  >
                    Authorize
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Compliance Alerts */}
        {activeTab === "compliance" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {complianceAlerts.map((ca) => (
              <div
                key={ca.id}
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
                      <b style={{ color: "var(--ink)", fontSize: "13.5px" }}>
                        {ca.entity}
                      </b>
                      <small
                        style={{
                          display: "block",
                          color: "var(--gold)",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {ca.alertType}
                      </small>
                    </div>
                    <span className={`badge badge--${ca.statusTone}`}>
                      {ca.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "10px 0",
                      fontSize: "12px",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {ca.details}
                  </p>

                  <div
                    style={{
                      padding: "8px 10px",
                      background: "var(--surface)",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Surveillance Score
                    </span>
                    <strong
                      style={{
                        font: "600 12px 'Manrope'",
                        color: "var(--ink)",
                      }}
                    >
                      {ca.riskScore}
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
                  <span>Jurisdiction: {ca.jurisdiction}</span>
                  <button
                    type="button"
                    className="button button--sm button--primary"
                    onClick={() =>
                      showToast({
                        title: "Surveillance Clearance",
                        message: `Initiating compliance clearance protocol and sanctions audit packet for ${ca.entity} (${ca.jurisdiction}).`,
                        tone: "success",
                      })
                    }
                  >
                    Clear Surveillance
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable UHNW Client Directory & Mandate Table */}
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
              Ultra-HNW Client Relationships & Mandates Directory (
              {filteredClients.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Private banking households, portfolio mandates, and Lombard credit
              status
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                clientFilter === "all" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setClientFilter("all")}
            >
              All Clients (6)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                clientFilter === "tier1"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setClientFilter("tier1")}
            >
              Tier 1 ($25M+) (3)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                clientFilter === "lombard"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setClientFilter("lombard")}
            >
              Active Lombard (5)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                clientFilter === "review"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setClientFilter("review")}
            >
              Review / Monitored (2)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={clientColumns}
          data={filteredClients}
          searchPlaceholder="Search client family, vehicle, banker, or tier..."
          actionButton={{
            label: "Export Division Roster",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Institutional Regulatory Notice */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Private Banking Regulatory Assurance:</strong> Banque Privée
          Sphere operates under FINMA (Switzerland) and OCC (United States)
          supervisory charters. Lombard facilities are strictly secured by
          pledged liquid assets in escrow. Data simulated for private wealth
          management demonstration purposes.
        </div>
      </section>

      {/* Interactive Modals */}
      <ScheduleMeetingModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
        initialClient={selectedClientForMeeting}
        onMeetingScheduled={(m) => {
          showToast({
            title: "Private Consultation Scheduled",
            message: `Secured meeting with ${m.client} on ${m.date} at ${m.time}.`,
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export UHNW Division Client Portfolio & Credit Roster"
        defaultFilename="banque_privee_client_roster"
        headers={[
          "Client Family / Vehicle",
          "Relationship Tier",
          "Wealth Mandate",
          "Total AUM",
          "Lead Banker",
          "Status",
        ]}
        data={filteredClients.map((c) => [
          c.name,
          c.tierLabel,
          c.mandate,
          c.aum,
          c.leadBanker,
          c.status,
        ])}
      />
    </div>
  )
}

export default PrivateBankDashboard
