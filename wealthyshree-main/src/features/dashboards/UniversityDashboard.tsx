import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface UniversityDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function UniversityDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: UniversityDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"courses" | "events">("courses")
  const [cohortFilter, setCohortFilter] =
    useState<"all" | "undergrad" | "grad" | "honors">("all")
  const [showExportModal, setShowExportModal] = useState(false)

  // Accredited Finance Courses mock data
  const universityCourses = [
    {
      id: "crs1",
      code: "FIN-101",
      title: "Foundations of Personal Cash Flow & Micro-Budgeting",
      instructor: "Prof. Sarah Sterling, CFP®",
      department: "School of Undergraduate Studies",
      enrolled: "3,840 Students",
      completionRate: "92.4%",
      status: "Active Term",
      statusTone: "success",
    },
    {
      id: "crs2",
      code: "FIN-204",
      title: "Credit Health, Student Loans & Debt Avalanche Strategy",
      instructor: "Dr. Marcus Vance, Ph.D.",
      department: "College of Arts & Sciences",
      enrolled: "2,950 Students",
      completionRate: "88.6%",
      status: "Active Term",
      statusTone: "success",
    },
    {
      id: "crs3",
      code: "FIN-310",
      title: "Capital Markets, Index Investing & Compound Growth",
      instructor: "Elena Rostova, AFC®",
      department: "School of Business & Economics",
      enrolled: "2,420 Students",
      completionRate: "85.2%",
      status: "Midterm Exam Due",
      statusTone: "warning",
    },
    {
      id: "crs4",
      code: "FIN-405",
      title: "Taxes for Graduates, Equity Grants & W-2 Optimization",
      instructor: "David Miller, CPA",
      department: "Senior Capstone & MBA Prep",
      enrolled: "1,640 Students",
      completionRate: "83.1%",
      status: "Registration Open",
      statusTone: "info",
    },
  ]

  // Upcoming Campus Financial Events mock data
  const campusEvents = [
    {
      id: "ev1",
      title: "Campus Financial Independence & First-Job Salary Negotiation",
      speaker: "Guest Panel: Tech & Wall Street Alumni",
      dateTime: "Tuesday, Oct 21 · 4:00 PM EST",
      location: "Kaufman Hall Auditorium & Live Stream",
      registeredStudents: "640 Registered",
      capacity: "750 Seats",
      status: "Filling Fast",
      statusTone: "warning",
    },
    {
      id: "ev2",
      title: "Student Loan Forgiveness & Income-Driven Repayment Clinic",
      speaker: "Office of Financial Aid & Legal Aid Center",
      dateTime: "Thursday, Nov 06 · 2:00 PM EST",
      location: "Virtual Interactive Workshop",
      registeredStudents: "480 Registered",
      capacity: "Unlimited Webcast",
      status: "Confirmed",
      statusTone: "success",
    },
    {
      id: "ev3",
      title: "Building Credit from Zero: Safe Starter Cards & Rent Reporting",
      speaker: "Prof. Sarah Sterling, CFP®",
      dateTime: "Wednesday, Nov 18 · 1:00 PM EST",
      location: "Student Union Multi-Purpose Room",
      registeredStudents: "310 Registered",
      capacity: "350 Seats",
      status: "Registration Open",
      statusTone: "info",
    },
  ]

  // Academic Cohort Mastery & Student Progress Directory (Aggregated FERPA compliant)
  const studentCohorts = [
    {
      id: "coh1",
      name: "College of Engineering & Computer Science",
      academicLevel: "undergrad",
      levelLabel: "Undergraduate (Years 1-4)",
      enrolledCount: "3,450 Learners",
      completionRate: "89.2%",
      avgAssessmentScore: "94.6% Passed",
      certificationsIssued: "512 Badges",
      status: "High Mastery",
      statusTone: "success",
    },
    {
      id: "coh2",
      name: "School of Business, Finance & Economics",
      academicLevel: "undergrad",
      levelLabel: "Undergraduate (Years 2-4)",
      enrolledCount: "2,840 Learners",
      completionRate: "93.4%",
      avgAssessmentScore: "96.2% Passed",
      certificationsIssued: "640 Badges",
      status: "Dean's Honors",
      statusTone: "success",
    },
    {
      id: "coh3",
      name: "College of Nursing, Health & Medicine",
      academicLevel: "grad",
      levelLabel: "Graduate & Professional",
      enrolledCount: "1,980 Learners",
      completionRate: "86.1%",
      avgAssessmentScore: "91.8% Passed",
      certificationsIssued: "248 Badges",
      status: "Active Term",
      statusTone: "info",
    },
    {
      id: "coh4",
      name: "School of Law & Public Policy",
      academicLevel: "grad",
      levelLabel: "JD & Master's Candidates",
      enrolledCount: "1,220 Learners",
      completionRate: "88.7%",
      avgAssessmentScore: "93.4% Passed",
      certificationsIssued: "186 Badges",
      status: "Active Term",
      statusTone: "info",
    },
    {
      id: "coh5",
      name: "University Honors Program & Scholar Cohort",
      academicLevel: "honors",
      levelLabel: "All Disciplines · Honors",
      enrolledCount: "1,120 Learners",
      completionRate: "98.1%",
      avgAssessmentScore: "98.5% Passed",
      certificationsIssued: "304 Badges",
      status: "Dean's Honors",
      statusTone: "success",
    },
    {
      id: "coh6",
      name: "College of Arts, Humanities & Design",
      academicLevel: "undergrad",
      levelLabel: "Undergraduate (Years 1-4)",
      enrolledCount: "4,240 Learners",
      completionRate: "84.5%",
      avgAssessmentScore: "88.9% Passed",
      certificationsIssued: "290 Badges",
      status: "Active Term",
      statusTone: "info",
    },
  ]

  // Filter student cohorts
  const filteredCohorts = useMemo(() => {
    if (cohortFilter === "undergrad")
      return studentCohorts.filter((c) => c.academicLevel === "undergrad")
    if (cohortFilter === "grad")
      return studentCohorts.filter((c) => c.academicLevel === "grad")
    if (cohortFilter === "honors")
      return studentCohorts.filter((c) => c.status === "Dean's Honors")
    return studentCohorts
  }, [cohortFilter])

  const cohortColumns = [
    {
      key: "name",
      header: "Academic College / Cohort",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
            Classification: {row.levelLabel}
          </small>
        </div>
      ),
    },
    {
      key: "enrolledCount",
      header: "Enrolled Learners",
      render: (row: any) => (
        <span style={{ fontWeight: 600, color: "var(--ink)" }}>
          {row.enrolledCount}
        </span>
      ),
    },
    {
      key: "completionRate",
      header: "Course Completion Rate",
      render: (row: any) => (
        <div>
          <strong
            style={{ color: "var(--primary-dark)", font: "700 13px 'Manrope'" }}
          >
            {row.completionRate}
          </strong>
        </div>
      ),
    },
    {
      key: "avgAssessmentScore",
      header: "Assessment Pass Rate",
      render: (row: any) => (
        <span className="badge badge--success">{row.avgAssessmentScore}</span>
      ),
    },
    {
      key: "certificationsIssued",
      header: "Micro-Credentials",
      render: (row: any) => (
        <span
          style={{ fontSize: "12px", color: "var(--ink)", fontWeight: 500 }}
        >
          🏅 {row.certificationsIssued}
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
    <div className="role-dashboard university-dashboard">
      {/* 1. Hero Header & University Academic Console Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--navy">
              ACADEMIC FINANCIAL CAPABILITY CONSORTIUM
            </span>
            <span>
              Educating 14,850 Learners Across 12 Colleges & 28 Courses
            </span>
          </div>
          <h1 className="hero-title">Dr. Robert Vance</h1>
          <p className="hero-subtitle">
            Vice Chancellor & Academic Trustee · University Academic Console.
            Campus financial literacy curriculum, student debt mitigation,
            accredited personal finance modules, verified assessments, and
            blockchain micro-credentials.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Courses")}
          >
            <Icon name="book" size={16} />
            <span>Publish Course</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>AI Campus Tutor</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core University Metric Cards */}
      <section className="metric-grid" aria-label="University Academic Metrics">
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
          if (act.id === "publish_course") onNavigate("Courses")
          else if (act.id === "schedule_event") onNavigate("Events")
          else if (act.id === "issue_diploma_creds")
            onNavigate("Certifications")
          else if (act.id === "export_analytics") {
            setShowExportModal(true)
          } else onOpenAI()
        }}
      />

      {/* 4. Curriculum Completion Velocity & Student Engagement Grid */}
      <section className="dashboard-grid">
        {/* Card 1: Curriculum Completion Velocity */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">
                Campus Financial Literacy Index
              </span>
              <span className="card-sub">
                Aggregated mastery across 14,850 enrolled students
              </span>
            </div>
            <span className="badge badge--success">+6.2% vs Benchmark</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>87.4%</strong>
              <span>completion rate</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">HIGH MASTERY</span>
            <span>94.2% active weekly campus participation</span>
          </div>

          <div className="score-bars">
            {[
              ["Budgeting & Cash Flow Foundations (94.6%)", "94.6%"],
              ["Credit Health & Debt Prevention (91.2%)", "91.2%"],
              ["Compound Growth & Index Investing (84.8%)", "84.8%"],
              ["Tax Filing & W-2 Optimization (79.0%)", "79.0%"],
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

        {/* Card 2: Student Engagement & Micro-Credentials Overview */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Academic Credentials & Assessments
              </span>
              <span className="card-sub">
                Verified achievements tracked across 28 campus courses
              </span>
            </div>
            <span className="badge badge--info">1,890 Credentials</span>
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
                Assessment Passing Velocity
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                92.6% Pass Rate
              </strong>
            </div>

            <div className="cat-track" style={{ height: "8px" }}>
              <div className="cat-fill emerald" style={{ width: "92.6%" }} />
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
                  Active Instructors
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  46 Faculty
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
                  Assessments Passed
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  3,420 Tests
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
                  Dean's Honors
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  1,120 Scholars
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
                  Verifiable Micro-Credentials Ready
                </b>
                <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                  1,890 W3C-compliant digital credentials issued to LinkedIn and
                  CV
                </small>
              </div>
              <span className="badge badge--success">100% Cryptographic</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabbed Card: Accredited Finance Courses vs Upcoming Campus Events */}
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
              Academic Course Curriculum & Campus Events Schedule
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
              Manage undergraduate and graduate personal finance education
              pathways
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "courses"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              <Icon name="book" size={14} />
              <span>Accredited Courses (28)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "events" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setActiveTab("events")}
            >
              <Icon name="calendar" size={14} />
              <span>Campus Seminars (8)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Courses */}
        {activeTab === "courses" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {universityCourses.map((crs) => (
              <div
                key={crs.id}
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
                    <div>
                      <span
                        className="badge badge--info"
                        style={{ fontSize: "9.5px", marginBottom: "4px" }}
                      >
                        {crs.code}
                      </span>
                      <b
                        style={{
                          color: "var(--ink)",
                          fontSize: "13.5px",
                          display: "block",
                        }}
                      >
                        {crs.title}
                      </b>
                    </div>
                    <span className={`badge badge--${crs.statusTone}`}>
                      {crs.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--muted)",
                    }}
                  >
                    Instructor: {crs.instructor} · {crs.department}
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
                      Enrolled Students
                    </span>
                    <strong
                      style={{
                        font: "600 12px 'Manrope'",
                        color: "var(--ink)",
                      }}
                    >
                      {crs.enrolled}
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
                    Completion: {crs.completionRate}
                  </span>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    onClick={() =>
                      showToast({
                        title: "Syllabus Accessed",
                        message: `Viewing syllabus and interactive modules for ${crs.code} (${crs.title}).`,
                        tone: "info",
                      })
                    }
                  >
                    View Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Events */}
        {activeTab === "events" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {campusEvents.map((ev) => (
              <div
                key={ev.id}
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
                      {ev.title}
                    </b>
                    <span className={`badge badge--${ev.statusTone}`}>
                      {ev.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--muted)",
                    }}
                  >
                    Speaker: {ev.speaker}
                  </p>

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
                      Date & Location
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px 'Manrope'",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {ev.dateTime} · {ev.location}
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
                  <span>{ev.registeredStudents}</span>
                  <button
                    type="button"
                    className="button button--sm button--primary"
                    onClick={() =>
                      showToast({
                        title: "Campus Notification Broadcasted",
                        message: `Broadcasting campus reminder & registration sync for "${ev.title}".`,
                        tone: "success",
                      })
                    }
                  >
                    Send Invitation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Academic Cohorts & Student Directory Table (FERPA Compliant) */}
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
              Academic College Cohorts & Student Mastery Directory (
              {filteredCohorts.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              FERPA-compliant aggregated cohort statistics. Individual student
              grades & records remain private.
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                cohortFilter === "all" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setCohortFilter("all")}
            >
              All Colleges (6)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                cohortFilter === "undergrad"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setCohortFilter("undergrad")}
            >
              Undergraduate (3)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                cohortFilter === "grad"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setCohortFilter("grad")}
            >
              Graduate / Law (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                cohortFilter === "honors"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setCohortFilter("honors")}
            >
              Dean's Honors (2)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={cohortColumns}
          data={filteredCohorts}
          searchPlaceholder="Search academic college, cohort, or level..."
          actionButton={{
            label: "Export Academic Accreditation Report",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. FERPA & Educational Integrity Disclaimer Banner */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>FERPA Academic Privacy Safe Harbor:</strong> In strict
          compliance with the Family Educational Rights and Privacy Act (FERPA),
          individual student financial aid amounts, loan balances, and quiz logs
          are protected with zero-knowledge encryption. Figures displayed in
          this console represent aggregated educational analytics for academic
          planning.
        </div>
      </section>

      {/* Interactive Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Academic Financial Capability Accreditation Report"
        defaultFilename="university_financial_literacy_accreditation"
        headers={[
          "Academic College / Cohort",
          "Classification",
          "Enrolled Learners",
          "Completion Rate",
          "Assessment Pass Rate",
          "Micro-Credentials",
          "Status",
        ]}
        data={filteredCohorts.map((c) => [
          c.name,
          c.levelLabel,
          c.enrolledCount,
          c.completionRate,
          c.avgAssessmentScore,
          c.certificationsIssued,
          c.status,
        ])}
      />
    </div>
  )
}

export default UniversityDashboard
