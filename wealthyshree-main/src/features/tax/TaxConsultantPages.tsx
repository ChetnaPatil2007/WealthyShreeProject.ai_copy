import React, { useState } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface TaxConsultantPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface TaxClientItem {
  id: string
  clientName: string
  type: "HNW Individual" | "Cross-Border Founder" | "Family Trust" | "Corporate Expat"
  jurisdiction: string
  filingStatus: string
  estimatedAgi: number
  targetTaxYear: string
  filingReadiness: "Ready" | "Awaiting K-1" | "Under Review" | "Filed (Simulated)"
}

interface TaxScenarioItem {
  id: string
  name: string
  description: string
  projectedIncome: number
  estimatedTaxLiability: number
  effectiveRate: number
  projectedSavings: number
}

interface TaxDocumentChecklistItem {
  id: string
  documentType: string
  formCode: string
  source: string
  status: "Received & Reconciled" | "Pending Client Upload" | "Draft Staged"
  deadline: string
}

export function TaxConsultantModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: TaxConsultantPageProps) {
  const { showToast } = useToast()

  // State
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("US Federal & California")
  const [selectedTaxYear, setSelectedTaxYear] = useState("TY 2025 (Estimated)")

  // Tax Clients
  const [clients, setClients] = useState<TaxClientItem[]>([
    {
      id: "tc1",
      clientName: "Harrison & Eleanor Vance",
      type: "Family Trust",
      jurisdiction: "US Federal & New York",
      filingStatus: "Married Filing Jointly",
      estimatedAgi: 4250000,
      targetTaxYear: "2025",
      filingReadiness: "Under Review",
    },
    {
      id: "tc2",
      clientName: "David Chen, Cross-Border Principal",
      type: "Cross-Border Founder",
      jurisdiction: "US-UK Treaty / Delaware",
      filingStatus: "Non-Resident Alien (1040-NR)",
      estimatedAgi: 2150000,
      targetTaxYear: "2025",
      filingReadiness: "Awaiting K-1",
    },
    {
      id: "tc3",
      clientName: "Dr. Arthur Pendelton",
      type: "HNW Individual",
      jurisdiction: "US Federal & California",
      filingStatus: "Married Filing Jointly",
      estimatedAgi: 1850000,
      targetTaxYear: "2025",
      filingReadiness: "Ready",
    },
    {
      id: "tc4",
      clientName: "Sophia Sterling-Brooke",
      type: "HNW Individual",
      jurisdiction: "US Federal & Wyoming Trust",
      filingStatus: "Single Filer",
      estimatedAgi: 3400000,
      targetTaxYear: "2025",
      filingReadiness: "Under Review",
    },
  ])

  // Tax planning scenarios
  const [scenarios] = useState<TaxScenarioItem[]>([
    {
      id: "sc1",
      name: "Baseline Execution (No Strategy)",
      description: "Standard W-2, ordinary dividends and capital gains realization without proactive offsets.",
      projectedIncome: 2500000,
      estimatedTaxLiability: 925000,
      effectiveRate: 37.0,
      projectedSavings: 0,
    },
    {
      id: "sc2",
      name: "Strategy A: Tax-Loss Harvesting + DAF Charitable Fund",
      description: "Harvest $180,000 in capital losses; commit $150,000 cash/equity gift to Donor Advised Fund.",
      projectedIncome: 2170000,
      estimatedTaxLiability: 780000,
      effectiveRate: 31.2,
      projectedSavings: 145000,
    },
    {
      id: "sc3",
      name: "Strategy B: QSBS 100% Capital Gain Exclusion + Bonus Depreciation",
      description: "Utilize IRC Section 1202 Qualified Small Business Stock rollover combined with active real estate depreciation.",
      projectedIncome: 1650000,
      estimatedTaxLiability: 540000,
      effectiveRate: 21.6,
      projectedSavings: 385000,
    },
  ])

  // Tax documents checklist
  const [checklist, setChecklist] = useState<TaxDocumentChecklistItem[]>([
    {
      id: "doc1",
      documentType: "Wage and Tax Statement",
      formCode: "Form W-2",
      source: "Primary Employer / Corporate Payroll",
      status: "Received & Reconciled",
      deadline: "Jan 31, 2025",
    },
    {
      id: "doc2",
      documentType: "Consolidated Brokerage 1099 (Dividends, Cap Gains)",
      formCode: "Form 1099-B / DIV",
      source: "Charles Schwab Institutional",
      status: "Received & Reconciled",
      deadline: "Feb 15, 2025",
    },
    {
      id: "doc3",
      documentType: "Partner Share of Income / Loss",
      formCode: "Schedule K-1 (Form 1065)",
      source: "Vance Growth Venture Fund II",
      status: "Pending Client Upload",
      deadline: "Mar 15, 2025 (Extended)",
    },
    {
      id: "doc4",
      documentType: "Mortgage Interest & Property Tax Escrow",
      formCode: "Form 1098",
      source: "J.P. Morgan Private Bank",
      status: "Received & Reconciled",
      deadline: "Jan 31, 2025",
    },
    {
      id: "doc5",
      documentType: "Foreign Bank and Financial Accounts Report",
      formCode: "FinCEN Form 114 (FBAR)",
      source: "UBS Zurich Custody Feeds",
      status: "Draft Staged",
      deadline: "Jun 30, 2025",
    },
  ])

  // AI Tax Assistant State
  const [taxChat, setTaxChat] = useState<Array<{ sender: "ai" | "consultant"; text: string }>>([
    {
      sender: "ai",
      text: "Hello David. I am your Sphere AI Tax Advisory Assistant. I am loaded with the latest IRC provisions, state apportionment rules, and cross-border bilateral tax treaties. What tax scenario would you like to model today?",
    },
  ])
  const [taxInput, setTaxInput] = useState("")

  const handleSendTaxAi = (preset?: string) => {
    const q = preset || taxInput.trim()
    if (!q) return
    setTaxChat((prev) => [...prev, { sender: "consultant", text: q }])
    if (!preset) setTaxInput("")

    setTimeout(() => {
      let reply = ""
      const lower = q.toLowerCase()
      if (lower.includes("qsbs") || lower.includes("1202")) {
        reply =
          "IRC Section 1202 Analysis (QSBS): For qualified stock acquired after Sept 27, 2010 and held > 5 years, up to $10M or 10x basis (whichever is greater) is 100% exempt from federal capital gains tax and 3.8% NIIT. For clients anticipating a liquidity event within 5 years, consider an IRC Section 1045 rollover into replacement QSBS within 60 days to preserve holding period continuity."
      } else if (lower.includes("fbar") || lower.includes("foreign") || lower.includes("expat")) {
        reply =
          "FinCEN Form 114 (FBAR) Advisory Checklist: Required if aggregate value of foreign financial accounts exceeds $10,000 at any time during the calendar year. Automatic extension applies through October 15. Cross-reference Form 8938 (FATCA) if foreign assets exceed $100k (Single) / $200k (MFJ)."
      } else if (lower.includes("daf") || lower.includes("charity") || lower.includes("donor")) {
        reply =
          "Charitable Bunching & DAF Strategy: Contributing appreciated long-term capital gain stock to a Donor Advised Fund avoids federal capital gains tax (20% + 3.8% NIIT) and yields a full FMV itemized deduction up to 30% of AGI, allowing the client to far exceed the standard deduction threshold."
      } else {
        reply = `Tax analysis prepared for: "${q}". Modeling based on ${selectedJurisdiction} regulations for ${selectedTaxYear}. Calculations reflect simulated estimates pending certified e-file validation.`
      }
      setTaxChat((prev) => [...prev, { sender: "ai", text: reply }])
    }, 500)
  }

  // =========================================================================
  // PAGE 1: CLIENTS
  // =========================================================================
  if (navId === "clients" || navName === "Clients") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">TAX CONSULTANT · CLIENT ROSTER</span>
            <div className="page-title">Tax Advisory Clients & Entities</div>
            <div className="page-subtitle">
              High-net-worth individuals, cross-border founders, partnership pass-throughs, and trust tax accounts.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Client Added (Simulated)",
                    message: "Initialized new tax advisory intake engagement.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Onboard Tax Client</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Client List</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Active Tax Accounts</span>
            <div className="value">68 Clients</div>
            <div className="delta positive">
              <Icon name="tax" size={14} />
              <span>36 HNW, 18 Cross-Border, 14 Trusts</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Total Advisory Clients"
            value="68 Households"
            detail="Active tax modeling mandates"
            trend="up"
            icon="user"
            tone="blue"
          />
          <MetricCard
            label="Returns Ready for Review"
            value="24 Clients"
            detail="All source documents received"
            trend="up"
            icon="check"
            tone="emerald"
          />
          <MetricCard
            label="Awaiting Schedule K-1s"
            value="18 Clients"
            detail="Fund extensions active"
            trend="neutral"
            icon="calendar"
            tone="gold"
          />
          <MetricCard
            label="Cross-Border Treaties"
            value="14 Jurisdictions"
            detail="UK, Canada, Switzerland & Singapore"
            trend="up"
            icon="globe"
            tone="violet"
          />
        </section>

        <DataTable<TaxClientItem>
          title="Master Tax Advisory Client Roster"
          subtitle="Tax year 2025 advisory files and estimated AGI"
          columns={[
            {
              key: "clientName",
              header: "Client Name",
              render: (r) => (
                <div>
                  <strong>{r.clientName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.type} · {r.filingStatus}
                  </div>
                </div>
              ),
            },
            {
              key: "jurisdiction",
              header: "Primary Tax Jurisdiction",
              render: (r) => <span className="badge badge--neutral">{r.jurisdiction}</span>,
            },
            {
              key: "estimatedAgi",
              header: "Projected AGI (Simulated)",
              render: (r) => `$${r.estimatedAgi.toLocaleString()}`,
            },
            {
              key: "filingReadiness",
              header: "Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.filingReadiness === "Ready"
                      ? "badge--success"
                      : r.filingReadiness === "Under Review"
                      ? "badge--warning"
                      : "badge--neutral"
                  }`}
                >
                  {r.filingReadiness}
                </span>
              ),
            },
            {
              key: "actions",
              header: "Action",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Tax Scenario Opened",
                      message: `Loaded multi-year tax projection model for ${r.clientName}.`,
                      tone: "info",
                    })
                  }
                >
                  Open Scenario
                </button>
              ),
            },
          ]}
          data={clients}
        />

        {showExportModal && (
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            headers={["Client Name", "Type", "Jurisdiction", "Filing Status", "Projected AGI", "Status"]}
            data={clients.map((c) => [c.clientName, c.type, c.jurisdiction, c.filingStatus, `$${c.estimatedAgi.toLocaleString()}`, c.filingReadiness])}
            defaultFilename="tax-clients-master"
            title="Export Tax Clients"
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 2: TAX PLANNING
  // =========================================================================
  if (navId === "tax_planning" || navName === "Tax Planning") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">TAX CONSULTANT · SCENARIO MODELING</span>
            <div className="page-title">Tax Planning & Optimization Strategies</div>
            <div className="page-subtitle">
              Simulated tax reduction models, QSBS rollover gains, loss harvesting, and charitable bunching.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Scenario Model Saved (Simulated)",
                    message: "Saved strategy comparison to client portfolio file.",
                    tone: "success",
                  })
                }
              >
                <Icon name="trending" size={16} />
                <span>Save Planning Model</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Identified Tax Offsets</span>
            <div className="value">$385,000</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Simulated maximum strategy savings</span>
            </div>
          </div>
        </section>

        {/* Jurisdiction & Year Selectors */}
        <div className="card" style={{ padding: "1rem", marginBottom: "1.25rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.2rem" }}>Jurisdiction</label>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              style={{ padding: "0.4rem 0.6rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit", fontSize: "0.85rem" }}
            >
              <option value="US Federal & California">US Federal & California (Top Bracket 50.3%)</option>
              <option value="US Federal & New York">US Federal & New York (Top Bracket 49.8%)</option>
              <option value="US Federal & Texas">US Federal & Texas (Zero State Tax)</option>
              <option value="US-UK Bilateral Treaty">US-UK Bilateral Treaty (HMRC Apportionment)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.2rem" }}>Tax Year Scope</label>
            <select
              value={selectedTaxYear}
              onChange={(e) => setSelectedTaxYear(e.target.value)}
              style={{ padding: "0.4rem 0.6rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit", fontSize: "0.85rem" }}
            >
              <option value="TY 2025 (Estimated)">TY 2025 (Estimated Planning Year)</option>
              <option value="TY 2026 (TCJA Sunset)">TY 2026 (Post-TCJA Sunset Rates)</option>
            </select>
          </div>

          <div style={{ marginLeft: "auto", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            <em>Note: All calculations are simulated estimates for planning purposes.</em>
          </div>
        </div>

        {/* Strategy comparison cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {scenarios.map((sc) => (
            <div key={sc.id} className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <h4 style={{ margin: 0, fontSize: "1.05rem" }}>{sc.name}</h4>
                  <span className={`badge ${sc.projectedSavings > 0 ? "badge--success" : "badge--neutral"}`}>
                    {sc.projectedSavings > 0 ? `-$${sc.projectedSavings.toLocaleString()} Tax` : "Baseline"}
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.4, margin: "0 0 1rem 0" }}>
                  {sc.description}
                </p>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Projected Taxable Income:</span>
                    <strong>${sc.projectedIncome.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Estimated Tax Liability:</span>
                    <strong style={{ color: "var(--color-accent, #3b82f6)" }}>${sc.estimatedTaxLiability.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Effective Blended Rate:</span>
                    <span><strong>{sc.effectiveRate}%</strong></span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--color-border, #eee)", paddingTop: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  className="button button--secondary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                  onClick={() =>
                    showToast({
                      title: "Scenario Applied (Simulated)",
                      message: `Applied ${sc.name} to client review packet. Projected tax savings: $${sc.projectedSavings.toLocaleString()}.`,
                      tone: "success",
                    })
                  }
                >
                  Apply Strategy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 3: TAX CALCULATIONS
  // =========================================================================
  if (navId === "tax_calculations" || navName === "Tax Calculations") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">TAX CONSULTANT · ESTIMATION ENGINE</span>
            <div className="page-title">Tax Calculations & Bracket Breakdown</div>
            <div className="page-subtitle">
              Granular breakdown of ordinary wages, qualified dividends, long-term capital gains, and NIIT surtax.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Recalculated Estimates (Simulated)",
                    message: "Recalculated 2025 federal and state tax liability using updated bracket limits.",
                    tone: "info",
                  })
                }
              >
                <Icon name="tax" size={16} />
                <span>Recalculate Estimate</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Calculation Status</span>
            <div className="value">Estimated Tax</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Planning estimate · Unvalidated draft</span>
            </div>
          </div>
        </section>

        {/* Calculation Summary Table */}
        <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>2025 Sample Household Tax Computation (Harrison Vance)</h3>
            <span className="badge badge--warning">Simulated Estimate</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
              <span>1. Ordinary Wages & Consulting Income</span>
              <strong>$1,200,000</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
              <span>2. Qualified Dividends & Capital Gains</span>
              <strong>$1,850,000</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
              <span>3. Total Adjusted Gross Income (AGI)</span>
              <strong style={{ color: "var(--color-accent, #3b82f6)" }}>$3,050,000</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
              <span>4. Allowable Itemized Deductions (State SALT Cap, Mortgage, DAF)</span>
              <strong style={{ color: "var(--color-success, #10b981)" }}>-$160,000</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
              <span>5. Taxable Ordinary Income</span>
              <strong>$1,040,000 (Top Bracket 37.0%)</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
              <span>6. Net Investment Income Tax (NIIT 3.8%)</span>
              <strong>$70,300</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", fontSize: "1.1rem", borderTop: "2px solid #ddd" }}>
              <strong>ESTIMATED TOTAL TAX LIABILITY (FEDERAL + STATE)</strong>
              <strong style={{ color: "var(--color-accent, #3b82f6)" }}>$982,500 (Simulated)</strong>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 4: FILING CALENDAR
  // =========================================================================
  if (navId === "filing_cal" || navName === "Filing Calendar") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">TAX CONSULTANT · STATUTORY DEADLINES</span>
            <div className="page-title">Tax Deadlines & Quarterly Filing Calendar</div>
            <div className="page-subtitle">
              Federal Form 1040, Estimated Tax Vouchers, FBAR FinCEN 114, and Trust 1041 filing schedule.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Vouchers Dispatched (Simulated)",
                    message: "Sent Q2 federal & state estimated tax payment vouchers to 28 clients.",
                    tone: "success",
                  })
                }
              >
                <Icon name="calendar" size={16} />
                <span>Send Payment Vouchers</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Immediate Deadline</span>
            <div className="value">Q2 Estimated Tax</div>
            <div className="delta positive">
              <Icon name="calendar" size={14} />
              <span>June 15 (9 days left)</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Tax Authority Filing Dates & Client Cohorts"
          subtitle="Critical milestones monitored by Chen International Tax Group"
          columns={[
            {
              key: "title",
              header: "Filing Deadline / Form",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "form",
              header: "Tax Form",
              render: (r: any) => <span className="badge badge--neutral">{r.form}</span>,
            },
            {
              key: "date",
              header: "Statutory Due Date",
              render: (r: any) => (
                <strong style={{ color: r.priority === "Critical" ? "var(--color-danger, #ef4444)" : "inherit" }}>
                  {r.date}
                </strong>
              ),
            },
            {
              key: "clientsCount",
              header: "Clients Impacted",
              render: (r: any) => r.clientsCount,
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
            { title: "Q2 Estimated Tax Installment (Fed & State)", form: "Form 1040-ES / State Vouchers", date: "June 15, 2025", clientsCount: "28 HNW & Business Clients", priority: "Critical" },
            { title: "FBAR Foreign Bank Account Report", form: "FinCEN Form 114", date: "June 30, 2025", clientsCount: "18 Cross-Border Clients", priority: "Urgent" },
            { title: "Trust Income Tax Return (Extended Due Date)", form: "Form 1041 / Schedule K-1", date: "September 30, 2025", clientsCount: "14 Family Trusts", priority: "Normal" },
            { title: "Individual Income Tax Return Extended Filing", form: "Form 1040", date: "October 15, 2025", clientsCount: "22 Extended Returns", priority: "Normal" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 5: TAX DOCUMENTS
  // =========================================================================
  if (navId === "tax_documents" || navName === "Tax Documents") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">TAX CONSULTANT · INTAKE & CHECKLIST</span>
            <div className="page-title">Tax Documents Intake & Verification</div>
            <div className="page-subtitle">
              Track client tax forms (W-2, 1099, K-1, 1098), verify source receipts, and resolve missing documentation.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Intake Reminders Sent",
                    message: "Dispatched automated document request checklist to clients with pending K-1s.",
                    tone: "info",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Send Document Requests</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Intake Completion</span>
            <div className="value">88.2% Received</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>320 of 362 required forms logged</span>
            </div>
          </div>
        </section>

        <DataTable<TaxDocumentChecklistItem>
          title="Client Tax Documentation Status"
          subtitle="Required source forms for accurate tax return preparation"
          columns={[
            {
              key: "documentType",
              header: "Tax Document Title",
              render: (r) => (
                <div>
                  <strong>{r.documentType}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.formCode} · {r.source}
                  </div>
                </div>
              ),
            },
            {
              key: "deadline",
              header: "Statutory Deadline",
              render: (r) => r.deadline,
            },
            {
              key: "status",
              header: "Intake Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.status.includes("Received")
                      ? "badge--success"
                      : r.status.includes("Pending")
                      ? "badge--warning"
                      : "badge--neutral"
                  }`}
                >
                  {r.status}
                </span>
              ),
            },
            {
              key: "action",
              header: "Action",
              render: (r) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Document Verified",
                      message: `Confirmed ${r.formCode} data integrity.`,
                      tone: "success",
                    })
                  }
                >
                  Verify Form
                </button>
              ),
            },
          ]}
          data={checklist}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 6: COMPLIANCE
  // =========================================================================
  if (navId === "compliance" || navName === "Compliance") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">TAX CONSULTANT · REGULATORY COMPLIANCE</span>
            <div className="page-title">Tax Compliance & International Reporting</div>
            <div className="page-subtitle">
              FATCA compliance, GILTI/Subpart F international inclusions, state nexus tests, and audit defense documentation.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Compliance Audit Complete (Simulated)",
                    message: "All 68 tax files screened for FATCA and State Apportionment nexus.",
                    tone: "success",
                  })
                }
              >
                <Icon name="shield" size={16} />
                <span>Run Compliance Scan</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Compliance Defense Score</span>
            <div className="value">98.4 / 100</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Full statutory documentation backing</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Statutory Tax Compliance Checkpoints"
          subtitle="Substantive reporting requirements under IRS and State mandates"
          columns={[
            {
              key: "checkpoint",
              header: "Compliance Checkpoint",
              render: (r: any) => <strong>{r.checkpoint}</strong>,
            },
            {
              key: "scope",
              header: "Applicability",
              render: (r: any) => r.scope,
            },
            {
              key: "status",
              header: "Review Status",
              render: (r: any) => <span className="badge badge--success">{r.status}</span>,
            },
            {
              key: "notes",
              header: "Advisory Finding",
              render: (r: any) => r.notes,
            },
          ]}
          data={[
            { checkpoint: "Foreign Account Tax Compliance Act (FATCA)", scope: "18 Cross-Border Clients", status: "Compliant", notes: "Form 8938 threshold tests verified against Swiss & UK accounts." },
            { checkpoint: "California State Apportionment Nexus", scope: "9 Remote Founders", status: "Compliant", notes: "Economic nexus revenue thresholds audited; no unfiled state liabilities." },
            { checkpoint: "Qualified Small Business Stock (QSBS)", scope: "4 Tech Founders", status: "Certified", notes: "Original issuance dates and gross asset tests documented for 100% gain exemption." },
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
            <span className="eyebrow">TAX CONSULTANT · ADVISORY DELIVERABLES</span>
            <div className="page-title">Tax Memorandums & Strategic Reports</div>
            <div className="page-subtitle">
              Formal tax opinion letters, multi-year projection summaries, and capital gains harvest reports.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Tax Memo Generated (Simulated)",
                    message: "Exported 24-page Strategic Tax Planning Memorandum PDF.",
                    tone: "success",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Generate Tax Memorandum</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Advisory Deliverables</span>
            <div className="value">54 Reports</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Prepared for 2025 advisory cycle</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Generated Tax Advisory Deliverables"
          subtitle="Signed client memoranda and strategy evaluations"
          columns={[
            {
              key: "title",
              header: "Deliverable Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "client",
              header: "Client Household",
              render: (r: any) => r.client,
            },
            {
              key: "category",
              header: "Classification",
              render: (r: any) => <span className="badge badge--neutral">{r.category}</span>,
            },
            {
              key: "date",
              header: "Date Issued",
              render: (r: any) => r.date,
            },
            {
              key: "action",
              header: "Download",
              render: (r: any) => (
                <button
                  type="button"
                  className="button button--ghost"
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                  onClick={() =>
                    showToast({
                      title: "Download Initiated",
                      message: `Downloaded ${r.title} PDF.`,
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
            { title: "2025 Multi-Year Tax Optimization Memorandum", client: "Harrison & Eleanor Vance", category: "Comprehensive Tax Plan", date: "May 08, 2025" },
            { title: "Section 1202 QSBS Capital Gain Exclusion Opinion", client: "David Chen, Cross-Border", category: "Statutory Opinion", date: "Apr 29, 2025" },
            { title: "Physician Entity Structure & S-Corp Distribution Study", client: "Dr. Arthur Pendelton", category: "Entity Advisory", date: "Mar 15, 2025" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 8: AI TAX ASSISTANT
  // =========================================================================
  if (navId === "ai_tax" || navName === "AI Tax Assistant") {
    return (
      <div className="module-page">
        <section className="module-hero tone-purple">
          <div>
            <span className="eyebrow">TAX CONSULTANT · INTELLIGENCE ENGINE</span>
            <div className="page-title">Sphere AI Tax Advisory & Treaty Co-Pilot</div>
            <div className="page-subtitle">
              Tax treaty interpretation, Section 1031 like-kind exchange timelines, wash-sale audits, and deduction strategies.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={openAI}
              >
                <Icon name="ai" size={16} />
                <span>Open Full AI Assistant Drawer</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-purple">
            <span className="label">Tax Intelligence Model</span>
            <div className="value">Sphere Tax-Pro</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>Full IRC and Treasury Regulations indexed</span>
            </div>
          </div>
        </section>

        {/* Shortcuts */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Recommended Tax Advisory Inquiries:
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              "Explain IRC Section 1202 QSBS exclusion rules and $10M cap",
              "Review FBAR FinCEN 114 filing thresholds for foreign accounts",
              "How to optimize a Donor Advised Fund (DAF) charitable bunching plan",
              "Simulate Backdoor Roth IRA with pro-rata rule implications",
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="button button--ghost"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.65rem" }}
                onClick={() => handleSendTaxAi(p)}
              >
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat box */}
        <div className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", height: "480px" }}>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingRight: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {taxChat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "consultant" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background:
                    msg.sender === "consultant"
                      ? "var(--color-accent, #3b82f6)"
                      : "var(--color-bg-secondary, #f3f4f6)",
                  color: msg.sender === "consultant" ? "#fff" : "inherit",
                }}
              >
                <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.25rem" }}>
                  {msg.sender === "consultant" ? "David Chen, EA" : "Sphere AI Tax Co-Pilot"}
                </div>
                <div style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendTaxAi()
            }}
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Ask Sphere AI about IRC provisions, state tax apportionment, foreign treaties, or deduction strategies..."
              value={taxInput}
              onChange={(e) => setTaxInput(e.target.value)}
              style={{
                flex: 1,
                padding: "0.6rem 0.85rem",
                borderRadius: "6px",
                border: "1px solid var(--color-border, #ddd)",
                background: "var(--color-bg-input, #fff)",
                color: "inherit",
              }}
            />
            <button type="submit" className="button button--primary">
              <Icon name="arrow" size={16} />
              <span>Ask Tax AI</span>
            </button>
          </form>
        </div>
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
            <span className="eyebrow">TAX CONSULTANT · PRACTICE CONFIGURATION</span>
            <div className="page-title">Tax Consultant Profile & Practice Settings</div>
            <div className="page-subtitle">
              Manage Enrolled Agent (EA) / CPA credentials, PTIN registration, and default tax calculation parameters.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Settings Saved",
                    message: "Tax practice profile and PTIN details updated.",
                    tone: "success",
                  })
                }
              >
                <Icon name="check" size={16} />
                <span>Save Tax Settings</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">IRS PTIN Registration</span>
            <div className="value">Active · P01894201</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Authorized to practice before the IRS</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Tax Practice Credentials</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Consultant Name</label>
              <input
                type="text"
                defaultValue="David Chen, EA, MS Taxation"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Tax Practice Name</label>
              <input
                type="text"
                defaultValue="Chen International Tax Group LLC"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>IRS Electronic Filing ID (EFIN)</label>
              <input
                type="text"
                defaultValue="EFIN # 894012 (Active)"
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
          <span className="eyebrow">TAX CONSULTANT</span>
          <div className="page-title">{navName || "Tax Module"}</div>
          <div className="page-subtitle">Tax planning, calculations, filing calendar, and compliance oversight.</div>
        </div>
      </section>
      <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
        <p>This tax module is ready. Select an item from the sidebar to continue.</p>
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
