import React, { useState } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import {
  ScheduleMeetingModal,
  CreateGoalModal,
  ExportModal,
} from "../../components/modals"

export interface WealthCoachPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface CoachedClientItem {
  id: string
  clientName: string
  cohortOrType: string
  wellnessScore: number
  activeStreakDays: number
  programTier: "1-on-1 Executive Coaching" | "Cohort Accelerator" | "Financial Foundations"
  nextSessionDate: string
  status: "Optimal Streak" | "Session Due" | "Milestone Reached"
}

interface CoachingSessionItem {
  id: string
  clientName: string
  topic: string
  sessionTime: string
  mode: string
  status: "Confirmed" | "Prep Needed" | "Completed"
  notes: string
}

interface HabitTrackerItem {
  id: string
  habitTitle: string
  category: "Budgeting" | "Investing" | "Mindset" | "Debt Reduction"
  frequency: string
  completionRate: number
  activeStreak: number
  targetCount: string
}

interface ChallengeItem {
  id: string
  title: string
  duration: string
  participants: number
  totalSaved: number
  status: "Active Sprint" | "Enrolling" | "Completed"
  description: string
}

export function WealthCoachModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: WealthCoachPageProps) {
  const { showToast } = useToast()

  // State
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Clients
  const [coachedClients] = useState<CoachedClientItem[]>([
    {
      id: "cc1",
      clientName: "Jordan & Maya Lee",
      cohortOrType: "Couples Wealth Reset",
      wellnessScore: 824,
      activeStreakDays: 38,
      programTier: "1-on-1 Executive Coaching",
      nextSessionDate: "Today · 11:00 AM",
      status: "Optimal Streak",
    },
    {
      id: "cc2",
      clientName: "Marcus & Priya Vance",
      cohortOrType: "First-Time Homebuyer Sprint",
      wellnessScore: 760,
      activeStreakDays: 24,
      programTier: "1-on-1 Executive Coaching",
      nextSessionDate: "Today · 3:30 PM",
      status: "Session Due",
    },
    {
      id: "cc3",
      clientName: "Cohort Alpha (Young Professionals)",
      cohortOrType: "Group Cohort (18 Mentees)",
      wellnessScore: 792,
      activeStreakDays: 45,
      programTier: "Cohort Accelerator",
      nextSessionDate: "Tomorrow · 6:00 PM",
      status: "Milestone Reached",
    },
    {
      id: "cc4",
      clientName: "Rachel Chen",
      cohortOrType: "First-Gen Wealth Builder",
      wellnessScore: 810,
      activeStreakDays: 52,
      programTier: "1-on-1 Executive Coaching",
      nextSessionDate: "May 22 · 2:00 PM",
      status: "Optimal Streak",
    },
  ])

  // Sessions
  const [sessions] = useState<CoachingSessionItem[]>([
    {
      id: "cs1",
      clientName: "Jordan & Maya Lee",
      topic: "Debt Snowball Acceleration & Budget Surplus Reset",
      sessionTime: "Today · 11:00 AM",
      mode: "1-on-1 Video Session",
      status: "Confirmed",
      notes: "Eliminated credit card #1; transitioning $450/mo avalanche payment to auto loan.",
    },
    {
      id: "cs2",
      clientName: "Marcus & Priya Vance",
      topic: "First-Time Homebuyer Down Payment Savings Sprint",
      sessionTime: "Today · 3:30 PM",
      mode: "1-on-1 Video Session",
      status: "Prep Needed",
      notes: "Reviewing 12-month down payment target ($90,000); currently funded at 68%.",
    },
    {
      id: "cs3",
      clientName: "Cohort Alpha (Young Professionals)",
      topic: "Weekly Group Accountability & No-Spend Weekend Wins",
      sessionTime: "Tomorrow · 6:00 PM",
      mode: "Group Webinar (18 Mentees)",
      status: "Confirmed",
      notes: "Celebrating 14 mentees hitting $1,000 emergency fund cushion milestone.",
    },
  ])

  // Habits
  const [habits, setHabits] = useState<HabitTrackerItem[]>([
    { id: "h1", habitTitle: "Daily Micro-Expense Tracking", category: "Budgeting", frequency: "Daily", completionRate: 94, activeStreak: 38, targetCount: "30/30 Days" },
    { id: "h2", habitTitle: "Automated Weekly Wealth Paycheck Transfer", category: "Investing", frequency: "Weekly", completionRate: 100, activeStreak: 16, targetCount: "4/4 Weeks" },
    { id: "h3", habitTitle: "Zero Impulse Discretionary Spend Days", category: "Mindset", frequency: "3x / Week", completionRate: 86, activeStreak: 12, targetCount: "12/14 Days" },
    { id: "h4", habitTitle: "High-Interest Debt Extra Principal Payment", category: "Debt Reduction", frequency: "Monthly", completionRate: 100, activeStreak: 6, targetCount: "6/6 Months" },
  ])

  // Challenges
  const [challenges] = useState<ChallengeItem[]>([
    { id: "ch1", title: "The $1,000 Emergency Buffer Sprint", duration: "30 Days", participants: 42, totalSaved: 42000, status: "Active Sprint", description: "Build or rebuild your starter cash safety buffer using daily micro-savings." },
    { id: "ch2", title: "No-Dining-Out & Meal Prep Challenge", duration: "14 Days", participants: 28, totalSaved: 16800, status: "Active Sprint", description: "Cook at home and redirect dining budgets toward student loans or index funds." },
    { id: "ch3", title: "52-Week Incremental Savings Ladder", duration: "52 Weeks", participants: 64, totalSaved: 88400, status: "Active Sprint", description: "Save $1 in week 1, $2 in week 2, scaling up to $52 in week 52 ($1,378 total per mentee)." },
  ])

  // AI Coach Chat
  const [coachChat, setCoachChat] = useState<Array<{ sender: "ai" | "coach"; text: string }>>([
    {
      sender: "ai",
      text: "Hello Elena! I am your Sphere AI Coaching Assistant. I am tracking 72 mentees across your 1-on-1 practice and cohort groups. Jordan Lee eliminated their first high-interest card this week, and Cohort Alpha achieved a 94% habit compliance rate. How can I support your sessions today?",
    },
  ])
  const [coachInput, setCoachInput] = useState("")

  const handleSendCoachAi = (preset?: string) => {
    const q = preset || coachInput.trim()
    if (!q) return
    setCoachChat((prev) => [...prev, { sender: "coach", text: q }])
    if (!preset) setCoachInput("")

    setTimeout(() => {
      let reply = ""
      const lower = q.toLowerCase()
      if (lower.includes("jordan") || lower.includes("snowball") || lower.includes("debt")) {
        reply =
          "Session Prep for Jordan & Maya Lee (11:00 AM): They successfully paid off their $3,800 credit card balance! Action item for today: Channel the liberated $450/month minimum payment into their Auto Loan ($11,200 balance at 6.8%). This accelerates full debt freedom by 14 months and saves $1,420 in interest."
      } else if (lower.includes("prompt") || lower.includes("mindset") || lower.includes("therapy")) {
        reply =
          "Coaching Inquiries for Today's Review: 1) 'When money felt scarce growing up, what rule did you make for yourself that may no longer serve you?' 2) 'What would your daily routine feel like if your emergency fund was fully funded at 6 months of expenses?' 3) 'What is one purchase this month that gave you genuine alignment versus fleeting relief?'"
      } else if (lower.includes("cohort") || lower.includes("challenge")) {
        reply =
          "Cohort Alpha Performance: 14 out of 18 mentees have officially achieved the $1,000 emergency buffer milestone. Suggested celebration: Issue the 'First $1k Buffer' badge and kick off the '30-Day Subscriptions Audit' module next week."
      } else {
        reply = `Coaching insights compiled for: "${q}". Client habit data and wellness trajectory verified. Formulated personalized mentoring suggestions for your session.`
      }
      setCoachChat((prev) => [...prev, { sender: "ai", text: reply }])
    }, 500)
  }

  // =========================================================================
  // PAGE 1: CLIENTS
  // =========================================================================
  if (navId === "clients" || navName === "Clients") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">WEALTH COACH · MENTEE ROSTER</span>
            <div className="page-title">Coaching Clients & Cohorts</div>
            <div className="page-subtitle">
              Financial wellness index tracking, behavioral habit consistency scores, and milestone achievements.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Mentee Enrolled (Simulated)",
                    message: "Enrolled new client in 90-Day Financial Habit Transformation program.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Enroll New Mentee</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Coaching Roster</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Total Active Mentees</span>
            <div className="value">72 Clients</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>4 Cohorts + 28 1-on-1 Mentees</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Average Wellness Score"
            value="784 / 1000"
            detail="+38 points average improvement"
            trend="up"
            icon="sparkle"
            tone="blue"
          />
          <MetricCard
            label="Average Active Streak"
            value="34 Days 🔥"
            detail="Consistent daily budgeting habit"
            trend="up"
            icon="activity"
            tone="emerald"
          />
          <MetricCard
            label="Upcoming Sessions This Week"
            value="14 Sessions"
            detail="1-on-1s & group webinars"
            trend="neutral"
            icon="calendar"
            tone="gold"
          />
          <MetricCard
            label="Debt Eliminated (Practice)"
            value="$482,000"
            detail="Total debt cleared by mentees"
            trend="up"
            icon="wallet"
            tone="violet"
          />
        </section>

        <DataTable<CoachedClientItem>
          title="Master Coaching Roster & Habit Progress"
          subtitle="Real-time financial wellness indicators and streak tracking"
          columns={[
            {
              key: "clientName",
              header: "Mentee / Cohort",
              render: (r) => (
                <div>
                  <strong>{r.clientName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.cohortOrType} · {r.programTier}
                  </div>
                </div>
              ),
            },
            {
              key: "wellnessScore",
              header: "Wellness Score",
              render: (r) => (
                <strong>{r.wellnessScore} / 1000</strong>
              ),
            },
            {
              key: "activeStreakDays",
              header: "Habit Streak",
              render: (r) => (
                <span className="badge badge--success">{r.activeStreakDays} Days 🔥</span>
              ),
            },
            {
              key: "nextSessionDate",
              header: "Next Session",
              render: (r) => r.nextSessionDate,
            },
            {
              key: "status",
              header: "Coaching Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.status === "Optimal Streak"
                      ? "badge--success"
                      : r.status === "Milestone Reached"
                      ? "badge--warning"
                      : "badge--neutral"
                  }`}
                >
                  {r.status}
                </span>
              ),
            },
            {
              key: "action",
              header: "Session",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Session Brief Opened",
                      message: `Loaded behavioral wellness notes and milestone tracker for ${r.clientName}.`,
                      tone: "info",
                    })
                  }
                >
                  Open Brief
                </button>
              ),
            },
          ]}
          data={coachedClients}
        />

        {showExportModal && (
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            headers={["Client Name", "Cohort / Type", "Wellness Score", "Streak Days", "Tier", "Next Session"]}
            data={coachedClients.map((c) => [c.clientName, c.cohortOrType, c.wellnessScore, `${c.activeStreakDays} Days`, c.programTier, c.nextSessionDate])}
            defaultFilename="wealth-coach-mentees"
            title="Export Coaching Mentees"
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 2: COACHING SESSIONS
  // =========================================================================
  if (navId === "sessions" || navName === "Coaching Sessions") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">WEALTH COACH · SESSIONS STUDIO</span>
            <div className="page-title">Coaching Sessions & Video Consultations</div>
            <div className="page-subtitle">
              Schedule 1-on-1 breakthrough calls, review accountability agendas, and track homework action items.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowScheduleModal(true)}
              >
                <Icon name="calendar" size={16} />
                <span>Schedule Coaching Call</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Scheduled Today</span>
            <div className="value">2 Consultations</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>1 group cohort scheduled tomorrow</span>
            </div>
          </div>
        </section>

        <DataTable<CoachingSessionItem>
          title="Upcoming Coaching Sessions & Agendas"
          subtitle="One-on-one breakthrough coaching and cohort webinars"
          columns={[
            {
              key: "clientName",
              header: "Mentee / Group",
              render: (r) => (
                <div>
                  <strong>{r.clientName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.notes}
                  </div>
                </div>
              ),
            },
            {
              key: "topic",
              header: "Session Agenda",
              render: (r) => <span className="badge badge--neutral">{r.topic}</span>,
            },
            {
              key: "sessionTime",
              header: "Scheduled Time",
              render: (r) => (
                <div>
                  <strong>{r.sessionTime}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.mode}</div>
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
              key: "action",
              header: "Action",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Launching Session (Simulated)",
                      message: `Joined private coaching video room with ${r.clientName}.`,
                      tone: "success",
                    })
                  }
                >
                  Join Room
                </button>
              ),
            },
          ]}
          data={sessions}
        />

        {showScheduleModal && (
          <ScheduleMeetingModal
            isOpen={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
            onMeetingScheduled={(meeting) => {
              setShowScheduleModal(false)
              showToast({
                title: "Coaching Session Booked",
                message: `Scheduled ${meeting.type} for ${meeting.client}.`,
                tone: "success",
              })
            }}
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 3: FINANCIAL GOALS
  // =========================================================================
  if (navId === "goals" || navName === "Financial Goals") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">WEALTH COACH · BEHAVIORAL GOALS</span>
            <div className="page-title">Client Financial Goals & Roadmaps</div>
            <div className="page-subtitle">
              Emergency buffer sprints, debt avalanche roadmaps, down payment targets, and career transition funds.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowGoalModal(true)}
              >
                <Icon name="plus" size={16} />
                <span>Create Mentee Goal</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Goals Completed (YTD)</span>
            <div className="value">38 Milestones</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>88.4% on-time achievement rate</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Active Client Behavioral Goals</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { client: "Jordan & Maya Lee", goal: "Credit Card #1 Debt Free Sprint", current: "$3,800", target: "$3,800", pct: 100, status: "ACHIEVED 🎉" },
              { client: "Marcus & Priya Vance", goal: "Homebuyer Down Payment Reserve", current: "$61,200", target: "$90,000", pct: 68, status: "On Track" },
              { client: "Rachel Chen", goal: "6-Month Living Cost Safety Buffer", current: "$24,500", target: "$30,000", pct: 82, status: "On Track" },
              { client: "Cohort Alpha", goal: "Collective Emergency Cushion Sprints", current: "$42,000", target: "$50,000", pct: 84, status: "On Track" },
            ].map((g, idx) => (
              <div key={idx} style={{ padding: "0.75rem", borderRadius: "6px", background: "var(--color-bg-secondary, #f9fafb)", border: "1px solid var(--color-border, #eee)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <div>
                    <strong>{g.goal}</strong> · <span style={{ color: "var(--color-text-secondary)" }}>{g.client}</span>
                  </div>
                  <span className={`badge ${g.pct === 100 ? "badge--success" : "badge--warning"}`}>{g.status}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Progress ({g.pct}%)</span>
                  <span><strong>{g.current}</strong> / {g.target}</span>
                </div>
                <div style={{ background: "var(--color-bg-primary, #fff)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${g.pct}%`, background: g.pct === 100 ? "var(--color-success, #10b981)" : "var(--color-accent, #3b82f6)", height: "100%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showGoalModal && (
          <CreateGoalModal
            isOpen={showGoalModal}
            onClose={() => setShowGoalModal(false)}
            onGoalAdded={(newG) => {
              setShowGoalModal(false)
              showToast({
                title: "Goal Established",
                message: `Added behavioral target "${newG.name}" to coaching tracking dashboard.`,
                tone: "success",
              })
            }}
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 4: HABIT TRACKING
  // =========================================================================
  if (navId === "habits" || navName === "Habit Tracking") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">WEALTH COACH · HABIT ARCHITECTURE</span>
            <div className="page-title">Financial Habit Tracking & Consistency</div>
            <div className="page-subtitle">
              Daily micro-habits, expense recording streaks, automated savings transfers, and behavioral scorecards.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Streak Verified (+50 XP)",
                    message: "Verified weekly habit completion records for active cohorts.",
                    tone: "success",
                  })
                }
              >
                <Icon name="activity" size={16} />
                <span>Verify Habit Streaks</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Practice Habit Compliance</span>
            <div className="value">91.4% Rate</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Highest cohort compliance QTD</span>
            </div>
          </div>
        </section>

        <DataTable<HabitTrackerItem>
          title="Monitored Financial Habits & Streaks"
          subtitle="Core behavioral routines practiced across client cohorts"
          columns={[
            {
              key: "habitTitle",
              header: "Core Financial Habit",
              render: (r) => (
                <div>
                  <strong>{r.habitTitle}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    Target: {r.targetCount}
                  </div>
                </div>
              ),
            },
            {
              key: "category",
              header: "Habit Pillar",
              render: (r) => <span className="badge badge--neutral">{r.category}</span>,
            },
            {
              key: "frequency",
              header: "Cadence",
              render: (r) => r.frequency,
            },
            {
              key: "completionRate",
              header: "Cohort Compliance",
              render: (r) => (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span><strong>{r.completionRate}%</strong></span>
                  <div style={{ width: "60px", background: "#eee", height: "6px", borderRadius: "3px" }}>
                    <div style={{ width: `${r.completionRate}%`, background: "var(--color-success, #10b981)", height: "100%" }} />
                  </div>
                </div>
              ),
            },
            {
              key: "activeStreak",
              header: "Average Streak",
              render: (r) => <span className="badge badge--success">{r.activeStreak} Days 🔥</span>,
            },
          ]}
          data={habits}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 5: SAVINGS CHALLENGES
  // =========================================================================
  if (navId === "challenges" || navName === "Savings Challenges") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">WEALTH COACH · GAMIFIED SPRINT</span>
            <div className="page-title">Savings Challenges & Community Sprints</div>
            <div className="page-subtitle">
              Cohort savings competitions, no-spend weekend sprints, and peer leaderboard milestones.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Challenge Launched (Simulated)",
                    message: "Launched 30-Day Subscriptions Audit Sprint across 4 cohorts.",
                    tone: "success",
                  })
                }
              >
                <Icon name="sparkle" size={16} />
                <span>Launch New Sprint</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Total Sprinted Savings</span>
            <div className="value">$147,200</div>
            <div className="delta positive">
              <Icon name="wallet" size={14} />
              <span>134 total participant sprints completed</span>
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {challenges.map((ch) => (
            <div key={ch.id} className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span className="badge badge--neutral">{ch.duration}</span>
                  <span className="badge badge--success">{ch.status}</span>
                </div>
                <h4 style={{ margin: "0.25rem 0 0.5rem 0", fontSize: "1.1rem" }}>{ch.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.4, margin: "0 0 1rem 0" }}>
                  {ch.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", borderTop: "1px solid #eee", paddingTop: "0.75rem" }}>
                  <span>Participants: <strong>{ch.participants} Mentees</strong></span>
                  <span>Total Saved: <strong style={{ color: "var(--color-success, #10b981)" }}>${ch.totalSaved.toLocaleString()}</strong></span>
                </div>
              </div>

              <div style={{ marginTop: "1rem", borderTop: "1px solid var(--color-border, #eee)", paddingTop: "0.75rem" }}>
                <button
                  type="button"
                  className="button button--secondary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                  onClick={() =>
                    showToast({
                      title: "Leaderboard Updated",
                      message: `Viewing active participants and streak rankings for ${ch.title}.`,
                      tone: "info",
                    })
                  }
                >
                  View Sprint Leaderboard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 6: LEARNING RESOURCES
  // =========================================================================
  if (navId === "resources" || navName === "Learning Resources") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">WEALTH COACH · TOOLKITS & GUIDES</span>
            <div className="page-title">Curated Coaching Toolkits & Worksheets</div>
            <div className="page-subtitle">
              Financial psychology exercises, zero-based budgeting templates, values clarification cards, and habit journals.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Resource Shared (Simulated)",
                    message: "Dispatched 'Money Scripts & Financial Psychology Exercise' to Cohort Alpha.",
                    tone: "success",
                  })
                }
              >
                <Icon name="book" size={16} />
                <span>Assign Toolkit to Cohort</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Practice Library</span>
            <div className="value">24 Toolkits</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Full behavioral finance library</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Master Coaching Resources & Homework Toolkits"
          subtitle="Curated exercises and practical guides assigned to mentees"
          columns={[
            {
              key: "title",
              header: "Resource Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "category",
              header: "Focus Area",
              render: (r: any) => <span className="badge badge--neutral">{r.category}</span>,
            },
            {
              key: "format",
              header: "Format",
              render: (r: any) => r.format,
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
                      title: "Toolkit Downloaded",
                      message: `Downloaded ${r.title}.`,
                      tone: "info",
                    })
                  }
                >
                  Download PDF
                </button>
              ),
            },
          ]}
          data={[
            { title: "The Money Scripts Diagnostic (Klontz Money Script Inventory)", category: "Financial Psychology", format: "Interactive PDF Exercise" },
            { title: "Zero-Based Cash Flow Allocation & Buffer Sizing Model", category: "Budget Architecture", format: "Excel / Spreadsheet Model" },
            { title: "High-Interest Debt Snowball vs Avalanche Calculator", category: "Debt Elimination", format: "Web Calculator & Worksheet" },
            { title: "Core Financial Values & Milestone Prioritization Cards", category: "Values Clarification", format: "Printable Reflection Cards" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 7: AI COACHING ASSISTANT
  // =========================================================================
  if (navId === "ai_coach" || navName === "AI Coaching Assistant") {
    return (
      <div className="module-page">
        <section className="module-hero tone-purple">
          <div>
            <span className="eyebrow">WEALTH COACH · INTELLIGENT MENTOR</span>
            <div className="page-title">Sphere AI Coaching Co-Pilot & Behavioral Prompts</div>
            <div className="page-subtitle">
              Personalized motivation drafts, financial therapy inquiries, habit streak analysis, and debt payoff modeling.
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
            <span className="label">Coaching Intelligence</span>
            <div className="value">Sphere Coach-Pro</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>Behavioral economics & habit psychology engine</span>
            </div>
          </div>
        </section>

        {/* Shortcuts */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Recommended Coaching Inquiries:
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              "Prepare session brief for Jordan & Maya Lee debt payoff milestone",
              "Suggest 3 reflective inquiries for a client experiencing scarcity mindset",
              "Review Cohort Alpha weekly habit compliance metrics",
              "Draft celebration note for mentee completing $1k emergency buffer",
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="button button--ghost"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.65rem" }}
                onClick={() => handleSendCoachAi(p)}
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
            {coachChat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "coach" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background:
                    msg.sender === "coach"
                      ? "var(--color-accent, #3b82f6)"
                      : "var(--color-bg-secondary, #f3f4f6)",
                  color: msg.sender === "coach" ? "#fff" : "inherit",
                }}
              >
                <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.25rem" }}>
                  {msg.sender === "coach" ? "Elena Rostova, AFC®" : "Sphere AI Coaching Co-Pilot"}
                </div>
                <div style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendCoachAi()
            }}
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Ask Sphere AI to generate session prompts, analyze habit streaks, or draft client encouragement..."
              value={coachInput}
              onChange={(e) => setCoachInput(e.target.value)}
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
              <span>Ask Coach AI</span>
            </button>
          </form>
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 8: PROGRESS REPORTS
  // =========================================================================
  if (navId === "reports" || navName === "Progress Reports") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">WEALTH COACH · CLIENT TRANSFORMATION</span>
            <div className="page-title">Mentee Progress Reports & Wellness Trajectory</div>
            <div className="page-subtitle">
              Financial wellness score improvements, habit compliance trends, and total debt reduction achievements.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Report Exported",
                    message: "Exported Quarterly Mentee Transformation Deck PDF.",
                    tone: "success",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Export Progress Deck</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Practice Transformation</span>
            <div className="value">+38 Pts Wellness</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>Average score increase over 90 days</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Formal Client Progress Reports"
          subtitle="Signed wellness evaluations and milestone certificates"
          columns={[
            {
              key: "title",
              header: "Report Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "mentee",
              header: "Mentee / Cohort",
              render: (r: any) => r.mentee,
            },
            {
              key: "period",
              header: "Review Period",
              render: (r: any) => r.period,
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
                      title: "Download Initiated",
                      message: `Downloaded ${r.title} PDF.`,
                      tone: "info",
                    })
                  }
                >
                  Download PDF
                </button>
              ),
            },
          ]}
          data={[
            { title: "90-Day Financial Wellness Transformation Report", mentee: "Jordan & Maya Lee", period: "Q1 2025 Review" },
            { title: "Cohort Alpha Mid-Program Progress & Habit Benchmark", mentee: "Cohort Alpha (18 Mentees)", period: "Spring 2025" },
            { title: "First-Gen Wealth Builder Asset & Budget Blueprint", mentee: "Rachel Chen", period: "April 2025" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 9: SETTINGS
  // =========================================================================
  if (navId === "settings" || navName === "Settings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">WEALTH COACH · PRACTICE CONFIGURATION</span>
            <div className="page-title">Coaching Practice Profile & Availability</div>
            <div className="page-subtitle">
              Manage AFC® coaching credentials, scheduling links, cohort tier parameters, and mentee reminder automations.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Settings Saved",
                    message: "Coaching profile, booking availability, and cohort rules saved.",
                    tone: "success",
                  })
                }
              >
                <Icon name="check" size={16} />
                <span>Save Practice Settings</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Accreditation</span>
            <div className="value">AFC® Accredited</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Association for Financial Counseling (AFCPE)</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Master Wealth Coach Profile</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Coach Name</label>
              <input
                type="text"
                defaultValue="Elena Rostova, AFC®, FFC®"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Practice Studio Name</label>
              <input
                type="text"
                defaultValue="Rostova Wealth Coaching & Habit Studio"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Active Client Capacity</label>
              <input
                type="text"
                defaultValue="75 Mentees Max (Current: 72 Enrolled)"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
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
          <span className="eyebrow">WEALTH COACH</span>
          <div className="page-title">{navName || "Coaching Module"}</div>
          <div className="page-subtitle">Client coaching, financial habits, savings challenges, and wellness milestones.</div>
        </div>
      </section>
      <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
        <p>This coaching module is ready. Select an item from the sidebar to continue.</p>
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
