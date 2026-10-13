import { useState } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { CreateGoalModal } from "../../components/modals/CreateGoalModal"
import { ExportModal } from "../../components/modals/ExportModal"
import type { MockGoal } from "../../services/mockData"

export interface StudentDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function StudentDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: StudentDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] =
    useState<"courses" | "assessments" | "achievements">("courses")
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Student savings goals
  const studentGoals = [
    {
      id: "sg1",
      name: "Starter Emergency Cushion",
      category: "Safety Buffer",
      current: "$1,560",
      target: "$2,000",
      pct: 78,
      status: "On Track",
    },
    {
      id: "sg2",
      name: "Laptop & Engineering Tool Upgrade",
      category: "Tech Hardware",
      current: "$1,380",
      target: "$1,500",
      pct: 92,
      status: "Almost Funded",
    },
    {
      id: "sg3",
      name: "Summer Study Abroad Experience",
      category: "Global Education",
      current: "$1,800",
      target: "$4,000",
      pct: 45,
      status: "In Progress",
    },
    {
      id: "sg4",
      name: "Post-Grad Apartment Lease Deposit",
      category: "Housing",
      current: "$900",
      target: "$1,200",
      pct: 75,
      status: "On Track",
    },
  ]

  const [goalsList, setGoalsList] = useState(studentGoals)

  // Courses mock data
  const courses = [
    {
      id: "c1",
      title: "Mastering Personal Wealth & Investing",
      level: "Intermediate",
      modules: "8 of 12 modules completed",
      pct: 68,
      icon: "pie",
      active: true,
    },
    {
      id: "c2",
      title: "Student Loan Amortization & Repayment",
      level: "Essential",
      modules: "6 of 6 modules completed",
      pct: 100,
      icon: "card",
      active: false,
    },
    {
      id: "c3",
      title: "Credit Mechanics & Safe Card Building",
      level: "Foundational",
      modules: "4 of 4 modules completed",
      pct: 100,
      icon: "shield",
      active: false,
    },
    {
      id: "c4",
      title: "Cryptocurrency & Digital Assets 101",
      level: "Elective",
      modules: "2 of 5 modules completed",
      pct: 40,
      icon: "globe",
      active: false,
    },
  ]

  // Assessments mock data
  const assessments = [
    {
      id: "a1",
      title: "Personal Taxation & 1099 Filing Basics",
      score: "94%",
      grade: "Grade A",
      date: "May 08, 2025",
      status: "Passed",
    },
    {
      id: "a2",
      title: "Zero-Based Campus Budgeting",
      score: "88%",
      grade: "Grade B+",
      date: "Apr 24, 2025",
      status: "Passed",
    },
    {
      id: "a3",
      title: "Compound Interest & Dollar-Cost Averaging",
      score: "96%",
      grade: "Grade A+",
      date: "Apr 12, 2025",
      status: "Passed",
    },
  ]

  // Achievements mock data
  const achievements = [
    {
      id: "ach1",
      title: "Zero Overdraft Streak",
      desc: "6 consecutive months with positive cash flow",
      icon: "wallet",
      tone: "gold",
    },
    {
      id: "ach2",
      title: "First $1,000 Saved",
      desc: "Emergency starter fund milestone achieved",
      icon: "shield",
      tone: "emerald",
    },
    {
      id: "ach3",
      title: "Grant Hunter",
      desc: "Secured over $14,000 in university scholarship aid",
      icon: "sparkle",
      tone: "violet",
    },
    {
      id: "ach4",
      title: "Credit Score Pioneer",
      desc: "Credit score reached 715 before graduation",
      icon: "activity",
      tone: "blue",
    },
    {
      id: "ach5",
      title: "Triple Assessment Master",
      desc: "Scored >85% on three consecutive exams",
      icon: "book",
      tone: "gold",
    },
    {
      id: "ach6",
      title: "Compound Investor",
      desc: "Opened first Roth IRA retirement account",
      icon: "trending",
      tone: "emerald",
    },
  ]

  // Student loan & aid table
  const loanAidRows = [
    {
      id: "1",
      col1: "Federal Direct Subsidized Loan",
      col2: "US Dept of Education",
      col3: "3.73% Fixed",
      col4: "$12,500",
      status: "In Deferment",
      statusTone: "success",
    },
    {
      id: "2",
      col1: "Federal Direct Unsubsidized Loan",
      col2: "US Dept of Education",
      col3: "4.99% Fixed",
      col4: "$16,000",
      status: "In Deferment",
      statusTone: "success",
    },
    {
      id: "3",
      col1: "STEM Academic Merit Scholarship",
      col2: "University Foundation",
      col3: "Grant (0% Repay)",
      col4: "-$8,500 (Credited)",
      status: "Disbursed",
      statusTone: "info",
    },
    {
      id: "4",
      col1: "Campus Research Work-Study",
      col2: "Engineering Dept",
      col3: "Hourly Stipend",
      col4: "+$1,200 / Month",
      status: "Active",
      statusTone: "success",
    },
  ]

  const loanAidColumns = [
    { key: "col1", header: "Funding / Debt Account" },
    { key: "col2", header: "Provider / Source" },
    { key: "col3", header: "Interest / Term" },
    { key: "col4", header: "Balance / Award" },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone || "neutral"}`}>
          {row.status}
        </span>
      ),
    },
  ]

  return (
    <div className="role-dashboard student-dashboard">
      {/* 1. Header Greeting & Telemetry */}
      <section className="dashboard-header-container">
        <div className="header-meta">
          <div className="header-date-row">
            <span className="header-eyebrow">MONDAY, 12 MAY</span>
            <span className="header-separator">•</span>
            <span className="header-status-pill">
              <span className="live-indicator-dot" /> 18-Day Learning Streak
            </span>
            <span className="header-role-pill">
              <Icon name="book" size={13} /> Jordan Lee · Undergraduate Scholar
            </span>
          </div>
          <h1 className="header-greeting">Student Launchpad & Capability</h1>
          <p className="header-subtitle">
            Budget surplus is <b>+$420</b> this month. You are{" "}
            <b>68% complete</b> with your Wealth Foundations certificate.
          </p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="button button--primary header-primary-btn"
            onClick={() => {
              showToast({
                title: "Course Session Loaded",
                message:
                  "Resuming 'Mastering Personal Wealth & Investing' - Module 9: Tax-Advantaged Compounding.",
                tone: "info",
              })
              onNavigate("Learn Finance")
            }}
          >
            <Icon name="book" size={16} />
            <span>Continue Course</span>
          </button>
        </div>
      </section>

      {/* 2. Key Student Metrics */}
      <section className="metric-grid" aria-label="Student Financial KPIs">
        <MetricCard
          label="Total Student Loans"
          value="$28,500"
          detail="4.2% Avg Interest · In Deferment"
          icon="card"
          tone="gold"
          trend="down"
        />
        <MetricCard
          label="Monthly Cash Surplus"
          value="+$420"
          detail="Stipend & Campus Job Surplus"
          icon="wallet"
          tone="emerald"
        />
        <MetricCard
          label="Financial Literacy Index"
          value="740 / 1000"
          detail="Level 3 Scholar · Top 10% Campus"
          icon="activity"
          tone="blue"
        />
        <MetricCard
          label="Awarded Scholarship Aid"
          value="$14,200"
          detail="Covers 62% of Annual Tuition"
          icon="sparkle"
          tone="violet"
        />
      </section>

      {/* 3. Student Budget & Spending Breakdown Ribbon */}
      <section className="cashflow-ribbon card">
        <div className="ribbon-item">
          <span className="ribbon-label">Monthly Total Inflow</span>
          <strong className="ribbon-val text-emerald">$1,800/mo</strong>
          <span className="ribbon-sub">Stipend, Campus Job & Aid</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item">
          <span className="ribbon-label">Monthly Total Spending</span>
          <strong className="ribbon-val">$1,380/mo</strong>
          <span className="ribbon-sub">Dorm, Dining & Books</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item">
          <span className="ribbon-label">Monthly Surplus Saved</span>
          <strong className="ribbon-val text-emerald">+$420/mo</strong>
          <span className="ribbon-sub">Sent to High-Yield Savings</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item highlighted">
          <span className="ribbon-label">Credit Foundation Score</span>
          <strong className="ribbon-val rate-badge">715 FICO</strong>
          <span className="ribbon-sub">+24 pts in past 6 months</span>
        </div>
      </section>

      {/* 4. Quick Actions */}
      <QuickActions
        actions={roleConfig.quickActions}
        roleConfig={roleConfig}
        onExecuteAction={(action) => {
          if (action.id === "log_expense") {
            showToast({
              title: "Expense Log",
              message: "Opening campus zero-based budget logging view.",
              tone: "info",
            })
            onNavigate("My Budget")
          } else if (action.id === "simulate_payoff") {
            showToast({
              title: "Amortization Simulator",
              message:
                "Simulated extra $50/mo accelerated repayment saves $1,420 in accrued interest.",
              tone: "info",
            })
            onNavigate("Student Loans")
          } else if (action.id === "find_grants") {
            showToast({
              title: "Scholarship Radar",
              message:
                "3 active university STEM scholarship deadlines found within the next 45 days.",
              tone: "info",
            })
            onNavigate("Savings Goals")
          } else {
            onNavigate("Learn Finance")
          }
        }}
      />

      {/* 5. Spending Breakdown & Active Course Progress Grid */}
      <section className="dashboard-grid">
        {/* Spending Category Breakdown */}
        <div className="card spending-breakdown-card">
          <div className="card-head">
            <div>
              <span className="card-title">Monthly Spending Breakdown</span>
              <span className="card-sub">$1,380 Total Expenses Tracked</span>
            </div>
            <button
              type="button"
              className="button button--icon"
              onClick={() => onNavigate("My Budget")}
              aria-label="View budget"
            >
              <Icon name="more" size={16} />
            </button>
          </div>

          <div className="spending-category-bars">
            {[
              {
                label: "Tuition & Textbooks",
                amount: "$480",
                pct: 35,
                color: "emerald",
              },
              {
                label: "Campus Housing & Dorm",
                amount: "$420",
                pct: 30,
                color: "navy",
              },
              {
                label: "Meal Plan & Dining",
                amount: "$280",
                pct: 20,
                color: "violet",
              },
              {
                label: "Transit & Technology",
                amount: "$200",
                pct: 15,
                color: "gold",
              },
            ].map((cat) => (
              <div key={cat.label} className="cat-row">
                <div className="cat-meta">
                  <span className="cat-name">{cat.label}</span>
                  <div className="cat-vals">
                    <b>{cat.amount}</b>
                    <small>({cat.pct}%)</small>
                  </div>
                </div>
                <div className="cat-track">
                  <div
                    className={`cat-fill ${cat.color}`}
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="spending-advice-tip">
            <Icon name="sparkle" size={16} />
            <span>
              Sphere AI Tip: You saved $65 by renting digital textbooks this
              semester.
            </span>
          </div>
        </div>

        {/* Featured Course Progress Card */}
        <div className="card academy-feature-card">
          <div className="feature-top-badge">
            <span className="badge badge--warning">IN PROGRESS · MODULE 8</span>
          </div>
          <div className="feature-course-body">
            <h3 className="course-main-title">
              Mastering Personal Wealth & Investing
            </h3>
            <p className="course-main-desc">
              Understand dollar-cost averaging, emergency reserves,
              tax-advantaged Roth IRAs, and compounding.
            </p>

            <div className="course-progress-block">
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: "68%" }} />
              </div>
              <div className="progress-label-row">
                <span>8 of 12 Modules Completed</span>
                <b>68%</b>
              </div>
            </div>

            <button
              type="button"
              className="button button--primary course-action-btn"
              onClick={() => {
                showToast({
                  title: "Interactive Lesson Resumed",
                  message:
                    "Launching Module 9: Dollar-Cost Averaging & Index Funds simulation.",
                  tone: "info",
                })
                onNavigate("Courses")
              }}
            >
              <span>Continue Learning (15 min)</span>
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Education Hub: Courses, Assessments & Achievements Tabs */}
      <section className="card education-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">
              WealthSphere Student Academy & Credentials
            </span>
            <span className="card-sub">
              Accredited personal finance curriculum and verified achievements
            </span>
          </div>
          <div className="period-tabs">
            <button
              type="button"
              className={activeTab === "courses" ? "active" : ""}
              onClick={() => setActiveTab("courses")}
            >
              Courses ({courses.length})
            </button>
            <button
              type="button"
              className={activeTab === "assessments" ? "active" : ""}
              onClick={() => setActiveTab("assessments")}
            >
              Assessments ({assessments.length})
            </button>
            <button
              type="button"
              className={activeTab === "achievements" ? "active" : ""}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements ({achievements.length})
            </button>
          </div>
        </div>

        {activeTab === "courses" && (
          <div className="courses-grid-layout">
            {courses.map((c) => (
              <div key={c.id} className="course-mini-card">
                <div className="course-mini-top">
                  <span className="course-mini-icon">
                    <Icon name={c.icon as any} size={18} />
                  </span>
                  <span
                    className={`badge badge--${
                      c.pct === 100 ? "success" : "info"
                    }`}
                  >
                    {c.pct === 100 ? "Completed" : c.level}
                  </span>
                </div>
                <strong className="course-mini-title">{c.title}</strong>
                <span className="course-mini-modules">{c.modules}</span>
                <div className="course-mini-bar">
                  <div className="track">
                    <div className="fill" style={{ width: `${c.pct}%` }} />
                  </div>
                  <b>{c.pct}%</b>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "assessments" && (
          <div className="assessments-list-layout">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th>Assessment Topic</th>
                  <th>Date Taken</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <b>{a.title}</b>
                    </td>
                    <td>{a.date}</td>
                    <td>
                      <strong className="text-emerald">{a.score}</strong>
                    </td>
                    <td>
                      <span className="badge badge--success">{a.grade}</span>
                    </td>
                    <td>
                      <span className="badge badge--success">{a.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="achievements-shelf-grid">
            {achievements.map((ach) => (
              <div key={ach.id} className="achievement-badge-card">
                <div className={`achievement-icon-wrap ${ach.tone}`}>
                  <Icon name={ach.icon as any} size={22} />
                </div>
                <strong className="achievement-title">{ach.title}</strong>
                <p className="achievement-desc">{ach.desc}</p>
                <span className="badge badge--success">UNLOCKED</span>
              </div>
            ))}
          </div>
        )}

        {/* Blockchain Verified Credential Certificate */}
        <div
          className="certificate-banner"
          style={{ cursor: "pointer" }}
          onClick={() => {
            showToast({
              title: "Credential Cryptographically Attested",
              message:
                "Ethereum Hash: 0x8f2a49b01c... verified by WealthSphere Academic Council.",
              tone: "success",
            })
          }}
        >
          <div className="cert-seal">
            <Icon name="shield" size={28} />
          </div>
          <div className="cert-details">
            <span className="badge badge--success">
              BLOCKCHAIN VERIFIED MICRO-CREDENTIAL
            </span>
            <h4 className="cert-title">Certified Wealth Foundations</h4>
            <p className="cert-sub">
              Credential WS-284-19A · Issued to <b>Jordan Lee</b> on 18 April
              2025 · Verified by WealthSphere Academic Council
            </p>
          </div>
          <div className="cert-qr-box">
            <span>WS</span>
            <small>VERIFIED</small>
          </div>
        </div>
      </section>

      {/* 7. Student Savings Goals */}
      <section className="goals-section card">
        <div className="card-head">
          <div>
            <span className="card-title">Student Savings Goals</span>
            <span className="card-sub">
              Stipend automated allocation targets
            </span>
          </div>
          <button
            type="button"
            className="button button--secondary button--sm"
            onClick={() => setShowGoalModal(true)}
          >
            <Icon name="plus" size={14} />
            <span>New Savings Goal</span>
          </button>
        </div>

        <div className="goals-grid">
          {goalsList.map((sg) => (
            <div key={sg.id} className="goal-card">
              <div className="goal-top">
                <span className="badge badge--info">{sg.category}</span>
                <span className="goal-deadline">{sg.status}</span>
              </div>
              <strong className="goal-name">{sg.name}</strong>
              <div className="goal-amounts">
                <span>
                  Saved: <b>{sg.current}</b>
                </span>
                <span>
                  Target: <b>{sg.target}</b>
                </span>
              </div>
              <div className="goal-progress-bar">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${sg.pct}%` }}
                  />
                </div>
                <div className="progress-info">
                  <span>Progress</span>
                  <strong>{sg.pct}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Education Debt & Scholarship Aid Schedule Table */}
      <section className="dashboard-table-section">
        <DataTable
          title="Education Debt & Aid Schedule"
          subtitle="Federal loans, institutional aid, work-study stipends, and repayment amortization"
          columns={loanAidColumns}
          data={loanAidRows}
          searchPlaceholder="Search loans or grants…"
          actionButton={{
            label: "Export Aid & Loan Schedule CSV",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      <CreateGoalModal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onGoalAdded={(goal: MockGoal) => {
          setGoalsList((prev) => [
            {
              id: goal.id,
              name: goal.name,
              category: goal.category,
              current: `$${goal.currentAmount.toLocaleString()}`,
              target: `$${goal.targetAmount.toLocaleString()}`,
              pct: Math.min(
                100,
                Math.round((goal.currentAmount / goal.targetAmount) * 100),
              ),
              status: "In Progress",
            },
            ...prev,
          ])
          showToast({
            title: "Savings Goal Created",
            message: `Goal "${goal.name}" established with target $${goal.targetAmount.toLocaleString()}.`,
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Education Debt & Aid Schedule"
        defaultFilename="student_debt_aid_schedule.csv"
        headers={[
          "Funding / Debt Account",
          "Provider / Source",
          "Interest / Term",
          "Balance / Award",
          "Status",
        ]}
        data={loanAidRows.map((r) => [
          r.col1,
          r.col2,
          r.col3,
          r.col4,
          r.status,
        ])}
      />
    </div>
  )
}

export default StudentDashboard
