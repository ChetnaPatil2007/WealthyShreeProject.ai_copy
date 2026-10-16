import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface CorporateHRPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface WorkforceEmployeeItem {
  id: string
  employeeCode: string
  department: "Engineering" | "Product & Design" | "Sales & Marketing" | "Customer Operations" | "General & Admin"
  tenure: string
  planEnrollment: "Enrolled 100% Match" | "Enrolled Standard" | "Auto-Enroll Pending" | "Opted Out"
  wellnessTier: "Champion (Level 3)" | "Active (Level 2)" | "Foundational (Level 1)"
  hsaParticipation: "Active Max Contributor" | "Standard Contributor" | "Not Enrolled"
  lastEngaged: string
}

interface WellnessProgramItem {
  id: string
  title: string
  category: "Retirement & 401(k)" | "Emergency Savings" | "Student Loan Assistance" | "Financial Coaching" | "Homeownership"
  enrolledCount: number
  totalWorkforce: number
  satisfactionRate: number
  budgetAllocated: string
  budgetSpent: string
  status: "Active Program" | "Pilot Cohort" | "Annual Refresh Due"
}

interface FinancialEducationCourseItem {
  id: string
  courseTitle: string
  curriculumCategory: "RSU & Equity Compensation" | "Tax Optimization & HSA" | "Debt Reduction & Budgeting" | "Retirement Horizons"
  modulesCount: number
  avgCompletionTime: string
  employeesCompleted: number
  efficacyScore: number
  status: "Recommended Core" | "Elective Specialized"
}

interface WorkshopScheduleItem {
  id: string
  title: string
  instructor: string
  date: string
  time: string
  mode: "Virtual Broadcast" | "Hybrid Interactive" | "On-Site Town Hall"
  attendeesRegistered: number
  capacity: number
  status: "Registration Open" | "Fully Booked" | "Completed"
}

export function CorporateHRModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: CorporateHRPageProps) {
  const { showToast } = useToast()
  const [showExportModal, setShowExportModal] = useState(false)

  // 1. Employees Roster State (Privacy-Preserved)
  const [employees, setEmployees] = useState<WorkforceEmployeeItem[]>([
    {
      id: "emp-101",
      employeeCode: "EMP-4091",
      department: "Engineering",
      tenure: "3.2 Years",
      planEnrollment: "Enrolled 100% Match",
      wellnessTier: "Champion (Level 3)",
      hsaParticipation: "Active Max Contributor",
      lastEngaged: "Today",
    },
    {
      id: "emp-102",
      employeeCode: "EMP-4112",
      department: "Sales & Marketing",
      tenure: "1.8 Years",
      planEnrollment: "Enrolled 100% Match",
      wellnessTier: "Active (Level 2)",
      hsaParticipation: "Standard Contributor",
      lastEngaged: "2 days ago",
    },
    {
      id: "emp-103",
      employeeCode: "EMP-4185",
      department: "Product & Design",
      tenure: "4.5 Years",
      planEnrollment: "Enrolled 100% Match",
      wellnessTier: "Champion (Level 3)",
      hsaParticipation: "Active Max Contributor",
      lastEngaged: "Yesterday",
    },
    {
      id: "emp-104",
      employeeCode: "EMP-4210",
      department: "Customer Operations",
      tenure: "0.8 Years",
      planEnrollment: "Auto-Enroll Pending",
      wellnessTier: "Foundational (Level 1)",
      hsaParticipation: "Standard Contributor",
      lastEngaged: "5 days ago",
    },
    {
      id: "emp-105",
      employeeCode: "EMP-4299",
      department: "General & Admin",
      tenure: "2.1 Years",
      planEnrollment: "Enrolled Standard",
      wellnessTier: "Active (Level 2)",
      hsaParticipation: "Standard Contributor",
      lastEngaged: "1 week ago",
    },
  ])
  const [deptFilter, setDeptFilter] = useState("All")

  // 2. Wellness Programs State
  const [programs] = useState<WellnessProgramItem[]>([
    {
      id: "wp-1",
      title: "Enterprise 401(k) True-Up & Match Optimization",
      category: "Retirement & 401(k)",
      enrolledCount: 4680,
      totalWorkforce: 4850,
      satisfactionRate: 96.4,
      budgetAllocated: "$14.2M Match",
      budgetSpent: "$13.8M Disbursed",
      status: "Active Program",
    },
    {
      id: "wp-2",
      title: "Employer Emergency Buffer Match ($500 Stipend)",
      category: "Emergency Savings",
      enrolledCount: 3820,
      totalWorkforce: 4850,
      satisfactionRate: 98.1,
      budgetAllocated: "$1.9M Direct Grant",
      budgetSpent: "$1.6M Matched",
      status: "Active Program",
    },
    {
      id: "wp-3",
      title: "Student Loan Direct Amortization Subsidy",
      category: "Student Loan Assistance",
      enrolledCount: 1420,
      totalWorkforce: 4850,
      satisfactionRate: 94.7,
      budgetAllocated: "$2.5M CARES Act",
      budgetSpent: "$2.2M Paid",
      status: "Active Program",
    },
    {
      id: "wp-4",
      title: "1-on-1 Confidential CFP® Financial Coaching",
      category: "Financial Coaching",
      enrolledCount: 2150,
      totalWorkforce: 4850,
      satisfactionRate: 97.8,
      budgetAllocated: "$600K Retainer",
      budgetSpent: "$540K Utilized",
      status: "Active Program",
    },
  ])

  // 3. Courses State
  const [courses] = useState<FinancialEducationCourseItem[]>([
    {
      id: "crs-1",
      courseTitle: "Navigating Equity: RSUs, ISOs & Tax Strategies",
      curriculumCategory: "RSU & Equity Compensation",
      modulesCount: 4,
      avgCompletionTime: "45 mins",
      employeesCompleted: 2840,
      efficacyScore: 94.8,
      status: "Recommended Core",
    },
    {
      id: "crs-2",
      courseTitle: "The Triple-Tax Advantage: Maximizing Your HSA",
      curriculumCategory: "Tax Optimization & HSA",
      modulesCount: 3,
      avgCompletionTime: "30 mins",
      employeesCompleted: 3410,
      efficacyScore: 96.2,
      status: "Recommended Core",
    },
    {
      id: "crs-3",
      courseTitle: "First-Time Homebuying & Mortgage Architecture",
      curriculumCategory: "Debt Reduction & Budgeting",
      modulesCount: 5,
      avgCompletionTime: "60 mins",
      employeesCompleted: 1680,
      efficacyScore: 91.5,
      status: "Elective Specialized",
    },
    {
      id: "crs-4",
      courseTitle: "Retirement Horizons: Pre-Retirement Milestone Plan",
      curriculumCategory: "Retirement Horizons",
      modulesCount: 4,
      avgCompletionTime: "50 mins",
      employeesCompleted: 980,
      efficacyScore: 95.0,
      status: "Elective Specialized",
    },
  ])

  // 4. Workshops State
  const [workshops, setWorkshops] = useState<WorkshopScheduleItem[]>([
    {
      id: "ws-1",
      title: "Annual Open Enrollment & Benefits Deep Dive",
      instructor: "Karen Mitchell (VP People) & Principal Actuary",
      date: "Oct 24, 2026",
      time: "1:00 PM EST",
      mode: "Virtual Broadcast",
      attendeesRegistered: 1840,
      capacity: 3000,
      status: "Registration Open",
    },
    {
      id: "ws-2",
      title: "Understanding Your Stock Options & RSU Vesting Windows",
      instructor: "Senior Wealth Coach & Equity Counsel",
      date: "Nov 05, 2026",
      time: "2:00 PM EST",
      mode: "Hybrid Interactive",
      attendeesRegistered: 480,
      capacity: 500,
      status: "Registration Open",
    },
    {
      id: "ws-3",
      title: "Family Budgeting & Navigating Inflationary Pressures",
      instructor: "Accredited Financial Counselor (AFC®)",
      date: "Nov 19, 2026",
      time: "12:00 PM EST",
      mode: "Virtual Broadcast",
      attendeesRegistered: 820,
      capacity: 1000,
      status: "Registration Open",
    },
  ])

  // Communications Broadcast State
  const [broadcastSubject, setBroadcastSubject] = useState("Important: Open Enrollment & 401(k) Company Match Reminder")
  const [broadcastAudience, setBroadcastAudience] = useState("All Active Employees (4,850)")

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    showToast({
      title: "Enterprise Broadcast Dispatched",
      message: `Notification sent to ${broadcastAudience}. Open tracking initialized.`,
      tone: "success",
    })
  }

  const handleRegisterWorkshop = (wsId: string) => {
    setWorkshops((prev) =>
      prev.map((w) =>
        w.id === wsId
          ? {
              ...w,
              attendeesRegistered: Math.min(w.capacity, w.attendeesRegistered + 1),
            }
          : w,
      ),
    )
    showToast({
      title: "Workshop Reservation Confirmed",
      message: "Calendar invite and prep materials sent to attendee inbox.",
      tone: "success",
    })
  }

  // Filter employees
  const filteredEmployees = useMemo(() => {
    if (deptFilter === "All") return employees
    return employees.filter((e) => e.department.includes(deptFilter))
  }, [employees, deptFilter])

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
            <span className="badge badge--navy" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
              ENTERPRISE TOTAL REWARDS & PEOPLE OPS
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              Workforce Financial Wellness Console · 4,850 Employees
            </span>
          </div>
          <h1 style={{ font: "700 26px 'Manrope', sans-serif", color: "var(--ink)", margin: 0 }}>
            {navName}
          </h1>
          <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "13.5px" }}>
            Workforce financial health analytics, 401(k) engagement, financial literacy curriculum, and privacy-first reporting.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowExportModal(true)}
          >
            <Icon name="document" size={15} />
            Export Wellness Data
          </button>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => {
              showToast({
                title: "ERISA 5500 Pre-Check Complete",
                message: "Nondiscrimination testing passes ADP/ACP tests across all workforce cohorts.",
                tone: "success",
              })
            }}
          >
            <Icon name="shield" size={15} />
            Run ERISA Pre-Check
          </button>
        </div>
      </div>

      {/* 1. EMPLOYEES (Privacy Protected) */}
      {navId === "employees" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Enrolled Workforce"
              value="4,850 Staff"
              detail="98.4% Total Participation"
              icon="user"
              tone="navy"
            />
            <MetricCard
              label="401(k) Company Match"
              value="96.2% Maxed"
              detail="Receiving 100% Employer Match"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="HSA Enrolled Staff"
              value="78.5% Active"
              detail="3,807 High-Deductible Health Plans"
              icon="check"
              tone="blue"
            />
            <MetricCard
              label="Privacy Safeguard"
              value="HIPAA / SOC 2"
              detail="Zero individual balance disclosure"
              icon="shield"
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
                gap: "12px",
              }}
            >
              <div>
                <h3 className="card-title" style={{ margin: 0 }}>
                  Workforce Wellness Participation Registry
                </h3>
                <span className="card-sub">
                  Anonymized cohort tracking for employee benefits engagement and plan health.
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                {["All", "Engineering", "Sales", "Product", "Operations"].map((dept) => (
                  <button
                    key={dept}
                    className={`btn ${deptFilter === dept ? "btn-primary" : "btn-outline"}`}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                    onClick={() => setDeptFilter(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            <DataTable
              title="Workforce Cohorts"
              data={filteredEmployees}
              columns={[
                {
                  key: "employeeCode",
                  header: "Employee ID & Dept",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.employeeCode}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.department}</span>
                    </div>
                  ),
                },
                {
                  key: "tenure",
                  header: "Tenure",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.tenure}</span>,
                },
                {
                  key: "planEnrollment",
                  header: "401(k) Match Status",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.planEnrollment.includes("100%")
                          ? "badge--success"
                          : row.planEnrollment.includes("Standard")
                          ? "badge--blue"
                          : "badge--warning"
                      }`}
                    >
                      {row.planEnrollment}
                    </span>
                  ),
                },
                {
                  key: "wellnessTier",
                  header: "Financial Wellness Level",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.wellnessTier.includes("Champion")
                          ? "badge--gold"
                          : row.wellnessTier.includes("Active")
                          ? "badge--navy"
                          : "badge--info"
                      }`}
                    >
                      {row.wellnessTier}
                    </span>
                  ),
                },
                {
                  key: "hsaParticipation",
                  header: "HSA Status",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.hsaParticipation}</span>
                  ),
                },
                {
                  key: "lastEngaged",
                  header: "Last Activity",
                  render: (row) => (
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.lastEngaged}</span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 2. WELLNESS PROGRAMS */}
      {navId === "wellness_programs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Active Programs"
              value="4 Core Tracks"
              detail="Retirement, Debt, HSA & Coaching"
              icon="activity"
              tone="navy"
            />
            <MetricCard
              label="Aggregate Budget Spent"
              value="$18.14M YTD"
              detail="Total Benefits Realized by Staff"
              icon="wallet"
              tone="emerald"
            />
            <MetricCard
              label="Staff Satisfaction"
              value="96.8% Positive"
              detail="Annual Benefits Survey"
              icon="sparkle"
              tone="gold"
            />
            <MetricCard
              label="Workforce Retention ROI"
              value="+14% Lift"
              detail="Compared to Non-Participants"
              icon="trending"
              tone="blue"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Enterprise Financial Wellness Programs Portfolio
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Corporate subsidies, emergency matching grants, and coaching utilization across the enterprise.
            </p>

            <DataTable
              title="Programs"
              data={programs}
              columns={[
                {
                  key: "title",
                  header: "Program Title & Category",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.category}</span>
                    </div>
                  ),
                },
                {
                  key: "enrolledCount",
                  header: "Enrolled Employees",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>{row.enrolledCount.toLocaleString()}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        {((row.enrolledCount / row.totalWorkforce) * 100).toFixed(1)}% of workforce
                      </span>
                    </div>
                  ),
                },
                {
                  key: "budgetAllocated",
                  header: "Budget Allocation / Spent",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--ink)", fontWeight: 600 }}>{row.budgetSpent}</span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        Cap: {row.budgetAllocated}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "satisfactionRate",
                  header: "Satisfaction",
                  render: (row) => (
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                      {row.satisfactionRate}%
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Program Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 3. FINANCIAL EDUCATION */}
      {navId === "financial_education" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Learning Curriculum"
              value="4 Core Courses"
              detail="16 Interactive Micro-Modules"
              icon="book"
              tone="navy"
            />
            <MetricCard
              label="Total Completions"
              value="8,910 Modules"
              detail="+1,240 Completed This Quarter"
              icon="check"
              tone="emerald"
            />
            <MetricCard
              label="Average Mastery Score"
              value="94.4% Score"
              detail="Knowledge Retention Check"
              icon="sparkle"
              tone="gold"
            />
            <MetricCard
              label="Avg Time to Complete"
              value="42 Minutes"
              detail="Bite-Sized Modular Learning"
              icon="activity"
              tone="blue"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              On-Demand Enterprise Financial Education Catalog
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Self-paced interactive learning modules designed for employees across career stages.
            </p>

            <DataTable
              title="Curriculum"
              data={courses}
              columns={[
                {
                  key: "courseTitle",
                  header: "Course Name & Category",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.courseTitle}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.curriculumCategory}</span>
                    </div>
                  ),
                },
                {
                  key: "modulesCount",
                  header: "Modules & Duration",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>
                      {row.modulesCount} Modules ({row.avgCompletionTime})
                    </span>
                  ),
                },
                {
                  key: "employeesCompleted",
                  header: "Staff Completed",
                  render: (row) => (
                    <strong style={{ color: "var(--ink)" }}>{row.employeesCompleted.toLocaleString()}</strong>
                  ),
                },
                {
                  key: "efficacyScore",
                  header: "Efficacy Score",
                  render: (row) => (
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                      {row.efficacyScore}%
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Requirement Level",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.status === "Recommended Core" ? "badge--gold" : "badge--info"
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 4. LEARNING ACTIVITIES */}
      {navId === "learning_activities" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Active Learning Cohorts"
              value="6 Cohorts"
              detail="Peer Discussion Circles"
              icon="sparkle"
              tone="navy"
            />
            <MetricCard
              label="Monthly Challenge"
              value="52-Week Saver"
              detail="2,140 Employees Participating"
              icon="goal"
              tone="emerald"
            />
            <MetricCard
              label="Top Department"
              value="Engineering"
              detail="89.4% Participation Rate"
              icon="trending"
              tone="blue"
            />
            <MetricCard
              label="Emergency Fund Created"
              value="$3.4M Saved"
              detail="Workforce Reserve Buffer"
              icon="wallet"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Department Engagement & Financial Health Leaderboard
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Aggregated team participation in quarterly financial wellness challenges.
            </p>

            <DataTable
              title="Leaderboard"
              data={[
                {
                  id: "lead-1",
                  dept: "Engineering & Technology",
                  participation: "89.4%",
                  avgScore: "782 / 1000",
                  savingsRate: "14.2% of salary",
                  rank: "#1",
                },
                {
                  id: "lead-2",
                  dept: "Product Management & Design",
                  participation: "84.1%",
                  avgScore: "765 / 1000",
                  savingsRate: "12.8% of salary",
                  rank: "#2",
                },
                {
                  id: "lead-3",
                  dept: "Sales & Enterprise Accounts",
                  participation: "79.6%",
                  avgScore: "740 / 1000",
                  savingsRate: "11.5% of salary",
                  rank: "#3",
                },
                {
                  id: "lead-4",
                  dept: "Customer Operations & Support",
                  participation: "78.2%",
                  avgScore: "712 / 1000",
                  savingsRate: "10.4% of salary",
                  rank: "#4",
                },
              ]}
              columns={[
                {
                  key: "rank",
                  header: "Rank",
                  render: (row) => <strong style={{ color: "var(--brand-primary)" }}>{row.rank}</strong>,
                },
                {
                  key: "dept",
                  header: "Department",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.dept}</strong>,
                },
                {
                  key: "participation",
                  header: "Cohort Participation",
                  render: (row) => <span className="badge badge--success">{row.participation}</span>,
                },
                {
                  key: "avgScore",
                  header: "Financial Health Score",
                  render: (row) => <span style={{ color: "var(--ink)", fontWeight: 600 }}>{row.avgScore}</span>,
                },
                {
                  key: "savingsRate",
                  header: "Average Savings Rate",
                  render: (row) => (
                    <span style={{ color: "var(--accent-blue)", fontWeight: 600 }}>{row.savingsRate}</span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 5. WORKSHOPS */}
      {navId === "workshops" && (
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
                  Live & Virtual Workforce Financial Seminars
                </h3>
                <span className="card-sub">
                  Expert-led group sessions on open enrollment, RSUs, tax mitigation, and homebuying.
                </span>
              </div>
            </div>

            <DataTable
              title="Workshops"
              data={workshops}
              columns={[
                {
                  key: "title",
                  header: "Seminar Title & Speaker",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Speaker: {row.instructor}</span>
                    </div>
                  ),
                },
                {
                  key: "date",
                  header: "Date & Time",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--ink)", fontWeight: 600 }}>{row.date}</span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        {row.time} ({row.mode})
                      </span>
                    </div>
                  ),
                },
                {
                  key: "attendeesRegistered",
                  header: "Registration Count",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>{row.attendeesRegistered}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}> / {row.capacity} Cap</span>
                    </div>
                  ),
                },
                {
                  key: "status",
                  header: "Registration & RSVP",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="badge badge--success">{row.status}</span>
                      <button
                        className="btn btn-outline"
                        style={{ fontSize: "11px", padding: "4px 8px" }}
                        onClick={() => handleRegisterWorkshop(row.id)}
                      >
                        Register Group
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 6. PROGRAM ANALYTICS */}
      {navId === "program_analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Workforce Wellness Score"
              value="748 / 1000"
              detail="+42 pts Enterprise Gain YoY"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Financial Stress Reduction"
              value="-38% Stress"
              detail="Reported in Post-Program Pulse"
              icon="shield"
              tone="navy"
            />
            <MetricCard
              label="Emergency Fund Buffer"
              value="82.4% Prepared"
              detail="3+ Months Expenses Secured"
              icon="wallet"
              tone="blue"
            />
            <MetricCard
              label="Benefits Utilization"
              value="91.2% Active"
              detail="HSA, 401(k), Coaching & Loan Aid"
              icon="sparkle"
              tone="gold"
            />
          </div>

          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Workforce Financial Wellness Trends
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Year-over-year gains across the core dimensions of financial health.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", color: "var(--ink)" }}>Retirement Savings Rate</span>
                    <strong style={{ color: "var(--accent-success)" }}>94.2% (Target: 90%)</strong>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                    <div style={{ width: "94%", height: "100%", background: "var(--accent-success)" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", color: "var(--ink)" }}>Emergency Buffer Resilience</span>
                    <strong style={{ color: "var(--accent-blue)" }}>82.4% (Target: 80%)</strong>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                    <div style={{ width: "82%", height: "100%", background: "var(--accent-blue)" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", color: "var(--ink)" }}>Debt-to-Income Management</span>
                    <strong style={{ color: "var(--accent-gold)" }}>76.8% (Target: 75%)</strong>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                    <div style={{ width: "77%", height: "100%", background: "var(--accent-gold)" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Benefits ROI & Healthcare Offset
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Financial wellness correlation with health plan claims and retention.
              </p>

              <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--muted)", fontSize: "13px", lineHeight: "1.8" }}>
                <li>
                  <strong style={{ color: "var(--ink)" }}>Turnover Reduction:</strong> Employees engaged in
                  financial wellness demonstrate 14% higher 2-year retention.
                </li>
                <li>
                  <strong style={{ color: "var(--ink)" }}>Productivity Recaptured:</strong> Estimated $2,400 per
                  employee per year recovered from reduced financial anxiety.
                </li>
                <li>
                  <strong style={{ color: "var(--ink)" }}>HSA Optimization:</strong> 64% increase in employee
                  triple-tax advantaged investing for long-term health care.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 7. COMMUNICATIONS */}
      {navId === "communications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Workforce Benefits Broadcast Center
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Deploy targeted email campaigns and push announcements for open enrollment, webinars, and benefits deadlines.
            </p>

            <form onSubmit={handleSendBroadcast} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                  Target Audience
                </label>
                <select
                  className="select"
                  value={broadcastAudience}
                  onChange={(e) => setBroadcastAudience(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="All Active Employees (4,850)">All Active Employees (4,850)</option>
                  <option value="Un-enrolled in 401(k) Match (170 Staff)">Un-enrolled in 401(k) Match (170 Staff)</option>
                  <option value="HSA Eligible But Un-enrolled (1,043 Staff)">HSA Eligible But Un-enrolled (1,043 Staff)</option>
                  <option value="Engineering & Tech Cohort (1,480 Staff)">Engineering & Tech Cohort (1,480 Staff)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                  Broadcast Subject
                </label>
                <input
                  type="text"
                  className="input"
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                  Message Content
                </label>
                <textarea
                  className="input"
                  rows={4}
                  defaultValue="Hello team, as a reminder, our annual financial wellness open enrollment period closes next Friday. Please review your 401(k) company match settings to ensure you are capturing the full 100% employer contribution match."
                  style={{ width: "100%", resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Icon name="notification" size={15} />
                Deploy Broadcast to Workforce (Simulated)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 8. REPORTS */}
      {navId === "reports" && (
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
                  Enterprise Workforce Benefits & Compliance Reports
                </h3>
                <span className="card-sub">
                  ERISA Form 5500 packs, nondiscrimination testing summaries, and wellness impact ROI audits.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={14} />
                Export Audit Dossier
              </button>
            </div>

            <DataTable
              title="Reports"
              data={[
                {
                  id: "hrr-1",
                  title: "Annual Workforce Financial Wellness Impact Audit 2026",
                  period: "Calendar Year 2025/2026",
                  scope: "All 4,850 Employees Across 5 Divisions",
                  status: "Audited & Board Ready",
                },
                {
                  id: "hrr-2",
                  title: "ERISA Form 5500 Nondiscrimination & ADP/ACP Pack",
                  period: "Plan Year 2025",
                  scope: "Retirement Plan Trustee Review",
                  status: "100% Passing Score",
                },
                {
                  id: "hrr-3",
                  title: "Student Loan CARES Act Employer Subsidy Summary",
                  period: "Q2 2026 Disbursals",
                  scope: "$2.2M Direct Amortization Grants",
                  status: "IRS Compliant",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Report Title & Scope",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Scope: {row.scope}</span>
                    </div>
                  ),
                },
                {
                  key: "period",
                  header: "Period",
                  render: (row) => <span style={{ color: "var(--ink)", fontSize: "12px" }}>{row.period}</span>,
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

      {/* 9. SETTINGS */}
      {navId === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Company 401(k) Match Rules
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Configure corporate matching formula and vesting timelines.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Employer Matching Formula
                  </label>
                  <select className="select" defaultValue="100_4_50_2" style={{ width: "100%" }}>
                    <option value="100_4_50_2">100% on first 4%, 50% on next 2% (Current Safe Harbor)</option>
                    <option value="100_6">100% on first 6% Dollar-for-Dollar</option>
                    <option value="50_6">50% on first 6% Standard Match</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Default Auto-Enrollment Rate
                  </label>
                  <select className="select" defaultValue="6" style={{ width: "100%" }}>
                    <option value="4">4% Base Auto-Enrollment</option>
                    <option value="6">6% Recommended Auto-Enrollment (Current)</option>
                    <option value="8">8% Accelerated Savings Track</option>
                  </select>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ marginTop: "8px", fontSize: "12px" }}
                  onClick={() => {
                    showToast({
                      title: "Settings Saved",
                      message: "Corporate 401(k) match rules and auto-enrollment rates updated.",
                      tone: "success",
                    })
                  }}
                >
                  Save Benefits Rules
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Employee Privacy & Compliance Safeguards
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Mandatory privacy filters protecting individual workers from manager visibility.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Anonymized Balance Protection
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Strict zero-visibility into individual employee bank balances
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Minimum Cohort k-Anonymity
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Aggregated reports require at least 10 employees per reporting cohort
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
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
        title="Export Workforce Financial Wellness Report"
        defaultFilename="Corporate_HR_Workforce_Wellness_Report"
        headers={[
          "Employee Code",
          "Department",
          "Tenure",
          "401(k) Status",
          "Wellness Tier",
          "HSA Participation",
        ]}
        data={employees.map((e) => [
          e.employeeCode,
          e.department,
          e.tenure,
          e.planEnrollment,
          e.wellnessTier,
          e.hsaParticipation,
        ])}
      />
    </div>
  )
}
