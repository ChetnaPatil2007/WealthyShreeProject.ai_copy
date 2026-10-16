import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface FamilyOfficePageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface FamilyMemberItem {
  id: string
  name: string
  generation: "G1 Founders" | "G2 Successors" | "G3 Rising Gen"
  role: string
  bloodline: "Direct Bloodline" | "Spouse / Legal"
  votingPower: number
  committee: string
  status: "Active Trustee" | "Advisory Observer" | "In Formation"
}

interface ConsolidatedWealthItem {
  id: string
  entityName: string
  entityType: "Dynasty Trust" | "Operating LLC" | "Holding Corp" | "Philanthropic Foundation"
  jurisdiction: string
  liquidAssets: number
  illiquidAssets: number
  totalValuation: number
  debt: number
  netWorth: number
}

interface PrivateInvestmentItem {
  id: string
  assetName: string
  assetClass: "Direct PE" | "Venture Capital" | "Co-Investment" | "Real Assets"
  entity: string
  committedCapital: number
  fundedCapital: number
  unfundedCommitment: number
  currentNav: number
  irr: number
  moic: number
  status: "Performing" | "Harvesting" | "Capital Call Pending"
}

interface PropertyItem {
  id: string
  title: string
  location: string
  category: "Commercial Office" | "Private Estate" | "Waterfront Villa" | "Ranch & Land"
  acquisitionYear: number
  valuation: number
  rentalYield: number
  occupancy: string
  ltv: number
  managingPartner: string
}

interface BusinessHoldingItem {
  id: string
  companyName: string
  sector: "Global Logistics" | "Clean Energy" | "Healthcare Diagnostics" | "Aviation & Defense"
  ownershipPct: number
  boardSeats: string
  annualRevenue: string
  ebitda: string
  dividendYield: number
  governanceStatus: "Majority Control" | "Significant Influence" | "Passive Strategic"
}

interface TrustStructureItem {
  id: string
  trustName: string
  trustType: "Delaware Dynasty Trust" | "Grantor Retained Annuity (GRAT)" | "Irrevocable Life Insurance (ILIT)" | "Charitable Remainder (CRT)"
  governingState: string
  institutionalTrustee: string
  corpusValue: number
  distributionPolicy: string
  taxStatus: "Grantor" | "Non-Grantor Discretionary"
}

export function FamilyOfficeModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: FamilyOfficePageProps) {
  const { showToast } = useToast()
  const [showExportModal, setShowExportModal] = useState(false)

  // 1. Family Members State
  const [members, setMembers] = useState<FamilyMemberItem[]>([
    {
      id: "mem-1",
      name: "Arthur Pendelton",
      generation: "G1 Founders",
      role: "Family Assembly Chair & Patriarch",
      bloodline: "Direct Bloodline",
      votingPower: 35,
      committee: "Executive Governance Council",
      status: "Active Trustee",
    },
    {
      id: "mem-2",
      name: "Eleanor Pendelton",
      generation: "G1 Founders",
      role: "Philanthropic Foundation Trustee",
      bloodline: "Direct Bloodline",
      votingPower: 25,
      committee: "Endowment & Philanthropy Board",
      status: "Active Trustee",
    },
    {
      id: "mem-3",
      name: "Victoria Pendelton-Sterling",
      generation: "G2 Successors",
      role: "Direct Investments & PE Managing Director",
      bloodline: "Direct Bloodline",
      votingPower: 20,
      committee: "Investment Oversight Committee",
      status: "Active Trustee",
    },
    {
      id: "mem-4",
      name: "Richard Pendelton",
      generation: "G2 Successors",
      role: "Real Estate & Commercial Holdings Lead",
      bloodline: "Direct Bloodline",
      votingPower: 15,
      committee: "Real Assets Directorate",
      status: "Active Trustee",
    },
    {
      id: "mem-5",
      name: "Sophia Pendelton",
      generation: "G3 Rising Gen",
      role: "Next-Gen Council Chair & ESG Fellow",
      bloodline: "Direct Bloodline",
      votingPower: 3,
      committee: "Next-Generation Advisory",
      status: "Advisory Observer",
    },
    {
      id: "mem-6",
      name: "Alexander Pendelton",
      generation: "G3 Rising Gen",
      role: "Technology & Venture Syndicate Analyst",
      bloodline: "Direct Bloodline",
      votingPower: 2,
      committee: "Venture Screening Taskforce",
      status: "In Formation",
    },
  ])
  const [memberFilter, setMemberFilter] = useState("All")

  // 2. Consolidated Wealth State
  const [wealthEntities] = useState<ConsolidatedWealthItem[]>([
    {
      id: "cw-1",
      entityName: "Pendelton Delaware Dynasty Trust",
      entityType: "Dynasty Trust",
      jurisdiction: "Wilmington, Delaware (Perpetual)",
      liquidAssets: 14200000,
      illiquidAssets: 18200000,
      totalValuation: 32400000,
      debt: 0,
      netWorth: 32400000,
    },
    {
      id: "cw-2",
      entityName: "Pendelton Capital Partners LLC",
      entityType: "Holding Corp",
      jurisdiction: "New York, NY",
      liquidAssets: 6800000,
      illiquidAssets: 19600000,
      totalValuation: 26400000,
      debt: 2200000,
      netWorth: 24200000,
    },
    {
      id: "cw-3",
      entityName: "Pendelton Real Estate Holdings LLC",
      entityType: "Operating LLC",
      jurisdiction: "Cheyenne, Wyoming",
      liquidAssets: 2100000,
      illiquidAssets: 16800000,
      totalValuation: 18900000,
      debt: 4100000,
      netWorth: 14800000,
    },
    {
      id: "cw-4",
      entityName: "Pendelton Global Endowment Foundation",
      entityType: "Philanthropic Foundation",
      jurisdiction: "Washington, DC (501c3)",
      liquidAssets: 9500000,
      illiquidAssets: 4700000,
      totalValuation: 14200000,
      debt: 0,
      netWorth: 14200000,
    },
  ])

  // 3. Investments State
  const [investments, setInvestments] = useState<PrivateInvestmentItem[]>([
    {
      id: "inv-1",
      assetName: "Sequoia Growth Fund VI",
      assetClass: "Direct PE",
      entity: "Dynasty Trust (JPMorgan)",
      committedCapital: 5000000,
      fundedCapital: 3600000,
      unfundedCommitment: 1400000,
      currentNav: 6850000,
      irr: 24.2,
      moic: 1.9,
      status: "Capital Call Pending",
    },
    {
      id: "inv-2",
      assetName: "Andreessen Horowitz Seed VII",
      assetClass: "Venture Capital",
      entity: "Pendelton Capital Partners LLC",
      committedCapital: 3000000,
      fundedCapital: 2550000,
      unfundedCommitment: 450000,
      currentNav: 4890000,
      irr: 31.4,
      moic: 2.3,
      status: "Performing",
    },
    {
      id: "inv-3",
      assetName: "Blackstone Global Infrastructure II",
      assetClass: "Real Assets",
      entity: "Pendelton Real Estate LLC",
      committedCapital: 4000000,
      fundedCapital: 2400000,
      unfundedCommitment: 1600000,
      currentNav: 3120000,
      irr: 14.8,
      moic: 1.3,
      status: "Performing",
    },
    {
      id: "inv-4",
      assetName: "Insight Partners Scaleup XII",
      assetClass: "Direct PE",
      entity: "Dynasty Trust (JPMorgan)",
      committedCapital: 2500000,
      fundedCapital: 2250000,
      unfundedCommitment: 250000,
      currentNav: 3950000,
      irr: 28.6,
      moic: 1.75,
      status: "Performing",
    },
  ])

  // 4. Properties State
  const [properties] = useState<PropertyItem[]>([
    {
      id: "prop-1",
      title: "Mayfair London Headquarters & Commercial Suites",
      location: "Mayfair, London W1, UK",
      category: "Commercial Office",
      acquisitionYear: 2018,
      valuation: 14500000,
      rentalYield: 6.8,
      occupancy: "100% Leased",
      ltv: 28,
      managingPartner: "Knight Frank UK",
    },
    {
      id: "prop-2",
      title: "Aspen Mountain Ski Compound",
      location: "Pitkin County, Aspen, CO",
      category: "Private Estate",
      acquisitionYear: 2020,
      valuation: 9200000,
      rentalYield: 4.1,
      occupancy: "Owner Reserved & Seasonal",
      ltv: 0,
      managingPartner: "Sotheby's Int. Realty",
    },
    {
      id: "prop-3",
      title: "Palm Beach Waterfront Villa & Mooring",
      location: "North Ocean Blvd, Palm Beach, FL",
      category: "Waterfront Villa",
      acquisitionYear: 2021,
      valuation: 8400000,
      rentalYield: 5.2,
      occupancy: "Private Family Retreat",
      ltv: 15,
      managingPartner: "Pendelton Real Estate LLC",
    },
    {
      id: "prop-4",
      title: "Yellowstone River Conservation Ranch",
      location: "Park County, Livingston, MT",
      category: "Ranch & Land",
      acquisitionYear: 2016,
      valuation: 4800000,
      rentalYield: 3.5,
      occupancy: "1,200 Acres Agricultural & Trust",
      ltv: 0,
      managingPartner: "Western Land Stewardship",
    },
  ])

  // 5. Business Holdings State
  const [businesses] = useState<BusinessHoldingItem[]>([
    {
      id: "biz-1",
      companyName: "Pendelton Transatlantic Logistics Corp",
      sector: "Global Logistics",
      ownershipPct: 78.4,
      boardSeats: "3 of 5 (Arthur, Richard, Victoria)",
      annualRevenue: "$68.4M",
      ebitda: "$12.8M",
      dividendYield: 7.2,
      governanceStatus: "Majority Control",
    },
    {
      id: "biz-2",
      companyName: "Apex Clean Hydrogen Ventures LLC",
      sector: "Clean Energy",
      ownershipPct: 42.0,
      boardSeats: "2 of 5 (Victoria, Industry Lead)",
      annualRevenue: "$34.2M",
      ebitda: "$6.4M",
      dividendYield: 4.8,
      governanceStatus: "Significant Influence",
    },
    {
      id: "biz-3",
      companyName: "BioMolecular Diagnostic Labs Corp",
      sector: "Healthcare Diagnostics",
      ownershipPct: 24.5,
      boardSeats: "1 Board Observer (Alexander)",
      annualRevenue: "$21.5M",
      ebitda: "$3.9M",
      dividendYield: 3.5,
      governanceStatus: "Passive Strategic",
    },
  ])

  // 6. Trusts State
  const [trusts] = useState<TrustStructureItem[]>([
    {
      id: "tru-1",
      trustName: "Pendelton Irrevocable Dynasty Trust",
      trustType: "Delaware Dynasty Trust",
      governingState: "Delaware",
      institutionalTrustee: "Northern Trust Delaware",
      corpusValue: 32400000,
      distributionPolicy: "Discretionary health, education, maintenance & support (HEMS)",
      taxStatus: "Non-Grantor Discretionary",
    },
    {
      id: "tru-2",
      trustName: "Pendelton 2019 Grantor Retained Annuity Trust",
      trustType: "Grantor Retained Annuity (GRAT)",
      governingState: "Delaware",
      institutionalTrustee: "J.P. Morgan Trust Co.",
      corpusValue: 8200000,
      distributionPolicy: "Annual IRS §7520 hurdle payout to Grantor; residue to G2",
      taxStatus: "Grantor",
    },
    {
      id: "tru-3",
      trustName: "Pendelton Irrevocable Life Insurance Trust",
      trustType: "Irrevocable Life Insurance (ILIT)",
      governingState: "Wyoming",
      institutionalTrustee: "First Wyoming Fiduciary Services",
      corpusValue: 6500000,
      distributionPolicy: "Second-to-die survivorship liquidity policy ($25M death benefit)",
      taxStatus: "Non-Grantor Discretionary",
    },
    {
      id: "tru-4",
      trustName: "Pendelton Charitable Remainder Unitrust",
      trustType: "Charitable Remainder (CRT)",
      governingState: "District of Columbia",
      institutionalTrustee: "Northern Trust Philanthropic Advisory",
      corpusValue: 4800000,
      distributionPolicy: "6% annual unitrust payout to family; remainder to Foundation",
      taxStatus: "Non-Grantor Discretionary",
    },
  ])

  // 7. Estate Planning Milestones State
  const [estateChecklist, setEstateChecklist] = useState([
    {
      id: "est-1",
      item: "Lifetime Federal Gift & Estate Tax Exemption Allocation",
      detail: "$27.22M Combined Spouse Exemption fully leveraged into Dynasty Trust",
      status: "Optimized & Locked",
      badge: "success",
    },
    {
      id: "est-2",
      item: "Generation-Skipping Transfer (GST) Tax Allocations",
      detail: "Timely Form 709 filed with zero inadvertent inclusion ratio",
      status: "Fully Allocated",
      badge: "success",
    },
    {
      id: "est-3",
      item: "Durable Power of Attorney & Healthcare Directives Review",
      detail: "Scheduled for triennial refresh with Sullivan & Cromwell LLP",
      status: "Review Due Q4",
      badge: "warning",
    },
    {
      id: "est-4",
      item: "Next-Gen Liquidity Buffer & Estate Tax Modeling",
      detail: "Surplus ILIT death benefit exceeds projected state and federal taxes by $8.4M",
      status: "Surplus Covered",
      badge: "success",
    },
  ])

  // Handlers
  const handleFundCapitalCall = (invId: string) => {
    setInvestments((prev) =>
      prev.map((i) =>
        i.id === invId
          ? {
              ...i,
              fundedCapital: i.committedCapital,
              unfundedCommitment: 0,
              status: "Performing",
            }
          : i,
      ),
    )
    showToast({
      title: "Capital Call Disbursed (Simulated)",
      message: "Draw authorization verified and wired via Delaware Trust liquidity sleeve.",
      tone: "success",
    })
  }

  const handleConveneCouncil = () => {
    showToast({
      title: "Family Council Convened",
      message: "Formal quorum notices and voting resolutions dispatched to all G1, G2 & G3 trustees.",
      tone: "info",
    })
  }

  // Filtered members
  const filteredMembers = useMemo(() => {
    if (memberFilter === "All") return members
    return members.filter((m) => m.generation.includes(memberFilter))
  }, [members, memberFilter])

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
              INSTITUTIONAL FAMILY OFFICE
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              Pendelton Family Office & Fiduciary Vault
            </span>
          </div>
          <h1 style={{ font: "700 26px 'Manrope', sans-serif", color: "var(--ink)", margin: 0 }}>
            {navName}
          </h1>
          <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "13.5px" }}>
            Multi-generational governance, consolidated balance sheet, direct holdings, and fiduciary oversight.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowExportModal(true)}
          >
            <Icon name="document" size={15} />
            Export Vault Data
          </button>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={handleConveneCouncil}
          >
            <Icon name="family" size={15} />
            Convene Council
          </button>
        </div>
      </div>

      {/* RENDER BY NAV ID */}

      {/* 1. FAMILY MEMBERS */}
      {navId === "family_members" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Family Council Members"
              value={`${members.length} Members`}
              detail="3 Generations Represented"
              icon="family"
              tone="navy"
            />
            <MetricCard
              label="Consolidated Voting Quorum"
              value="100% Allocated"
              detail="G1: 60% · G2: 35% · G3: 5%"
              icon="shield"
              tone="gold"
            />
            <MetricCard
              label="Active Fiduciary Seats"
              value="4 Voting Trustees"
              detail="2 Next-Gen Observers"
              icon="user"
              tone="blue"
            />
            <MetricCard
              label="Next Assembly Date"
              value="Dec 15, 2026"
              detail="Annual Family Assembly"
              icon="calendar"
              tone="violet"
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
                  Family Assembly & Governance Roster
                </h3>
                <span className="card-sub">
                  Multi-generational voting allocations, committee assignments, and fiduciary status.
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["All", "G1", "G2", "G3"].map((gen) => (
                  <button
                    key={gen}
                    className={`btn ${memberFilter === gen ? "btn-primary" : "btn-outline"}`}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                    onClick={() => setMemberFilter(gen)}
                  >
                    {gen === "All" ? "All Generations" : `Generation ${gen.replace("G", "")}`}
                  </button>
                ))}
              </div>
            </div>

            <DataTable
              title="Family Roster"
              data={filteredMembers}
              columns={[
                {
                  key: "name",
                  header: "Family Member & Role",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.name}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.role}</span>
                    </div>
                  ),
                },
                {
                  key: "generation",
                  header: "Generation",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.generation.includes("G1")
                          ? "badge--navy"
                          : row.generation.includes("G2")
                          ? "badge--blue"
                          : "badge--gold"
                      }`}
                    >
                      {row.generation}
                    </span>
                  ),
                },
                {
                  key: "votingPower",
                  header: "Voting Quorum Share",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <strong style={{ color: "var(--ink)", minWidth: "32px" }}>{row.votingPower}%</strong>
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
                            width: `${row.votingPower * 2.5}%`,
                            height: "100%",
                            background: "var(--brand-primary)",
                          }}
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  key: "committee",
                  header: "Committee Appointment",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.committee}</span>
                  ),
                },
                {
                  key: "status",
                  header: "Fiduciary Status",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.status === "Active Trustee"
                          ? "badge--success"
                          : row.status === "Advisory Observer"
                          ? "badge--warning"
                          : "badge--info"
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 2. CONSOLIDATED WEALTH */}
      {navId === "consolidated_wealth" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Total Net Worth"
              value="$84,500,000"
              detail="Across 4 Master Entities"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Liquid Capital Reserves"
              value="$32,600,000"
              detail="Cash, Treasuries & Equities"
              icon="wallet"
              tone="blue"
            />
            <MetricCard
              label="Illiquid & Private Assets"
              value="$58,300,000"
              detail="PE, Direct Real Estate & Operating Cos"
              icon="pie"
              tone="navy"
            />
            <MetricCard
              label="Total Entity Debt"
              value="$6,300,000"
              detail="7.4% Debt-to-Asset Ratio"
              icon="card"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Consolidated Legal Entity Balance Sheet
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Audited multi-jurisdictional entity balance sheets with inter-company eliminations.
            </p>

            <DataTable
              title="Entities"
              data={wealthEntities}
              columns={[
                {
                  key: "entityName",
                  header: "Legal Entity & Domicile",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.entityName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.jurisdiction}</span>
                    </div>
                  ),
                },
                {
                  key: "entityType",
                  header: "Structure",
                  render: (row) => <span className="badge badge--navy">{row.entityType}</span>,
                },
                {
                  key: "liquidAssets",
                  header: "Liquid Assets",
                  render: (row) => (
                    <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                      ${(row.liquidAssets / 1000000).toFixed(1)}M
                    </span>
                  ),
                },
                {
                  key: "illiquidAssets",
                  header: "Illiquid Assets",
                  render: (row) => (
                    <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                      ${(row.illiquidAssets / 1000000).toFixed(1)}M
                    </span>
                  ),
                },
                {
                  key: "debt",
                  header: "Entity Liabilities",
                  render: (row) => (
                    <span style={{ color: row.debt > 0 ? "var(--accent-danger)" : "var(--muted)" }}>
                      {row.debt > 0 ? `-$${(row.debt / 1000000).toFixed(1)}M` : "$0"}
                    </span>
                  ),
                },
                {
                  key: "netWorth",
                  header: "Net Valuation",
                  render: (row) => (
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                      ${(row.netWorth / 1000000).toFixed(1)}M
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 3. INVESTMENTS */}
      {navId === "investments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Private Equity Portfolio NAV"
              value="$18,810,000"
              detail="+$4.3M Unrealized Gains"
              icon="pie"
              tone="navy"
            />
            <MetricCard
              label="Committed Capital"
              value="$14,500,000"
              detail="Total Master LP Commitments"
              icon="briefcase"
              tone="blue"
            />
            <MetricCard
              label="Unfunded Capital Calls"
              value="$3,700,000"
              detail="Liquidity Reserved in Treasuries"
              icon="alert"
              tone="gold"
            />
            <MetricCard
              label="Blended Portfolio IRR"
              value="24.8% Net"
              detail="1.84x MOIC Realized"
              icon="trending"
              tone="emerald"
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
                  Direct Private Equity & Co-Investment Vehicles
                </h3>
                <span className="card-sub">
                  Institutional GP/LP relationships, drawdown schedules, and capital call fulfillment.
                </span>
              </div>
            </div>

            <DataTable
              title="Private Equity"
              data={investments}
              columns={[
                {
                  key: "assetName",
                  header: "Fund / Direct Investment",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.assetName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Holder: {row.entity}</span>
                    </div>
                  ),
                },
                {
                  key: "assetClass",
                  header: "Asset Class",
                  render: (row) => <span className="badge badge--info">{row.assetClass}</span>,
                },
                {
                  key: "committedCapital",
                  header: "Committed / Funded",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                        ${(row.fundedCapital / 1000000).toFixed(2)}M
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        of ${(row.committedCapital / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  ),
                },
                {
                  key: "currentNav",
                  header: "Current Valuation",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>
                        ${(row.currentNav / 1000000).toFixed(2)}M
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--accent-success)", display: "block" }}>
                        +{row.irr}% Net IRR ({row.moic}x)
                      </span>
                    </div>
                  ),
                },
                {
                  key: "status",
                  header: "Status & Execution",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        className={`badge ${
                          row.status === "Capital Call Pending" ? "badge--warning" : "badge--success"
                        }`}
                      >
                        {row.status}
                      </span>
                      {row.status === "Capital Call Pending" && (
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: "11px", padding: "4px 8px" }}
                          onClick={() => handleFundCapitalCall(row.id)}
                        >
                          Disburse Draw (Simulated)
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

      {/* 4. PROPERTIES */}
      {navId === "properties" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Real Estate Assets"
              value="$36,900,000"
              detail="4 Prime Strategic Holdings"
              icon="home"
              tone="navy"
            />
            <MetricCard
              label="Average Rental Yield"
              value="5.4% Net"
              detail="Commercial & Seasonal Yields"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Portfolio LTV"
              value="11.2% LTV"
              detail="Conservative Debt Service"
              icon="shield"
              tone="gold"
            />
            <MetricCard
              label="Active Leases"
              value="100% Retained"
              detail="Institutional Grade Tenants"
              icon="check"
              tone="blue"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Direct Real Estate & Commercial Portfolio
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Global property holdings, occupancy covenants, debt ratios, and asset manager contacts.
            </p>

            <DataTable
              title="Properties"
              data={properties}
              columns={[
                {
                  key: "title",
                  header: "Property Title & Location",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.location}</span>
                    </div>
                  ),
                },
                {
                  key: "category",
                  header: "Class",
                  render: (row) => <span className="badge badge--navy">{row.category}</span>,
                },
                {
                  key: "valuation",
                  header: "Valuation (Est.)",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>
                        ${(row.valuation / 1000000).toFixed(1)}M
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        Acquired {row.acquisitionYear}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "occupancy",
                  header: "Occupancy & Yield",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--ink)", fontWeight: 500 }}>{row.occupancy}</span>
                      <span style={{ fontSize: "11px", color: "var(--accent-success)", display: "block" }}>
                        {row.rentalYield}% Annual Yield
                      </span>
                    </div>
                  ),
                },
                {
                  key: "managingPartner",
                  header: "Fiduciary Manager",
                  render: (row) => (
                    <div>
                      <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.managingPartner}</span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        LTV: {row.ltv}%
                      </span>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 5. BUSINESS HOLDINGS */}
      {navId === "business_holdings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Operating Company Holdings"
              value="$15,300,000"
              detail="3 Active Commercial Entities"
              icon="bank"
              tone="navy"
            />
            <MetricCard
              label="Aggregate Revenue"
              value="$124.1M / yr"
              detail="Operating Enterprise Top-line"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Annual Family Dividends"
              value="$5.8M / yr"
              detail="Consolidated Distribution Yield"
              icon="wallet"
              tone="blue"
            />
            <MetricCard
              label="Family Board Seats"
              value="6 Active Seats"
              detail="Full Strategic Governance"
              icon="user"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Operating Company Equity & Governance
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Operating business ventures, family equity ownership percentages, and director appointments.
            </p>

            <DataTable
              title="Operating Businesses"
              data={businesses}
              columns={[
                {
                  key: "companyName",
                  header: "Company & Sector",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.companyName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Sector: {row.sector}</span>
                    </div>
                  ),
                },
                {
                  key: "ownershipPct",
                  header: "Family Ownership",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>{row.ownershipPct}%</strong>
                      <span className="badge badge--info" style={{ display: "block", marginTop: "2px" }}>
                        {row.governanceStatus}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "annualRevenue",
                  header: "Financials (Rev / EBITDA)",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--ink)", fontWeight: 600 }}>{row.annualRevenue}</span>
                      <span style={{ fontSize: "11px", color: "var(--accent-success)", display: "block" }}>
                        EBITDA: {row.ebitda}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "boardSeats",
                  header: "Family Board Governance",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.boardSeats}</span>
                  ),
                },
                {
                  key: "dividendYield",
                  header: "Distribution Yield",
                  render: (row) => (
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                      +{row.dividendYield}% Net
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 6. TRUSTS */}
      {navId === "trusts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Trust Corpus Total"
              value="$51,900,000"
              detail="4 Fiduciary Trust Vehicles"
              icon="shield"
              tone="gold"
            />
            <MetricCard
              label="Generational Tax Protection"
              value="100% Sheltered"
              detail="Delaware & Wyoming Statutes"
              icon="check"
              tone="emerald"
            />
            <MetricCard
              label="Institutional Fiduciaries"
              value="Northern Trust & JPM"
              detail="Independent Corporate Trustees"
              icon="bank"
              tone="navy"
            />
            <MetricCard
              label="Annual Statutory Filings"
              value="Form 1041 Verified"
              detail="All Fiduciary Returns Current"
              icon="document"
              tone="blue"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Multi-Generational Trust Vehicles
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Dynasty, GRAT, and philanthropic trusts governing perpetual asset protection.
            </p>

            <DataTable
              title="Trusts"
              data={trusts}
              columns={[
                {
                  key: "trustName",
                  header: "Trust Entity & Domicile",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.trustName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        Domicile: {row.governingState} · Trustee: {row.institutionalTrustee}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "trustType",
                  header: "Structure Type",
                  render: (row) => <span className="badge badge--navy">{row.trustType}</span>,
                },
                {
                  key: "corpusValue",
                  header: "Corpus Valuation",
                  render: (row) => (
                    <strong style={{ color: "var(--ink)" }}>
                      ${(row.corpusValue / 1000000).toFixed(1)}M
                    </strong>
                  ),
                },
                {
                  key: "distributionPolicy",
                  header: "Distribution Standard",
                  render: (row) => (
                    <span style={{ fontSize: "11.5px", color: "var(--muted)", maxWidth: "280px", display: "block" }}>
                      {row.distributionPolicy}
                    </span>
                  ),
                },
                {
                  key: "taxStatus",
                  header: "Tax Classification",
                  render: (row) => <span className="badge badge--gold">{row.taxStatus}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 7. ESTATE PLANNING */}
      {navId === "estate_planning" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Lifetime Exemption Used"
              value="$27.22M"
              detail="Federal Couple Cap Leveraged"
              icon="document"
              tone="gold"
            />
            <MetricCard
              label="Surplus Liquidity Coverage"
              value="+$8.4M Surplus"
              detail="ILIT Death Benefits vs Est. Taxes"
              icon="wallet"
              tone="emerald"
            />
            <MetricCard
              label="GST Exemption Allocations"
              value="100% Optimized"
              detail="Zero Estate Inclusion for G3"
              icon="shield"
              tone="navy"
            />
            <MetricCard
              label="Legal Counsel Review"
              value="Sullivan & Cromwell"
              detail="Estate Counsel Retained"
              icon="briefcase"
              tone="blue"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Estate & Generational Wealth Transfer Milestones
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Federal exemption utilization, gift tax filings, and liquidity planning safeguards.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {estateChecklist.map((item) => (
                <div
                  key={item.id}
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
                    <strong style={{ color: "var(--ink)", display: "block", fontSize: "14px" }}>
                      {item.item}
                    </strong>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>{item.detail}</span>
                  </div>
                  <span className={`badge badge--${item.badge}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. SUCCESSION PLANNING */}
      {navId === "succession_planning" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Succession Readiness Index"
              value="88% Readiness"
              detail="Next-Gen Leadership Council Active"
              icon="user"
              tone="emerald"
            />
            <MetricCard
              label="Mentorship Milestones"
              value="12 Completed"
              detail="Board Shadowing & Financial Mastery"
              icon="sparkle"
              tone="blue"
            />
            <MetricCard
              label="G3 Assembly Voting"
              value="Ratified"
              detail="Formal Seats at Age 25 Protocol"
              icon="check"
              tone="navy"
            />
            <MetricCard
              label="Charter Revision"
              value="Charter 2024"
              detail="Ratified by 100% of G1 & G2"
              icon="document"
              tone="gold"
            />
          </div>

          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Next-Gen Leadership Readiness
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Assessment of financial literacy, governance experience, and leadership readiness.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <strong style={{ color: "var(--ink)", fontSize: "13.5px" }}>
                      Sophia Pendelton (G3) · Philanthropy & ESG
                    </strong>
                    <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>92% Ready</span>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                    <div style={{ width: "92%", height: "100%", background: "var(--accent-success)" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px", display: "block" }}>
                    Fellowship at Cambridge Institute completed. Chairs Philanthropic Grants Committee.
                  </span>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <strong style={{ color: "var(--ink)", fontSize: "13.5px" }}>
                      Alexander Pendelton (G3) · Venture & Direct Co-Investments
                    </strong>
                    <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>84% Ready</span>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-subtle)", borderRadius: "3px" }}>
                    <div style={{ width: "84%", height: "100%", background: "var(--accent-blue)" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px", display: "block" }}>
                    Investment banking analyst background. Serving as board observer for BioMolecular Labs.
                  </span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Family Constitution & Succession Roadmap
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Core constitutional governance covenants ratified by the Family Council.
              </p>

              <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--muted)", fontSize: "13px", lineHeight: "1.8" }}>
                <li>
                  <strong style={{ color: "var(--ink)" }}>Next-Gen Age Protocol:</strong> Mandatory board
                  observer credentials upon reaching age 25; voting rights activated at age 30.
                </li>
                <li>
                  <strong style={{ color: "var(--ink)" }}>Supermajority Voting:</strong> Asset transfers or PE exits
                  exceeding $10M require 75% approval across G1 and G2 branches.
                </li>
                <li>
                  <strong style={{ color: "var(--ink)" }}>Outside Employment Requirement:</strong> At least 3 years
                  of non-family commercial experience required prior to full-time family office role.
                </li>
                <li>
                  <strong style={{ color: "var(--ink)" }}>Mediation Covenant:</strong> Mandatory private arbitration
                  clause in Wilmington, Delaware prior to any judicial proceeding.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 9. DOCUMENTS */}
      {navId === "documents" && (
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
                  Family Office Legal & Fiduciary Vault
                </h3>
                <span className="card-sub">
                  Cryptographically secured deeds, operating agreements, trust indentures, and tax filings.
                </span>
              </div>
              <button
                className="btn btn-outline"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => {
                  showToast({
                    title: "Vault Synchronized",
                    message: "All 48 fiduciary records verified with institutional SHA-256 seals.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="shield" size={14} />
                Verify SHA-256 Seals
              </button>
            </div>

            <DataTable
              title="Fiduciary Documents"
              data={[
                {
                  id: "doc-1",
                  title: "Pendelton Delaware Dynasty Trust Indenture (Restated 2023)",
                  category: "Trust Charter",
                  date: "Oct 12, 2023",
                  signatories: "Arthur Pendelton & Northern Trust Co.",
                  status: "Enforceable & Sealed",
                },
                {
                  id: "doc-2",
                  title: "Mayfair London Commercial Freehold Title & Deed",
                  category: "Real Estate Deed",
                  date: "Jun 14, 2018",
                  signatories: "HM Land Registry UK",
                  status: "Enforceable & Sealed",
                },
                {
                  id: "doc-3",
                  title: "Pendelton Capital Partners LLC Operating Agreement",
                  category: "Entity Bylaws",
                  date: "Jan 10, 2022",
                  signatories: "Arthur, Victoria & Richard Pendelton",
                  status: "Enforceable & Sealed",
                },
                {
                  id: "doc-4",
                  title: "IRS Form 709 Gift & GST Tax Annual Disclosure Pack",
                  category: "Tax Filing",
                  date: "Apr 15, 2026",
                  signatories: "PricewaterhouseCoopers LLP (Lead Partner)",
                  status: "IRS Accepted",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Document Title",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        Signatories: {row.signatories}
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
                  key: "date",
                  header: "Effective Date",
                  render: (row) => <span style={{ color: "var(--ink)", fontSize: "12px" }}>{row.date}</span>,
                },
                {
                  key: "status",
                  header: "Vault Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 10. REPORTS */}
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
                  Consolidated Family Office Reports
                </h3>
                <span className="card-sub">
                  Quarterly family assembly briefings, tax compliance packs, and liquidity forecasts.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={14} />
                Generate Comprehensive Pack
              </button>
            </div>

            <DataTable
              title="Reports"
              data={[
                {
                  id: "rep-1",
                  title: "Q2 2026 Consolidated Multi-Entity Financial Statement",
                  period: "Q2 2026 (Apr - Jun)",
                  entities: "All 4 Master Entities ($84.5M NAV)",
                  status: "Audited & Certified",
                },
                {
                  id: "rep-2",
                  title: "Private Equity Unfunded Capital Call Exposure Analysis",
                  period: "2026 - 2028 Forecast",
                  entities: "Sequoia, a16z, Blackstone ($3.7M Unfunded)",
                  status: "Liquidity Matched",
                },
                {
                  id: "rep-3",
                  title: "Annual Family Council Assembly Governance Brief",
                  period: "Dec 2026 Meeting Deck",
                  entities: "G1, G2, G3 Voting & Succession Resolutions",
                  status: "Draft Ready",
                },
                {
                  id: "rep-4",
                  title: "Estate Tax Exemption & Generational Transfer Audit",
                  period: "2026 Statutory Review",
                  entities: "Dynasty Trust & ILIT ($27.22M Leveraged)",
                  status: "Partner Certified",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Report Title & Scope",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Entities: {row.entities}</span>
                    </div>
                  ),
                },
                {
                  key: "period",
                  header: "Reporting Period",
                  render: (row) => <span style={{ color: "var(--ink)", fontSize: "12px" }}>{row.period}</span>,
                },
                {
                  key: "status",
                  header: "Fiduciary Attestation",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 11. SETTINGS */}
      {navId === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Family Office Governance Parameters
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Entity voting quorum thresholds and fiduciary authorization levels.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Major Capital Expenditure Quorum
                  </label>
                  <select className="select" defaultValue="75" style={{ width: "100%" }}>
                    <option value="66">66.7% Supermajority Approval</option>
                    <option value="75">75% Supermajority Approval (Current)</option>
                    <option value="100">100% Unanimous Family Council</option>
                  </select>
                  <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px", display: "block" }}>
                    Applies to any asset acquisition or liquidation exceeding $5,000,000.
                  </span>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Next-Gen Voting Activation Age
                  </label>
                  <select className="select" defaultValue="25" style={{ width: "100%" }}>
                    <option value="21">Age 21 (Associate)</option>
                    <option value="25">Age 25 with Board Observer status (Current)</option>
                    <option value="30">Age 30 with Full Fiduciary Seat</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Hardware Security & Access Control
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Zero-trust authentication policies for all family trustees and advisors.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      FIDO2 Hardware Key Enforcement
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Mandatory YubiKey verification for funds disbursements
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      Multi-Party Wire Sign-Off
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Dual-signature authorization on wires exceeding $250,000
                    </span>
                  </div>
                  <span className="badge badge--success">Active</span>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ marginTop: "8px", fontSize: "12px" }}
                  onClick={() => {
                    showToast({
                      title: "Settings Saved",
                      message: "Family Office governance rules and security policies updated.",
                      tone: "success",
                    })
                  }}
                >
                  Save Governance Policies
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
        title="Export Family Office Vault Data"
        defaultFilename="Family_Office_Consolidated_Ledger"
        headers={[
          "Entity Name",
          "Structure",
          "Liquid Assets",
          "Illiquid Assets",
          "Liabilities",
          "Net Valuation",
          "Fiduciary Trustee",
        ]}
        data={wealthEntities.map((e) => [
          e.entityName,
          e.entityType,
          `$${(e.liquidAssets / 1000000).toFixed(2)}M`,
          `$${(e.illiquidAssets / 1000000).toFixed(2)}M`,
          `$${(e.debt / 1000000).toFixed(2)}M`,
          `$${(e.netWorth / 1000000).toFixed(2)}M`,
          "Northern Trust / Fiduciary Counsel",
        ])}
      />
    </div>
  )
}
