import React, { useState } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal, EvidenceVerifyModal } from "../../components/modals"

export interface CAPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface CAClientEntity {
  id: string
  entityName: string
  type: "Private Limited" | "LLP" | "Public Trust" | "Proprietorship"
  gstin: string
  pan: string
  turnover: string
  auditStatus: "In Progress" | "Completed" | "Pending Evidence" | "Signed Off"
  assignedSenior: string
}

interface FinancialRecordItem {
  id: string
  entity: string
  accountName: string
  ledgerBalance: number
  supportingStatus: "Attached (Verified)" | "Missing Vouchers" | "Discrepancy Flagged"
  reconciled: boolean
  lastAuditDate: string
}

interface TaxFilingWorkflowItem {
  id: string
  entity: string
  returnType: string
  taxYear: string
  dueDate: string
  preparationStatus: "Drafting" | "Senior Review" | "Partner Sign-off" | "Ready to File (Simulated)"
  estimatedTaxLiability: number
  tdsCredit: number
}

interface ReconciliationItem {
  id: string
  entity: string
  reconciliationType: "26AS vs Books (TDS)" | "GSTR-2B vs Purchase Register" | "Bank Ledger vs Statement"
  bookAmount: number
  portalAmount: number
  variance: number
  status: "Matched" | "Variance Flagged" | "Under Review"
}

export function CAModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: CAPageProps) {
  const { showToast } = useToast()

  // Modals state
  const [showExportModal, setShowExportModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [selectedVerifyEvidence, setSelectedVerifyEvidence] = useState<{
    title: string
    entity: string
  }>({
    title: "Statutory Bank Confirmation & Cash Ledger Sample",
    entity: "Vance Global Holdings Ltd",
  })

  // CA Entities state
  const [entities, setEntities] = useState<CAClientEntity[]>([
    {
      id: "ent1",
      entityName: "Vance Global Holdings Ltd",
      type: "Private Limited",
      gstin: "27AABCV8912P1Z4",
      pan: "AABCV8912P",
      turnover: "$142.5M",
      auditStatus: "In Progress",
      assignedSenior: "Amina Al-Mansoor, ACA",
    },
    {
      id: "ent2",
      entityName: "Pendelton Healthcare Diagnostics LLP",
      type: "LLP",
      gstin: "27AABCP4410M1Z2",
      pan: "AABCP4410M",
      turnover: "$28.4M",
      auditStatus: "Completed",
      assignedSenior: "Rohan Varma, FCA",
    },
    {
      id: "ent3",
      entityName: "Apex Innovation Technologies Pvt Ltd",
      type: "Private Limited",
      gstin: "29AABCA1290K1Z9",
      pan: "AABCA1290K",
      turnover: "$64.2M",
      auditStatus: "Pending Evidence",
      assignedSenior: "Priya Sharma, FCA",
    },
    {
      id: "ent4",
      entityName: "Sterling Heritage Foundation Trust",
      type: "Public Trust",
      gstin: "27AAATS9081F1Z8",
      pan: "AAATS9081F",
      turnover: "$12.0M",
      auditStatus: "Signed Off",
      assignedSenior: "Priya Sharma, FCA",
    },
  ])

  // Financial records state
  const [records, setRecords] = useState<FinancialRecordItem[]>([
    {
      id: "rec1",
      entity: "Vance Global Holdings Ltd",
      accountName: "HDFC Statutory Working Capital Escrow",
      ledgerBalance: 14250000,
      supportingStatus: "Attached (Verified)",
      reconciled: true,
      lastAuditDate: "May 12, 2025",
    },
    {
      id: "rec2",
      entity: "Vance Global Holdings Ltd",
      accountName: "Plant & Heavy Machinery Depreciation Schedule",
      ledgerBalance: 8640000,
      supportingStatus: "Missing Vouchers",
      reconciled: false,
      lastAuditDate: "May 08, 2025",
    },
    {
      id: "rec3",
      entity: "Pendelton Healthcare Diagnostics LLP",
      accountName: "Laboratory Consumables & Vendor Payables",
      ledgerBalance: 2450000,
      supportingStatus: "Attached (Verified)",
      reconciled: true,
      lastAuditDate: "May 14, 2025",
    },
    {
      id: "rec4",
      entity: "Apex Innovation Technologies Pvt Ltd",
      accountName: "Software R&D Capitalized Assets",
      ledgerBalance: 12800000,
      supportingStatus: "Discrepancy Flagged",
      reconciled: false,
      lastAuditDate: "May 04, 2025",
    },
  ])

  // Tax filings workflow state
  const [filings, setFilings] = useState<TaxFilingWorkflowItem[]>([
    {
      id: "tf1",
      entity: "Vance Global Holdings Ltd",
      returnType: "Corporate Tax Return (Form ITR-6)",
      taxYear: "AY 2025-26",
      dueDate: "Oct 31, 2025",
      preparationStatus: "Senior Review",
      estimatedTaxLiability: 3420000,
      tdsCredit: 2850000,
    },
    {
      id: "tf2",
      entity: "Vance Global Holdings Ltd",
      returnType: "Tax Audit Report (Form 3CA / 3CD)",
      taxYear: "AY 2025-26",
      dueDate: "Sep 30, 2025",
      preparationStatus: "Drafting",
      estimatedTaxLiability: 0,
      tdsCredit: 0,
    },
    {
      id: "tf3",
      entity: "Pendelton Healthcare Diagnostics LLP",
      returnType: "Partnership Tax Return (Form ITR-5)",
      taxYear: "AY 2025-26",
      dueDate: "Oct 31, 2025",
      preparationStatus: "Ready to File (Simulated)",
      estimatedTaxLiability: 780000,
      tdsCredit: 640000,
    },
    {
      id: "tf4",
      entity: "Sterling Heritage Foundation Trust",
      returnType: "Charitable Trust Return (Form ITR-7)",
      taxYear: "AY 2025-26",
      dueDate: "Oct 31, 2025",
      preparationStatus: "Partner Sign-off",
      estimatedTaxLiability: 120000,
      tdsCredit: 120000,
    },
  ])

  // Reconciliation state
  const [reconciliations, setReconciliations] = useState<ReconciliationItem[]>([
    {
      id: "rc1",
      entity: "Vance Global Holdings Ltd",
      reconciliationType: "26AS vs Books (TDS)",
      bookAmount: 2850000,
      portalAmount: 2850000,
      variance: 0,
      status: "Matched",
    },
    {
      id: "rc2",
      entity: "Vance Global Holdings Ltd",
      reconciliationType: "GSTR-2B vs Purchase Register",
      bookAmount: 1845000,
      portalAmount: 1720000,
      variance: -125000,
      status: "Variance Flagged",
    },
    {
      id: "rc3",
      entity: "Apex Innovation Technologies Pvt Ltd",
      reconciliationType: "Bank Ledger vs Statement",
      bookAmount: 9450000,
      portalAmount: 9432000,
      variance: -18000,
      status: "Under Review",
    },
    {
      id: "rc4",
      entity: "Pendelton Healthcare Diagnostics LLP",
      reconciliationType: "26AS vs Books (TDS)",
      bookAmount: 640000,
      portalAmount: 640000,
      variance: 0,
      status: "Matched",
    },
  ])

  // =========================================================================
  // PAGE 1: CLIENTS
  // =========================================================================
  if (navId === "clients" || navName === "Clients") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · AUDIT ROSTER</span>
            <div className="page-title">Corporate & LLP Audit Entities</div>
            <div className="page-subtitle">
              Statutory audit mandates, corporate tax compliance tracking, GSTIN master directory, and audit senior assignments.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Entity Onboarded (Simulated)",
                    message: "Created client audit profile and initialized statutory working papers.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Onboard Audit Entity</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Client Master</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Practice Mandates</span>
            <div className="value">42 Entities</div>
            <div className="delta positive">
              <Icon name="bank" size={14} />
              <span>32 Pvt Ltd, 8 LLPs, 2 Trusts</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Statutory Audit Book"
            value="42 Mandates"
            detail="100% peer review compliant"
            trend="up"
            icon="bank"
            tone="blue"
          />
          <MetricCard
            label="Audits Signed Off"
            value="18 Entities"
            detail="Clean audit opinions issued"
            trend="up"
            icon="check"
            tone="emerald"
          />
          <MetricCard
            label="In Progress / Fieldwork"
            value="16 Audits"
            detail="Working papers under review"
            trend="neutral"
            icon="activity"
            tone="gold"
          />
          <MetricCard
            label="Pending Vouchers"
            value="8 Entities"
            detail="Documentation requests dispatched"
            trend="neutral"
            icon="alert"
            tone="navy"
          />
        </section>

        <DataTable<CAClientEntity>
          title="Master Audit Client Roster"
          subtitle="Statutory compliance entities under Sharma & Associates LLP"
          columns={[
            {
              key: "entityName",
              header: "Entity Name",
              render: (r) => (
                <div>
                  <strong>{r.entityName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    PAN: <code>{r.pan}</code> · GSTIN: <code>{r.gstin}</code>
                  </div>
                </div>
              ),
            },
            {
              key: "type",
              header: "Constitution",
              render: (r) => <span className="badge badge--neutral">{r.type}</span>,
            },
            {
              key: "turnover",
              header: "Turnover (FY 24-25)",
              render: (r) => <strong>{r.turnover}</strong>,
            },
            {
              key: "auditStatus",
              header: "Audit Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.auditStatus === "Completed" || r.auditStatus === "Signed Off"
                      ? "badge--success"
                      : r.auditStatus === "In Progress"
                      ? "badge--warning"
                      : "badge--danger"
                  }`}
                >
                  {r.auditStatus}
                </span>
              ),
            },
            {
              key: "assignedSenior",
              header: "Audit In-Charge",
              render: (r) => r.assignedSenior,
            },
            {
              key: "actions",
              header: "Audit Action",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() => {
                    setSelectedVerifyEvidence({
                      title: `Statutory Ledger Sample for ${r.entityName}`,
                      entity: r.entityName,
                    })
                    setShowVerifyModal(true)
                  }}
                >
                  Verify Audit
                </button>
              ),
            },
          ]}
          data={entities}
        />

        {showVerifyModal && (
          <EvidenceVerifyModal
            isOpen={showVerifyModal}
            onClose={() => setShowVerifyModal(false)}
            evidenceTitle={selectedVerifyEvidence.title}
            entity={selectedVerifyEvidence.entity}
            onVerified={() => {
              setShowVerifyModal(false)
              showToast({
                title: "Evidence Verified (Simulated)",
                message: `Recorded CA partner sign-off for ${selectedVerifyEvidence.entity}.`,
                tone: "success",
              })
            }}
          />
        )}

        {showExportModal && (
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            headers={["Entity Name", "Type", "PAN", "GSTIN", "Turnover", "Status"]}
            data={entities.map((e) => [e.entityName, e.type, e.pan, e.gstin, e.turnover, e.auditStatus])}
            defaultFilename="ca-client-entities"
            title="Export CA Entity Master"
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 2: FINANCIAL RECORDS
  // =========================================================================
  if (navId === "fin_records" || navName === "Financial Records") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · GENERAL LEDGER</span>
            <div className="page-title">Financial Records & Ledger Vouchers</div>
            <div className="page-subtitle">
              Audit trial balances, verify supporting vouchers, review capitalized asset registers, and test internal controls.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Ledger Synchronized (Simulated)",
                    message: "Refreshed ERP feeds across 42 corporate general ledgers.",
                    tone: "success",
                  })
                }
              >
                <Icon name="activity" size={16} />
                <span>Sync General Ledgers</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Ledger Vouchers Audited</span>
            <div className="value">14,280 Vouchers</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>96.4% documented with invoices</span>
            </div>
          </div>
        </section>

        <DataTable<FinancialRecordItem>
          title="General Ledger Sample Accounts & Voucher Audit"
          subtitle="Substantive testing of material accounts for statutory compliance"
          columns={[
            {
              key: "accountName",
              header: "Account / Ledger Head",
              render: (r) => (
                <div>
                  <strong>{r.accountName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.entity}
                  </div>
                </div>
              ),
            },
            {
              key: "ledgerBalance",
              header: "Ledger Balance",
              render: (r) => (
                <strong>${r.ledgerBalance.toLocaleString()}</strong>
              ),
            },
            {
              key: "supportingStatus",
              header: "Supporting Evidence",
              render: (r) => (
                <span
                  className={`badge ${
                    r.supportingStatus.includes("Verified")
                      ? "badge--success"
                      : r.supportingStatus.includes("Missing")
                      ? "badge--warning"
                      : "badge--danger"
                  }`}
                >
                  {r.supportingStatus}
                </span>
              ),
            },
            {
              key: "reconciled",
              header: "Reconciled",
              render: (r) => (
                <span className={`badge ${r.reconciled ? "badge--success" : "badge--neutral"}`}>
                  {r.reconciled ? "Reconciled ✓" : "Pending Reconciliation"}
                </span>
              ),
            },
            {
              key: "lastAuditDate",
              header: "Last Tested",
              render: (r) => r.lastAuditDate,
            },
          ]}
          data={records}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 3: TAX FILINGS
  // =========================================================================
  if (navId === "tax_filings" || navName === "Tax Filings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · TAX PREPARATION</span>
            <div className="page-title">Corporate Tax Filings & Audit Reports</div>
            <div className="page-subtitle">
              Prepare and review Form ITR-6, Form ITR-5, Form 3CD Tax Audits, and Transfer Pricing disclosures.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Filing Workflow (Simulated)",
                    message: "Advanced selected return to Partner Sign-off queue.",
                    tone: "info",
                  })
                }
              >
                <Icon name="tax" size={16} />
                <span>Advance Filing Workflow</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Tax Filing Progress</span>
            <div className="value">AY 2025-26</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>34 of 42 entities in review</span>
            </div>
          </div>
        </section>

        <DataTable<TaxFilingWorkflowItem>
          title="Statutory Tax Return Preparation Schedule"
          subtitle="Corporate income tax and statutory compliance pipeline"
          columns={[
            {
              key: "entity",
              header: "Client Entity",
              render: (r) => (
                <div>
                  <strong>{r.entity}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.returnType} · {r.taxYear}
                  </div>
                </div>
              ),
            },
            {
              key: "dueDate",
              header: "Statutory Due Date",
              render: (r) => (
                <span style={{ fontWeight: 600 }}>{r.dueDate}</span>
              ),
            },
            {
              key: "preparationStatus",
              header: "Preparation Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.preparationStatus.includes("Ready") || r.preparationStatus.includes("Sign-off")
                      ? "badge--success"
                      : "badge--warning"
                  }`}
                >
                  {r.preparationStatus}
                </span>
              ),
            },
            {
              key: "estimatedTaxLiability",
              header: "Estimated Tax (Simulated)",
              render: (r) =>
                r.estimatedTaxLiability > 0 ? `$${r.estimatedTaxLiability.toLocaleString()}` : "N/A",
            },
            {
              key: "tdsCredit",
              header: "TDS Credit Claimed",
              render: (r) =>
                r.tdsCredit > 0 ? `$${r.tdsCredit.toLocaleString()}` : "N/A",
            },
            {
              key: "action",
              header: "Filing Action",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Simulated Filing Test",
                      message: `Simulated validation check for ${r.returnType} - Zero schema errors detected.`,
                      tone: "success",
                    })
                  }
                >
                  Validate XML
                </button>
              ),
            },
          ]}
          data={filings}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 4: RECONCILIATION
  // =========================================================================
  if (navId === "reconciliation" || navName === "Reconciliation") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · CONTROLS & AUDIT</span>
            <div className="page-title">Statutory Reconciliation & Variance Audit</div>
            <div className="page-subtitle">
              Automated reconciliation of Form 26AS vs books, GSTR-2B input tax credits, and bank balances.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Reconciliation Run (Simulated)",
                    message: "Completed 26AS matching across all 42 entities. 1 ITC variance flagged.",
                    tone: "success",
                  })
                }
              >
                <Icon name="sparkle" size={16} />
                <span>Run Reconciliation Matcher</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Withholding Tax Match</span>
            <div className="value">99.2% Matched</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Zero un-reconciled TDS entries</span>
            </div>
          </div>
        </section>

        <DataTable<ReconciliationItem>
          title="Reconciliation Differences & Verification Ledger"
          subtitle="Government portal tax records compared against client general ledgers"
          columns={[
            {
              key: "entity",
              header: "Entity Name",
              render: (r) => <strong>{r.entity}</strong>,
            },
            {
              key: "reconciliationType",
              header: "Reconciliation Type",
              render: (r) => <span className="badge badge--neutral">{r.reconciliationType}</span>,
            },
            {
              key: "bookAmount",
              header: "Per Books ($)",
              render: (r) => `$${r.bookAmount.toLocaleString()}`,
            },
            {
              key: "portalAmount",
              header: "Per Portal / Bank ($)",
              render: (r) => `$${r.portalAmount.toLocaleString()}`,
            },
            {
              key: "variance",
              header: "Variance ($)",
              render: (r) => (
                <span style={{ color: r.variance !== 0 ? "var(--color-danger, #ef4444)" : "var(--color-success, #10b981)", fontWeight: 600 }}>
                  {r.variance === 0 ? "$0 (Exact Match)" : `$${r.variance.toLocaleString()}`}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <span className={`badge ${r.status === "Matched" ? "badge--success" : "badge--warning"}`}>
                  {r.status}
                </span>
              ),
            },
          ]}
          data={reconciliations}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 5: FINANCIAL STATEMENTS
  // =========================================================================
  if (navId === "fin_statements" || navName === "Financial Statements") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · REPORTING</span>
            <div className="page-title">Statutory Financial Statements & Notes</div>
            <div className="page-subtitle">
              Draft Balance Sheets, Statement of Profit & Loss, Cash Flow Statements, and CARO disclosures.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Statements Pack (Simulated)",
                    message: "Exported Schedule III Balance Sheet and Notes to Accounts PDF.",
                    tone: "success",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Export Financial Statements</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Accounting Standards</span>
            <div className="value">Ind AS / IFRS</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Full compliance verified</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Consolidated Balance Sheet Summary (Vance Global Holdings)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ borderRight: "1px solid var(--color-border, #eee)", paddingRight: "1.5rem" }}>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--color-accent, #3b82f6)" }}>EQUITY & LIABILITIES</h4>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Shareholder Capital</span>
                <strong>$45,000,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Reserves & Surplus</span>
                <strong>$68,450,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Non-Current Term Borrowings</span>
                <strong>$18,200,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Current Trade Payables</span>
                <strong>$10,850,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", fontSize: "1.05rem" }}>
                <strong>TOTAL LIABILITIES</strong>
                <strong style={{ color: "var(--color-accent, #3b82f6)" }}>$142,500,000</strong>
              </div>
            </div>

            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--color-success, #10b981)" }}>ASSETS</h4>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Property, Plant & Equipment</span>
                <strong>$62,100,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Capital Work-in-Progress</span>
                <strong>$8,400,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Non-Current Investments</span>
                <strong>$34,500,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #eee" }}>
                <span>Trade Receivables & Cash</span>
                <strong>$37,500,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", fontSize: "1.05rem" }}>
                <strong>TOTAL ASSETS</strong>
                <strong style={{ color: "var(--color-success, #10b981)" }}>$142,500,000</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 6: COMPLIANCE CALENDAR
  // =========================================================================
  if (navId === "compliance_cal" || navName === "Compliance Calendar") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · STATUTORY DEADLINES</span>
            <div className="page-title">Statutory Compliance & Filings Calendar</div>
            <div className="page-subtitle">
              Advance Tax installments, GST monthly deadlines, TDS returns, and ROC annual compliance milestones.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Deadline Alerts Dispatched",
                    message: "Sent statutory compliance email reminders to 18 corporate CFOs.",
                    tone: "success",
                  })
                }
              >
                <Icon name="calendar" size={16} />
                <span>Send Deadline Reminders</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Immediate Milestone</span>
            <div className="value">Advance Tax Q1</div>
            <div className="delta positive">
              <Icon name="calendar" size={14} />
              <span>June 15 (5 days remaining)</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Upcoming Statutory Regulatory Deadlines"
          subtitle="Sharma & Associates LLP master compliance calendar"
          columns={[
            {
              key: "title",
              header: "Compliance Requirement",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "authority",
              header: "Statutory Body",
              render: (r: any) => <span className="badge badge--neutral">{r.authority}</span>,
            },
            {
              key: "deadline",
              header: "Due Date",
              render: (r: any) => (
                <strong style={{ color: r.priority === "Critical" ? "var(--color-danger, #ef4444)" : "inherit" }}>
                  {r.deadline}
                </strong>
              ),
            },
            {
              key: "entities",
              header: "Entities Affected",
              render: (r: any) => r.entities,
            },
            {
              key: "priority",
              header: "Priority",
              render: (r: any) => (
                <span className={`badge ${r.priority === "Critical" ? "badge--danger" : "badge--warning"}`}>
                  {r.priority}
                </span>
              ),
            },
          ]}
          data={[
            { title: "Advance Tax Q1 Installment (15%)", authority: "Income Tax Dept", deadline: "June 15, 2025", entities: "18 Corporate Clients", priority: "Critical" },
            { title: "GSTR-3B Monthly Return Filing", authority: "GSTN", deadline: "June 20, 2025", entities: "34 Registered GST Units", priority: "Urgent" },
            { title: "TDS Quarterly Return Form 24Q/26Q", authority: "Income Tax Dept", deadline: "July 31, 2025", entities: "42 Entities", priority: "Normal" },
            { title: "ROC Annual Filing Form MGT-7 / AOC-4", authority: "Ministry of Corporate Affairs", deadline: "October 30, 2025", entities: "32 Pvt Ltd", priority: "Normal" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 7: REPORTS
  // =========================================================================
  if (navId === "reports" || navName === "Reports") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · AUDIT OPINIONS</span>
            <div className="page-title">Statutory Audit Opinions & IFC Reports</div>
            <div className="page-subtitle">
              Independent Auditor Reports, Internal Financial Controls (IFC) testing summaries, and CARO disclosures.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Audit Report Generated (Simulated)",
                    message: "Drafted Independent Auditor's Report with Unmodified Clean Opinion.",
                    tone: "success",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Generate Audit Opinion</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Audit Quality Index</span>
            <div className="value">Grade 1 (Peer Reviewed)</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Zero statutory qualifications</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Formal Audit Opinions & Management Reports"
          subtitle="Signed statutory reports and internal control documentation"
          columns={[
            {
              key: "title",
              header: "Report Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "entity",
              header: "Audit Client",
              render: (r: any) => r.entity,
            },
            {
              key: "type",
              header: "Opinion Type",
              render: (r: any) => <span className="badge badge--success">{r.type}</span>,
            },
            {
              key: "date",
              header: "Signed Date",
              render: (r: any) => r.date,
            },
            {
              key: "action",
              header: "Working Paper",
              render: (r: any) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Audit File Download",
                      message: `Downloaded signed copy of ${r.title}.`,
                      tone: "info",
                    })
                  }
                >
                  Download PDF
                </button>
              ),
            },
          ]}
          data={[
            { title: "Statutory Audit Report & CARO Disclosures", entity: "Pendelton Diagnostics LLP", type: "Clean / Unmodified", date: "May 10, 2025" },
            { title: "Internal Financial Controls (IFC) Testing Memorandum", entity: "Vance Global Holdings Ltd", type: "Operating Effectively", date: "Apr 28, 2025" },
            { title: "Form 3CD Tax Audit Statement of Particulars", entity: "Apex Innovation Technologies", type: "Certified Clean", date: "May 02, 2025" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 8: DOCUMENTS
  // =========================================================================
  if (navId === "documents" || navName === "Documents") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · WORKING PAPERS VAULT</span>
            <div className="page-title">Audit Working Papers & Verification Evidence</div>
            <div className="page-subtitle">
              Secure repository for bank confirmations, board resolutions, vendor balance confirmations, and engagement letters.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Working Paper Uploaded (Simulated)",
                    message: "Committed external bank confirmation letter to audit working paper folder.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Upload Working Paper</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Documentation Retention</span>
            <div className="value">8-Year Legal Hold</div>
            <div className="delta positive">
              <Icon name="lock" size={14} />
              <span>ICAI SQC-1 Compliant Vault</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Statutory Audit Working Paper Files"
          subtitle="Mandatory documentation retained under Standard on Auditing (SA 230)"
          columns={[
            {
              key: "filename",
              header: "Working Paper / Evidence",
              render: (r: any) => <strong>{r.filename}</strong>,
            },
            {
              key: "entity",
              header: "Client Entity",
              render: (r: any) => r.entity,
            },
            {
              key: "category",
              header: "Classification",
              render: (r: any) => <span className="badge badge--neutral">{r.category}</span>,
            },
            {
              key: "status",
              header: "Verification",
              render: (r: any) => <span className="badge badge--success">{r.status}</span>,
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
                      title: "File Decrypted",
                      message: `Downloaded evidence file ${r.filename}.`,
                      tone: "info",
                    })
                  }
                >
                  Download
                </button>
              ),
            },
          ]}
          data={[
            { filename: "Vance Holdings - External Direct Bank Confirmation", entity: "Vance Global Holdings", category: "SA 505 External Confirmation", status: "Partner Verified" },
            { filename: "Certified Board Resolution for Annual Accounts Approval", entity: "Apex Innovation Technologies", category: "Corporate Governance", status: "Signed & Sealed" },
            { filename: "Fixed Asset Physical Verification Register & Geo-Tags", entity: "Pendelton Diagnostics LLP", category: "Physical Verification", status: "Verified" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 9: SETTINGS
  // =========================================================================
  if (navId === "settings" || navName === "Settings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">CHARTERED ACCOUNTANT · PRACTICE CONFIGURATION</span>
            <div className="page-title">CA Firm Profile & Peer Review Credentials</div>
            <div className="page-subtitle">
              ICAI firm registration details, partner DSC digital signature validity, and working paper retention policies.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Settings Saved",
                    message: "Firm configuration and ICAI registration details updated.",
                    tone: "success",
                  })
                }
              >
                <Icon name="check" size={16} />
                <span>Save Firm Settings</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">ICAI Firm Reg Number</span>
            <div className="value">FRN 109482W</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Peer Reviewed Firm (Valid thru 2027)</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Chartered Accountancy Firm Particulars</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Firm Name</label>
              <input
                type="text"
                defaultValue="Sharma & Associates LLP, Chartered Accountants"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Signing Partner</label>
              <input
                type="text"
                defaultValue="Priya Sharma, FCA (Membership # 084912)"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Class 3 Digital Signature (DSC)</label>
              <input
                type="text"
                defaultValue="Valid thru: Dec 2026 (USB Token Active)"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className="module-page">
      <section className="module-hero tone-navy">
        <div>
          <span className="eyebrow">CHARTERED ACCOUNTANT</span>
          <div className="page-title">{navName || "CA Module"}</div>
          <div className="page-subtitle">Statutory audit, accounting records, and compliance oversight.</div>
        </div>
      </section>
      <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
        <p>This CA module is ready. Select an item from the sidebar to continue.</p>
        <button
          type="button"
          className="button button--primary"
          onClick={() => onNavigate?.("Clients")}
        >
          <span>Go to Clients</span>
        </button>
      </div>
    </div>
  )
}
