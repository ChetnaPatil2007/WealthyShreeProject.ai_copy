import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface UniversityPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface UniversityStudentItem {
  id: string
  studentId: string
  name: string
  college: "College of Business & Finance" | "School of Engineering" | "College of Arts & Sciences" | "School of Medicine & Health"
  academicYear: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate"
  financialHealthScore: number
  coursesCompleted: number
  fafsaStatus: "Completed & Verified" | "Verification Pending" | "Exempt"
  certificationEarned: string
}

interface UniversityCourseItem {
  id: string
  courseCode: string
  title: string
  department: string
  creditHours: number
  enrolledStudents: number
  instructor: string
  avgGrade: string
  completionRate: number
  status: "Active Semester" | "Curriculum Review"
}

interface UniversityInstructorItem {
  id: string
  name: string
  title: string
  department: string
  credentials: string
  coursesTaught: number
  activeStudents: number
  rating: number
  officeHours: string
}

interface AssessmentItem {
  id: string
  title: string
  targetCohort: string
  questionsCount: number
  avgScore: number
  passRate: number
  scheduledDate: string
  status: "Completed" | "In Progress" | "Upcoming"
}

interface CampusEventItem {
  id: string
  title: string
  date: string
  location: string
  category: "Wellness Fair" | "FAFSA Clinic" | "Guest Speaker" | "Career & NIL Seminar"
  registeredCount: number
  capacity: number
  status: "Open for RSVP" | "Waitlist Active" | "Completed"
}

export function UniversityModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: UniversityPageProps) {
  const { showToast } = useToast()
  const [showExportModal, setShowExportModal] = useState(false)

  // 1. Students State
  const [students, setStudents] = useState<UniversityStudentItem[]>([
    {
      id: "stu-1",
      studentId: "UNIV-2026-8812",
      name: "Maya Lin",
      college: "College of Business & Finance",
      academicYear: "Junior",
      financialHealthScore: 842,
      coursesCompleted: 4,
      fafsaStatus: "Completed & Verified",
      certificationEarned: "Campus Capital Markets Fellow",
    },
    {
      id: "stu-2",
      studentId: "UNIV-2026-9041",
      name: "Marcus Adebayo",
      college: "School of Engineering",
      academicYear: "Sophomore",
      financialHealthScore: 785,
      coursesCompleted: 3,
      fafsaStatus: "Completed & Verified",
      certificationEarned: "Certified Collegiate Financial Foundations",
    },
    {
      id: "stu-3",
      studentId: "UNIV-2026-7731",
      name: "Chloe Henderson",
      college: "College of Arts & Sciences",
      academicYear: "Senior",
      financialHealthScore: 710,
      coursesCompleted: 2,
      fafsaStatus: "Completed & Verified",
      certificationEarned: "Student Debt Literacy Specialist",
    },
    {
      id: "stu-4",
      studentId: "UNIV-2026-9214",
      name: "David Kim",
      college: "School of Medicine & Health",
      academicYear: "Graduate",
      financialHealthScore: 880,
      coursesCompleted: 5,
      fafsaStatus: "Exempt",
      certificationEarned: "Master Financial Health Scholar",
    },
    {
      id: "stu-5",
      studentId: "UNIV-2026-6410",
      name: "Sarah Jenkins",
      college: "College of Business & Finance",
      academicYear: "Freshman",
      financialHealthScore: 690,
      coursesCompleted: 1,
      fafsaStatus: "Verification Pending",
      certificationEarned: "In Progress (Foundations)",
    },
  ])
  const [collegeFilter, setCollegeFilter] = useState("All")
  const [searchStudent, setSearchStudent] = useState("")

  // 2. Courses State
  const [courses] = useState<UniversityCourseItem[]>([
    {
      id: "crs-101",
      courseCode: "FIN-101",
      title: "Personal Financial Foundations & Student Debt Economics",
      department: "Finance & Economics",
      creditHours: 3,
      enrolledStudents: 3820,
      instructor: "Dr. Robert Vance & CFP Faculty",
      avgGrade: "A- (3.7 GPA)",
      completionRate: 94.2,
      status: "Active Semester",
    },
    {
      id: "crs-202",
      courseCode: "FIN-202",
      title: "Introduction to Capital Markets, Indices & Asset Allocation",
      department: "Finance & Economics",
      creditHours: 3,
      enrolledStudents: 2450,
      instructor: "Prof. Evelyn Reed, CFA",
      avgGrade: "B+ (3.4 GPA)",
      completionRate: 88.6,
      status: "Active Semester",
    },
    {
      id: "crs-305",
      courseCode: "ENT-305",
      title: "Venture Finance, Cap Tables & Startup Seed Capital",
      department: "Management & Entrepreneurship",
      creditHours: 3,
      enrolledStudents: 1290,
      instructor: "Adjunct Prof. Arthur Pendelton",
      avgGrade: "A (3.9 GPA)",
      completionRate: 96.1,
      status: "Active Semester",
    },
    {
      id: "crs-410",
      courseCode: "ATH-410",
      title: "NIL (Name, Image & Likeness) Financial Management for Athletes",
      department: "Intercollegiate Athletics",
      creditHours: 2,
      enrolledStudents: 480,
      instructor: "Coach Marcus Sterling, CFP®",
      avgGrade: "A (3.8 GPA)",
      completionRate: 98.4,
      status: "Active Semester",
    },
  ])

  // 3. Instructors State
  const [instructors] = useState<UniversityInstructorItem[]>([
    {
      id: "inst-1",
      name: "Dr. Robert Vance",
      title: "Professor of Financial Systems & Academic Trustee",
      department: "Finance & Economics",
      credentials: "Ph.D. Economics (Chicago), CFP®",
      coursesTaught: 3,
      activeStudents: 1840,
      rating: 4.9,
      officeHours: "Tue/Thu 2:00 PM - 4:00 PM",
    },
    {
      id: "inst-2",
      name: "Prof. Evelyn Reed",
      title: "Associate Professor of Quantitative Finance",
      department: "Finance & Economics",
      credentials: "M.S. Financial Engineering, CFA",
      coursesTaught: 2,
      activeStudents: 1210,
      rating: 4.8,
      officeHours: "Mon/Wed 1:00 PM - 3:00 PM",
    },
    {
      id: "inst-3",
      name: "Marcus Sterling",
      title: "Clinical Executive Fellow & Athletic Advisor",
      department: "Intercollegiate Athletics & Wealth Practice",
      credentials: "CFP®, ChFC®",
      coursesTaught: 2,
      activeStudents: 680,
      rating: 4.95,
      officeHours: "By Appointment / Virtual",
    },
  ])

  // 4. Assessments State
  const [assessments] = useState<AssessmentItem[]>([
    {
      id: "asm-1",
      title: "Fall 2026 Campus-Wide Financial Literacy Diagnostic Exam",
      targetCohort: "All Incoming Freshmen & Transfers",
      questionsCount: 50,
      avgScore: 76.4,
      passRate: 91.2,
      scheduledDate: "Completed Sep 15",
      status: "Completed",
    },
    {
      id: "asm-2",
      title: "Midterm Capital Markets & Compound Interest Mastery Check",
      targetCohort: "FIN-101 & FIN-202 Students",
      questionsCount: 40,
      avgScore: 84.1,
      passRate: 93.8,
      scheduledDate: "Active This Week",
      status: "In Progress",
    },
    {
      id: "asm-3",
      title: "Senior Capstone Debt Amortization & Tax Preparedness Exam",
      targetCohort: "Graduating Seniors (Class of 2027)",
      questionsCount: 60,
      avgScore: 88.0,
      passRate: 95.4,
      scheduledDate: "Nov 20, 2026",
      status: "Upcoming",
    },
  ])

  // 5. Events State
  const [events, setEvents] = useState<CampusEventItem[]>([
    {
      id: "evt-1",
      title: "Annual Campus Financial Wellness Fair & Career Expo",
      date: "Oct 28, 2026",
      location: "Student Union Grand Ballroom",
      category: "Wellness Fair",
      registeredCount: 1420,
      capacity: 2000,
      status: "Open for RSVP",
    },
    {
      id: "evt-2",
      title: "FAFSA Help Night & Student Grant Discovery Workshop",
      date: "Nov 04, 2026",
      location: "Library Computer Lab A & Virtual Stream",
      category: "FAFSA Clinic",
      registeredCount: 380,
      capacity: 400,
      status: "Open for RSVP",
    },
    {
      id: "evt-3",
      title: "Navigating Your First Tech Paycheck: RSUs, 401(k) & Taxes",
      date: "Nov 12, 2026",
      location: "Auditorium Hall 101",
      category: "Guest Speaker",
      registeredCount: 500,
      capacity: 500,
      status: "Waitlist Active",
    },
  ])

  // RSVP handler
  const handleRsvpEvent = (evtId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === evtId
          ? {
              ...e,
              registeredCount: Math.min(e.capacity, e.registeredCount + 1),
            }
          : e,
      ),
    )
    showToast({
      title: "Event RSVP Confirmed",
      message: "Student seat reserved. Digital badge pass issued to university portal.",
      tone: "success",
    })
  }

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesCollege = collegeFilter === "All" || s.college.includes(collegeFilter)
      const matchesSearch =
        s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchStudent.toLowerCase())
      return matchesCollege && matchesSearch
    })
  }, [students, collegeFilter, searchStudent])

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
              ACADEMIC CONSOLE & CAMPUS REGISTRAR
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              University Academic Intelligence · 14,850 Enrolled Learners
            </span>
          </div>
          <h1 style={{ font: "700 26px 'Manrope', sans-serif", color: "var(--ink)", margin: 0 }}>
            {navName}
          </h1>
          <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "13.5px" }}>
            Accredited finance curriculum, faculty rosters, benchmark assessments, verifiable micro-credentials, and campus analytics.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowExportModal(true)}
          >
            <Icon name="document" size={15} />
            Export Academic Data
          </button>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => {
              showToast({
                title: "Credentials Minted (Simulated)",
                message: "Issued 420 blockchain-verifiable collegiate micro-credentials to students.",
                tone: "success",
              })
            }}
          >
            <Icon name="sparkle" size={15} />
            Issue Verifiable Badges
          </button>
        </div>
      </div>

      {/* 1. STUDENTS */}
      {navId === "students" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Enrolled Student Learners"
              value="14,850 Students"
              detail="Across 12 Campus Colleges"
              icon="user"
              tone="navy"
            />
            <MetricCard
              label="Campus Financial Score"
              value="784 / 1000"
              detail="+36 pts Semester Benchmark"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="FAFSA Verification Rate"
              value="96.2% Verified"
              detail="Aid Package Maximized"
              icon="check"
              tone="blue"
            />
            <MetricCard
              label="Credentials Awarded"
              value="1,890 Badges"
              detail="Cryptographically Verifiable"
              icon="sparkle"
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
                  Enrolled Students Directory
                </h3>
                <span className="card-sub">
                  Campus learners, academic college affiliations, financial health scores, and earned certifications.
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Search student or ID..."
                  className="input"
                  style={{ width: "200px", fontSize: "12px", padding: "6px 10px" }}
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                />
                {["All", "Business", "Engineering", "Arts", "Medicine"].map((col) => (
                  <button
                    key={col}
                    className={`btn ${collegeFilter === col ? "btn-primary" : "btn-outline"}`}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                    onClick={() => setCollegeFilter(col)}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            <DataTable
              title="Students"
              data={filteredStudents}
              columns={[
                {
                  key: "name",
                  header: "Student & ID",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.name}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {row.studentId} · {row.academicYear}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "college",
                  header: "College Division",
                  render: (row) => <span className="badge badge--navy">{row.college}</span>,
                },
                {
                  key: "financialHealthScore",
                  header: "Financial Health Score",
                  render: (row) => (
                    <strong style={{ color: "var(--accent-success)" }}>{row.financialHealthScore} / 1000</strong>
                  ),
                },
                {
                  key: "coursesCompleted",
                  header: "Courses Passed",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.coursesCompleted} Courses</span>
                  ),
                },
                {
                  key: "certificationEarned",
                  header: "Credential Earned",
                  render: (row) => (
                    <span className="badge badge--gold" style={{ fontSize: "11px" }}>
                      {row.certificationEarned}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 2. COURSES */}
      {navId === "courses" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Accredited Finance Courses"
              value="28 Courses"
              detail="Undergrad & Grad Curriculum"
              icon="book"
              tone="navy"
            />
            <MetricCard
              label="Course Completion Velocity"
              value="87.4% Rate"
              detail="+6.2% vs Benchmark"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Average Student Grade"
              value="3.7 GPA (A-)"
              detail="High Mastery Demonstration"
              icon="sparkle"
              tone="gold"
            />
            <MetricCard
              label="Active Faculty CFPs"
              value="46 Instructors"
              detail="Faculty & Guest CFP Experts"
              icon="briefcase"
              tone="blue"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              University Financial Literacy Course Catalog
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Accredited degree courses in personal finance, capital markets, venture economics, and student debt.
            </p>

            <DataTable
              title="Courses"
              data={courses}
              columns={[
                {
                  key: "title",
                  header: "Course Code & Title",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>
                        {row.courseCode}: {row.title}
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {row.department} · {row.creditHours} Credit Units
                      </span>
                    </div>
                  ),
                },
                {
                  key: "instructor",
                  header: "Faculty Lead",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.instructor}</span>,
                },
                {
                  key: "enrolledStudents",
                  header: "Enrollment",
                  render: (row) => (
                    <strong style={{ color: "var(--ink)" }}>{row.enrolledStudents.toLocaleString()}</strong>
                  ),
                },
                {
                  key: "avgGrade",
                  header: "Grade / Completion",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>{row.avgGrade}</span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        {row.completionRate}% Passed
                      </span>
                    </div>
                  ),
                },
                {
                  key: "status",
                  header: "Semester Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 3. INSTRUCTORS */}
      {navId === "instructors" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Faculty Professors & Guest CFP® Practitioners
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Academic faculty, credentialing credentials, student ratings, and campus office hours.
            </p>

            <DataTable
              title="Faculty"
              data={instructors}
              columns={[
                {
                  key: "name",
                  header: "Instructor & Title",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.name}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {row.title} ({row.credentials})
                      </span>
                    </div>
                  ),
                },
                {
                  key: "department",
                  header: "Department",
                  render: (row) => <span className="badge badge--navy">{row.department}</span>,
                },
                {
                  key: "activeStudents",
                  header: "Active Students",
                  render: (row) => (
                    <strong style={{ color: "var(--ink)" }}>{row.activeStudents.toLocaleString()}</strong>
                  ),
                },
                {
                  key: "rating",
                  header: "Student Rating",
                  render: (row) => (
                    <span style={{ color: "var(--accent-gold)", fontWeight: 700 }}>★ {row.rating} / 5.0</span>
                  ),
                },
                {
                  key: "officeHours",
                  header: "Office Hours",
                  render: (row) => (
                    <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>{row.officeHours}</span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 4. LEARNING PROGRAMS */}
      {navId === "learning_programs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Learning Program Tracks"
              value="4 Certified Tracks"
              detail="Degree & Micro-Credential"
              icon="sparkle"
              tone="navy"
            />
            <MetricCard
              label="Elective Enrollment"
              value="4,210 Students"
              detail="Non-Business Major Growth"
              icon="user"
              tone="blue"
            />
            <MetricCard
              label="Employer Recognized"
              value="120+ Employers"
              detail="Top Banks & Tech Firms"
              icon="briefcase"
              tone="gold"
            />
            <MetricCard
              label="Curriculum Audit"
              value="100% Accredited"
              detail="AACSB & CFP Board Aligned"
              icon="check"
              tone="emerald"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Academic Degree & Micro-Credential Pathways
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Structured curriculum sequences designed to ensure every graduate enters the workforce financially literate.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                {
                  title: "Undergraduate Financial Literacy Core Pathway",
                  scope: "All Campus Undergraduates (Freshman - Senior)",
                  requirements: "Complete FIN-101 + 2 Micro-Credentials + Pass Capstone Exam",
                  outcomes: "Certified Collegiate Financial Foundations Badge",
                  enrolled: "8,920 Students",
                },
                {
                  title: "Student-Athlete NIL & Wealth Management Track",
                  scope: "NCAA Division 1 Intercollegiate Athletes",
                  requirements: "Complete ATH-410 + Contract Legal Review Clinic + Tax Planning Module",
                  outcomes: "NIL Athlete Financial Sovereignty Credential",
                  enrolled: "480 Athletes",
                },
                {
                  title: "Graduate Student Stipend & Debt Amortization Specialization",
                  scope: "Master's & Ph.D. Fellows",
                  requirements: "Complete Advanced Debt Modeling + Fellowship Stipend Budgeting",
                  outcomes: "Graduate Financial Health Scholar Designation",
                  enrolled: "1,140 Scholars",
                },
              ].map((prog, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    background: "var(--surface-color)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "6px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <strong style={{ color: "var(--ink)", fontSize: "15px", display: "block" }}>
                        {prog.title}
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Cohort: {prog.scope}</span>
                    </div>
                    <span className="badge badge--navy">{prog.enrolled}</span>
                  </div>
                  <p style={{ margin: "8px 0 6px 0", fontSize: "12.5px", color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>Requirements:</strong> {prog.requirements}
                  </p>
                  <span className="badge badge--gold" style={{ fontSize: "11px" }}>
                    Credential Awarded: {prog.outcomes}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ASSESSMENTS */}
      {navId === "assessments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Campus Benchmark Assessments & Diagnostic Exams
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Standardized evaluations measuring comprehension of loans, budgeting, investing, and taxes.
            </p>

            <DataTable
              title="Assessments"
              data={assessments}
              columns={[
                {
                  key: "title",
                  header: "Assessment & Target Cohort",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Cohort: {row.targetCohort}</span>
                    </div>
                  ),
                },
                {
                  key: "questionsCount",
                  header: "Questions",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.questionsCount} Items</span>,
                },
                {
                  key: "avgScore",
                  header: "Average Mastery Score",
                  render: (row) => (
                    <strong style={{ color: "var(--accent-success)" }}>{row.avgScore}% Pass Rate</strong>
                  ),
                },
                {
                  key: "scheduledDate",
                  header: "Timeline",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--muted)" }}>{row.scheduledDate}</span>,
                },
                {
                  key: "status",
                  header: "Status",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.status === "Completed"
                          ? "badge--success"
                          : row.status === "In Progress"
                          ? "badge--blue"
                          : "badge--warning"
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

      {/* 6. CERTIFICATIONS */}
      {navId === "certifications" && (
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
                  Verifiable Collegiate Micro-Credentials Registry
                </h3>
                <span className="card-sub">
                  Tamper-evident, employer-ready badges published on immutable credential ledgers.
                </span>
              </div>
            </div>

            <DataTable
              title="Credentials Issued"
              data={[
                {
                  id: "crt-1",
                  title: "Certified Collegiate Financial Foundations",
                  recipients: "1,240 Students Awarded",
                  accreditation: "University Board of Trustees & CFP Faculty",
                  hashSeal: "SHA-256 Validated",
                  status: "Active & Verifiable",
                },
                {
                  id: "crt-2",
                  title: "Campus Capital Markets & Equity Analyst Fellow",
                  recipients: "480 Students Awarded",
                  accreditation: "College of Business & Wall Street Advisory",
                  hashSeal: "SHA-256 Validated",
                  status: "Active & Verifiable",
                },
                {
                  id: "crt-3",
                  title: "Student Debt & FAFSA Literacy Specialist",
                  recipients: "170 Peer Mentors Awarded",
                  accreditation: "Bursar & Financial Aid Office",
                  hashSeal: "SHA-256 Validated",
                  status: "Active & Verifiable",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Credential Title",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.accreditation}</span>
                    </div>
                  ),
                },
                {
                  key: "recipients",
                  header: "Recipients",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.recipients}</strong>,
                },
                {
                  key: "hashSeal",
                  header: "Cryptographic Seal",
                  render: (row) => <span className="badge badge--navy">{row.hashSeal}</span>,
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

      {/* 7. EVENTS */}
      {navId === "events" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Campus Financial Wellness Events & Workshops
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Town halls, guest lectures, FAFSA clinics, and career preparation workshops.
            </p>

            <DataTable
              title="Events"
              data={events}
              columns={[
                {
                  key: "title",
                  header: "Event Title & Venue",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Venue: {row.location}</span>
                    </div>
                  ),
                },
                {
                  key: "category",
                  header: "Category",
                  render: (row) => <span className="badge badge--navy">{row.category}</span>,
                },
                {
                  key: "date",
                  header: "Date",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.date}</strong>,
                },
                {
                  key: "registeredCount",
                  header: "RSVP Count",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>
                      {row.registeredCount} / {row.capacity} Seats
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Action",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="badge badge--success">{row.status}</span>
                      <button
                        className="btn btn-outline"
                        style={{ fontSize: "11px", padding: "4px 8px" }}
                        onClick={() => handleRsvpEvent(row.id)}
                      >
                        Reserve Seat
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 8. ANALYTICS */}
      {navId === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Campus Health Index"
              value="784 / 1000"
              detail="+36 pts Semester Benchmark"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Student Loan Repayment Preparedness"
              value="91.4% Prepared"
              detail="Calculated Payoff Modeling"
              icon="wallet"
              tone="blue"
            />
            <MetricCard
              label="Credit Builder Adherence"
              value="82.6% On Time"
              detail="Zero Delinquency Across Cohort"
              icon="check"
              tone="gold"
            />
            <MetricCard
              label="Campus Coverage"
              value="100% Colleges"
              detail="All 12 Colleges Reporting"
              icon="shield"
              tone="navy"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Multi-College Financial Literacy Trends
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Breakdown of student participation and mastery metrics across campus schools.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", color: "var(--ink)" }}>College of Business & Finance</span>
                  <strong style={{ color: "var(--accent-success)" }}>94.2% Mastery</strong>
                </div>
                <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                  <div style={{ width: "94%", height: "100%", background: "var(--accent-success)" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", color: "var(--ink)" }}>School of Engineering</span>
                  <strong style={{ color: "var(--accent-blue)" }}>88.6% Mastery</strong>
                </div>
                <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                  <div style={{ width: "89%", height: "100%", background: "var(--accent-blue)" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", color: "var(--ink)" }}>College of Arts & Sciences</span>
                  <strong style={{ color: "var(--accent-gold)" }}>82.1% Mastery</strong>
                </div>
                <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                  <div style={{ width: "82%", height: "100%", background: "var(--accent-gold)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. REPORTS */}
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
                  Academic Accreditation & FAFSA Reports
                </h3>
                <span className="card-sub">
                  Higher Learning Commission compliance dossiers, endowment impact studies, and default mitigation audits.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={14} />
                Export Accreditation Pack
              </button>
            </div>

            <DataTable
              title="Reports"
              data={[
                {
                  id: "ur-1",
                  title: "Annual Campus-Wide Financial Wellness Impact Audit 2026",
                  period: "Academic Year 2025/2026",
                  scope: "14,850 Undergraduates & Graduates",
                  status: "Trustee Certified",
                },
                {
                  id: "ur-2",
                  title: "Federal Student Aid & FAFSA Verification Summary",
                  period: "Fall Semester 2026",
                  scope: "Financial Aid & Bursar Office",
                  status: "Department of Education Compliant",
                },
                {
                  id: "ur-3",
                  title: "Donor-Funded Financial Literacy Endowment Report",
                  period: "Fiscal Year 2026",
                  scope: "$4.5M Restricted Endowment Fund",
                  status: "Audited & Certified",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Report Title & Scope",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.scope}</span>
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

      {/* 10. SETTINGS */}
      {navId === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Academic Calendar & Grading Rules
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Configure semester benchmarks and micro-credential issuance thresholds.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Passing Mastery Benchmark Threshold
                  </label>
                  <select className="select" defaultValue="80" style={{ width: "100%" }}>
                    <option value="70">70% Standard Passing (C-)</option>
                    <option value="80">80% Proficiency Passing (B) (Current)</option>
                    <option value="90">90% Honors Mastery (A)</option>
                  </select>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ marginTop: "8px", fontSize: "12px" }}
                  onClick={() => {
                    showToast({
                      title: "Settings Saved",
                      message: "Academic grading parameters and semester deadlines updated.",
                      tone: "success",
                    })
                  }}
                >
                  Save Academic Parameters
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Registrar Authentication & FERPA Privacy
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                FERPA compliance rules governing student record access and transcript verifications.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      FERPA Student Privacy Shield
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Strict encryption on student aid and loan data
                    </span>
                  </div>
                  <span className="badge badge--success">Active</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Edu Single Sign-On (SSO)
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Mandatory .edu institutional identity validation
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
        title="Export Academic Financial Data"
        defaultFilename="University_Academic_Finance_Report"
        headers={[
          "Student ID",
          "Name",
          "College",
          "Academic Year",
          "Financial Health Score",
          "Courses Passed",
          "FAFSA Status",
          "Credential",
        ]}
        data={students.map((s) => [
          s.studentId,
          s.name,
          s.college,
          s.academicYear,
          s.financialHealthScore,
          s.coursesCompleted,
          s.fafsaStatus,
          s.certificationEarned,
        ])}
      />
    </div>
  )
}
