import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal } from "../../components/modals"

export interface FamilyOfficeDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function FamilyOfficeDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: FamilyOfficeDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"governance" | "capitalCalls">(
    "governance",
  )
  const [entityFilter, setEntityFilter] =
    useState<"all" | "investments" | "properties" | "businesses" | "trusts">(
      "all",
    )
  const [showExportModal, setShowExportModal] = useState(false)

  // Family Council & Governance resolutions mock data
  const governanceResolutions = [
    {
      id: "res1",
      title: "Charter Amendment: G3 Voting Representation",
      description:
        "Ratify voting seats for Generation 3 members (Sophia & Alexander) upon reaching age 25.",
      sponsor: "Arthur Pendelton (G1 Chair)",
      deadline: "Annual Assembly · Dec 15",
      votesStatus: "3 of 4 Approved",
      status: "Voting Open",
      statusTone: "warning",
    },
    {
      id: "res2",
      title: "Sequoia Growth VI Capital Call Authorization",
      description:
        "Approve $450,000 tranche draw funded from Delaware Dynasty Trust liquidity sleeve.",
      sponsor: "Victoria Pendelton (G2 PE Lead)",
      deadline: "Due Jun 18",
      votesStatus: "Unanimously Approved",
      status: "Ready to Fund",
      statusTone: "success",
    },
    {
      id: "res3",
      title: "Philanthropic Foundation Clean Water Grant",
      description:
        "Authorize $250,000 endowment distribution to Global Water Initiative.",
      sponsor: "Eleanor Pendelton (Foundation Chair)",
      deadline: "Q3 Disbursal",
      votesStatus: "Approved by Board",
      status: "Disbursed",
      statusTone: "info",
    },
    {
      id: "res4",
      title: "Mayfair London Office Refinancing Term Sheet",
      description:
        "Review $12M fixed-rate facility to replace floating debt on 100% leased commercial holding.",
      sponsor: "Richard Pendelton (G2 Real Estate Lead)",
      deadline: "Jul 30 Expiry",
      votesStatus: "Under Review",
      status: "Legal Review",
      statusTone: "warning",
    },
  ]

  // Capital Calls & Private Equity drawdown schedule
  const capitalCalls = [
    {
      id: "cc1",
      fundName: "Sequoia Growth Fund VI",
      assetClass: "Growth Private Equity",
      callAmount: "$450,000",
      totalCommitment: "$5,000,000",
      fundedPct: "72% Funded",
      dueDate: "June 18, 2026",
      sourceEntity: "Dynasty Trust (JPMorgan)",
      status: "Action Required",
      statusTone: "warning",
    },
    {
      id: "cc2",
      fundName: "Andreessen Horowitz Seed VII",
      assetClass: "Early-Stage Venture",
      callAmount: "$120,000",
      totalCommitment: "$3,000,000",
      fundedPct: "85% Funded",
      dueDate: "July 08, 2026",
      sourceEntity: "Pendelton Capital Partners LLC",
      status: "Scheduled",
      statusTone: "info",
    },
    {
      id: "cc3",
      fundName: "Blackstone Global Infrastructure II",
      assetClass: "Core Real Assets",
      callAmount: "$300,000",
      totalCommitment: "$4,000,000",
      fundedPct: "60% Funded",
      dueDate: "August 14, 2026",
      sourceEntity: "Wyoming RE Holdings LLC",
      status: "Upcoming",
      statusTone: "info",
    },
    {
      id: "cc4",
      fundName: "Insight Partners XII",
      assetClass: "Software Scaleup PE",
      callAmount: "$200,000",
      totalCommitment: "$2,500,000",
      fundedPct: "90% Funded",
      dueDate: "Completed May 20",
      sourceEntity: "Pendelton Capital Partners LLC",
      status: "Funded & Reconciled",
      statusTone: "success",
    },
  ]

  // Legal Entities and Direct Holdings directory
  const entitiesDirectory = [
    {
      id: "e1",
      name: "Pendelton Delaware Dynasty Trust",
      jurisdiction: "Delaware, USA (Perpetual)",
      category: "trusts",
      categoryLabel: "Family Trust",
      beneficialInterest: "Arthur, Eleanor & Next-Gen Heirs",
      nav: "$32,400,000",
      liquidBuffer: "$8,200,000",
      status: "Fully Compliant",
      statusTone: "success",
    },
    {
      id: "e2",
      name: "Pendelton Capital Partners LLC",
      jurisdiction: "Wyoming, USA",
      category: "investments",
      categoryLabel: "PE & Venture Holding",
      beneficialInterest: "Victoria (50%), Richard (50%)",
      nav: "$18,600,000",
      liquidBuffer: "$3,100,000",
      status: "Active Holding",
      statusTone: "success",
    },
    {
      id: "e3",
      name: "Mayfair London Office Commercial Estate",
      jurisdiction: "London, United Kingdom",
      category: "properties",
      categoryLabel: "Direct Real Estate",
      beneficialInterest: "Pendelton Real Estate UK Ltd",
      nav: "$15,200,000",
      liquidBuffer: "Cash Flowing (£1.1M/yr)",
      status: "100% Leased",
      statusTone: "success",
    },
    {
      id: "e4",
      name: "Aspen Mountain Alpine Estate",
      jurisdiction: "Colorado, USA",
      category: "properties",
      categoryLabel: "Direct Real Estate",
      beneficialInterest: "Pendelton Lifestyle Holdings",
      nav: "$11,200,000",
      liquidBuffer: "Direct Ownership",
      status: "Appraised",
      statusTone: "success",
    },
    {
      id: "e5",
      name: "Apex Precision Engineering Corp",
      jurisdiction: "Delaware, USA",
      category: "businesses",
      categoryLabel: "Operating Company",
      beneficialInterest: "82% Controlling Voting Interest",
      nav: "$15,300,000",
      liquidBuffer: "EBITDA: $3.8M",
      status: "Audited & Cash Positive",
      statusTone: "success",
    },
    {
      id: "e6",
      name: "Pendelton Global Philanthropic Foundation",
      jurisdiction: "501(c)(3) Endowment",
      category: "trusts",
      categoryLabel: "Charitable Trust",
      beneficialInterest: "Family Philanthropy Council",
      nav: "$14,200,000",
      liquidBuffer: "$1.4M Grant Pool",
      status: "IRS 990-PF Filed",
      statusTone: "success",
    },
  ]

  // Filter legal entities
  const filteredEntities = useMemo(() => {
    if (entityFilter === "all") return entitiesDirectory
    return entitiesDirectory.filter((e) => e.category === entityFilter)
  }, [entityFilter])

  const entityColumns = [
    {
      key: "name",
      header: "Legal Entity / Asset Holding",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10.5px" }}>
            Jurisdiction: {row.jurisdiction}
          </small>
        </div>
      ),
    },
    {
      key: "categoryLabel",
      header: "Asset Class / Entity Type",
      render: (row: any) => (
        <span className="badge badge--info">{row.categoryLabel}</span>
      ),
    },
    {
      key: "beneficialInterest",
      header: "Beneficial Ownership & Governance",
      render: (row: any) => (
        <span
          style={{ fontSize: "12px", color: "var(--ink)", fontWeight: 500 }}
        >
          {row.beneficialInterest}
        </span>
      ),
    },
    {
      key: "nav",
      header: "Net Asset Value (NAV)",
      render: (row: any) => (
        <div>
          <strong
            style={{ color: "var(--primary-dark)", font: "700 13px 'Manrope'" }}
          >
            {row.nav}
          </strong>
          <small
            style={{
              display: "block",
              color: "var(--muted)",
              fontSize: "10px",
            }}
          >
            {row.liquidBuffer}
          </small>
        </div>
      ),
    },
    {
      key: "status",
      header: "Governance / Audit Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard family-office-dashboard">
      {/* 1. Hero Header & Multi-Generational Family Office Credentials */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--success">
              SINGLE FAMILY OFFICE · EST. 1984
            </span>
            <span>
              Managing $84.5M Across 3 Generations & 14 Legal Entities
            </span>
          </div>
          <h1 className="hero-title">Arthur Pendelton & Family</h1>
          <p className="hero-subtitle">
            Executive Managing Director · Pendelton Family Office. Consolidated
            multi-entity balance sheet, direct private equity, real estate
            holdings, family governance, and multi-generational succession.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Family Members")}
          >
            <Icon name="family" size={16} />
            <span>Convene Family Council</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onOpenAI}
          >
            <Icon name="ai" size={16} />
            <span>AI Governance Co-Pilot</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Family Office Metric Cards */}
      <section className="metric-grid" aria-label="Family Office Metrics">
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
          if (act.id === "convene_council") onNavigate("Family Members")
          else if (act.id === "fund_capital_call") {
            showToast({
              title: "Capital Call Authorized",
              message:
                "Disbursing $450,000 for Sequoia Growth Fund VI via Delaware Dynasty Trust liquidity sleeve.",
              tone: "success",
            })
          } else if (act.id === "review_entities") onNavigate("Trusts")
          else if (act.id === "grant_approval") onNavigate("Estate Planning")
          else onOpenAI()
        }}
      />

      {/* 4. Consolidated Balance Sheet & Multi-Generational Asset Allocation */}
      <section className="dashboard-grid">
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">Consolidated Wealth Allocation</span>
              <span className="card-sub">
                Total Net Worth: $84,500,000 across liquid, real estate, &
                operating cos
              </span>
            </div>
            <span className="badge badge--success">+$6.2M YoY Gain</span>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
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
                Consolidated Balance Sheet Distribution
              </span>
              <strong
                style={{ font: "700 20px 'Manrope'", color: "var(--ink)" }}
              >
                $84.5M Consolidated
              </strong>
            </div>

            {/* Visual Multi-segment Bar */}
            <div
              style={{
                height: "14px",
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                background: "var(--surface-3)",
              }}
            >
              <div
                style={{ width: "50.6%", background: "var(--primary)" }}
                title="Investments & Liquid PE (50.6%)"
              />
              <div
                style={{ width: "31.2%", background: "#0ea5e9" }}
                title="Prime Real Estate (31.2%)"
              />
              <div
                style={{ width: "18.2%", background: "#8b5cf6" }}
                title="Operating Businesses (18.2%)"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  borderLeft: "3px solid var(--primary)",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Investments & PE
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>
                  $42.8M (50.6%)
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--primary-dark)",
                    display: "block",
                  }}
                >
                  Liquid & PE Sleeve
                </span>
              </div>

              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  borderLeft: "3px solid #0ea5e9",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Direct Properties
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>
                  $26.4M (31.2%)
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#0284c7",
                    display: "block",
                  }}
                >
                  5 Global Estates
                </span>
              </div>

              <div
                style={{
                  padding: "10px",
                  background: "var(--surface-2)",
                  borderRadius: "8px",
                  borderLeft: "3px solid #8b5cf6",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  Operating Cos
                </span>
                <b style={{ color: "var(--ink)", fontSize: "14px" }}>
                  $15.3M (18.2%)
                </b>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#7c3aed",
                    display: "block",
                  }}
                >
                  Apex Engineering (82%)
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "4px",
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
                  Liquidity & Capital Call Reserves
                </b>
                <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                  Unfunded PE Commitments: $3.2M · Unencumbered Cash: $12.4M
                </small>
              </div>
              <span className="badge badge--success">3.8x Coverage Ratio</span>
            </div>
          </div>
        </div>

        {/* Multi-Generational Wealth & Entity Tree Structure */}
        <div className="card" style={{ padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">
                Family Ownership & Governance Tree
              </span>
              <span className="card-sub">
                3 Generations · 7 Living Members · 5 Trusts & Holding LLCs
              </span>
            </div>
            <span className="badge badge--emerald">88% Succession Ready</span>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* G1 Card */}
            <div
              style={{
                padding: "12px",
                background: "var(--surface-2)",
                borderRadius: "8px",
                borderLeft: "4px solid var(--primary)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span
                    className="badge badge--primary"
                    style={{ fontSize: "9px" }}
                  >
                    GENERATION 1 · FOUNDERS
                  </span>
                  <b
                    style={{
                      display: "block",
                      color: "var(--ink)",
                      fontSize: "13px",
                      marginTop: "2px",
                    }}
                  >
                    Arthur & Eleanor Pendelton
                  </b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                    Family Council Chairs · Grantors of Delaware Dynasty Trust &
                    Foundation
                  </small>
                </div>
                <span className="badge badge--success">100% Voting Rights</span>
              </div>
            </div>

            {/* G2 Card */}
            <div
              style={{
                padding: "12px",
                background: "var(--surface-2)",
                borderRadius: "8px",
                borderLeft: "4px solid #0ea5e9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span
                    className="badge badge--info"
                    style={{ fontSize: "9px" }}
                  >
                    GENERATION 2 · PRINCIPALS
                  </span>
                  <b
                    style={{
                      display: "block",
                      color: "var(--ink)",
                      fontSize: "13px",
                      marginTop: "2px",
                    }}
                  >
                    Victoria Pendelton (PE) & Richard Pendelton (Real Estate)
                  </b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                    Managing Partners · Co-Trustees of Wyoming RE & Capital
                    Partners LLCs
                  </small>
                </div>
                <span className="badge badge--info">Operating Control</span>
              </div>
            </div>

            {/* G3 Card */}
            <div
              style={{
                padding: "12px",
                background: "var(--surface-2)",
                borderRadius: "8px",
                borderLeft: "4px solid #8b5cf6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span
                    className="badge badge--violet"
                    style={{ fontSize: "9px" }}
                  >
                    GENERATION 3 · NEXT-GEN HEIRS
                  </span>
                  <b
                    style={{
                      display: "block",
                      color: "var(--ink)",
                      fontSize: "13px",
                      marginTop: "2px",
                    }}
                  >
                    Sophia (24), Alexander (22), & Liam (19) Pendelton
                  </b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                    Beneficiaries · Next-Gen Financial Literacy & Governance
                    Council Mentees
                  </small>
                </div>
                <span className="badge badge--warning">Mentorship Track</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabbed Card: Succession Council & Governance vs Capital Calls Schedule */}
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
              Governance Execution & Alternative Investments Desk
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
              Review family council voting resolutions and PE capital drawdowns
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "governance"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("governance")}
            >
              <Icon name="family" size={14} />
              <span>Council Resolutions (4)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeTab === "capitalCalls"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveTab("capitalCalls")}
            >
              <Icon name="trending" size={14} />
              <span>Capital Calls Schedule (4)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Governance Resolutions */}
        {activeTab === "governance" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {governanceResolutions.map((res) => (
              <div
                key={res.id}
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
                      {res.title}
                    </b>
                    <span className={`badge badge--${res.statusTone}`}>
                      {res.status}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "8px 0 12px",
                      fontSize: "12px",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {res.description}
                  </p>
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
                  <span>Sponsor: {res.sponsor}</span>
                  <span
                    style={{ fontWeight: 600, color: "var(--primary-dark)" }}
                  >
                    {res.votesStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Capital Calls Schedule */}
        {activeTab === "capitalCalls" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
              marginTop: "16px",
            }}
          >
            {capitalCalls.map((cc) => (
              <div
                key={cc.id}
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
                    }}
                  >
                    <div>
                      <b style={{ color: "var(--ink)", fontSize: "13.5px" }}>
                        {cc.fundName}
                      </b>
                      <small
                        style={{
                          display: "block",
                          color: "var(--muted)",
                          fontSize: "11px",
                        }}
                      >
                        {cc.assetClass} · Total Commitment: {cc.totalCommitment}
                      </small>
                    </div>
                    <span className={`badge badge--${cc.statusTone}`}>
                      {cc.status}
                    </span>
                  </div>

                  <div
                    style={{
                      margin: "12px 0",
                      padding: "10px",
                      background: "var(--surface)",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          color: "var(--muted)",
                          display: "block",
                        }}
                      >
                        Drawdown Amount
                      </span>
                      <strong
                        style={{
                          font: "700 15px 'Manrope'",
                          color: "var(--primary-dark)",
                        }}
                      >
                        {cc.callAmount}
                      </strong>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: "10.5px",
                          color: "var(--muted)",
                          display: "block",
                        }}
                      >
                        Due Date
                      </span>
                      <b style={{ fontSize: "12px", color: "var(--ink)" }}>
                        {cc.dueDate}
                      </b>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "11px",
                    color: "var(--muted)",
                  }}
                >
                  <span>Route: {cc.sourceEntity}</span>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    onClick={() =>
                      showToast({
                        title: "Wire Authorized",
                        message: `Funding ${cc.callAmount} for ${cc.fundName} from ${cc.sourceEntity}. Wire dispatched to custodian.`,
                        tone: "success",
                      })
                    }
                  >
                    Authorize Wire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Legal Entities & Direct Holdings Table */}
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
              Family Legal Entities & Direct Holdings Registry (
              {filteredEntities.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Multi-entity consolidation, asset valuations, and beneficial
              ownership audit
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
              All Entities (6)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "investments"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEntityFilter("investments")}
            >
              PE & Liquid (1)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "properties"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEntityFilter("properties")}
            >
              Real Estate (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "businesses"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEntityFilter("businesses")}
            >
              Operating Cos (1)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                entityFilter === "trusts"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setEntityFilter("trusts")}
            >
              Trusts & Fdn (2)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={entityColumns}
          data={filteredEntities}
          searchPlaceholder="Search legal entity, trustee, or jurisdiction..."
          actionButton={{
            label: "Export Consolidated Balance Sheet",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Institutional Governance & Master Vault Notice */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Family Office Governance & Security Protocol:</strong> All
          legal entity valuations, capital call commitments, and next-generation
          succession metrics are encrypted with AES-256 multi-signature quorum
          safeguards. Inter-entity transfers and capital disbursements require
          dual-trustee cryptographic authorization.
        </div>
      </section>

      {/* Interactive Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Consolidated Family Office Balance Sheet"
        defaultFilename="pendelton_family_office_balance_sheet"
        headers={[
          "Legal Entity / Holding",
          "Asset Class / Type",
          "Beneficial Ownership",
          "Net Asset Value (NAV)",
          "Status",
        ]}
        data={filteredEntities.map((e) => [
          `${e.name} (${e.jurisdiction})`,
          e.categoryLabel,
          e.beneficialInterest,
          e.nav,
          e.status,
        ])}
      />
    </div>
  )
}

export default FamilyOfficeDashboard
