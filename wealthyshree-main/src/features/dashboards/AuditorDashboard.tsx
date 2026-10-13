import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { EvidenceVerifyModal, ExportModal } from "../../components/modals"

export interface AuditorDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function AuditorDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: AuditorDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"evidence" | "findings">(
    "evidence",
  )
  const [engagementFilter, setEngagementFilter] =
    useState<"all" | "soc2" | "statutory" | "deadline">("all")
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedEvidence, setSelectedEvidence] = useState({
    id: "ev-101",
    title: "Northern Trust Custodial Omnibus Cash Ledger Sample",
    entity: "Pendelton Family Office · Dynasty Trust",
  })

  // Evidence Repository items awaiting verification mock data
  const evidenceItems = [
    {
      id: "ev-101",
      description: "Bank Statement & Custodial Feeds Reconciliation Sample",
      entity: "Pendelton Family Office · Dynasty Trust",
      hashStatus: "SHA-256 Validated",
      hashTone: "success",
      submitter: "Northern Trust Escrow API",
      receivedDate: "Today · 09:14 AM",
      status: "Ready for Partner Review",
      statusTone: "success",
    },
    {
      id: "ev-102",
      description: "Q3 Multi-Broker Block Trade Execution Ticket Logs",
      entity: "Institutional Sleeve · Morgan Stanley",
      hashStatus: "Hash Matching...",
      hashTone: "warning",
      submitter: "Execution OMS Gateway",
      receivedDate: "Today · 10:45 AM",
      status: "Verification Pending",
      statusTone: "warning",
    },
    {
      id: "ev-103",
      description: "401(k) Employee Payroll Deferral Remittance Sample",
      entity: "Enterprise Tenant #42 (Total Rewards)",
      hashStatus: "SHA-256 Validated",
      hashTone: "success",
      submitter: "ADP Payroll Direct Feed",
      receivedDate: "Yesterday · 04:30 PM",
      status: "Sample Passed",
      statusTone: "success",
    },
    {
      id: "ev-104",
      description: "Lombard Credit Facility Collateral Pledge Certification",
      entity: "Banque Privée Sphere (Zurich Escrow)",
      hashStatus: "Cryptographic Seal Intact",
      hashTone: "info",
      submitter: "Bank Legal Counsel",
      receivedDate: "Yesterday · 02:15 PM",
      status: "Under Review",
      statusTone: "info",
    },
  ]

  // Audit Findings & Control Exceptions mock data
  const auditFindings = [
    {
      id: "fnd-01",
      domain: "Access Control & Segregation of Duties",
      title: "Dual-Approval Missing on One Test Batch (<$10K Wire)",
      severity: "Low Risk (Minor)",
      severityTone: "warning",
      deadline: "Remediate in 14 Days",
      assignedLead: "Teresa Bradley, CIA",
      status: "Management Response Pending",
      statusTone: "warning",
    },
    {
      id: "fnd-02",
      domain: "Statutory Revenue Cutoff",
      title: "Unearned Advisory Fee Accrual Adjusted by $14,200",
      severity: "Resolved / Adjusted",
      severityTone: "success",
      deadline: "Completed May 28",
      assignedLead: "Marcus Vance, CPA",
      status: "Remediated & Closed",
      statusTone: "success",
    },
    {
      id: "fnd-03",
      domain: "Data Retention & Encryption",
      title: "Automated Evidence Vault Key Rotation Scheduled",
      severity: "Informational",
      severityTone: "info",
      deadline: "Due in 30 Days",
      assignedLead: "Security Officer Enclave",
      status: "In Progress",
      statusTone: "info",
    },
    {
      id: "fnd-04",
      domain: "Vendor Third-Party SOC Reports",
      title: "Bridge Letter Received for Secondary Cloud Custodian",
      severity: "Resolved / Satisfied",
      severityTone: "success",
      deadline: "Verified Jun 02",
      assignedLead: "Teresa Bradley, CIA",
      status: "Closed / Verified",
      statusTone: "success",
    },
  ]

  // Audit Engagements & Workpapers directory mock data
  const auditEngagements = [
    {
      id: "eng1",
      entityName: "Pendelton Family Office LLC & Affiliated Trusts",
      auditType: "statutory",
      typeLabel: "Statutory Financial Audit",
      leadAuditor: "Teresa Bradley, CIA, CISA",
      sampleCount: "148 Samples / 100% Tested",
      deadline: "June 18, 2026 (In 8 Days)",
      reviewStatus: "Partner Sign-off Ready",
      opinion: "Unqualified Clean Opinion",
      statusTone: "success",
    },
    {
      id: "eng2",
      entityName: "WealthSphere Institutional Platform Tenant #42",
      auditType: "soc2",
      typeLabel: "AICPA SOC 2 Type II",
      leadAuditor: "Alex Mercer, CISA",
      sampleCount: "320 Controls Sampled",
      deadline: "June 22, 2026 (In 12 Days)",
      reviewStatus: "Testing Fieldwork",
      opinion: "All Criteria Satisfied",
      statusTone: "success",
    },
    {
      id: "eng3",
      entityName: "Apex Precision Engineering Corp",
      auditType: "statutory",
      typeLabel: "Operating Co Year-End Audit",
      leadAuditor: "Marcus Vance, CPA",
      sampleCount: "92 Inventory Samples",
      deadline: "June 24, 2026 (In 14 Days)",
      reviewStatus: "Revenue Cutoff Review",
      opinion: "Adjustment Required",
      statusTone: "warning",
    },
    {
      id: "eng4",
      entityName: "Banque Privée Sphere UHNW Division",
      auditType: "soc2",
      typeLabel: "FINMA & SOC 2 Trust Review",
      leadAuditor: "Teresa Bradley, CIA, CISA",
      sampleCount: "64 Lombard Facilities",
      deadline: "July 10, 2026",
      reviewStatus: "Fieldwork Phase 1",
      opinion: "Controls Effective",
      statusTone: "info",
    },
    {
      id: "eng5",
      entityName: "Sovereign Welfare & Municipal Consortium",
      auditType: "statutory",
      typeLabel: "Public Funds Disbursement Audit",
      leadAuditor: "Elena Rostova, CFE",
      sampleCount: "1,200 Welfare Transfer Hashes",
      deadline: "July 28, 2026",
      reviewStatus: "Sampling & Verification",
      opinion: "Zero Discrepancies",
      statusTone: "success",
    },
    {
      id: "eng6",
      entityName: "University Academic Endowment Consortium",
      auditType: "soc2",
      typeLabel: "FERPA & Grant Audit",
      leadAuditor: "Alex Mercer, CISA",
      sampleCount: "48 Restricted Grants",
      deadline: "August 15, 2026",
      reviewStatus: "Planning Phase",
      opinion: "On Track",
      statusTone: "info",
    },
  ]

  // Filter audit engagements
  const filteredEngagements = useMemo(() => {
    if (engagementFilter === "soc2")
      return auditEngagements.filter((e) => e.auditType === "soc2")
    if (engagementFilter === "statutory")
      return auditEngagements.filter((e) => e.auditType === "statutory")
    if (engagementFilter === "deadline")
      return auditEngagements.filter((e) => e.deadline.includes("Days"))
    return auditEngagements
  }, [engagementFilter])

  const engagementColumns = [
    {
      key: "entityName",
      header: "Audit Engagement / Client Entity",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>
            {row.entityName}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
            Lead Auditor: {row.leadAuditor}
          </small>
        </div>
      ),
    },
    {
      key: "typeLabel",
      header: "Audit Standard & Framework",
      render: (row: any) => (
        <span className="badge badge--info">{row.typeLabel}</span>
      ),
    },
    {
      key: "sampleCount",
      header: "Sampling & Testing Verification",
      render: (row: any) => (
        <span
          style={{ fontSize: "12px", color: "var(--ink)", fontWeight: 500 }}
        >
          {row.sampleCount}
        </span>
      ),
    },
    {
      key: "deadline",
      header: "Statutory Audit Deadline",
      render: (row: any) => (
        <div>
          <strong
            style={{
              color: "var(--primary-dark)",
              font: "700 12.5px 'Manrope'",
            }}
          >
            {row.deadline}
          </strong>
          <small
            style={{
              display: "block",
              color: "var(--muted)",
              fontSize: "10px",
            }}
          >
            Status: {row.reviewStatus}
          </small>
        </div>
      ),
    },
    {
      key: "opinion",
      header: "Audit Opinion / Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.opinion}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard auditor-dashboard">
      {/* 1. Hero Header & Independent Audit Assurance Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--navy">
              INDEPENDENT ASSURANCE & ATTESTATION
            </span>
            <span>
              AICPA & IIA PROFESSIONAL STANDARDS · 18 Active Engagements
            </span>
          </div>
          <h1 className="hero-title">Teresa Bradley, CIA, CISA</h1>
          <p className="hero-subtitle">
            Lead Independent Audit Partner · Independent Audit Assurance Desk.
            Audit engagements, financial records verification, immutable
            evidence repository, review queue, findings resolution, and
            tamper-evident audit trails.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Evidence Repository")}
          >
            <Icon name="document" size={16} />
            <span>Request Evidence</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>AI Trail Analyzer</span>
          </button>
        </div>
      </section>

      {/* 2. Eight Core Auditor Metric Cards */}
      <section className="metric-grid" aria-label="Auditor Metrics">
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
          if (act.id === "request_evidence") onNavigate("Evidence Repository")
          else if (act.id === "signoff_workpaper") onNavigate("Review Queue")
          else if (act.id === "log_finding") onNavigate("Findings")
          else if (act.id === "opinion_letter") {
            setShowExportModal(true)
          } else onOpenAI()
        }}
      />

      {/* 4. Audit Assurance Health & Immutable Evidence Verification Grid */}
      <section className="dashboard-grid">
        {/* Card 1: Overall Compliance & Control Integrity Gauge */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">
                Continuous Control Assurance Index
              </span>
              <span className="card-sub">
                Real-time compliance across 18 audited institutional entities
              </span>
            </div>
            <span className="badge badge--success">100% Immutable</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>98.8%</strong>
              <span>controls verified</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">
              UNQUALIFIED OPINION READY
            </span>
            <span>0 critical control exceptions flagged</span>
          </div>

          <div className="score-bars">
            {[
              ["Segregation of Duties (SoD) Enforced (100.0%)", "100.0%"],
              ["Cryptographic SHA-256 Ledger Chain (100.0%)", "100.0%"],
              ["Sampled Journal Entry Verification (97.4%)", "97.4%"],
              ["Statutory Revenue Cutoff Consistency (96.8%)", "96.8%"],
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

        {/* Card 2: Evidence Repository & Review Queue Status */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Evidence Repository & Review Queue
              </span>
              <span className="card-sub">
                420 Reconciled Financial Ledgers across client entities
              </span>
            </div>
            <span className="badge badge--info">14 Items Pending</span>
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
                Cryptographic Evidence Hash Validation
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                98.6% Hash Verified
              </strong>
            </div>

            <div className="cat-track" style={{ height: "8px" }}>
              <div className="cat-fill emerald" style={{ width: "98.6%" }} />
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
                  Active Audits
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  18 Engagements
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
                  Partner Reviews
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  6 Queued
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
                  Due in 14d
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  3 Filings
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
                  Immutable Ledger Hash Verification
                </b>
                <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                  All transaction blocks sealed via cryptographic Merkle tree
                  audit trail
                </small>
              </div>
              <span className="badge badge--success">0 Drift Detected</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabbed Card: Evidence Repository vs Audit Findings */}
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
              Evidence Repository Verification & Control Findings Desk
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
              Inspect incoming audit evidence samples and track resolution of
              control exceptions
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "evidence"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("evidence")}
            >
              <Icon name="document" size={14} />
              <span>Evidence Verification (14)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "findings"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("findings")}
            >
              <Icon name="shield" size={14} />
              <span>Audit Findings (4)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Evidence Repository */}
        {activeTab === "evidence" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {evidenceItems.map((item) => (
              <div
                key={item.id}
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
                        {item.id}
                      </span>
                      <b
                        style={{
                          color: "var(--ink)",
                          fontSize: "13.5px",
                          display: "block",
                        }}
                      >
                        {item.description}
                      </b>
                    </div>
                    <span className={`badge badge--${item.statusTone}`}>
                      {item.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--muted)",
                    }}
                  >
                    Entity: {item.entity} · Source: {item.submitter}
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
                      Cryptographic Seal
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px 'Manrope'",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {item.hashStatus}
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
                  <span>Received: {item.receivedDate}</span>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    onClick={() => {
                      setSelectedEvidence({
                        id: item.id,
                        title: item.description,
                        entity: item.entity,
                      })
                      setShowVerifyModal(true)
                    }}
                  >
                    Verify Hash
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Audit Findings */}
        {activeTab === "findings" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {auditFindings.map((fnd) => (
              <div
                key={fnd.id}
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
                        className="badge badge--warning"
                        style={{ fontSize: "9.5px", marginBottom: "4px" }}
                      >
                        {fnd.id} · {fnd.domain}
                      </span>
                      <b
                        style={{
                          color: "var(--ink)",
                          fontSize: "13.5px",
                          display: "block",
                        }}
                      >
                        {fnd.title}
                      </b>
                    </div>
                    <span className={`badge badge--${fnd.severityTone}`}>
                      {fnd.severity}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 10px",
                      fontSize: "11.5px",
                      color: "var(--muted)",
                    }}
                  >
                    Lead Auditor: {fnd.assignedLead}
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
                      Remediation Target
                    </span>
                    <strong
                      style={{
                        font: "600 11.5px 'Manrope'",
                        color: "var(--primary-dark)",
                      }}
                    >
                      {fnd.deadline}
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
                  <span>Status: {fnd.status}</span>
                  <button
                    type="button"
                    className="button button--sm button--primary"
                    onClick={() =>
                      showToast({
                        title: "Remediation Tracking Docket",
                        message: `Opening corrective action plan and remediation docket for ${fnd.id} (${fnd.title}).`,
                        tone: "info",
                      })
                    }
                  >
                    Sign Remediation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Audit Engagements & Workpapers Table */}
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
              Active Audit Engagements & Workpaper Directory (
              {filteredEngagements.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Statutory and SOC 2 Type II assurance dockets, review queues, and
              testing progress
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                engagementFilter === "all"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEngagementFilter("all")}
            >
              All Engagements (6)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                engagementFilter === "soc2"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEngagementFilter("soc2")}
            >
              SOC 2 (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                engagementFilter === "statutory"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEngagementFilter("statutory")}
            >
              Statutory (3)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                engagementFilter === "deadline"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEngagementFilter("deadline")}
            >
              Due in 14d (3)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={engagementColumns}
          data={filteredEngagements}
          searchPlaceholder="Search audit engagement, client entity, or standard..."
          actionButton={{
            label: "Export Independent Auditor Opinion",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Independent Attestation & Professional Standards Disclaimer Banner */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Independent Audit Attestation Disclaimer:</strong> Workpapers
          and evidence testing records in this console follow AICPA and IIA
          professional standards. Audit opinions are independent and based upon
          tamper-evident cryptographic ledger chains. Unissued workpapers do not
          constitute a final public statutory certification until partner
          signature and hash seal.
        </div>
      </section>

      {/* Interactive Modals */}
      <EvidenceVerifyModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        evidenceId={selectedEvidence.id}
        evidenceTitle={selectedEvidence.title}
        entity={selectedEvidence.entity}
        onVerified={() => {
          showToast({
            title: "Evidence Seal Verified",
            message: `Cryptographic SHA-256 Merkle root seal attested for ${selectedEvidence.id}.`,
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Independent Auditor Opinion Attestation Report"
        defaultFilename="independent_auditor_opinion_report"
        headers={[
          "Audit Engagement / Client Entity",
          "Lead Auditor",
          "Audit Standard",
          "Sampling & Testing Verification",
          "Statutory Deadline",
          "Audit Opinion / Status",
        ]}
        data={filteredEngagements.map((e) => [
          e.entityName,
          e.leadAuditor,
          e.typeLabel,
          e.sampleCount,
          e.deadline,
          e.opinion,
        ])}
      />
    </div>
  )
}

export default AuditorDashboard
