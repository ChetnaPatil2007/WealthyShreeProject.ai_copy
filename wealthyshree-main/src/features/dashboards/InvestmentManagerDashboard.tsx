import { useState, useMemo } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { ChartCard } from "../../components/ui/ChartCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { RebalanceModal, ExportModal } from "../../components/modals"

export interface InvestmentManagerDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function InvestmentManagerDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: InvestmentManagerDashboardProps) {
  const { showToast } = useToast()
  const [activeQueueTab, setActiveQueueTab] = useState<"alerts" | "rebalance">(
    "alerts",
  )
  const [portfolioFilter, setPortfolioFilter] =
    useState<"all" | "equities" | "multi" | "fixed" | "alts">("all")
  const [showRebalanceModal, setShowRebalanceModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Concentration & Risk alerts mock data
  const concentrationAlerts = [
    {
      id: "a1",
      title: "Tech Sector Allocation Drift",
      scope: "Global Growth Strategy",
      metric: "28.4% (Cap: 25.0%)",
      deadline: "Drift +3.4%",
      severity: "Warning",
      severityTone: "warning",
      details:
        "Mega-cap tech equities appreciation exceeded maximum portfolio constraint.",
    },
    {
      id: "a2",
      title: "Single Issuer Exposure Cap",
      scope: "Alpha Opportunities Fund",
      metric: "7.9% in NVDA (Cap: 7.0%)",
      deadline: "Immediate Action",
      severity: "Critical",
      severityTone: "danger",
      details:
        "Single stock holding breached IPS concentration risk threshold.",
    },
    {
      id: "a3",
      title: "High-Yield Credit Duration Mismatch",
      scope: "Strategic Fixed Income",
      metric: "Duration 6.2Y (Target: 4.5Y)",
      deadline: "Review Needed",
      severity: "Attention",
      severityTone: "info",
      details:
        "Yield curve flattening requires tactical curve steepening adjustment.",
    },
  ]

  // Rebalancing queue mock data
  const rebalanceQueue = [
    {
      id: "rb1",
      portfolio: "Global Multi-Asset Endowment Model",
      aum: "$84,200,000",
      drift: "+4.2%",
      tradesCount: "12 Block Trades",
      status: "Ready to Execute",
      statusTone: "success",
    },
    {
      id: "rb2",
      portfolio: "US Large Cap ESG Momentum Fund",
      aum: "$52,600,000",
      drift: "+3.8%",
      tradesCount: "8 Block Trades",
      status: "Ready to Execute",
      statusTone: "success",
    },
    {
      id: "rb3",
      portfolio: "Emerging Markets Alpha Portfolio",
      aum: "$38,400,000",
      drift: "+5.1%",
      tradesCount: "14 Block Trades",
      status: "Drift Alert",
      statusTone: "warning",
    },
    {
      id: "rb4",
      portfolio: "Conservative Capital Preservation",
      aum: "$46,100,000",
      drift: "+3.1%",
      tradesCount: "6 Block Trades",
      status: "In Staging",
      statusTone: "neutral",
    },
  ]

  // Portfolios list mock data
  const portfolioList = [
    {
      id: "p1",
      name: "Global Multi-Asset Endowment Model",
      assetClass: "Multi-Asset",
      benchmark: "60/40 MSCI World / Agg",
      aum: "$84,200,000",
      ytdReturn: "+15.4%",
      var95: "3.8%",
      drift: "+4.2% (Drift)",
      driftTone: "warning",
      status: "Rebalance Queued",
      statusTone: "warning",
    },
    {
      id: "p2",
      name: "US Large Cap ESG Momentum Strategy",
      assetClass: "Equities",
      benchmark: "S&P 500 ESG Index",
      aum: "$52,600,000",
      ytdReturn: "+18.2%",
      var95: "4.6%",
      drift: "+3.8% (Drift)",
      driftTone: "warning",
      status: "Rebalance Queued",
      statusTone: "warning",
    },
    {
      id: "p3",
      name: "Short-Duration Sovereign & IG Credit",
      assetClass: "Fixed Income",
      benchmark: "Bloomberg US Gov/Credit 1-5Y",
      aum: "$48,900,000",
      ytdReturn: "+5.8%",
      var95: "1.4%",
      drift: "+0.8% (In-Band)",
      driftTone: "success",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "p4",
      name: "Emerging Markets All-Cap Opportunities",
      assetClass: "Equities",
      benchmark: "MSCI Emerging Markets",
      aum: "$38,400,000",
      ytdReturn: "+11.6%",
      var95: "5.4%",
      drift: "+5.1% (Breached)",
      driftTone: "danger",
      status: "Action Required",
      statusTone: "danger",
    },
    {
      id: "p5",
      name: "Private Real Estate & Infrastructure Sleeve",
      assetClass: "Alternatives",
      benchmark: "NCREIF Property Index",
      aum: "$41,100,000",
      ytdReturn: "+9.4%",
      var95: "2.8%",
      drift: "-0.4% (In-Band)",
      driftTone: "success",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "p6",
      name: "Strategic High-Yield & Floating Rate",
      assetClass: "Fixed Income",
      benchmark: "Bloomberg US High Yield",
      aum: "$26,500,000",
      ytdReturn: "+7.9%",
      var95: "3.2%",
      drift: "+1.9% (In-Band)",
      driftTone: "success",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "p7",
      name: "Global Gold & Macro Real Assets",
      assetClass: "Alternatives",
      benchmark: "LBMA Gold Price / Bloomberg Cmdty",
      aum: "$23,600,000",
      ytdReturn: "+16.8%",
      var95: "3.9%",
      drift: "+1.2% (In-Band)",
      driftTone: "success",
      status: "Optimal",
      statusTone: "success",
    },
    {
      id: "p8",
      name: "Global Technology & AI Disruption Fund",
      assetClass: "Equities",
      benchmark: "Nasdaq 100",
      aum: "$27,500,000",
      ytdReturn: "+24.6%",
      var95: "6.2%",
      drift: "+4.9% (Drift)",
      driftTone: "warning",
      status: "Review Due",
      statusTone: "warning",
    },
  ]

  // Filter portfolios
  const filteredPortfolios = useMemo(() => {
    if (portfolioFilter === "equities")
      return portfolioList.filter((p) => p.assetClass === "Equities")
    if (portfolioFilter === "multi")
      return portfolioList.filter((p) => p.assetClass === "Multi-Asset")
    if (portfolioFilter === "fixed")
      return portfolioList.filter((p) => p.assetClass === "Fixed Income")
    if (portfolioFilter === "alts")
      return portfolioList.filter((p) => p.assetClass === "Alternatives")
    return portfolioList
  }, [portfolioFilter])

  const portfolioColumns = [
    {
      key: "name",
      header: "Portfolio / Strategy",
      render: (row: any) => (
        <div>
          <b style={{ color: "var(--ink)", display: "block" }}>{row.name}</b>
          <small style={{ color: "var(--muted)", fontSize: "10px" }}>
            Benchmark: {row.benchmark}
          </small>
        </div>
      ),
    },
    {
      key: "assetClass",
      header: "Asset Class",
      render: (row: any) => (
        <span className="badge badge--neutral">{row.assetClass}</span>
      ),
    },
    {
      key: "aum",
      header: "Strategy AUM",
      render: (row: any) => <b style={{ color: "var(--ink)" }}>{row.aum}</b>,
    },
    {
      key: "ytdReturn",
      header: "YTD Yield (Simulated)",
      render: (row: any) => (
        <span style={{ color: "var(--primary-dark)", fontWeight: 700 }}>
          {row.ytdReturn}
        </span>
      ),
    },
    {
      key: "var95",
      header: "VaR (95%)",
      render: (row: any) => <span>{row.var95}</span>,
    },
    {
      key: "drift",
      header: "Mandate Drift",
      render: (row: any) => (
        <span className={`badge badge--${row.driftTone}`}>{row.drift}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone}`}>{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard investment-dashboard">
      {/* 1. Hero Header & Institutional Simulation Notice */}
      <section className="dashboard-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="badge badge--info">
              SIMULATED INSTITUTIONAL DATA
            </span>
            <span>
              Total Modeled AUM: $342.8M · 8 Portfolios in Rebalance Queue
            </span>
          </div>
          <h1 className="hero-title">Victoria Vance, CFA</h1>
          <p className="hero-subtitle">
            Chief Investment Officer · Vance Capital Management. Multi-asset
            portfolio attribution, downside risk modeling, factor exposure, and
            systematic mandate rebalancing.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate("Rebalancing")}
          >
            <Icon name="activity" size={16} />
            <span>Rebalance Block</span>
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => onNavigate("Risk Analysis")}
          >
            <Icon name="shield" size={16} />
            <span>Risk Analysis</span>
          </button>
        </div>
      </section>

      {/* 2. Seven Core Metric Cards */}
      <section className="metric-grid" aria-label="Investment Manager Metrics">
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
          if (act.id === "batch_trade") setShowRebalanceModal(true)
          else if (act.id === "stress_test") onNavigate("Risk Analysis")
          else if (act.id === "factor_deck") setShowExportModal(true)
          else onOpenAI()
        }}
      />

      {/* 4. Multi-Asset Performance & Allocation Container */}
      <section className="dashboard-grid">
        <ChartCard
          title="Multi-Asset Yield & Benchmark Alpha (Simulated)"
          subtitle="Model portfolio appreciation vs 60/40 benchmark with factor tilts"
          value="+14.2% YTD"
          badge={{ label: "+2.85% Alpha (Simulated)", tone: "success" }}
          legends={[
            {
              label: "Equities ($198.8M)",
              value: "58.0%",
              color: "emerald",
              pct: "58.0%",
            },
            {
              label: "Fixed Income ($75.4M)",
              value: "22.0%",
              color: "navy",
              pct: "22.0%",
            },
            {
              label: "Private Equity & Alts ($41.1M)",
              value: "12.0%",
              color: "violet",
              pct: "12.0%",
            },
            {
              label: "Liquid Reserves ($27.5M)",
              value: "8.0%",
              color: "gray",
              pct: "8.0%",
            },
          ]}
        />

        {/* Risk Exposure & Factor Attribution Card */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">Portfolio Risk Exposure</span>
              <span className="card-sub">
                Parametric VaR & Factor Sensitivities (Simulated)
              </span>
            </div>
            <span className="badge badge--success">Optimal Ratio</span>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>1.84</strong>
              <span>Sharpe Ratio</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--info">VaR 4.1% (95% 1M)</span>
            <span>Sortino: 2.31 · Max Modeled Drawdown: -6.2%</span>
          </div>

          <div className="score-bars">
            {[
              ["Equities Market Beta Exposure (0.94)", "94%"],
              ["Interest Rate Duration Risk (4.2Y)", "72%"],
              ["Credit Spread Volatility Sensitivity", "58%"],
              ["FX & Currency Cross-Hedging Ratio", "86%"],
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

      {/* 5. Concentration Alerts & Rebalancing Execution Queue */}
      <section className="card education-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">Execution Controls & Mandates</span>
            <span className="card-sub">
              {activeQueueTab === "alerts"
                ? "Active sector, asset-class and single-issuer concentration alerts"
                : "Systematic multi-portfolio rebalancing and block trade orders"}
            </span>
          </div>
          <div className="tabs" style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                activeQueueTab === "alerts"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveQueueTab("alerts")}
            >
              <Icon name="alert" size={14} />
              <span>Concentration Alerts (3)</span>
            </button>
            <button
              type="button"
              className={`button button--sm ${
                activeQueueTab === "rebalance"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setActiveQueueTab("rebalance")}
            >
              <Icon name="activity" size={14} />
              <span>Rebalancing Queue (8)</span>
            </button>
          </div>
        </div>

        {activeQueueTab === "alerts" ? (
          <div className="deadline-timeline">
            {concentrationAlerts.map((ca) => (
              <div
                key={ca.id}
                className={`deadline-card ${
                  ca.severityTone === "danger"
                    ? "critical"
                    : ca.severityTone === "warning"
                      ? "urgent"
                      : "normal"
                }`}
              >
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
                    {ca.title}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    Portfolio: {ca.scope} · Value: {ca.metric}
                  </span>
                  <small
                    style={{
                      fontSize: "10px",
                      color: "var(--ink)",
                      marginTop: "2px",
                    }}
                  >
                    {ca.details}
                  </small>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span className={`badge badge--${ca.severityTone}`}>
                    {ca.deadline}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => onNavigate("Rebalancing")}
                  >
                    Adjust Weight
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="agenda-list">
            {rebalanceQueue.map((rb) => (
              <div key={rb.id} className="agenda-item">
                <div
                  className="agenda-time-pill"
                  style={{
                    background: "var(--surface-3)",
                    color: "var(--ink)",
                  }}
                >
                  <span>{rb.drift}</span>
                  <small>Drift</small>
                </div>
                <div className="agenda-info">
                  <div className="agenda-title">{rb.portfolio}</div>
                  <div className="agenda-meta">
                    <span>AUM: {rb.aum}</span>
                    <span>·</span>
                    <span>{rb.tradesCount}</span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className={`badge badge--${rb.statusTone}`}>
                    {rb.status}
                  </span>
                  <button
                    type="button"
                    className="button button--secondary button--sm"
                    onClick={() => {
                      showToast({
                        title: "Rebalance Block",
                        message: `Staging rebalancing order block for ${rb.portfolio}...`,
                        tone: "info",
                      })
                      setShowRebalanceModal(true)
                    }}
                  >
                    Execute Block
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Filterable Portfolios & Mandates Directory Table */}
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
              Institutional Portfolios & Mandate Directory (
              {filteredPortfolios.length})
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Multi-asset fund sleeves, modeled performance, downside VaR, and
              allocation compliance
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={`button button--sm ${
                portfolioFilter === "all"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPortfolioFilter("all")}
            >
              All (8)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                portfolioFilter === "equities"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPortfolioFilter("equities")}
            >
              Equities (3)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                portfolioFilter === "multi"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPortfolioFilter("multi")}
            >
              Multi-Asset (1)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                portfolioFilter === "fixed"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPortfolioFilter("fixed")}
            >
              Fixed Income (2)
            </button>
            <button
              type="button"
              className={`button button--sm ${
                portfolioFilter === "alts"
                  ? "button--primary"
                  : "button--secondary"
              }`}
              onClick={() => setPortfolioFilter("alts")}
            >
              Alternatives (2)
            </button>
          </div>
        </div>

        <DataTable
          title=""
          columns={portfolioColumns}
          data={filteredPortfolios}
          searchPlaceholder="Search portfolio, strategy, or benchmark..."
          actionButton={{
            label: "Export Performance Deck",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      {/* 7. Simulation & Non-Realtime Data Disclosure */}
      <section className="disclaimer-banner">
        <Icon name="shield" size={18} />
        <div>
          <strong>Notice Regarding Simulated Data:</strong> All portfolio
          returns, strategy AUM figures, VaR calculations, and Sharpe ratios
          displayed on this dashboard represent modeled simulations designed for
          institutional workflow demonstration. They do not constitute real-time
          market exchange feeds, live trade executions, or financial return
          guarantees.
        </div>
      </section>

      {/* Interactive Modals */}
      <RebalanceModal
        isOpen={showRebalanceModal}
        onClose={() => setShowRebalanceModal(false)}
        onRebalanceComplete={() => {
          showToast({
            title: "Rebalance Block Executed",
            message:
              "Target mandate allocations successfully applied to portfolio sleeve.",
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Institutional Portfolio Performance Deck"
        defaultFilename="wealthsphere_portfolio_performance"
        headers={[
          "Portfolio / Strategy",
          "Benchmark",
          "Asset Class",
          "AUM",
          "YTD Return",
          "95% VaR",
          "Drift",
          "Status",
        ]}
        data={filteredPortfolios.map((p) => [
          p.name,
          p.benchmark,
          p.assetClass,
          p.aum,
          p.ytdReturn,
          p.var95,
          p.drift,
          p.status,
        ])}
      />
    </div>
  )
}
export default InvestmentManagerDashboard
