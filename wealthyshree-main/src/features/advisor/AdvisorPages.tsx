import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import {
  OnboardClientModal,
  ScheduleMeetingModal,
  CreateGoalModal,
  ExportModal,
} from "../../components/modals"
import {
  INITIAL_CLIENTS,
  type MockClient,
  type MockGoal,
  type MockMeeting,
} from "../../services/mockData"

export interface AdvisorPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface FinancialPlanItem {
  id: string
  clientName: string
  planType: string
  aum: number
  status: "Active Fiduciary Plan" | "Annual Review Due" | "Draft Proposal"
  probability: number
  targetRetirement: string
  lastUpdated: string
}

interface RiskProfileItem {
  id: string
  clientName: string
  category: "Conservative" | "Moderate" | "Growth" | "Aggressive"
  riskScore: number
  targetEquity: number
  actualEquity: number
  drift: number
  lastAssessed: string
}

export function AdvisorModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: AdvisorPageProps) {
  const { showToast } = useToast()

  // Modals state
  const [showOnboardModal, setShowOnboardModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedClientName, setSelectedClientName] = useState("")

  // Clients state
  const [clients, setClients] = useState<MockClient[]>(INITIAL_CLIENTS)
  const [clientFilter, setClientFilter] = useState<string>("All")
  const [clientSearch, setClientSearch] = useState("")

  // Financial plans state
  const [plans] = useState<FinancialPlanItem[]>([
    {
      id: "fp1",
      clientName: "Harrison & Eleanor Vance",
      planType: "Comprehensive Estate & Private Wealth Plan",
      aum: 28500000,
      status: "Active Fiduciary Plan",
      probability: 96,
      targetRetirement: "Post-Exit / Retired",
      lastUpdated: "May 10, 2025",
    },
    {
      id: "fp2",
      clientName: "Dr. Arthur & Maya Pendelton",
      planType: "Physician Retirement & Practice Succession",
      aum: 6200000,
      status: "Annual Review Due",
      probability: 91,
      targetRetirement: "Age 62 (2028)",
      lastUpdated: "Apr 22, 2025",
    },
    {
      id: "fp3",
      clientName: "Sophia Sterling-Brooke",
      planType: "Multi-Jurisdiction Trust & Liquid Wealth",
      aum: 14800000,
      status: "Active Fiduciary Plan",
      probability: 94,
      targetRetirement: "Age 55 (2034)",
      lastUpdated: "May 02, 2025",
    },
    {
      id: "fp4",
      clientName: "David & Rachel Kim",
      planType: "Tech Founder IPO Liquidity & Tax Plan",
      aum: 9400000,
      status: "Draft Proposal",
      probability: 88,
      targetRetirement: "Age 50 (2036)",
      lastUpdated: "May 14, 2025",
    },
    {
      id: "fp5",
      clientName: "Apex Innovations 401(k) Plan",
      planType: "Corporate Qualified Retirement Plan",
      aum: 18200000,
      status: "Active Fiduciary Plan",
      probability: 98,
      targetRetirement: "N/A (Group Plan)",
      lastUpdated: "Mar 30, 2025",
    },
  ])

  // Risk profiles state
  const [riskProfiles] = useState<RiskProfileItem[]>([
    {
      id: "rp1",
      clientName: "Harrison & Eleanor Vance",
      category: "Moderate",
      riskScore: 58,
      targetEquity: 60,
      actualEquity: 62.4,
      drift: 2.4,
      lastAssessed: "Jan 15, 2025",
    },
    {
      id: "rp2",
      clientName: "Dr. Arthur & Maya Pendelton",
      category: "Conservative",
      riskScore: 42,
      targetEquity: 45,
      actualEquity: 48.2,
      drift: 3.2,
      lastAssessed: "Mar 10, 2025",
    },
    {
      id: "rp3",
      clientName: "Sophia Sterling-Brooke",
      category: "Growth",
      riskScore: 74,
      targetEquity: 75,
      actualEquity: 74.0,
      drift: -1.0,
      lastAssessed: "Feb 20, 2025",
    },
    {
      id: "rp4",
      clientName: "David & Rachel Kim",
      category: "Aggressive",
      riskScore: 86,
      targetEquity: 85,
      actualEquity: 88.5,
      drift: 3.5,
      lastAssessed: "May 05, 2025",
    },
  ])

  // Meetings state
  const [meetings, setMeetings] = useState<MockMeeting[]>([
    {
      id: "m1",
      client: "Harrison & Eleanor Vance",
      type: "Annual Fiduciary Review & Estate Distribution",
      time: "Today · 10:30 AM",
      date: "May 20, 2025",
      mode: "Conference Suite",
      status: "Confirmed",
      notes: "Review updated estate trust and private equity distributions.",
    },
    {
      id: "m2",
      client: "Dr. Arthur & Maya Pendelton",
      type: "Retirement Scenario Projection (Monte Carlo)",
      time: "Today · 2:00 PM",
      date: "May 20, 2025",
      mode: "Virtual Video Call",
      status: "Prep Needed",
      notes: "Client retiring in 18 months; run Monte Carlo simulation with inflation shock.",
    },
    {
      id: "m3",
      client: "David & Rachel Kim",
      type: "Post-IPO Stock Option Strategy Review",
      time: "Tomorrow · 11:00 AM",
      date: "May 21, 2025",
      mode: "Conference Suite",
      status: "Confirmed",
      notes: "Evaluate 83(b) election and tax diversification windows.",
    },
  ])

  // AI Assistant Chat State
  const [aiChat, setAiChat] = useState<Array<{ sender: "ai" | "advisor"; text: string }>>([
    {
      sender: "ai",
      text: "Good morning, Marcus. I have completed portfolio drift scans across all 84 advisor households. Harrison Vance's equity sleeve is currently drifted +2.4% above mandate, and Dr. Pendelton's retirement stress test is ready for your 2:00 PM review. How would you like to proceed?",
    },
  ])
  const [aiInput, setAiInput] = useState("")

  const handleSendAi = (preset?: string) => {
    const query = preset || aiInput.trim()
    if (!query) return
    setAiChat((prev) => [...prev, { sender: "advisor", text: query }])
    if (!preset) setAiInput("")

    setTimeout(() => {
      let reply = ""
      const q = query.toLowerCase()
      if (q.includes("pendelton") || q.includes("monte carlo") || q.includes("retire")) {
        reply =
          "Simulated Monte Carlo Analysis for Dr. Arthur Pendelton (Target Retirement 2028): 10,000 trials conducted under a 3.5% sustained inflation assumption. Success probability is 91.4% with a median legacy portfolio of $4.8M at age 95. Recommended discussion point: Transitioning $400k from growth equities to 2-year Treasury ladder."
      } else if (q.includes("drift") || q.includes("rebalance")) {
        reply =
          "Drift Audit Across Practice: 68 households are in Optimal bounds (drift < 1.5%). 12 households have drifted 2.0% - 3.5% due to recent tech rally outperformance. 4 accounts have generated rebalance proposals awaiting your review before order batching."
      } else if (q.includes("adv") || q.includes("compliance")) {
        reply =
          "Compliance & ADV Summary: Form ADV Part 2A annual update is complete with zero disciplinary disclosures. Client fee schedules are verified against custodial fee debits for Q1 2025."
      } else {
        reply = `Advisory Co-Pilot analyzed: "${query}". Practice metrics, fiduciary notes, and client profile records have been cross-referenced. Simulated advisory action prepared for your review.`
      }
      setAiChat((prev) => [...prev, { sender: "ai", text: reply }])
    }, 500)
  }

  // Handle client onboarding modal submission
  const handleClientCreated = (newClient: MockClient) => {
    setClients([newClient, ...clients])
    setShowOnboardModal(false)
    showToast({
      title: "Client Onboarded (Simulated)",
      message: `Enrolled ${newClient.name} with simulated AUM of $${newClient.aum.toLocaleString()}.`,
      tone: "success",
    })
  }

  // Handle meeting scheduled
  const handleMeetingScheduled = (meeting: MockMeeting) => {
    setMeetings([meeting, ...meetings])
    setShowScheduleModal(false)
    showToast({
      title: "Meeting Scheduled",
      message: `Calendar invite dispatched for ${meeting.client}.`,
      tone: "success",
    })
  }

  // Filter clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesFilter =
        clientFilter === "All"
          ? true
          : clientFilter === "Optimal"
          ? c.status === "Optimal"
          : clientFilter === "Review Due"
          ? c.status === "Review Due"
          : clientFilter === "Drift Alert"
          ? c.status === "Drift Alert"
          : true
      const matchesSearch =
        c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.tier.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(clientSearch.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [clients, clientFilter, clientSearch])

  // =========================================================================
  // PAGE 1: CLIENTS
  // =========================================================================
  if (navId === "clients" || navName === "Clients") {
    const totalAum = clients.reduce((sum, c) => sum + c.aum, 0)

    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · PRACTICE MANAGEMENT</span>
            <div className="page-title">Client Roster & Wealth Accounts</div>
            <div className="page-subtitle">
              Comprehensive household profiles, fiduciary review milestones, AUM tiering, and mandate adherence.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowOnboardModal(true)}
              >
                <Icon name="plus" size={16} />
                <span>Onboard New Client</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Client Roster CSV</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Total Practice AUM</span>
            <div className="value">${(totalAum / 1000000).toFixed(1)}M</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>{clients.length} active fiduciary households</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Total Advisory Households"
            value={`${clients.length} Clients`}
            detail="+6 onboarded QTD (Simulated)"
            trend="up"
            icon="briefcase"
            tone="blue"
          />
          <MetricCard
            label="Optimal Mandate Alignment"
            value="81% Practice"
            detail="68 accounts within 1.5% drift"
            trend="up"
            icon="shield"
            tone="emerald"
          />
          <MetricCard
            label="Annual Reviews Pending"
            value="4 Households"
            detail="Scheduled over next 14 days"
            trend="neutral"
            icon="calendar"
            tone="gold"
          />
          <MetricCard
            label="Average Health Score"
            value="812 / 1000"
            detail="Comprehensive planning index"
            trend="up"
            icon="sparkle"
            tone="violet"
          />
        </section>

        {/* Filter and Search Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["All", "Optimal", "Review Due", "Drift Alert"].map((f) => (
              <button
                key={f}
                type="button"
                className={`button ${clientFilter === f ? "button--primary" : "button--ghost"}`}
                style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}
                onClick={() => setClientFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ position: "relative", minWidth: "260px" }}>
            <input
              type="text"
              placeholder="Search clients by name, tier, email..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.45rem 0.75rem",
                borderRadius: "6px",
                border: "1px solid var(--color-border, #ddd)",
                background: "var(--color-bg-input, #fff)",
                color: "inherit",
                fontSize: "0.85rem",
              }}
            />
          </div>
        </div>

        {/* Clients Table */}
        <DataTable<MockClient>
          title="Fiduciary Client Roster"
          subtitle="Showing SEC compliant client records and portfolio values"
          columns={[
            {
              key: "name",
              header: "Client Name",
              render: (r: MockClient) => (
                <div>
                  <strong>{r.name}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.email}
                  </div>
                </div>
              ),
            },
            {
              key: "tier",
              header: "Client Tier",
              render: (r: MockClient) => <span className="badge badge--neutral">{r.tier}</span>,
            },
            {
              key: "aum",
              header: "Assets Under Management",
              render: (r: MockClient) => (
                <strong>${r.aum.toLocaleString()}</strong>
              ),
            },
            {
              key: "status",
              header: "Mandate Status",
              render: (r: MockClient) => (
                <span
                  className={`badge ${
                    r.status === "Optimal"
                      ? "badge--success"
                      : r.status === "Review Due"
                      ? "badge--warning"
                      : "badge--danger"
                  }`}
                >
                  {r.status}
                </span>
              ),
            },
            {
              key: "healthScore",
              header: "Health Score",
              render: (r: MockClient) => (
                <span>
                  <strong>{r.healthScore}</strong> / 1000
                </span>
              ),
            },
            {
              key: "actions",
              header: "Quick Actions",
              render: (r: MockClient) => (
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <button
                    type="button"
                    className="button button--ghost"
                    style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                    onClick={() => {
                      setSelectedClientName(r.name)
                      setShowScheduleModal(true)
                    }}
                  >
                    Meeting
                  </button>
                  <button
                    type="button"
                    className="button button--ghost"
                    style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                    onClick={() =>
                      showToast({
                        title: "Simulated Review Packet",
                        message: `Generated annual review packet for ${r.name}.`,
                        tone: "info",
                      })
                    }
                  >
                    Review
                  </button>
                </div>
              ),
            },
          ]}
          data={filteredClients}
        />

        {showOnboardModal && (
          <OnboardClientModal
            isOpen={showOnboardModal}
            onClose={() => setShowOnboardModal(false)}
            onClientCreated={handleClientCreated}
          />
        )}
        {showScheduleModal && (
          <ScheduleMeetingModal
            isOpen={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
            initialClient={selectedClientName}
            onMeetingScheduled={handleMeetingScheduled}
          />
        )}
        {showExportModal && (
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            headers={["Client Name", "Tier", "AUM", "Status", "Health Score", "Email"]}
            data={filteredClients.map((c) => [
              c.name,
              c.tier,
              `$${c.aum.toLocaleString()}`,
              c.status,
              c.healthScore,
              c.email,
            ])}
            defaultFilename="advisor-clients-roster"
            title="Export Advisor Client Roster"
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 2: FINANCIAL PLANS
  // =========================================================================
  if (navId === "fin_plans" || navName === "Financial Plans") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · FIDUCIARY PLANNING</span>
            <div className="page-title">Financial Plans & Scenario Forecasts</div>
            <div className="page-subtitle">
              Comprehensive wealth plans, Monte Carlo success probabilities, cash flow models, and life event projections.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "New Plan Drafted (Simulated)",
                    message: "Initialized new comprehensive financial planning template.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Create New Financial Plan</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={openAI}
              >
                <Icon name="ai" size={16} />
                <span>Run Monte Carlo Analysis</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Practice Plan Coverage</span>
            <div className="value">90.5%</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>76 of 84 households with active plans</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Active Fiduciary Plans"
            value="76 Plans"
            detail="All reviewed within 12 months"
            trend="up"
            icon="document"
            tone="emerald"
          />
          <MetricCard
            label="Average Monte Carlo Score"
            value="93.4%"
            detail="Simulated probability of funding"
            trend="up"
            icon="sparkle"
            tone="gold"
          />
          <MetricCard
            label="Plans in Draft / Revision"
            value="4 Plans"
            detail="Awaiting client document uploads"
            trend="neutral"
            icon="activity"
            tone="navy"
          />
          <MetricCard
            label="Annual Updates Completed"
            value="28 QTD"
            detail="Targeting 100% by Q3"
            trend="up"
            icon="check"
            tone="blue"
          />
        </section>

        <DataTable<FinancialPlanItem>
          title="Active Client Financial Plans"
          subtitle="Monte Carlo calibrated projections across primary mandates"
          columns={[
            {
              key: "clientName",
              header: "Household / Entity",
              render: (r) => (
                <div>
                  <strong>{r.clientName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.planType}
                  </div>
                </div>
              ),
            },
            {
              key: "aum",
              header: "Plan Scope (AUM)",
              render: (r) => `$${r.aum.toLocaleString()}`,
            },
            {
              key: "probability",
              header: "Monte Carlo Probability",
              render: (r) => (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className={`badge ${r.probability >= 90 ? "badge--success" : "badge--warning"}`}>
                    {r.probability}% Success
                  </span>
                </div>
              ),
            },
            {
              key: "targetRetirement",
              header: "Retirement Target",
              render: (r) => r.targetRetirement,
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <span className={`badge ${r.status === "Active Fiduciary Plan" ? "badge--success" : "badge--neutral"}`}>
                  {r.status}
                </span>
              ),
            },
            {
              key: "actions",
              header: "Deliverable",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Plan PDF Generated (Simulated)",
                      message: `Downloaded 42-page fiduciary presentation for ${r.clientName}.`,
                      tone: "success",
                    })
                  }
                >
                  Download PDF
                </button>
              ),
            },
          ]}
          data={plans}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 3: CLIENT PORTFOLIOS
  // =========================================================================
  if (navId === "client_portfolios" || navName === "Client Portfolios") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · ASSET MANAGEMENT</span>
            <div className="page-title">Client Portfolios & Allocation Drift</div>
            <div className="page-subtitle">
              Unified Managed Account (UMA) oversight, model portfolio tracking, rebalance triggers, and fee schedule verification.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Rebalance Scan Complete (Simulated)",
                    message: "Scanned 84 household portfolios. 4 rebalance proposals queued.",
                    tone: "success",
                  })
                }
              >
                <Icon name="activity" size={16} />
                <span>Scan Portfolio Drift</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Practice Managed Assets</span>
            <div className="value">$148.6M</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>+$12.4M net inflows YTD</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Total Advisory Portfolios"
            value="84 Portfolios"
            detail="Custodied at Schwab & Fidelity"
            trend="up"
            icon="pie"
            tone="blue"
          />
          <MetricCard
            label="Average Portfolio Yield"
            value="3.84%"
            detail="Annual dividend & coupon flow"
            trend="up"
            icon="wallet"
            tone="emerald"
          />
          <MetricCard
            label="Portfolios Needing Rebalance"
            value="4 Accounts"
            detail="Drift > 2.5% from IPS target"
            trend="neutral"
            icon="alert"
            tone="gold"
          />
          <MetricCard
            label="Tax-Loss Harvesting Queue"
            value="$420,000"
            detail="Simulated unrealized loss pool"
            trend="up"
            icon="tax"
            tone="violet"
          />
        </section>

        <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Master Asset Class Allocation (Practice Aggregated)</h3>
          <p style={{ margin: "0 0 1rem 0", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
            Aggregated exposure across all 84 advisor accounts vs Strategic Benchmark Target.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Global Equities (US Large, Small Cap, International Developed)</span>
                <span><strong>62.4%</strong> (Target: 60.0% · Drift +2.4%)</span>
              </div>
              <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "62.4%", background: "var(--color-accent, #3b82f6)", height: "100%" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Fixed Income (Treasuries, IG Corporate, Municipal Bonds)</span>
                <span><strong>25.6%</strong> (Target: 28.0% · Drift -2.4%)</span>
              </div>
              <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "25.6%", background: "var(--color-success, #10b981)", height: "100%" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Alternative Assets (Private Credit, Real Estate Funds)</span>
                <span><strong>8.2%</strong> (Target: 8.0% · On Target)</span>
              </div>
              <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "8.2%", background: "var(--color-warning, #f59e0b)", height: "100%" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Cash & Ultra-Short Liquidity</span>
                <span><strong>3.8%</strong> (Target: 4.0% · On Target)</span>
              </div>
              <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "3.8%", background: "var(--color-text-secondary, #888)", height: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 4: RISK PROFILES
  // =========================================================================
  if (navId === "risk_profiles" || navName === "Risk Profiles") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · SUITABILITY & RISK</span>
            <div className="page-title">Client Risk Profiles & Capacity Scoring</div>
            <div className="page-subtitle">
              FINRA & SEC suitability compliance, psychometric risk tolerance scores, loss capacity, and IPS drift checks.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Risk Survey Sent (Simulated)",
                    message: "Dispatched digital risk tolerance assessment questionnaire to selected clients.",
                    tone: "info",
                  })
                }
              >
                <Icon name="shield" size={16} />
                <span>Send Risk Assessment</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Suitability Compliance</span>
            <div className="value">100% Up to Date</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>All 84 profiles audited annually</span>
            </div>
          </div>
        </section>

        <DataTable<RiskProfileItem>
          title="Household Risk Tolerance & Equity Drift Matrix"
          subtitle="Quarterly verification of risk appetite vs actual asset allocation"
          columns={[
            {
              key: "clientName",
              header: "Client Name",
              render: (r) => <strong>{r.clientName}</strong>,
            },
            {
              key: "category",
              header: "Risk Category",
              render: (r) => (
                <span
                  className={`badge ${
                    r.category === "Aggressive"
                      ? "badge--danger"
                      : r.category === "Growth"
                      ? "badge--warning"
                      : "badge--success"
                  }`}
                >
                  {r.category}
                </span>
              ),
            },
            {
              key: "riskScore",
              header: "Score (1-100)",
              render: (r) => <strong>{r.riskScore} / 100</strong>,
            },
            {
              key: "targetEquity",
              header: "Target Equity",
              render: (r) => `${r.targetEquity}%`,
            },
            {
              key: "actualEquity",
              header: "Actual Equity",
              render: (r) => `${r.actualEquity}%`,
            },
            {
              key: "drift",
              header: "Drift Variance",
              render: (r) => (
                <span style={{ color: Math.abs(r.drift) > 3 ? "var(--color-danger, #ef4444)" : "inherit" }}>
                  {r.drift > 0 ? `+${r.drift}%` : `${r.drift}%`}
                </span>
              ),
            },
            {
              key: "lastAssessed",
              header: "Last Evaluated",
              render: (r) => r.lastAssessed,
            },
          ]}
          data={riskProfiles}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 5: GOAL PLANNING
  // =========================================================================
  if (navId === "goal_planning" || navName === "Goal Planning") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · GOAL MILESTONES</span>
            <div className="page-title">Client Goal Planning & Milestones</div>
            <div className="page-subtitle">
              Monitor multi-generational client milestones, capital funding requirements, and progress benchmarks.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowGoalModal(true)}
              >
                <Icon name="plus" size={16} />
                <span>Add Client Goal</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Tracked Client Goals</span>
            <div className="value">142 Goals</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>91% on-track or funded</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Total Goals Funded"
            value="$42.5M"
            detail="Accumulated client target capital"
            trend="up"
            icon="goal"
            tone="emerald"
          />
          <MetricCard
            label="Upcoming 3-Year Milestones"
            value="18 Goals"
            detail="College matriculation, exits & homes"
            trend="neutral"
            icon="calendar"
            tone="blue"
          />
          <MetricCard
            label="Underfunded Goals"
            value="6 Goals"
            detail="Savings rate adjustment proposed"
            trend="neutral"
            icon="alert"
            tone="gold"
          />
        </section>

        <div className="card" style={{ padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Major Client Milestones Overview</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { client: "Harrison Vance", goal: "Grandchildren Educational Trust", current: "$4,200,000", target: "$5,000,000", pct: 84, status: "On Track" },
              { client: "Dr. Arthur Pendelton", goal: "Medical Clinic Buyout Capital", current: "$1,850,000", target: "$2,000,000", pct: 92, status: "Almost Funded" },
              { client: "Sophia Sterling-Brooke", goal: "Aspen Heritage Ranch Acquisition", current: "$6,500,000", target: "$8,000,000", pct: 81, status: "On Track" },
              { client: "David Kim", goal: "Angel Syndicate Co-Investment Pool", current: "$900,000", target: "$1,500,000", pct: 60, status: "In Progress" },
            ].map((g, idx) => (
              <div key={idx} style={{ padding: "0.75rem", borderRadius: "6px", background: "var(--color-bg-secondary, #f9fafb)", border: "1px solid var(--color-border, #eee)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <div>
                    <strong>{g.goal}</strong> · <span style={{ color: "var(--color-text-secondary)" }}>{g.client}</span>
                  </div>
                  <span className="badge badge--success">{g.status}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Progress ({g.pct}%)</span>
                  <span><strong>{g.current}</strong> / {g.target}</span>
                </div>
                <div style={{ background: "var(--color-bg-primary, #fff)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${g.pct}%`, background: "var(--color-accent, #3b82f6)", height: "100%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showGoalModal && (
          <CreateGoalModal
            isOpen={showGoalModal}
            onClose={() => setShowGoalModal(false)}
            onGoalAdded={(goal) => {
              setShowGoalModal(false)
              showToast({
                title: "Goal Created (Simulated)",
                message: `Recorded goal "${goal.name}" for client planning schedule.`,
                tone: "success",
              })
            }}
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 6: MEETINGS
  // =========================================================================
  if (navId === "meetings" || navName === "Meetings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · CALENDAR & SESSIONS</span>
            <div className="page-title">Fiduciary Reviews & Client Meetings</div>
            <div className="page-subtitle">
              Schedule annual reviews, prep investment briefs, record meeting minutes, and track client touchpoints.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowScheduleModal(true)}
              >
                <Icon name="calendar" size={16} />
                <span>Schedule New Meeting</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Upcoming This Week</span>
            <div className="value">{meetings.length} Scheduled</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>3 reviews confirmed today</span>
            </div>
          </div>
        </section>

        <DataTable<MockMeeting>
          title="Advisor Meeting Calendar & Agendas"
          subtitle="Client reviews, virtual video sessions, and investment consultations"
          columns={[
            {
              key: "client",
              header: "Client / Household",
              render: (r) => (
                <div>
                  <strong>{r.client}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.notes}
                  </div>
                </div>
              ),
            },
            {
              key: "type",
              header: "Review Type",
              render: (r) => <span className="badge badge--neutral">{r.type}</span>,
            },
            {
              key: "time",
              header: "Date & Time",
              render: (r) => (
                <div>
                  <strong>{r.time}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.mode || "Virtual Video Call"}
                  </div>
                </div>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <span className={`badge ${r.status === "Confirmed" ? "badge--success" : "badge--warning"}`}>
                  {r.status}
                </span>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Meeting Prep Packet",
                      message: `Opened pre-meeting briefing and performance tearsheet for ${r.client}.`,
                      tone: "info",
                    })
                  }
                >
                  Start Meeting
                </button>
              ),
            },
          ]}
          data={meetings}
        />

        {showScheduleModal && (
          <ScheduleMeetingModal
            isOpen={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
            onMeetingScheduled={handleMeetingScheduled}
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 7: REPORTS
  // =========================================================================
  if (navId === "reports" || navName === "Reports") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · COMPLIANCE & PERFORMANCE</span>
            <div className="page-title">Advisor Reports & Performance Attribution</div>
            <div className="page-subtitle">
              GIPS compliant performance reports, Form ADV compliance records, 13F filing summaries, and billing statements.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Quarterly Billing Batch (Simulated)",
                    message: "Generated advisory fee debit schedule for 84 households ($371,500 total fee run).",
                    tone: "success",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Run Fee Billing Report</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Practice Audit CSV</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Practice Fee Yield</span>
            <div className="value">$1.48M / yr</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>1.00% average blended AUM fee</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Generated Practice & Compliance Deliverables"
          subtitle="Official regulatory filings, client performance statements, and billing audits"
          columns={[
            {
              key: "title",
              header: "Report Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "category",
              header: "Classification",
              render: (r: any) => <span className="badge badge--neutral">{r.category}</span>,
            },
            {
              key: "date",
              header: "Generated Date",
              render: (r: any) => r.date,
            },
            {
              key: "status",
              header: "Compliance Status",
              render: (r: any) => <span className="badge badge--success">{r.status}</span>,
            },
            {
              key: "action",
              header: "Download",
              render: (r: any) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Report Download (Simulated)",
                      message: `Downloaded ${r.title} PDF.`,
                      tone: "success",
                    })
                  }
                >
                  Download PDF
                </button>
              ),
            },
          ]}
          data={[
            { title: "Q1 2025 Aggregate Practice Performance Attribution", category: "Performance", date: "Apr 05, 2025", status: "Verified" },
            { title: "Annual Form ADV Part 2A Narrative Brochure", category: "Regulatory SEC", date: "Mar 28, 2025", status: "Filed & Accepted" },
            { title: "Fiduciary Risk & Mandate Suitability Audit", category: "Compliance", date: "May 01, 2025", status: "Approved" },
            { title: "Q1 Household Custodial Fee Debit Statements", category: "Billing & Audit", date: "Apr 10, 2025", status: "Reconciled" },
          ]}
        />

        {showExportModal && (
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            headers={["Report Title", "Category", "Date", "Status"]}
            data={[
              ["Q1 2025 Practice Performance", "Performance", "2025-04-05", "Verified"],
              ["Form ADV Part 2A", "Regulatory SEC", "2025-03-28", "Filed"],
              ["Fiduciary Risk Audit", "Compliance", "2025-05-01", "Approved"],
              ["Q1 Custodial Fee Statements", "Billing", "2025-04-10", "Reconciled"],
            ]}
            defaultFilename="advisor-reports-audit"
            title="Export Practice Reports Audit"
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 8: AI PLANNING ASSISTANT
  // =========================================================================
  if (navId === "ai_planner" || navName === "AI Planning Assistant") {
    return (
      <div className="module-page">
        <section className="module-hero tone-purple">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · AI INTELLIGENCE</span>
            <div className="page-title">Sphere AI Planning & Fiduciary Co-Pilot</div>
            <div className="page-subtitle">
              Automated Monte Carlo stress-testing, estate distribution memos, tax-loss harvesting screening, and meeting prep.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={openAI}
              >
                <Icon name="ai" size={16} />
                <span>Open Full AI Assistant Drawer</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-purple">
            <span className="label">Advisory Intelligence Model</span>
            <div className="value">Sphere CFP-Pro</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>Full practice portfolio access enabled</span>
            </div>
          </div>
        </section>

        {/* Prompt shortcuts */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Recommended Advisory Prompts:
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              "Run Monte Carlo stress test for Dr. Pendelton retiring in 2028",
              "Audit portfolio allocation drift across all 84 households",
              "Draft tax-loss harvesting summary for $420,000 in opportunities",
              "Review Form ADV compliance checklist for upcoming SEC cycle",
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="button button--ghost"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.65rem" }}
                onClick={() => handleSendAi(p)}
              >
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat box */}
        <div className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", height: "480px" }}>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingRight: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {aiChat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "advisor" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background:
                    msg.sender === "advisor"
                      ? "var(--color-accent, #3b82f6)"
                      : "var(--color-bg-secondary, #f3f4f6)",
                  color: msg.sender === "advisor" ? "#fff" : "inherit",
                }}
              >
                <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.25rem" }}>
                  {msg.sender === "advisor" ? "Marcus Sterling, CFP®" : "Sphere AI Advisory Co-Pilot"}
                </div>
                <div style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendAi()
            }}
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Ask Sphere AI to analyze client portfolios, stress-test retirement goals, or draft meeting memos..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              style={{
                flex: 1,
                padding: "0.6rem 0.85rem",
                borderRadius: "6px",
                border: "1px solid var(--color-border, #ddd)",
                background: "var(--color-bg-input, #fff)",
                color: "inherit",
              }}
            />
            <button type="submit" className="button button--primary">
              <Icon name="arrow" size={16} />
              <span>Ask Co-Pilot</span>
            </button>
          </form>
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 9: DOCUMENTS
  // =========================================================================
  if (navId === "documents" || navName === "Documents") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · ENCRYPTED VAULT</span>
            <div className="page-title">Client Document Vault & Legal Repository</div>
            <div className="page-subtitle">
              Securely store signed Investment Policy Statements (IPS), trusts, custodial statements, and agreements.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Document Uploaded (Simulated)",
                    message: "Signed IPS Agreement encrypted with AES-256 and stored in client vault.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Upload Client Document</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Vault Encryption</span>
            <div className="value">AES-256 Bit</div>
            <div className="delta positive">
              <Icon name="lock" size={14} />
              <span>Zero-knowledge client vault active</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Fiduciary Client Document Inventory"
          subtitle="Legally binding agreements and regulatory disclosures"
          columns={[
            {
              key: "title",
              header: "Document Name",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "client",
              header: "Household",
              render: (r: any) => r.client,
            },
            {
              key: "category",
              header: "Category",
              render: (r: any) => <span className="badge badge--neutral">{r.category}</span>,
            },
            {
              key: "date",
              header: "Upload Date",
              render: (r: any) => r.date,
            },
            {
              key: "action",
              header: "Action",
              render: (r: any) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Secure Download",
                      message: `Decrypting and downloading ${r.title}.`,
                      tone: "info",
                    })
                  }
                >
                  Download
                </button>
              ),
            },
          ]}
          data={[
            { title: "Harrison Vance - Signed IPS & Fiduciary Mandate", client: "Harrison & Eleanor Vance", category: "IPS Agreement", date: "Jan 12, 2025" },
            { title: "Pendelton Irrevocable Living Trust Agreement", client: "Dr. Arthur Pendelton", category: "Estate Deed", date: "Mar 18, 2025" },
            { title: "Sophia Sterling-Brooke Custodial Power of Attorney", client: "Sophia Sterling-Brooke", category: "Legal POA", date: "Feb 10, 2025" },
            { title: "David Kim - Pre-IPO Rule 10b5-1 Trading Plan", client: "David & Rachel Kim", category: "SEC Compliance", date: "Apr 28, 2025" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 10: SETTINGS
  // =========================================================================
  if (navId === "settings" || navName === "Settings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FINANCIAL ADVISOR · PRACTICE CONFIGURATION</span>
            <div className="page-title">Advisory Practice Settings & Credentials</div>
            <div className="page-subtitle">
              Manage RIA credentials, custodian broker integrations (Schwab, Fidelity), billing schedules, and compliance policies.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Settings Saved",
                    message: "Practice configuration and custodian API rules updated.",
                    tone: "success",
                  })
                }
              >
                <Icon name="check" size={16} />
                <span>Save Practice Configuration</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">RIA Registration</span>
            <div className="value">SEC Registered</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>CRD # 2849102 · Fiduciary Standard</span>
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Advisory Firm & RIA Identity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.25rem" }}>Firm Name</label>
                <input
                  type="text"
                  defaultValue="Sterling Private Advisory LLP"
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.25rem" }}>Managing Advisor</label>
                <input
                  type="text"
                  defaultValue="Marcus Sterling, CFP®, CIMA®"
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.25rem" }}>SEC CRD Number</label>
                <input
                  type="text"
                  defaultValue="CRD # 2849102"
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
                />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Connected Custodians & Feeds</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", border: "1px solid var(--color-border, #eee)", borderRadius: "6px" }}>
                <span>Charles Schwab Institutional</span>
                <span className="badge badge--success">Live Feed Active</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", border: "1px solid var(--color-border, #eee)", borderRadius: "6px" }}>
                <span>Fidelity Wealth Services</span>
                <span className="badge badge--success">Live Feed Active</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", border: "1px solid var(--color-border, #eee)", borderRadius: "6px" }}>
                <span>BNY Mellon / Pershing Custody</span>
                <span className="badge badge--neutral">Standby Feed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className="module-page">
      <section className="module-hero tone-navy">
        <div>
          <span className="eyebrow">FINANCIAL ADVISOR</span>
          <div className="page-title">{navName || "Advisor Module"}</div>
          <div className="page-subtitle">Advisory tools, fiduciary analysis, and client wealth management.</div>
        </div>
      </section>
      <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
        <p>This advisor module is ready. Select an item from the sidebar to continue.</p>
        <button
          type="button"
          className="button button--primary"
          onClick={() => onNavigate?.("Clients")}
        >
          <span>Go to Clients</span>
        </button>
      </div>
    </div>
  )
}
