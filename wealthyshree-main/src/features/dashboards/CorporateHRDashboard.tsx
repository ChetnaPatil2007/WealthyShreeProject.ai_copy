import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface CorporateHRDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function CorporateHRDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: CorporateHRDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"workshops" | "programs">(
    "workshops",
  )
  const [deptFilter, setDeptFilter] =
    useState<"all" | "high" | "growth" | "support">("all")
  const [showExportModal, setShowExportModal] = useState(false)

  // Upcoming Financial Workshops mock data (Quarterly schedule)
  const financialWorkshops = [
    {
      id: "ws1",
      title: "Maximizing Your 401(k) Match & Pre-Tax Deferrals",
      speaker: "Marcus Sterling, CFP® (Lead Financial Educator)",
      date: "Tuesday, Oct 14 · 1:00 PM EST",
      format: "Live Interactive Webinar & Q&A",
      registeredCount: "428 Employees Registered",
      capacity: "500 Capacity",
      status: "Registration Open",
      statusTone: "success",
    },
    {
      id: "ws2",
      title: "First-Time Homebuyer Masterclass: Mortgages & Down Payments",
      speaker: "Elena Rostova, AFC® (Financial Counselor)",
      date: "Thursday, Oct 23 · 3:00 PM EST",
      format: "Virtual Workshop + Workbook",
      registeredCount: "312 Employees Registered",
      capacity: "350 Capacity",
      status: "Filling Fast",
      statusTone: "warning",
    },
    {
      id: "ws3",
      title: "Student Loan Relief & SECURE 2.0 Employer Match",
      speaker: "Sarah Jenkins, JD (Total Rewards Specialist)",
      date: "Wednesday, Nov 04 · 12:00 PM EST",
      format: "Lunch & Learn Session",
      registeredCount: "264 Employees Registered",
      capacity: "300 Capacity",
      status: "Confirmed",
      statusTone: "info",
    },
    {
      id: "ws4",
      title: "Year-End Tax Optimization & HSA Investment Strategies",
      speaker: "David Vance, CPA (Senior Tax Advisor)",
      date: "Tuesday, Nov 17 · 2:00 PM EST",
      format: "Live Broadcast & Recording",
      registeredCount: "510 Employees Registered",
      capacity: "Unlimited Stream",
      status: "Registration Open",
      statusTone: "success",
    },
  ]

  // Active Financial Wellness Programs mock data
  const wellnessPrograms = [
    {
      id: "prog1",
      name: "401(k) Auto-Escalation & Match Sprint",
      cohortTarget: "All Full-Time Employees (4,850 staff)",
      enrolledStaff: "4,568 Employees (94.2%)",
      satisfaction: "96% Positive Feedback",
      primaryOutcome: "Avg deferral increased from 6.2% to 8.6%",
      status: "Active & Exceeding Goal",
      statusTone: "success",
    },
    {
      id: "prog2",
      name: "SECURE 2.0 Student Loan Match Benefit",
      cohortTarget: "Employees with Qualifying Student Debt",
      enrolledStaff: "612 Employees (100% of eligible)",
      satisfaction: "98% Positive Feedback",
      primaryOutcome: "$1.4M saved in student loan interest",
      status: "Active Benefit",
      statusTone: "success",
    },
    {
      id: "prog3",
      name: "Emergency Savings Payroll Deduction Buffer",
      cohortTarget: "Hourly & Early-Career Workforce",
      enrolledStaff: "1,240 Employees",
      satisfaction: "91% Positive Feedback",
      primaryOutcome: "76.8% now hold $1,500+ starter emergency buffer",
      status: "Active Cohort",
      statusTone: "info",
    },
    {
      id: "prog4",
      name: "Executive & Mid-Career Equity Comp (ESOP/RSU)",
      cohortTarget: "Employees with Vested Equity Pools",
      enrolledStaff: "890 Employees",
      satisfaction: "94% Positive Feedback",
      primaryOutcome: "82% adopted structured 10b5-1 tax modeling",
      status: "Active Benefit",
      statusTone: "info",
    },
  ]

  // Filterable Departmental Cohort Aggregates Table
  // STRICT PRIVACY PROTECTION: Minimum 10 staff per cohort. ZERO individual salaries, account balances, or PII exposed!
  const departmentalCohorts = [
    {
      id: "dept1",
      name: "Engineering, R&D & Product",
      location: "San Francisco, Seattle & Remote (12 Hubs)",
      enrolledStaff: "1,420 Staff",
      participationPct: "98.8%",
      wellnessScore: 782,
      matchCapturePct: "96.4%",
      primaryFocus: "Equity Comp, RSU Vesting & Tax Optimization",
      status: "Optimal Resilience",
      statusTone: "success",
      filterGroup: "high",
    },
    {
      id: "dept2",
      name: "Sales, Account Mgmt & Marketing",
      location: "New York, Austin, London & Remote",
      enrolledStaff: "1,180 Staff",
      participationPct: "97.4%",
      wellnessScore: 745,
      matchCapturePct: "93.8%",
      primaryFocus: "Commission Budgeting & Variable Cash Flow",
      status: "On Track",
      statusTone: "success",
      filterGroup: "high",
    },
    {
      id: "dept3",
      name: "Operations, Logistics & Facilities",
      location: "Chicago, Atlanta, Dallas Distribution Hubs",
      enrolledStaff: "1,250 Staff",
      participationPct: "98.2%",
      wellnessScore: 718,
      matchCapturePct: "91.2%",
      primaryFocus: "Starter Emergency Cushions & Debt Paydown",
      status: "Active Sprint",
      statusTone: "info",
      filterGroup: "growth",
    },
    {
      id: "dept4",
      name: "Customer Support & Experience",
      location: "Phoenix, Salt Lake City & Remote",
      enrolledStaff: "600 Staff",
      participationPct: "99.0%",
      wellnessScore: 726,
      matchCapturePct: "92.6%",
      primaryFocus: "Student Loan Relief & Credit Score Building",
      status: "Active Sprint",
      statusTone: "info",
      filterGroup: "growth",
    },
    {
      id: "dept5",
      name: "Corporate, Legal, People & Finance",
      location: "HQ San Francisco & New York",
      enrolledStaff: "400 Staff",
      participationPct: "99.5%",
      wellnessScore: 812,
      matchCapturePct: "98.0%",
      primaryFocus: "Executive Wealth, HSA & Estate Governance",
      status: "Optimal Resilience",
      statusTone: "success",
      filterGroup: "support",
    },
  ]

  // Filter departmental cohorts
  const filteredDepartments = useMemo(() => {
    if (deptFilter === "high")
      return departmentalCohorts.filter((d) => d.filterGroup === "high")
    if (deptFilter === "growth")
      return departmentalCohorts.filter((d) => d.filterGroup === "growth")
    if (deptFilter === "support")
      return departmentalCohorts.filter((d) => d.filterGroup === "support")
    return departmentalCohorts
  }, [deptFilter])

  const departmentColumns = [
    {
      key: "name",
      header: "Departmental Cohort (Aggregated)",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
            Locations: {row.location}
          </small>
        </div>
      ),
    },
    {
      key: "enrolledStaff",
      header: "Cohort Size & Participation",
      render: (row: any) => (
        <div>
          <span
            style={{ fontWeight: 600, color: "var(--ink)", display: "block" }}
          >
            {row.enrolledStaff}
          </span>
          <small
            style={{
              color: "var(--primary-dark)",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            {row.participationPct} Active
          </small>
        </div>
      ),
    },
    {
      key: "wellnessScore",
      header: "Cohort Wellness Score",
      render: (row: any) => (
        <span
          className={`badge badge--${
            row.wellnessScore >= 780
              ? "success"
              : row.wellnessScore >= 720
                ? "info"
                : "warning"
          }`}
        >
          {row.wellnessScore} / 1000
        </span>
      ),
    },
    {
      key: "matchCapturePct",
      header: "401(k) Match Uptake",
      render: (row: any) => (
        <strong
          style={{ color: "var(--primary-dark)", font: "700 13px 'Manrope'" }}
        >
          {row.matchCapturePct}
        </strong>
      ),
    },
    {
      key: "primaryFocus",
      header: "Primary Wellness Priority",
      render: (row: any) => (
        <span style={{ fontSize: "11.5px", color: "var(--ink)" }}>
          {row.primaryFocus}
        </span>
      ),
    },
    {
      key: "status",
      header: "Cohort Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard corporate-hr-dashboard">
      {/* 1. Hero Header & Corporate HR People Ops Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--emerald">
              TOTAL REWARDS & FINANCIAL WELLNESS
            </span>
            <span>Supporting 4,850 Employees Across 8 Educational Tracks</span>
          </div>
          <h1 className="hero-title">Karen Mitchell</h1>
          <p className="hero-subtitle">
            VP of Total Rewards & People Ops · Enterprise People Console.
            Workforce financial wellness analytics, 401(k) match optimization,
            student loan assistance, equity compensation literacy, and
            aggregated wellness telemetry.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Workshops")}
          >
            <Icon name="calendar" size={16} />
            <span>Schedule Workshop</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>AI Benefits Co-Pilot</span>
          </button>
        </div>
      </section>

      {/* 2. Enterprise Privacy Shield Banner (Mandatory Privacy Guard) */}
      <section
        style={{
          marginTop: "16px",
          padding: "14px 18px",
          background:
            "linear-gradient(135deg, rgba(20, 112, 84, 0.08) 0%, rgba(12, 53, 44, 0.04) 100%)",
          border: "1px solid rgba(20, 112, 84, 0.25)",
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <strong style={{ color: "var(--primary-dark)", fontSize: "13px" }}>
              Enterprise Privacy Shield Active: Zero Individual PII or Salary
              Data Exposed
            </strong>
            <span className="badge badge--success" style={{ fontSize: "9px" }}>
              ERISA & GDPR COMPLIANT
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
            To safeguard employee privacy and preserve trusted participation,
            all metrics in this console represent anonymized statistical
            aggregations across cohorts with a minimum threshold of 10
            employees. Individual compensation, banking balances, credit scores,
            debt amounts, and specific assessment answers are cryptographically
            isolated and never accessible to HR staff.
          </p>
        </div>
      </section>

      {/* 3. Six Core Corporate HR Metric Cards */}
      <section
        className="metric-grid"
        aria-label="Corporate HR Metrics"
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
          if (act.id === "launch_workshop") onNavigate("Workshops")
          else if (act.id === "auto_escalation") {
            showToast({
              title: "Auto-Escalation Sprint Initiated",
              message:
                "401(k) Auto-Escalation Sprint: Notified 4,850 employees regarding the +1% annual deferral opt-in window.",
              tone: "success",
            })
          } else if (act.id === "loan_match") onNavigate("Wellness Programs")
          else if (act.id === "broadcast_notice") onNavigate("Communications")
          else onOpenAI()
        }}
      />

      {/* 5. Aggregate Wellness Score & Program Outcomes Grid */}
      <section className="dashboard-grid">
        {/* Card 1: Aggregate Financial Wellness Index */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">
                Enterprise Financial Wellness Index
              </span>
              <span className="card-sub">
                Aggregated score across 4,850 enrolled workforce members
              </span>
            </div>
            <span className="badge badge--success">+42 pts YoY Gain</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>748</strong>
              <span>out of 1000</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">STRONG RESILIENCE</span>
            <span>91.4% positive financial sentiment reported</span>
          </div>

          <div className="score-bars">
            {[
              ["401(k) Full Company Match Capture (94.2%)", "94.2%"],
              ["Liquid Emergency Reserve Readiness (76.8%)", "76.8%"],
              ["HSA Healthcare Fund Maximization (81.4%)", "81.4%"],
              ["Workplace Financial Anxiety Reduction (88.0%)", "88.0%"],
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

        {/* Card 2: Program Outcomes & Engagement Telemetry */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Workforce Benefits Uptake & ROI
              </span>
              <span className="card-sub">
                Impact tracked across 8 active corporate wellness initiatives
              </span>
            </div>
            <span className="badge badge--info">98.4% Participation</span>
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
                Active Monthly Learning Engagement
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                82.6% Engagement
              </strong>
            </div>

            <div className="cat-track" style={{ height: "8px" }}>
              <div className="cat-fill emerald" style={{ width: "82.6%" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Avg 401(k) Deferral
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  8.6% of Pay
                </b>
              </div>

              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Student Loan Relieved
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  $1.4M Saved
                </b>
              </div>

              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Emergency Buffer
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  76.8% Covered
                </b>
              </div>
            </div>

            <div
              style={{
                marginTop: "6px",
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
                  Quarterly Wellness Workshop Series
                </b>
                <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                  12 Sessions Scheduled · 1,514 Employees Already Registered
                </small>
              </div>
              <span className="badge badge--success">96% Net Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tabbed Card: Upcoming Financial Workshops vs Active Wellness Programs */}
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
              Workforce Programs & Workshop Calendar
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
              Coordinate employee financial wellness seminars and curriculum
              tracks
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "workshops"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("workshops")}
            >
              <Icon name="calendar" size={14} />
              <span>Upcoming Workshops (12)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "programs"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("programs")}
            >
              <Icon name="activity" size={14} />
              <span>Active Programs (8)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Workshops */}
        {activeTab === "workshops" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {financialWorkshops.map((ws) => (
              <div
                key={ws.id}
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
                      gap: "8px",
                    }}
                  >
                    <b style={{ color: "var(--ink)", fontSize: "13.5px" }}>
                      {ws.title}
                    </b>
                    <span className={`badge badge--${ws.statusTone}`}>
                      {ws.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--muted)",
                    }}
                  >
                    Speaker: {ws.speaker}
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
                      Format & Time
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px 'Manrope'",
                        color: "var(--ink)",
                      }}
                    >
                      {ws.date}
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
                  <span
                    style={{ fontWeight: 600, color: "var(--primary-dark)" }}
                  >
                    {ws.registeredCount}
                  </span>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    onClick={() =>
                      showToast({
                        title: "Workshop Reminder Broadcasted",
                        message: `Broadcasting reminder invite & calendar sync for ${ws.title}.`,
                        tone: "info",
                      })
                    }
                  >
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Programs */}
        {activeTab === "programs" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {wellnessPrograms.map((prog) => (
              <div
                key={prog.id}
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
                      {prog.name}
                    </b>
                    <span className={`badge badge--${prog.statusTone}`}>
                      {prog.status}
                    </span>
                  </div>

                  <small
                    style={{
                      display: "block",
                      color: "var(--muted)",
                      fontSize: "11px",
                      margin: "6px 0 10px",
                    }}
                  >
                    Target: {prog.cohortTarget}
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
                      Verified Outcome
                    </span>
                    <strong
                      style={{
                        font: "600 12px 'Manrope'",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {prog.primaryOutcome}
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
                  <span>{prog.enrolledStaff}</span>
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                    {prog.satisfaction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Filterable Departmental Cohort Aggregates Table (Zero Individual PII) */}
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
              Departmental Cohort Telemetry (Aggregated:{" "}
              {filteredDepartments.length} Cohorts)
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Strictly aggregated cohort data (threshold &ge; 10 staff). Zero
              individual salaries or account balances exposed.
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                deptFilter === "all" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setDeptFilter("all")}
            >
              All Cohorts (5)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                deptFilter === "high" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setDeptFilter("high")}
            >
              High Engagement (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                deptFilter === "growth"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setDeptFilter("growth")}
            >
              Sprint Cohorts (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                deptFilter === "support"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setDeptFilter("support")}
            >
              HQ & Corporate (1)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={departmentColumns}
          data={filteredDepartments}
          searchPlaceholder="Search departmental cohort or focus area..."
          actionButton={{
            label: "Export Aggregated Report",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 8. ERISA Safe Harbor & Anonymized Privacy Notice */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>ERISA Section 404(c) Fiduciary Education Safe Harbor:</strong>{" "}
          WealthSphere.ai provides un-biased financial education and aggregated
          analytics to corporate employers without providing individualized
          investment advice to plan participants. All figures represent
          anonymized statistical metrics.
        </div>
      </section>

      {/* Interactive Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export ERISA Section 404(c) Aggregated Workforce Wellness Report"
        defaultFilename="erisa_workforce_wellness_report"
        headers={[
          "Departmental Cohort",
          "Locations",
          "Cohort Size",
          "Participation Rate",
          "Wellness Score",
          "401(k) Match Uptake",
          "Primary Priority",
          "Status",
        ]}
        data={filteredDepartments.map((d) => [
          d.name,
          d.location,
          d.enrolledStaff,
          d.participationPct,
          `${d.wellnessScore} / 1000`,
          d.matchCapturePct,
          d.primaryFocus,
          d.status,
        ])}
      />
    </div>
  )
}

export default CorporateHRDashboard
