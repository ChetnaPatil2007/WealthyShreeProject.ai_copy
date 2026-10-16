import React, { useState } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { SubmitClaimModal, ExportModal } from "../../components/modals"

export interface InsurancePageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface InsuredClientItem {
  id: string
  clientName: string
  householdType: string
  activePoliciesCount: number
  totalCoverageValue: number
  annualPremium: number
  riskClass: "Super Preferred" | "Preferred" | "Standard"
  lastReviewDate: string
}

interface PolicyItem {
  id: string
  policyNumber: string
  clientName: string
  carrier: string
  coverageType: "Life" | "Health" | "Vehicle" | "Home" | "Umbrella"
  coverageAmount: number
  annualPremium: number
  renewalDate: string
  status: "Active" | "Renewal Due" | "Grace Period" | "Pending Underwriting"
}

interface ClaimWorkflowItem {
  id: string
  claimNumber: string
  policyNumber: string
  clientName: string
  incidentType: string
  incidentDate: string
  claimAmount: number
  status: "Filed" | "Adjuster Assigned" | "Documentation Pending" | "Approved / Settled (Simulated)"
  carrier: string
}

export function InsuranceModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: InsurancePageProps) {
  const { showToast } = useToast()

  // State
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Insured clients
  const [clients] = useState<InsuredClientItem[]>([
    {
      id: "ic1",
      clientName: "Harrison & Eleanor Vance",
      householdType: "Family Office & Trust",
      activePoliciesCount: 6,
      totalCoverageValue: 35000000,
      annualPremium: 48500,
      riskClass: "Super Preferred",
      lastReviewDate: "May 08, 2025",
    },
    {
      id: "ic2",
      clientName: "Dr. Arthur Pendelton",
      householdType: "Physician Household",
      activePoliciesCount: 4,
      totalCoverageValue: 8500000,
      annualPremium: 14200,
      riskClass: "Preferred",
      lastReviewDate: "Apr 18, 2025",
    },
    {
      id: "ic3",
      clientName: "Meridian Logistics Fleet",
      householdType: "Commercial Enterprise",
      activePoliciesCount: 8,
      totalCoverageValue: 45000000,
      annualPremium: 92000,
      riskClass: "Standard",
      lastReviewDate: "May 12, 2025",
    },
    {
      id: "ic4",
      clientName: "Sophia Sterling-Brooke",
      householdType: "Private Wealth Client",
      activePoliciesCount: 5,
      totalCoverageValue: 22000000,
      annualPremium: 28400,
      riskClass: "Super Preferred",
      lastReviewDate: "Mar 30, 2025",
    },
  ])

  // Master policies list
  const [policies] = useState<PolicyItem[]>([
    {
      id: "p1",
      policyNumber: "POL-LIF-9401",
      clientName: "Harrison & Eleanor Vance",
      carrier: "Northwestern Mutual",
      coverageType: "Life",
      coverageAmount: 15000000,
      annualPremium: 18400,
      renewalDate: "June 18, 2025",
      status: "Active",
    },
    {
      id: "p2",
      policyNumber: "POL-UMB-4412",
      clientName: "Harrison & Eleanor Vance",
      carrier: "Chubb Private Client",
      coverageType: "Umbrella",
      coverageAmount: 10000000,
      annualPremium: 3800,
      renewalDate: "August 10, 2025",
      status: "Active",
    },
    {
      id: "p3",
      policyNumber: "POL-HEA-8821",
      clientName: "Dr. Arthur Pendelton",
      carrier: "UnitedHealthcare Global",
      coverageType: "Health",
      coverageAmount: 2000000,
      annualPremium: 8400,
      renewalDate: "July 01, 2025",
      status: "Active",
    },
    {
      id: "p4",
      policyNumber: "POL-AUT-3310",
      clientName: "Meridian Logistics Fleet",
      carrier: "Travelers Commercial",
      coverageType: "Vehicle",
      coverageAmount: 5000000,
      annualPremium: 42500,
      renewalDate: "June 12, 2025 (3 days left)",
      status: "Grace Period",
    },
    {
      id: "p5",
      policyNumber: "POL-HOM-2291",
      clientName: "Sophia Sterling-Brooke",
      carrier: "AIG Private Client",
      coverageType: "Home",
      coverageAmount: 8500000,
      annualPremium: 9800,
      renewalDate: "September 15, 2025",
      status: "Active",
    },
    {
      id: "p6",
      policyNumber: "POL-DIS-1104",
      clientName: "Dr. Arthur Pendelton",
      carrier: "Guardian Life",
      coverageType: "Health",
      coverageAmount: 3000000,
      annualPremium: 5800,
      renewalDate: "June 24, 2025",
      status: "Renewal Due",
    },
  ])

  // Claims
  const [claimsList, setClaimsList] = useState<ClaimWorkflowItem[]>([
    {
      id: "cl1",
      claimNumber: "CLM-2025-0842",
      policyNumber: "POL-AUT-3310",
      clientName: "Meridian Logistics Fleet",
      incidentType: "Commercial Fleet Highway Collision",
      incidentDate: "May 10, 2025",
      claimAmount: 48500,
      status: "Adjuster Assigned",
      carrier: "Travelers Commercial",
    },
    {
      id: "cl2",
      claimNumber: "CLM-2025-0619",
      policyNumber: "POL-HOM-2291",
      clientName: "Sophia Sterling-Brooke",
      incidentType: "Water Main Pipe Burst & Hardwood Damage",
      incidentDate: "Apr 28, 2025",
      claimAmount: 82000,
      status: "Documentation Pending",
      carrier: "AIG Private Client",
    },
    {
      id: "cl3",
      claimNumber: "CLM-2025-0411",
      policyNumber: "POL-HEA-8821",
      clientName: "Dr. Arthur Pendelton",
      incidentType: "Emergency Inpatient Surgical Copay",
      incidentDate: "Mar 14, 2025",
      claimAmount: 18400,
      status: "Approved / Settled (Simulated)",
      carrier: "UnitedHealthcare Global",
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
            <span className="eyebrow">INSURANCE ADVISOR · POLICYHOLDERS</span>
            <div className="page-title">Insured Client Roster & Households</div>
            <div className="page-subtitle">
              Manage client protection portfolios, mortality/morbidity underwriting profiles, and annual premium schedules.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Insured Added (Simulated)",
                    message: "Created insured client record and launched underwriting questionnaire.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Onboard New Insured</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Insured Directory</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Insured Households</span>
            <div className="value">142 Clients</div>
            <div className="delta positive">
              <Icon name="insurance" size={14} />
              <span>+12 new households QTD</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Total Active Policies"
            value="384 Policies"
            detail="Life, Health, Property, Fleet"
            trend="up"
            icon="document"
            tone="blue"
          />
          <MetricCard
            label="Total Insured Coverage"
            value="$420.5M"
            detail="Aggregated face amount"
            trend="up"
            icon="shield"
            tone="emerald"
          />
          <MetricCard
            label="Annual Premium Volume"
            value="$1.84M / yr"
            detail="Active underwriter production"
            trend="up"
            icon="wallet"
            tone="gold"
          />
          <MetricCard
            label="Upcoming Renewals (30d)"
            value="18 Policies"
            detail="Invoicing dispatched to clients"
            trend="neutral"
            icon="calendar"
            tone="navy"
          />
        </section>

        <DataTable<InsuredClientItem>
          title="Master Insured Client Directory"
          subtitle="Household coverage sums and annual premium volume"
          columns={[
            {
              key: "clientName",
              header: "Client Name",
              render: (r) => (
                <div>
                  <strong>{r.clientName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.householdType}
                  </div>
                </div>
              ),
            },
            {
              key: "activePoliciesCount",
              header: "Policies",
              render: (r) => `${r.activePoliciesCount} Active`,
            },
            {
              key: "totalCoverageValue",
              header: "Total Coverage Sum",
              render: (r) => (
                <strong>${r.totalCoverageValue.toLocaleString()}</strong>
              ),
            },
            {
              key: "annualPremium",
              header: "Annual Premium",
              render: (r) => `$${r.annualPremium.toLocaleString()}/yr`,
            },
            {
              key: "riskClass",
              header: "Risk Tier",
              render: (r) => <span className="badge badge--success">{r.riskClass}</span>,
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
                      title: "Policy Audit Initiated",
                      message: `Loaded comprehensive policy schedule for ${r.clientName}.`,
                      tone: "info",
                    })
                  }
                >
                  Audit Coverage
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
            headers={["Client Name", "Type", "Policies", "Total Coverage", "Annual Premium", "Risk Class"]}
            data={clients.map((c) => [c.clientName, c.householdType, c.activePoliciesCount, `$${c.totalCoverageValue.toLocaleString()}`, `$${c.annualPremium.toLocaleString()}`, c.riskClass])}
            defaultFilename="insured-clients-roster"
            title="Export Insured Clients"
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 2: POLICIES
  // =========================================================================
  if (navId === "policies" || navName === "Policies") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · MASTER INVENTORY</span>
            <div className="page-title">Master Insurance Policies Inventory</div>
            <div className="page-subtitle">
              Unified policybook across top carriers (Northwestern Mutual, Chubb, AIG, Travelers, Guardian).
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Quote Prepared (Simulated)",
                    message: "Drafted insurance binding application with underwriter portal.",
                    tone: "success",
                  })
                }
              >
                <Icon name="plus" size={16} />
                <span>Issue New Policy Quote</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Practice Retention</span>
            <div className="value">97.8%</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>384 active binding policies</span>
            </div>
          </div>
        </section>

        <DataTable<PolicyItem>
          title="All Active Insurance Contracts"
          subtitle="Real-time binding policy records and status"
          columns={[
            {
              key: "policyNumber",
              header: "Policy Number / Carrier",
              render: (r) => (
                <div>
                  <strong>{r.policyNumber}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.carrier}</div>
                </div>
              ),
            },
            {
              key: "clientName",
              header: "Insured Household",
              render: (r) => r.clientName,
            },
            {
              key: "coverageType",
              header: "Class",
              render: (r) => <span className="badge badge--neutral">{r.coverageType}</span>,
            },
            {
              key: "coverageAmount",
              header: "Face Coverage",
              render: (r) => <strong>${r.coverageAmount.toLocaleString()}</strong>,
            },
            {
              key: "annualPremium",
              header: "Annual Premium",
              render: (r) => `$${r.annualPremium.toLocaleString()}`,
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.status === "Active"
                      ? "badge--success"
                      : r.status === "Renewal Due"
                      ? "badge--warning"
                      : "badge--danger"
                  }`}
                >
                  {r.status}
                </span>
              ),
            },
          ]}
          data={policies}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 3: HEALTH INSURANCE
  // =========================================================================
  if (navId === "health_ins" || navName === "Health Insurance") {
    const healthPolicies = policies.filter((p) => p.coverageType === "Health")
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · HEALTH & MEDICAL</span>
            <div className="page-title">Health Insurance & Disability Income</div>
            <div className="page-subtitle">
              Executive health plans, international travel riders, own-occupation disability, and critical illness.
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Health Sleeve Premium</span>
            <div className="value">$420K / yr</div>
            <div className="delta positive">
              <Icon name="shield" size={14} />
              <span>Comprehensive family health protection</span>
            </div>
          </div>
        </section>

        <DataTable<PolicyItem>
          title="Health, Disability & Medical Coverage Contracts"
          subtitle="Executive and family health policies"
          columns={[
            {
              key: "policyNumber",
              header: "Policy / Carrier",
              render: (r) => (
                <div>
                  <strong>{r.policyNumber}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.carrier}</div>
                </div>
              ),
            },
            {
              key: "clientName",
              header: "Insured",
              render: (r) => r.clientName,
            },
            {
              key: "coverageAmount",
              header: "Maximum Benefit",
              render: (r) => <strong>${r.coverageAmount.toLocaleString()}</strong>,
            },
            {
              key: "renewalDate",
              header: "Renewal Date",
              render: (r) => r.renewalDate,
            },
            {
              key: "status",
              header: "Status",
              render: (r) => <span className="badge badge--success">{r.status}</span>,
            },
          ]}
          data={healthPolicies}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 4: LIFE INSURANCE
  // =========================================================================
  if (navId === "life_ins" || navName === "Life Insurance") {
    const lifePolicies = policies.filter((p) => p.coverageType === "Life")
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · LIFE & SURVIVORSHIP</span>
            <div className="page-title">Life Insurance & Estate Liquidity Policies</div>
            <div className="page-subtitle">
              Term life, whole life survivorship, irrevocable life insurance trusts (ILIT), and key-person policies.
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Life Death Benefit Book</span>
            <div className="value">$185.0M</div>
            <div className="delta positive">
              <Icon name="insurance" size={14} />
              <span>Full cash value accumulation verified</span>
            </div>
          </div>
        </section>

        <DataTable<PolicyItem>
          title="Life & Estate Protection Portfolio"
          subtitle="Tax-free death benefits and cash value policies"
          columns={[
            {
              key: "policyNumber",
              header: "Policy / Carrier",
              render: (r) => (
                <div>
                  <strong>{r.policyNumber}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.carrier}</div>
                </div>
              ),
            },
            {
              key: "clientName",
              header: "Policy Beneficiary",
              render: (r) => r.clientName,
            },
            {
              key: "coverageAmount",
              header: "Death Benefit",
              render: (r) => <strong>${r.coverageAmount.toLocaleString()}</strong>,
            },
            {
              key: "annualPremium",
              header: "Annual Premium",
              render: (r) => `$${r.annualPremium.toLocaleString()}`,
            },
            {
              key: "status",
              header: "Policy Status",
              render: (r) => <span className="badge badge--success">{r.status}</span>,
            },
          ]}
          data={lifePolicies}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 5: VEHICLE INSURANCE
  // =========================================================================
  if (navId === "vehicle_ins" || navName === "Vehicle Insurance") {
    const vehiclePolicies = policies.filter((p) => p.coverageType === "Vehicle")
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · AUTO & FLEET</span>
            <div className="page-title">Vehicle Insurance & Fleet Motor Liability</div>
            <div className="page-subtitle">
              Luxury auto policies, commercial fleet liability, agreed value endorsements, and uninsured motorist riders.
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Fleet Insured Units</span>
            <div className="value">48 Vehicles</div>
            <div className="delta positive">
              <Icon name="card" size={14} />
              <span>Full commercial liability active</span>
            </div>
          </div>
        </section>

        <DataTable<PolicyItem>
          title="Vehicle & Motor Liability Policies"
          subtitle="Commercial fleet and private luxury vehicle coverage"
          columns={[
            {
              key: "policyNumber",
              header: "Policy Number / Carrier",
              render: (r) => (
                <div>
                  <strong>{r.policyNumber}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.carrier}</div>
                </div>
              ),
            },
            {
              key: "clientName",
              header: "Fleet / Insured",
              render: (r) => r.clientName,
            },
            {
              key: "coverageAmount",
              header: "Liability Limit",
              render: (r) => <strong>${r.coverageAmount.toLocaleString()}</strong>,
            },
            {
              key: "renewalDate",
              header: "Renewal Due",
              render: (r) => r.renewalDate,
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <span className={`badge ${r.status === "Active" ? "badge--success" : "badge--warning"}`}>
                  {r.status}
                </span>
              ),
            },
          ]}
          data={vehiclePolicies}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 6: HOME INSURANCE
  // =========================================================================
  if (navId === "home_ins" || navName === "Home Insurance") {
    const homePolicies = policies.filter((p) => p.coverageType === "Home")
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · PROPERTY & CASUALTY</span>
            <div className="page-title">Home, Estate & High-Value Property Insurance</div>
            <div className="page-subtitle">
              Guaranteed replacement cost, fine art riders, jewelry schedules, coastal windstorm, and flood endorsements.
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Real Estate Insured</span>
            <div className="value">$68.4M Value</div>
            <div className="delta positive">
              <Icon name="home" size={14} />
              <span>Chubb & AIG Guaranteed Replacement</span>
            </div>
          </div>
        </section>

        <DataTable<PolicyItem>
          title="High-Value Home & Property Contracts"
          subtitle="Primary residences, vacation estates, and scheduled articles"
          columns={[
            {
              key: "policyNumber",
              header: "Policy / Carrier",
              render: (r) => (
                <div>
                  <strong>{r.policyNumber}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.carrier}</div>
                </div>
              ),
            },
            {
              key: "clientName",
              header: "Property Owner",
              render: (r) => r.clientName,
            },
            {
              key: "coverageAmount",
              header: "Insured Replacement Cost",
              render: (r) => <strong>${r.coverageAmount.toLocaleString()}</strong>,
            },
            {
              key: "annualPremium",
              header: "Annual Premium",
              render: (r) => `$${r.annualPremium.toLocaleString()}`,
            },
            {
              key: "status",
              header: "Status",
              render: (r) => <span className="badge badge--success">{r.status}</span>,
            },
          ]}
          data={homePolicies}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 7: CLAIMS
  // =========================================================================
  if (navId === "claims" || navName === "Claims") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · LOSS RUN & CLAIMS</span>
            <div className="page-title">Insurance Claims Tracking & Adjuster Pipeline</div>
            <div className="page-subtitle">
              Track incident reports, independent adjuster appointments, proof-of-loss packets, and claim disbursements.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowClaimModal(true)}
              >
                <Icon name="alert" size={16} />
                <span>Submit Client Claim</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Claims in Processing</span>
            <div className="value">2 Open Claims</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Simulated tracking · $130,500 pending</span>
            </div>
          </div>
        </section>

        <DataTable<ClaimWorkflowItem>
          title="Active Policy Claims Ledger"
          subtitle="Real-time status updates from carrier claims departments"
          columns={[
            {
              key: "claimNumber",
              header: "Claim ID / Carrier",
              render: (r) => (
                <div>
                  <strong>{r.claimNumber}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.carrier}</div>
                </div>
              ),
            },
            {
              key: "clientName",
              header: "Claimant",
              render: (r) => r.clientName,
            },
            {
              key: "incidentType",
              header: "Incident Description",
              render: (r) => (
                <div>
                  <div>{r.incidentType}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>Date: {r.incidentDate}</div>
                </div>
              ),
            },
            {
              key: "claimAmount",
              header: "Claim Amount",
              render: (r) => <strong>${r.claimAmount.toLocaleString()}</strong>,
            },
            {
              key: "status",
              header: "Processing Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.status.includes("Approved")
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
          ]}
          data={claimsList}
        />

        {showClaimModal && (
          <SubmitClaimModal
            isOpen={showClaimModal}
            onClose={() => setShowClaimModal(false)}
            onClaimSubmitted={(newClaim) => {
              setShowClaimModal(false)
              showToast({
                title: "Claim Submitted (Simulated)",
                message: `Filed simulated claim #${newClaim.claimNumber} for $${newClaim.amount.toLocaleString()}. Adjuster assignment queued.`,
                tone: "success",
              })
            }}
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 8: RENEWALS
  // =========================================================================
  if (navId === "renewals" || navName === "Renewals") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · EXPIRATION CALENDAR</span>
            <div className="page-title">Policy Renewals & Expiration Timeline</div>
            <div className="page-subtitle">
              30, 60, and 90-day upcoming policy expirations, premium re-negotiation quotes, and lapse prevention.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Renewal Invoices Sent",
                    message: "Dispatched automated renewal packets to 4 clients with policies expiring this month.",
                    tone: "success",
                  })
                }
              >
                <Icon name="calendar" size={16} />
                <span>Dispatch Renewal Invoices</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Immediate Expiration</span>
            <div className="value">Meridian Fleet</div>
            <div className="delta positive">
              <Icon name="calendar" size={14} />
              <span>June 12 (3 days left · Grace Period)</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Upcoming Policy Renewal Schedule"
          subtitle="Carrier expiration dates and premium payment verification"
          columns={[
            {
              key: "client",
              header: "Client / Entity",
              render: (r: any) => <strong>{r.client}</strong>,
            },
            {
              key: "policy",
              header: "Policy Scope",
              render: (r: any) => r.policy,
            },
            {
              key: "carrier",
              header: "Underwriter",
              render: (r: any) => <span className="badge badge--neutral">{r.carrier}</span>,
            },
            {
              key: "date",
              header: "Renewal Date",
              render: (r: any) => (
                <strong style={{ color: r.urgent ? "var(--color-danger, #ef4444)" : "inherit" }}>
                  {r.date}
                </strong>
              ),
            },
            {
              key: "premium",
              header: "Annual Premium",
              render: (r: any) => r.premium,
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
                      title: "Renewal Bound (Simulated)",
                      message: `Simulated policy renewal binding for ${r.client}.`,
                      tone: "success",
                    })
                  }
                >
                  Renew Policy
                </button>
              ),
            },
          ]}
          data={[
            { client: "Meridian Logistics Fleet", policy: "Commercial Fleet Motor Liability", carrier: "Travelers", date: "June 12, 2025", premium: "$42,500", urgent: true },
            { client: "Harrison & Eleanor Vance", policy: "Whole Life Survivorship", carrier: "Northwestern Mutual", date: "June 18, 2025", premium: "$18,400", urgent: false },
            { client: "Dr. Arthur Pendelton", policy: "Disability Income Protection", carrier: "Guardian Life", date: "June 24, 2025", premium: "$5,800", urgent: false },
            { client: "Sophia Sterling-Brooke", policy: "High-Value Homeowners", carrier: "AIG Private Client", date: "September 15, 2025", premium: "$9,800", urgent: false },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 9: COVERAGE ANALYSIS
  // =========================================================================
  if (navId === "coverage_analysis" || navName === "Coverage Analysis") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · PROTECTION GAP AUDIT</span>
            <div className="page-title">Coverage Gap Analysis & Liability Stress Test</div>
            <div className="page-subtitle">
              Identify unprotected liability exposures, insufficient umbrella limits, and key-person risk gaps.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Gap Audit Generated (Simulated)",
                    message: "Identified $10M excess umbrella liability requirement for Harrison Vance family office.",
                    tone: "warning",
                  })
                }
              >
                <Icon name="shield" size={16} />
                <span>Run Gap Analysis Audit</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Identified Coverage Gaps</span>
            <div className="value">3 Households</div>
            <div className="delta positive">
              <Icon name="alert" size={14} />
              <span>Umbrella liability expansion recommended</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>High-Priority Coverage Recommendations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { client: "Harrison & Eleanor Vance", issue: "Umbrella Liability Gap: Current $10M umbrella is insufficient for $28.5M net worth and multiple watercraft properties.", recommendation: "Increase Umbrella Liability limit to $25M with Chubb Private Client." },
              { client: "Dr. Arthur Pendelton", issue: "Specialty Disability Gap: Own-occupation disability policy cap of $15k/mo leaves 45% of net surgical income exposed.", recommendation: "Bind supplemental excess disability coverage of $12k/mo with Lloyd's syndicate." },
              { client: "Sophia Sterling-Brooke", issue: "Valuable Articles Underinsurance: Recent fine art acquisitions ($3.2M) not yet scheduled on inland marine floater.", recommendation: "Schedule fine art inventory with certified appraisal and agreed value endorsement." },
            ].map((gap, idx) => (
              <div key={idx} style={{ padding: "1rem", borderRadius: "6px", background: "var(--color-bg-secondary, #fafafa)", borderLeft: "4px solid var(--color-warning, #f59e0b)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <strong>{gap.client}</strong>
                  <span className="badge badge--warning">Gap Identified</span>
                </div>
                <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                  {gap.issue}
                </p>
                <div style={{ fontSize: "0.85rem", color: "var(--color-accent, #3b82f6)", fontWeight: 500 }}>
                  Recommendation: {gap.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 10: REPORTS
  // =========================================================================
  if (navId === "reports" || navName === "Reports") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · CLIENT REVIEWS</span>
            <div className="page-title">Insurance Practice Reports & Loss Runs</div>
            <div className="page-subtitle">
              Formal annual risk assurance presentations, carrier solvency ratings (A.M. Best), and policy loss histories.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Report Exported",
                    message: "Exported Annual Risk & Protection Summary Deck PDF.",
                    tone: "success",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Export Annual Risk Review</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Carrier Solvency</span>
            <div className="value">100% A++ / A+ Rated</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>A.M. Best Financial Strength Standard</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Formal Insurance Assurance Deliverables"
          subtitle="Signed policy reviews and underwriter documentation"
          columns={[
            {
              key: "title",
              header: "Report Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "client",
              header: "Client Household",
              render: (r: any) => r.client,
            },
            {
              key: "type",
              header: "Classification",
              render: (r: any) => <span className="badge badge--neutral">{r.type}</span>,
            },
            {
              key: "date",
              header: "Issued Date",
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
            { title: "2025 Comprehensive Family Protection & Umbrella Review", client: "Harrison & Eleanor Vance", type: "Annual Review", date: "May 08, 2025" },
            { title: "Commercial Motor Fleet Loss Run & Safety Report", client: "Meridian Logistics Fleet", type: "Loss Run History", date: "Apr 20, 2025" },
            { title: "Physician Disability & Key-Person Protection Audit", client: "Dr. Arthur Pendelton", type: "Disability Analysis", date: "Mar 12, 2025" },
          ]}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 11: SETTINGS
  // =========================================================================
  if (navId === "settings" || navName === "Settings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INSURANCE ADVISOR · LICENSING & APPOINTMENTS</span>
            <div className="page-title">Agent Credentials & Carrier Appointments</div>
            <div className="page-subtitle">
              Manage State Insurance Department licenses, National Producer Number (NPN), and carrier portal credentials.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Settings Saved",
                    message: "Agency profile and carrier appointment records updated.",
                    tone: "success",
                  })
                }
              >
                <Icon name="check" size={16} />
                <span>Save Agency Settings</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">National Producer Number</span>
            <div className="value">NPN # 18940291</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Licensed in 14 States (Life, Health, P&C)</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Insurance Producer Particulars</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Agent Name</label>
              <input
                type="text"
                defaultValue="Sarah Jenkins, CLU®, ChFC®"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Agency Name</label>
              <input
                type="text"
                defaultValue="Jenkins Risk & Assurance Desk LLC"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Resident State License</label>
              <input
                type="text"
                defaultValue="California Dept of Insurance # 0G94812"
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
          <span className="eyebrow">INSURANCE ADVISOR</span>
          <div className="page-title">{navName || "Insurance Module"}</div>
          <div className="page-subtitle">Insurance practice management, policy inventory, and coverage analysis.</div>
        </div>
      </section>
      <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
        <p>This insurance module is ready. Select an item from the sidebar to continue.</p>
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
