import type { NotificationItem } from "../types/layout"
import type { RoleKey } from "../types/roles"

export const ROLE_NOTIFICATIONS: Record<RoleKey, NotificationItem[]> = {
  individual: [
    {
      id: "ind_1",
      title: "Tax-Loss Harvesting Window",
      message:
        "Sphere AI identified 2 positions eligible for tax-loss harvesting ($18,400 potential offset).",
      timestamp: "12m ago",
      read: false,
      priority: "high",
      category: "ai",
      actionLabel: "Review offsets",
    },
    {
      id: "ind_2",
      title: "Quarterly Dividend Received",
      message:
        "$1,420 dividend credited from Vanguard Total World Stock ETF (VT).",
      timestamp: "2h ago",
      read: false,
      priority: "success",
      category: "financial",
    },
    {
      id: "ind_3",
      title: "Life Insurance Coverage Check",
      message:
        "Current coverage is 32% below recommended income replacement multiple.",
      timestamp: "1d ago",
      read: true,
      priority: "medium",
      category: "compliance",
    },
  ],

  family: [
    {
      id: "fam_1",
      title: "College Fund Milestone Reached",
      message: "Jordan's 529 Trust reached 85% of 4-year tuition benchmark.",
      timestamp: "25m ago",
      read: false,
      priority: "success",
      category: "financial",
    },
    {
      id: "fam_2",
      title: "Annual Estate Plan Attestation",
      message:
        "Guardian nominations and health care proxies require annual sign-off.",
      timestamp: "3h ago",
      read: false,
      priority: "high",
      category: "compliance",
    },
    {
      id: "fam_3",
      title: "Shared Household Budget Status",
      message:
        "Utilities and dining spending tracking 8% under monthly ceiling.",
      timestamp: "2d ago",
      read: true,
      priority: "low",
      category: "financial",
    },
  ],

  student: [
    {
      id: "stu_1",
      title: "Scholarship Deadline in 5 Days",
      message:
        "STEM Leadership Grant ($4,500) application deadline is approaching.",
      timestamp: "1h ago",
      read: false,
      priority: "high",
      category: "financial",
      actionLabel: "Complete Form",
    },
    {
      id: "stu_2",
      title: "Federal Loan Subsidy Update",
      message:
        "In-school deferment status verified with the university registrar.",
      timestamp: "5h ago",
      read: false,
      priority: "success",
      category: "compliance",
    },
    {
      id: "stu_3",
      title: "Credit Score Increase",
      message:
        "On-time student credit card payment logged (+12 points this cycle).",
      timestamp: "3d ago",
      read: true,
      priority: "low",
      category: "financial",
    },
  ],

  financial_advisor: [
    {
      id: "fa_1",
      title: "Allocation Drift Alert",
      message:
        "12 client accounts drifted >3.5% from their investment policy statement.",
      timestamp: "8m ago",
      read: false,
      priority: "high",
      category: "compliance",
      actionLabel: "View queue",
    },
    {
      id: "fa_2",
      title: "Quarterly Review Scheduled",
      message:
        "Review with Sterling Family Household confirmed for Thursday, 10:00 AM.",
      timestamp: "1h ago",
      read: false,
      priority: "medium",
      category: "financial",
    },
    {
      id: "fa_3",
      title: "Reg BI Suitability Attested",
      message:
        "All 84 active households have verified annual risk tolerance profiles.",
      timestamp: "1d ago",
      read: true,
      priority: "success",
      category: "compliance",
    },
  ],

  ca: [
    {
      id: "ca_1",
      title: "Advance Tax Deadline Due in 8 Days",
      message:
        "19 corporate client advance tax installments pending final filing.",
      timestamp: "5m ago",
      read: false,
      priority: "high",
      category: "compliance",
      actionLabel: "Open calendar",
    },
    {
      id: "ca_2",
      title: "Bank Ledger Reconciled",
      message:
        "AI reconciliation matched $342,000 across 4,200 transactions with 0 errors.",
      timestamp: "45m ago",
      read: false,
      priority: "success",
      category: "financial",
    },
    {
      id: "ca_3",
      title: "DSC Certificate Expiring",
      message: "Principal Partner digital signature token renews in 28 days.",
      timestamp: "2d ago",
      read: true,
      priority: "medium",
      category: "system",
    },
  ],

  tax_consultant: [
    {
      id: "tc_1",
      title: "FATCA / CRS Reporting Due",
      message:
        "18 cross-border trust entities require foreign account annual validation.",
      timestamp: "15m ago",
      read: false,
      priority: "high",
      category: "compliance",
    },
    {
      id: "tc_2",
      title: "Cross-Border Tax Treaty Opportunity",
      message:
        "DTAA foreign tax credit optimization could recover $64,200 for Client #204.",
      timestamp: "2h ago",
      read: false,
      priority: "medium",
      category: "ai",
    },
    {
      id: "tc_3",
      title: "IRS Schedule D Batch Exported",
      message:
        "14 high-net-worth client capital gains schedules generated successfully.",
      timestamp: "1d ago",
      read: true,
      priority: "success",
      category: "financial",
    },
  ],

  investment_manager: [
    {
      id: "im_1",
      title: "Rebalance Block Execution Ready",
      message:
        "Multi-broker block order staged for $8.4M in equity tilt rebalancing.",
      timestamp: "10m ago",
      read: false,
      priority: "high",
      category: "financial",
      actionLabel: "Approve trade",
    },
    {
      id: "im_2",
      title: "Factor Momentum Target Reached",
      message:
        "Semiconductor and energy overweight tilt reached optimal +2.5% weighting.",
      timestamp: "3h ago",
      read: false,
      priority: "success",
      category: "financial",
    },
    {
      id: "im_3",
      title: "Historical VaR Stress Test Completed",
      message:
        "Portfolio drawdown during simulated 2008 crash capped at -14.2% (Mandate: -18%).",
      timestamp: "1d ago",
      read: true,
      priority: "low",
      category: "compliance",
    },
  ],

  insurance_advisor: [
    {
      id: "ia_1",
      title: "Upcoming Policy Renewals (30 Days)",
      message: "24 life and disability policies entering grace renewal window.",
      timestamp: "20m ago",
      read: false,
      priority: "high",
      category: "financial",
    },
    {
      id: "ia_2",
      title: "Coverage Gap Detected",
      message:
        "Miller Household mortgage liability exceeds term cover by $450,000.",
      timestamp: "4h ago",
      read: false,
      priority: "medium",
      category: "compliance",
    },
    {
      id: "ia_3",
      title: "Claim Intake Finalized",
      message:
        "Disability benefit packet submitted to Guardian Life with medical attestations.",
      timestamp: "2d ago",
      read: true,
      priority: "success",
      category: "compliance",
    },
  ],

  wealth_coach: [
    {
      id: "wc_1",
      title: "Cohort Habit Adherence at 88.4%",
      message:
        "Spring cohort completed weekly spending audits with record participation.",
      timestamp: "30m ago",
      read: false,
      priority: "success",
      category: "ai",
    },
    {
      id: "wc_2",
      title: "Debt-Free Milestone Achieved",
      message:
        "Mentee Sarah K. cleared $42,000 credit card debt via Debt Avalanche.",
      timestamp: "2h ago",
      read: false,
      priority: "high",
      category: "financial",
      actionLabel: "Award badge",
    },
    {
      id: "wc_3",
      title: "Coaching Session Reminder",
      message: "1-on-1 accountability session with Marcus T. in 45 minutes.",
      timestamp: "3h ago",
      read: true,
      priority: "medium",
      category: "system",
    },
  ],

  family_office: [
    {
      id: "fo_1",
      title: "Capital Call Notification",
      message:
        "Sequoia Growth VI issued $450,000 capital draw (Due in 7 business days).",
      timestamp: "18m ago",
      read: false,
      priority: "high",
      category: "financial",
      actionLabel: "Authorize wire",
    },
    {
      id: "fo_2",
      title: "Family Council Quorum Reached",
      message:
        "All 5 trustees voted in favor of the annual philanthropic endowment resolution.",
      timestamp: "4h ago",
      read: false,
      priority: "success",
      category: "compliance",
    },
    {
      id: "fo_3",
      title: "Direct Real Estate Lease Renewal",
      message:
        "Commercial tenant in London Mayfair property signed 5-year lease extension.",
      timestamp: "1d ago",
      read: true,
      priority: "low",
      category: "financial",
    },
  ],

  private_bank: [
    {
      id: "pb_1",
      title: "Lombard Facility LTV Safe",
      message:
        "Aggregate Lombard loan collateral LTV is 48.2% (Threshold: 70.0%).",
      timestamp: "14m ago",
      read: false,
      priority: "success",
      category: "financial",
    },
    {
      id: "pb_2",
      title: "PEP / Sanctions Screening Cleared",
      message:
        "Automated Dow Jones screening cleared 8 prospective UHNW client families.",
      timestamp: "2h ago",
      read: false,
      priority: "medium",
      category: "compliance",
    },
    {
      id: "pb_3",
      title: "Autocallable Structured Note Priced",
      message:
        "$12M 8.4% barrier reverse convertible note priced for European accounts.",
      timestamp: "1d ago",
      read: true,
      priority: "low",
      category: "financial",
    },
  ],

  corporate_hr: [
    {
      id: "hr_1",
      title: "ERISA 401(k) Nondiscrimination Pre-Test Passed",
      message:
        "ADP / ACP test passed with 92.4% non-highly compensated employee uptake.",
      timestamp: "22m ago",
      read: false,
      priority: "success",
      category: "compliance",
    },
    {
      id: "hr_2",
      title: "Benefits Enrollment Reminder Queue",
      message:
        "380 team members have unsubmitted open enrollment selections (5 days left).",
      timestamp: "3h ago",
      read: false,
      priority: "high",
      category: "system",
      actionLabel: "Broadcast email",
    },
    {
      id: "hr_3",
      title: "ESOP Option Pool Vesting Batch",
      message:
        "Q2 quarterly vesting completed for 1,240 employees across all subsidiaries.",
      timestamp: "2d ago",
      read: true,
      priority: "medium",
      category: "financial",
    },
  ],

  university: [
    {
      id: "uni_1",
      title: "Financial Aid Batch Pending Bursar Sign-off",
      message:
        "$1.4M in need-based grants queued for disbursement before Fall semester.",
      timestamp: "11m ago",
      read: false,
      priority: "high",
      category: "financial",
      actionLabel: "Release funds",
    },
    {
      id: "uni_2",
      title: "Endowment ESG Carbon Footprint Improved",
      message:
        "Fossil fuel divestment program reduced carbon intensity by 14% year-over-year.",
      timestamp: "4h ago",
      read: false,
      priority: "success",
      category: "compliance",
    },
    {
      id: "uni_3",
      title: "Campus Literacy Badges Issued",
      message:
        "420 undergraduates earned verified blockchain certificates in wealth foundations.",
      timestamp: "1d ago",
      read: true,
      priority: "low",
      category: "system",
    },
  ],

  government_organizations: [
    {
      id: "gov_1",
      title: "Public Pension Actuarial Solvency Update",
      message:
        "30-year actuarial model projects 94.8% funded ratio under baseline yield assumptions.",
      timestamp: "40m ago",
      read: false,
      priority: "success",
      category: "compliance",
    },
    {
      id: "gov_2",
      title: "Sovereign Debt Yield Curve Shift",
      message:
        "10-year Treasury benchmark shifted 8 bps; duration hedging triggered.",
      timestamp: "2h ago",
      read: false,
      priority: "medium",
      category: "financial",
    },
    {
      id: "gov_3",
      title: "Direct Benefit Disbursement Audit",
      message:
        "Anti-fraud neural model verified 1.85M citizen monthly welfare transactions.",
      timestamp: "1d ago",
      read: true,
      priority: "low",
      category: "compliance",
    },
  ],

  auditors: [
    {
      id: "aud_1",
      title: "Control Exception Logged (Low Severity)",
      message:
        "Exception #104: Access review documented 2 days past quarterly grace window.",
      timestamp: "15m ago",
      read: false,
      priority: "medium",
      category: "compliance",
      actionLabel: "Inspect finding",
    },
    {
      id: "aud_2",
      title: "Immutable Hash Chain Integrity Verified",
      message:
        "Cryptographic SHA-256 verification of 14.8M ledger records passed with 0 drift.",
      timestamp: "1h ago",
      read: false,
      priority: "success",
      category: "system",
    },
    {
      id: "aud_3",
      title: "SOC 2 Type II Testing Sample Ready",
      message:
        "Random statistical sample of 45 change management requests ready for testing.",
      timestamp: "2d ago",
      read: true,
      priority: "low",
      category: "compliance",
    },
  ],

  super_admin: [
    {
      id: "sa_1",
      title: "Global Platform Uptime 99.99%",
      message:
        "All 18 global edge clusters operational. P99 API response latency is 42ms.",
      timestamp: "5m ago",
      read: false,
      priority: "success",
      category: "system",
    },
    {
      id: "sa_2",
      title: "Tenant #1042 Approaching API Rate Limit",
      message:
        "Enterprise tenant consumed 88% of provisioned monthly compute quota.",
      timestamp: "45m ago",
      read: false,
      priority: "medium",
      category: "system",
      actionLabel: "Adjust quota",
    },
    {
      id: "sa_3",
      title: "Automated Cross-Region Disaster Backup",
      message:
        "Point-in-time database snapshot completed to Zurich and Tokyo vaults.",
      timestamp: "1d ago",
      read: true,
      priority: "low",
      category: "compliance",
    },
  ],
}

export function getNotificationsForRole(roleKey: RoleKey): NotificationItem[] {
  return ROLE_NOTIFICATIONS[roleKey] || ROLE_NOTIFICATIONS.individual
}
