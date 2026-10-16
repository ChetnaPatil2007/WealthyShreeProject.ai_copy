import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { ExportModal, OnboardClientModal } from "../../components/modals"
import type { MockClient } from "../../services/mockData"

export interface PrivateBankPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface PrivateBankClientItem {
  id: string
  clientName: string
  tier: "Tier 1 Sovereign & Mega UHNW ($25M+)" | "Tier 2 UHNW ($10M-$25M)" | "Tier 3 HNW ($5M-$10M)"
  totalRelationship: number
  lombardCreditLine: number
  lombardDrawn: number
  ltv: number
  relationshipManager: string
  kycStatus: "Verified" | "Recertification Due" | "Enhanced Due Diligence"
  residence: string
}

interface WealthPortfolioItem {
  id: string
  accountNumber: string
  mandateName: string
  clientName: string
  strategy: "Global Multi-Asset Absolute Return" | "Bespoke Fixed Income & Credit" | "Tactical Global Macro" | "ESG & NextGen Capital"
  aum: number
  ytdReturn: number
  benchmarkReturn: number
  cashBuffer: number
  riskCategory: "Conservative Wealth Preservation" | "Balanced Growth" | "Aggressive Capital Appreciation"
}

interface BankingServiceFacility {
  id: string
  facilityType: "Lombard Credit Facility" | "Bespoke Real Estate Term Facility" | "FX Forward & Collar Line" | "Physical Bullion Vaulting"
  clientName: string
  creditLimit: number
  currentDraw: number
  interestRate: string
  collateralPledged: string
  expiryDate: string
  status: "Active & Performing" | "Margin Warning" | "Renewal Pending"
}

interface ClientRequestItem {
  id: string
  requestNumber: string
  clientName: string
  category: "Wire Transfer" | "Lombard Facility Increase" | "FX Block Execution" | "Private Asset Escrow"
  amount: string
  requestedAt: string
  urgency: "Immediate VIP" | "Standard (Same Day)" | "Routine"
  status: "Pending Senior Banker Sign-Off" | "Compliance Verified" | "Disbursed / Settled"
}

export function PrivateBankModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: PrivateBankPageProps) {
  const { showToast } = useToast()
  const [showExportModal, setShowExportModal] = useState(false)
  const [showOnboardModal, setShowOnboardModal] = useState(false)

  // 1. Clients State
  const [clients, setClients] = useState<PrivateBankClientItem[]>([
    {
      id: "pbc-1",
      clientName: "Lord Julian & Lady Alistair Vance",
      tier: "Tier 1 Sovereign & Mega UHNW ($25M+)",
      totalRelationship: 68500000,
      lombardCreditLine: 25000000,
      lombardDrawn: 14200000,
      ltv: 20.7,
      relationshipManager: "Jean-Paul Laurent (MD)",
      kycStatus: "Verified",
      residence: "Geneva, Switzerland / London",
    },
    {
      id: "pbc-2",
      clientName: "Baroness Helene de Montmirail",
      tier: "Tier 1 Sovereign & Mega UHNW ($25M+)",
      totalRelationship: 48200000,
      lombardCreditLine: 18000000,
      lombardDrawn: 8500000,
      ltv: 17.6,
      relationshipManager: "Jean-Paul Laurent (MD)",
      kycStatus: "Verified",
      residence: "Monaco / Paris, France",
    },
    {
      id: "pbc-3",
      clientName: "Dr. Chen Wei & Family Trust",
      tier: "Tier 2 UHNW ($10M-$25M)",
      totalRelationship: 22400000,
      lombardCreditLine: 8000000,
      lombardDrawn: 4200000,
      ltv: 18.7,
      relationshipManager: "Claire Beaumont (VP)",
      kycStatus: "Verified",
      residence: "Singapore / Zurich",
    },
    {
      id: "pbc-4",
      clientName: "Soren & Ingrid Lindqvist",
      tier: "Tier 2 UHNW ($10M-$25M)",
      totalRelationship: 16800000,
      lombardCreditLine: 5000000,
      lombardDrawn: 3100000,
      ltv: 18.4,
      relationshipManager: "Claire Beaumont (VP)",
      kycStatus: "Recertification Due",
      residence: "Stockholm, Sweden",
    },
    {
      id: "pbc-5",
      clientName: "Marcus Thorne, Principal Holdings",
      tier: "Tier 3 HNW ($5M-$10M)",
      totalRelationship: 8900000,
      lombardCreditLine: 3500000,
      lombardDrawn: 2400000,
      ltv: 26.9,
      relationshipManager: "Marc Dupuis (Associate)",
      kycStatus: "Verified",
      residence: "New York / Miami, USA",
    },
  ])
  const [tierFilter, setTierFilter] = useState("All")
  const [clientSearch, setClientSearch] = useState("")

  // 2. Wealth Portfolios State
  const [portfolios] = useState<WealthPortfolioItem[]>([
    {
      id: "wp-1",
      accountNumber: "PB-SWISS-008129",
      mandateName: "Vance Dynasty Global Discretionary Mandate",
      clientName: "Lord Julian Vance",
      strategy: "Global Multi-Asset Absolute Return",
      aum: 42500000,
      ytdReturn: 12.4,
      benchmarkReturn: 9.8,
      cashBuffer: 4800000,
      riskCategory: "Balanced Growth",
    },
    {
      id: "wp-2",
      accountNumber: "PB-SWISS-009418",
      mandateName: "Montmirail Capital Preservation Sleeve",
      clientName: "Baroness Helene de Montmirail",
      strategy: "Bespoke Fixed Income & Credit",
      aum: 31800000,
      ytdReturn: 7.9,
      benchmarkReturn: 6.2,
      cashBuffer: 3200000,
      riskCategory: "Conservative Wealth Preservation",
    },
    {
      id: "wp-3",
      accountNumber: "PB-SING-004112",
      mandateName: "Wei Family Asian Technology & Life Sciences",
      clientName: "Dr. Chen Wei",
      strategy: "Tactical Global Macro",
      aum: 18200000,
      ytdReturn: 16.8,
      benchmarkReturn: 11.5,
      cashBuffer: 1900000,
      riskCategory: "Aggressive Capital Appreciation",
    },
    {
      id: "wp-4",
      accountNumber: "PB-NORDIC-003291",
      mandateName: "Lindqvist Clean Transition ESG Mandate",
      clientName: "Soren Lindqvist",
      strategy: "ESG & NextGen Capital",
      aum: 13700000,
      ytdReturn: 10.2,
      benchmarkReturn: 8.9,
      cashBuffer: 1400000,
      riskCategory: "Balanced Growth",
    },
  ])

  // 3. Banking Services / Credit Lines State
  const [bankingFacilities, setBankingFacilities] = useState<BankingServiceFacility[]>([
    {
      id: "bf-1",
      facilityType: "Lombard Credit Facility",
      clientName: "Lord Julian Vance",
      creditLimit: 25000000,
      currentDraw: 14200000,
      interestRate: "SOFR + 1.15%",
      collateralPledged: "$42.5M Tier 1 Equities & Sovereigns",
      expiryDate: "Oct 2027",
      status: "Active & Performing",
    },
    {
      id: "bf-2",
      facilityType: "Bespoke Real Estate Term Facility",
      clientName: "Baroness Helene de Montmirail",
      creditLimit: 18000000,
      currentDraw: 8500000,
      interestRate: "EURIBOR + 1.25%",
      collateralPledged: "Cap d'Antibes Commercial Freehold",
      expiryDate: "Dec 2028",
      status: "Active & Performing",
    },
    {
      id: "bf-3",
      facilityType: "FX Forward & Collar Line",
      clientName: "Dr. Chen Wei",
      creditLimit: 8000000,
      currentDraw: 4200000,
      interestRate: "Fixed 3.85% FX Buffer",
      collateralPledged: "Multi-Currency Custodial Treasury",
      expiryDate: "Jun 2027",
      status: "Active & Performing",
    },
    {
      id: "bf-4",
      facilityType: "Physical Bullion Vaulting",
      clientName: "Marcus Thorne",
      creditLimit: 3500000,
      currentDraw: 2400000,
      interestRate: "0.22% Custody Fee / yr",
      collateralPledged: "Allocated Swiss Gold Bars (Zurich Vault)",
      expiryDate: "Perpetual",
      status: "Active & Performing",
    },
  ])

  // 4. Client Requests State
  const [clientRequests, setClientRequests] = useState<ClientRequestItem[]>([
    {
      id: "cr-1",
      requestNumber: "REQ-2026-9014",
      clientName: "Lord Julian Vance",
      category: "Wire Transfer",
      amount: "$2,450,000 USD",
      requestedAt: "18 mins ago",
      urgency: "Immediate VIP",
      status: "Pending Senior Banker Sign-Off",
    },
    {
      id: "cr-2",
      requestNumber: "REQ-2026-8992",
      clientName: "Baroness Helene de Montmirail",
      category: "Lombard Facility Increase",
      amount: "+$2,000,000 EUR",
      requestedAt: "2 hours ago",
      urgency: "Standard (Same Day)",
      status: "Compliance Verified",
    },
    {
      id: "cr-3",
      requestNumber: "REQ-2026-8941",
      clientName: "Dr. Chen Wei",
      category: "FX Block Execution",
      amount: "$1,800,000 SGD to USD",
      requestedAt: "Yesterday",
      urgency: "Standard (Same Day)",
      status: "Disbursed / Settled",
    },
  ])

  // Filter clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesTier = tierFilter === "All" || c.tier.includes(tierFilter)
      const matchesSearch =
        c.clientName.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.residence.toLowerCase().includes(clientSearch.toLowerCase())
      return matchesTier && matchesSearch
    })
  }, [clients, tierFilter, clientSearch])

  // Request actions
  const handleApproveRequest = (reqId: string) => {
    setClientRequests((prev) =>
      prev.map((r) =>
        r.id === reqId ? { ...r, status: "Disbursed / Settled" } : r,
      ),
    )
    showToast({
      title: "Private Banking Execution Complete",
      message: "Order signed off, liquidity verified, and funds transferred (Simulated).",
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
              PRIVATE BANK & ULTRA-HNW DESK
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              Banque Privée Sphere · Zurich, Geneva & London
            </span>
          </div>
          <h1 style={{ font: "700 26px 'Manrope', sans-serif", color: "var(--ink)", margin: 0 }}>
            {navName}
          </h1>
          <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "13.5px" }}>
            Ultra-HNW relationship management, discretionary mandates, bespoke credit lines, and risk surveillance.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowExportModal(true)}
          >
            <Icon name="document" size={15} />
            Export Private Book
          </button>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => setShowOnboardModal(true)}
          >
            <Icon name="plus" size={15} />
            Onboard UHNW Client
          </button>
        </div>
      </div>

      {/* 1. CLIENTS */}
      {navId === "clients" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Ultra-HNW Client Book"
              value="320 Clients"
              detail="$5M+ Relationship Minimum"
              icon="user"
              tone="navy"
            />
            <MetricCard
              label="Private Banking AUM"
              value="$1.24 Billion"
              detail="+$84M Net Inflows QTD"
              icon="bank"
              tone="emerald"
            />
            <MetricCard
              label="Average Relationship Size"
              value="$31.8M"
              detail="Tier 1 Accounts Weighted"
              icon="trending"
              tone="blue"
            />
            <MetricCard
              label="Client Retention Rate"
              value="98.6% Retained"
              detail="Zero RM Book Churn"
              icon="check"
              tone="gold"
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
                  Ultra-High Net Worth Client Roster
                </h3>
                <span className="card-sub">
                  Institutional relationships, Lombard credit buffers, and KYC validation logs.
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Search client or residence..."
                  className="input"
                  style={{ width: "220px", fontSize: "12px", padding: "6px 10px" }}
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                />
                {["All", "Tier 1", "Tier 2", "Tier 3"].map((tier) => (
                  <button
                    key={tier}
                    className={`btn ${tierFilter === tier ? "btn-primary" : "btn-outline"}`}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                    onClick={() => setTierFilter(tier)}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <DataTable
              title="Clients"
              data={filteredClients}
              columns={[
                {
                  key: "clientName",
                  header: "Client Household & Domicile",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.clientName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.residence}</span>
                    </div>
                  ),
                },
                {
                  key: "tier",
                  header: "Relationship Tier",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.tier.includes("Tier 1")
                          ? "badge--gold"
                          : row.tier.includes("Tier 2")
                          ? "badge--navy"
                          : "badge--blue"
                      }`}
                    >
                      {row.tier.includes("Tier 1")
                        ? "Tier 1 ($25M+)"
                        : row.tier.includes("Tier 2")
                        ? "Tier 2 ($10M-$25M)"
                        : "Tier 3 ($5M-$10M)"}
                    </span>
                  ),
                },
                {
                  key: "totalRelationship",
                  header: "Total Assets in Custody",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>
                        ${(row.totalRelationship / 1000000).toFixed(1)}M
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        RM: {row.relationshipManager}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "lombardCreditLine",
                  header: "Lombard Credit Facility",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                        ${(row.lombardDrawn / 1000000).toFixed(1)}M drawn
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        of ${(row.lombardCreditLine / 1000000).toFixed(1)}M (LTV: {row.ltv}%)
                      </span>
                    </div>
                  ),
                },
                {
                  key: "kycStatus",
                  header: "KYC Compliance",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.kycStatus === "Verified" ? "badge--success" : "badge--warning"
                      }`}
                    >
                      {row.kycStatus}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 2. WEALTH PORTFOLIOS */}
      {navId === "wealth_portfolios" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Discretionary AUM"
              value="$106.2M"
              detail="4 Sample Ultra-HNW Mandates"
              icon="pie"
              tone="navy"
            />
            <MetricCard
              label="Average YTD Return"
              value="+11.8% Net"
              detail="+3.1% Over Benchmark"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Cash Liquidity Buffers"
              value="$11.3M Cash"
              detail="Instant Lombard Drawback Cushion"
              icon="wallet"
              tone="blue"
            />
            <MetricCard
              label="Model Drift"
              value="0.3% Drift"
              detail="Strict Discretionary Adherence"
              icon="check"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Bespoke Discretionary Mandates
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Customized client portfolio accounts, tactical asset allocations, and benchmark performances.
            </p>

            <DataTable
              title="Portfolios"
              data={portfolios}
              columns={[
                {
                  key: "mandateName",
                  header: "Mandate Name & Account",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.mandateName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {row.accountNumber} · {row.clientName}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "strategy",
                  header: "Investment Strategy",
                  render: (row) => <span className="badge badge--navy">{row.strategy}</span>,
                },
                {
                  key: "aum",
                  header: "Mandate AUM",
                  render: (row) => (
                    <strong style={{ color: "var(--ink)" }}>${(row.aum / 1000000).toFixed(1)}M</strong>
                  ),
                },
                {
                  key: "ytdReturn",
                  header: "YTD vs Benchmark",
                  render: (row) => (
                    <div>
                      <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>
                        +{row.ytdReturn}% Net
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        Bmk: +{row.benchmarkReturn}%
                      </span>
                    </div>
                  ),
                },
                {
                  key: "riskCategory",
                  header: "Risk Mandate",
                  render: (row) => <span className="badge badge--info">{row.riskCategory}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 3. BANKING SERVICES */}
      {navId === "banking_services" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Total Lombard Facilities"
              value="$54,500,000"
              detail="Bespoke Credit Lines Authorized"
              icon="card"
              tone="navy"
            />
            <MetricCard
              label="Current Credit Drawn"
              value="$28,300,000"
              detail="51.9% Utilization Across Book"
              icon="trending"
              tone="blue"
            />
            <MetricCard
              label="Average Margin Spread"
              value="SOFR + 1.20%"
              detail="Prime Asset Collateralized"
              icon="shield"
              tone="emerald"
            />
            <MetricCard
              label="Collateral Coverage"
              value="3.2x Coverage"
              detail="Zero Liquidation Trigger Margin"
              icon="check"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Bespoke Lombard & Structured Credit Facilities
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Liquidity loans backed by marketable securities, real estate bridge loans, and physical bullion safekeeping.
            </p>

            <DataTable
              title="Credit Facilities"
              data={bankingFacilities}
              columns={[
                {
                  key: "facilityType",
                  header: "Facility Type & Client",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.facilityType}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Client: {row.clientName}</span>
                    </div>
                  ),
                },
                {
                  key: "creditLimit",
                  header: "Facility Limit & Draw",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)" }}>
                        ${(row.currentDraw / 1000000).toFixed(1)}M drawn
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        of ${(row.creditLimit / 1000000).toFixed(1)}M limit
                      </span>
                    </div>
                  ),
                },
                {
                  key: "interestRate",
                  header: "Interest Rate / Margin",
                  render: (row) => <span className="badge badge--navy">{row.interestRate}</span>,
                },
                {
                  key: "collateralPledged",
                  header: "Collateral Pledged",
                  render: (row) => (
                    <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.collateralPledged}</span>
                  ),
                },
                {
                  key: "status",
                  header: "Facility Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 4. CLIENT REQUESTS */}
      {navId === "client_requests" && (
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
                  Ultra-HNW Client Service Queue
                </h3>
                <span className="card-sub">
                  High-value wires, Lombard margin draws, bespoke FX transactions, and concierge executions.
                </span>
              </div>
            </div>

            <DataTable
              title="Requests"
              data={clientRequests}
              columns={[
                {
                  key: "requestNumber",
                  header: "Request ID & Client",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.requestNumber}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {row.clientName} · {row.requestedAt}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "category",
                  header: "Request Category",
                  render: (row) => <span className="badge badge--navy">{row.category}</span>,
                },
                {
                  key: "amount",
                  header: "Transaction Value",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.amount}</strong>,
                },
                {
                  key: "urgency",
                  header: "Priority Service",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.urgency.includes("VIP") ? "badge--gold" : "badge--info"
                      }`}
                    >
                      {row.urgency}
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Workflow & Sign-Off",
                  render: (row) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        className={`badge ${
                          row.status.includes("Pending")
                            ? "badge--warning"
                            : row.status.includes("Verified")
                            ? "badge--info"
                            : "badge--success"
                        }`}
                      >
                        {row.status}
                      </span>
                      {row.status !== "Disbursed / Settled" && (
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: "11px", padding: "4px 8px" }}
                          onClick={() => handleApproveRequest(row.id)}
                        >
                          Approve Wire (Simulated)
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

      {/* 5. RELATIONSHIP MANAGEMENT */}
      {navId === "relationship_mgmt" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Private Bankers on Desk"
              value="12 Senior Bankers"
              detail="Zurich, Geneva & London"
              icon="user"
              tone="navy"
            />
            <MetricCard
              label="Client Retention Rate"
              value="98.6% Retained"
              detail="Industry Benchmark: 92%"
              icon="trending"
              tone="emerald"
            />
            <MetricCard
              label="Annual KYC Reviews"
              value="94.2% Complete"
              detail="Zero Non-Compliant Accounts"
              icon="check"
              tone="blue"
            />
            <MetricCard
              label="Net Promoter Score"
              value="NPS +82"
              detail="Ultra-HNW Survey"
              icon="sparkle"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Senior Relationship Manager Roster & Caseload
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Client coverage, allocated AUM books, and scheduled annual portfolio reviews.
            </p>

            <DataTable
              title="RM Team"
              data={[
                {
                  id: "rm-1",
                  name: "Jean-Paul Laurent",
                  title: "Managing Director, UHNW Division",
                  caseload: "18 Ultra-HNW Households",
                  bookAum: "$420,000,000",
                  office: "Zurich (Bahnhofstrasse)",
                  status: "Active Desk",
                },
                {
                  id: "rm-2",
                  name: "Claire Beaumont",
                  title: "Senior Vice President, Private Wealth",
                  caseload: "24 UHNW Households",
                  bookAum: "$310,000,000",
                  office: "Geneva (Place de la Fusterie)",
                  status: "Active Desk",
                },
                {
                  id: "rm-3",
                  name: "Alistair Sterling",
                  title: "Director, Cross-Border Family Solutions",
                  caseload: "22 UHNW Households",
                  bookAum: "$280,000,000",
                  office: "London (Mayfair)",
                  status: "Active Desk",
                },
              ]}
              columns={[
                {
                  key: "name",
                  header: "Private Banker",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.name}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.title}</span>
                    </div>
                  ),
                },
                {
                  key: "caseload",
                  header: "Client Caseload",
                  render: (row) => <span className="badge badge--navy">{row.caseload}</span>,
                },
                {
                  key: "bookAum",
                  header: "Total Custody AUM",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.bookAum}</strong>,
                },
                {
                  key: "office",
                  header: "Booking Office",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.office}</span>,
                },
                {
                  key: "status",
                  header: "Desk Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 6. INVESTMENT INSIGHTS */}
      {navId === "investment_insights" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Private Bank CIO Tactical Macro Briefs & Research Notes
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Exclusive institutional research distributed directly to UHNW clients and family offices.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                {
                  id: "ii-1",
                  title: "Q3 2026 Sovereign Debt & Central Bank Balance Sheet Strategy",
                  author: "Dr. Henri Dubois, Chief Investment Officer",
                  date: "Published Yesterday",
                  summary:
                    "Tactical overweight in short-duration European sovereign notes while locking in 6.4% yields on investment-grade subordinated corporate debt.",
                  category: "Tactical Macro",
                },
                {
                  id: "ii-2",
                  title: "Artificial Intelligence Infrastructure & Private Credit Syndicate",
                  author: "Private Equity Strategy Group (London)",
                  date: "Published 3 Days Ago",
                  summary:
                    "Structuring mezzanine debt facilities for European data center REITs with 11.2% IRR hurdle and equity warrant participation.",
                  category: "Alternative Credit",
                },
                {
                  id: "ii-3",
                  title: "Currency Hedging in Volatile FX Regimes: CHF / USD / EUR Strategies",
                  author: "FX Derivatives & Treasury Desk (Zurich)",
                  date: "Published Last Week",
                  summary:
                    "Zero-cost collar structures to protect foreign real estate gains against Swiss Franc appreciation.",
                  category: "FX & Derivatives",
                },
              ].map((insight) => (
                <div
                  key={insight.id}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    background: "var(--surface-color)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "6px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <strong style={{ color: "var(--ink)", fontSize: "15px", display: "block" }}>
                        {insight.title}
                      </strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {insight.author} · {insight.date}
                      </span>
                    </div>
                    <span className="badge badge--navy">{insight.category}</span>
                  </div>
                  <p style={{ margin: "8px 0 12px 0", fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
                    {insight.summary}
                  </p>
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: "11px", padding: "4px 10px" }}
                    onClick={() => {
                      showToast({
                        title: "CIO Research Note Downloaded",
                        message: `Full 18-page institutional research memo for "${insight.title}" generated.`,
                        tone: "info",
                      })
                    }}
                  >
                    Read Full Institutional Brief (PDF)
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. RISK MONITORING */}
      {navId === "risk_monitoring" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="Lombard Portfolio LTV"
              value="21.4% Avg"
              detail="Buffer to Margin Call: 48.6%"
              icon="shield"
              tone="emerald"
            />
            <MetricCard
              label="Concentration Limits"
              value="0 Breaches"
              detail="Single stock caps & liquidity limits"
              icon="check"
              tone="navy"
            />
            <MetricCard
              label="Collateral Stress Test"
              value="Passed (-30% Shock)"
              detail="Severe Equity & FX Drawdown Test"
              icon="activity"
              tone="blue"
            />
            <MetricCard
              label="Margin Call Alerts"
              value="0 Active Calls"
              detail="Safe Collateral Cushion"
              icon="alert"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              Collateral Coverage & Margin Surveillance
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Continuous real-time surveillance of pledged assets against Lombard facilities.
            </p>

            <DataTable
              title="Surveillance"
              data={[
                {
                  id: "risk-1",
                  clientName: "Lord Julian Vance",
                  collateralValue: "$42,500,000",
                  creditDrawn: "$14,200,000",
                  currentLtv: "33.4%",
                  marginCallLtv: "70.0%",
                  riskStatus: "Safe & Ample Buffer",
                },
                {
                  id: "risk-2",
                  clientName: "Baroness Helene de Montmirail",
                  collateralValue: "$31,800,000",
                  creditDrawn: "$8,500,000",
                  currentLtv: "26.7%",
                  marginCallLtv: "65.0%",
                  riskStatus: "Safe & Ample Buffer",
                },
                {
                  id: "risk-3",
                  clientName: "Dr. Chen Wei",
                  collateralValue: "$18,200,000",
                  creditDrawn: "$4,200,000",
                  currentLtv: "23.1%",
                  marginCallLtv: "65.0%",
                  riskStatus: "Safe & Ample Buffer",
                },
              ]}
              columns={[
                {
                  key: "clientName",
                  header: "Client Account",
                  render: (row) => <strong style={{ color: "var(--ink)" }}>{row.clientName}</strong>,
                },
                {
                  key: "collateralValue",
                  header: "Pledged Collateral",
                  render: (row) => <span style={{ color: "var(--ink)", fontWeight: 600 }}>{row.collateralValue}</span>,
                },
                {
                  key: "creditDrawn",
                  header: "Credit Utilized",
                  render: (row) => (
                    <span style={{ color: "var(--accent-blue)", fontWeight: 600 }}>{row.creditDrawn}</span>
                  ),
                },
                {
                  key: "currentLtv",
                  header: "Current LTV vs Limit",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--accent-success)" }}>{row.currentLtv}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>
                        Call at {row.marginCallLtv}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "riskStatus",
                  header: "Surveillance Rating",
                  render: (row) => <span className="badge badge--success">{row.riskStatus}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 8. COMPLIANCE */}
      {navId === "compliance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="stats-grid">
            <MetricCard
              label="PEP & Sanctions Status"
              value="0 Flags"
              detail="Continuous World-Check & OFAC scan"
              icon="shield"
              tone="emerald"
            />
            <MetricCard
              label="Annual KYC Reviews"
              value="94.2% Complete"
              detail="2 Pending Verification"
              icon="document"
              tone="navy"
            />
            <MetricCard
              label="Cross-Border Tax (CRS/FATCA)"
              value="100% Reported"
              detail="Automatic Exchange of Info (AEOI)"
              icon="check"
              tone="blue"
            />
            <MetricCard
              label="Auditor Attestation"
              value="Unqualified"
              detail="FINMA / FCA Standards Compliant"
              icon="bank"
              tone="gold"
            />
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h3 className="card-title" style={{ marginBottom: "6px" }}>
              AML / CFT & Regulatory Compliance Ledger
            </h3>
            <p className="card-sub" style={{ marginBottom: "16px" }}>
              Beneficial ownership registers, source-of-wealth validations, and cross-border suitability filings.
            </p>

            <DataTable
              title="Compliance Register"
              data={[
                {
                  id: "cmp-1",
                  accountName: "Vance Dynasty Trust (Geneva)",
                  regulatoryBody: "FINMA / Swiss Banking Act",
                  kycLevel: "Level 3 Enhanced Due Diligence",
                  uboStatus: "Verified UBO",
                  nextReviewDate: "Nov 2026",
                  status: "Compliant & Active",
                },
                {
                  id: "cmp-2",
                  accountName: "Montmirail Capital (Monaco/Paris)",
                  regulatoryBody: "ACPR / French Banking Authority",
                  kycLevel: "Level 3 Enhanced Due Diligence",
                  uboStatus: "Verified UBO",
                  nextReviewDate: "Jan 2027",
                  status: "Compliant & Active",
                },
                {
                  id: "cmp-3",
                  accountName: "Lindqvist Family Holdings (Stockholm)",
                  regulatoryBody: "Finansinspektionen (Sweden)",
                  kycLevel: "Standard Due Diligence",
                  uboStatus: "Recertification In Progress",
                  nextReviewDate: "Due in 14 Days",
                  status: "Action Required",
                },
              ]}
              columns={[
                {
                  key: "accountName",
                  header: "Account & Booking Jurisdiction",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.accountName}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.regulatoryBody}</span>
                    </div>
                  ),
                },
                {
                  key: "kycLevel",
                  header: "Due Diligence Level",
                  render: (row) => <span className="badge badge--navy">{row.kycLevel}</span>,
                },
                {
                  key: "uboStatus",
                  header: "Beneficial Ownership (UBO)",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--ink)" }}>{row.uboStatus}</span>,
                },
                {
                  key: "nextReviewDate",
                  header: "Review Timeline",
                  render: (row) => <span style={{ fontSize: "12px", color: "var(--muted)" }}>{row.nextReviewDate}</span>,
                },
                {
                  key: "status",
                  header: "Compliance Status",
                  render: (row) => (
                    <span
                      className={`badge ${
                        row.status === "Compliant & Active" ? "badge--success" : "badge--warning"
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

      {/* 9. REPORTS */}
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
                  Private Banking Statements & Mandate Reports
                </h3>
                <span className="card-sub">
                  Consolidated client statements, performance reports, and Lombard credit certificates.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={14} />
                Generate Client Statement Pack
              </button>
            </div>

            <DataTable
              title="Reports"
              data={[
                {
                  id: "pbr-1",
                  title: "Monthly Consolidated Custody Statement & Performance",
                  period: "Month of May 2026",
                  clientsCovered: "320 Ultra-HNW Accounts ($1.24B AUM)",
                  status: "Published & Encrypted",
                },
                {
                  id: "pbr-2",
                  title: "Lombard Credit Facility Utilization & Margin Audit",
                  period: "Q2 2026 Review",
                  clientsCovered: "Active Facilities ($54.5M Line Cap)",
                  status: "Audited",
                },
                {
                  id: "pbr-3",
                  title: "CRS / FATCA Common Reporting Standard Tax Export",
                  period: "Tax Year 2025/2026",
                  clientsCovered: "Cross-Border Tax Residence Dossier",
                  status: "Statutory Complete",
                },
              ]}
              columns={[
                {
                  key: "title",
                  header: "Report Title & Scope",
                  render: (row) => (
                    <div>
                      <strong style={{ color: "var(--ink)", display: "block" }}>{row.title}</strong>
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>{row.clientsCovered}</span>
                    </div>
                  ),
                },
                {
                  key: "period",
                  header: "Period",
                  render: (row) => <span style={{ color: "var(--ink)", fontSize: "12px" }}>{row.period}</span>,
                },
                {
                  key: "status",
                  header: "Status",
                  render: (row) => <span className="badge badge--success">{row.status}</span>,
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* 10. SETTINGS */}
      {navId === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="grid-2">
            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Desk Credit Underwriting Parameters
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Lombard credit limits, loan-to-value safety triggers, and automated margin calls.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Standard Tier 1 Equity LTV Cap
                  </label>
                  <select className="select" defaultValue="65" style={{ width: "100%" }}>
                    <option value="50">50% Conservative LTV</option>
                    <option value="65">65% Standard Diversified Equity LTV (Current)</option>
                    <option value="75">75% Sovereign Debt Backed LTV</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ink)", fontWeight: 600, marginBottom: "4px" }}>
                    Margin Call Early Warning Buffer
                  </label>
                  <select className="select" defaultValue="10" style={{ width: "100%" }}>
                    <option value="5">5% Warning Cushion</option>
                    <option value="10">10% Warning Cushion (Current)</option>
                    <option value="15">15% Early Client Outreach</option>
                  </select>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ marginTop: "8px", fontSize: "12px" }}
                  onClick={() => {
                    showToast({
                      title: "Settings Saved",
                      message: "Underwriting thresholds and margin call triggers updated.",
                      tone: "success",
                    })
                  }}
                >
                  Save Underwriting Parameters
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <h3 className="card-title" style={{ marginBottom: "6px" }}>
                Wire Authorization & Security Quorum
              </h3>
              <p className="card-sub" style={{ marginBottom: "16px" }}>
                Senior Relationship Manager and Compliance dual-signoff thresholds.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      High-Value Wire Dual-Approval
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Requires Senior Banker + Compliance Lead sign-off for &gt; $1,000,000
                    </span>
                  </div>
                  <span className="badge badge--success">Active</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: "13px", display: "block" }}>
                      SAML 2.0 Banking Officer SSO
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                      FINMA/FCA accredited banking credentials enforced
                    </span>
                  </div>
                  <span className="badge badge--success">Enforced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Private Bank Client Book"
        defaultFilename="Private_Bank_Client_Book"
        headers={[
          "Client Name",
          "Tier",
          "Relationship AUM",
          "Lombard Limit",
          "Lombard Drawn",
          "LTV",
          "Relationship Manager",
          "KYC Status",
        ]}
        data={clients.map((c) => [
          c.clientName,
          c.tier,
          `$${(c.totalRelationship / 1000000).toFixed(2)}M`,
          `$${(c.lombardCreditLine / 1000000).toFixed(2)}M`,
          `$${(c.lombardDrawn / 1000000).toFixed(2)}M`,
          `${c.ltv}%`,
          c.relationshipManager,
          c.kycStatus,
        ])}
      />

      {/* Onboard Client Modal */}
      <OnboardClientModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onClientCreated={(newClient: MockClient) => {
          const pbClient: PrivateBankClientItem = {
            id: `pbc-${Date.now()}`,
            clientName: newClient.name,
            tier: "Tier 3 HNW ($5M-$10M)",
            totalRelationship: newClient.aum || 7500000,
            lombardCreditLine: 2500000,
            lombardDrawn: 0,
            ltv: 0,
            relationshipManager: "Jean-Paul Laurent (MD)",
            kycStatus: "Verified",
            residence: "Global Client Custody",
          }
          setClients((prev) => [pbClient, ...prev])
          showToast({
            title: "UHNW Client Onboarded",
            message: `${newClient.name} successfully established in Private Banking custody.`,
            tone: "success",
          })
        }}
      />
    </div>
  )
}
