import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal, EvidenceVerifyModal } from "../../components/modals"

export interface AuditorPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface AuditEngagementItem {
  id: string
  engagementCode: string
  clientEntity: string
  auditType: "SOC 2 Type II" | "Statutory Financial Audit" | "ISO 27001 Surveillance" | "SOX 404 Controls Test"
  leadPartner: string
  fieldworkPeriod: string
  progressPct: number
  status: "In Progress" | "Partner Review" | "Fieldwork Testing" | "Certified"
}

interface FinancialLedgerRecordItem {
  id: string
  recordCode: string
  entity: string
  period: string
  balanceAmount: string
  sha256Hash: string
  hashStatus: "Validated Immutable" | "Hash Drift Detected"
  custodianConfirmation: "Northern Trust" | "J.P. Morgan" | "Morgan Stanley"
  attestedBy: string
}

interface EvidenceItem {
  id: string
  title: string
  entity: string
  category: "Bank Confirmation" | "General Ledger Sample" | "Equity Cap Table" | "Board Resolution"
  submittedDate: string
  hashStatus: "SHA-256 Validated" | "Pending Seal"
  status: "Partner Verified" | "Awaiting Verification" | "Exception Flagged"
}

interface FindingItem {
  id: string
  findingCode: string
  title: string
  engagement: string
  severity: "Low Risk" | "Medium Risk" | "High Risk" | "Critical Exception"
  deficiencyType: "Control Design" | "Operating Ineffectiveness" | "Documentation Gap"
  remediationStatus: "Management Remediation Plan Active" | "Resolved & Retested" | "Pending Review"
  targetDate: string
}

export function AuditorModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: AuditorPageProps) {
  const { showToast } = useToast()
  const [showExportModal, setShowExportModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [selectedEvidence, setSelectedEvidence] = useState<{
    id: string
    title: string
    entity: string
  }>({
    id: "ev-101",
    title: "Northern Trust Custodial Omnibus Cash Ledger Sample",
    entity: "Pendelton Delaware Dynasty Trust",
  })

  // 1. Engagements State
  const [engagements, setEngagements] = useState<AuditEngagementItem[]>([
    {
      id: "eng-1",
      engagementCode: "ENG-SOC-2026",
      clientEntity: "WealthSphere.ai Global Infrastructure",
      auditType: "SOC 2 Type II",
      leadPartner: "Teresa Bradley, CIA, CISA",
      fieldworkPeriod: "Jul 2025 - Jun 2026",
      progressPct: 88,
      status: "Partner Review",
    },
    {
      id: "eng-2",
      engagementCode: "ENG-FIN-2026",
      clientEntity: "Pendelton Family Office & Holding Entities",
      auditType: "Statutory Financial Audit",
      leadPartner: "Teresa Bradley, CIA, CISA",
      fieldworkPeriod: "FY 2025 Audited Financials",
      progressPct: 92,
      status: "Partner Review",
    },
    {
      id: "eng-3",
      engagementCode: "ENG-ISO-2026",
      clientEntity: "Banque Privée Sphere (Zurich)",
      auditType: "ISO 27001 Surveillance",
      leadPartner: "Marcus Sterling (Lead ISMS Auditor)",
      fieldworkPeriod: "Annual Recertification",
      progressPct: 98,
      status: "Certified",
    },
    {
      id: "eng-4",
      engagementCode: "ENG-SOX-2026",
      clientEntity: "Enterprise People Console (Corporate HR)",
      auditType: "SOX 404 Controls Test",
      leadPartner: "Evelyn Reed, CPA",
      fieldworkPeriod: "Q2 2026 Sample Controls",
      progressPct: 76,
      status: "Fieldwork Testing",
    },
  ])

  // 2. Financial Records State
  const [records] = useState<FinancialLedgerRecordItem[]>([
    {
      id: "rec-1",
      recordCode: "REC-NT-00192",
      entity: "Pendelton Delaware Dynasty Trust",
      period: "May 2026 Closing Trial Balance",
      balanceAmount: "$32,400,000 USD",
      sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      hashStatus: "Validated Immutable",
      custodianConfirmation: "Northern Trust",
      attestedBy: "Audit Senior Lead",
    },
    {
      id: "rec-2",
      recordCode: "REC-JPM-00418",
      entity: "Pendelton Capital Partners LLC",
      period: "May 2026 Private Equity Capital Call Ledger",
      balanceAmount: "$26,400,000 USD",
      sha256Hash: "7d793037a0760186574b0282f2f435e709c00b05b0b2304ef26a9712df8802d3",
      hashStatus: "Validated Immutable",
      custodianConfirmation: "J.P. Morgan",
      attestedBy: "Audit Senior Lead",
    },
    {
      id: "rec-3",
      recordCode: "REC-MS-00982",
      entity: "Banque Privée Sphere Custodial Pool",
      period: "May 2026 Lombard Collateral Blotter",
      balanceAmount: "$54,500,000 USD",
      sha256Hash: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7",
      hashStatus: "Validated Immutable",
      custodianConfirmation: "Morgan Stanley",
      attestedBy: "Lead Partner",
    },
  ])

  // 3. Evidence Repository State
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([
    {
      id: "ev-101",
      title: "Northern Trust Custodial Omnibus Cash Ledger Sample",
      entity: "Pendelton Delaware Dynasty Trust",
      category: "Bank Confirmation",
      submittedDate: "May 28, 2026",
      hashStatus: "SHA-256 Validated",
      status: "Partner Verified",
    },
    {
      id: "ev-102",
      title: "Sequoia Growth VI Capital Call Wire Authorization Receipt",
      entity: "Pendelton Capital Partners LLC",
      category: "General Ledger Sample",
      submittedDate: "Jun 02, 2026",
      hashStatus: "Pending Seal",
      status: "Awaiting Verification",
    },
    {
      id: "ev-103",
      title: "Lombard Facility LTV Margin Call Stress Test Results",
      entity: "Banque Privée Sphere",
      category: "Bank Confirmation",
      submittedDate: "Jun 04, 2026",
      hashStatus: "Pending Seal",
      status: "Awaiting Verification",
    },
    {
      id: "ev-104",
      title: "Board Resolution: G3 Family Council Ratification",
      entity: "Pendelton Family Assembly",
      category: "Board Resolution",
      submittedDate: "Jun 06, 2026",
      hashStatus: "SHA-256 Validated",
      status: "Partner Verified",
    },
  ])

  // 4. Review Queue State
  const [reviewQueue, setReviewQueue] = useState([
    {
      id: "wp-rev-1",
      workpaper: "WP-301: Illiquid Real Estate Level 3 Fair Value Valuation",
      entity: "Mayfair London Office & Aspen Compound",
      preparedBy: "Senior Associate (Real Estate Valuation)",
      dueDate: "Tomorrow",
      status: "Ready for Partner Sign-Off",
    },
    {
      id: "wp-rev-2",
      workpaper: "WP-404: Automated Segregation of Duties Matrix Test",
      entity: "WealthSphere Multi-Tenant Database",
      preparedBy: "IT Audit Specialist (CISA)",
      dueDate: "In 3 Days",
      status: "Ready for Partner Sign-Off",
    },
    {
      id: "wp-rev-3",
      workpaper: "WP-502: ERISA 401(k) Nondiscrimination Census Sample",
      entity: "Corporate HR Workforce Roster",
      preparedBy: "Senior Benefits Auditor",
      dueDate: "Next Week",
      status: "Under Manager Review",
    },
  ])

  // 5. Findings State
  const [findings] = useState<FindingItem[]>([
    {
      id: "fnd-1",
      findingCode: "FIND-2026-01",
      title: "Segregation of Duties: Elevated Staging Environment Access",
      engagement: "SOC 2 Type II",
      severity: "Low Risk",
      deficiencyType: "Control Design",
      remediationStatus: "Management Remediation Plan Active",
      targetDate: "Jul 15, 2026",
    },
    {
      id: "fnd-2",
      findingCode: "FIND-2026-02",
      title: "Untimely Review of Dormant Contractor IAM Credentials",
      engagement: "ISO 27001 Surveillance",
      severity: "Low Risk",
      deficiencyType: "Operating Ineffectiveness",
      remediationStatus: "Resolved & Retested",
      targetDate: "Resolved Jun 01",
    },
    {
      id: "fnd-3",
      findingCode: "FIND-2026-03",
      title: "Secondary Signature Missing on Wire Under $50,000 Buffer",
      engagement: "Statutory Financial Audit",
      severity: "Medium Risk",
      deficiencyType: "Documentation Gap",
      remediationStatus: "Management Remediation Plan Active",
      targetDate: "Jun 30, 2026",
    },
  ])

  const handleOpenVerifyModal = (ev: EvidenceItem) => {
    setSelectedEvidence({
      id: ev.id,
      title: ev.title,
      entity: ev.entity,
    })
    setShowVerifyModal(true)
  }

  const handleSignOffWorkpaper = (wpId: string) => {
    setReviewQueue((prev) =>
      prev.map((w) =>
        w.id === wpId ? { ...w, status: "Signed Off & Attested" } : w,
      ),
    )
    showToast({
      title: "Audit Workpaper Attested",
      message: "Lead Partner digital signature applied with cryptographic timestamp seal.",
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
              INDEPENDENT ASSURANCE & COMPLIANCE ENCLAVE
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              Strict Read-Only Verification Enclave · Teresa Bradley, CIA, CISA
            </span>
          </div>
          <h1 style={{ font: "700 26px 'Manrope', sans-serif", color: "var(--ink)", margin: 0 }}>
            {navName}
          </h1>
          <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "13.5px" }}>
            Independent audit assurance, immutable financial ledger validation, cryptographic evidence locker, and review sign-offs.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowExportModal(true)}
          >
            <Icon name="document" size={15} />
            Export Audit Papers
          </button>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => {
              showToast({
                title: "Opinion Letter Drafted",
                message: "Independent Auditor's Unqualified (Clean) Opinion letter prepared for engagement.",
                tone: "success",
              })
            }}
          >
            <Icon name="check" size={15} />
            Draft Opinion Letter
          </button>
        </div>
      </div>

      {/* 1. AUDIT ENGAGEMENTS */}
      {navId === "audit_engagements" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Active Engagements"
              value="18 Engagements"
              detail="12 SOC 2 / 6 Statutory"
              icon="briefcase"
              tone="navy"
            />
            <MetricCard
              label="Compliance Test Pass Rate"
              value="98.8% Verified"
              detail="Control Matrix Validated"
              icon="check"
              tone="emerald"
            />
            <MetricCard
              label="Evidence Awaiting Seal"
              value="14 Items Pending"
              detail="Cryptographic Hash Verification"
              icon="document"
              tone="gold"
            />
            <MetricCard
              label="Critical Exceptions"
              value="0 Critical Findings"
              detail="Clean Assurance Trajectory"
              icon="shield"
              tone="blue"
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
                  Active Audit & Assurance Engagements
                </h3>
                <span className="card-sub">
                  Statutory financial statement audits, SOC 2 Type II trust criteria, and regulatory reviews.
                </span>
              </div>
            </div>

            <DataTable
              title="Engagements"
              data={engagements}
              columns={[
                {
                  key: "clientEntity",
                  header: "Client Entity & Engagement",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.clientEntity}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        Code: {row.engagementCode} · Lead: {row.leadPartner}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "auditType",
                  header: "Audit Methodology",
                  render: (row) => <span className="badge badge--navy">{row.auditType}</span>,
                },
                {
                  key: "fieldworkPeriod",
                  header: "Fieldwork Scope",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.fieldworkPeriod}</span>,
                },
                {
                  key: "progressPct",
                  header: "Completion Velocity",
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
                  header: "Audit Milestone",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 2. FINANCIAL RECORDS */}
      {navId === "fin_records" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Audited General Ledgers"
              value="420 Ledgers"
              detail="Multi-Entity Accounts Reconciled"
              icon="bank"
              tone="navy"
            />
            <MetricCard
              label="Cryptographic Hash Trail"
              value="100% Immutable"
              detail="Zero Bit Rot or Ledger Drift"
              icon="activity"
              tone="emerald"
            />
            <MetricCard
              label="Independent Confirmations"
              value="48 Confirmations"
              detail="Direct Custodian API Verifications"
              icon="check"
              tone="blue"
            />
            <MetricCard
              label="Enclave Protection"
              value="Strict Read-Only"
              detail="Mutating database calls blocked"
              icon="lock"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Immutable Financial Ledger Records Repository
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Cryptographically verified trial balances and direct custodian confirmations.
            </p>

            <DataTable
              title="Ledgers"
              data={records}
              columns={[
                {
                  key: "recordCode",
                  header: "Record & Entity",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.recordCode}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.entity}</span>
                    </div>
                  ),
                },
                {
                  key: "period",
                  header: "Audit Period & Ledger",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.period}</span>,
                },
                {
                  key: "balanceAmount",
                  header: "Reconciled Balance",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.balanceAmount}</strong>,
                },
                {
                  key: "sha256Hash",
                  header: "SHA-256 Tamper-Evident Hash",
                  render: (row) => (
                    <div>
                      <code style={{ fontSize: "10.5px", color: "var(--muted)" }}>
                        {row.sha256Hash.slice(0, 16)}...{row.sha256Hash.slice(-8)}
                      </code>
                      <span className="badge badge--success" style={{ display: "block", marginTop: "2px" }}>
                        {row.hashStatus}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "custodianConfirmation",
                  header: "Direct Custodian Source",
                  render: (row) => <span className="badge badge--navy">{row.custodianConfirmation}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 3. EVIDENCE REPOSITORY */}
      {navId === "evidence_repo" && (
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
                  Digital Audit Evidence Repository & Locker
                </h3>
                <span className="card-sub">
                  Cryptographically sealed bank confirmations, board resolutions, and transactional evidence.
                </span>
              </div>
            </div>

            <DataTable
              title="Evidence"
              data={evidenceList}
              columns={[
                {
                  key: "title",
                  header: "Evidence Description & Entity",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {row.entity} · Submitted {row.submittedDate}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "category",
                  header: "Classification",
                  render: (row) => <span className="badge badge--navy">{row.category}</span>,
                },
                {
                  key: "hashStatus",
                  header: "Cryptographic Seal",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.hashStatus === "SHA-256 Validated" ? "badge--success" : "badge--warning"
                      }`}
                    >
                      {row.hashStatus}
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Verification & Action",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        className={`badge ${
                          row.status === "Partner Verified" ? "badge--success" : "badge--warning"
                        }`}
                      >
                        {row.status}
                      </span>
                      {row.status !== "Partner Verified" && (
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: "11px", padding: "4px 8px" }}
                          onClick={() => handleOpenVerifyModal(row)}
                        >
                          Verify Evidence
                        </button>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 4. REVIEW QUEUE */}
      {navId === "review_queue" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Workpaper Review Queue Awaiting Lead Partner Sign-Off
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Audit workpapers prepared by audit staff ready for managerial and partner review.
            </p>

            <DataTable
              title="Review Queue"
              data={reviewQueue}
              columns={[
                {
                  key: "workpaper",
                  header: "Workpaper & Scope",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.workpaper}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Entity: {row.entity}</span>
                    </div>
                  ),
                },
                {
                  key: "preparedBy",
                  header: "Prepared By",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.preparedBy}</span>,
                },
                {
                  key: "dueDate",
                  header: "Review Timeline",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--muted)" }}>{row.dueDate}</span>,
                },
                {
                  key: "status",
                  header: "Sign-Off Status",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        className={`badge ${
                          row.status === "Signed Off & Attested" ? "badge--success" : "badge--warning"
                        }`}
                      >
                        {row.status}
                      </span>
                      {row.status !== "Signed Off & Attested" && (
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: "11px", padding: "4px 8px" }}
                          onClick={() => handleSignOffWorkpaper(row.id)}
                        >
                          Partner Sign-Off
                        </button>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 5. FINDINGS */}
      {navId === "findings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Control Exceptions"
              value="3 Findings Logged"
              detail="2 Low Risk · 1 Medium Risk"
              icon="alert"
              tone="gold"
            />
            <MetricCard
              label="Critical / High Severity"
              value="0 Critical"
              detail="Zero Material Weaknesses"
              icon="shield"
              tone="emerald"
            />
            <MetricCard
              label="Remediation Rate"
              value="100% In Remediation"
              detail="Management Corrective Actions"
              icon="check"
              tone="blue"
            />
            <MetricCard
              label="PCAOB Compliance"
              value="AS 2201 Aligned"
              detail="Internal Controls Standards"
              icon="document"
              tone="navy"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Control Exceptions & Audit Findings Register
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Formal deficiency logs, root-cause classifications, and management remediation schedules.
            </p>

            <DataTable
              title="Findings"
              data={findings}
              columns={[
                {
                  key: "title",
                  header: "Finding & Engagement",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>
                        {row.findingCode}: {row.title}
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        Engagement: {row.engagement} · Type: {row.deficiencyType}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "severity",
                  header: "Severity Classification",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.severity === "Low Risk"
                          ? "badge--gold"
                          : row.severity === "Medium Risk"
                          ? "badge--warning"
                          : "badge--danger"
                      }`}
                    >
                      {row.severity}
                    </span>
                  ),
                },
                {
                  key: "remediationStatus",
                  header: "Remediation Status",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.remediationStatus === "Resolved & Retested" ? "badge--success" : "badge--info"
                      }`}
                    >
                      {row.remediationStatus}
                    </span>
                  ),
                },
                {
                  key: "targetDate",
                  header: "Resolution Target",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--muted)" }}>{row.targetDate}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 6. COMPLIANCE CHECKS */}
      {navId === "compliance_checks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Automated Regulatory Control Test Matrix
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Continuous testing of SOC 2 Trust Services Criteria, PCAOB requirements, and SOX 404 controls.
            </p>

            <DataTable
              title="Controls"
              data={[
                {
                  id: "cc-1",
                  controlRef: "CC6.1: Logical Access Controls",
                  framework: "SOC 2 Trust Services Criteria",
                  testSample: "100% of Production IAM Changes",
                  result: "Passing (0 Exceptions)",
                  status: "Effective",
                },
                {
                  id: "cc-2",
                  controlRef: "CC6.6: Boundary Defense & WAF Rules",
                  framework: "SOC 2 & ISO 27001",
                  testSample: "Automated Continuous Telemetry",
                  result: "Passing (0 Breaches)",
                  status: "Effective",
                },
                {
                  id: "cc-3",
                  controlRef: "FIN-3.2: Dual-Authorization on Disbursements",
                  framework: "SOX 404 & Fiduciary Act",
                  testSample: "Random Sample of 60 Wires > $250k",
                  result: "Passing (100% Dual-Signed)",
                  status: "Effective",
                },
              ]}
              columns={[
                {
                  key: "controlRef",
                  header: "Control Reference & Framework",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.controlRef}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.framework}</span>
                    </div>
                  ),
                },
                {
                  key: "testSample",
                  header: "Audit Population Sample",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.testSample}</span>,
                },
                {
                  key: "result",
                  header: "Test Outcome",
                  render: (row) => <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>{row.result}</span>,
                },
                {
                  key: "status",
                  header: "Control Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 7. AUDIT TRAIL */}
      {navId === "audit_trail" && (
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
                  Tamper-Evident SHA-256 Audit Trail
                </h3>
                <span className="card-sub">
                  Immutable, append-only cryptographic event log of all system writes, role escalations, and disbursements.
                </span>
              </div>
              <button
                className="btn btn-outline"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => {
                  showToast({
                    title: "Cryptographic Chain Verified",
                    message: "All 18,490 chronological log blocks verified against master KMS root.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="shield" size={14} />
                Validate Blockchain Chain
              </button>
            </div>

            <DataTable
              title="Audit Logs"
              data={[
                {
                  id: "atl-1",
                  timestamp: "2026-06-10 14:22:18 UTC",
                  actor: "Arthur Pendelton (G1 Chair)",
                  action: "AUTHORIZED_CAPITAL_CALL",
                  target: "Sequoia Growth Fund VI ($450,000 USD)",
                  shaBlock: "f4a8b9c...2819",
                  status: "Tamper-Proof Block",
                },
                {
                  id: "atl-2",
                  timestamp: "2026-06-10 11:05:41 UTC",
                  actor: "Jean-Paul Laurent (Private Bank MD)",
                  action: "LOMBARD_LINE_DRAWDOWN",
                  target: "Vance Dynasty Custody Account ($2.45M USD)",
                  shaBlock: "81e92d1...9041",
                  status: "Tamper-Proof Block",
                },
                {
                  id: "atl-3",
                  timestamp: "2026-06-09 18:41:09 UTC",
                  actor: "Security Operations Admin",
                  action: "ROTATE_KMS_MASTER_KEYS",
                  target: "Tenant Database Partition #12",
                  shaBlock: "0c71a39...4412",
                  status: "Tamper-Proof Block",
                },
              ]}
              columns={[
                {
                  key: "timestamp",
                  header: "Timestamp (UTC)",
                  render: (row) => <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>{row.timestamp}</span>,
                },
                {
                  key: "actor",
                  header: "System Actor",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.actor}</strong>,
                },
                {
                  key: "action",
                  header: "Action Signature",
                  render: (row) => <span className="badge badge--navy">{row.action}</span>,
                },
                {
                  key: "target",
                  header: "Target Resource",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.target}</span>,
                },
                {
                  key: "status",
                  header: "Ledger State",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 8. REPORTS */}
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
                  Formal Audit Reports & Management Letters
                </h3>
                <span className="card-sub">
                  Independent Auditor's Report, SOC 2 Type II System Descriptions, and internal control summaries.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={14} />
                Export Formal Audit Report
              </button>
            </div>

            <DataTable
              title="Reports"
              data={[
                {
                  id: "ar-1",
                  title: "Independent Auditor's Report (Clean / Unqualified Opinion)",
                  period: "Fiscal Year 2025/2026",
                  entityCovered: "WealthSphere Multi-Tenant Platform & Fiduciary Accounts",
                  status: "Partner Certified",
                },
                {
                  id: "ar-2",
                  title: "Management Letter on Internal Control Deficiencies",
                  period: "Annual Review 2026",
                  entityCovered: "Audit Committee & Board of Trustees",
                  status: "Delivered to Committee",
                },
                {
                  id: "ar-3",
                  title: "SOC 2 Type II Security, Availability & Confidentiality Report",
                  period: "Continuous 12-Month Period",
                  entityCovered: "Cloud Enclaves & Encryption Architectures",
                  status: "Unqualified Opinion",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Report Title & Scope",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.entityCovered}</span>
                    </div>
                  ),
                },
                {
                  key: "period",
                  header: "Audit Period",
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

      {/* 9. SETTINGS */}
      {navId === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Audit Methodology Standards
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Select professional standards governing audit sampling and assurance thresholds.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Auditing Standards Framework
                  </label>
                  <select className="select" defaultValue="pcaob" style={{ width: "100%" }}>
                    <option value="aicpa">AICPA Statements on Auditing Standards (SAS)</option>
                    <option value="pcaob">PCAOB Auditing Standards (AS 2201 / SOX 404) (Current)</option>
                    <option value="iaasb">IAASB International Standards on Auditing (ISA)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Workpaper Statutory Retention Period
                  </label>
                  <select className="select" defaultValue="7" style={{ width: "100%" }}>
                    <option value="5">5 Years (Standard)</option>
                    <option value="7">7 Years (Sarbanes-Oxley Statutory) (Current)</option>
                    <option value="10">10 Years (Permanent Legal Hold)</option>
                  </select>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ marginTop: "8px", fontSize: "12px" }}
                  onClick={() => {
                    showToast({
                      title: "Settings Saved",
                      message: "Audit methodology standards and retention policies updated.",
                      tone: "success",
                    })
                  }}
                >
                  Save Methodology Settings
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Read-Only Enclave Policy
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Guaranteed read-only workspace preventing tampering or inadvertent updates.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Zero-Mutation Database Enforcement
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      All write, update, and delete actions blocked at API gateway
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Hardware Security Key Signatures
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      FIDO2 cryptographically bound partner attestations
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Verification Modal */}
      <EvidenceVerifyModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        evidenceTitle={selectedEvidence.title}
        entity={selectedEvidence.entity}
        evidenceId={selectedEvidence.id}
        onVerified={() => {
          setEvidenceList((prev) =>
            prev.map((e) =>
              e.id === selectedEvidence.id
                ? {
                    ...e,
                    status: "Partner Verified",
                    hashStatus: "SHA-256 Validated",
                  }
                : e,
            ),
          )
        }}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Independent Audit Working Papers"
        defaultFilename="Independent_Audit_Working_Papers"
        headers={[
          "Engagement Code",
          "Client Entity",
          "Audit Type",
          "Lead Partner",
          "Fieldwork Scope",
          "Progress",
          "Status",
        ]}
        data={engagements.map((e) => [
          e.engagementCode,
          e.clientEntity,
          e.auditType,
          e.leadPartner,
          e.fieldworkPeriod,
          `${e.progressPct}%`,
          e.status,
        ])}
      />
    </div>
  )
}
