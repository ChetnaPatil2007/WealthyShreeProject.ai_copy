import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal, EvidenceVerifyModal } from "../../components/modals"

export interface CADashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function CADashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: CADashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"calendar" | "documents">(
    "calendar",
  )
  const [entityFilter, setEntityFilter] =
    useState<"all" | "corporate" | "llp" | "filings" | "review">("all")
  const [showExportModal, setShowExportModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [selectedEntityForVerify, setSelectedEntityForVerify] = useState(
    "Vance Global Holdings Ltd",
  )

  // Compliance Deadlines mock data
  const complianceDeadlines = [
    {
      id: "cd1",
      title: "Advance Tax Q1 Installment",
      type: "Income Tax / Direct Tax",
      deadline: "June 15 (5 days left)",
      entitiesAffected: "18 Corporate & HNW Entities",
      priority: "Critical",
      tone: "critical",
    },
    {
      id: "cd2",
      title: "GST GSTR-3B Monthly Return",
      type: "Indirect Tax / GST",
      deadline: "June 20 (10 days left)",
      entitiesAffected: "34 Registered GST Units",
      priority: "Urgent",
      tone: "urgent",
    },
    {
      id: "cd3",
      title: "TDS Quarterly Return Form 26Q",
      type: "Withholding Tax",
      deadline: "June 30 (20 days left)",
      entitiesAffected: "28 Withholding Entities",
      priority: "Normal",
      tone: "normal",
    },
    {
      id: "cd4",
      title: "Tax Audit Report Form 3CD Sign-Off",
      type: "Statutory Tax Audit",
      deadline: "Sept 30 (Scheduled)",
      entitiesAffected: "14 Mandated Audits",
      priority: "Normal",
      tone: "normal",
    },
  ]

  // Document Requests mock data
  const documentRequests = [
    {
      id: "dr1",
      client: "Apex Global Technologies Pvt Ltd",
      document: "Q4 Final Bank Statements & FIRC Certificates",
      requestedOn: "May 28",
      deadline: "June 12",
      status: "Pending Client",
      statusTone: "warning",
    },
    {
      id: "dr2",
      client: "Meridian Logistics LLP",
      document: "Form 26AS & AIS Reconciliation Report",
      requestedOn: "June 01",
      deadline: "June 14",
      status: "Received - Reviewing",
      statusTone: "info",
    },
    {
      id: "dr3",
      client: "Kalyan Textiles & Apparel",
      document: "Fixed Asset & Depreciation Schedule FY25",
      requestedOn: "May 20",
      deadline: "June 08",
      status: "Pending Client",
      statusTone: "danger",
    },
    {
      id: "dr4",
      client: "Horizon Real Estate Trust",
      document: "Related Party Transactions & Board Approvals",
      requestedOn: "June 03",
      deadline: "June 18",
      status: "Verified",
      statusTone: "success",
    },
  ]

  // Client Accounts mock data
  const clientAccounts = [
    {
      id: "ca1",
      entityName: "Apex Global Technologies Pvt Ltd",
      constitution: "Private Limited",
      pan: "AABCA1234F",
      finStatements: "Signed Off (FY25)",
      pendingFilings: "Advance Tax Q1",
      reconciliationMatch: "99.4%",
      leadAuditor: "Priya Sharma, FCA",
      status: "Current",
      statusTone: "success",
    },
    {
      id: "ca2",
      entityName: "Meridian Logistics LLP",
      constitution: "LLP",
      pan: "AAFFM9876K",
      finStatements: "In Partner Review",
      pendingFilings: "GSTR-3B & TDS",
      reconciliationMatch: "94.2%",
      leadAuditor: "Rohan V., ACA",
      status: "In Review",
      statusTone: "warning",
    },
    {
      id: "ca3",
      entityName: "Kalyan Textiles & Apparel",
      constitution: "Partnership Firm",
      pan: "AABFK4567M",
      finStatements: "Awaiting Ledger Close",
      pendingFilings: "Advance Tax Q1",
      reconciliationMatch: "88.6%",
      leadAuditor: "Priya Sharma, FCA",
      status: "Docs Pending",
      statusTone: "danger",
    },
    {
      id: "ca4",
      entityName: "Horizon Real Estate Trust",
      constitution: "Private Trust",
      pan: "AAATH8901L",
      finStatements: "Signed Off (FY25)",
      pendingFilings: "None (All Clear)",
      reconciliationMatch: "100%",
      leadAuditor: "Ananya S., ACA",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "ca5",
      entityName: "Zenith Pharma Labs Ltd",
      constitution: "Public Limited",
      pan: "AABCZ3456P",
      finStatements: "In Partner Review",
      pendingFilings: "Advance Tax Q1",
      reconciliationMatch: "97.8%",
      leadAuditor: "Priya Sharma, FCA",
      status: "In Review",
      statusTone: "warning",
    },
    {
      id: "ca6",
      entityName: "BluePeak Digital Ventures LLP",
      constitution: "LLP",
      pan: "AAFFB7890N",
      finStatements: "Signed Off (FY25)",
      pendingFilings: "GST Annual Filing",
      reconciliationMatch: "99.1%",
      leadAuditor: "Rohan V., ACA",
      status: "Current",
      statusTone: "success",
    },
  ]

  // Filter client accounts
  const filteredAccounts = useMemo(() => {
    if (entityFilter === "corporate")
      return clientAccounts.filter((a) => a.constitution.includes("Limited"))
    if (entityFilter === "llp")
      return clientAccounts.filter(
        (a) =>
          a.constitution.includes("LLP") ||
          a.constitution.includes("Partnership"),
      )
    if (entityFilter === "filings")
      return clientAccounts.filter(
        (a) => a.pendingFilings !== "None (All Clear)",
      )
    if (entityFilter === "review")
      return clientAccounts.filter(
        (a) => a.finStatements.includes("Review") || a.status === "In Review",
      )
    return clientAccounts
  }, [entityFilter])

  const accountColumns = [
    {
      key: "entityName",
      header: "Entity / Client Name",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>
            {row.entityName}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "10px" }}>
            {row.constitution} · PAN: {row.pan}
          </small>
        </div>
      ),
    },
    {
      key: "finStatements",
      header: "Financial Statements",
      render: (row: any) => (
        <span
          className={`badge badge--${
            row.finStatements.includes("Signed")
              ? "success"
              : row.finStatements.includes("Review")
                ? "warning"
                : "danger"
          }`}
        >
          {row.finStatements}
        </span>
      ),
    },
    {
      key: "pendingFilings",
      header: "Pending Tax Filings",
      render: (row: any) => (
        <b style={{ color: "var(--ink)", fontSize: "12px" }}>
          {row.pendingFilings}
        </b>
      ),
    },
    {
      key: "reconciliationMatch",
      header: "Reconciliation",
      render: (row: any) => (
        <span
          style={{
            fontWeight: 600,
            color:
              parseFloat(row.reconciliationMatch) > 95
                ? "var(--primary-dark)"
                : "#d97706",
          }}
        >
          {row.reconciliationMatch} Match
        </span>
      ),
    },
    {
      key: "leadAuditor",
      header: "Lead Partner",
    },
    {
      key: "status",
      header: "Audit Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard ca-dashboard">
      {/* 1. Partner Credentials & Statutory Cockpit Header */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--success">
              ICAI FELLOW & UDIN VERIFIED
            </span>
            <span>Managing 42 Client Entities · 14 Mandated Audits</span>
          </div>
          <h1 className="hero-title">Priya Sharma, FCA</h1>
          <p className="hero-subtitle">
            Chartered Accountant & Senior Partner · Sharma & Associates LLP.
            Statutory audits, multi-entity ledger reconciliations, balance sheet
            certification, and corporate tax compliance.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Tax Filings")}
          >
            <Icon name="tax" size={16} />
            <span>File Return</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => {
              setSelectedEntityForVerify("Vance Global Holdings Ltd")
              setShowVerifyModal(true)
            }}
          >
            <Icon name="sparkle" size={16} />
            <span>AI Reconcile</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Metric Cards */}
      <section className="metric-grid" aria-label="CA Practice Metrics">
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
          if (act.id === "new_audit") onNavigate("Clients")
          else if (act.id === "auto_reconcile") {
            setSelectedEntityForVerify("Vance Global Holdings Ltd")
            setShowVerifyModal(true)
          } else if (act.id === "export_3cd") setShowExportModal(true)
          else onOpenAI()
        }}
      />

      {/* 4. Reconciliation Engine & Financial Statements Card */}
      <section className="dashboard-grid">
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">AI Reconciliation Engine</span>
              <span className="card-sub">
                Automated bank, ledger, 26AS & GST reconciliation
              </span>
            </div>
            <span className="badge badge--success">98.2% Auto-Matched</span>
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
                Total Reconciled Transaction Volume
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                $18,420,000
              </strong>
            </div>

            <div className="cat-track" style={{ height: "8px" }}>
              <div className="cat-fill emerald" style={{ width: "98.2%" }} />
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
                  Matched Entries
                </span>
                <b style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
                  2,418
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
                  Mismatches Flagged
                </span>
                <b style={{ color: "#d97706", fontSize: "14px" }}>18</b>
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
                  Delta Value
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>$42,150</b>
              </div>
            </div>

            <button
              type="button"
              className="button button--secondary"
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => onNavigate("Reconciliation")}
            >
              <span>Resolve 18 Reconciliation Mismatches</span>
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>

        {/* Financial Statements Certification Progress */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">Financial Statements Status</span>
              <span className="card-sub">
                Statutory Balance Sheet & P&L sign-off progress
              </span>
            </div>
            <span className="badge badge--info">FY 2024-25</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>32 / 42</strong>
              <span>Entities Certified</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">76.2% COMPLETED</span>
            <span>7 in Partner Review · 3 Awaiting Closing</span>
          </div>

          <div className="score-bars">
            {[
              ["Corporate Balance Sheets (7 of 8)", "87.5%"],
              ["LLP Financial Statements (19 of 24)", "79.1%"],
              ["Trust Accounts & Statements (6 of 10)", "60.0%"],
              ["Tax Audit 3CD Working Papers (8 of 14)", "57.1%"],
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

      {/* 5. Statutory Compliance Calendar & Document Requests */}
      <section className="card education-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">
              Statutory Controls & Working Papers
            </span>
            <span className="card-sub">
              {activeTab === "calendar"
                ? "Statutory compliance deadlines and tax filing calendar"
                : "Client document requests, working paper receipts, and verification tracking"}
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
              <span>Compliance Deadlines (4)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "documents"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("documents")}
            >
              <Icon name="document" size={14} />
              <span>Document Requests (14)</span>
            </button>
          </div>
        </div>

        {activeTab === "calendar" ? (
          <div className="deadline-timeline">
            {complianceDeadlines.map((cd) => (
              <div key={cd.id} className={`deadline-card ${cd.tone}`}>
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
                    {cd.title}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    {cd.type} · Impacting {cd.entitiesAffected}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span
                    style={{
                      font: "600 11px 'Manrope'",
                      color: cd.tone === "critical" ? "#dc2626" : "var(--ink)",
                    }}
                  >
                    {cd.deadline}
                  </span>
                  <span
                    className={`badge badge--${
                      cd.tone === "critical"
                        ? "danger"
                        : cd.tone === "urgent"
                          ? "warning"
                          : "neutral"
                    }`}
                  >
                    {cd.priority}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => onNavigate("Tax Filings")}
                  >
                    View Queue
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="doc-request-list">
            {documentRequests.map((dr) => (
              <div key={dr.id} className="doc-request-item">
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
                    {dr.client}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Requested: {dr.document} · Deadline: {dr.deadline}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className={`badge badge--${dr.statusTone}`}>
                    {dr.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() =>
                      showToast({
                        title: "Document Reminder",
                        message: `Automated submission reminder dispatched to ${dr.client} for ${dr.document}.`,
                        tone: "info",
                      })
                    }
                  >
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Client Accounts & Statutory Filings Table */}
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
              Client Accounts & Statutory Engagements ({filteredAccounts.length}
              )
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Corporate ledgers, statutory audit sign-offs, reconciliation
              rates, and filing readiness
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "all" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setEntityFilter("all")}
            >
              All (42)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "corporate"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEntityFilter("corporate")}
            >
              Corporate (8)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "llp" ? "button--primary" : "button--secondary"
              }`}
              onClick={() => setEntityFilter("llp")}
            >
              LLP / Firms (24)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "filings"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEntityFilter("filings")}
            >
              Filings Due (9)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "review"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEntityFilter("review")}
            >
              In Review (7)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={accountColumns}
          data={filteredAccounts}
          searchPlaceholder="Search client entity, constitution, or PAN..."
          actionButton={{
            label: "Export Audit Ledger",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Statutory Audit & Legal Notice Disclaimer */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Statutory Compliance & Fiduciary Sign-Off Notice:</strong> All
          ledger reconciliations, financial statements, and tax audit forms
          (Form 3CD / GSTR-9C) processed via WealthSphere.ai are analytical
          decision-support assets. Statutory working paper sign-off requires
          validation via cryptographic Digital Signature Certificate (DSC) and
          Unique Document Identification Number (UDIN).
        </div>
      </section>

      {/* Interactive Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export CA Practice Statutory Audit & Compliance Ledger"
        defaultFilename="wealthsphere_ca_audit_ledger"
        headers={[
          "Entity Name",
          "Constitution",
          "PAN",
          "Financial Statements",
          "Pending Filings",
          "Reconciliation Match",
          "Lead Auditor",
          "Status",
        ]}
        data={filteredAccounts.map((a) => [
          a.entityName,
          a.constitution,
          a.pan,
          a.finStatements,
          a.pendingFilings,
          a.reconciliationMatch,
          a.leadAuditor,
          a.status,
        ])}
      />

      <EvidenceVerifyModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        entity={selectedEntityForVerify}
        evidenceTitle="Form 3CD Statutory Ledger & GST Input Tax Credit Cross-Verification"
        evidenceId="CA-REV-2025-09"
        onVerified={() => {
          showToast({
            title: "Reconciliation Verified",
            message: `Cryptographic audit seal registered with UDIN for ${selectedEntityForVerify}.`,
            tone: "success",
          })
        }}
      />
    </div>
  )
}
export default CADashboard
