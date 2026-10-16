import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface GovernmentPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface PublicProgramItem {
  id: string
  programCode: string
  title: string
  targetCohort: string
  allocatedBudget: string
  disbursedAmount: string
  beneficiariesReached: string
  progressPct: number
  status: "Active Program" | "Fieldwork In Progress" | "Audit Underway"
}

interface BeneficiaryGroupItem {
  id: string
  groupName: string
  demographic: string
  enrolledCitizens: string
  povertyIndexReduction: string
  digitalBankingAdoption: string
  aidType: string
  region: string
}

interface FinancialLiteracyCampaignItem {
  id: string
  campaignName: string
  medium: "Community Centers & Mobile Units" | "Multilingual Digital Portal" | "Public Schools Curriculum" | "Public Television & Radio"
  targetDemographic: string
  citizensReached: string
  languagesSupported: string
  completionRate: number
  status: "National Rollout" | "Regional Pilot"
}

interface RegionalAnalyticsItem {
  id: string
  districtName: string
  population: string
  unbankedRate: string
  financialHealthIndex: string
  grantUtilization: string
  priorityLevel: "High Priority" | "Moderate Priority" | "Standard Monitoring"
}

export function GovernmentModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: GovernmentPageProps) {
  const { showToast } = useToast()
  const [showExportModal, setShowExportModal] = useState(false)

  // 1. Programs State
  const [programs, setPrograms] = useState<PublicProgramItem[]>([
    {
      id: "gov-prog-1",
      programCode: "FED-SAV-01",
      title: "National Citizen Micro-Savings Booster (Simulated)",
      targetCohort: "Low-to-Moderate Income Citizens",
      allocatedBudget: "$150,000,000 (Estimated)",
      disbursedAmount: "$114,200,000",
      beneficiariesReached: "640,000 Citizens",
      progressPct: 76.1,
      status: "Active Program",
    },
    {
      id: "gov-prog-2",
      programCode: "AGR-FIN-04",
      title: "Smallholder Farmer Agricultural Credit Literacy (Simulated)",
      targetCohort: "Rural Agricultural Producers",
      allocatedBudget: "$85,000,000 (Estimated)",
      disbursedAmount: "$68,500,000",
      beneficiariesReached: "320,000 Citizens",
      progressPct: 80.5,
      status: "Active Program",
    },
    {
      id: "gov-prog-3",
      programCode: "SNR-FRD-09",
      title: "Senior Financial Fraud Defense & Welfare Shield (Simulated)",
      targetCohort: "Retirees & Fixed-Income Citizens",
      allocatedBudget: "$60,000,000 (Estimated)",
      disbursedAmount: "$52,100,000",
      beneficiariesReached: "410,000 Citizens",
      progressPct: 86.8,
      status: "Active Program",
    },
    {
      id: "gov-prog-4",
      programCode: "YTH-CAP-12",
      title: "Next-Gen Youth Financial Independence Initiative (Simulated)",
      targetCohort: "Young Adults & Vocational Students",
      allocatedBudget: "$75,000,000 (Estimated)",
      disbursedAmount: "$48,900,000",
      beneficiariesReached: "480,000 Citizens",
      progressPct: 65.2,
      status: "Fieldwork In Progress",
    },
  ])

  // 2. Beneficiary Groups State
  const [beneficiaries] = useState<BeneficiaryGroupItem[]>([
    {
      id: "ben-1",
      groupName: "Smallholder Agricultural Cohort",
      demographic: "Rural Farmers & Family Operators",
      enrolledCitizens: "320,000 Citizens",
      povertyIndexReduction: "-18.4% Deprivation",
      digitalBankingAdoption: "78.2% Mobile Money",
      aidType: "Direct Input Subsidies & Credit Guarantees",
      region: "Districts 3 & 4 (Midwest & South)",
    },
    {
      id: "ben-2",
      groupName: "First-Time Youth Workers Cohort",
      demographic: "Ages 18-24 Vocational Learners",
      enrolledCitizens: "640,000 Citizens",
      povertyIndexReduction: "-22.1% Deprivation",
      digitalBankingAdoption: "94.6% Digital Wallets",
      aidType: "Emergency Savings Match & Credit Booster",
      region: "Nationwide (Districts 1-8)",
    },
    {
      id: "ben-3",
      groupName: "Rural Veterans Support Coalition",
      demographic: "Military Veterans & Families",
      enrolledCitizens: "180,000 Citizens",
      povertyIndexReduction: "-14.8% Deprivation",
      digitalBankingAdoption: "84.1% Direct Deposit",
      aidType: "Housing & Transition Stipends",
      region: "Districts 5 & 6 (West & Plains)",
    },
    {
      id: "ben-4",
      groupName: "Fixed-Income Senior Citizens",
      demographic: "Ages 65+ Social Security Recipients",
      enrolledCitizens: "410,000 Citizens",
      povertyIndexReduction: "-16.2% Deprivation",
      digitalBankingAdoption: "68.4% Protected Banking",
      aidType: "Anti-Fraud Monitoring & Utility Subsidies",
      region: "Districts 1, 2, 7 & 8",
    },
  ])

  // 3. Financial Literacy Campaigns State
  const [campaigns] = useState<FinancialLiteracyCampaignItem[]>([
    {
      id: "cmp-1",
      campaignName: "Citizen Digital Banking & Scam Protection Campaign",
      medium: "Multilingual Digital Portal",
      targetDemographic: "General Public & Underbanked",
      citizensReached: "1.24 Million Citizens",
      languagesSupported: "English, Spanish, Mandarin, Vietnamese",
      completionRate: 91.4,
      status: "National Rollout",
    },
    {
      id: "cmp-2",
      campaignName: "Community Rural Mobile Financial Clinic",
      medium: "Community Centers & Mobile Units",
      targetDemographic: "Agricultural & Remote Communities",
      citizensReached: "280,000 Citizens",
      languagesSupported: "English & Regional Dialects",
      completionRate: 88.2,
      status: "National Rollout",
    },
    {
      id: "cmp-3",
      campaignName: "High School Financial Foundations Mandate",
      medium: "Public Schools Curriculum",
      targetDemographic: "Grades 10-12 Public School Students",
      citizensReached: "450,000 Students",
      languagesSupported: "English & Spanish",
      completionRate: 94.6,
      status: "National Rollout",
    },
  ])

  // 4. Regional Analytics State
  const [regionalData] = useState<RegionalAnalyticsItem[]>([
    {
      id: "reg-1",
      districtName: "District 1 (Northeast Urban Corridors)",
      population: "4.2 Million",
      unbankedRate: "3.2% Unbanked",
      financialHealthIndex: "812 / 1000",
      grantUtilization: "94.8% Deployed",
      priorityLevel: "Standard Monitoring",
    },
    {
      id: "reg-2",
      districtName: "District 3 (Appalachian & Rural South)",
      population: "2.8 Million",
      unbankedRate: "11.4% Unbanked",
      financialHealthIndex: "684 / 1000",
      grantUtilization: "88.2% Deployed",
      priorityLevel: "High Priority",
    },
    {
      id: "reg-3",
      districtName: "District 5 (Midwest Agricultural Belt)",
      population: "3.4 Million",
      unbankedRate: "6.8% Unbanked",
      financialHealthIndex: "740 / 1000",
      grantUtilization: "91.5% Deployed",
      priorityLevel: "Moderate Priority",
    },
    {
      id: "reg-4",
      districtName: "District 7 (Southwest & Border Communities)",
      population: "3.1 Million",
      unbankedRate: "9.6% Unbanked",
      financialHealthIndex: "704 / 1000",
      grantUtilization: "89.1% Deployed",
      priorityLevel: "High Priority",
    },
  ])

  const handleLaunchCampaign = () => {
    showToast({
      title: "Regional Campaign Dispatched (Simulated)",
      message: "Mobile clinics and multilingual digital modules activated in District 3.",
      tone: "success",
    })
  }

  const handleAuditDisbursements = () => {
    showToast({
      title: "Disbursement Audit Initiated (Simulated)",
      message: "Direct welfare transfers audited. Zero anomaly duplicate claims flagged.",
      tone: "success",
    })
  }

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
              PUBLIC SECTOR WELFARE & INCLUSION DESK
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              Directorate of Public Finance & Citizen Inclusion · FedRAMP High
            </span>
          </div>
          <h1 style={{ font: "700 26px 'Manrope', sans-serif", color: "var(--ink)", margin: 0 }}>
            {navName}
          </h1>
          <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "13.5px" }}>
            Nationwide citizen inclusion programs, welfare grant oversight, regional financial health indices, and statutory audits.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowExportModal(true)}
          >
            <Icon name="document" size={15} />
            Export Public Audit (CSV)
          </button>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={handleAuditDisbursements}
          >
            <Icon name="shield" size={15} />
            Audit Welfare Pool (Simulated)
          </button>
        </div>
      </div>

      {/* 1. PROGRAMS */}
      {navId === "programs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Active Federal Programs"
              value="18 Programs"
              detail="Disbursing Nationwide Grants"
              icon="bank"
              tone="navy"
            />
            <MetricCard
              label="Total Allocated Appropriations"
              value="$370M (Estimated)"
              detail="$283.7M Disbursed to Date"
              icon="wallet"
              tone="emerald"
            />
            <MetricCard
              label="Direct Citizen Beneficiaries"
              value="1.85 Million"
              detail="Across 8 Administrative Districts"
              icon="user"
              tone="blue"
            />
            <MetricCard
              label="Program Milestone Velocity"
              value="88.6% On Track"
              detail="Audited by Comptroller"
              icon="trending"
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
                  Federal Citizen Financial Welfare & Inclusion Programs (Simulated)
                </h3>
                <span className="card-sub">
                  Statutory legislative budget appropriations, fund disbursement rates, and citizen outcomes.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px" }}
                onClick={handleLaunchCampaign}
              >
                Deploy Regional Initiative (Simulated)
              </button>
            </div>

            <DataTable
              title="Programs"
              data={programs}
              columns={[
                {
                  key: "title",
                  header: "Program Title & Code",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        Code: {row.programCode} · Cohort: {row.targetCohort}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "allocatedBudget",
                  header: "Appropriation / Disbursed",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>{row.disbursedAmount}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        of {row.allocatedBudget}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "beneficiariesReached",
                  header: "Citizen Reach",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)", fontWeight: 600 }}>
                      {row.beneficiariesReached}
                    </span>
                  ),
                },
                {
                  key: "progressPct",
                  header: "Disbursement Progress",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <strong style={{ color: "var(--accent-success)", minWidth: "36px" }}>
                        {row.progressPct}%
                      </strong>
                      <div
                        style={{
                          width: "80px",
                          height: "6px",
                          borderRadius: "3px",
                          background: "var(--surface-subtle)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${row.progressPct}%`,
                            height: "100%",
                            background: "var(--accent-success)",
                          }}
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  key: "status",
                  header: "Execution Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 2. BENEFICIARY GROUPS */}
      {navId === "beneficiary_groups" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Beneficiary Cohorts"
              value="4 Key Sectors"
              detail="Youth, Farmers, Seniors, Vets"
              icon="user"
              tone="navy"
            />
            <MetricCard
              label="Poverty Index Reduction"
              value="-18.2% Avg"
              detail="Measured Deprivation Reduction"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Digital Financial Adoption"
              value="82.4% Adoption"
              detail="Shift to Insured Digital Banking"
              icon="card"
              tone="blue"
            />
            <MetricCard
              label="Statutory Oversight"
              value="100% Audited"
              detail="Zero Duplicate Claims"
              icon="shield"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Public Citizen Beneficiary Cohort Registries (Simulated)
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Socioeconomic cohorts receiving targeted financial aid, grants, and credit guarantees.
            </p>

            <DataTable
              title="Beneficiaries"
              data={beneficiaries}
              columns={[
                {
                  key: "groupName",
                  header: "Cohort & Demographic",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.groupName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.demographic}</span>
                    </div>
                  ),
                },
                {
                  key: "enrolledCitizens",
                  header: "Citizen Beneficiaries",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.enrolledCitizens}</strong>,
                },
                {
                  key: "povertyIndexReduction",
                  header: "Poverty Impact",
                  render: (row) => (
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                      {row.povertyIndexReduction}
                    </span>
                  ),
                },
                {
                  key: "digitalBankingAdoption",
                  header: "Banking Inclusivity",
                  render: (row) => <span className="badge badge--navy">{row.digitalBankingAdoption}</span>,
                },
                {
                  key: "region",
                  header: "Designated Region",
                  render: (row) => (
                    <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>{row.region}</span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 3. FINANCIAL LITERACY */}
      {navId === "financial_literacy" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="National Campaigns"
              value="12 Campaigns"
              detail="Digital, Broadcast & Mobile"
              icon="book"
              tone="navy"
            />
            <MetricCard
              label="Citizen Reach"
              value="1.97 Million"
              detail="Direct Participants Completed"
              icon="user"
              tone="emerald"
            />
            <MetricCard
              label="Languages Supported"
              value="8 Languages"
              detail="Inclusive Multi-Lingual Outreach"
              icon="globe"
              tone="blue"
            />
            <MetricCard
              label="Scam Defense Efficacy"
              value="91.4% Rate"
              detail="Senior Financial Protection Index"
              icon="shield"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Public Sector Financial Literacy Initiatives
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Civic education campaigns teaching consumer rights, micro-budgeting, and fraud defense.
            </p>

            <DataTable
              title="Campaigns"
              data={campaigns}
              columns={[
                {
                  key: "campaignName",
                  header: "Campaign Name & Channel",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.campaignName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Channel: {row.medium}</span>
                    </div>
                  ),
                },
                {
                  key: "citizensReached",
                  header: "Citizen Reach",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.citizensReached}</strong>,
                },
                {
                  key: "languagesSupported",
                  header: "Language Inclusivity",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.languagesSupported}</span>
                  ),
                },
                {
                  key: "completionRate",
                  header: "Mastery Rate",
                  render: (row) => (
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                      {row.completionRate}%
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Deployment",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 4. REGIONAL ANALYTICS */}
      {navId === "regional_analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              District & State Financial Inclusion Indices
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Real-time monitoring of unbanked rates, grant utilization, and community development needs.
            </p>

            <DataTable
              title="Districts"
              data={regionalData}
              columns={[
                {
                  key: "districtName",
                  header: "Administrative District",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.districtName}</strong>,
                },
                {
                  key: "population",
                  header: "District Population",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.population}</span>,
                },
                {
                  key: "unbankedRate",
                  header: "Unbanked Rate",
                  render: (row) => (
                    <span
                      style={{
                        color: parseFloat(row.unbankedRate) > 8 ? "var(--accent-danger)" : "var(--accent-success)",
                        fontWeight: 600,
                      }}
                    >
                      {row.unbankedRate}
                    </span>
                  ),
                },
                {
                  key: "financialHealthIndex",
                  header: "Health Index",
                  render: (row) => (
                    <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>
                      {row.financialHealthIndex}
                    </span>
                  ),
                },
                {
                  key: "priorityLevel",
                  header: "Monitoring Priority",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.priorityLevel === "High Priority"
                          ? "badge--warning"
                          : row.priorityLevel === "Moderate Priority"
                          ? "badge--navy"
                          : "badge--info"
                      }`}
                    >
                      {row.priorityLevel}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 5. PROGRAM MONITORING */}
      {navId === "program_monitoring" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Real-Time Disbursements"
              value="99.98% Anomaly-Free"
              detail="Zero Fraud False Positives"
              icon="shield"
              tone="emerald"
            />
            <MetricCard
              label="Fund Velocity"
              value="$4.2M / Day"
              detail="Automated Electronic Transfers"
              icon="trending"
              tone="blue"
            />
            <MetricCard
              label="Agency Compliance"
              value="100% FedRAMP"
              detail="High Baseline Authorization"
              icon="lock"
              tone="navy"
            />
            <MetricCard
              label="Audit Findings"
              value="0 Non-Compliances"
              detail="Inspector General Certified"
              icon="check"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Grant Disbursement Live Surveillance & Audit Check
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Automated anomaly detection protecting public funds from fraudulent claims and double dips.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                {
                  id: "mon-1",
                  batch: "Batch #4109 - District 3 Agricultural Grant Tranche",
                  amount: "$12,400,000 USD",
                  recipients: "4,820 Verified Smallholder Farmers",
                  status: "Verified & Disbursed",
                  badge: "success",
                },
                {
                  id: "mon-2",
                  batch: "Batch #4110 - Senior Utility & Inflation Shield",
                  amount: "$8,500,000 USD",
                  recipients: "17,000 Verified Low-Income Seniors",
                  status: "Verified & Disbursed",
                  badge: "success",
                },
                {
                  id: "mon-3",
                  batch: "Batch #4111 - Youth Savings Matching Grant Tranche",
                  amount: "$6,200,000 USD",
                  recipients: "12,400 Verified Young Adults",
                  status: "Under Audit Review",
                  badge: "warning",
                },
              ].map((b) => (
                <div
                  key={b.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    background: "var(--surface-color)",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div>
                    <strong style={{ color: "var(--ink)", display: "block" }}>{b.batch}</strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      {b.recipients} · {b.amount}
                    </span>
                  </div>
                  <span className={`badge badge--${b.badge}`}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. REPORTS */}
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
                  Statutory Oversight & Legislative Appropriations Reports
                </h3>
                <span className="card-sub">
                  Annual public welfare audit, citizen impact assessments, and fund utilization decrees.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={14} />
                Export Public Report
              </button>
            </div>

            <DataTable
              title="Reports"
              data={[
                {
                  id: "gov-rep-1",
                  title: "Annual Congressional Public Financial Inclusion Audit 2026",
                  period: "Fiscal Year 2026",
                  scope: "$370M Appropriations & 1.85M Citizens",
                  status: "Unqualified Opinion",
                },
                {
                  id: "gov-rep-2",
                  title: "Rural Agricultural Credit & Mobile Banking Impact Study",
                  period: "2024 - 2026 Longitudinal Study",
                  scope: "Districts 3, 5 & 7 (Midwest & South)",
                  status: "Published to Open Gov",
                },
                {
                  id: "gov-rep-3",
                  title: "Inspector General Anti-Fraud Surveillance Attestation",
                  period: "Q2 2026 Quarterly Audit",
                  scope: "Real-time Welfare Disbursement Ledger",
                  status: "100% Validated",
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
                  header: "Attestation",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 7. DOCUMENTS */}
      {navId === "documents" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Public Policy Charters & Legislative Statutes
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Federal grant authorizations, compliance decrees, and inter-agency coordination charters.
            </p>

            <DataTable
              title="Charters"
              data={[
                {
                  id: "gdoc-1",
                  title: "Federal Citizen Financial Inclusion Charter (Statute 14-88)",
                  promulgatedBy: "Congressional Committee on Public Finance",
                  effectiveDate: "Jan 01, 2024",
                  classification: "Public Law Record",
                },
                {
                  id: "gdoc-2",
                  title: "Inter-Agency Direct Welfare Disbursement Operating Protocol",
                  promulgatedBy: "Federal Reserve & Social Security Administration",
                  effectiveDate: "May 15, 2025",
                  classification: "Statutory Directive",
                },
                {
                  id: "gdoc-3",
                  title: "FedRAMP High Continuous Monitoring & Security Authorization",
                  promulgatedBy: "General Services Administration (GSA)",
                  effectiveDate: "Sep 30, 2025",
                  classification: "Security Attestation",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Charter Title & Agency",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>By: {row.promulgatedBy}</span>
                    </div>
                  ),
                },
                {
                  key: "effectiveDate",
                  header: "Effective Date",
                  render: (row) => <span style={{ color: "var(--ink)", fontSize: "12px" }}>{row.effectiveDate}</span>,
                },
                {
                  key: "classification",
                  header: "Classification",
                  render: (row) => <span className="badge badge--navy">{row.classification}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 8. SETTINGS */}
      {navId === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Public Sector Agency Security
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                CAC / PIV smart card authentication and FedRAMP High baseline enforcement.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Government PKI CAC/PIV Authentication
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Mandatory hardware smart card token login
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      FedRAMP High Encryption Safeguard
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      FIPS 140-3 validated cryptographic enclave
                    </span>
                  </div>
                  <span className="badge badge--success">Active</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Open Government Data API
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Public accountability and transparency portal export parameters.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Public Ledger Anonymization Level
                  </label>
                  <select className="select" defaultValue="k25" style={{ width: "100%" }}>
                    <option value="k10">k-Anonymity (10 Citizens)</option>
                    <option value="k25">k-Anonymity (25 Citizens) (Current)</option>
                    <option value="k50">k-Anonymity (50 Citizens) Highest</option>
                  </select>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ alignSelf: "flex-start", fontSize: "12px" }}
                  onClick={() => {
                    showToast({
                      title: "Settings Saved",
                      message: "Open Government transparency thresholds updated.",
                      tone: "success",
                    })
                  }}
                >
                  Save Transparency Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Public Sector Audit Data"
        defaultFilename="Government_Public_Programs_Audit"
        headers={[
          "Program Title",
          "Code",
          "Target Cohort",
          "Appropriated Budget",
          "Disbursed Amount",
          "Citizens Reached",
          "Progress",
        ]}
        data={programs.map((p) => [
          p.title,
          p.programCode,
          p.targetCohort,
          p.allocatedBudget,
          p.disbursedAmount,
          p.beneficiariesReached,
          `${p.progressPct}%`,
        ])}
      />
    </div>
  )
}
