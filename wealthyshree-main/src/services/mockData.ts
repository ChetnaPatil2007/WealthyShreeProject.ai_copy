/**
 * WealthSphere.ai - Centralized Mock Data Store
 *
 * SIMULATED & MOCK DATASETS for Frontend Demo & UI Verification.
 * Note: These in-memory datasets provide realistic structures and data models
 * that can be replaced by real backend REST / GraphQL / WebSocket API integrations.
 */

export interface MockAsset {
  id: string
  name: string
  category: "Equities" | "Real Estate" | "Fixed Income" | "Cash & HYSA" | "Private Equity" | "Crypto" | "Alternative"
  institution: string
  valuation: number
  changeYtd: string
  isLiquid: boolean
  lastUpdated: string
}

export interface MockGoal {
  id: string
  name: string
  category: "Retirement" | "Real Estate" | "Education" | "Emergency" | "Venture" | "Legacy"
  targetAmount: number
  currentAmount: number
  targetDate: string
  status: "On Track" | "Achieved" | "Needs Attention"
}

export interface MockTransaction {
  id: string
  date: string
  description: string
  category: string
  account: string
  amount: number
  type: "credit" | "debit"
  status: "Settled" | "Cleared" | "Pending" | "Flagged"
}

export interface MockClient {
  id: string
  name: string
  tier: "Ultra HNW" | "Private Wealth" | "Premier Client" | "Family Trust" | "Corporate Entity"
  aum: number
  planStatus: "Active Fiduciary Plan" | "Annual Review Due" | "Draft Proposal" | "Onboarding"
  healthScore: number
  mandateDrift: string
  driftTone: "success" | "warning" | "danger"
  lastReview: string
  status: "Optimal" | "Review Due" | "Drift Alert" | "Pending KYC"
  email: string
  phone: string
}

export interface MockMeeting {
  id: string
  client: string
  type: string
  time: string
  date: string
  mode: "Virtual Video Call" | "Conference Suite" | "Direct Phone"
  status: "Confirmed" | "Prep Needed" | "Completed" | "Rescheduled"
  notes: string
}

export interface MockTaxFiling {
  id: string
  entity: string
  form: string
  financialYear: string
  deadline: string
  status: "E-Filing Verified" | "Draft Prepared" | "In Review" | "Pending Client Sign-Off"
  estimatedTaxLiability: number
  deductionsClaimed: number
}

export interface MockInsurancePolicy {
  id: string
  policyNumber: string
  client: string
  type: "Comprehensive Health" | "Executive Term Life" | "Commercial Liability" | "Property Umbrella" | "Cyber Security"
  coverageAmount: number
  annualPremium: number
  renewalDate: string
  status: "Active" | "Renewal Due" | "Claim in Review" | "Grace Period"
}

export interface MockInsuranceClaim {
  id: string
  claimNumber: string
  client: string
  policyType: string
  amount: number
  incidentDate: string
  status: "Under Investigation" | "Approved - Payout Queued" | "Documentation Requested" | "Settled"
  adjuster: string
}

export interface MockPortfolioHolding {
  id: string
  symbol: string
  name: string
  assetClass: "Large Cap Equity" | "Govt Bonds" | "Global Index ETF" | "Physical Gold" | "Private Credit"
  weight: number
  targetWeight: number
  drift: number
  currentValue: number
  unrealizedGainPct: string
}

export interface MockEvidenceItem {
  id: string
  title: string
  entity: string
  category: "Banking Reconciliation" | "Trade Execution" | "Statutory Tax" | "Access Governance"
  hashStatus: "SHA-256 Validated" | "Pending Verification" | "Exception Flagged"
  submitter: string
  timestamp: string
  status: "Partner Verified" | "Ready for Review" | "Additional Samples Needed"
}

export interface MockAdminUser {
  id: string
  name: string
  email: string
  role: string
  organization: string
  status: "Active" | "MFA Enforced" | "Suspended" | "Pending Approval"
  lastActive: string
  mfaHardwareEnforced: boolean
}

/* =========================================================================
   INITIAL DATASETS
   ========================================================================= */

export const INITIAL_ASSETS: MockAsset[] = [
  {
    id: "ast-1",
    name: "Vanguard Global Equities Brokerage",
    category: "Equities",
    institution: "Morgan Stanley / Vanguard",
    valuation: 1424600,
    changeYtd: "+8.4%",
    isLiquid: true,
    lastUpdated: "Just now",
  },
  {
    id: "ast-2",
    name: "Prime Manhattan Residential Real Estate",
    category: "Real Estate",
    institution: "Direct Holding / Deed Vault",
    valuation: 1182000,
    changeYtd: "+4.2%",
    isLiquid: false,
    lastUpdated: "Yesterday",
  },
  {
    id: "ast-3",
    name: "JPMorgan Private High-Yield Treasury Sweep",
    category: "Cash & HYSA",
    institution: "JPMorgan Chase",
    valuation: 486200,
    changeYtd: "+4.9% APY",
    isLiquid: true,
    lastUpdated: "2 hours ago",
  },
  {
    id: "ast-4",
    name: "Apex Global Growth Series B Preferred Stock",
    category: "Private Equity",
    institution: "Carta Custody",
    valuation: 516000,
    changeYtd: "+18.0%",
    isLiquid: false,
    lastUpdated: "3 days ago",
  },
  {
    id: "ast-5",
    name: "Allocated Gold Bullion Sovereign Reserve",
    category: "Alternative",
    institution: "Zurich Bullion Depository",
    valuation: 248400,
    changeYtd: "+11.6%",
    isLiquid: true,
    lastUpdated: "Today",
  },
]

export const INITIAL_GOALS: MockGoal[] = [
  {
    id: "gl-1",
    name: "Early Financial Independence at 52",
    category: "Retirement",
    targetAmount: 4000000,
    currentAmount: 3200000,
    targetDate: "2030-10-31",
    status: "On Track",
  },
  {
    id: "gl-2",
    name: "Coastal Waterfront Family Retreat",
    category: "Real Estate",
    targetAmount: 1200000,
    currentAmount: 850000,
    targetDate: "2027-06-30",
    status: "On Track",
  },
  {
    id: "gl-3",
    name: "Dynasty Trust Angel Syndicate Allocation",
    category: "Venture",
    targetAmount: 300000,
    currentAmount: 300000,
    targetDate: "2025-12-31",
    status: "Achieved",
  },
  {
    id: "gl-4",
    name: "Next-Gen Ivy League Endowment Reserve",
    category: "Education",
    targetAmount: 450000,
    currentAmount: 380000,
    targetDate: "2028-08-31",
    status: "On Track",
  },
]

export const INITIAL_TRANSACTIONS: MockTransaction[] = [
  {
    id: "txn-1",
    date: "Today · 11:24 AM",
    description: "Vanguard Total World Stock Index (VT)",
    category: "Investment Allocation",
    account: "Brokerage",
    amount: 4200,
    type: "debit",
    status: "Settled",
  },
  {
    id: "txn-2",
    date: "Yesterday · 04:15 PM",
    description: "Tech Partners Quarterly LP Dividend Distribution",
    category: "Passive Yield",
    account: "Private Checking",
    amount: 3450,
    type: "credit",
    status: "Cleared",
  },
  {
    id: "txn-3",
    date: "May 08 · 09:00 AM",
    description: "Manhattan Prime Residential Mortgage Auto-Debit",
    category: "Debt Service",
    account: "Mortgage Escrow",
    amount: 3850,
    type: "debit",
    status: "Settled",
  },
  {
    id: "txn-4",
    date: "May 04 · 02:30 PM",
    description: "Liquid Emergency Cash Sweep to High-Yield Vault",
    category: "Reserve Transfer",
    account: "HYSA Reserve",
    amount: 2500,
    type: "credit",
    status: "Cleared",
  },
  {
    id: "txn-5",
    date: "May 01 · 08:00 AM",
    description: "Executive Fiduciary Advisory Monthly Retainer",
    category: "Professional Income",
    account: "Operating Account",
    amount: 28500,
    type: "credit",
    status: "Cleared",
  },
]

export const INITIAL_CLIENTS: MockClient[] = [
  {
    id: "cl-1",
    name: "Harrison & Eleanor Vance",
    tier: "Ultra HNW",
    aum: 18450000,
    planStatus: "Active Fiduciary Plan",
    healthScore: 845,
    mandateDrift: "+0.4% Target",
    driftTone: "success",
    lastReview: "2 weeks ago",
    status: "Optimal",
    email: "h.vance@vanceholdings.com",
    phone: "+1 (212) 555-0142",
  },
  {
    id: "cl-2",
    name: "Dr. Arthur & Maya Pendelton",
    tier: "Private Wealth",
    aum: 12800000,
    planStatus: "Annual Review Due",
    healthScore: 780,
    mandateDrift: "+3.2% Overweight",
    driftTone: "warning",
    lastReview: "Today 2:00 PM",
    status: "Review Due",
    email: "arthur@pendelton-clinic.org",
    phone: "+1 (415) 555-0189",
  },
  {
    id: "cl-3",
    name: "Sophia Lin (Tech Founder)",
    tier: "Premier Client",
    aum: 9650000,
    planStatus: "Draft Proposal",
    healthScore: 820,
    mandateDrift: "-1.1% Neutral",
    driftTone: "success",
    lastReview: "Tomorrow 11:00 AM",
    status: "Optimal",
    email: "sophia@nexus-ventures.io",
    phone: "+1 (650) 555-0112",
  },
  {
    id: "cl-4",
    name: "The Sterling Family Dynasty Trust",
    tier: "Family Trust",
    aum: 34200000,
    planStatus: "Active Fiduciary Plan",
    healthScore: 890,
    mandateDrift: "+5.1% Equities Drift",
    driftTone: "danger",
    lastReview: "Thursday 3:30 PM",
    status: "Drift Alert",
    email: "trustee@sterlingdynasty.org",
    phone: "+1 (212) 555-0199",
  },
  {
    id: "cl-5",
    name: "Kensington Global Holdings Ltd",
    tier: "Corporate Entity",
    aum: 42500000,
    planStatus: "Active Fiduciary Plan",
    healthScore: 865,
    mandateDrift: "+0.8% Target",
    driftTone: "success",
    lastReview: "Last Month",
    status: "Optimal",
    email: "finance@kensingtonglobal.com",
    phone: "+44 20 7946 0912",
  },
]

export const INITIAL_MEETINGS: MockMeeting[] = [
  {
    id: "mt-1",
    client: "Harrison & Eleanor Vance",
    type: "Annual Fiduciary Review & Trust Distribution",
    time: "10:30 AM",
    date: "Today",
    mode: "Virtual Video Call",
    status: "Confirmed",
    notes: "Review updated estate trust and private equity distributions.",
  },
  {
    id: "mt-2",
    client: "Dr. Arthur & Maya Pendelton",
    type: "Retirement Scenario & Inflation Shock Test",
    time: "2:00 PM",
    date: "Today",
    mode: "Conference Suite",
    status: "Prep Needed",
    notes:
      "Client retiring in 18 months; run Monte Carlo simulation with inflation shock.",
  },
  {
    id: "mt-3",
    client: "Sophia Lin (Tech Founder)",
    type: "Executive Stock Option Strategy & Tax Buffer",
    time: "11:00 AM",
    date: "Tomorrow",
    mode: "Direct Phone",
    status: "Confirmed",
    notes: "IPO lockup expiring; coordinate with tax consultant David Chen.",
  },
  {
    id: "mt-4",
    client: "The Sterling Family Trust",
    type: "Quarterly Multi-Asset Rebalance Governance",
    time: "3:30 PM",
    date: "Thursday",
    mode: "Conference Suite",
    status: "Confirmed",
    notes: "Equities drifted +5.1% above target IPS mandate.",
  },
]

export const INITIAL_TAX_FILINGS: MockTaxFiling[] = [
  {
    id: "tx-1",
    entity: "Apex Global Technologies Pvt Ltd",
    form: "Corporate Income Tax (Form 1120 / ITR-6)",
    financialYear: "FY 2024-25",
    deadline: "Oct 31, 2025",
    status: "Draft Prepared",
    estimatedTaxLiability: 248600,
    deductionsClaimed: 84200,
  },
  {
    id: "tx-2",
    entity: "Alex & Jordan Morgan Household",
    form: "Individual Joint Return (Form 1040)",
    financialYear: "FY 2024-25",
    deadline: "Apr 15, 2026",
    status: "In Review",
    estimatedTaxLiability: 86400,
    deductionsClaimed: 32100,
  },
  {
    id: "tx-3",
    entity: "Meridian Logistics Global LLP",
    form: "Partnership Tax Statement (Form 1065 / ITR-5)",
    financialYear: "FY 2024-25",
    deadline: "Sep 15, 2025",
    status: "E-Filing Verified",
    estimatedTaxLiability: 132400,
    deductionsClaimed: 45600,
  },
  {
    id: "tx-4",
    entity: "Kensington Family Office Trust",
    form: "Fiduciary Trust Tax Return (Form 1041)",
    financialYear: "FY 2024-25",
    deadline: "Sep 30, 2025",
    status: "Pending Client Sign-Off",
    estimatedTaxLiability: 395000,
    deductionsClaimed: 112000,
  },
]

export const INITIAL_POLICIES: MockInsurancePolicy[] = [
  {
    id: "pol-1",
    policyNumber: "POL-HLTH-8821",
    client: "Morgan Family Household",
    type: "Comprehensive Health",
    coverageAmount: 2000000,
    annualPremium: 14200,
    renewalDate: "2025-11-15",
    status: "Active",
  },
  {
    id: "pol-2",
    policyNumber: "POL-LIFE-4102",
    client: "Alex Morgan (Key Person)",
    type: "Executive Term Life",
    coverageAmount: 10000000,
    annualPremium: 28500,
    renewalDate: "2025-09-30",
    status: "Active",
  },
  {
    id: "pol-3",
    policyNumber: "POL-PROP-9921",
    client: "Manhattan Prime Real Estate",
    type: "Property Umbrella",
    coverageAmount: 15000000,
    annualPremium: 34000,
    renewalDate: "2025-07-01",
    status: "Renewal Due",
  },
  {
    id: "pol-4",
    policyNumber: "POL-CYBR-2023",
    client: "Apex Global Technologies",
    type: "Cyber Security",
    coverageAmount: 5000000,
    annualPremium: 18000,
    renewalDate: "2025-12-10",
    status: "Active",
  },
]

export const INITIAL_CLAIMS: MockInsuranceClaim[] = [
  {
    id: "clm-1",
    claimNumber: "CLM-2025-042",
    client: "Alex Morgan",
    policyType: "Executive Health",
    amount: 18450,
    incidentDate: "2025-04-12",
    status: "Approved - Payout Queued",
    adjuster: "Zurich Claims Syndicate",
  },
  {
    id: "clm-2",
    claimNumber: "CLM-2025-089",
    client: "Manhattan Prime Property",
    policyType: "Property Umbrella",
    amount: 42100,
    incidentDate: "2025-05-02",
    status: "Under Investigation",
    adjuster: "AIG Global Adjusters",
  },
]

export const INITIAL_HOLDINGS: MockPortfolioHolding[] = [
  {
    id: "hld-1",
    symbol: "VTI",
    name: "Vanguard Total Stock Market Index ETF",
    assetClass: "Large Cap Equity",
    weight: 38.4,
    targetWeight: 35.0,
    drift: 3.4,
    currentValue: 1645000,
    unrealizedGainPct: "+24.2%",
  },
  {
    id: "hld-2",
    symbol: "BND",
    name: "Vanguard Total Bond Market ETF",
    assetClass: "Govt Bonds",
    weight: 22.1,
    targetWeight: 25.0,
    drift: -2.9,
    currentValue: 946000,
    unrealizedGainPct: "+4.1%",
  },
  {
    id: "hld-3",
    symbol: "VXUS",
    name: "Vanguard Total International Stock ETF",
    assetClass: "Global Index ETF",
    weight: 18.5,
    targetWeight: 20.0,
    drift: -1.5,
    currentValue: 792000,
    unrealizedGainPct: "+12.8%",
  },
  {
    id: "hld-4",
    symbol: "GLD",
    name: "SPDR Gold Shares ETF",
    assetClass: "Physical Gold",
    weight: 11.2,
    targetWeight: 10.0,
    drift: 1.2,
    currentValue: 480000,
    unrealizedGainPct: "+16.5%",
  },
  {
    id: "hld-5",
    symbol: "PRV-CR",
    name: "Blackstone Senior Direct Lending Fund",
    assetClass: "Private Credit",
    weight: 9.8,
    targetWeight: 10.0,
    drift: -0.2,
    currentValue: 420000,
    unrealizedGainPct: "+9.2%",
  },
]

export const INITIAL_EVIDENCE: MockEvidenceItem[] = [
  {
    id: "ev-1",
    title: "Northern Trust Custodial Omnibus Cash Ledger Sample",
    entity: "Morgan Dynasty Trust",
    category: "Banking Reconciliation",
    hashStatus: "SHA-256 Validated",
    submitter: "Northern Trust API FedGateway",
    timestamp: "Today · 09:14 AM",
    status: "Ready for Review",
  },
  {
    id: "ev-2",
    title: "Q1 Institutional Block Trade Allocation Logs",
    entity: "Apex Global Technologies",
    category: "Trade Execution",
    hashStatus: "SHA-256 Validated",
    submitter: "Morgan Stanley Execution OMS",
    timestamp: "Yesterday · 04:30 PM",
    status: "Partner Verified",
  },
  {
    id: "ev-3",
    title: "Form 26AS & AIS Direct Tax Ledger Cross-Match",
    entity: "Kensington Family Office",
    category: "Statutory Tax",
    hashStatus: "Pending Verification",
    submitter: "Income Tax Department e-Filing API",
    timestamp: "May 09 · 02:15 PM",
    status: "Additional Samples Needed",
  },
]

export const INITIAL_ADMIN_USERS: MockAdminUser[] = [
  {
    id: "usr-01",
    name: "Alex Morgan",
    email: "alex.morgan@wealthsphere.ai",
    role: "Super Admin",
    organization: "WealthSphere Global Enclave",
    status: "Active",
    lastActive: "Just now",
    mfaHardwareEnforced: true,
  },
  {
    id: "usr-02",
    name: "Marcus Sterling, CFP®",
    email: "marcus@sterlingadvisory.com",
    role: "Financial Advisor",
    organization: "Sterling Advisory Partners",
    status: "Active",
    lastActive: "14 mins ago",
    mfaHardwareEnforced: true,
  },
  {
    id: "usr-03",
    name: "Priya Sharma, FCA",
    email: "priya.sharma@sharmaca.in",
    role: "CA",
    organization: "Sharma & Associates LLP",
    status: "Active",
    lastActive: "1 hour ago",
    mfaHardwareEnforced: true,
  },
  {
    id: "usr-04",
    name: "David Chen, EA",
    email: "david@chentaxconsulting.com",
    role: "Tax Consultant",
    organization: "Chen Tax Advisory Group",
    status: "Active",
    lastActive: "3 hours ago",
    mfaHardwareEnforced: false,
  },
  {
    id: "usr-05",
    name: "Sarah Jenkins, CFA",
    email: "sarah.jenkins@meridiancapital.com",
    role: "Investment Manager",
    organization: "Meridian Asset Management",
    status: "MFA Enforced",
    lastActive: "Yesterday",
    mfaHardwareEnforced: true,
  },
]
