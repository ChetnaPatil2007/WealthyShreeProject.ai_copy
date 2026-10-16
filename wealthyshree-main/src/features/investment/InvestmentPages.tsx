import React, { useState } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { RebalanceModal, ExportModal } from "../../components/modals"

export interface InvestmentPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

interface PortfolioItem {
  id: string
  name: string
  strategy: string
  aum: number
  ytdReturn: number
  benchmarkAlpha: number
  sharpeRatio: number
  status: "Optimal" | "Rebalance Proposed" | "Drift Warning"
}

interface HoldingItem {
  id: string
  symbol: string
  name: string
  assetClass: string
  sharesOrUnits: string
  price: number
  marketValue: number
  weight: number
  unrealizedGainPct: number
}

export function InvestmentModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: InvestmentPageProps) {
  const { showToast } = useToast()

  // State
  const [showRebalanceModal, setShowRebalanceModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Portfolios
  const [portfolios] = useState<PortfolioItem[]>([
    {
      id: "p1",
      name: "Global Tactical Growth Fund",
      strategy: "Long-Biased Global Equities & Tech",
      aum: 148500000,
      ytdReturn: 16.4,
      benchmarkAlpha: 3.2,
      sharpeRatio: 1.84,
      status: "Drift Warning",
    },
    {
      id: "p2",
      name: "Absolute Return Multi-Asset Mandate",
      strategy: "Balanced Multi-Asset Macro",
      aum: 96200000,
      ytdReturn: 11.2,
      benchmarkAlpha: 2.1,
      sharpeRatio: 2.05,
      status: "Optimal",
    },
    {
      id: "p3",
      name: "Institutional Fixed Income & Credit",
      strategy: "Duration Managed Treasury & High-Grade",
      aum: 64800000,
      ytdReturn: 6.8,
      benchmarkAlpha: 1.4,
      sharpeRatio: 1.42,
      status: "Rebalance Proposed",
    },
    {
      id: "p4",
      name: "Private Market & Real Assets Sleeve",
      strategy: "Direct Real Estate & Infrastructure",
      aum: 33300000,
      ytdReturn: 9.4,
      benchmarkAlpha: 1.8,
      sharpeRatio: 1.62,
      status: "Optimal",
    },
  ])

  // Holdings catalog
  const [equitiesList] = useState<HoldingItem[]>([
    { id: "eq1", symbol: "NVDA", name: "NVIDIA Corporation", assetClass: "Equities", sharesOrUnits: "18,400", price: 135.5, marketValue: 2493200, weight: 7.9, unrealizedGainPct: 184.2 },
    { id: "eq2", symbol: "MSFT", name: "Microsoft Corporation", assetClass: "Equities", sharesOrUnits: "12,500", price: 448.2, marketValue: 5602500, weight: 6.8, unrealizedGainPct: 42.5 },
    { id: "eq3", symbol: "AAPL", name: "Apple Inc.", assetClass: "Equities", sharesOrUnits: "22,000", price: 212.8, marketValue: 4681600, weight: 5.7, unrealizedGainPct: 31.4 },
    { id: "eq4", symbol: "ASML", name: "ASML Holding N.V.", assetClass: "Equities", sharesOrUnits: "4,200", price: 890.4, marketValue: 3739680, weight: 4.5, unrealizedGainPct: 54.8 },
    { id: "eq5", symbol: "LLY", name: "Eli Lilly and Company", assetClass: "Equities", sharesOrUnits: "4,800", price: 792.0, marketValue: 3801600, weight: 4.6, unrealizedGainPct: 62.1 },
  ])

  const [mutualFundsList] = useState<HoldingItem[]>([
    { id: "mf1", symbol: "VWELX", name: "Vanguard Wellington Admiral Fund", assetClass: "Mutual Funds", sharesOrUnits: "142,000", price: 78.4, marketValue: 11132800, weight: 12.4, unrealizedGainPct: 22.8 },
    { id: "mf2", symbol: "DODGX", name: "Dodge & Cox Stock Fund", assetClass: "Mutual Funds", sharesOrUnits: "34,500", price: 264.2, marketValue: 9114900, weight: 10.2, unrealizedGainPct: 18.5 },
    { id: "mf3", symbol: "FCNTX", name: "Fidelity Contrafund", assetClass: "Mutual Funds", sharesOrUnits: "180,000", price: 22.8, marketValue: 4104000, weight: 4.6, unrealizedGainPct: 28.4 },
  ])

  const [etfsList] = useState<HoldingItem[]>([
    { id: "etf1", symbol: "VTI", name: "Vanguard Total Stock Market ETF", assetClass: "ETFs", sharesOrUnits: "84,000", price: 284.5, marketValue: 23898000, weight: 26.8, unrealizedGainPct: 34.2 },
    { id: "etf2", symbol: "VXUS", name: "Vanguard Total International Stock ETF", assetClass: "ETFs", sharesOrUnits: "120,000", price: 62.4, marketValue: 7488000, weight: 8.4, unrealizedGainPct: 14.5 },
    { id: "etf3", symbol: "QQQM", name: "Invesco NASDAQ 100 ETF", assetClass: "ETFs", sharesOrUnits: "45,000", price: 212.0, marketValue: 9540000, weight: 10.7, unrealizedGainPct: 44.8 },
    { id: "etf4", symbol: "BND", name: "Vanguard Total Bond Market ETF", assetClass: "ETFs", sharesOrUnits: "180,000", price: 72.8, marketValue: 13104000, weight: 14.7, unrealizedGainPct: 6.2 },
  ])

  const [bondsList] = useState<HoldingItem[]>([
    { id: "bd1", symbol: "US-T 4.5% 2027", name: "US Treasury Note 4.500% Mat 2027", assetClass: "Bonds", sharesOrUnits: "18,000,000", price: 99.4, marketValue: 17892000, weight: 20.1, unrealizedGainPct: 3.4 },
    { id: "bd2", symbol: "US-T 4.25% 2034", name: "US Treasury Bond 4.250% Mat 2034", assetClass: "Bonds", sharesOrUnits: "12,000,000", price: 98.2, marketValue: 11784000, weight: 13.2, unrealizedGainPct: 2.8 },
    { id: "bd3", symbol: "AAPL 3.85% 2030", name: "Apple Inc Senior IG Corporate Note", assetClass: "Bonds", sharesOrUnits: "6,000,000", price: 97.5, marketValue: 5850000, weight: 6.6, unrealizedGainPct: 4.1 },
  ])

  const [goldAssetsList] = useState<HoldingItem[]>([
    { id: "gd1", symbol: "GLD", name: "SPDR Gold Shares Physical Trust", assetClass: "Gold", sharesOrUnits: "32,000", price: 224.5, marketValue: 7184000, weight: 8.1, unrealizedGainPct: 28.5 },
    { id: "gd2", symbol: "PHYS", name: "Sprott Physical Gold Trust (Allocated Bars)", assetClass: "Gold", sharesOrUnits: "280,000", price: 18.2, marketValue: 5096000, weight: 5.7, unrealizedGainPct: 24.2 },
    { id: "gd3", symbol: "KRBN", name: "KraneShares Global Carbon Strategy ETF", assetClass: "Other Assets", sharesOrUnits: "42,000", price: 34.0, marketValue: 1428000, weight: 1.6, unrealizedGainPct: 8.4 },
  ])

  // Total AUM
  const totalAum = portfolios.reduce((sum, p) => sum + p.aum, 0)

  // =========================================================================
  // PAGE 1: PORTFOLIOS
  // =========================================================================
  if (navId === "portfolios" || navName === "Portfolios") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · MANDATES</span>
            <div className="page-title">Institutional Portfolio Mandates</div>
            <div className="page-subtitle">
              Multi-asset fund sleeves, factor exposures, benchmark alpha, and mandate rebalancing queues.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowRebalanceModal(true)}
              >
                <Icon name="activity" size={16} />
                <span>Propose Portfolio Rebalance</span>
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExportModal(true)}
              >
                <Icon name="document" size={16} />
                <span>Export Mandates CSV</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Total Institutional AUM</span>
            <div className="value">${(totalAum / 1000000).toFixed(1)}M</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>+14.2% Blended YTD Return</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Active Mandates"
            value="4 Strategies"
            detail="Equity, Multi-Asset, Credit, Alts"
            trend="up"
            icon="pie"
            tone="blue"
          />
          <MetricCard
            label="Benchmark Alpha (Simulated)"
            value="+2.84%"
            detail="Over MSCI ACWI / Agg Bond"
            trend="up"
            icon="trending"
            tone="emerald"
          />
          <MetricCard
            label="Average Sharpe Ratio"
            value="1.73"
            detail="Risk-adjusted return profile"
            trend="up"
            icon="shield"
            tone="gold"
          />
          <MetricCard
            label="Rebalance Triggers"
            value="1 Alert"
            detail="Single issuer > 7.0% cap"
            trend="neutral"
            icon="alert"
            tone="navy"
          />
        </section>

        <DataTable<PortfolioItem>
          title="Institutional Investment Portfolios"
          subtitle="Real-time simulated valuations and risk metrics"
          columns={[
            {
              key: "name",
              header: "Mandate Name",
              render: (r) => (
                <div>
                  <strong>{r.name}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {r.strategy}
                  </div>
                </div>
              ),
            },
            {
              key: "aum",
              header: "Strategy AUM",
              render: (r) => `$${(r.aum / 1000000).toFixed(1)}M`,
            },
            {
              key: "ytdReturn",
              header: "YTD Return",
              render: (r) => (
                <strong style={{ color: "var(--color-success, #10b981)" }}>
                  +{r.ytdReturn}%
                </strong>
              ),
            },
            {
              key: "benchmarkAlpha",
              header: "Alpha (Simulated)",
              render: (r) => `+${r.benchmarkAlpha}%`,
            },
            {
              key: "sharpeRatio",
              header: "Sharpe Ratio",
              render: (r) => <strong>{r.sharpeRatio}</strong>,
            },
            {
              key: "status",
              header: "Mandate Status",
              render: (r) => (
                <span
                  className={`badge ${
                    r.status === "Optimal"
                      ? "badge--success"
                      : r.status === "Rebalance Proposed"
                      ? "badge--warning"
                      : "badge--danger"
                  }`}
                >
                  {r.status}
                </span>
              ),
            },
          ]}
          data={portfolios}
        />

        {showRebalanceModal && (
          <RebalanceModal
            isOpen={showRebalanceModal}
            onClose={() => setShowRebalanceModal(false)}
            onRebalanceComplete={() => {
              setShowRebalanceModal(false)
              showToast({
                title: "Rebalance Orders Proposed (Simulated)",
                message: "Generated 4 simulated rebalance trade allocations awaiting CIO authorization.",
                tone: "success",
              })
            }}
          />
        )}
        {showExportModal && (
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            headers={["Mandate", "Strategy", "AUM", "YTD Return", "Alpha", "Sharpe", "Status"]}
            data={portfolios.map((p) => [p.name, p.strategy, `$${p.aum.toLocaleString()}`, `+${p.ytdReturn}%`, `+${p.benchmarkAlpha}%`, p.sharpeRatio, p.status])}
            defaultFilename="investment-portfolios"
            title="Export Portfolios"
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 2: ASSET ALLOCATION
  // =========================================================================
  if (navId === "asset_alloc" || navName === "Asset Allocation") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · MACRO ALLOCATION</span>
            <div className="page-title">Global Multi-Asset Allocation</div>
            <div className="page-subtitle">
              Strategic Asset Allocation (SAA) targets vs Tactical Asset Allocation (TAA) weights across all funds.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Tactical Weights Updated (Simulated)",
                    message: "Adjusted tactical fixed income underweight to +1.5% Treasuries.",
                    tone: "success",
                  })
                }
              >
                <Icon name="trending" size={16} />
                <span>Apply Tactical Overlays</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Equities Drift</span>
            <div className="value">+3.4% Overweight</div>
            <div className="delta positive">
              <Icon name="activity" size={14} />
              <span>Driven by semiconductor outperformance</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Strategic vs Actual Asset Breakdown ($342.8M Total Book)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { cls: "Equities (Global Mega-Cap, Large, Mid-Cap)", actual: 57.4, target: 54.0, color: "var(--color-accent, #3b82f6)" },
              { cls: "Fixed Income (Treasuries, Sovereign, IG Corporate)", actual: 21.6, target: 24.0, color: "var(--color-success, #10b981)" },
              { cls: "Private Equity & Direct Venture Holdings", actual: 11.2, target: 12.0, color: "var(--color-warning, #f59e0b)" },
              { cls: "Real Estate & Infrastructure Assets", actual: 5.8, target: 6.0, color: "#8b5cf6" },
              { cls: "Gold, Commodities & Digital Reserve Assets", actual: 4.0, target: 4.0, color: "#d97706" },
            ].map((a, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>{a.cls}</span>
                  <span><strong>{a.actual}%</strong> (Target: {a.target}% · {a.actual > a.target ? `+${(a.actual - a.target).toFixed(1)}%` : `${(a.actual - a.target).toFixed(1)}%`})</span>
                </div>
                <div style={{ background: "var(--color-bg-secondary, #eee)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${a.actual}%`, background: a.color, height: "100%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // PAGE 3: EQUITIES
  // =========================================================================
  if (navId === "equities" || navName === "Equities") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · EQUITY HOLDINGS</span>
            <div className="page-title">Direct Equities & Single-Stock Positions</div>
            <div className="page-subtitle">
              Fundamental factor attribution, earnings growth metrics, P/E multiples, and concentration caps.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Concentration Alert",
                    message: "NVDA holding is at 7.9% of fund. Max IPS constraint is 7.0%. Proposing simulated trim.",
                    tone: "warning",
                  })
                }
              >
                <Icon name="alert" size={16} />
                <span>Check Single-Stock Caps</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Equities Sleeve AUM</span>
            <div className="value">$196.8M</div>
            <div className="delta positive">
              <Icon name="trending" size={14} />
              <span>+18.4% YTD modeled gain</span>
            </div>
          </div>
        </section>

        <DataTable<HoldingItem>
          title="Direct Equities Book"
          subtitle="Top active high-conviction positions across all funds"
          columns={[
            {
              key: "symbol",
              header: "Ticker / Issuer",
              render: (r) => (
                <div>
                  <strong>{r.symbol}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.name}</div>
                </div>
              ),
            },
            {
              key: "sharesOrUnits",
              header: "Shares Held",
              render: (r) => r.sharesOrUnits,
            },
            {
              key: "price",
              header: "Market Price",
              render: (r) => `$${r.price.toFixed(2)}`,
            },
            {
              key: "marketValue",
              header: "Total Position Value",
              render: (r) => <strong>${r.marketValue.toLocaleString()}</strong>,
            },
            {
              key: "weight",
              header: "Fund Weight",
              render: (r) => (
                <span className={`badge ${r.weight > 7.0 ? "badge--warning" : "badge--neutral"}`}>
                  {r.weight}% {r.weight > 7.0 ? "(Over Cap)" : ""}
                </span>
              ),
            },
            {
              key: "unrealizedGainPct",
              header: "Unrealized Gain",
              render: (r) => (
                <strong style={{ color: "var(--color-success, #10b981)" }}>
                  +{r.unrealizedGainPct}%
                </strong>
              ),
            },
          ]}
          data={equitiesList}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 4: MUTUAL FUNDS
  // =========================================================================
  if (navId === "mutual_funds" || navName === "Mutual Funds") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · ACTIVE FUNDS</span>
            <div className="page-title">Institutional Mutual Funds & Sub-Advisors</div>
            <div className="page-subtitle">
              Active manager allocation, Morningstar ratings, expense ratios, and rolling 3-year track records.
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Mutual Funds Allocation</span>
            <div className="value">$24.3M AUM</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>0.38% average expense ratio</span>
            </div>
          </div>
        </section>

        <DataTable<HoldingItem>
          title="Active Mutual Fund Holdings"
          subtitle="Core sub-advised mutual fund positions"
          columns={[
            {
              key: "symbol",
              header: "Fund Symbol / Name",
              render: (r) => (
                <div>
                  <strong>{r.symbol}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.name}</div>
                </div>
              ),
            },
            {
              key: "sharesOrUnits",
              header: "Fund Units",
              render: (r) => r.sharesOrUnits,
            },
            {
              key: "marketValue",
              header: "Market Value",
              render: (r) => <strong>${r.marketValue.toLocaleString()}</strong>,
            },
            {
              key: "weight",
              header: "Sleeve Weight",
              render: (r) => `${r.weight}%`,
            },
            {
              key: "unrealizedGainPct",
              header: "YTD Return",
              render: (r) => <strong style={{ color: "var(--color-success, #10b981)" }}>+{r.unrealizedGainPct}%</strong>,
            },
          ]}
          data={mutualFundsList}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 5: ETFS
  // =========================================================================
  if (navId === "etfs" || navName === "ETFs") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · PASSIVE INDEXING</span>
            <div className="page-title">Exchange-Traded Funds (ETFs) & Core Indexing</div>
            <div className="page-subtitle">
              Low-cost ultra-liquid core beta building blocks, tracking error metrics, and intraday liquidity.
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">ETF Sleeve AUM</span>
            <div className="value">$54.0M</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>0.04% weighted expense ratio</span>
            </div>
          </div>
        </section>

        <DataTable<HoldingItem>
          title="Core ETF Holdings Portfolio"
          subtitle="Low tracking-error index and factor ETFs"
          columns={[
            {
              key: "symbol",
              header: "ETF Ticker",
              render: (r) => (
                <div>
                  <strong>{r.symbol}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.name}</div>
                </div>
              ),
            },
            {
              key: "sharesOrUnits",
              header: "Shares",
              render: (r) => r.sharesOrUnits,
            },
            {
              key: "marketValue",
              header: "Position Value",
              render: (r) => <strong>${r.marketValue.toLocaleString()}</strong>,
            },
            {
              key: "weight",
              header: "Fund Weight",
              render: (r) => `${r.weight}%`,
            },
            {
              key: "unrealizedGainPct",
              header: "Total Return",
              render: (r) => <strong style={{ color: "var(--color-success, #10b981)" }}>+{r.unrealizedGainPct}%</strong>,
            },
          ]}
          data={etfsList}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 6: BONDS
  // =========================================================================
  if (navId === "bonds" || navName === "Bonds") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · FIXED INCOME</span>
            <div className="page-title">Sovereign Debt & Corporate Bonds</div>
            <div className="page-subtitle">
              Treasury ladder duration, credit rating attribution, yield to maturity (YTM), and coupon schedules.
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Portfolio Blended YTM</span>
            <div className="value">4.42% Yield</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>4.8 Years Duration (Neutral)</span>
            </div>
          </div>
        </section>

        <DataTable<HoldingItem>
          title="Direct Fixed Income & Treasury Holdings"
          subtitle="High-grade sovereign and corporate debt instruments"
          columns={[
            {
              key: "symbol",
              header: "CUSIP / Instrument",
              render: (r) => (
                <div>
                  <strong>{r.symbol}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.name}</div>
                </div>
              ),
            },
            {
              key: "sharesOrUnits",
              header: "Par Value",
              render: (r) => `$${r.sharesOrUnits}`,
            },
            {
              key: "price",
              header: "Clean Price",
              render: (r) => `${r.price}`,
            },
            {
              key: "marketValue",
              header: "Market Value",
              render: (r) => <strong>${r.marketValue.toLocaleString()}</strong>,
            },
            {
              key: "weight",
              header: "Fixed Income Weight",
              render: (r) => `${r.weight}%`,
            },
          ]}
          data={bondsList}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 7: GOLD AND OTHER ASSETS
  // =========================================================================
  if (navId === "gold_assets" || navName === "Gold and Other Assets") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · REAL ASSETS</span>
            <div className="page-title">Gold, Commodities & Reserve Assets</div>
            <div className="page-subtitle">
              Physical allocated gold bullion vaults, commodity index derivatives, and carbon offset credits.
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Real Assets Value</span>
            <div className="value">$13.7M</div>
            <div className="delta positive">
              <Icon name="sparkle" size={14} />
              <span>Zero counterparty credit risk</span>
            </div>
          </div>
        </section>

        <DataTable<HoldingItem>
          title="Gold Bullion & Specialized Commodities"
          subtitle="Non-correlated purchasing power preservation assets"
          columns={[
            {
              key: "symbol",
              header: "Asset / Vault Holder",
              render: (r) => (
                <div>
                  <strong>{r.symbol}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{r.name}</div>
                </div>
              ),
            },
            {
              key: "marketValue",
              header: "Market Valuation",
              render: (r) => <strong>${r.marketValue.toLocaleString()}</strong>,
            },
            {
              key: "weight",
              header: "Macro Allocation",
              render: (r) => `${r.weight}%`,
            },
            {
              key: "unrealizedGainPct",
              header: "Performance YTD",
              render: (r) => <strong style={{ color: "var(--color-success, #10b981)" }}>+{r.unrealizedGainPct}%</strong>,
            },
          ]}
          data={goldAssetsList}
        />
      </div>
    )
  }

  // =========================================================================
  // PAGE 8: RISK ANALYSIS
  // =========================================================================
  if (navId === "risk_analysis" || navName === "Risk Analysis") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · RISK ENGINE</span>
            <div className="page-title">Downside Risk Modeling & Factor Attribution</div>
            <div className="page-subtitle">
              Value at Risk (VaR 99%), historical stress tests (2008 GFC, 2020 Covid), and sector concentration.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Stress Test Completed (Simulated)",
                    message: "Completed 10,000 historical macroeconomic scenarios. Max expected 1-month drawdown: -6.2%.",
                    tone: "info",
                  })
                }
              >
                <Icon name="shield" size={16} />
                <span>Run Macro Stress Test</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Portfolio Beta</span>
            <div className="value">0.92 vs MSCI World</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Downside capture: 81.2%</span>
            </div>
          </div>
        </section>

        <section className="grid-metrics">
          <MetricCard
            label="Value at Risk (VaR 99% / 1-Mo)"
            value="-4.2%"
            detail="Max probable loss at 99% confidence"
            trend="neutral"
            icon="shield"
            tone="blue"
          />
          <MetricCard
            label="Historical Max Drawdown"
            value="-8.4%"
            detail="Peak-to-trough during 2022 rate shock"
            trend="up"
            icon="activity"
            tone="emerald"
          />
          <MetricCard
            label="Information Ratio"
            value="1.24"
            detail="Consistent excess alpha generation"
            trend="up"
            icon="trending"
            tone="gold"
          />
          <MetricCard
            label="Portfolio Volatility (Ann.)"
            value="11.8%"
            detail="Below benchmark volatility (14.2%)"
            trend="up"
            icon="sparkle"
            tone="violet"
          />
        </section>
      </div>
    )
  }

  // =========================================================================
  // PAGE 9: REBALANCING
  // =========================================================================
  if (navId === "rebalancing" || navName === "Rebalancing") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · ORDER EXECUTION</span>
            <div className="page-title">Portfolio Rebalancing & Trade Proposer</div>
            <div className="page-subtitle">
              Simulated tax-aware trade generation to re-align portfolio weights within policy tolerances.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowRebalanceModal(true)}
              >
                <Icon name="activity" size={16} />
                <span>Generate Rebalance Orders</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-gold">
            <span className="label">Rebalance Queue</span>
            <div className="value">3 Orders Staged</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Simulated execution · Awaiting CIO approval</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Proposed Rebalancing Trade Schedule (Simulated)"
          subtitle="Orders prepared by risk engine to eliminate mandate drift"
          columns={[
            {
              key: "action",
              header: "Side / Order",
              render: (r: any) => (
                <span className={`badge ${r.side === "SELL" ? "badge--danger" : "badge--success"}`}>
                  {r.side}
                </span>
              ),
            },
            {
              key: "asset",
              header: "Asset / Holding",
              render: (r: any) => <strong>{r.asset}</strong>,
            },
            {
              key: "amount",
              header: "Proposed Notional ($)",
              render: (r: any) => `$${r.amount.toLocaleString()}`,
            },
            {
              key: "reason",
              header: "Rebalance Rationale",
              render: (r: any) => r.reason,
            },
            {
              key: "approval",
              header: "Approval Required",
              render: (r: any) => (
                <span className="badge badge--warning">{r.approval}</span>
              ),
            },
          ]}
          data={[
            { side: "SELL", asset: "NVDA (Trim Single Issuer)", amount: 1450000, reason: "Single stock breached 7.0% concentration cap (Current: 7.9%)", approval: "CIO Sign-off Needed" },
            { side: "BUY", asset: "US-T 4.5% 2027 Notes", amount: 1200000, reason: "Reset fixed income sleeve from 21.6% back to 24.0% SAA target", approval: "Portfolio Mgr Approval" },
            { side: "BUY", asset: "VXUS (International Beta)", amount: 250000, reason: "Rebalance developed international drift back to policy target", approval: "Portfolio Mgr Approval" },
          ]}
        />

        {showRebalanceModal && (
          <RebalanceModal
            isOpen={showRebalanceModal}
            onClose={() => setShowRebalanceModal(false)}
            onRebalanceComplete={() => {
              setShowRebalanceModal(false)
              showToast({
                title: "Simulated Orders Submitted",
                message: "Trade batch submitted to staged order blotter for compliance authorization.",
                tone: "success",
              })
            }}
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // PAGE 10: PERFORMANCE REPORTS
  // =========================================================================
  if (navId === "reports" || navName === "Performance Reports") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INVESTMENT MANAGER · GIPS REPORTING</span>
            <div className="page-title">Performance Reports & Factor Attribution</div>
            <div className="page-subtitle">
              Formal GIPS compliant performance tearsheets, Brinson-Fachler attribution, and benchmark comparisons.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "Tearsheet Downloaded",
                    message: "Exported Vance Capital Q1 2025 Performance Deck PDF.",
                    tone: "success",
                  })
                }
              >
                <Icon name="document" size={16} />
                <span>Export Performance Tearsheet</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">GIPS Compliance</span>
            <div className="value">Certified Firm</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Independent third-party verification</span>
            </div>
          </div>
        </section>

        <DataTable
          title="Generated Investment Tearsheets & Attribution Reports"
          subtitle="Comprehensive institutional performance packs"
          columns={[
            {
              key: "title",
              header: "Report Title",
              render: (r: any) => <strong>{r.title}</strong>,
            },
            {
              key: "mandate",
              header: "Fund Mandate",
              render: (r: any) => r.mandate,
            },
            {
              key: "period",
              header: "Reporting Period",
              render: (r: any) => r.period,
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
                      title: "Report Download",
                      message: `Downloaded ${r.title}.`,
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
            { title: "Q1 2025 Global Tactical Growth Factor Attribution", mandate: "Global Growth Strategy", period: "Jan - Mar 2025" },
            { title: "Annual GIPS Composite Presentation & Verification", mandate: "Firm-Wide Composite", period: "Calendar Year 2024" },
            { title: "Fixed Income Duration & Credit Spread Decomposition", mandate: "Institutional Credit Fund", period: "April 2025" },
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
            <span className="eyebrow">INVESTMENT MANAGER · MANDATE RULES</span>
            <div className="page-title">Investment Policy Constraints & Settings</div>
            <div className="page-subtitle">
              Manage maximum single-issuer exposure limits, factor constraints, liquidity parameters, and execution rules.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() =>
                  showToast({
                    title: "IPS Constraints Saved",
                    message: "Updated portfolio concentration limits and drift threshold rules.",
                    tone: "success",
                  })
                }
              >
                <Icon name="check" size={16} />
                <span>Save IPS Parameters</span>
              </button>
            </div>
          </div>
          <div className="module-stat tone-navy">
            <span className="label">Concentration Cap</span>
            <div className="value">7.0% Max Single Stock</div>
            <div className="delta positive">
              <Icon name="check" size={14} />
              <span>Strict compliance enforced</span>
            </div>
          </div>
        </section>

        <div className="card" style={{ padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Investment Policy Mandate Constraints</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Chief Investment Officer</label>
              <input
                type="text"
                defaultValue="Victoria Vance, CFA"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Max Single-Issuer Concentration</label>
              <input
                type="text"
                defaultValue="7.0% of Net Asset Value"
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-border, #ddd)", background: "var(--color-bg-input, #fff)", color: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Max Sector Exposure Constraint</label>
              <input
                type="text"
                defaultValue="25.0% Max Sector Weight"
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
          <span className="eyebrow">INVESTMENT MANAGER</span>
          <div className="page-title">{navName || "Investment Module"}</div>
          <div className="page-subtitle">Institutional portfolio management, asset allocation, and risk analytics.</div>
        </div>
      </section>
      <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
        <p>This investment module is ready. Select an item from the sidebar to continue.</p>
        <button
          type="button"
          className="button button--primary"
          onClick={() => onNavigate?.("Portfolios")}
        >
          <span>Go to Portfolios</span>
        </button>
      </div>
    </div>
  )
}
