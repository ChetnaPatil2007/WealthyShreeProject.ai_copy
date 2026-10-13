import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface GovernmentDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function GovernmentDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: GovernmentDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"programs" | "campaigns">(
    "programs",
  )
  const [districtFilter, setDistrictFilter] =
    useState<"all" | "metro" | "rural" | "priority">("all")
  const [showExportModal, setShowExportModal] = useState(false)

  // Active Public Welfare Programs mock data
  const publicPrograms = [
    {
      id: "prg1",
      code: "WEL-102",
      name: "Universal Youth Financial Capability & Starter Savings",
      leadAgency: "Department of Education & Youth Welfare",
      targetGroup: "High School & Vocational Students (420K Youth)",
      budget: "$12,400,000",
      progressPct: "94.2%",
      status: "On Track",
      statusTone: "success",
    },
    {
      id: "prg2",
      code: "WEL-204",
      name: "Rural Micro-Enterprise & Smallholder Credit Literacy",
      leadAgency: "Rural Development & Agricultural Agency",
      targetGroup: "Agricultural Communities & Farmers (310K Citizens)",
      budget: "$18,500,000",
      progressPct: "88.6%",
      status: "Active Sprint",
      statusTone: "info",
    },
    {
      id: "prg3",
      code: "WEL-310",
      name: "Senior Citizen Pension Security & Anti-Fraud Defense",
      leadAgency: "Public Pensions & Consumer Protection Bureau",
      targetGroup: "Retirees & Pension Beneficiaries (680K Seniors)",
      budget: "$8,200,000",
      progressPct: "91.0%",
      status: "On Track",
      statusTone: "success",
    },
    {
      id: "prg4",
      code: "WEL-405",
      name: "Emergency Buffer Grants for Low-Income Households",
      leadAgency: "Social Services & Municipal Housing Dept",
      targetGroup: "Displaced & Vulnerable Families (440K Citizens)",
      budget: "$14,000,000",
      progressPct: "82.4%",
      status: "Audit Review",
      statusTone: "warning",
    },
  ]

  // Nationwide Financial Literacy Campaigns mock data
  const literacyCampaigns = [
    {
      id: "cmp1",
      title: "National Student Money Week: Zero-Overdraft Campus Blitz",
      targetDemographic: "College & University Campuses (84 Institutions)",
      reachCount: "320,000 Students",
      partnerOrgs: "National University Consortium",
      status: "Active Campaign",
      statusTone: "success",
    },
    {
      id: "cmp2",
      title: "Community Banking Days: Unbanked Household Onboarding",
      targetDemographic: "Underbanked Urban & Rural Municipalities",
      reachCount: "185,000 Households",
      partnerOrgs: "Regional Credit Unions & Postal Banks",
      status: "Phase 2 Rollout",
      statusTone: "info",
    },
    {
      id: "cmp3",
      title: "Digital Financial Scam Shield for Seniors & Caregivers",
      targetDemographic: "Citizens Aged 65+ & Community Centers",
      reachCount: "410,000 Seniors",
      partnerOrgs: "Public Safety & Consumer Taskforce",
      status: "On Track",
      statusTone: "success",
    },
  ]

  // Regional Districts & Beneficiary Summaries Directory
  const regionalDistricts = [
    {
      id: "dist1",
      name: "District 1 · Metro Capital Administrative Region",
      category: "metro",
      categoryLabel: "Urban Metropolitan",
      population: "480,000 Beneficiaries",
      activePrograms: "6 Programs",
      progressRate: "92.4% On Track",
      efficacyScore: "95.2%",
      status: "Optimal Impact",
      statusTone: "success",
    },
    {
      id: "dist2",
      name: "District 2 · Northern Industrial & Harbor Basin",
      category: "metro",
      categoryLabel: "Industrial Urban",
      population: "340,000 Beneficiaries",
      activePrograms: "5 Programs",
      progressRate: "89.8% On Track",
      efficacyScore: "93.4%",
      status: "Optimal Impact",
      statusTone: "success",
    },
    {
      id: "dist3",
      name: "District 3 · Eastern Coastal Municipalities",
      category: "metro",
      categoryLabel: "Mixed Coastal",
      population: "260,000 Beneficiaries",
      activePrograms: "4 Programs",
      progressRate: "88.2% On Track",
      efficacyScore: "92.0%",
      status: "Active Term",
      statusTone: "info",
    },
    {
      id: "dist4",
      name: "District 4 · Agricultural River Valley & Farmlands",
      category: "rural",
      categoryLabel: "Rural Agricultural",
      population: "290,000 Beneficiaries",
      activePrograms: "5 Programs",
      progressRate: "85.6% On Track",
      efficacyScore: "91.8%",
      status: "Active Term",
      statusTone: "info",
    },
    {
      id: "dist5",
      name: "District 5 · Highland & Mountain Communities",
      category: "priority",
      categoryLabel: "High Need Rural",
      population: "180,000 Beneficiaries",
      activePrograms: "4 Programs",
      progressRate: "81.4% On Track",
      efficacyScore: "87.6%",
      status: "Priority Focus",
      statusTone: "warning",
    },
    {
      id: "dist6",
      name: "District 6 · Western Heartland & Rail Hub",
      category: "rural",
      categoryLabel: "Semi-Rural Logistics",
      population: "300,000 Beneficiaries",
      activePrograms: "5 Programs",
      progressRate: "89.0% On Track",
      efficacyScore: "94.0%",
      status: "Optimal Impact",
      statusTone: "success",
    },
  ]

  // Filter regional districts
  const filteredDistricts = useMemo(() => {
    if (districtFilter === "metro")
      return regionalDistricts.filter((d) => d.category === "metro")
    if (districtFilter === "rural")
      return regionalDistricts.filter((d) => d.category === "rural")
    if (districtFilter === "priority")
      return regionalDistricts.filter((d) => d.category === "priority")
    return regionalDistricts
  }, [districtFilter])

  const districtColumns = [
    {
      key: "name",
      header: "Regional District / Jurisdiction",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
            Classification: {row.categoryLabel}
          </small>
        </div>
      ),
    },
    {
      key: "population",
      header: "Beneficiary Population",
      render: (row: any) => (
        <span style={{ fontWeight: 600, color: "var(--ink)" }}>
          {row.population}
        </span>
      ),
    },
    {
      key: "activePrograms",
      header: "Active Programs",
      render: (row: any) => (
        <span className="badge badge--info">{row.activePrograms}</span>
      ),
    },
    {
      key: "progressRate",
      header: "Program Progress Velocity",
      render: (row: any) => (
        <strong
          style={{ color: "var(--primary-dark)", font: "700 13px 'Manrope'" }}
        >
          {row.progressRate}
        </strong>
      ),
    },
    {
      key: "efficacyScore",
      header: "Citizen Impact Efficacy",
      render: (row: any) => (
        <span className="badge badge--success">{row.efficacyScore}</span>
      ),
    },
    {
      key: "status",
      header: "Regional Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard government-dashboard">
      {/* 1. Hero Header & Government Organizations Console Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--emerald">
              PUBLIC SECTOR CITIZEN CAPABILITY & WELFARE
            </span>
            <span>1.85 Million Beneficiaries Across 8 Regional Districts</span>
          </div>
          <h1 className="hero-title">Ambassador S. Vance</h1>
          <p className="hero-subtitle">
            Director of Public Finance & Citizen Welfare · Public Welfare &
            Programs Console. Public financial programs, beneficiary welfare
            groups, nationwide literacy campaigns, regional analytics, and
            verified impact monitoring.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Programs")}
          >
            <Icon name="book" size={16} />
            <span>Launch Campaign</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>Public Impact AI</span>
          </button>
        </div>
      </section>

      {/* 2. Six Core Government Organizations Metric Cards */}
      <section
        className="metric-grid"
        aria-label="Government Public Welfare Metrics"
      >
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
          if (act.id === "launch_campaign") onNavigate("Financial Literacy")
          else if (act.id === "audit_disbursements")
            onNavigate("Beneficiary Groups")
          else if (act.id === "convene_taskforce")
            onNavigate("Regional Analytics")
          else if (act.id === "generate_impact") {
            setShowExportModal(true)
          } else onOpenAI()
        }}
      />

      {/* 4. Program Progress Velocity & Regional Allocation Grid */}
      <section className="dashboard-grid">
        {/* Card 1: Citizen Welfare & Program Progress Gauge */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">
                National Welfare Milestone Progress
              </span>
              <span className="card-sub">
                Aggregate completion across 18 public financial initiatives
              </span>
            </div>
            <span className="badge badge--success">+5.4% YoY Gain</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>88.6%</strong>
              <span>milestones on track</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">HIGH IMPACT</span>
            <span>94.2% verified positive citizen welfare efficacy</span>
          </div>

          <div className="score-bars">
            {[
              ["Universal Youth Starter Savings (94.2%)", "94.2%"],
              ["Senior Pension Anti-Fraud Shield (91.0%)", "91.0%"],
              ["Rural Smallholder Credit Literacy (88.6%)", "88.6%"],
              ["Low-Income Emergency Buffer Grants (82.4%)", "82.4%"],
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

        {/* Card 2: Regional Beneficiary Summary & Impact Telemetry */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Public Resource Allocation & Beneficiaries
              </span>
              <span className="card-sub">
                $53.1M Total Welfare & Literacy Appropriations
              </span>
            </div>
            <span className="badge badge--info">1.85M Citizens</span>
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
                Direct Citizen Welfare Transfer Integrity
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                99.98% Anomaly-Free
              </strong>
            </div>

            <div className="cat-track" style={{ height: "8px" }}>
              <div className="cat-fill emerald" style={{ width: "99.98%" }} />
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
                  Active Programs
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  18 Initiatives
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
                  Literacy Campaigns
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  12 Active
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
                  Monitored Districts
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  8 Regions
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
                  Annual Public Impact Efficacy Score
                </b>
                <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                  Surveyed resilience improvements across 1.85M beneficiary
                  households
                </small>
              </div>
              <span className="badge badge--success">94.2% Efficacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabbed Card: Active Public Welfare Programs vs Nationwide Campaigns */}
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
              Public Welfare Programs & Literacy Initiatives Registry
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
              Coordinate regional citizen welfare disbursements and public
              education
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "programs"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("programs")}
            >
              <Icon name="bank" size={14} />
              <span>Welfare Programs (18)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "campaigns"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("campaigns")}
            >
              <Icon name="book" size={14} />
              <span>Literacy Campaigns (12)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Welfare Programs */}
        {activeTab === "programs" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {publicPrograms.map((prg) => (
              <div
                key={prg.id}
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
                        className="badge badge--navy"
                        style={{ fontSize: "9.5px", marginBottom: "4px" }}
                      >
                        {prg.code}
                      </span>
                      <b
                        style={{
                          color: "var(--ink)",
                          fontSize: "13.5px",
                          display: "block",
                        }}
                      >
                        {prg.name}
                      </b>
                    </div>
                    <span className={`badge badge--${prg.statusTone}`}>
                      {prg.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--muted)",
                    }}
                  >
                    Agency: {prg.leadAgency}
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
                      Target Cohort
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px 'Manrope'",
                        color: "var(--ink)",
                      }}
                    >
                      {prg.targetGroup}
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
                    Budget: {prg.budget} ({prg.progressPct})
                  </span>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    onClick={() =>
                      showToast({
                        title: "Milestone Inspection",
                        message: `Reviewing program milestones and audit metrics for ${prg.name}.`,
                        tone: "info",
                      })
                    }
                  >
                    Inspect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Literacy Campaigns */}
        {activeTab === "campaigns" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {literacyCampaigns.map((cmp) => (
              <div
                key={cmp.id}
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
                      {cmp.title}
                    </b>
                    <span className={`badge badge--${cmp.statusTone}`}>
                      {cmp.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--muted)",
                    }}
                  >
                    Demographic: {cmp.targetDemographic}
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
                      Participating Partners
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px 'Manrope'",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {cmp.partnerOrgs}
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
                  <span>Reach: {cmp.reachCount}</span>
                  <button
                    type="button"
                    className="button button--sm button--primary"
                    onClick={() =>
                      showToast({
                        title: "Field Deployment Active",
                        message: `Deploying educational campaign packets for ${cmp.title}. Reach: ${cmp.reachCount}.`,
                        tone: "success",
                      })
                    }
                  >
                    Deploy Materials
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Regional Districts & Beneficiary Groups Table */}
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
              Regional Administrative Districts & Beneficiary Summaries (
              {filteredDistricts.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Territorial public welfare coverage, progress velocity, and
              citizen impact telemetry
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                districtFilter === "all"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setDistrictFilter("all")}
            >
              All Districts (6)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                districtFilter === "metro"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setDistrictFilter("metro")}
            >
              Urban Metro (3)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                districtFilter === "rural"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setDistrictFilter("rural")}
            >
              Rural & Ag (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                districtFilter === "priority"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setDistrictFilter("priority")}
            >
              High Need Priority (1)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={districtColumns}
          data={filteredDistricts}
          searchPlaceholder="Search regional district, zone, or classification..."
          actionButton={{
            label: "Export Public Welfare Impact Audit",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Public Sector Research & Integrity Disclaimer Banner */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Public Policy Telemetry & Research Disclaimer:</strong> This
          console models public sector financial literacy programs, citizen
          welfare metrics, and regional summaries for research and evaluation
          purposes. WealthSphere.ai does not claim official sovereign government
          endorsement or statutory authority. All citizen cohort data is
          strictly anonymized.
        </div>
      </section>

      {/* Interactive Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Public Sector Regional Welfare & Citizen Impact Audit"
        defaultFilename="public_sector_welfare_audit_report"
        headers={[
          "Regional District",
          "Classification",
          "Beneficiary Population",
          "Active Programs",
          "Progress Velocity",
          "Citizen Impact Efficacy",
          "Status",
        ]}
        data={filteredDistricts.map((d) => [
          d.name,
          d.categoryLabel,
          d.population,
          d.activePrograms,
          d.progressRate,
          d.efficacyScore,
          d.status,
        ])}
      />
    </div>
  )
}

export default GovernmentDashboard
