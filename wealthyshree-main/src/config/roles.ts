import type {
  AuthorizationResult,
  Permission,
  RoleConfig,
  RoleKey,
  RoleQuickAction,
  UserSession,
} from "../types/roles"

export const ROLE_CONFIGURATIONS: Record<RoleKey, RoleConfig> = {
  individual: {
    key: "individual",
    displayName: "Individual",
    aliases: ["Individual"],
    category: "Personal",
    dashboardTitle: "Personal Wealth Dashboard",
    subtitle:
      "Consolidated personal balance sheet, asset growth, cash flow, and tax-smart savings.",
    icon: "user",
    persona: {
      name: "Alex Morgan",
      title: "Private Investor",
      initials: "AM",
      workspaceName: "Personal Wealth Workspace",
      badgeLabel: "Individual",
    },
    navigationMenu: [
      {
        label: "Wealth & Finance",
        items: [
          { id: "overview", name: "Overview", icon: "grid" },
          { id: "my_wealth", name: "My Wealth", icon: "wallet" },
          { id: "transactions", name: "Transactions", icon: "card" },
          { id: "investments", name: "Investments", icon: "trending" },
        ],
      },
      {
        label: "Planning & Protection",
        items: [
          { id: "budget_planner", name: "Budget Planner", icon: "pie" },
          { id: "financial_goals", name: "Financial Goals", icon: "goal" },
          { id: "insurance", name: "Insurance", icon: "insurance" },
          { id: "tax_planner", name: "Tax Planner", icon: "tax" },
          {
            id: "retirement_planner",
            name: "Retirement Planner",
            icon: "calendar",
          },
        ],
      },
      {
        label: "AI & Vault",
        items: [
          { id: "ai_coach", name: "AI Wealth Coach", icon: "ai" },
          { id: "documents", name: "Documents", icon: "lock" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "nw",
        label: "Net worth",
        value: "$4,285,640",
        detail: "+$286,450 (7.1%) YTD",
        icon: "trending",
      },
      {
        id: "investable",
        label: "Investable assets",
        value: "$2,704,310",
        detail: "+4.8% this quarter",
        icon: "pie",
        tone: "violet",
      },
      {
        id: "cashflow",
        label: "Monthly cash flow",
        value: "+$18,460",
        detail: "$6,240 above target",
        icon: "wallet",
        tone: "blue",
      },
      {
        id: "liabilities",
        label: "Total liabilities",
        value: "$428,290",
        detail: "↓ 3.2% this year",
        icon: "bank",
        tone: "gold",
      },
    ],
    quickActions: [
      {
        id: "add_asset",
        label: "Add asset",
        description: "Connect bank, brokerage, or real estate",
        icon: "plus",
        primary: true,
        requiredPermission: "write:own_assets",
      },
      {
        id: "run_tax_check",
        label: "Harvest tax losses",
        description: "Sphere AI identified $18,400 in offsets",
        icon: "tax",
        requiredPermission: "read:tax_scenarios",
      },
      {
        id: "rebalance",
        label: "Rebalance allocation",
        description: "Equities drifted +4.2% from target",
        icon: "pie",
        requiredPermission: "write:own_assets",
      },
      {
        id: "ask_ai",
        label: "Ask Sphere AI",
        description: "Consult personal financial planning agent",
        icon: "ai",
      },
    ],
    intendedFeatures: [
      {
        id: "bal_sheet",
        title: "Global Balance Sheet",
        description:
          "Live tracking of bank accounts, properties, portfolios, loans, and startup equity.",
        category: "core",
      },
      {
        id: "goal_engine",
        title: "Life Goal Engine",
        description:
          "Monte Carlo scenario planner for retirement, real estate purchase, and education funds.",
        category: "core",
      },
      {
        id: "ai_orchestrator",
        title: "Personal AI Co-Pilot",
        description:
          "10 coordinated agents providing proactive insights across tax, insurance, and risk.",
        category: "ai",
      },
      {
        id: "vault",
        title: "Encrypted Document Vault",
        description:
          "Zero-knowledge encryption for deeds, wills, insurance policies, and tax receipts.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "read:own_profile",
      "write:own_profile",
      "read:own_assets",
      "write:own_assets",
      "read:tax_scenarios",
    ],
    defaultGrantedPermissions: ["read:own_profile", "read:own_assets"],
    securityRequirement: "Standard KYC and email verification with 2FA.",
  },

  family: {
    key: "family",
    displayName: "Family",
    aliases: ["Family"],
    category: "Personal",
    dashboardTitle: "Family Wealth & Succession Dashboard",
    subtitle:
      "Consolidated multi-generational net worth, trust structures, shared budgets, and legacy transfer.",
    icon: "family",
    persona: {
      name: "The Morgan Household",
      title: "Family Trustee",
      initials: "MF",
      workspaceName: "Family Wealth Tree",
      badgeLabel: "Family",
    },
    navigationMenu: [
      {
        label: "Family Hub",
        items: [
          { id: "family_overview", name: "Family Overview", icon: "grid" },
          { id: "family_members", name: "Family Members", icon: "family" },
          { id: "shared_assets", name: "Shared Assets", icon: "bank" },
        ],
      },
      {
        label: "Planning & Goals",
        items: [
          { id: "family_budget", name: "Family Budget", icon: "wallet" },
          { id: "shared_goals", name: "Shared Goals", icon: "goal" },
          { id: "investments", name: "Investments", icon: "trending" },
          { id: "insurance", name: "Insurance", icon: "insurance" },
        ],
      },
      {
        label: "Legacy & Governance",
        items: [
          { id: "wealth_tree", name: "Family Wealth Tree", icon: "family" },
          { id: "estate_planning", name: "Estate Planning", icon: "document" },
          { id: "documents", name: "Documents", icon: "lock" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "fam_nw",
        label: "Family net worth",
        value: "$12,480,000",
        detail: "+$890,000 across 3 trusts",
        icon: "trending",
      },
      {
        id: "members",
        label: "Active members",
        value: "5 Members",
        detail: "2 generations connected",
        icon: "family",
        tone: "violet",
      },
      {
        id: "emerg",
        label: "Emergency runway",
        value: "14.2 Months",
        detail: "$280,000 in liquid reserve",
        icon: "shield",
        tone: "blue",
      },
      {
        id: "estate_score",
        label: "Succession readiness",
        value: "84%",
        detail: "All trust documents verified",
        icon: "document",
        tone: "gold",
      },
    ],
    quickActions: [
      {
        id: "invite_member",
        label: "Invite member",
        description: "Add spouse, child, or family trustee",
        icon: "plus",
        primary: true,
        requiredPermission: "manage:family_members",
      },
      {
        id: "update_tree",
        label: "Update Wealth Tree",
        description: "Map beneficiaries, trusts, and entities",
        icon: "family",
        requiredPermission: "write:family_group",
      },
      {
        id: "review_trust",
        label: "Review estate plan",
        description: "Check trust distributions and guardians",
        icon: "document",
        requiredPermission: "read:family_group",
      },
      {
        id: "allowance",
        label: "Distribute allowance",
        description: "Automated next-gen savings allowance",
        icon: "wallet",
        requiredPermission: "write:family_group",
      },
    ],
    intendedFeatures: [
      {
        id: "tree_vis",
        title: "Living Family Wealth Tree",
        description:
          "Visual map connecting legal entities, family trusts, physical assets, and beneficiaries.",
        category: "core",
      },
      {
        id: "segregated_vault",
        title: "Multi-Tiered Vault Sharing",
        description:
          "Role-restricted access where heirs see relevant documents only upon approval.",
        category: "compliance",
      },
      {
        id: "next_gen_coaching",
        title: "Next-Gen Financial Literacy",
        description:
          "Curated learning paths for youth and young adults to inherit responsibly.",
        category: "ai",
      },
      {
        id: "household_cashflow",
        title: "Consolidated Cash Flow",
        description:
          "Joint expense tracking, emergency buffer monitoring, and shared college funds.",
        category: "collaboration",
      },
    ],
    intendedPermissions: [
      "read:family_group",
      "write:family_group",
      "manage:family_members",
      "read:own_profile",
      "read:own_assets",
    ],
    defaultGrantedPermissions: ["read:family_group"],
    securityRequirement:
      "Multi-signature family approval for trust structure modifications.",
  },

  student: {
    key: "student",
    displayName: "Student",
    aliases: ["Student"],
    category: "Personal",
    dashboardTitle: "Student Financial & Career Readiness",
    subtitle:
      "Tuition funding, student debt management, monthly stipend budgeting, and credit foundation.",
    icon: "book",
    persona: {
      name: "Jordan Lee",
      title: "Undergraduate Scholar",
      initials: "JL",
      workspaceName: "Student Launchpad",
      badgeLabel: "Student",
    },
    navigationMenu: [
      {
        label: "Budget & Goals",
        items: [
          { id: "student_dash", name: "Student Dashboard", icon: "grid" },
          { id: "my_budget", name: "My Budget", icon: "wallet" },
          { id: "savings_goals", name: "Savings Goals", icon: "goal" },
        ],
      },
      {
        label: "Learning Academy",
        items: [
          { id: "learn_finance", name: "Learn Finance", icon: "book" },
          { id: "courses", name: "Courses", icon: "book" },
          { id: "assessments", name: "Assessments", icon: "activity" },
          { id: "certifications", name: "Certifications", icon: "shield" },
        ],
      },
      {
        label: "AI & Growth",
        items: [
          { id: "ai_tutor", name: "AI Finance Tutor", icon: "ai" },
          { id: "achievements", name: "Achievements", icon: "sparkle" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "total_debt",
        label: "Student loans",
        value: "$28,500",
        detail: "4.2% avg interest rate",
        icon: "card",
      },
      {
        id: "monthly_stipend",
        label: "Monthly surplus",
        value: "+$420",
        detail: "Stipend & campus job",
        icon: "wallet",
        tone: "blue",
      },
      {
        id: "scholarships_val",
        label: "Awarded aid",
        value: "$14,200",
        detail: "Covers 62% of tuition",
        icon: "sparkle",
        tone: "gold",
      },
      {
        id: "credit_score",
        label: "Credit score",
        value: "715",
        detail: "+24 pts in 6 months",
        icon: "activity",
        tone: "violet",
      },
    ],
    quickActions: [
      {
        id: "log_expense",
        label: "Log campus expense",
        description: "Track books, dining, and housing",
        icon: "plus",
        primary: true,
        requiredPermission: "write:student_budget",
      },
      {
        id: "simulate_payoff",
        label: "Model loan payoff",
        description: "See payoff timelines with income-driven plans",
        icon: "trending",
        requiredPermission: "read:student_loans",
      },
      {
        id: "find_grants",
        label: "Discover grants",
        description: "Match with 12 available campus scholarships",
        icon: "search",
      },
      {
        id: "learn_crypto_tax",
        label: "Financial literacy module",
        description: "Earn verified micro-credential",
        icon: "book",
      },
    ],
    intendedFeatures: [
      {
        id: "loan_engine",
        title: "Income-Driven Loan Simulator",
        description:
          "Forecast debt amortization and interest subsidies under federal and private options.",
        category: "core",
      },
      {
        id: "micro_budget",
        title: "Zero-Based Student Budget",
        description:
          "Envelope budgeting designed for campus stipends, allowances, and part-time jobs.",
        category: "core",
      },
      {
        id: "credit_boost",
        title: "Safe Credit Builder Guide",
        description:
          "Automated tracking for starter cards, rent reporting, and on-time utility payments.",
        category: "ai",
      },
      {
        id: "qr_creds",
        title: "Verifiable Micro-Credentials",
        description:
          "Cryptographically verifiable financial foundation badges recognized by top employers.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "read:student_budget",
      "write:student_budget",
      "read:student_loans",
      "read:own_profile",
    ],
    defaultGrantedPermissions: ["read:student_budget", "read:own_profile"],
    securityRequirement:
      "Edu email verification (.edu / accredited university domain).",
  },

  financial_advisor: {
    key: "financial_advisor",
    displayName: "Financial Advisor",
    aliases: ["Financial Advisor"],
    category: "Professional",
    dashboardTitle: "Financial Advisor Practice & Client Intelligence",
    subtitle:
      "Practice AUM analytics, client household allocations, model portfolio drift, and compliance reviews.",
    icon: "briefcase",
    persona: {
      name: "Marcus Sterling, CFP®",
      title: "Senior Wealth Advisor",
      initials: "MS",
      workspaceName: "Sterling Private Advisory",
      badgeLabel: "Financial Advisor",
    },
    navigationMenu: [
      {
        label: "Advisory Core",
        items: [
          { id: "advisor_dash", name: "Advisor Overview", icon: "grid" },
          { id: "clients", name: "Clients", icon: "briefcase" },
          { id: "fin_plans", name: "Financial Plans", icon: "document" },
          { id: "client_portfolios", name: "Client Portfolios", icon: "pie" },
        ],
      },
      {
        label: "Planning & Execution",
        items: [
          { id: "risk_profiles", name: "Risk Profiles", icon: "shield" },
          { id: "goal_planning", name: "Goal Planning", icon: "goal" },
          { id: "meetings", name: "Meetings", icon: "calendar" },
          { id: "reports", name: "Reports", icon: "trending" },
        ],
      },
      {
        label: "Intelligence & Settings",
        items: [
          { id: "ai_planner", name: "AI Planning Assistant", icon: "ai" },
          { id: "documents", name: "Documents", icon: "lock" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "households",
        label: "Client count",
        value: "84 Clients",
        detail: "+6 new households QTD",
        icon: "briefcase",
      },
      {
        id: "fin_plans",
        label: "Financial plans",
        value: "76 Plans",
        detail: "90.5% practice coverage",
        icon: "document",
        tone: "blue",
      },
      {
        id: "portfolios",
        label: "Client portfolios",
        value: "$148.6M",
        detail: "+$12.4M YTD net inflows",
        icon: "pie",
        tone: "emerald",
      },
      {
        id: "health_score",
        label: "Client financial health",
        value: "812 / 1000",
        detail: "68 households in Optimal",
        icon: "shield",
        tone: "emerald",
      },
      {
        id: "meetings",
        label: "Upcoming meetings",
        value: "7 Meetings",
        detail: "4 scheduled this week",
        icon: "calendar",
        tone: "violet",
      },
      {
        id: "pending_reviews",
        label: "Pending reviews",
        value: "6 Reviews",
        detail: "Reg BI & IPS suitability queue",
        icon: "alert",
        tone: "gold",
      },
      {
        id: "goal_progress",
        label: "Goal progress",
        value: "88% On Track",
        detail: "Across 214 tracked client goals",
        icon: "goal",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "new_proposal",
        label: "Create client proposal",
        description: "Build IPS-aligned asset allocation model",
        icon: "plus",
        primary: true,
        requiredPermission: "propose:trades",
      },
      {
        id: "batch_rebalance",
        label: "Execute batch rebalance",
        description: "Rebalance 12 drifted accounts simultaneously",
        icon: "activity",
        requiredPermission: "execute:trades",
      },
      {
        id: "client_review",
        label: "Generate review deck",
        description: "Export quarterly PDF tear sheet",
        icon: "document",
        requiredPermission: "read:client_roster",
      },
      {
        id: "suitability_check",
        label: "Run Reg BI suitability check",
        description: "Automated fiduciary suitability review",
        icon: "shield",
        requiredPermission: "read:client_roster",
      },
    ],
    intendedFeatures: [
      {
        id: "household_360",
        title: "Client Household 360",
        description:
          "Consolidated multi-account visibility across taxable, IRA, trust, and 401(k) accounts.",
        category: "core",
      },
      {
        id: "drift_engine",
        title: "Algorithmic Rebalancing Engine",
        description:
          "Tax-efficient rebalancing factoring in short-term vs long-term capital gains.",
        category: "core",
      },
      {
        id: "sphere_copilot",
        title: "Fiduciary AI Co-Pilot",
        description:
          "Generates custom client meeting agendas and highlights tax alpha opportunities.",
        category: "ai",
      },
      {
        id: "reg_bi",
        title: "Audit-Proof Fiduciary Trail",
        description:
          "Full timestamped logs of every trade proposal, risk profile change, and approval.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "read:client_roster",
      "write:client_roster",
      "propose:trades",
      "execute:trades",
    ],
    defaultGrantedPermissions: ["read:client_roster"],
    securityRequirement:
      "FINRA / SEC Series 65 / CFP® verified credential and broker-dealer SSO.",
  },

  ca: {
    key: "ca",
    displayName: "CA",
    aliases: ["CA", "Chartered Accountant"],
    category: "Professional",
    dashboardTitle: "CA Audit, Tax & Financial Accounting Cockpit",
    subtitle:
      "Statutory audits, multi-entity balance sheets, corporate tax reconciliations, and working paper sign-offs.",
    icon: "bank",
    persona: {
      name: "Priya Sharma, FCA",
      title: "Chartered Accountant & Partner",
      initials: "PS",
      workspaceName: "Sharma & Associates LLP",
      badgeLabel: "CA",
    },
    navigationMenu: [
      {
        label: "Audit & Accounting",
        items: [
          { id: "ca_dash", name: "CA Dashboard", icon: "bank" },
          { id: "clients", name: "Clients", icon: "briefcase" },
          { id: "fin_records", name: "Financial Records", icon: "document" },
          { id: "tax_filings", name: "Tax Filings", icon: "tax" },
        ],
      },
      {
        label: "Reconciliation & Controls",
        items: [
          { id: "reconciliation", name: "Reconciliation", icon: "sparkle" },
          {
            id: "fin_statements",
            name: "Financial Statements",
            icon: "trending",
          },
          {
            id: "compliance_cal",
            name: "Compliance Calendar",
            icon: "calendar",
          },
          { id: "reports", name: "Reports", icon: "document" },
        ],
      },
      {
        label: "Vault & System",
        items: [
          { id: "documents", name: "Documents", icon: "lock" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "client_accounts",
        label: "Client accounts",
        value: "42 Entities",
        detail: "8 Corporate, 34 LLP/Partnerships",
        icon: "briefcase",
      },
      {
        id: "pending_tax",
        label: "Pending tax filings",
        value: "9 Filings",
        detail: "Advance tax & TDS due in 15d",
        icon: "tax",
        tone: "gold",
      },
      {
        id: "fin_statements",
        label: "Financial statements",
        value: "32 Signed Off",
        detail: "7 under partner review",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "doc_requests",
        label: "Document requests",
        value: "14 Pending",
        detail: "Client ledger & 26AS uploads",
        icon: "document",
        tone: "violet",
      },
      {
        id: "reconciliation",
        label: "Reconciliation status",
        value: "98.2% Matched",
        detail: "18 bank discrepancies flagged",
        icon: "sparkle",
        tone: "blue",
      },
      {
        id: "compliance_deadlines",
        label: "Compliance deadlines",
        value: "3 Critical",
        detail: "Next statutory due date in 5d",
        icon: "calendar",
        tone: "gold",
      },
      {
        id: "acct_reviews",
        label: "Accounting reviews",
        value: "5 Audits",
        detail: "Statutory working paper queue",
        icon: "shield",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "start_audit",
        label: "Start statutory audit",
        description: "Initialize multi-entity audit working paper",
        icon: "plus",
        primary: true,
        requiredPermission: "conduct:statutory_audit",
      },
      {
        id: "run_reconciliation",
        label: "Run AI bank reconciliation",
        description: "Auto-match 4,200 ledger transactions",
        icon: "sparkle",
        requiredPermission: "conduct:statutory_audit",
      },
      {
        id: "sign_working_paper",
        label: "Sign working papers",
        description: "Cryptographic ICAI/CA digital signature",
        icon: "check",
        requiredPermission: "sign:audit_reports",
      },
      {
        id: "tax_pack",
        label: "Generate Tax Audit 3CD",
        description: "Export statutory tax audit schedules",
        icon: "tax",
        requiredPermission: "file:tax_returns",
      },
    ],
    intendedFeatures: [
      {
        id: "working_paper_suite",
        title: "Digital Working Paper Vault",
        description:
          "Version-controlled audit documentation meeting ISA and ICAI auditing standards.",
        category: "core",
      },
      {
        id: "auto_reconciliation",
        title: "Automated Ledger Reconciler",
        description:
          "AI parser matching 26AS, AIS, TIS, GSTN, and bank feed entries in seconds.",
        category: "ai",
      },
      {
        id: "depreciation_calc",
        title: "Companies Act & Tax Depreciation",
        description:
          "Dual-track depreciation schedules calculated across tangible and intangible assets.",
        category: "core",
      },
      {
        id: "dsc_integration",
        title: "Cryptographic Sign-off",
        description:
          "Direct integration with hardware tokens and DSC for statutory document signing.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "conduct:statutory_audit",
      "sign:audit_reports",
      "file:tax_returns",
      "read_only:audit_trail",
    ],
    defaultGrantedPermissions: ["read_only:audit_trail"],
    securityRequirement:
      "ICAI / ICAEW membership verification and Cryptographic DSC token.",
  },

  tax_consultant: {
    key: "tax_consultant",
    displayName: "Tax Consultant",
    aliases: ["Tax Consultant"],
    category: "Professional",
    dashboardTitle: "Tax Advisory & Compliance Management Suite",
    subtitle:
      "Multi-jurisdictional tax scenario modeling, capital gains optimization, and cross-border treaties.",
    icon: "tax",
    persona: {
      name: "David Chen, EA",
      title: "Managing Tax Consultant",
      initials: "DC",
      workspaceName: "Chen International Tax Group",
      badgeLabel: "Tax Consultant",
    },
    navigationMenu: [
      {
        label: "Tax Advisory",
        items: [
          { id: "tax_dash", name: "Tax Dashboard", icon: "tax" },
          { id: "clients", name: "Clients", icon: "user" },
          { id: "tax_planning", name: "Tax Planning", icon: "trending" },
          { id: "tax_calculations", name: "Tax Calculations", icon: "wallet" },
        ],
      },
      {
        label: "Filing & Deadlines",
        items: [
          { id: "filing_cal", name: "Filing Calendar", icon: "calendar" },
          { id: "tax_documents", name: "Tax Documents", icon: "document" },
          { id: "compliance", name: "Compliance", icon: "shield" },
          { id: "reports", name: "Reports", icon: "activity" },
        ],
      },
      {
        label: "AI & Preferences",
        items: [
          { id: "ai_tax", name: "AI Tax Assistant", icon: "ai" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "tax_clients",
        label: "Tax clients",
        value: "68 Clients",
        detail: "36 HNW, 18 Cross-Border, 14 Trusts",
        icon: "user",
      },
      {
        id: "tax_plans",
        label: "Tax plans",
        value: "54 Plans",
        detail: "$2.48M savings identified",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "filing_deadlines",
        label: "Filing deadlines",
        value: "4 Deadlines",
        detail: "Q2 Estimated tax due in 9d",
        icon: "calendar",
        tone: "gold",
      },
      {
        id: "pending_returns",
        label: "Pending returns",
        value: "11 Returns",
        detail: "5 awaiting docs, 4 under review",
        icon: "tax",
        tone: "violet",
      },
      {
        id: "tax_docs",
        label: "Tax documents",
        value: "248 Records",
        detail: "99.1% verified OCR processing",
        icon: "document",
        tone: "blue",
      },
      {
        id: "compliance_tasks",
        label: "Compliance tasks",
        value: "8 Tasks",
        detail: "FATCA / FBAR & Wash-Sale scans",
        icon: "shield",
        tone: "gold",
      },
      {
        id: "filing_status",
        label: "Filing status",
        value: "92% Filed",
        detail: "On-time tax filing compliance rate",
        icon: "check",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "run_harvest",
        label: "Scan for tax-loss harvest",
        description: "Sphere AI scans all linked client accounts",
        icon: "sparkle",
        primary: true,
        requiredPermission: "read:tax_scenarios",
      },
      {
        id: "model_scenario",
        label: "Simulate tax scenario",
        description: "Compare dual-jurisdiction tax outcomes",
        icon: "plus",
        requiredPermission: "read:tax_scenarios",
      },
      {
        id: "generate_schedule",
        label: "Export tax schedules",
        description: "Produce Schedule D & 8949 worksheets",
        icon: "document",
        requiredPermission: "file:tax_returns",
      },
      {
        id: "fatca_verify",
        label: "Verify FATCA / CRS status",
        description: "Run foreign financial asset check",
        icon: "globe",
        requiredPermission: "read:tax_scenarios",
      },
    ],
    intendedFeatures: [
      {
        id: "scenario_sandbox",
        title: "Dual-Tax Scenario Sandbox",
        description:
          "Model federal, state, and international tax impact before closing transactions.",
        category: "core",
      },
      {
        id: "harvest_algo",
        title: "Real-Time Loss Harvester",
        description:
          "Continuous wash-sale-compliant rebalancing suggestions to offset realized gains.",
        category: "ai",
      },
      {
        id: "treaty_analyzer",
        title: "Double Tax Treaty Engine",
        description:
          "Automated analysis of bilateral tax treaties (DTAA) and foreign tax credits (FTC).",
        category: "compliance",
      },
      {
        id: "irs_audit_pack",
        title: "Audit Defense Dossier",
        description:
          "Automated aggregation of cost-basis proofs, appraisals, and legal entity docs.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "read:tax_scenarios",
      "file:tax_returns",
      "read:client_roster",
    ],
    defaultGrantedPermissions: ["read:tax_scenarios"],
    securityRequirement:
      "Enrolled Agent (EA) / CPA credentials and IRS PTIN verification.",
  },

  investment_manager: {
    key: "investment_manager",
    displayName: "Investment Manager",
    aliases: ["Investment Manager"],
    category: "Professional",
    dashboardTitle: "Institutional Investment & Portfolio Management",
    subtitle:
      "Factor attribution, multi-asset portfolio rebalancing, downside risk modeling, and mandate execution.",
    icon: "pie",
    persona: {
      name: "Victoria Vance, CFA",
      title: "Chief Investment Officer",
      initials: "VV",
      workspaceName: "Vance Capital Management",
      badgeLabel: "Investment Manager",
    },
    navigationMenu: [
      {
        label: "Portfolio Core",
        items: [
          { id: "inv_dash", name: "Investment Overview", icon: "grid" },
          { id: "portfolios", name: "Portfolios", icon: "pie" },
          { id: "asset_alloc", name: "Asset Allocation", icon: "trending" },
          { id: "equities", name: "Equities", icon: "trending" },
        ],
      },
      {
        label: "Asset Classes",
        items: [
          { id: "mutual_funds", name: "Mutual Funds", icon: "briefcase" },
          { id: "etfs", name: "ETFs", icon: "card" },
          { id: "bonds", name: "Bonds", icon: "bank" },
          { id: "gold_assets", name: "Gold and Other Assets", icon: "sparkle" },
        ],
      },
      {
        label: "Risk & Execution",
        items: [
          { id: "risk_analysis", name: "Risk Analysis", icon: "shield" },
          { id: "rebalancing", name: "Rebalancing", icon: "activity" },
          { id: "reports", name: "Performance Reports", icon: "document" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "aum",
        label: "Assets under management",
        value: "$342.8M (Simulated)",
        detail: "+12.4% YTD modeled yield",
        icon: "pie",
        tone: "emerald",
      },
      {
        id: "perf",
        label: "Portfolio performance",
        value: "+14.2% YTD",
        detail: "+2.8% benchmark alpha (simulated)",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "alloc",
        label: "Asset allocation",
        value: "5 Asset Classes",
        detail: "58% Eq / 22% FI / 12% Alt / 8% Cash",
        icon: "pie",
        tone: "violet",
      },
      {
        id: "risk",
        label: "Risk exposure",
        value: "4.1% VaR (95%)",
        detail: "Sharpe Ratio: 1.84 (Simulated)",
        icon: "shield",
        tone: "blue",
      },
      {
        id: "alerts",
        label: "Concentration alerts",
        value: "3 Alerts",
        detail: "Tech sector drift > 28% mandate",
        icon: "alert",
        tone: "gold",
      },
      {
        id: "rebal",
        label: "Portfolio rebalancing",
        value: "8 Portfolios",
        detail: "Drift > 3.0% rebalance queue",
        icon: "activity",
        tone: "gold",
      },
      {
        id: "reports",
        label: "Performance reports",
        value: "18 Generated",
        detail: "Monthly factor attribution ready",
        icon: "document",
      },
    ],
    quickActions: [
      {
        id: "batch_trade",
        label: "Execute rebalance block",
        description: "Send multi-broker block order for execution",
        icon: "arrow",
        primary: true,
        requiredPermission: "execute:trades",
      },
      {
        id: "run_stress",
        label: "Run crisis stress test",
        description: "Simulate 2008 crash & rate spike scenarios",
        icon: "shield",
        requiredPermission: "propose:trades",
      },
      {
        id: "adjust_tilts",
        label: "Adjust momentum tilt",
        description: "Shift +2.5% to semiconductors & energy",
        icon: "pie",
        requiredPermission: "propose:trades",
      },
      {
        id: "export_factsheet",
        label: "Generate tear sheet",
        description: "Export GIPS-compliant performance PDF",
        icon: "document",
      },
    ],
    intendedFeatures: [
      {
        id: "barra_factors",
        title: "Barra-Style Factor Decomposition",
        description:
          "Decompose portfolio returns into value, momentum, quality, volatility, and size.",
        category: "core",
      },
      {
        id: "block_router",
        title: "Institutional Order Router",
        description:
          "Split and route large institutional trades with minimal market impact.",
        category: "core",
      },
      {
        id: "stress_simulator",
        title: "Parametric & Historical VaR",
        description:
          "Value-at-Risk modeling and tail-risk hedging scenario simulations.",
        category: "ai",
      },
      {
        id: "gips_engine",
        title: "GIPS Compliance Reporting",
        description:
          "Time-weighted rates of return and net-of-fee composite performance reporting.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "propose:trades",
      "execute:trades",
      "manage:private_bank_book",
    ],
    defaultGrantedPermissions: ["propose:trades"],
    securityRequirement:
      "CFA Charterholder or SEC-registered investment manager authorization.",
  },

  insurance_advisor: {
    key: "insurance_advisor",
    displayName: "Insurance Advisor",
    aliases: ["Insurance Advisor"],
    category: "Professional",
    dashboardTitle: "Insurance Practice & Coverage Assurance Desk",
    subtitle:
      "Policy coverage inventory, mortality and morbidity gap analysis, renewals timeline, and claims tracking.",
    icon: "insurance",
    persona: {
      name: "Sarah Jenkins, CLU®",
      title: "Senior Risk & Protection Specialist",
      initials: "SJ",
      workspaceName: "Jenkins Risk & Assurance",
      badgeLabel: "Insurance Advisor",
    },
    navigationMenu: [
      {
        label: "Client & Policies",
        items: [
          { id: "ins_dash", name: "Insurance Overview", icon: "grid" },
          { id: "clients", name: "Clients", icon: "user" },
          { id: "policies", name: "Policies", icon: "document" },
          { id: "health_ins", name: "Health Insurance", icon: "shield" },
        ],
      },
      {
        label: "Coverage Classes",
        items: [
          { id: "life_ins", name: "Life Insurance", icon: "insurance" },
          { id: "vehicle_ins", name: "Vehicle Insurance", icon: "card" },
          { id: "home_ins", name: "Home Insurance", icon: "home" },
          { id: "claims", name: "Claims", icon: "alert" },
        ],
      },
      {
        label: "Audits & Operations",
        items: [
          { id: "renewals", name: "Renewals", icon: "calendar" },
          { id: "coverage_analysis", name: "Coverage Analysis", icon: "pie" },
          { id: "reports", name: "Reports", icon: "trending" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "clients",
        label: "Clients",
        value: "142 Households",
        detail: "+12 onboarded this quarter",
        icon: "user",
        tone: "navy",
      },
      {
        id: "active_policies",
        label: "Active policies",
        value: "284 Policies",
        detail: "Across 16 partner carriers",
        icon: "document",
        tone: "blue",
      },
      {
        id: "coverage_summary",
        label: "Coverage summaries",
        value: "$214.5M (Simulated)",
        detail: "Total sum assured in force",
        icon: "shield",
        tone: "emerald",
      },
      {
        id: "renewals",
        label: "Renewals",
        value: "18 Policies",
        detail: "Expiring in next 30 days",
        icon: "calendar",
        tone: "gold",
      },
      {
        id: "pending_claims",
        label: "Pending claims",
        value: "4 Claims",
        detail: "$84,000 under carrier review",
        icon: "alert",
        tone: "gold",
      },
      {
        id: "premiums",
        label: "Premiums",
        value: "$1.86M (Simulated)",
        detail: "98.4% persistency rate",
        icon: "card",
        tone: "violet",
      },
      {
        id: "coverage_gaps",
        label: "Coverage gaps",
        value: "28 Flagged",
        detail: "Underinsured against income multiple",
        icon: "alert",
        tone: "gold",
      },
    ],
    quickActions: [
      {
        id: "run_gap_analysis",
        label: "Run coverage gap analysis",
        description: "Identify underinsured client households",
        icon: "alert",
        primary: true,
        requiredPermission: "read:insurance_policies",
      },
      {
        id: "generate_quotes",
        label: "Compare carrier quotes",
        description: "Multi-carrier term and whole life comparison",
        icon: "sparkle",
        requiredPermission: "issue:insurance_quotes",
      },
      {
        id: "send_renewal",
        label: "Send renewal alert",
        description: "Automated payment and grace period notice",
        icon: "notification",
        requiredPermission: "issue:insurance_quotes",
      },
      {
        id: "intake_claim",
        label: "Initiate claims packet",
        description: "Coordinate death benefit or disability filing",
        icon: "document",
        requiredPermission: "read:insurance_policies",
      },
    ],
    intendedFeatures: [
      {
        id: "human_capital_eval",
        title: "Human Capital Valuation Engine",
        description:
          "Calculates economic life value and recommended death benefit multiples.",
        category: "core",
      },
      {
        id: "policy_ocr",
        title: "AI Policy Dec-Page Extractor",
        description:
          "Uploads carrier PDFs and automatically structures deductibles, limits, and riders.",
        category: "ai",
      },
      {
        id: "key_person_calc",
        title: "Key-Person & Buy-Sell Calculator",
        description:
          "Models partnership buy-sell funding and executive bonus arrangements.",
        category: "core",
      },
      {
        id: "claims_fastrack",
        title: "Claims Concierge Tracker",
        description:
          "Step-by-step claims filing pipeline with real-time carrier status webhooks.",
        category: "collaboration",
      },
    ],
    intendedPermissions: [
      "read:insurance_policies",
      "issue:insurance_quotes",
      "read:client_roster",
    ],
    defaultGrantedPermissions: ["read:insurance_policies"],
    securityRequirement:
      "State Insurance Commissioner Producer License verification.",
  },

  wealth_coach: {
    key: "wealth_coach",
    displayName: "Wealth Coach",
    aliases: ["Wealth Coach"],
    category: "Professional",
    dashboardTitle: "Wealth Coaching & Financial Habit Studio",
    subtitle:
      "Client financial wellness tracking, habit consistency streaks, savings milestones, and goal coaching.",
    icon: "sparkle",
    persona: {
      name: "Elena Rostova, AFC®",
      title: "Master Financial Coach",
      initials: "ER",
      workspaceName: "Rostova Wealth Coaching",
      badgeLabel: "Wealth Coach",
    },
    navigationMenu: [
      {
        label: "Coaching Studio",
        items: [
          { id: "coach_dash", name: "Coaching Dashboard", icon: "grid" },
          { id: "clients", name: "Clients", icon: "user" },
          { id: "sessions", name: "Coaching Sessions", icon: "calendar" },
          { id: "goals", name: "Financial Goals", icon: "goal" },
        ],
      },
      {
        label: "Habits & Challenges",
        items: [
          { id: "habits", name: "Habit Tracking", icon: "activity" },
          { id: "challenges", name: "Savings Challenges", icon: "sparkle" },
          { id: "resources", name: "Learning Resources", icon: "book" },
          { id: "ai_coach", name: "AI Coaching Assistant", icon: "ai" },
        ],
      },
      {
        label: "Progress & System",
        items: [
          { id: "reports", name: "Progress Reports", icon: "trending" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "coaching_clients",
        label: "Coaching clients",
        value: "72 Clients",
        detail: "6 active cohorts & 1-on-1s",
        icon: "user",
        tone: "navy",
      },
      {
        id: "wellness_scores",
        label: "Financial wellness scores",
        value: "784 / 1000",
        detail: "+38 pts average improvement",
        icon: "sparkle",
        tone: "emerald",
      },
      {
        id: "sessions",
        label: "Coaching sessions",
        value: "16 Sessions",
        detail: "Scheduled this week",
        icon: "calendar",
        tone: "violet",
      },
      {
        id: "goals",
        label: "Financial goals",
        value: "186 Goals",
        detail: "84.5% actively funded",
        icon: "goal",
        tone: "blue",
      },
      {
        id: "habits",
        label: "Savings habits",
        value: "89.2% Adherence",
        detail: "Consistent 30-day budget logging",
        icon: "activity",
        tone: "emerald",
      },
      {
        id: "challenges",
        label: "Challenges",
        value: "5 Challenges",
        detail: "94 participants in 52-Week Save",
        icon: "sparkle",
        tone: "gold",
      },
      {
        id: "progress",
        label: "Client progress",
        value: "92% On Track",
        detail: "$524K debt eliminated (simulated)",
        icon: "trending",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "schedule_session",
        label: "Schedule coaching check-in",
        description: "Send video call link and preparation prompt",
        icon: "calendar",
        primary: true,
        requiredPermission: "manage:coaching_cohorts",
      },
      {
        id: "assign_habit",
        label: "Assign weekly habit",
        description: "E.g. No-spend weekend or savings transfer",
        icon: "plus",
        requiredPermission: "assign:client_milestones",
      },
      {
        id: "review_budget",
        label: "Review mentee cash flow",
        description: "Inspect spending leaks and positive trends",
        icon: "wallet",
        requiredPermission: "manage:coaching_cohorts",
      },
      {
        id: "issue_badge",
        label: "Award milestone badge",
        description: "Issue Debt-Free or First $100K credential",
        icon: "check",
        requiredPermission: "assign:client_milestones",
      },
    ],
    intendedFeatures: [
      {
        id: "mindset_survey",
        title: "Klontz Money Script Assessment",
        description:
          "Uncover client money avoidance, worship, status, or vigilance behaviors.",
        category: "ai",
      },
      {
        id: "debt_avalanche",
        title: "Visual Debt Avalanche Engine",
        description:
          "Interactive payoff visualizer showing interest saved with each extra payment.",
        category: "core",
      },
      {
        id: "nudges",
        title: "Sphere AI Accountability Nudges",
        description:
          "Gentle automated SMS/push encouragements aligned with client personal goals.",
        category: "ai",
      },
      {
        id: "cohort_community",
        title: "Peer Cohort Leaderboards",
        description:
          "Gamified group accountability challenges with anonymous savings milestones.",
        category: "collaboration",
      },
    ],
    intendedPermissions: [
      "manage:coaching_cohorts",
      "assign:client_milestones",
      "read:own_profile",
    ],
    defaultGrantedPermissions: ["manage:coaching_cohorts"],
    securityRequirement:
      "Accredited Financial Counselor (AFC®) or ICF coaching accreditation.",
  },

  family_office: {
    key: "family_office",
    displayName: "Family Office",
    aliases: ["Family Office"],
    category: "Institutional",
    dashboardTitle: "Family Office Governance & Consolidated Wealth",
    subtitle:
      "Consolidated multi-entity balance sheet, direct private equity, real estate holdings, and governance.",
    icon: "briefcase",
    persona: {
      name: "Arthur Pendelton",
      title: "Executive Managing Director",
      initials: "AP",
      workspaceName: "Pendelton Family Office",
      badgeLabel: "Family Office",
    },
    navigationMenu: [
      {
        label: "Governance & Wealth",
        items: [
          { id: "fo_dash", name: "Family Office Overview", icon: "briefcase" },
          { id: "family_members", name: "Family Members", icon: "family" },
          {
            id: "consolidated_wealth",
            name: "Consolidated Wealth",
            icon: "trending",
          },
          { id: "investments", name: "Investments", icon: "pie" },
        ],
      },
      {
        label: "Holdings & Trusts",
        items: [
          { id: "properties", name: "Properties", icon: "home" },
          { id: "business_holdings", name: "Business Holdings", icon: "bank" },
          { id: "trusts", name: "Trusts", icon: "shield" },
          { id: "estate_planning", name: "Estate Planning", icon: "document" },
        ],
      },
      {
        label: "Succession & System",
        items: [
          {
            id: "succession_planning",
            name: "Succession Planning",
            icon: "user",
          },
          { id: "documents", name: "Documents", icon: "lock" },
          { id: "reports", name: "Reports", icon: "document" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "fo_nw",
        label: "Consolidated family net worth",
        value: "$84,500,000",
        detail: "+$6.2M across 14 legal entities",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "investments",
        label: "Investments",
        value: "$42,800,000",
        detail: "Liquid portfolios & private equity",
        icon: "pie",
        tone: "navy",
      },
      {
        id: "properties",
        label: "Properties",
        value: "$26,400,000",
        detail: "5 prime direct estate holdings",
        icon: "home",
        tone: "blue",
      },
      {
        id: "biz_holdings",
        label: "Business holdings",
        value: "$15,300,000",
        detail: "3 operating company ventures",
        icon: "bank",
        tone: "violet",
      },
      {
        id: "trusts",
        label: "Trusts",
        value: "5 Family Trusts",
        detail: "Dynasty, GRAT & ILIT vehicles",
        icon: "shield",
        tone: "gold",
      },
      {
        id: "succession",
        label: "Succession planning",
        value: "88% Readiness",
        detail: "Next-gen governance council active",
        icon: "user",
        tone: "emerald",
      },
      {
        id: "estate_docs",
        label: "Estate documents",
        value: "48 Documents",
        detail: "100% verified in Master Vault",
        icon: "document",
      },
    ],
    quickActions: [
      {
        id: "convene_council",
        label: "Convene Family Council",
        description: "Publish agenda, financials, and voting resolutions",
        icon: "family",
        primary: true,
        requiredPermission: "read:family_office_entities",
      },
      {
        id: "fund_capital_call",
        label: "Approve capital call",
        description: "$450,000 draw for Sequoia Growth Fund VI",
        icon: "check",
        requiredPermission: "approve:capital_calls",
      },
      {
        id: "review_entities",
        label: "Audit legal entity roster",
        description: "Review registered agents, filings, and bylaws",
        icon: "document",
        requiredPermission: "read:family_office_entities",
      },
      {
        id: "grant_approval",
        label: "Disburse foundation grant",
        description: "Authorize wire for clean water initiative",
        icon: "globe",
        requiredPermission: "approve:capital_calls",
      },
    ],
    intendedFeatures: [
      {
        id: "entity_consolidation",
        title: "Multi-Entity Financial Consolidation",
        description:
          "Consolidates balance sheets and eliminates inter-company loans automatically.",
        category: "core",
      },
      {
        id: "cap_call_tracker",
        title: "Automated Capital Call Manager",
        description:
          "Tracks unfunded PE commitments, calculates liquidity buffers, and prevents default.",
        category: "core",
      },
      {
        id: "governance_portal",
        title: "Family Governance Voting",
        description:
          "Secure, tamper-evident digital voting on family constitutions and asset disposals.",
        category: "collaboration",
      },
      {
        id: "philanthropy_ledger",
        title: "Donor-Advised Fund & Grant Ledger",
        description:
          "Monitors philanthropic impact, tax deductibility caps, and endowment returns.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "read:family_office_entities",
      "approve:capital_calls",
      "read:family_group",
      "write:family_group",
    ],
    defaultGrantedPermissions: ["read:family_office_entities"],
    securityRequirement:
      "Institutional Family Office charter verification and Hardware Token MFA.",
  },

  private_bank: {
    key: "private_bank",
    displayName: "Private Bank",
    aliases: ["Private Bank"],
    category: "Institutional",
    dashboardTitle: "Private Banking & Ultra-HNW Wealth Management",
    subtitle:
      "Ultra-HNW tiering, bespoke Lombard credit facilities, structured products, and regulatory oversight.",
    icon: "bank",
    persona: {
      name: "Jean-Paul Laurent",
      title: "Managing Director, UHNW Division",
      initials: "JL",
      workspaceName: "Banque Privée Sphere",
      badgeLabel: "Private Bank",
    },
    navigationMenu: [
      {
        label: "Client Management",
        items: [
          { id: "pb_dash", name: "Private Banking Overview", icon: "bank" },
          { id: "clients", name: "Clients", icon: "user" },
          { id: "wealth_portfolios", name: "Wealth Portfolios", icon: "pie" },
          { id: "banking_services", name: "Banking Services", icon: "card" },
        ],
      },
      {
        label: "Execution & Insights",
        items: [
          { id: "client_requests", name: "Client Requests", icon: "briefcase" },
          {
            id: "relationship_mgmt",
            name: "Relationship Management",
            icon: "trending",
          },
          {
            id: "investment_insights",
            name: "Investment Insights",
            icon: "sparkle",
          },
          { id: "risk_monitoring", name: "Risk Monitoring", icon: "shield" },
        ],
      },
      {
        label: "Oversight & System",
        items: [
          { id: "compliance", name: "Compliance", icon: "document" },
          { id: "reports", name: "Reports", icon: "document" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "pb_clients",
        label: "Private banking clients",
        value: "320 UHNW Clients",
        detail: "$5M+ minimum relationship tier",
        icon: "user",
        tone: "navy",
      },
      {
        id: "aum",
        label: "Assets under management",
        value: "$1.24 Billion",
        detail: "+$84M net new money QTD",
        icon: "bank",
        tone: "emerald",
      },
      {
        id: "portfolios",
        label: "Client portfolios",
        value: "418 Portfolios",
        detail: "Bespoke discretionary mandates",
        icon: "pie",
        tone: "blue",
      },
      {
        id: "service_requests",
        label: "Service requests",
        value: "14 Active Requests",
        detail: "Lombard credit, FX & wires",
        icon: "briefcase",
        tone: "gold",
      },
      {
        id: "rm_retention",
        label: "Relationship management",
        value: "98.6% Retention",
        detail: "12 Senior Private Bankers active",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "insights",
        label: "Investment insights",
        value: "6 Active Insights",
        detail: "Tactical macro notes published",
        icon: "sparkle",
        tone: "violet",
      },
      {
        id: "compliance_alerts",
        label: "Compliance alerts",
        value: "2 KYC/AML Alerts",
        detail: "Cross-border suitability queue",
        icon: "shield",
        tone: "gold",
      },
    ],
    quickActions: [
      {
        id: "issue_term_sheet",
        label: "Structure Lombard loan",
        description: "Pledge equities against $5M liquidity line",
        icon: "plus",
        primary: true,
        requiredPermission: "underwrite:credit_lines",
      },
      {
        id: "bespoke_note",
        label: "Price autocallable note",
        description: "Configure custom 8.4% coupon barrier",
        icon: "pie",
        requiredPermission: "manage:private_bank_book",
      },
      {
        id: "aml_review",
        label: "Review PEP / Sanctions screening",
        description: "Automated continuous surveillance log",
        icon: "shield",
        requiredPermission: "manage:private_bank_book",
      },
      {
        id: "client_onboard",
        label: "Launch VIP onboarding",
        description: "Digital passport and beneficial owner review",
        icon: "check",
        requiredPermission: "manage:private_bank_book",
      },
    ],
    intendedFeatures: [
      {
        id: "lombard_engine",
        title: "Real-Time Lombard Margin Monitor",
        description:
          "Continuous LTV monitoring with auto-collateral top-up thresholds.",
        category: "core",
      },
      {
        id: "derivatives_pricer",
        title: "Structured Product Pricer",
        description:
          "Real-time pricing for reverse convertibles, capital-protected notes, and barrier options.",
        category: "core",
      },
      {
        id: "pep_surveillance",
        title: "Automated PEP & Sanctions Screening",
        description:
          "Instant screening against Dow Jones, World-Check, and OFAC watchlists.",
        category: "compliance",
      },
      {
        id: "rm_cockpit",
        title: "Relationship Manager Cockpit",
        description:
          "Aggregates life events, mandate updates, and liquidity triggers across RM teams.",
        category: "collaboration",
      },
    ],
    intendedPermissions: [
      "manage:private_bank_book",
      "underwrite:credit_lines",
      "read_only:audit_trail",
    ],
    defaultGrantedPermissions: ["manage:private_bank_book"],
    securityRequirement:
      "FinCEN / OCC / FINMA registered banking officer credentials & SAML 2.0 SSO.",
  },

  corporate_hr: {
    key: "corporate_hr",
    displayName: "Corporate HR",
    aliases: ["Corporate HR"],
    category: "Institutional",
    dashboardTitle: "Enterprise Workforce Financial Wellness Console",
    subtitle:
      "Workforce financial literacy analytics, ESOP / stock option pools, and 401(k) / retirement participation.",
    icon: "globe",
    persona: {
      name: "Karen Mitchell",
      title: "VP of Total Rewards & People Ops",
      initials: "KM",
      workspaceName: "Enterprise People Console",
      badgeLabel: "Corporate HR",
    },
    navigationMenu: [
      {
        label: "People & Programs",
        items: [
          { id: "hr_dash", name: "HR Dashboard", icon: "globe" },
          { id: "employees", name: "Employees", icon: "user" },
          {
            id: "wellness_programs",
            name: "Wellness Programs",
            icon: "activity",
          },
          {
            id: "financial_education",
            name: "Financial Education",
            icon: "book",
          },
        ],
      },
      {
        label: "Engagement & Events",
        items: [
          {
            id: "learning_activities",
            name: "Learning Activities",
            icon: "sparkle",
          },
          { id: "workshops", name: "Workshops", icon: "calendar" },
          {
            id: "program_analytics",
            name: "Program Analytics",
            icon: "trending",
          },
          {
            id: "communications",
            name: "Communications",
            icon: "notification",
          },
        ],
      },
      {
        label: "Administration",
        items: [
          { id: "reports", name: "Reports", icon: "document" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "employee_enrollment",
        label: "Employee enrollment",
        value: "4,850 Staff",
        detail: "98.4% workforce participation",
        icon: "user",
        tone: "navy",
      },
      {
        id: "wellness_programs",
        label: "Wellness programs",
        value: "8 Active Programs",
        detail: "Debt, 401(k), HSA & Homebuyer tracks",
        icon: "activity",
        tone: "emerald",
      },
      {
        id: "learning_engagement",
        label: "Learning engagement",
        value: "82.6% Active",
        detail: "Monthly active learning rate",
        icon: "sparkle",
        tone: "blue",
      },
      {
        id: "workshops",
        label: "Workshop schedules",
        value: "12 Workshops",
        detail: "Scheduled for current quarter",
        icon: "calendar",
        tone: "violet",
      },
      {
        id: "wellness_trends",
        label: "Aggregate wellness trends",
        value: "748 / 1000",
        detail: "+42 pts year-over-year enterprise gain",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "program_outcomes",
        label: "Program outcomes",
        value: "91.4% Positive Outcomes",
        detail: "Reduced financial stress & 94.2% match",
        icon: "shield",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "launch_workshop",
        label: "Schedule financial wellness seminar",
        description: "Deploy tax planning workshop for open enrollment",
        icon: "calendar",
        primary: true,
        requiredPermission: "read:workforce_wellness",
      },
      {
        id: "grant_esop",
        label: "Issue equity grant batch",
        description: "Allocate 120,000 stock options to Q2 hires",
        icon: "pie",
        requiredPermission: "manage:equity_plans",
      },
      {
        id: "run_census",
        label: "Export ERISA 5500 census",
        description: "Auto-generate 401(k) nondiscrimination testing pack",
        icon: "document",
        requiredPermission: "read:workforce_wellness",
      },
      {
        id: "notify_benefits",
        label: "Send enrollment broadcast",
        description: "Notify 380 un-enrolled team members",
        icon: "notification",
        requiredPermission: "read:workforce_wellness",
      },
    ],
    intendedFeatures: [
      {
        id: "cap_table_esop",
        title: "Automated ESOP Cap Table Sync",
        description:
          "Live equity valuation and individualized exercise tax projection calculator.",
        category: "core",
      },
      {
        id: "anonymous_pulse",
        title: "Anonymized Financial Stress Index",
        description:
          "Aggregate insights on employee emergency fund deficits without compromising privacy.",
        category: "ai",
      },
      {
        id: "erisa_audit",
        title: "ERISA 401(k) Nondiscrimination Suite",
        description:
          "Pre-tests ADP/ACP compliance testing to prevent costly year-end plan corrections.",
        category: "compliance",
      },
      {
        id: "benefits_concierge",
        title: "Sphere AI Benefits Assistant",
        description:
          "Direct employee co-pilot answering HSA vs FSA and deductible questions 24/7.",
        category: "ai",
      },
    ],
    intendedPermissions: [
      "read:workforce_wellness",
      "manage:equity_plans",
      "read:own_profile",
    ],
    defaultGrantedPermissions: ["read:workforce_wellness"],
    securityRequirement:
      "Corporate HR Administrator credentials & HIPAA/SOC2 privacy acknowledgment.",
  },

  university: {
    key: "university",
    displayName: "University",
    aliases: ["University"],
    category: "Institutional",
    dashboardTitle:
      "University Academic Financial Literacy & Campus Intelligence",
    subtitle:
      "Enrolled student learners, accredited finance courses, faculty instructors, completion velocity, assessments, and verifiable certifications.",
    icon: "book",
    persona: {
      name: "Dr. Robert Vance",
      title: "Vice Chancellor & Academic Trustee",
      initials: "RV",
      workspaceName: "University Academic Console",
      badgeLabel: "University",
    },
    navigationMenu: [
      {
        label: "Academic Core",
        items: [
          { id: "univ_dash", name: "University Dashboard", icon: "book" },
          { id: "students", name: "Students", icon: "user" },
          { id: "courses", name: "Courses", icon: "book" },
          { id: "instructors", name: "Instructors", icon: "briefcase" },
        ],
      },
      {
        label: "Curriculum & Mastery",
        items: [
          {
            id: "learning_programs",
            name: "Learning Programs",
            icon: "sparkle",
          },
          { id: "assessments", name: "Assessments", icon: "activity" },
          { id: "certifications", name: "Certifications", icon: "check" },
          { id: "events", name: "Events", icon: "calendar" },
        ],
      },
      {
        label: "Analytics & System",
        items: [
          { id: "analytics", name: "Analytics", icon: "trending" },
          { id: "reports", name: "Reports", icon: "document" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "enrolled_learners",
        label: "Enrolled learners",
        value: "14,850 Learners",
        detail: "Across 12 campus colleges",
        icon: "user",
        tone: "navy",
      },
      {
        id: "courses",
        label: "Courses",
        value: "28 Courses",
        detail: "Accredited finance modules",
        icon: "book",
        tone: "blue",
      },
      {
        id: "instructors",
        label: "Instructors",
        value: "46 Instructors",
        detail: "Faculty professors & CFPs",
        icon: "briefcase",
        tone: "emerald",
      },
      {
        id: "completion_rates",
        label: "Completion rates",
        value: "87.4% Rate",
        detail: "+6.2% vs semester benchmark",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "assessments",
        label: "Assessments",
        value: "3,420 Completed",
        detail: "92.6% cohort pass rate",
        icon: "sparkle",
        tone: "violet",
      },
      {
        id: "certifications",
        label: "Certifications",
        value: "1,890 Issued",
        detail: "Verifiable micro-credentials",
        icon: "check",
        tone: "gold",
      },
      {
        id: "student_engagement",
        label: "Student engagement",
        value: "94.2% Active",
        detail: "Weekly campus participation",
        icon: "activity",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "publish_course",
        label: "Publish new course module",
        description: "Deploy interactive wealth & capital curriculum",
        icon: "book",
        primary: true,
        requiredPermission: "read:workforce_wellness",
      },
      {
        id: "schedule_event",
        label: "Schedule financial literacy seminar",
        description: "Organize campus financial independence workshop",
        icon: "calendar",
        requiredPermission: "read:workforce_wellness",
      },
      {
        id: "issue_diploma_creds",
        label: "Issue verifiable micro-credentials",
        description: "Batch mint 420 blockchain-verifiable badges",
        icon: "sparkle",
        requiredPermission: "approve:scholarship_disbursements",
      },
      {
        id: "export_analytics",
        label: "Export student cohort analytics",
        description: "Download academic completion & mastery PDF",
        icon: "document",
        requiredPermission: "read:workforce_wellness",
      },
    ],
    intendedFeatures: [
      {
        id: "endowment_allocator",
        title: "Yale Model Endowment Allocator",
        description:
          "Institutional allocation engine modeled on top university endowments.",
        category: "core",
      },
      {
        id: "finaid_optimizer",
        title: "Automated Financial Aid Packer",
        description:
          "Merit and need-based algorithm maximizing enrollment yields and student equity.",
        category: "core",
      },
      {
        id: "verifiable_transcripts",
        title: "Verifiable Credential Issuer",
        description:
          "Decentralized verifiable credentials for resume-ready financial skills.",
        category: "compliance",
      },
      {
        id: "donor_attribution",
        title: "Named Gift Attribution Tracker",
        description:
          "Ensures donor restricted gifts are strictly applied to designated chairs and programs.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "read:endowment_portfolio",
      "approve:scholarship_disbursements",
      "read:workforce_wellness",
    ],
    defaultGrantedPermissions: ["read:endowment_portfolio"],
    securityRequirement:
      "University Bursar / Financial Aid Officer SSO verification.",
  },

  government_organizations: {
    key: "government_organizations",
    displayName: "Government Organizations",
    aliases: ["Government Organizations", "Government"],
    category: "Governance",
    dashboardTitle:
      "Public Sector Financial Literacy & Citizen Welfare Console",
    subtitle:
      "Public financial programs, beneficiary welfare groups, nationwide literacy campaigns, regional analytics, and verified impact monitoring.",
    icon: "bank",
    persona: {
      name: "Ambassador S. Vance",
      title: "Director of Public Finance & Citizen Welfare",
      initials: "SV",
      workspaceName: "Public Welfare & Programs Console",
      badgeLabel: "Government",
    },
    navigationMenu: [
      {
        label: "Initiatives & Cohorts",
        items: [
          { id: "gov_dash", name: "Government Dashboard", icon: "bank" },
          { id: "programs", name: "Programs", icon: "activity" },
          {
            id: "beneficiary_groups",
            name: "Beneficiary Groups",
            icon: "user",
          },
          {
            id: "financial_literacy",
            name: "Financial Literacy",
            icon: "book",
          },
        ],
      },
      {
        label: "Monitoring & Analytics",
        items: [
          {
            id: "regional_analytics",
            name: "Regional Analytics",
            icon: "globe",
          },
          {
            id: "program_monitoring",
            name: "Program Monitoring",
            icon: "trending",
          },
          { id: "reports", name: "Reports", icon: "document" },
        ],
      },
      {
        label: "Records & Governance",
        items: [
          { id: "documents", name: "Documents", icon: "lock" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "programs",
        label: "Programs",
        value: "18 Programs",
        detail: "Active regional initiatives",
        icon: "bank",
        tone: "navy",
      },
      {
        id: "beneficiary_groups",
        label: "Beneficiary groups",
        value: "1.85 Million",
        detail: "Direct citizen beneficiaries",
        icon: "user",
        tone: "emerald",
      },
      {
        id: "fin_literacy_init",
        label: "Financial literacy initiatives",
        value: "12 Campaigns",
        detail: "Schools & community centers",
        icon: "book",
        tone: "blue",
      },
      {
        id: "regional_summaries",
        label: "Regional summaries",
        value: "8 Districts",
        detail: "100% regional monitoring coverage",
        icon: "globe",
        tone: "violet",
      },
      {
        id: "program_progress",
        label: "Program progress",
        value: "88.6% On Track",
        detail: "Milestone completion rate",
        icon: "trending",
        tone: "emerald",
      },
      {
        id: "impact_reporting",
        label: "Impact reporting",
        value: "94.2% Efficacy",
        detail: "Surveyed financial security gains",
        icon: "shield",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "launch_campaign",
        label: "Launch regional literacy campaign",
        description: "Deploy community financial workshops in District 4",
        icon: "book",
        primary: true,
        requiredPermission: "view:sovereign_aggregates",
      },
      {
        id: "audit_disbursements",
        label: "Audit beneficiary disbursement pool",
        description: "Inspect $42.5M direct welfare fund transfers",
        icon: "shield",
        requiredPermission: "audit:public_funds",
      },
      {
        id: "convene_taskforce",
        label: "Convene inter-agency task force",
        description: "Publish cross-departmental coordination agenda",
        icon: "user",
        requiredPermission: "view:sovereign_aggregates",
      },
      {
        id: "generate_impact",
        label: "Generate public impact report",
        description: "Export annual citizen financial welfare audit",
        icon: "document",
        requiredPermission: "view:sovereign_aggregates",
      },
    ],
    intendedFeatures: [
      {
        id: "actuarial_engine",
        title: "National Actuarial Pension Simulator",
        description:
          "Models demographic aging curves, retirement ages, and sovereign contributions.",
        category: "core",
      },
      {
        id: "fraud_detector",
        title: "Public Welfare Anomaly Detector",
        description:
          "Graph neural network flagging duplicate welfare and subsidy disbursements.",
        category: "ai",
      },
      {
        id: "macro_stress_suite",
        title: "Central Bank Stress Test Suite",
        description:
          "Simulates liquidity constraints and credit downgrades across systemic institutions.",
        category: "core",
      },
      {
        id: "public_open_data",
        title: "Open Government Transparency API",
        description:
          "Cryptographically verified, anonymized budget disclosure for public accountability.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "view:sovereign_aggregates",
      "audit:public_funds",
      "read_only:audit_trail",
    ],
    defaultGrantedPermissions: ["view:sovereign_aggregates"],
    securityRequirement:
      "Government PKI CAC/PIV card authentication & FedRAMP High credentialing.",
  },

  auditors: {
    key: "auditors",
    displayName: "Auditors",
    aliases: ["Auditors", "Auditor"],
    category: "Governance",
    dashboardTitle: "Independent Audit, Compliance & Assurance Console",
    subtitle:
      "Audit engagement management, financial records verification, immutable evidence repository, review queue, findings resolution, and audit trails.",
    icon: "shield",
    persona: {
      name: "Teresa Bradley, CIA, CISA",
      title: "Lead Independent Audit Partner",
      initials: "TB",
      workspaceName: "Independent Audit Assurance Desk",
      badgeLabel: "Auditor",
    },
    navigationMenu: [
      {
        label: "Audit Engagements",
        items: [
          { id: "audit_dash", name: "Audit Dashboard", icon: "shield" },
          {
            id: "audit_engagements",
            name: "Audit Engagements",
            icon: "briefcase",
          },
          { id: "fin_records", name: "Financial Records", icon: "bank" },
          {
            id: "evidence_repo",
            name: "Evidence Repository",
            icon: "document",
          },
        ],
      },
      {
        label: "Review & Controls",
        items: [
          { id: "review_queue", name: "Review Queue", icon: "alert" },
          { id: "findings", name: "Findings", icon: "shield" },
          {
            id: "compliance_checks",
            name: "Compliance Checks",
            icon: "check",
          },
          { id: "audit_trail", name: "Audit Trail", icon: "activity" },
        ],
      },
      {
        label: "Reporting & System",
        items: [
          { id: "reports", name: "Reports", icon: "document" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "audit_engagements",
        label: "Audit engagements",
        value: "18 Engagements",
        detail: "12 SOC 2 Type II, 6 statutory",
        icon: "briefcase",
        tone: "navy",
      },
      {
        id: "financial_records",
        label: "Financial records",
        value: "420 Ledgers",
        detail: "Reconciled multi-entity accounts",
        icon: "bank",
        tone: "blue",
      },
      {
        id: "evidence_verification",
        label: "Evidence awaiting verification",
        value: "14 Items Pending",
        detail: "Cryptographic hash validation",
        icon: "document",
        tone: "gold",
      },
      {
        id: "pending_reviews",
        label: "Pending reviews",
        value: "6 Reviews",
        detail: "Workpapers ready for partner sign-off",
        icon: "alert",
        tone: "gold",
      },
      {
        id: "audit_findings",
        label: "Audit findings",
        value: "4 Low-Risk Findings",
        detail: "0 critical, remediation active",
        icon: "shield",
        tone: "gold",
      },
      {
        id: "compliance_checks",
        label: "Compliance checks",
        value: "98.8% Verified",
        detail: "SOC 2, ISO 27001, SOX compliant",
        icon: "check",
        tone: "emerald",
      },
      {
        id: "deadlines",
        label: "Deadlines",
        value: "3 Approaching",
        detail: "Statutory filings due in 14 days",
        icon: "calendar",
        tone: "violet",
      },
      {
        id: "audit_trails",
        label: "Audit trails",
        value: "100% Immutable",
        detail: "Zero hash tampering or ledger drift",
        icon: "activity",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "request_evidence",
        label: "Request evidence sample",
        description: "Send cryptographically tracked evidence request",
        icon: "plus",
        primary: true,
        requiredPermission: "read_only:audit_trail",
      },
      {
        id: "signoff_workpaper",
        label: "Sign off audit workpaper",
        description: "Partner approval for revenue recognition sample",
        icon: "check",
        requiredPermission: "certify:compliance_reports",
      },
      {
        id: "log_finding",
        label: "Log compliance finding",
        description: "Record control exception with remediation milestone",
        icon: "alert",
        requiredPermission: "flag:control_exceptions",
      },
      {
        id: "opinion_letter",
        label: "Generate audit opinion letter",
        description: "Draft independent auditor attestation report",
        icon: "document",
        requiredPermission: "certify:compliance_reports",
      },
    ],
    intendedFeatures: [
      {
        id: "hash_trail",
        title: "SHA-256 Tamper-Evident Audit Trail",
        description:
          "Every database write, transaction, and config change is verified via cryptographic chain.",
        category: "compliance",
      },
      {
        id: "sod_validator",
        title: "Automated Segregation of Duties Matrix",
        description:
          "Ensures no single identity possesses both transaction initiation and approval rights.",
        category: "core",
      },
      {
        id: "statistical_sampler",
        title: "AICPA-Compliant Statistical Sampler",
        description:
          "Generates unbiased random sample populations for controls testing.",
        category: "core",
      },
      {
        id: "read_only_enclave",
        title: "Zero-Mutation Auditor Enclave",
        description:
          "Strict read-only workspace preventing accidental or deliberate modification of records.",
        category: "compliance",
      },
    ],
    intendedPermissions: [
      "read_only:audit_trail",
      "flag:control_exceptions",
      "certify:compliance_reports",
    ],
    defaultGrantedPermissions: ["read_only:audit_trail"],
    securityRequirement:
      "Independent Auditor accredited firm signature (CISA / CPA) & Strict Read-Only Enclave.",
  },

  super_admin: {
    key: "super_admin",
    displayName: "Super Admin",
    aliases: ["Super Admin", "Admin"],
    category: "Governance",
    dashboardTitle: "Global Platform Administration & Root Operations",
    subtitle:
      "Multi-tenant user registry, role entitlements, organization workspaces, subscription billing, and real-time security telemetry.",
    icon: "settings",
    persona: {
      name: "Security Operations Admin",
      title: "Global Principal System Architect",
      initials: "SA",
      workspaceName: "WealthSphere Root Console",
      badgeLabel: "Super Admin",
    },
    navigationMenu: [
      {
        label: "User & Access Administration",
        items: [
          { id: "admin_dash", name: "Admin Overview", icon: "settings" },
          { id: "user_mgmt", name: "User Management", icon: "user" },
          { id: "role_mgmt", name: "Role Management", icon: "shield" },
          { id: "organizations", name: "Organizations", icon: "globe" },
        ],
      },
      {
        label: "Tenancy & Commercial",
        items: [
          {
            id: "workspace_mgmt",
            name: "Workspace Management",
            icon: "briefcase",
          },
          { id: "subscriptions", name: "Subscriptions", icon: "card" },
          { id: "access_control", name: "Access Control", icon: "lock" },
          { id: "security_logs", name: "Security Logs", icon: "shield" },
        ],
      },
      {
        label: "Configuration & Governance",
        items: [
          {
            id: "platform_config",
            name: "Platform Configuration",
            icon: "activity",
          },
          { id: "ai_config", name: "AI Configuration", icon: "ai" },
          { id: "audit_logs", name: "Audit Logs", icon: "document" },
          { id: "settings", name: "Settings", icon: "settings" },
        ],
      },
    ],
    relevantMetrics: [
      {
        id: "total_users",
        label: "Registered & active users",
        value: "248.5K Users",
        detail: "184.2K (74.1%) 30-Day Active",
        icon: "user",
        tone: "navy",
      },
      {
        id: "orgs_workspaces",
        label: "Organizations & workspaces",
        value: "1,420 Orgs / 3,890 Spaces",
        detail: "Multi-tenant isolated enclaves",
        icon: "globe",
        tone: "blue",
      },
      {
        id: "subscriptions_arr",
        label: "Subscription overview",
        value: "$4.82M ARR",
        detail: "68% Enterprise / 24% Pro / 8% Team",
        icon: "card",
        tone: "emerald",
      },
      {
        id: "system_activity",
        label: "System activity",
        value: "28.4M Daily Reqs",
        detail: "P99 Latency: 38ms across 12 regions",
        icon: "trending",
        tone: "violet",
      },
      {
        id: "pending_access",
        label: "Pending access requests",
        value: "14 Requests",
        detail: "Elevated IAM & SSO reviews",
        icon: "alert",
        tone: "gold",
      },
      {
        id: "security_events",
        label: "Security & auth events",
        value: "0 Breaches / 98 Blocks",
        detail: "WAF automated threat shield active",
        icon: "shield",
        tone: "gold",
      },
      {
        id: "service_health",
        label: "Service health indicators",
        value: "99.99% Uptime",
        detail: "All 18 microservices operational",
        icon: "activity",
        tone: "emerald",
      },
    ],
    quickActions: [
      {
        id: "provision_tenant",
        label: "Provision new organization",
        description: "Initialize isolated multi-tenant database & KMS keys",
        icon: "plus",
        primary: true,
        requiredPermission: "manage:tenants",
      },
      {
        id: "review_access_reqs",
        label: "Review pending access requests",
        description: "Audit 14 elevated privilege and SSO access requests",
        icon: "alert",
        requiredPermission: "manage:rbac_roles",
      },
      {
        id: "adjust_ai_limits",
        label: "Configure AI safety guardrails",
        description: "Set prompt rate limits and model guardrails",
        icon: "ai",
        requiredPermission: "configure:ai_policies",
      },
      {
        id: "rotate_keys",
        label: "Rotate platform master keys",
        description: "Trigger cryptographic KMS key rotation & HSM audit",
        icon: "lock",
        requiredPermission: "manage:rbac_roles",
      },
    ],
    intendedFeatures: [
      {
        id: "tenant_isolation",
        title: "Cryptographic Tenant Isolation",
        description:
          "Dedicated customer-managed encryption keys (CMEK) and row-level tenancy separation.",
        category: "compliance",
      },
      {
        id: "ai_guardrails",
        title: "Sphere AI Policy & Safety Enforcer",
        description:
          "Human-in-the-loop gatekeeper requiring user sign-off before financial executions.",
        category: "ai",
      },
      {
        id: "dynamic_rbac",
        title: "Fine-Grained ABAC / RBAC Engine",
        description:
          "Contextual role permissions factoring in IP geofence, device health, and MFA strength.",
        category: "core",
      },
      {
        id: "live_telemetry",
        title: "Real-Time APM & Telemetry",
        description:
          "Real-time tracing of P99 database latencies, token consumption, and webhook health.",
        category: "core",
      },
    ],
    intendedPermissions: [
      "manage:tenants",
      "manage:rbac_roles",
      "configure:ai_policies",
      "view:system_telemetry",
      "read_only:audit_trail",
    ],
    defaultGrantedPermissions: [],
    securityRequirement:
      "Root hardware security key (FIDO2 / YubiKey) + Multi-party quorum sign-off.",
  },
}

/** All 16 role keys in canonical order */
export const ROLE_KEYS = Object.keys(ROLE_CONFIGURATIONS) as RoleKey[]

/** List of all 16 role display names for onboarding and selectors */
export const ROLES_LIST = ROLE_KEYS.map(
  (key) => ROLE_CONFIGURATIONS[key].displayName,
)

/** Retrieve all 16 role configuration objects */
export function getAllRoleConfigs(): RoleConfig[] {
  return ROLE_KEYS.map((key) => ROLE_CONFIGURATIONS[key])
}

/**
 * Normalizes any role input (key, display name, legacy name, or case variation)
 * to its canonical RoleConfig. Defaults to 'individual' if unrecognized.
 */
export function getRoleConfig(identifier?: string | null): RoleConfig {
  if (!identifier) return ROLE_CONFIGURATIONS.individual

  const normalized = identifier
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "")

  for (const config of Object.values(ROLE_CONFIGURATIONS)) {
    if (config.key.replace(/_/g, "") === normalized) return config
    if (config.displayName.toLowerCase().replace(/[\s_-]+/g, "") === normalized)
      return config
    for (const alias of config.aliases) {
      if (alias.toLowerCase().replace(/[\s_-]+/g, "") === normalized)
        return config
    }
  }

  return ROLE_CONFIGURATIONS.individual
}

/**
 * Evaluates whether a user session possesses a given permission.
 * Enforces Zero-Trust: Selecting a role view DOES NOT grant permissions!
 * Permissions must be explicitly listed in userSession.grantedPermissions.
 */
export function hasPermission(
  session: UserSession | null | undefined,
  requiredPermission?: Permission,
): boolean {
  if (!requiredPermission) return true // Public / open action
  if (!session) return false

  return session.grantedPermissions.includes(requiredPermission)
}

/**
 * Validates authorization for a quick action.
 * Returns detailed security status explaining whether access is permitted,
 * or if verified role credentials/licensing are required.
 */
export function authorizeAction(
  session: UserSession | null | undefined,
  action: RoleQuickAction,
  activeRole: RoleConfig,
): AuthorizationResult {
  if (!action.requiredPermission) {
    return { allowed: true }
  }

  const isGranted = hasPermission(session, action.requiredPermission)
  if (isGranted) {
    return { allowed: true }
  }

  const isRoleIntended = activeRole.intendedPermissions.includes(
    action.requiredPermission,
  )
  return {
    allowed: false,
    requiredPermission: action.requiredPermission,
    requiresVerification: isRoleIntended,
    reason: isRoleIntended
      ? `This action requires verified credentials for the ${activeRole.displayName} role. (${activeRole.securityRequirement})`
      : `Your current session lacks the required permission: ${action.requiredPermission}`,
  }
}
