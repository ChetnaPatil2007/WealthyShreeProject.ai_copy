import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { ChartCard } from "../../components/ui/ChartCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import {
  OnboardClientModal,
  ScheduleMeetingModal,
  ExportModal,
} from "../../components/modals"
import type { MockClient } from "../../services/mockData"

export interface FinancialAdvisorDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function FinancialAdvisorDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: FinancialAdvisorDashboardProps) {
  const { showToast } = useToast()
  const [activeQueueTab, setActiveQueueTab] = useState<"meetings" | "reviews">(
    "meetings",
  )
  const [clientFilter, setClientFilter] =
    useState<"all" | "optimal" | "review" | "drift">("all")
  const [showOnboardModal, setShowOnboardModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedClientForMeeting, setSelectedClientForMeeting] = useState("")

  // Upcoming meetings mock dataset
  const upcomingMeetings = [
    {
      id: "m1",
      client: "Harrison & Eleanor Vance",
      type: "Annual Fiduciary Review",
      time: "Today · 10:30 AM",
      mode: "Conference Room A / Zoom",
      status: "Confirmed",
      statusTone: "success",
      notes: "Review updated estate trust and private equity distributions.",
    },
    {
      id: "m2",
      client: "Dr. Arthur & Maya Pendelton",
      type: "Retirement Scenario Projection",
      time: "Today · 2:00 PM",
      mode: "Virtual Video Session",
      status: "Prep Needed",
      statusTone: "warning",
      notes:
        "Client retiring in 18 months; run Monte Carlo simulation with inflation shock.",
    },
    {
      id: "m3",
      client: "Sophia Lin (Tech Founder)",
      type: "Executive Stock Option Exercise",
      time: "Tomorrow · 11:00 AM",
      mode: "Direct Call",
      status: "Confirmed",
      statusTone: "success",
      notes: "IPO lockup expiring; coordinate with tax consultant David Chen.",
    },
    {
      id: "m4",
      client: "The Sterling Family Trust",
      type: "Quarterly Multi-Asset Rebalance",
      time: "Thursday · 3:30 PM",
      mode: "In-Person Client Suite",
      status: "Confirmed",
      statusTone: "success",
      notes: "Equities drifted +5.1% above IPS target mandate.",
    },
  ]

  // Pending reviews queue mock dataset
  const pendingReviews = [
    {
      id: "r1",
      client: "Montgomery Household",
      trigger: "SEC Reg BI Suitability Attestation",
      drift: "1.2%",
      deadline: "Due in 3 days",
      priority: "High",
      priorityTone: "warning",
    },
    {
      id: "r2",
      client: "Kensington Family Office",
      trigger: "Asset Allocation Drift > 4.5%",
      drift: "5.4% Overweight",
      deadline: "Action Required",
      priority: "Critical",
      priorityTone: "danger",
    },
    {
      id: "r3",
      client: "Beauchamp Holdings",
      trigger: "Annual Investment Policy (IPS) Renewal",
      drift: "0.8%",
      deadline: "Due in 7 days",
      priority: "Normal",
      priorityTone: "info",
    },
    {
      id: "r4",
      client: "Dr. Rachel Thorne",
      trigger: "Risk Profile Questionnaire Refresh",
      drift: "2.1%",
      deadline: "Due in 12 days",
      priority: "Normal",
      priorityTone: "neutral",
    },
  ]

  // Client Households Table mock dataset
  const [clients, setClients] = useState([
    {
      id: "c1",
      name: "The Vance Family",
      tier: "Private Wealth ($5M+)",
      aum: "$7,840,000",
      planStatus: "Current (v4.2)",
      healthScore: 846,
      lastReview: "Apr 2025",
      drift: "+1.2% (Balanced)",
      driftTone: "neutral",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "c2",
      name: "Arthur & Maya Pendelton",
      tier: "High Net Worth",
      aum: "$3,420,000",
      planStatus: "Update Needed",
      healthScore: 712,
      lastReview: "Jan 2025",
      drift: "+4.8% (Equities)",
      driftTone: "warning",
      status: "Review Due",
      statusTone: "warning",
    },
    {
      id: "c3",
      name: "Sophia Lin Household",
      tier: "Private Wealth ($5M+)",
      aum: "$9,150,000",
      planStatus: "Current (v5.0)",
      healthScore: 890,
      lastReview: "May 2025",
      drift: "+0.4% (Target)",
      driftTone: "success",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "c4",
      name: "Kensington Dynasty Trust",
      tier: "Ultra HNW ($10M+)",
      aum: "$16,400,000",
      planStatus: "Drift Alert",
      healthScore: 685,
      lastReview: "Nov 2024",
      drift: "+5.4% (Drift)",
      driftTone: "danger",
      status: "Drift Alert",
      statusTone: "danger",
    },
    {
      id: "c5",
      name: "Montgomery Household",
      tier: "High Net Worth",
      aum: "$2,890,000",
      planStatus: "Reg BI Pending",
      healthScore: 798,
      lastReview: "Feb 2025",
      drift: "+2.1% (Balanced)",
      driftTone: "neutral",
      status: "Review Due",
      statusTone: "warning",
    },
    {
      id: "c6",
      name: "Dr. Rachel Thorne",
      tier: "Emerging Wealth",
      aum: "$1,640,000",
      planStatus: "Current (v2.1)",
      healthScore: 820,
      lastReview: "Mar 2025",
      drift: "+0.9% (Target)",
      driftTone: "success",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "c7",
      name: "Beauchamp Holdings",
      tier: "Private Wealth ($5M+)",
      aum: "$6,210,000",
      planStatus: "Current (v3.4)",
      healthScore: 835,
      lastReview: "Apr 2025",
      drift: "-1.1% (Target)",
      driftTone: "success",
      status: "Optimal",
      statusTone: "success",
    },
  ])

  // Filter clients
  const filteredClients = useMemo(() => {
    if (clientFilter === "optimal")
      return clients.filter((c) => c.status === "Optimal")
    if (clientFilter === "review")
      return clients.filter((c) => c.status === "Review Due")
    if (clientFilter === "drift")
      return clients.filter((c) => c.status === "Drift Alert")
    return clients
  }, [clientFilter, clients])

  const clientColumns = [
    {
      key: "name",
      header: "Client / Household",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10px" }}>
            {row.tier}
          </small>
        </div>
      ),
    },
    {
      key: "aum",
      header: "Portfolio AUM",
      render: (row: any) => <b style={{ color: "var(--ink)" }}>{row.aum}</b>,
    },
    {
      key: "planStatus",
      header: "Financial Plan",
      render: (row: any) => <span>{row.planStatus}</span>,
    },
    {
      key: "healthScore",
      header: "Health Score",
      render: (row: any) => (
        <span
          className={`badge badge--${
            row.healthScore >= 800
              ? "success"
              : row.healthScore >= 700
                ? "warning"
                : "danger"
          }`}
        >
          {row.healthScore} / 1000
        </span>
      ),
    },
    {
      key: "drift",
      header: "Mandate Drift",
      render: (row: any) => (
        <span className={`badge badge--${row.driftTone}`}>{row.drift}</span>
      ),
    },
    {
      key: "lastReview",
      header: "Last Review",
    },
    {
      key: "status",
      header: "Fiduciary Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard advisor-dashboard">
      {/* 1. Practice Greeting & Fiduciary Credentials Header */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--success">
              SEC SERIES 65 & CFP® VERIFIED
            </span>
            <span>Practice AUM: $148.6M across 84 households</span>
          </div>
          <h1 className="hero-title">Marcus Sterling, CFP®</h1>
          <p className="hero-subtitle">
            Senior Wealth Advisor · Sterling Private Advisory. Comprehensive
            portfolio governance, fiduciary planning reviews, and client wealth
            trajectory monitoring.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => setShowOnboardModal(true)}
          >
            <Icon name="plus" size={16} />
            <span>Onboard Client</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>AI Planning Assistant</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Metric Cards */}
      <section className="metric-grid" aria-label="Advisor Practice Metrics">
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
          if (act.id === "new_proposal") setShowOnboardModal(true)
          else if (act.id === "client_review") {
            setSelectedClientForMeeting("The Vance Family")
            setShowScheduleModal(true)
          } else if (act.id === "suitability_check") onNavigate("Risk Profiles")
          else onOpenAI()
        }}
      />

      {/* 4. Portfolio Allocation & Practice Performance Container */}
      <section className="dashboard-grid">
        <ChartCard
          title="Practice AUM & Inflow Trajectory"
          subtitle="Net asset performance and advisory inflows over the last 12 months"
          value="$148.6M"
          badge={{ label: "+$12.4M YTD Net Inflows", tone: "success" }}
          legends={[
            {
              label: "Equities ($78.2M)",
              value: "52.6%",
              color: "emerald",
              pct: "52.6%",
            },
            {
              label: "Fixed Income ($34.5M)",
              value: "23.2%",
              color: "navy",
              pct: "23.2%",
            },
            {
              label: "Real Estate & Alts ($22.4M)",
              value: "15.1%",
              color: "violet",
              pct: "15.1%",
            },
            {
              label: "Liquid Reserves ($13.5M)",
              value: "9.1%",
              color: "gray",
              pct: "9.1%",
            },
          ]}
        />

        {/* Client Financial Health & Goal Attainment Card */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">Client Financial Health Index</span>
              <span className="card-sub">
                Average score across 84 client households
              </span>
            </div>
            <button
              type="button"
              className="button button--icon"
              onClick={() => onNavigate("Risk Profiles")}
              aria-label="View risk profiles"
            >
              <Icon name="chevron" size={16} />
            </button>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>812</strong>
              <span>out of 1000</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">PRACTICE OPTIMAL</span>
            <span>68 households with score &gt; 800</span>
          </div>

          <div className="score-bars">
            {[
              ["Retirement Independence (88% on track)", "88%"],
              ["Next-Gen Education Trust (82% on track)", "82%"],
              ["Real Estate & Vacation Property (75% on track)", "75%"],
              ["Dynasty Wealth Transfer (91% on track)", "91%"],
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

      {/* 5. Interactive Practice Agenda & Fiduciary Review Queue */}
      <section className="card education-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">
              Practice Agenda & Fiduciary Queue
            </span>
            <span className="card-sub">
              {activeQueueTab === "meetings"
                ? "Upcoming client consultations, strategy reviews & check-ins"
                : "Reg BI compliance, IPS renewal, and asset drift review queue"}
            </span>
          </div>
          <div className="tabs" style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeQueueTab === "meetings"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveQueueTab("meetings")}
            >
              <Icon name="calendar" size={14} />
              <span>Upcoming Meetings (7)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeQueueTab === "reviews"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveQueueTab("reviews")}
            >
              <Icon name="alert" size={14} />
              <span>Pending Reviews (6)</span>
            </button>
          </div>
        </div>

        {activeQueueTab === "meetings" ? (
          <div className="agenda-list">
            {upcomingMeetings.map((m) => (
              <div key={m.id} className="agenda-item">
                <div className="agenda-time-pill">
                  <span>{m.time.split(" · ")[1]}</span>
                  <small>{m.time.split(" · ")[0]}</small>
                </div>
                <div className="agenda-info">
                  <div className="agenda-title">
                    {m.client} ·{" "}
                    <span style={{ fontWeight: 500, color: "var(--muted)" }}>
                      {m.type}
                    </span>
                  </div>
                  <div className="agenda-meta">
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Icon name="grid" size={12} /> {m.mode}
                    </span>
                    <span>·</span>
                    <span>{m.notes}</span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className={`badge badge--${m.statusTone}`}>
                    {m.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => {
                      setSelectedClientForMeeting(m.client)
                      showToast({
                        title: "Session Launch",
                        message: `Launching workspace & scenario packet for ${m.client}...`,
                        tone: "info",
                      })
                      setShowScheduleModal(true)
                    }}
                  >
                    Launch Prep
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="agenda-list">
            {pendingReviews.map((r) => (
              <div key={r.id} className="agenda-item">
                <div
                  className="agenda-time-pill"
                  style={{
                    background: "var(--surface-3)",
                    color: "var(--ink)",
                  }}
                >
                  <span>{r.drift}</span>
                  <small>Drift</small>
                </div>
                <div className="agenda-info">
                  <div className="agenda-title">{r.client}</div>
                  <div className="agenda-meta">
                    <span
                      style={{ color: "var(--primary-dark)", fontWeight: 600 }}
                    >
                      {r.trigger}
                    </span>
                    <span>·</span>
                    <span>{r.deadline}</span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className={`badge badge--${r.priorityTone}`}>
                    {r.priority}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => onNavigate("Risk Profiles")}
                  >
                    Review IPS
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Client Households Directory Table */}
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
              Client Households Directory ({filteredClients.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Monitored accounts, comprehensive plans, health scores, and
              mandate compliance
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
              All (84)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                clientFilter === "optimal"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setClientFilter("optimal")}
            >
              Optimal (68)
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
              Review Due (6)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                clientFilter === "drift"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setClientFilter("drift")}
            >
              Drift Alert (10)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={clientColumns}
          data={filteredClients}
          searchPlaceholder="Search client household, tier, or status..."
          actionButton={{
            label: "Export Roster",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Fiduciary Disclosures & Disclaimer Banner */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Fiduciary Disclosures & Simulation Notice:</strong>{" "}
          WealthSphere.ai provides portfolio analytics, Monte Carlo probability
          forecasts, and suitability review aids for licensed financial
          advisors. Calculations are simulation models and do not constitute
          automated trading instructions or guaranteed returns.
        </div>
      </section>

      {/* Interactive Modals */}
      <OnboardClientModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onClientCreated={(c: MockClient) => {
          setClients((prev) => [
            {
              id: c.id,
              name: c.name,
              tier: c.tier,
              aum:
                typeof c.aum === "number"
                  ? `$${c.aum.toLocaleString()}`
                  : String(c.aum),
              planStatus: "Current (Draft)",
              healthScore: 820,
              lastReview: "Just now",
              drift: "+0.0% (Target)",
              driftTone: "success",
              status: "Optimal",
              statusTone: "success",
            },
            ...prev,
          ])
          showToast({
            title: "Client Onboarded",
            message: `Household "${c.name}" added to active roster.`,
            tone: "success",
          })
        }}
      />

      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        initialClient={selectedClientForMeeting}
        onMeetingScheduled={(m) => {
          showToast({
            title: "Meeting Scheduled",
            message: `Review scheduled with ${m.client} on ${m.date} at ${m.time}.`,
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Advisory Practice Client Roster"
        defaultFilename="wealthsphere_financial_advisor_clients"
        headers={[
          "Household",
          "Tier",
          "Portfolio AUM",
          "Financial Plan",
          "Health Score",
          "Last Review",
          "Status",
        ]}
        data={filteredClients.map((c) => [
          c.name,
          c.tier,
          c.aum,
          c.planStatus,
          c.healthScore,
          c.lastReview,
          c.status,
        ])}
      />
    </div>
  )
}
export default FinancialAdvisorDashboard
