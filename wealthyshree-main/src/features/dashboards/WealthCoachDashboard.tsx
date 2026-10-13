import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ScheduleMeetingModal, ExportModal } from "../../components/modals"

export interface WealthCoachDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function WealthCoachDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: WealthCoachDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"sessions" | "challenges">(
    "sessions",
  )
  const [clientFilter, setClientFilter] =
    useState<"all" | "optimal" | "review" | "achieved">("all")
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedClientForSession, setSelectedClientForSession] = useState("")

  // Coaching sessions mock data
  const coachingSessions = [
    {
      id: "cs1",
      client: "Jordan & Maya Lee",
      sessionTopic: "Debt Snowball Acceleration & Budget Reset",
      time: "Today · 11:00 AM",
      mode: "1-on-1 Video Session",
      status: "Confirmed",
      statusTone: "success",
      notes:
        "Eliminated credit card #1; transitioning $450/mo avalanche to auto loan.",
    },
    {
      id: "cs2",
      client: "Marcus & Priya Vance",
      sessionTopic: "First-Time Homebuyer Savings Sprint",
      time: "Today · 3:30 PM",
      mode: "1-on-1 Video Session",
      status: "Prep Needed",
      statusTone: "warning",
      notes:
        "Reviewing 12-month down payment milestone; currently at 68% of target.",
    },
    {
      id: "cs3",
      client: "Cohort Alpha (Young Professionals)",
      sessionTopic: "Weekly Accountability & No-Spend Weekend Wins",
      time: "Tomorrow · 6:00 PM",
      mode: "Group Cohort Webinar (18 Mentees)",
      status: "Confirmed",
      statusTone: "success",
      notes:
        "Celebrating 14 mentees who completed the 30-Day Zero Impulse Buy streak.",
    },
    {
      id: "cs4",
      client: "Elena & Carlos Gomez",
      sessionTopic: "Couples Money Mindset & Shared Vision Alignment",
      time: "Thursday · 2:00 PM",
      mode: "1-on-1 Video Session",
      status: "Confirmed",
      statusTone: "success",
      notes:
        "Overcoming money script friction; finalizing unified family cash flow buckets.",
    },
  ]

  // Savings challenges mock data
  const savingsChallenges = [
    {
      id: "sc1",
      title: "52-Week Incremental Savings Ladder",
      participants: "42 Active Mentees",
      poolSaved: "$86,400 (Simulated)",
      progressPct: 78,
      status: "Active · Week 34",
      statusTone: "success",
      tip: "Average mentee saved $2,057 toward their emergency foundation.",
    },
    {
      id: "sc2",
      title: "30-Day Zero Impulse Purchase Sprint",
      participants: "28 Active Mentees",
      poolSaved: "$21,600 (Simulated)",
      progressPct: 92,
      status: "Finishing in 3 days",
      statusTone: "warning",
      tip: "86% participants successfully avoided non-essential discretionary buys.",
    },
    {
      id: "sc3",
      title: "$1,000 Starter Emergency Cushion Blitz",
      participants: "18 New Clients",
      poolSaved: "$16,500 (Simulated)",
      progressPct: 88,
      status: "Active",
      statusTone: "info",
      tip: "14 of 18 clients fully funded their liquid emergency cushion.",
    },
    {
      id: "sc4",
      title: "Debt Avalanche High-Interest Payoff Marathon",
      participants: "24 Active Mentees",
      poolSaved: "$142,000 Debt Cleared",
      progressPct: 65,
      status: "Ongoing Cohort",
      statusTone: "success",
      tip: "Collectively erased $142,000 in >18% APR revolving debt.",
    },
  ]

  // Coaching clients directory mock data
  const coachingClients = [
    {
      id: "cc1",
      name: "Jordan & Maya Lee",
      cohort: "Debt Freedom Mastery",
      wellnessScore: 812,
      primaryGoal: "Eliminate $28K Debt",
      debtCleared: "$16,400 (Simulated)",
      habitStreak: "42 Days",
      status: "Optimal Streak",
      statusTone: "success",
    },
    {
      id: "cc2",
      name: "Marcus & Priya Vance",
      cohort: "Homebuyer Sprint",
      wellnessScore: 745,
      primaryGoal: "Save $60K Down Payment",
      debtCleared: "$8,200 (Simulated)",
      habitStreak: "21 Days",
      status: "On Track",
      statusTone: "success",
    },
    {
      id: "cc3",
      name: "Tyler Bennett",
      cohort: "Young Tech Wealth Habits",
      wellnessScore: 680,
      primaryGoal: "Emergency Fund & Investing",
      debtCleared: "$4,500 (Simulated)",
      habitStreak: "6 Days (Reset)",
      status: "Check-in Needed",
      statusTone: "warning",
    },
    {
      id: "cc4",
      name: "Elena & Carlos Gomez",
      cohort: "Couples Financial Harmony",
      wellnessScore: 825,
      primaryGoal: "Unified Family Budget",
      debtCleared: "$22,000 (Simulated)",
      habitStreak: "60 Days",
      status: "Optimal Streak",
      statusTone: "success",
    },
    {
      id: "cc5",
      name: "Chloe Nakamura",
      cohort: "Solo Founder Cash Flow",
      wellnessScore: 790,
      primaryGoal: "Build 6-Mo Runway",
      debtCleared: "$12,000 (Simulated)",
      habitStreak: "35 Days",
      status: "On Track",
      statusTone: "success",
    },
    {
      id: "cc6",
      name: "David & Sarah Miller",
      cohort: "Debt Freedom Mastery",
      wellnessScore: 860,
      primaryGoal: "Complete Debt Avalanche",
      debtCleared: "$48,000 (Simulated)",
      habitStreak: "90 Days (Milestone)",
      status: "Milestone Achieved",
      statusTone: "success",
    },
  ]

  // Filter coaching clients
  const filteredClients = useMemo(() => {
    if (clientFilter === "optimal")
      return coachingClients.filter((c) => c.status.includes("Optimal"))
    if (clientFilter === "review")
      return coachingClients.filter((c) => c.status === "Check-in Needed")
    if (clientFilter === "achieved")
      return coachingClients.filter((c) => c.status.includes("Milestone"))
    return coachingClients
  }, [clientFilter])

  const clientColumns = [
    {
      key: "name",
      header: "Coaching Client / Household",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10px" }}>
            Program: {row.cohort}
          </small>
        </div>
      ),
    },
    {
      key: "wellnessScore",
      header: "Financial Wellness",
      render: (row: any) => (
        <span
          className={`badge badge--${
            row.wellnessScore >= 800
              ? "success"
              : row.wellnessScore >= 700
                ? "warning"
                : "danger"
          }`}
        >
          {row.wellnessScore} / 1000
        </span>
      ),
    },
    {
      key: "primaryGoal",
      header: "Primary Milestone",
      render: (row: any) => (
        <b style={{ color: "var(--ink)" }}>{row.primaryGoal}</b>
      ),
    },
    {
      key: "debtCleared",
      header: "Debt Cleared (Simulated)",
      render: (row: any) => (
        <span style={{ color: "var(--primary-dark)", fontWeight: 600 }}>
          {row.debtCleared}
        </span>
      ),
    },
    {
      key: "habitStreak",
      header: "Habit Streak",
      render: (row: any) => <span>🔥 {row.habitStreak}</span>,
    },
    {
      key: "status",
      header: "Client Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard coach-dashboard">
      {/* 1. Hero Header & Behavioral Practice Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--success">
              AFC® ACCREDITED FINANCIAL COACH
            </span>
            <span>Mentoring 72 Clients Across 6 Accountability Cohorts</span>
          </div>
          <h1 className="hero-title">Elena Rostova, AFC®</h1>
          <p className="hero-subtitle">
            Master Financial Coach · Rostova Wealth Coaching. Financial
            psychology, automated habit tracking, debt avalanche momentum,
            weekly accountability cohorts, and life milestone roadmaps.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Coaching Sessions")}
          >
            <Icon name="calendar" size={16} />
            <span>Book Session</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>AI Coach Assistant</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Metric Cards */}
      <section className="metric-grid" aria-label="Wealth Coach Metrics">
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
          if (act.id === "schedule_session") onNavigate("Coaching Sessions")
          else if (act.id === "assign_habit") onNavigate("Habit Tracking")
          else if (act.id === "review_snowball") onNavigate("Financial Goals")
          else onOpenAI()
        }}
      />

      {/* 4. Financial Wellness Index & Behavioral Habit Grid */}
      <section className="dashboard-grid">
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">
                Practice Financial Wellness Index
              </span>
              <span className="card-sub">
                Average score across 72 coaching clients
              </span>
            </div>
            <span className="badge badge--success">+38 pts 6M Gain</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>784</strong>
              <span>out of 1000</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">HEALTHY GROWTH</span>
            <span>89.2% consistent weekly budget logging</span>
          </div>

          <div className="score-bars">
            {[
              ["Weekly Budget & Expense Logging (92%)", "92%"],
              ["Emergency Buffer Consistency (88%)", "88%"],
              ["Debt Avalanche Paydown Velocity (94%)", "94%"],
              ["Emotional Money Script Transformation (82%)", "82%"],
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

        {/* Milestone Goals & Debt Eliminated Container */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">Client Milestone Achievements</span>
              <span className="card-sub">
                Collective progress tracked across 186 active financial goals
              </span>
            </div>
            <span className="badge badge--info">$524K Debt Cleared</span>
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
                Active Goals Funding Rate
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                84.5% Funded
              </strong>
            </div>

            <div className="cat-track" style={{ height: "8px" }}>
              <div className="cat-fill emerald" style={{ width: "84.5%" }} />
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
                  Debt Free Clients
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  24
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
                  3-Mo Buffer Done
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>48</b>
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
                  First Home Savers
                </span>
                <b style={{ color: "#0284c7", fontSize: "14px" }}>16</b>
              </div>
            </div>

            <button
              type="button"
              className="button button--secondary"
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => onNavigate("Financial Goals")}
            >
              <span>Explore Goal Milestones & Snowballs</span>
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Coaching Sessions & Savings Challenges Hub */}
      <section className="card education-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">
              Coaching Sessions & Accountability Challenges
            </span>
            <span className="card-sub">
              {activeTab === "sessions"
                ? "Scheduled 1-on-1 coaching consultations and group cohort masterminds"
                : "Active gamified savings challenges and collective cohort leaderboards"}
            </span>
          </div>
          <div className="tabs" style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "sessions"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("sessions")}
            >
              <Icon name="calendar" size={14} />
              <span>Coaching Sessions (16)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "challenges"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("challenges")}
            >
              <Icon name="sparkle" size={14} />
              <span>Savings Challenges (5)</span>
            </button>
          </div>
        </div>

        {activeTab === "sessions" ? (
          <div className="agenda-list">
            {coachingSessions.map((cs) => (
              <div key={cs.id} className="agenda-item">
                <div className="agenda-time-pill">
                  <span>{cs.time.split(" · ")[1]}</span>
                  <small>{cs.time.split(" · ")[0]}</small>
                </div>
                <div className="agenda-info">
                  <div className="agenda-title">
                    {cs.client} ·{" "}
                    <span style={{ fontWeight: 500, color: "var(--muted)" }}>
                      {cs.sessionTopic}
                    </span>
                  </div>
                  <div className="agenda-meta">
                    <span>{cs.mode}</span>
                    <span>·</span>
                    <span>{cs.notes}</span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className={`badge badge--${cs.statusTone}`}>
                    {cs.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => {
                      setSelectedClientForSession(cs.client)
                      showToast({
                        title: "Whiteboard Session",
                        message: `Connecting to interactive coaching whiteboard session for ${cs.client}...`,
                        tone: "info",
                      })
                      setShowScheduleModal(true)
                    }}
                  >
                    Join Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="deadline-timeline">
            {savingsChallenges.map((sc) => (
              <div key={sc.id} className="deadline-card normal">
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
                    {sc.title}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    {sc.participants} · Pool Saved: {sc.poolSaved} · Progress:{" "}
                    {sc.progressPct}%
                  </span>
                  <small
                    style={{
                      fontSize: "10px",
                      color: "var(--ink)",
                      marginTop: "2px",
                    }}
                  >
                    {sc.tip}
                  </small>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span className={`badge badge--${sc.statusTone}`}>
                    {sc.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => onNavigate("Savings Challenges")}
                  >
                    View Cohort
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Coaching Clients Directory Table */}
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
              Coaching Clients & Milestone Progress Directory (
              {filteredClients.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Client cohorts, financial wellness scores, habit streaks, and debt
              elimination progress
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
              All (6)
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
              Optimal Streaks (3)
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
              Check-in Due (1)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                clientFilter === "achieved"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setClientFilter("achieved")}
            >
              Milestone Met (1)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={clientColumns}
          data={filteredClients}
          searchPlaceholder="Search mentee, cohort, or milestone..."
          actionButton={{
            label: "Export Progress Roster",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Behavioral Simulation Disclaimer Banner */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Simulated Behavioral Telemetry Notice:</strong> All wellness
          scores, challenge progress figures, and debt elimination metrics
          displayed in this coaching studio represent simulated educational
          datasets. They illustrate behavioral accountability tools and do not
          constitute real-time market data or formal banking balances.
        </div>
      </section>

      {/* Interactive Modals */}
      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        initialClient={selectedClientForSession}
        onMeetingScheduled={(m) => {
          showToast({
            title: "Coaching Session Scheduled",
            message: `Confirmed coaching session with ${m.client} on ${m.date} at ${m.time}.`,
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Client Behavioral Habits & Financial Wellness Roster"
        defaultFilename="wealthsphere_wealth_coach_roster"
        headers={[
          "Client / Household",
          "Cohort Program",
          "Financial Wellness",
          "Primary Milestone",
          "Debt Cleared",
          "Habit Streak",
          "Status",
        ]}
        data={filteredClients.map((c) => [
          c.name,
          c.cohort,
          `${c.wellnessScore} / 1000`,
          c.primaryGoal,
          c.debtCleared,
          c.habitStreak,
          c.status,
        ])}
      />
    </div>
  )
}
export default WealthCoachDashboard
