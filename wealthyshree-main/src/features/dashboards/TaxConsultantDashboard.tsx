import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface TaxConsultantDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function TaxConsultantDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: TaxConsultantDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"calendar" | "compliance">(
    "calendar",
  )
  const [pipelineFilter, setPipelineFilter] =
    useState<"all" | "ready" | "review" | "awaiting" | "completed">("all")
  const [showExportModal, setShowExportModal] = useState(false)

  // Upcoming filing deadlines mock data
  const filingDeadlines = [
    {
      id: "fd1",
      title: "Q2 Estimated Tax Installment (Federal & State)",
      form: "Form 1040-ES / State Vouchers",
      deadline: "June 15 (9 days left)",
      clientsCount: "28 HNW & Business Clients",
      priority: "Critical",
      tone: "critical",
    },
    {
      id: "fd2",
      title: "FBAR FinCEN Form 114 (Foreign Bank Accounts)",
      form: "FinCEN Form 114",
      deadline: "June 30 (24 days left)",
      clientsCount: "18 Cross-Border Clients",
      priority: "Urgent",
      tone: "urgent",
    },
    {
      id: "fd3",
      title: "Expat Residency & Foreign Earned Income Review",
      form: "Form 2555 / Physical Presence Test",
      deadline: "July 15 (Scheduled)",
      clientsCount: "9 Expatriate Households",
      priority: "Normal",
      tone: "normal",
    },
    {
      id: "fd4",
      title: "Trust Income Tax Return Extended Due Date",
      form: "Form 1041 (Schedule K-1 Distribution)",
      deadline: "Sept 30 (Scheduled)",
      clientsCount: "14 Private Trusts",
      priority: "Normal",
      tone: "normal",
    },
  ]

  // Compliance tasks mock data
  const complianceTasks = [
    {
      id: "ct1",
      task: "FATCA & CRS Foreign Financial Assets Disclosure",
      scope: "4 offshore accounts flagged across UK and Singapore entities",
      deadline: "Due in 8 days",
      status: "In Progress",
      statusTone: "warning",
    },
    {
      id: "ct2",
      task: "Wash-Sale Rule Audit on Q2 Stock Disposals",
      scope: "Automated scan across 12 linked brokerage feeds",
      deadline: "Clean (0 Violations)",
      status: "Verified",
      statusTone: "success",
    },
    {
      id: "ct3",
      task: "Passive Foreign Investment Company (PFIC) Annual Test",
      scope: "Form 8621 election for European UCITS funds",
      deadline: "Due in 15 days",
      status: "Pending Docs",
      statusTone: "danger",
    },
    {
      id: "ct4",
      task: "Gift Tax Annual Exclusion Validation ($18K/donee)",
      scope: "Form 709 intra-family trust gifts reconciliation",
      deadline: "Audit Ready",
      status: "Verified",
      statusTone: "success",
    },
  ]

  // Tax Clients & Returns Pipeline mock data
  const taxReturns = [
    {
      id: "tr1",
      clientName: "Harrison Vance Family",
      jurisdiction: "US (Federal & NY State)",
      form: "Form 1040 + Sch D",
      estLiability: "$142,500 (Est)",
      savingsIdentified: "$38,400",
      deadline: "June 15",
      stage: "Ready to E-File",
      stageTone: "success",
      status: "Ready",
    },
    {
      id: "tr2",
      clientName: "Dr. Arthur Pendelton",
      jurisdiction: "US (Federal & CA State)",
      form: "Form 1040 + Sch C",
      estLiability: "$86,200 (Est)",
      savingsIdentified: "$24,100",
      deadline: "June 15",
      stage: "Consultant Review",
      stageTone: "warning",
      status: "In Review",
    },
    {
      id: "tr3",
      clientName: "Sophia Lin (Cross-Border)",
      jurisdiction: "US / UK Dual Resident",
      form: "Form 1040-NR + 8938",
      estLiability: "$218,000 (Est)",
      savingsIdentified: "$64,500",
      deadline: "June 30",
      stage: "Waiting on K-1 Docs",
      stageTone: "danger",
      status: "Awaiting Docs",
    },
    {
      id: "tr4",
      clientName: "Kensington Dynasty Trust",
      jurisdiction: "Delaware Trust",
      form: "Form 1041 (Fiduciary)",
      estLiability: "$64,000 (Est)",
      savingsIdentified: "$42,000",
      deadline: "Sept 30",
      stage: "Client Approval",
      stageTone: "info",
      status: "In Review",
    },
    {
      id: "tr5",
      clientName: "Beauchamp Global Ventures",
      jurisdiction: "US Partnership",
      form: "Form 1065 + K-1s",
      estLiability: "$0 (Pass-through)",
      savingsIdentified: "$51,200",
      deadline: "June 15",
      stage: "Ready to E-File",
      stageTone: "success",
      status: "Ready",
    },
    {
      id: "tr6",
      clientName: "Montgomery Real Estate LP",
      jurisdiction: "Texas / Multi-State",
      form: "Form 1065",
      estLiability: "$12,400 (Franchise)",
      savingsIdentified: "$18,500",
      deadline: "Completed",
      stage: "IRS Accepted",
      stageTone: "success",
      status: "Completed",
    },
  ]

  // Filter returns
  const filteredReturns = useMemo(() => {
    if (pipelineFilter === "ready")
      return taxReturns.filter((r) => r.status === "Ready")
    if (pipelineFilter === "review")
      return taxReturns.filter((r) => r.status === "In Review")
    if (pipelineFilter === "awaiting")
      return taxReturns.filter((r) => r.status === "Awaiting Docs")
    if (pipelineFilter === "completed")
      return taxReturns.filter((r) => r.status === "Completed")
    return taxReturns
  }, [pipelineFilter])

  const returnColumns = [
    {
      key: "clientName",
      header: "Tax Client / Household",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>
            {row.clientName}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "10px" }}>
            {row.jurisdiction}
          </small>
        </div>
      ),
    },
    {
      key: "form",
      header: "Tax Return Form",
      render: (row: any) => <span>{row.form}</span>,
    },
    {
      key: "estLiability",
      header: "Est. Tax Liability",
      render: (row: any) => (
        <b style={{ color: "var(--ink)" }}>{row.estLiability}</b>
      ),
    },
    {
      key: "savingsIdentified",
      header: "Identified Savings",
      render: (row: any) => (
        <span className="badge badge--success">+{row.savingsIdentified}</span>
      ),
    },
    {
      key: "deadline",
      header: "Filing Deadline",
    },
    {
      key: "stage",
      header: "Filing Stage",
      render: (row: any) => (
        <span className={`badge badge--${row.stageTone}`}>{row.stage}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard tax-dashboard">
      {/* 1. Advisory Suite Header & EA Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--success">
              IRS ENROLLED AGENT (EA) VERIFIED
            </span>
            <span>
              Managing 68 Tax Clients · $2.48M In Identified Tax Savings
            </span>
          </div>
          <h1 className="hero-title">David Chen, EA</h1>
          <p className="hero-subtitle">
            Managing Tax Consultant · Chen International Tax Group.
            Multi-jurisdiction tax planning, cross-border treaty compliance,
            FATCA disclosures, and automated capital gains optimization.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Tax Planning")}
          >
            <Icon name="trending" size={16} />
            <span>Create Plan</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>AI Tax Assistant</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Metric Cards */}
      <section className="metric-grid" aria-label="Tax Consultant Metrics">
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

      {/* 3. Filing Pipeline Workflow Stepper */}
      <section className="card" style={{ padding: "18px 20px" }}>
        <div className="card-head" style={{ marginBottom: "12px" }}>
          <div>
            <span className="card-title">
              Tax Return Pipeline & Filing Stages
            </span>
            <span className="card-sub">
              Real-time status of active client returns across federal, state,
              and international filings
            </span>
          </div>
          <span className="badge badge--info">Tax Year 2024 / Q2 2025</span>
        </div>

        <div className="pipeline-stepper">
          <div className="pipeline-step">
            <span className="step-num">STAGE 01</span>
            <span className="step-name">Intake & Docs</span>
            <span className="step-count">5 Clients</span>
          </div>
          <div className="pipeline-step">
            <span className="step-num">STAGE 02</span>
            <span className="step-name">AI OCR Extraction</span>
            <span className="step-count">3 In Queue</span>
          </div>
          <div className="pipeline-step active">
            <span className="step-num">STAGE 03</span>
            <span className="step-name">Calculation Review</span>
            <span className="step-count">4 Returns</span>
          </div>
          <div className="pipeline-step">
            <span className="step-num">STAGE 04</span>
            <span className="step-name">Client Approval</span>
            <span className="step-count">2 Pending</span>
          </div>
          <div className="pipeline-step completed">
            <span className="step-num">STAGE 05</span>
            <span className="step-name">Ready to E-File</span>
            <span className="step-count" style={{ color: "#15803d" }}>
              2 Returns
            </span>
          </div>
          <div className="pipeline-step completed">
            <span className="step-num">STAGE 06</span>
            <span className="step-name">IRS / Dept Accepted</span>
            <span className="step-count" style={{ color: "#15803d" }}>
              52 Filed
            </span>
          </div>
        </div>
      </section>

      {/* 4. Quick Actions Component */}
      <QuickActions
        actions={roleConfig.quickActions}
        roleConfig={roleConfig}
        onExecuteAction={(act) => {
          if (act.id === "run_harvest") onNavigate("Tax Calculations")
          else if (act.id === "new_scenario") onNavigate("Tax Planning")
          else if (act.id === "client_tax_summary") onNavigate("Reports")
          else onOpenAI()
        }}
      />

      {/* 5. Identified Tax Savings & Compliance Index */}
      <section className="dashboard-grid">
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Identified Tax Savings Breakdown
              </span>
              <span className="card-sub">
                Legal structuring & harvesting optimizations identified by
                Sphere AI
              </span>
            </div>
            <span className="badge badge--success">$2.48M Total</span>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div className="score-bars">
              {[
                ["Foreign Tax Credit (FTC) Form 1116 ($840,000)", "84%"],
                ["Qualified Business Income (QBI) Sec 199A ($620,000)", "62%"],
                ["Trust & Entity Distribution Structuring ($604,500)", "60%"],
                ["Tax-Loss Harvesting Offsets ($418,000)", "42%"],
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

            <button
              type="button"
              className="button button--secondary"
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => onNavigate("Tax Calculations")}
            >
              <span>Review Detailed Tax Calculations</span>
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>

        {/* Filing Compliance Index Card */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">Filing Compliance Health</span>
              <span className="card-sub">
                Practice on-time filing index and audit readiness
              </span>
            </div>
            <span className="badge badge--success">92% ON TIME</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>92%</strong>
              <span>On-Time Rate</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">ZERO PENALTIES</span>
            <span>All 2024 returns filed within statutory grace</span>
          </div>

          <div className="score-bars">
            {[
              ["FATCA / CRS Foreign Disclosure (100% verified)", "100%"],
              ["Wash-Sale Rule Monitoring (0 violations)", "100%"],
              ["Client Document Completeness (94%)", "94%"],
              ["State Apportionment Review (88%)", "88%"],
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
      </section>

      {/* 6. Upcoming Filing Calendar & Compliance Tasks */}
      <section className="card education-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">
              Filing Calendar & Statutory Tasks
            </span>
            <span className="card-sub">
              {activeTab === "calendar"
                ? "Impending federal, state, and cross-border tax filing deadlines"
                : "Active compliance checks, foreign account audits, and wash-sale scans"}
            </span>
          </div>
          <div className="tabs" style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "calendar"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("calendar")}
            >
              <Icon name="calendar" size={14} />
              <span>Filing Calendar (4)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "compliance"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("compliance")}
            >
              <Icon name="shield" size={14} />
              <span>Compliance Tasks (8)</span>
            </button>
          </div>
        </div>

        {activeTab === "calendar" ? (
          <div className="deadline-timeline">
            {filingDeadlines.map((fd) => (
              <div key={fd.id} className={`deadline-card ${fd.tone}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <b
                    style={{ font: "600 13px 'Manrope'", color: "var(--ink)" }}
                  >
                    {fd.title}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Form: {fd.form} · Covering {fd.clientsCount}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span
                    style={{
                      font: "600 11px 'Manrope'",
                      color: fd.tone === "critical" ? "#dc2626" : "var(--ink)",
                    }}
                  >
                    {fd.deadline}
                  </span>
                  <span
                    className={`badge badge--${
                      fd.tone === "critical"
                        ? "danger"
                        : fd.tone === "urgent"
                          ? "warning"
                          : "neutral"
                    }`}
                  >
                    {fd.priority}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => onNavigate("Filing Calendar")}
                  >
                    View Clients
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="doc-request-list">
            {complianceTasks.map((ct) => (
              <div key={ct.id} className="doc-request-item">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <b
                    style={{ font: "600 12px 'Manrope'", color: "var(--ink)" }}
                  >
                    {ct.task}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    {ct.scope} · Status: {ct.deadline}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className={`badge badge--${ct.statusTone}`}>
                    {ct.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() =>
                      showToast({
                        title: "Audit Verification Initiated",
                        message: `Running statutory audit verification and cross-referencing proofs for ${ct.task}.`,
                        tone: "info",
                      })
                    }
                  >
                    Run Audit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Filterable Tax Return Pipeline Table */}
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
              Tax Clients & Return Pipeline ({filteredReturns.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Monitored returns, estimated liability, identified savings, and
              electronic filing status
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                pipelineFilter === "all"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPipelineFilter("all")}
            >
              All (68)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                pipelineFilter === "ready"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPipelineFilter("ready")}
            >
              Ready to File (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                pipelineFilter === "review"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPipelineFilter("review")}
            >
              In Review (4)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                pipelineFilter === "awaiting"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPipelineFilter("awaiting")}
            >
              Awaiting Docs (5)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                pipelineFilter === "completed"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPipelineFilter("completed")}
            >
              Completed (52)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={returnColumns}
          data={filteredReturns}
          searchPlaceholder="Search tax client, jurisdiction, or form..."
          actionButton={{
            label: "Export Tax Pipeline",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 8. Strict Tax & Legal Disclaimer Banner */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Important Tax Disclosures & Analytical Notice:</strong> Tax
          scenario calculations, multi-jurisdiction apportionment models, and
          loss harvesting projections generated by WealthSphere.ai are advisory
          decision-support tools for licensed Enrolled Agents (EA), CPAs, and
          tax professionals. They do not constitute formal legal opinions or
          verified tax returns until attested and approved by an authorized
          preparer.
        </div>
      </section>

      {/* Interactive Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Tax Advisory Pipeline & Client Ledger"
        defaultFilename="wealthsphere_tax_consultant_pipeline"
        headers={[
          "Client Name",
          "Jurisdiction",
          "Tax Form",
          "Est. Tax Liability",
          "Identified Savings",
          "Filing Deadline",
          "Filing Stage",
          "Status",
        ]}
        data={filteredReturns.map((r) => [
          r.clientName,
          r.jurisdiction,
          r.form,
          r.estLiability,
          r.savingsIdentified,
          r.deadline,
          r.stage,
          r.status,
        ])}
      />
    </div>
  )
}
export default TaxConsultantDashboard
