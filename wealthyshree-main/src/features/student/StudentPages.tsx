import React, { useState } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { CreateGoalModal } from "../../components/modals/CreateGoalModal"
import { ExportModal } from "../../components/modals/ExportModal"
import type { MockGoal } from "../../services/mockData"

export interface StudentPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface StudentExpense {
  id: string
  title: string
  category: "Housing" | "Food" | "Academics" | "Transport" | "Social" | "Health"
  amount: number
  date: string
  method: string
}

interface StudentGoal {
  id: string
  name: string
  category: string
  current: number
  target: number
  targetDate: string
  status: string
}

interface AssessmentQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export function StudentModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: StudentPageProps) {
  const { showToast } = useToast()

  // Modals
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // 1. Budget State
  const [expenses, setExpenses] = useState<StudentExpense[]>([
    {
      id: "ex1",
      title: "Campus Co-Op Grocery Run",
      category: "Food",
      amount: 68.5,
      date: "May 18, 2025",
      method: "Debit Card",
    },
    {
      id: "ex2",
      title: "Advanced Algorithms Textbook Rental",
      category: "Academics",
      amount: 45.0,
      date: "May 16, 2025",
      method: "Debit Card",
    },
    {
      id: "ex3",
      title: "Monthly Student Metro Pass",
      category: "Transport",
      amount: 75.0,
      date: "May 15, 2025",
      method: "Apple Pay",
    },
    {
      id: "ex4",
      title: "Dorm High-Speed WiFi Share",
      category: "Housing",
      amount: 35.0,
      date: "May 12, 2025",
      method: "Venmo",
    },
    {
      id: "ex5",
      title: "Study Group Coffee & Bagels",
      category: "Social",
      amount: 14.25,
      date: "May 10, 2025",
      method: "Debit Card",
    },
    {
      id: "ex6",
      title: "Campus Gym & Intramural Fee",
      category: "Health",
      amount: 25.0,
      date: "May 05, 2025",
      method: "Debit Card",
    },
  ])

  const [newExpenseTitle, setNewExpenseTitle] = useState("")
  const [newExpenseAmount, setNewExpenseAmount] = useState("")
  const [newExpenseCat, setNewExpenseCat] = useState<StudentExpense["category"]>("Food")
  const [expenseFilter, setExpenseFilter] = useState("All")

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(newExpenseAmount)
    if (!newExpenseTitle.trim() || isNaN(amt) || amt <= 0) {
      showToast({
        title: "Validation Error",
        message: "Please enter a valid expense title and amount",
        tone: "warning",
      })
      return
    }
    const newEntry: StudentExpense = {
      id: `ex-${Date.now()}`,
      title: newExpenseTitle.trim(),
      category: newExpenseCat,
      amount: amt,
      date: "Just now",
      method: "Campus Debit",
    }
    setExpenses([newEntry, ...expenses])
    setNewExpenseTitle("")
    setNewExpenseAmount("")
    showToast({
      title: "Expense Logged",
      message: `Recorded $${amt.toFixed(2)} under ${newExpenseCat}`,
      tone: "success",
    })
  }

  // 2. Savings Goals State
  const [studentGoals, setStudentGoals] = useState<StudentGoal[]>([
    {
      id: "sg1",
      name: "Starter Emergency Cushion",
      category: "Safety Buffer",
      current: 1560,
      target: 2000,
      targetDate: "Aug 2025",
      status: "On Track",
    },
    {
      id: "sg2",
      name: "Laptop & Engineering Tool Upgrade",
      category: "Tech Hardware",
      current: 1380,
      target: 1500,
      targetDate: "Sep 2025",
      status: "Almost Funded",
    },
    {
      id: "sg3",
      name: "Summer Study Abroad Experience",
      category: "Global Education",
      current: 1800,
      target: 4000,
      targetDate: "Jun 2026",
      status: "In Progress",
    },
    {
      id: "sg4",
      name: "Post-Grad Apartment Lease Deposit",
      category: "Housing",
      current: 900,
      target: 1200,
      targetDate: "May 2026",
      status: "On Track",
    },
    {
      id: "sg5",
      name: "GRE & Professional Exam Fees",
      category: "Career Prep",
      current: 320,
      target: 500,
      targetDate: "Nov 2025",
      status: "In Progress",
    },
  ])

  const handleMicroDeposit = (id: string, amount: number) => {
    setStudentGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const updated = Math.min(g.target, g.current + amount)
          return {
            ...g,
            current: updated,
            status: updated >= g.target ? "Fully Funded" : g.status,
          }
        }
        return g
      }),
    )
    showToast({
      title: "Micro-Deposit Added",
      message: `Added $${amount} to savings! Keep up the great momentum!`,
      tone: "success",
    })
  }

  const handleCreateStudentGoal = (g: MockGoal) => {
    const newG: StudentGoal = {
      id: `sg-${Date.now()}`,
      name: g.name,
      category: g.category || "Student Target",
      current: g.currentAmount || 0,
      target: g.targetAmount || 1000,
      targetDate: g.targetDate || "2026",
      status: "In Progress",
    }
    setStudentGoals([...studentGoals, newG])
    setShowGoalModal(false)
    showToast({
      title: "Goal Created",
      message: `Created savings goal: "${g.name}"!`,
      tone: "success",
    })
  }

  // 3. Learning Topics State
  const [learningTopics, setLearningTopics] = useState([
    {
      id: "lt1",
      title: "Credit Mechanics & FICO Building",
      category: "Debt & Credit",
      duration: "7 min read",
      level: "Foundational",
      completed: true,
      summary:
        "Understand how statement closing dates differ from due dates, how credit utilization is calculated across revolving limits, and why keeping utilization below 10% accelerates credit score growth.",
    },
    {
      id: "lt2",
      title: "Demystifying Direct Subsidized vs Unsubsidized Loans",
      category: "Debt & Credit",
      duration: "11 min read",
      level: "Essential",
      completed: true,
      summary:
        "Federal loans comparison: Discover how interest capitalization works during in-school deferment and grace periods, and calculate repayment schedules under SAVE and standard plans.",
    },
    {
      id: "lt3",
      title: "Compound Interest: The Early Career 20s Advantage",
      category: "Investing",
      duration: "9 min read",
      level: "Foundational",
      completed: false,
      summary:
        "Visualizing why $100/mo invested at age 20 generates more terminal wealth than $300/mo started at age 32 due to the exponential physics of 40-year compound returns.",
    },
    {
      id: "lt4",
      title: "First Job Paycheck, W-4 Withholding & FICA Taxes",
      category: "Taxes & Career",
      duration: "12 min read",
      level: "Intermediate",
      completed: false,
      summary:
        "Step-by-step breakdown of gross pay vs net pay, standard deductions, state withholding brackets, and how to avoid under-withholding surprises on your first internship tax return.",
    },
    {
      id: "lt5",
      title: "Off-Campus Apartment Leases & Security Deposits",
      category: "Daily Banking",
      duration: "6 min read",
      level: "Practical",
      completed: true,
      summary:
        "Renter's insurance essentials, tenant screening credit thresholds, understanding joint liability on roommate leases, and escrow rules for getting your deposit returned.",
    },
    {
      id: "lt6",
      title: "Roth IRA vs 401(k) for Students with Earned Income",
      category: "Investing",
      duration: "14 min read",
      level: "Intermediate",
      completed: false,
      summary:
        "Why low tax brackets during college make the Roth IRA the greatest financial vehicle available: tax-free compounding, penalty-free principal withdrawals, and index fund choices.",
    },
  ])

  const [activeTopicFilter, setActiveTopicFilter] = useState("All")

  const toggleTopicCompletion = (id: string) => {
    setLearningTopics((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = !t.completed
          showToast({
            title: next ? "Topic Mastered" : "Topic Updated",
            message: next
              ? `Completed: "${t.title}" (+50 Literacy XP)`
              : `Marked "${t.title}" as incomplete`,
            tone: next ? "success" : "info",
          })
          return { ...t, completed: next }
        }
        return t
      }),
    )
  }

  // 4. Courses State
  const [courses, setCourses] = useState([
    {
      id: "c1",
      title: "Mastering Personal Wealth & Investing",
      level: "Intermediate",
      modules: 8,
      totalModules: 12,
      enrolled: true,
      icon: "pie" as const,
      tag: "Popular",
      instructor: "Prof. Elena Vance, Wharton Fellow",
    },
    {
      id: "c2",
      title: "Student Loan Amortization & Repayment Strategy",
      level: "Essential",
      modules: 6,
      totalModules: 6,
      enrolled: true,
      icon: "card" as const,
      tag: "Completed",
      instructor: "Marcus Reynolds, CFP®",
    },
    {
      id: "c3",
      title: "Credit Mechanics & Safe Card Building",
      level: "Foundational",
      modules: 4,
      totalModules: 4,
      enrolled: true,
      icon: "shield" as const,
      tag: "Completed",
      instructor: "Sarah Jenkins, Credit Analyst",
    },
    {
      id: "c4",
      title: "Early-Stage Stock Market & Low-Cost Index Funds",
      level: "Intermediate",
      modules: 2,
      totalModules: 8,
      enrolled: true,
      icon: "trending" as const,
      tag: "Active",
      instructor: "David Wu, Portfolio Strategist",
    },
    {
      id: "c5",
      title: "Freelance, Gig Economy & 1099 Tax Secrets",
      level: "Advanced",
      modules: 0,
      totalModules: 5,
      enrolled: false,
      icon: "tax" as const,
      tag: "Recommended",
      instructor: "Amina Al-Mansoor, CPA",
    },
    {
      id: "c6",
      title: "Salary Negotiation & First Job Offer Evaluation",
      level: "Elective",
      modules: 0,
      totalModules: 4,
      enrolled: false,
      icon: "sparkle" as const,
      tag: "Career Ready",
      instructor: "Robert Chen, HR Director",
    },
  ])

  const [courseFilter, setCourseFilter] = useState("All")

  const handleEnrollCourse = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          showToast({
            title: "Course Enrolled",
            message: `Enrolled in "${c.title}"! Course material unlocked.`,
            tone: "success",
          })
          return { ...c, enrolled: true, tag: "In Progress" }
        }
        return c
      }),
    )
  }

  const handleAdvanceLesson = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = Math.min(c.totalModules, c.modules + 1)
          const isDone = next === c.totalModules
          showToast({
            title: isDone ? "Course Completed" : "Lesson Completed",
            message: isDone
              ? `Congratulations! Finished "${c.title}" (+200 XP)`
              : `Advanced to module ${next} of ${c.totalModules}!`,
            tone: isDone ? "success" : "info",
          })
          return {
            ...c,
            modules: next,
            tag: isDone ? "Completed" : "In Progress",
          }
        }
        return c
      }),
    )
  }

  // 5. Interactive Assessment State
  const quizQuestions: AssessmentQuestion[] = [
    {
      id: 1,
      question:
        "What is the primary difference between Direct Subsidized and Direct Unsubsidized federal student loans?",
      options: [
        "Subsidized loans require a co-signer while unsubsidized loans do not",
        "The federal government pays the interest on subsidized loans while enrolled at least half-time",
        "Unsubsidized loans are only available to graduate students",
        "Subsidized loans have a fixed 10% penalty for early payoff",
      ],
      correctIndex: 1,
      explanation:
        "Direct Subsidized loans do not accrue interest while you are enrolled at least half-time because the U.S. Department of Education covers it. Unsubsidized loans accrue interest from the day of disbursement.",
    },
    {
      id: 2,
      question:
        "To maintain an optimal credit score, what is the generally recommended maximum credit utilization ratio on your cards?",
      options: [
        "Under 10% (and never exceeding 30%)",
        "Exactly 50% so lenders know you use credit",
        "Around 75% as long as you make minimum payments",
        "Utilization has no impact on credit scores",
      ],
      correctIndex: 0,
      explanation:
        "Credit bureaus reward accounts that use less than 10% of their available limit. Exceeding 30% begins to significantly penalize your credit rating.",
    },
    {
      id: 3,
      question:
        "Why is a Roth IRA especially advantageous for college students with part-time or internship earned income?",
      options: [
        "It provides an immediate $5,000 cash tax rebate from the IRS",
        "You pay low or zero tax today due to your student bracket, and growth + qualified withdrawals in retirement are 100% tax-free",
        "It guarantees a 12% annual return backed by the federal government",
        "You can only invest in university bonds inside a Roth IRA",
      ],
      correctIndex: 1,
      explanation:
        "Since students are typically in the lowest tax brackets (0% or 10-12%), paying tax now is negligible. Decades of compounding gains come out completely tax-free later.",
    },
    {
      id: 4,
      question:
        "How much should a college student target for a basic starter emergency cushion while in school?",
      options: [
        "$50,000 in physical cash under the mattress",
        "$1,000 to $2,000 (enough to cover unexpected car repairs, medical copays, or broken tech)",
        "Zero, because students should rely exclusively on high-interest payday credit",
        "Exactly three years of post-graduation rent",
      ],
      correctIndex: 1,
      explanation:
        "A starter buffer of $1,000–$2,000 prevents a sudden minor emergency (like a flat tire or broken laptop) from forcing you into high-interest credit card debt.",
    },
    {
      id: 5,
      question:
        "What happens if you only pay the 'Minimum Payment Due' on a credit card balance each month?",
      options: [
        "The remaining balance is forgiven after 6 months",
        "High interest compounds on the unpaid balance, dramatically increasing the total cost and taking years or decades to repay",
        "Your credit score automatically maxes out at 850",
        "The credit card company pays you cash dividends",
      ],
      correctIndex: 1,
      explanation:
        "Minimum payments primarily cover accrued interest and fees with only a tiny fraction reducing principal. Paying in full every month avoids interest entirely.",
    },
  ]

  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (quizSubmitted) return
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }))
  }

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      showToast({
        title: "Incomplete Quiz",
        message: "Please answer all questions before submitting",
        tone: "warning",
      })
      return
    }
    let correctCount = 0
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++
      }
    })
    const scorePct = Math.round((correctCount / quizQuestions.length) * 100)
    setQuizScore(scorePct)
    setQuizSubmitted(true)
    showToast({
      title: scorePct >= 80 ? "Assessment Passed!" : "Assessment Completed",
      message: `You scored ${scorePct}% (${correctCount}/${quizQuestions.length} correct)`,
      tone: scorePct >= 80 ? "success" : "info",
    })
  }

  const handleResetQuiz = () => {
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
    showToast({
      title: "Quiz Reset",
      message: "Ready for a new attempt!",
      tone: "info",
    })
  }

  // 6. Certifications State
  const [certifications] = useState([
    {
      id: "cert1",
      title: "Certified Student Financial Foundations (CSFF)",
      issuer: "WealthSphere Global Financial Academy",
      credentialId: "WS-STUD-8841-A",
      issueDate: "May 08, 2025",
      expiry: "Permanent Credential",
      status: "Verified & Active",
      badgeColor: "gold",
      score: "94% Benchmark",
      modulesCompleted: "12 of 12 Core Competencies",
    },
    {
      id: "cert2",
      title: "Credit Literacy & Debt Management Specialist",
      issuer: "National Center for Financial Education Partner",
      credentialId: "WS-CRED-3912-B",
      issueDate: "March 14, 2025",
      expiry: "Permanent Credential",
      status: "Verified & Active",
      badgeColor: "blue",
      score: "100% Benchmark",
      modulesCompleted: "6 of 6 Core Competencies",
    },
    {
      id: "cert3",
      title: "Capital Markets & Index Investing Associate",
      issuer: "Sphere Quantitative Learning Lab",
      credentialId: "IN-PROGRESS-2025",
      issueDate: "In Progress (Estimated Jun 2025)",
      expiry: "Upon Completion",
      status: "In Progress",
      badgeColor: "purple",
      score: "Pending Final Exam",
      modulesCompleted: "4 of 5 Prerequisites Finished",
    },
  ])

  // 7. AI Tutor Chat State
  const [tutorMessages, setTutorMessages] = useState<
    Array<{ sender: "tutor" | "student"; text: string; time: string }>
  >([
    {
      sender: "tutor",
      text: "Hey Jordan! I'm your Sphere AI Student Tutor. I'm trained on student loan optimization, campus meal budgeting, first-job offer evaluation, and early-stage investing. What's on your mind today?",
      time: "10:14 AM",
    },
  ])
  const [tutorInput, setTutorInput] = useState("")

  const handleSendTutorMessage = (presetQuery?: string) => {
    const query = presetQuery || tutorInput.trim()
    if (!query) return

    const studentMsg = {
      sender: "student" as const,
      text: query,
      time: "Just now",
    }
    setTutorMessages((prev) => [...prev, studentMsg])
    if (!presetQuery) setTutorInput("")

    // Generate response
    setTimeout(() => {
      let reply = ""
      const qLower = query.toLowerCase()
      if (qLower.includes("subsidized") || qLower.includes("loan")) {
        reply =
          "Great question! With Direct Subsidized loans, the government pays your interest while you're in school at least half-time and during the 6-month grace period. With Unsubsidized loans, interest accrues immediately from disbursement. If you can pay off just the accrued interest on unsubsidized loans before graduating, you prevent 'capitalization' where interest gets added to principal!"
      } else if (qLower.includes("credit") || qLower.includes("card")) {
        reply =
          "To build an 750+ credit score on campus: 1) Keep your statement balance under 10% of your total limit, 2) Set up Auto-Pay for the full statement balance so you never pay interest, and 3) Keep your oldest card open forever to maintain your average credit history length."
      } else if (qLower.includes("roth") || qLower.includes("invest")) {
        reply =
          "A Roth IRA is the holy grail for college students with earned income (from work-study, summer internships, or tutoring). Since your tax bracket is low now, you pay virtually no tax going in, and every penny of growth and retirement withdrawals is 100% tax-free. Putting $50/month into an S&P 500 index ETF starting today can compound to over $180,000 by retirement!"
      } else if (qLower.includes("budget") || qLower.includes("allowance")) {
        reply =
          "Your current campus numbers look solid: $1,850 inflow vs $1,380 spend leaves you with +$470/mo. I recommend automating $200 of that surplus directly into your Starter Emergency Cushion and $100 toward your Laptop Upgrade goal on the 1st of every month."
      } else {
        reply = `Analyzing your query regarding "${query}". Based on your student profile at MIT (Undergrad '26), maintaining a low debt-to-income outlook and prioritizing your $2,000 emergency buffer gives you immense financial leverage when entering the post-grad job market!`
      }

      setTutorMessages((prev) => [
        ...prev,
        {
          sender: "tutor",
          text: reply,
          time: "Just now",
        },
      ])
    }, 600)
  }

  // 8. Achievements State
  const achievementsList = [
    {
      id: "ach1",
      title: "Budget Master",
      category: "Discipline",
      desc: "Logged 30 consecutive days of expenses under the $1,500 monthly limit",
      icon: "wallet" as const,
      unlocked: true,
      xp: "+150 XP",
      date: "May 2025",
    },
    {
      id: "ach2",
      title: "Debt Simulator Pro",
      category: "Knowledge",
      desc: "Completed student loan amortization calculation & payoff modeling",
      icon: "card" as const,
      unlocked: true,
      xp: "+200 XP",
      date: "Apr 2025",
    },
    {
      id: "ach3",
      title: "Credit Shield Pioneer",
      category: "Milestone",
      desc: "Kept revolving credit card utilization under 10% for 3 straight statements",
      icon: "shield" as const,
      unlocked: true,
      xp: "+250 XP",
      date: "Mar 2025",
    },
    {
      id: "ach4",
      title: "First $1,000 Buffer",
      category: "Savings",
      desc: "Reached $1,000 cash balance in starter emergency safety reserve",
      icon: "sparkle" as const,
      unlocked: true,
      xp: "+300 XP",
      date: "Feb 2025",
    },
    {
      id: "ach5",
      title: "Quiz Virtuoso",
      category: "Academy",
      desc: "Scored 90% or higher on 3 formal financial literacy assessments",
      icon: "activity" as const,
      unlocked: true,
      xp: "+180 XP",
      date: "May 2025",
    },
    {
      id: "ach6",
      title: "Roth IRA Initiator",
      category: "Investing",
      desc: "Learn about tax-advantaged accounts and complete first index scenario",
      icon: "pie" as const,
      unlocked: false,
      xp: "+350 XP",
      date: "Locked (80% Prereq)",
    },
    {
      id: "ach7",
      title: "Commencement Ready",
      category: "Capstone",
      desc: "Zero high-interest debt and 6-month living cost buffer upon graduation",
      icon: "trending" as const,
      unlocked: false,
      xp: "+500 XP",
      date: "Locked (Class of 2026)",
    },
  ]

  // 9. Settings State
  const [profileSettings, setProfileSettings] = useState({
    fullName: "Jordan Lee",
    university: "Metropolitan Institute of Technology",
    major: "Computer Science & Applied Economics",
    classYear: "Class of 2026 (Junior)",
    studentId: "MIT-2022-8492",
    campusEmail: "jordan.lee@univ.edu",
    monthlyStipend: 1850,
    budgetAlertThreshold: 80,
    dailyQuizReminder: true,
    loanAlerts: true,
    weeklyDigest: true,
  })

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    showToast({
      title: "Settings Saved",
      message: "Student profile & workspace preferences saved successfully!",
      tone: "success",
    })
  }

  // =========================================================================
  // PAGE ROUTING BASED ON navId / navName
  // =========================================================================

  // 1. MY BUDGET
  if (navId === "my_budget" || navId === "budget" || navName === "My Budget") {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
    const monthlyIncome = 1850
    const remainingBalance = monthlyIncome - totalSpent
    const pctSpent = Math.min(100, Math.round((totalSpent / monthlyIncome) * 100))

    const filteredExpenses =
      expenseFilter === "All"
        ? expenses
        : expenses.filter((e) => e.category === expenseFilter)

    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · CASH FLOW</span>
            <div className="page-title">My Budget & Campus Spending</div>
            <div className="page-subtitle">
              Track student stipends, academic expenses, daily dining, and monthly spending caps in real time.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  const el = document.getElementById("log-expense-form")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Icon name="plus" size={16} />
                <span>Log New Expense</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Budget CSV</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Remaining Discretionary Surplus</span>
            <div className="value">+${remainingBalance.toFixed(0)}</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>{pctSpent}% of $1,850 limit used</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Total Monthly Inflow"
            value={`$${monthlyIncome.toLocaleString()}`}
            detail="TA Position + Academic Aid"
            trend="up"
            icon="wallet"
            tone="blue"
          />
          <MetricCard
            label="Current Month Outflow"
            value={`$${totalSpent.toFixed(2)}`}
            detail={`${expenses.length} campus transactions logged`}
            trend="neutral"
            icon="card"
            tone="navy"
          />
          <MetricCard
            label="Dining & Groceries"
            value="$345.00"
            detail="86% of $400 meal budget"
            trend="neutral"
            icon="pie"
            tone="gold"
          />
          <MetricCard
            label="Books & Software"
            value="$120.00"
            detail="On track for current semester"
            trend="up"
            icon="book"
            tone="violet"
          />
        </section>

        <div className="two-column-grid" style={{ marginBottom: "1.5rem" }}>
          {/* Spending Limit Progress Bars */}
          <div className="card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Monthly Spending Limits by Category</h3>
              <span className="badge badge--success">Safe Zone</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Housing & Utilities Share</span>
                  <span><strong>$580</strong> / $600 (96%)</span>
                </div>
                <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "96%", background: "var(--color-warning, #f59e0b)", height: "100%" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Dining & Campus Groceries</span>
                  <span><strong>$345</strong> / $400 (86%)</span>
                </div>
                <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "86%", background: "var(--color-accent, #3b82f6)", height: "100%" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Textbooks, Tech & Lab Supplies</span>
                  <span><strong>$120</strong> / $150 (80%)</span>
                </div>
                <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "80%", background: "var(--color-accent, #3b82f6)", height: "100%" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Public Transit & Bike Share</span>
                  <span><strong>$75</strong> / $100 (75%)</span>
                </div>
                <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "75%", background: "var(--color-success, #10b981)", height: "100%" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Entertainment & Campus Events</span>
                  <span><strong>$160</strong> / $200 (80%)</span>
                </div>
                <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "80%", background: "var(--color-accent, #3b82f6)", height: "100%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Log Expense Form */}
          <div id="log-expense-form" className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Log Quick Campus Expense</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", margin: "0 0 1rem 0" }}>
              Add cash or card purchases to stay within your monthly budget allowance.
            </p>
            <form onSubmit={handleAddExpense} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.25rem", fontWeight: 500 }}>
                  Expense Description
                </label>
                <input
                  type="text"
                  placeholder="e.g., Physics Lab Manual, Campus Coffee"
                  value={newExpenseTitle}
                  onChange={(e) => setNewExpenseTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border, #ddd)",
                    background: "var(--color-bg-input, #fff)",
                    color: "inherit",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.25rem", fontWeight: 500 }}>
                    Amount ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="25.00"
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid var(--color-border, #ddd)",
                      background: "var(--color-bg-input, #fff)",
                      color: "inherit",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.25rem", fontWeight: 500 }}>
                    Category
                  </label>
                  <select
                    value={newExpenseCat}
                    onChange={(e) => setNewExpenseCat(e.target.value as any)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid var(--color-border, #ddd)",
                      background: "var(--color-bg-input, #fff)",
                      color: "inherit",
                    }}
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Academics">Academics & Books</option>
                    <option value="Housing">Housing & Utilities</option>
                    <option value="Transport">Transport</option>
                    <option value="Social">Social & Coffee</option>
                    <option value="Health">Health & Fitness</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="button button--primary"
                style={{ marginTop: "0.5rem", justifyContent: "center" }}
              >
                <Icon name="plus" size={16} />
                <span>Save Expense & Update Budget</span>
              </button>
            </form>
          </div>
        </div>

        {/* Expense History Table */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "0.5rem" }}>
            {["All", "Food", "Academics", "Housing", "Transport", "Social"].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`button button--ghost ${expenseFilter === cat ? "button--primary" : ""}`}
                style={{ fontSize: "0.8rem", padding: "0.25rem 0.6rem" }}
                onClick={() => setExpenseFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <DataTable<StudentExpense>
            title="Recent Campus Expense Ledger"
            subtitle="Verified transactions debited against semester budget"
            columns={[
              {
                key: "title",
                header: "Description",
                render: (r: StudentExpense) => (
                  <div>
                    <strong style={{ display: "block" }}>{r.title}</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.method}</span>
                  </div>
                ),
              },
              {
                key: "category",
                header: "Category",
                render: (r: StudentExpense) => (
                  <span className="badge badge--neutral">{r.category}</span>
                ),
              },
              {
                key: "date",
                header: "Date",
                render: (r: StudentExpense) => r.date,
              },
              {
                key: "amount",
                header: "Amount",
                render: (r: StudentExpense) => (
                  <strong style={{ color: "var(--color-text-primary)" }}>
                    -${r.amount.toFixed(2)}
                  </strong>
                ),
              },
            ]}
            data={filteredExpenses}
          />
        </div>

        {showExportModal && (
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            headers={["Date", "Description", "Category", "Amount", "Method"]}
            data={expenses.map((e) => [e.date, e.title, e.category, `$${e.amount.toFixed(2)}`, e.method])}
            defaultFilename="student-monthly-budget"
            title="Export Student Budget Ledger"
          />
        )}
      </div>
    )
  }

  // 2. SAVINGS GOALS
  if (
    navId === "savings_goals" ||
    navId === "student_loans" ||
    navId === "savings" ||
    navId === "goals" ||
    navName === "Savings Goals"
  ) {
    const totalSaved = studentGoals.reduce((sum, g) => sum + g.current, 0)
    const totalTarget = studentGoals.reduce((sum, g) => sum + g.target, 0)
    const overallPct = Math.round((totalSaved / totalTarget) * 100)

    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · FINANCIAL TARGETS</span>
            <div className="page-title">Savings Goals & Emergency Buffers</div>
            <div className="page-subtitle">
              Build emergency reserves, prepare for laptop upgrades, and fund career transition milestones.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowGoalModal(true)}
              >
                <Icon name="plus" size={16} />
                <span>Create New Student Goal</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Round-Ups Active",
                    message: "Automated $25 weekly round-up activated!",
                    tone: "success",
                  })
                }}
              >
                <Icon name="sparkle" size={16} />
                <span>Enable Micro Round-Ups</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Total Student Reserves</span>
            <div className="value">${totalSaved.toLocaleString()}</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>{overallPct}% of ${totalTarget.toLocaleString()} funded</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Starter Emergency Buffer"
            value="$1,560"
            detail="78% of $2,000 target"
            trend="up"
            icon="shield"
            tone="blue"
          />
          <MetricCard
            label="Tech & Tool Upgrade"
            value="$1,380"
            detail="Only $120 away from goal"
            trend="up"
            icon="sparkle"
            tone="gold"
          />
          <MetricCard
            label="Monthly Micro-Savings"
            value="$185/mo"
            detail="Automated from stipend"
            trend="up"
            icon="wallet"
            tone="emerald"
          />
          <MetricCard
            label="Active Student Goals"
            value={`${studentGoals.length}`}
            detail="All goals on track for 2025-26"
            trend="neutral"
            icon="goal"
            tone="violet"
          />
        </section>

        {/* Goals Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
          {studentGoals.map((goal) => {
            const pct = Math.min(100, Math.round((goal.current / goal.target) * 100))
            const isCompleted = goal.current >= goal.target

            return (
              <div key={goal.id} className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "1rem" }}>{goal.name}</h4>
                      <span className="badge badge--neutral" style={{ fontSize: "0.75rem" }}>{goal.category}</span>
                    </div>
                    <span className={`badge ${isCompleted ? "badge--success" : "badge--warning"}`}>
                      {goal.status}
                    </span>
                  </div>

                  <div style={{ margin: "1rem 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.35rem" }}>
                      <span>Progress ({pct}%)</span>
                      <span><strong>${goal.current.toLocaleString()}</strong> / ${goal.target.toLocaleString()}</span>
                    </div>
                    <div style={{ background: "var(--color-bg-secondary, #eee)", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          background: isCompleted ? "var(--color-success, #10b981)" : "var(--color-accent, #3b82f6)",
                          height: "100%",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
                    Target Completion: <strong>{goal.targetDate}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="button button--secondary"
                    style={{ flex: 1, fontSize: "0.8rem", padding: "0.4rem" }}
                    onClick={() => handleMicroDeposit(goal.id, 25)}
                    disabled={isCompleted}
                  >
                    <Icon name="plus" size={14} />
                    <span>Deposit $25</span>
                  </button>
                  <button
                    type="button"
                    className="button button--ghost"
                    style={{ flex: 1, fontSize: "0.8rem", padding: "0.4rem" }}
                    onClick={() => handleMicroDeposit(goal.id, 50)}
                    disabled={isCompleted}
                  >
                    <span>Deposit $50</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Loan Repayment Strategy Banner */}
        <div className="card" style={{ padding: "1.25rem", borderLeft: "4px solid var(--color-accent, #3b82f6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "1.05rem" }}>Student Loan Deferment & Pre-Payment Strategy</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                Federal Direct Subsidized loans will remain 0% interest until 6 months after your June 2026 graduation. Unsubsidized loans are accruing ~$28/month in interest.
              </p>
            </div>
            <button
              type="button"
              className="button button--primary"
              onClick={openAI}
            >
              <Icon name="ai" size={16} />
              <span>Simulate Payoff With Sphere AI</span>
            </button>
          </div>
        </div>

        {showGoalModal && (
          <CreateGoalModal
            isOpen={showGoalModal}
            onClose={() => setShowGoalModal(false)}
            onGoalAdded={handleCreateStudentGoal}
          />
        )}
      </div>
    )
  }

  // 3. LEARN FINANCE
  if (navId === "learn_finance" || navId === "learn" || navName === "Learn Finance") {
    const completedCount = learningTopics.filter((t) => t.completed).length
    const totalCount = learningTopics.length
    const literacyPct = Math.round((completedCount / totalCount) * 100)

    const filteredTopics =
      activeTopicFilter === "All"
        ? learningTopics
        : learningTopics.filter((t) => t.category === activeTopicFilter)

    return (
      <div className="module-page">
        <section className="module-hero tone-purple">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · FINANCIAL ACADEMY</span>
            <div className="page-title">Learn Finance & Literacy Guides</div>
            <div className="page-subtitle">
              Bite-sized, practical modules on credit scores, loan deferment, tax withholding, and early index investing.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => onNavigate?.("Assessments")}
              >
                <Icon name="activity" size={16} />
                <span>Take Knowledge Assessment</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => onNavigate?.("Courses")}
              >
                <Icon name="book" size={16} />
                <span>View Full Curriculum</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-purple">
            <span className="label">Financial Literacy Benchmark</span>
            <div className="value">{literacyPct}% Mastered</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>{completedCount} of {totalCount} topics completed</span>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {["All", "Debt & Credit", "Investing", "Taxes & Career", "Daily Banking"].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`button ${activeTopicFilter === cat ? "button--primary" : "button--ghost"}`}
              style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}
              onClick={() => setActiveTopicFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Topics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.25rem" }}>
          {filteredTopics.map((topic) => (
            <div key={topic.id} className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span className="badge badge--neutral">{topic.category}</span>
                  <span className="badge" style={{ fontSize: "0.75rem" }}>{topic.duration}</span>
                </div>
                <h4 style={{ margin: "0.25rem 0 0.5rem 0", fontSize: "1.05rem" }}>{topic.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5, margin: "0 0 1rem 0" }}>
                  {topic.summary}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border, #eee)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.8rem", color: topic.completed ? "var(--color-success, #10b981)" : "var(--color-text-secondary)" }}>
                  {topic.completed ? "✓ Mastered" : "● Incomplete"}
                </span>
                <button
                  type="button"
                  className={`button ${topic.completed ? "button--ghost" : "button--secondary"}`}
                  style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                  onClick={() => toggleTopicCompletion(topic.id)}
                >
                  <Icon name={topic.completed ? "check" : "book"} size={14} />
                  <span>{topic.completed ? "Mark Unread" : "Mark Completed"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 4. COURSES
  if (navId === "courses" || navName === "Courses") {
    const enrolledCourses = courses.filter((c) => c.enrolled)
    const completedCourses = courses.filter((c) => c.modules === c.totalModules)

    const filteredCourses =
      courseFilter === "All"
        ? courses
        : courseFilter === "Enrolled"
        ? enrolledCourses
        : courseFilter === "Completed"
        ? completedCourses
        : courses.filter((c) => !c.enrolled)

    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · CURRICULUM</span>
            <div className="page-title">Course Catalog & Active Enrollments</div>
            <div className="page-subtitle">
              Structured multi-module video and interactive case studies taught by certified financial planners and university economists.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => onNavigate?.("Certifications")}
              >
                <Icon name="shield" size={16} />
                <span>View Earned Certificates</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => onNavigate?.("AI Finance Tutor")}
              >
                <Icon name="ai" size={16} />
                <span>Ask AI Course Tutor</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Enrolled Academic Courses</span>
            <div className="value">{enrolledCourses.length} Active</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>{completedCourses.length} fully certified</span>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {["All", "Enrolled", "Completed", "Recommended"].map((f) => (
            <button
              key={f}
              type="button"
              className={`button ${courseFilter === f ? "button--primary" : "button--ghost"}`}
              style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}
              onClick={() => setCourseFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.25rem" }}>
          {filteredCourses.map((c) => {
            const pct = Math.round((c.modules / c.totalModules) * 100)
            const isDone = c.modules === c.totalModules

            return (
              <div key={c.id} className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <span className="badge badge--neutral">{c.level}</span>
                    <span className={`badge ${isDone ? "badge--success" : c.enrolled ? "badge--warning" : "badge--neutral"}`}>
                      {c.tag}
                    </span>
                  </div>
                  <h4 style={{ margin: "0.25rem 0 0.25rem 0", fontSize: "1.05rem" }}>{c.title}</h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
                    {c.instructor}
                  </div>

                  {c.enrolled ? (
                    <div style={{ margin: "1rem 0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                        <span>Progress ({pct}%)</span>
                        <span>{c.modules} of {c.totalModules} modules</span>
                      </div>
                      <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${pct}%`,
                            background: isDone ? "var(--color-success, #10b981)" : "var(--color-accent, #3b82f6)",
                            height: "100%",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ margin: "1rem 0", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Comprehensive {c.totalModules}-module syllabus covering core real-world career applications.
                    </div>
                  )}
                </div>

                <div style={{ borderTop: "1px solid var(--color-border, #eee)", paddingTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                  {c.enrolled ? (
                    <button
                      type="button"
                      className="button button--primary"
                      style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}
                      onClick={() => handleAdvanceLesson(c.id)}
                      disabled={isDone}
                    >
                      <Icon name={isDone ? "check" : "arrow"} size={16} />
                      <span>{isDone ? "Course Completed" : "Advance Lesson (+25 XP)"}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button button--secondary"
                      style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}
                      onClick={() => handleEnrollCourse(c.id)}
                    >
                      <Icon name="plus" size={16} />
                      <span>Enroll in Course</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 5. ASSESSMENTS
  if (navId === "assessments" || navName === "Assessments") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · TESTING LAB</span>
            <div className="page-title">Financial Knowledge Assessments</div>
            <div className="page-subtitle">
              Verify your understanding of loan mechanics, credit building, and tax withholding through live interactive quizzes.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  const el = document.getElementById("quiz-engine")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Icon name="activity" size={16} />
                <span>Start Benchmark Quiz</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => onNavigate?.("Certifications")}
              >
                <Icon name="shield" size={16} />
                <span>View My Certificates</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Assessment GPA</span>
            <div className="value">3.92 / 4.0</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>4 assessments passed (Grade A)</span>
            </div>
          </div>
        </section>

        {/* Interactive Quiz Engine */}
        <div id="quiz-engine" className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.2rem" }}>
                Student Financial Literacy Benchmark Quiz
              </h3>
              <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                5 Questions · Multi-choice with detailed explanations
              </span>
            </div>
            {quizSubmitted && quizScore !== null && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  className={`badge ${quizScore >= 80 ? "badge--success" : "badge--warning"}`}
                  style={{ fontSize: "1rem", padding: "0.4rem 0.8rem" }}
                >
                  Score: {quizScore}%
                </span>
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={handleResetQuiz}
                >
                  <Icon name="activity" size={14} />
                  <span>Retake</span>
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {quizQuestions.map((q, idx) => {
              const selected = selectedAnswers[q.id]
              const isSubmitted = quizSubmitted
              const isCorrect = selected === q.correctIndex

              return (
                <div
                  key={q.id}
                  style={{
                    padding: "1rem",
                    borderRadius: "8px",
                    background: "var(--color-bg-secondary, #fafafa)",
                    border: isSubmitted
                      ? isCorrect
                        ? "1px solid var(--color-success, #10b981)"
                        : "1px solid var(--color-danger, #ef4444)"
                      : "1px solid var(--color-border, #e5e7eb)",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                    {idx + 1}. {q.question}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selected === optIdx
                      let optionBg = "var(--color-bg-primary, #fff)"
                      let optionBorder = "var(--color-border, #ddd)"

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionBg = "rgba(16, 185, 129, 0.15)"
                          optionBorder = "var(--color-success, #10b981)"
                        } else if (isChosen && !isCorrect) {
                          optionBg = "rgba(239, 68, 68, 0.15)"
                          optionBorder = "var(--color-danger, #ef4444)"
                        }
                      } else if (isChosen) {
                        optionBg = "rgba(59, 130, 246, 0.1)"
                        optionBorder = "var(--color-accent, #3b82f6)"
                      }

                      return (
                        <label
                          key={optIdx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "6px",
                            border: `1px solid ${optionBorder}`,
                            background: optionBg,
                            cursor: isSubmitted ? "default" : "pointer",
                            fontSize: "0.85rem",
                          }}
                        >
                          <input
                            type="radio"
                            name={`quiz-q-${q.id}`}
                            checked={isChosen}
                            onChange={() => handleSelectOption(q.id, optIdx)}
                            disabled={isSubmitted}
                          />
                          <span>{opt}</span>
                        </label>
                      )
                    })}
                  </div>

                  {isSubmitted && (
                    <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {!quizSubmitted ? (
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="button button--primary"
                onClick={handleSubmitQuiz}
              >
                <Icon name="check" size={16} />
                <span>Submit Quiz for Grading</span>
              </button>
            </div>
          ) : (
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.9rem" }}>
                {quizScore && quizScore >= 80
                  ? "🎉 Outstanding! You demonstrated high proficiency in student finance fundamentals."
                  : "Review the answers above and re-take the quiz to boost your score."}
              </span>
              <button
                type="button"
                className="button button--secondary"
                onClick={handleResetQuiz}
              >
                <span>Take Another Attempt</span>
              </button>
            </div>
          )}
        </div>

        {/* Past Assessment History */}
        <DataTable
          title="Past Assessment Transcript"
          subtitle="Official examination records and scored competencies"
          columns={[
            {
              key: "title",
              header: "Assessment Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "score",
              header: "Score",
              render: (r: any) => <span className="badge badge--success">{r.score}</span>,
            },
            {
              key: "grade",
              header: "Grade",
              render: (r: any) => r.grade,
            },
            {
              key: "date",
              header: "Completed Date",
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
                      title: "Answer Key",
                      message: `Reviewing answer key for ${r.title}`,
                      tone: "info",
                    })
                  }
                >
                  View Key
                </button>
              ),
            },
          ]}
          data={[
            { title: "Personal Taxation & 1099 Filing Basics", score: "94%", grade: "Grade A", date: "May 08, 2025" },
            { title: "Student Debt & Interest Capitalization", score: "100%", grade: "Grade A+", date: "Apr 22, 2025" },
            { title: "Credit Utilization & Score Mechanics", score: "90%", grade: "Grade A", date: "Mar 19, 2025" },
            { title: "Emergency Fund & Budgeting Principles", score: "88%", grade: "Grade B+", date: "Feb 10, 2025" },
          ]}
        />
      </div>
    )
  }

  // 6. CERTIFICATIONS
  if (navId === "certifications" || navName === "Certifications") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · CREDENTIALS</span>
            <div className="page-title">Certifications & Verifiable Badges</div>
            <div className="page-subtitle">
              Industry-recognized financial credentials cryptographically verified for resume and LinkedIn integration.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Link Copied",
                    message: "Copied credential verification link to clipboard!",
                    tone: "success",
                  })
                }}
              >
                <Icon name="globe" size={16} />
                <span>Share Public Verification Link</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Transcript Download",
                    message: "Prepared official transcript PDF download",
                    tone: "success",
                  })
                }}
              >
                <Icon name="document" size={16} />
                <span>Download Transcript PDF</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Verified Credentials</span>
            <div className="value">2 Issued</div>
            <div className="delta positive">
              <Icon name="shield" size={14} />
              <span>1 in progress (80% done)</span>
            </div>
          </div>
        </section>

        {/* Certificate Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {certifications.map((cert) => {
            const isIssued = cert.status.includes("Active")

            return (
              <div
                key={cert.id}
                className="card"
                style={{
                  padding: "1.5rem",
                  borderLeft: isIssued ? "5px solid #d97706" : "5px solid var(--color-border, #ddd)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <Icon name="shield" size={18} />
                      <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{cert.title}</h3>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                      Issuer: <strong>{cert.issuer}</strong> · {cert.modulesCompleted}
                    </div>
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "var(--color-text-secondary)", flexWrap: "wrap" }}>
                      <span>Credential ID: <code>{cert.credentialId}</code></span>
                      <span>Issued: {cert.issueDate}</span>
                      <span>Validity: {cert.expiry}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                    <span className={`badge ${isIssued ? "badge--success" : "badge--warning"}`}>
                      {cert.status}
                    </span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {cert.score}
                    </span>
                  </div>
                </div>

                {isIssued && (
                  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--color-border, #eee)", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="button button--secondary"
                      style={{ fontSize: "0.8rem", padding: "0.35rem 0.75rem" }}
                      onClick={() =>
                        showToast({
                          title: "Certificate Download",
                          message: `Generating PDF certificate for ${cert.title}`,
                          tone: "success",
                        })
                      }
                    >
                      <Icon name="document" size={14} />
                      <span>Download PDF Certificate</span>
                    </button>
                    <button
                      type="button"
                      className="button button--ghost"
                      style={{ fontSize: "0.8rem", padding: "0.35rem 0.75rem" }}
                      onClick={() =>
                        showToast({
                          title: "LinkedIn Integration",
                          message: `Adding ${cert.title} to LinkedIn Certifications`,
                          tone: "info",
                        })
                      }
                    >
                      <Icon name="arrow" size={14} />
                      <span>Add to LinkedIn</span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 7. AI FINANCE TUTOR
  if (navId === "ai_tutor" || navName === "AI Finance Tutor" || navName === "AI Tutor") {
    return (
      <div className="module-page">
        <section className="module-hero tone-purple">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · INTELLIGENT TUTOR</span>
            <div className="page-title">Sphere AI Finance & Career Tutor</div>
            <div className="page-subtitle">
              Ask anything about student debt repayment, student budgeting, campus tax forms, or early investment planning.
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
            <span className="label">Tutor AI Model</span>
            <div className="value">Sphere Edu-Pro</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>Real-time collegiate financial tutor</span>
            </div>
          </div>
        </section>

        {/* Prompt Recommendation Chips */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Recommended Tutor Inquiries:
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              "Explain Subsidized vs Unsubsidized student loans",
              "How do I build an 750+ credit score with a student card?",
              "Why should a student open a Roth IRA?",
              "Review my monthly campus budget surplus",
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="button button--ghost"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.65rem" }}
                onClick={() => handleSendTutorMessage(p)}
              >
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface Card */}
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
            {tutorMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "student" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background:
                    msg.sender === "student"
                      ? "var(--color-accent, #3b82f6)"
                      : "var(--color-bg-secondary, #f3f4f6)",
                  color: msg.sender === "student" ? "#fff" : "inherit",
                }}
              >
                <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.25rem" }}>
                  {msg.sender === "student" ? "Jordan Lee (You)" : "Sphere AI Student Tutor"} · {msg.time}
                </div>
                <div style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendTutorMessage()
            }}
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Ask a question about student loans, budgets, credit, or investing..."
              value={tutorInput}
              onChange={(e) => setTutorInput(e.target.value)}
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
              <span>Ask Tutor</span>
            </button>
          </form>
        </div>
      </div>
    )
  }

  // 8. ACHIEVEMENTS
  if (navId === "achievements" || navName === "Achievements") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · GAMIFICATION</span>
            <div className="page-title">Achievements, Streaks & Student Milestones</div>
            <div className="page-subtitle">
              Celebrate financial literacy wins, maintain budget streaks, and level up your financial scholar rank.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Perk Redeemed",
                    message: "Redeemed 500 XP for 15% Campus Bookstore Partner Credit!",
                    tone: "success",
                  })
                }}
              >
                <Icon name="sparkle" size={16} />
                <span>Redeem Student Perks</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Current Student Level</span>
            <div className="value">Level 4 Scholar</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>2,450 / 3,000 XP to Level 5</span>
            </div>
          </div>
        </section>

        {/* Streaks & Level Banner */}
        <section className="grid-metrics">
          <MetricCard
            label="Active Budgeting Streak"
            value="42 Days 🔥"
            detail="Logged daily campus expenses"
            trend="up"
            icon="activity"
            tone="gold"
          />
          <MetricCard
            label="Total Literacy XP"
            value="2,450 XP"
            detail="+350 XP earned this week"
            trend="up"
            icon="sparkle"
            tone="violet"
          />
          <MetricCard
            label="Badges Unlocked"
            value="5 of 7"
            detail="2 capstones remaining"
            trend="up"
            icon="shield"
            tone="emerald"
          />
          <MetricCard
            label="Campus Perk Balance"
            value="$25 Credit"
            detail="Usable at Campus Store"
            trend="neutral"
            icon="wallet"
            tone="blue"
          />
        </section>

        {/* Badges Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {achievementsList.map((ach) => (
            <div
              key={ach.id}
              className="card"
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: ach.unlocked ? 1 : 0.65,
                border: ach.unlocked ? "1px solid var(--color-border, #ddd)" : "1px dashed var(--color-border, #ccc)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span className="badge badge--neutral">{ach.category}</span>
                  <span className={`badge ${ach.unlocked ? "badge--success" : "badge--neutral"}`}>
                    {ach.xp}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <Icon name={ach.icon} size={18} />
                  <h4 style={{ margin: 0, fontSize: "1.05rem" }}>{ach.title}</h4>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.4, margin: "0 0 1rem 0" }}>
                  {ach.desc}
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--color-border, #eee)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                <span>Status: <strong>{ach.unlocked ? "Unlocked ✓" : "In Progress"}</strong></span>
                <span style={{ color: "var(--color-text-secondary)" }}>{ach.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 9. SETTINGS
  if (navId === "settings" || navName === "Settings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">STUDENT WORKSPACE · CONFIGURATION</span>
            <div className="page-title">Student Profile & Preferences</div>
            <div className="page-subtitle">
              Manage university enrollment details, monthly budget alert thresholds, and notification preferences.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Security Export",
                    message: "Exported student security and profile record",
                    tone: "info",
                  })
                }}
              >
                <Icon name="document" size={16} />
                <span>Download Profile Record</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Student Enrollment Status</span>
            <div className="value">Active Degree</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Expected: June 2026</span>
            </div>
          </div>
        </section>

        <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Academic Info */}
          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Academic & Student Identity</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileSettings.fullName}
                  onChange={(e) => setProfileSettings({ ...profileSettings, fullName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border, #ddd)",
                    background: "var(--color-bg-input, #fff)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: 500 }}>
                  University / College
                </label>
                <input
                  type="text"
                  value={profileSettings.university}
                  onChange={(e) => setProfileSettings({ ...profileSettings, university: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border, #ddd)",
                    background: "var(--color-bg-input, #fff)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Academic Major & Program
                </label>
                <input
                  type="text"
                  value={profileSettings.major}
                  onChange={(e) => setProfileSettings({ ...profileSettings, major: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border, #ddd)",
                    background: "var(--color-bg-input, #fff)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Graduation Year
                </label>
                <input
                  type="text"
                  value={profileSettings.classYear}
                  onChange={(e) => setProfileSettings({ ...profileSettings, classYear: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border, #ddd)",
                    background: "var(--color-bg-input, #fff)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Campus Email Address (.edu)
                </label>
                <input
                  type="email"
                  value={profileSettings.campusEmail}
                  onChange={(e) => setProfileSettings({ ...profileSettings, campusEmail: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border, #ddd)",
                    background: "var(--color-bg-input, #fff)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Monthly Stipend / Allowance ($)
                </label>
                <input
                  type="number"
                  value={profileSettings.monthlyStipend}
                  onChange={(e) => setProfileSettings({ ...profileSettings, monthlyStipend: parseFloat(e.target.value) || 0 })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border, #ddd)",
                    background: "var(--color-bg-input, #fff)",
                    color: "inherit",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Alert Preferences */}
          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Notification & Alert Rules</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem" }}>
                <input
                  type="checkbox"
                  checked={profileSettings.budgetAlertThreshold === 80}
                  onChange={(e) =>
                    setProfileSettings({
                      ...profileSettings,
                      budgetAlertThreshold: e.target.checked ? 80 : 100,
                    })
                  }
                />
                <span>Notify me when monthly campus spending reaches 80% of limit</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem" }}>
                <input
                  type="checkbox"
                  checked={profileSettings.dailyQuizReminder}
                  onChange={(e) =>
                    setProfileSettings({
                      ...profileSettings,
                      dailyQuizReminder: e.target.checked,
                    })
                  }
                />
                <span>Daily Quiz & Streak reminders (maintain active learning badge)</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem" }}>
                <input
                  type="checkbox"
                  checked={profileSettings.loanAlerts}
                  onChange={(e) =>
                    setProfileSettings({
                      ...profileSettings,
                      loanAlerts: e.target.checked,
                    })
                  }
                />
                <span>Quarterly interest capitalization alert for unsubsidized loans</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem" }}>
                <input
                  type="checkbox"
                  checked={profileSettings.weeklyDigest}
                  onChange={(e) =>
                    setProfileSettings({
                      ...profileSettings,
                      weeklyDigest: e.target.checked,
                    })
                  }
                />
                <span>Weekly Sphere AI Financial Coach digest</span>
              </label>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="button button--primary">
              <Icon name="check" size={16} />
              <span>Save Student Profile & Preferences</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Fallback for any unknown navId within student workspace
  return (
    <div className="module-page">
      <section className="module-hero tone-navy">
        <div>
          <span className="eyebrow">STUDENT WORKSPACE</span>
          <div className="page-title">{navName || "Student Module"}</div>
          <div className="page-subtitle">
            Explore your customized academic and collegiate financial readiness resources.
          </div>
        </div>
      </section>
      <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
        <p>This student module is ready. Select an item from the sidebar to continue.</p>
        <button
          type="button"
          className="button button--primary"
          onClick={() => onNavigate?.("My Budget")}
        >
          <span>Go to My Budget</span>
        </button>
      </div>
    </div>
  )
}
