import React, { useState, useMemo } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { ChartCard } from "../../components/ui/ChartCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { AddAssetModal } from "../../components/modals/AddAssetModal"
import { CreateGoalModal } from "../../components/modals/CreateGoalModal"
import { RebalanceModal } from "../../components/modals/RebalanceModal"
import { ExportModal } from "../../components/modals/ExportModal"
import { SubmitClaimModal } from "../../components/modals/SubmitClaimModal"
import {
  INITIAL_ASSETS,
  INITIAL_GOALS,
  INITIAL_TRANSACTIONS,
  INITIAL_HOLDINGS,
  INITIAL_POLICIES,
  type MockAsset,
  type MockGoal,
  type MockTransaction,
} from "../../services/mockData"

export interface IndividualPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

export function IndividualModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: IndividualPageProps) {
  const { showToast } = useToast()

  // Modals state
  const [showAddAsset, setShowAddAsset] = useState(false)
  const [showCreateGoal, setShowCreateGoal] = useState(false)
  const [showRebalance, setShowRebalance] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showClaim, setShowClaim] = useState(false)

  // In-memory demo state
  const [assets, setAssets] = useState<MockAsset[]>(INITIAL_ASSETS)
  const [goals, setGoals] = useState<MockGoal[]>(INITIAL_GOALS)
  const [transactions, setTransactions] = useState<MockTransaction[]>(INITIAL_TRANSACTIONS)
  const [txFilter, setTxFilter] = useState<string>("All")
  const [txSearch, setTxSearch] = useState<string>("")
  const [taxYear, setTaxYear] = useState<string>("2025")
  const [taxScenarios, setTaxScenarios] = useState({
    lossHarvest: true,
    backdoorRoth: false,
    dafDonation: false,
  })

  // Settings form state
  const [settings, setSettings] = useState({
    fullName: "Alex Morgan",
    email: "alex.morgan@wealthsphere.ai",
    currency: "USD ($)",
    timezone: "America/New_York (EST)",
    mfaHardware: true,
    largeTxAlerts: true,
    portfolioDriftAlerts: true,
    taxAlerts: true,
    weeklyAiDigest: true,
  })

  // AI Wealth Coach chat state
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: "coach" | "user"; text: string }>>([
    {
      sender: "coach",
      text: "Good morning, Alex. I am your Sphere AI Personal Wealth Coach. Your portfolio is currently tracking +7.1% YTD. We have identified an immediate $18,400 tax loss harvesting opportunity in your discretionary brokerage. How can I assist you today?",
    },
  ])
  const [aiInput, setAiInput] = useState("")

  const handleSendAiMessage = (queryText?: string) => {
    const textToSend = queryText || aiInput
    if (!textToSend.trim()) return

    setAiChatMessages((prev) => [...prev, { sender: "user", text: textToSend }])
    setAiInput("")

    setTimeout(() => {
      let reply = "I have analyzed your wealth profile across all connected accounts. The requested simulation has been modeled."
      const lower = textToSend.toLowerCase()
      if (lower.includes("tax") || lower.includes("harvest")) {
        reply = "Tax Analysis: By harvesting $42,150 in unrealized losses across your secondary equity tranche, you can offset $18,400 in net short-term gains, saving an estimated $6,800 in 2025 federal taxes."
      } else if (lower.includes("retire") || lower.includes("50") || lower.includes("55")) {
        reply = "Retirement Projection: At your current savings rate of 57.8% ($18,460/mo surplus) and a conservative 6.8% return, you are projected to reach financial independence at age 51.4 with an asset base of $4.85M, comfortably exceeding your $4.0M target."
      } else if (lower.includes("runway") || lower.includes("emergency")) {
        reply = "Liquidity Stress Test: Your current cash and liquid treasury reserves stand at $486,200. At an average monthly expenditure of $13,490, your zero-income survival runway is 36.0 months (well above the 12-month fiduciary benchmark)."
      } else if (lower.includes("risk") || lower.includes("drift")) {
        reply = "Portfolio Risk Audit: Portfolio Beta is 0.92 with a Sharpe ratio of 1.84. Public equity weighting currently sits at 38.4% (target: 35.0%), resulting in a +3.4% tech overweight. I recommend rebalancing into treasury reserves."
      }
      setAiChatMessages((prev) => [...prev, { sender: "coach", text: reply }])
    }, 400)
  }

  // Filtered transactions calculation
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesFilter =
        txFilter === "All" ||
        (txFilter === "Income" && t.type === "credit") ||
        (txFilter === "Expenses" && t.type === "debit" && t.category !== "Investment Allocation") ||
        (txFilter === "Investments" && t.category.includes("Investment")) ||
        (txFilter === "Transfers" && (t.category.includes("Transfer") || t.category.includes("Sweep")))

      const matchesSearch =
        !txSearch.trim() ||
        t.description.toLowerCase().includes(txSearch.toLowerCase()) ||
        t.account.toLowerCase().includes(txSearch.toLowerCase()) ||
        t.category.toLowerCase().includes(txSearch.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [transactions, txFilter, txSearch])

  // =========================================================================
  // 1. MY WEALTH & BALANCE SHEET
  // =========================================================================
  if (navId === "my_wealth" || navName === "My Wealth") {
    const totalAssetsVal = assets.reduce((sum, a) => sum + a.valuation, 0)
    const liabilitiesTotal = 690000
    const netWorth = totalAssetsVal - liabilitiesTotal

    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · BALANCE SHEET</span>
            <div className="page-title">My Wealth & Global Balance Sheet</div>
            <div className="page-subtitle">
              Consolidated real-time valuation across all connected custodial accounts, deeds, private holdings, and liabilities.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowAddAsset(true)}
              >
                <Icon name="plus" size={16} /> Connect Account / Add Asset
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Reconciliation Audit",
                    message: "All 6 connected institutional feeds verified with zero ledger variance.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="shield" size={16} /> Audit Telemetry
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Net Worth (Assets - Liabilities)</span>
            <strong>${(netWorth / 1000000).toFixed(2)}M</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Total Net Worth"
            value={`$${(netWorth).toLocaleString()}`}
            detail="+$286,450 (7.1%) YTD"
            icon="trending"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Gross Asset Holdings"
            value={`$${totalAssetsVal.toLocaleString()}`}
            detail="6 Verified Asset Classes"
            icon="bank"
            tone="navy"
            trend="up"
          />
          <MetricCard
            label="Total Liabilities"
            value="$690,000"
            detail="3.125% Fixed Mortgage & Margin"
            icon="card"
            tone="gold"
            trend="down"
          />
          <MetricCard
            label="Liquid Cash & HYSA"
            value="$486,200"
            detail="36.0 Months Survival Runway"
            icon="wallet"
            tone="blue"
            trend="neutral"
          />
        </section>

        {/* Asset Allocation & Liabilities Breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px", marginTop: "16px" }}>
          {/* Asset Allocation Card */}
          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Asset Allocation by Class</span>
                <span className="card-sub">Market valuation across monitored enclaves</span>
              </div>
              <span className="badge badge--success">100% RECONCILED</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
              {[
                { label: "Equities & Global Index ETFs", value: "$1,424,600", pct: 33.2, color: "var(--primary)" },
                { label: "Residential Real Estate (Deed)", value: "$1,182,000", pct: 27.6, color: "var(--navy)" },
                { label: "Private Equity Preferred Stock", value: "$516,000", pct: 12.0, color: "var(--violet)" },
                { label: "High-Yield Cash & Treasury Sweeps", value: "$486,200", pct: 11.3, color: "var(--blue)" },
                { label: "Physical Allocated Gold Bullion", value: "$248,400", pct: 5.8, color: "var(--gold)" },
                { label: "Digital Sovereign Reserves", value: "$72,730", pct: 1.7, color: "#69756f" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                    <b>{item.label}</b>
                    <span>{item.value} ({item.pct}%)</span>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${item.pct * 2.5}%`, height: "100%", background: item.color, borderRadius: "4px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities & Debt Service Card */}
          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Liabilities & Debt Schedule</span>
                <span className="card-sub">Active debt commitments and financing terms</span>
              </div>
              <span className="badge badge--info">LOW D/I RATIO</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }}>
              <div className="list-row" style={{ padding: "8px 0" }}>
                <span className="mini-icon"><Icon name="home" size={16} /></span>
                <div>
                  <b>30-Year Fixed Prime Residential Mortgage</b>
                  <small style={{ color: "var(--muted)" }}>First Republic / JPMorgan · 3.125% Fixed · Maturity 2051</small>
                </div>
                <b style={{ color: "var(--danger)" }}>$580,000</b>
              </div>

              <div className="list-row" style={{ padding: "8px 0" }}>
                <span className="mini-icon"><Icon name="trending" size={16} /></span>
                <div>
                  <b>Secured Margin Credit Line</b>
                  <small style={{ color: "var(--muted)" }}>Interactive Brokers · 5.20% Variable · Collateralized by Equities</small>
                </div>
                <b style={{ color: "var(--danger)" }}>$85,000</b>
              </div>

              <div className="list-row" style={{ padding: "8px 0" }}>
                <span className="mini-icon"><Icon name="card" size={16} /></span>
                <div>
                  <b>Executive Charge Card Rolling Balance</b>
                  <small style={{ color: "var(--muted)" }}>Amex Centurion · 0.00% Net 30 · Scheduled Full Autopay May 28</small>
                </div>
                <b style={{ color: "var(--danger)" }}>$25,000</b>
              </div>

              <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-2)", fontSize: "11px", color: "var(--muted)", marginTop: "8px" }}>
                <Icon name="shield" size={14} style={{ color: "var(--primary)", verticalAlign: "middle", marginRight: "6px" }} />
                Debt-to-Asset ratio is <b>13.8%</b> (Optimal institutional benchmark is &lt; 30%).
              </div>
            </div>
          </div>
        </div>

        {/* Connected Accounts Table */}
        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Connected Holdings & Verified Accounts"
            subtitle="Live balance synchronization across verified financial institutions"
            columns={[
              { key: "name", header: "Account / Holding Name" },
              { key: "category", header: "Category" },
              { key: "institution", header: "Custodian / Registry" },
              {
                key: "valuation",
                header: "Current Value",
                render: (row) => `$${row.valuation.toLocaleString()}`,
              },
              {
                key: "changeYtd",
                header: "YTD Change",
                render: (row) => (
                  <span style={{ color: row.changeYtd.startsWith("+") ? "var(--primary)" : "var(--muted)", fontWeight: 600 }}>
                    {row.changeYtd}
                  </span>
                ),
              },
              {
                key: "isLiquid",
                header: "Liquidity",
                render: (row) => (
                  <span className={`badge badge--${row.isLiquid ? "success" : "info"}`}>
                    {row.isLiquid ? "Liquid" : "Illiquid / Real"}
                  </span>
                ),
              },
            ]}
            data={assets}
            actionButton={{
              label: "Add Holding",
              icon: "plus",
              onClick: () => setShowAddAsset(true),
            }}
          />
        </section>

        <AddAssetModal
          isOpen={showAddAsset}
          onClose={() => setShowAddAsset(false)}
          onAssetAdded={(newAsset) => {
            setAssets((prev) => [newAsset, ...prev])
            showToast({
              title: "Holding Connected",
              message: `Recorded ${newAsset.name} ($${newAsset.valuation.toLocaleString()}) to balance sheet.`,
              tone: "success",
            })
          }}
        />
      </div>
    )
  }

  // =========================================================================
  // 2. TRANSACTIONS
  // =========================================================================
  if (navId === "transactions" || navName === "Transactions") {
    return (
      <div className="module-page">
        <section className="module-hero tone-emerald">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · CASH FLOW LEDGER</span>
            <div className="page-title">Transaction Intelligence & History</div>
            <div className="page-subtitle">
              Automated multi-account ingestion, intelligent category tagging, and verified reconciliation across personal accounts.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowExport(true)}
              >
                <Icon name="document" size={16} /> Export Statement CSV
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Ledger Reconciliation",
                    message: "Synchronized 128 transactions with 0 unclassified entries.",
                    tone: "info",
                  })
                }}
              >
                <Icon name="sparkle" size={16} /> Auto-Classify Pending
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Net Monthly Cashflow</span>
            <strong style={{ color: "var(--primary)" }}>+$18,460</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Total Monthly Inflow"
            value="+$31,950"
            detail="Salary, Dividends, LP Payouts"
            icon="plus"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Total Monthly Outflow"
            value="-$13,490"
            detail="Mortgage, Living, DCA Tranches"
            icon="arrow"
            tone="gold"
            trend="down"
          />
          <MetricCard
            label="Net Monthly Saved"
            value="+$18,460"
            detail="57.8% Savings Rate"
            icon="trending"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Reconciled Ledger Items"
            value={`${transactions.length} Active`}
            detail="100% Cleared without flags"
            icon="check"
            tone="navy"
            trend="neutral"
          />
        </section>

        {/* Filter Controls & Search */}
        <div className="card" style={{ marginTop: "16px", padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {["All", "Income", "Expenses", "Investments", "Transfers"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`button button--secondary ${txFilter === cat ? "active" : ""}`}
                  style={{
                    minHeight: "36px",
                    padding: "0 14px",
                    fontSize: "12px",
                    background: txFilter === cat ? "var(--primary-soft)" : "transparent",
                    color: txFilter === cat ? "var(--primary)" : "var(--muted)",
                    borderColor: txFilter === cat ? "var(--primary)" : "var(--line)",
                  }}
                  onClick={() => setTxFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: "relative", minWidth: "260px" }}>
              <input
                type="text"
                placeholder="Search description, account, category…"
                value={txSearch}
                onChange={(e) => setTxSearch(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "36px",
                  padding: "0 12px 0 32px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  fontSize: "12px",
                }}
              />
              <Icon
                name="search"
                size={14}
                style={{ position: "absolute", left: "10px", top: "11px", color: "var(--muted)" }}
              />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Unified Transaction History"
            subtitle={`Displaying ${filteredTransactions.length} filtered transactions`}
            searchable={false}
            columns={[
              { key: "date", header: "Date & Time" },
              { key: "description", header: "Description / Counterparty" },
              { key: "category", header: "Category" },
              { key: "account", header: "Account" },
              {
                key: "amount",
                header: "Amount",
                render: (row) => {
                  const isCredit = row.type === "credit"
                  return (
                    <b style={{ color: isCredit ? "var(--primary)" : "var(--ink)" }}>
                      {isCredit ? "+" : "-"}${Math.abs(row.amount).toLocaleString()}
                    </b>
                  )
                },
              },
              {
                key: "status",
                header: "Status",
                render: (row) => (
                  <span className={`badge badge--${row.status === "Settled" || row.status === "Cleared" ? "success" : "info"}`}>
                    {row.status}
                  </span>
                ),
              },
            ]}
            data={filteredTransactions}
            actionButton={{
              label: "Export CSV",
              icon: "document",
              onClick: () => setShowExport(true),
            }}
          />
        </section>

        <ExportModal
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          title="Individual Transaction Ledger Export"
          headers={["Date", "Description", "Category", "Account", "Type", "Amount", "Status"]}
          data={filteredTransactions.map((t) => [
            t.date,
            t.description,
            t.category,
            t.account,
            t.type,
            t.amount,
            t.status,
          ])}
          defaultFilename="individual_transactions_export"
        />
      </div>
    )
  }

  // =========================================================================
  // 3. INVESTMENTS & HOLDINGS
  // =========================================================================
  if (navId === "investments" || navName === "Investments") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · PORTFOLIO ENGINE</span>
            <div className="page-title">Personal Investment Universe</div>
            <div className="page-subtitle">
              Discretionary brokerages, retirement IRAs, asset weighting, and automated drift rebalancing telemetry.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowRebalance(true)}
              >
                <Icon name="pie" size={16} /> Simulate Rebalance
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Risk Engine Audit",
                    message: "Portfolio Beta 0.92, Sharpe Ratio 1.84, Drawdown -8.4%. In policy alignment.",
                    tone: "info",
                  })
                }}
              >
                <Icon name="shield" size={16} /> Risk Analysis
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Portfolio Value</span>
            <strong>$2.70M</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Investable Portfolio"
            value="$2,702,600"
            detail="Across Brokerage & IRAs"
            icon="pie"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Annualized 5Y Return"
            value="+11.8%"
            detail="Benchmark S&P +9.4%"
            icon="trending"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Unrealized Capital Gains"
            value="+$424,500"
            detail="+18.6% Cumulative Return"
            icon="sparkle"
            tone="gold"
            trend="up"
          />
          <MetricCard
            label="Risk Factor (Beta)"
            value="0.92"
            detail="Sharpe Ratio 1.84 (Optimal)"
            icon="shield"
            tone="navy"
            trend="neutral"
          />
        </section>

        {/* Holdings Table */}
        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Individual Asset Holdings & Drift Telemetry"
            subtitle="Target asset allocation vs actual market exposure across monitored holdings"
            columns={[
              {
                key: "symbol",
                header: "Ticker",
                render: (row) => <span className="badge badge--neutral">{row.symbol}</span>,
              },
              { key: "name", header: "Holding Name" },
              { key: "assetClass", header: "Asset Class" },
              {
                key: "currentValue",
                header: "Market Value",
                render: (row) => `$${row.currentValue.toLocaleString()}`,
              },
              {
                key: "weight",
                header: "Current Weight",
                render: (row) => `${row.weight}%`,
              },
              {
                key: "targetWeight",
                header: "Target Weight",
                render: (row) => `${row.targetWeight}%`,
              },
              {
                key: "drift",
                header: "Drift",
                render: (row) => {
                  const isOver = row.drift > 0
                  return (
                    <span style={{ color: isOver ? "var(--gold)" : "var(--blue)", fontWeight: 600 }}>
                      {isOver ? "+" : ""}{row.drift}%
                    </span>
                  )
                },
              },
              {
                key: "unrealizedGainPct",
                header: "Total Gain",
                render: (row) => <span style={{ color: "var(--primary)", fontWeight: 600 }}>{row.unrealizedGainPct}</span>,
              },
            ]}
            data={INITIAL_HOLDINGS}
            actionButton={{
              label: "Rebalance Portfolio",
              icon: "pie",
              onClick: () => setShowRebalance(true),
            }}
          />
        </section>

        {/* Secondary Risk & Distribution Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Portfolio Risk Metrics</span>
                <span className="card-sub">Stress testing and factor sensitivity</span>
              </div>
              <span className="badge badge--success">CONSERVATIVE GROWTH</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "14px" }}>
              <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-2)" }}>
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>Portfolio Beta</span>
                <div style={{ font: "700 20px 'Manrope'", marginTop: "4px" }}>0.92</div>
                <small style={{ color: "var(--primary)" }}>8% less volatile than S&P</small>
              </div>
              <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-2)" }}>
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>Sharpe Ratio</span>
                <div style={{ font: "700 20px 'Manrope'", marginTop: "4px" }}>1.84</div>
                <small style={{ color: "var(--primary)" }}>Top quartile risk-adjusted</small>
              </div>
              <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-2)" }}>
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>Max 1Y Drawdown</span>
                <div style={{ font: "700 20px 'Manrope'", marginTop: "4px", color: "var(--gold)" }}>-8.4%</div>
                <small style={{ color: "var(--muted)" }}>Stress modeled in Nov 2024</small>
              </div>
              <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-2)" }}>
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>Annualized Volatility</span>
                <div style={{ font: "700 20px 'Manrope'", marginTop: "4px" }}>11.2%</div>
                <small style={{ color: "var(--primary)" }}>Target range 10-14%</small>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Sector & Asset Breakdown</span>
                <span className="card-sub">Global exposure diversification</span>
              </div>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => {
                  showToast({
                    title: "Sector Drilldown",
                    message: "Technology (38.4%), Healthcare (14.2%), Financials (12.5%), Industrials (9.8%).",
                    tone: "info",
                  })
                }}
              >
                View Sectors
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
              {[
                ["US Large Cap Equities", "38.4%", "var(--primary)"],
                ["US Aggregate Government Bonds", "22.1%", "var(--navy)"],
                ["International Developed Markets", "18.5%", "var(--violet)"],
                ["Physical Gold Bullion Trust", "11.2%", "var(--gold)"],
                ["Private Direct Senior Lending", "9.8%", "var(--blue)"],
              ].map(([name, pct, col]) => (
                <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <i style={{ width: "8px", height: "8px", borderRadius: "2px", background: col }} />
                    {name}
                  </span>
                  <b>{pct}</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RebalanceModal
          isOpen={showRebalance}
          onClose={() => setShowRebalance(false)}
          onRebalanceComplete={() => {
            showToast({
              title: "Rebalance Orders Queued",
              message: "Generated 3 rebalancing tax-aware orders to reset drift within 0.5% tolerance.",
              tone: "success",
            })
          }}
        />
      </div>
    )
  }

  // =========================================================================
  // 4. BUDGET PLANNER
  // =========================================================================
  if (navId === "budget_planner" || navName === "Budget Planner") {
    const budgetCategories = [
      { name: "Housing & Mortgages", planned: 3850, actual: 3850, icon: "home" as const },
      { name: "Core DCA Investment Tranches", planned: 8500, actual: 8500, icon: "trending" as const },
      { name: "Living & Household Essentials", planned: 2000, actual: 1420, icon: "wallet" as const },
      { name: "Executive Travel & Dining", planned: 1500, actual: 860, icon: "globe" as const },
      { name: "Healthcare & Life Insurance", planned: 1200, actual: 1180, icon: "shield" as const },
      { name: "Discretionary & Technology", planned: 1000, actual: 450, icon: "sparkle" as const },
    ]

    return (
      <div className="module-page">
        <section className="module-hero tone-blue">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · CASH FLOW</span>
            <div className="page-title">Personal Budget & Cash Flow Planner</div>
            <div className="page-subtitle">
              Income allocation, committed debt service, automated investment sweeps, and dynamic monthly surplus.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Cashflow Forecast",
                    message: "Projected annual surplus of $221,520 at current monthly velocity.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="trending" size={16} /> Run Cashflow Forecast
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Budget Parameters",
                    message: "Category budgets adjusted. 64.7% surplus target locked.",
                    tone: "info",
                  })
                }}
              >
                <Icon name="settings" size={16} /> Adjust Targets
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Projected Monthly Surplus</span>
            <strong style={{ color: "var(--primary)" }}>$20,670</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Gross Monthly Income"
            value="$31,950"
            detail="Salary & Investment Distributions"
            icon="plus"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Planned Budget Total"
            value="$18,050"
            detail="Including $8.5K DCA investments"
            icon="wallet"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Actual Spent to Date"
            value="$11,280"
            detail="62.5% of planned monthly budget"
            icon="card"
            tone="gold"
            trend="down"
          />
          <MetricCard
            label="Unallocated Surplus"
            value="$20,670"
            detail="64.7% surplus capital rate"
            icon="trending"
            tone="blue"
            trend="up"
          />
        </section>

        {/* Budget Categories Grid */}
        <div className="card" style={{ marginTop: "16px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">Spending Category Limits & Progress</span>
              <span className="card-sub">Planned commitments vs actual debits this month</span>
            </div>
            <span className="badge badge--success">ON TRACK TO SAVE 64%</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
            {budgetCategories.map((cat) => {
              const pct = Math.min(100, Math.round((cat.actual / cat.planned) * 100))
              const remaining = Math.max(0, cat.planned - cat.actual)
              return (
                <div
                  key={cat.name}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, fontSize: "13px" }}>
                      <span className="mini-icon"><Icon name={cat.icon} size={15} /></span>
                      {cat.name}
                    </span>
                    <span className={`badge badge--${pct > 90 ? (pct === 100 ? "info" : "warning") : "success"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--muted)", margin: "6px 0" }}>
                    <span>Spent: <b>${cat.actual.toLocaleString()}</b></span>
                    <span>Budget: ${cat.planned.toLocaleString()}</span>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: pct >= 100 ? "var(--primary)" : pct > 85 ? "var(--gold)" : "var(--blue)",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "6px" }}>
                    Remaining: <b>${remaining.toLocaleString()}</b>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 5. FINANCIAL GOALS
  // =========================================================================
  if (navId === "financial_goals" || navName === "Financial Goals") {
    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
    const totalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0)
    const overallProgress = Math.round((totalCurrent / totalTarget) * 100)

    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · MILESTONES</span>
            <div className="page-title">Personal Financial Goals</div>
            <div className="page-subtitle">
              Turn long-term ambitions into mathematically funded targets backed by monthly surplus allocation.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowCreateGoal(true)}
              >
                <Icon name="plus" size={16} /> Create New Goal
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Goal Probability",
                    message: "All 4 active goals have > 94% Monte Carlo probability of completion.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="shield" size={16} /> Monte Carlo Audit
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Overall Milestone Progress</span>
            <strong style={{ color: "var(--gold)" }}>{overallProgress}%</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Funded Capital"
            value={`$${(totalCurrent / 1000000).toFixed(2)}M`}
            detail={`of $${(totalTarget / 1000000).toFixed(2)}M Target`}
            icon="goal"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Active Life Goals"
            value={`${goals.length} Goals`}
            detail="100% on schedule or funded"
            icon="calendar"
            tone="blue"
            trend="neutral"
          />
          <MetricCard
            label="Monthly Goal Contribution"
            value="$10,700/mo"
            detail="Automatically swept from surplus"
            icon="wallet"
            tone="navy"
            trend="up"
          />
          <MetricCard
            label="Average Horizon"
            value="3.4 Years"
            detail="Target completion 2028"
            icon="trending"
            tone="gold"
            trend="neutral"
          />
        </section>

        {/* Goals Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100))
            const needed = Math.max(0, g.targetAmount - g.currentAmount)
            return (
              <div key={g.id} className="card" style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span className="badge badge--info">{g.category.toUpperCase()}</span>
                    <h3 style={{ font: "600 16px 'Manrope'", margin: "8px 0 4px" }}>{g.name}</h3>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>Target Date: {g.targetDate}</span>
                  </div>
                  <span className={`badge badge--${g.status === "Achieved" ? "success" : "info"}`}>
                    {g.status}
                  </span>
                </div>

                <div style={{ margin: "16px 0 8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                    <b>${g.currentAmount.toLocaleString()}</b>
                    <span style={{ color: "var(--muted)" }}>${g.targetAmount.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ height: "8px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: pct >= 100 ? "var(--primary)" : "linear-gradient(90deg, var(--gold), #58bb96)",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--line)", fontSize: "11px" }}>
                  <span>Remaining: <b>${needed.toLocaleString()}</b></span>
                  <button
                    type="button"
                    className="button button--secondary"
                    style={{ minHeight: "32px", padding: "0 12px", fontSize: "11px" }}
                    onClick={() => {
                      showToast({
                        title: "Goal Deposit",
                        message: `Contributed $2,500 surplus to ${g.name}.`,
                        tone: "success",
                      })
                      setGoals((prev) =>
                        prev.map((item) =>
                          item.id === g.id
                            ? { ...item, currentAmount: Math.min(item.targetAmount, item.currentAmount + 2500) }
                            : item
                        )
                      )
                    }}
                  >
                    <Icon name="plus" size={12} /> Add Funds
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <CreateGoalModal
          isOpen={showCreateGoal}
          onClose={() => setShowCreateGoal(false)}
          onGoalAdded={(newGoal) => {
            setGoals((prev) => [...prev, newGoal])
            showToast({
              title: "Goal Created",
              message: `Goal "${newGoal.name}" ($${newGoal.targetAmount.toLocaleString()}) added to schedule.`,
              tone: "success",
            })
          }}
        />
      </div>
    )
  }

  // =========================================================================
  // 6. INSURANCE & PROTECTION
  // =========================================================================
  if (navId === "insurance" || navName === "Insurance") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · RISK SHIELD</span>
            <div className="page-title">Personal Insurance & Protection</div>
            <div className="page-subtitle">
              Comprehensive personal liability inventory, executive life policies, renewal calendars, and coverage gap detection.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowClaim(true)}
              >
                <Icon name="document" size={16} /> File Insurance Claim
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Underwriter Review",
                    message: "Dispatched review packet to carrier for $10M umbrella policy expansion.",
                    tone: "info",
                  })
                }}
              >
                <Icon name="shield" size={16} /> Review Coverage Gaps
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Total Life & Liability Limit</span>
            <strong style={{ color: "var(--primary)" }}>$27.0M</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Total Coverage Shield"
            value="$27,000,000"
            detail="Life, Umbrella & Real Estate"
            icon="shield"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Annual Premium Cost"
            value="$76,700/yr"
            detail="Spread quarterly via autopay"
            icon="card"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Active Policies"
            value="4 Policies"
            detail="100% in good standing"
            icon="check"
            tone="blue"
            trend="neutral"
          />
          <MetricCard
            label="Identified Gap Score"
            value="78 / 100"
            detail="Umbrella expansion recommended"
            icon="alert"
            tone="gold"
            trend="down"
          />
        </section>

        {/* Identified Coverage Gap Alert */}
        <div className="card" style={{ marginTop: "16px", background: "var(--primary-soft)", borderColor: "var(--primary)" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span className="mini-icon" style={{ background: "white" }}>
              <Icon name="alert" size={18} style={{ color: "var(--gold)" }} />
            </span>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 4px", font: "600 14px 'Manrope'" }}>Fiduciary Advisory Notice: Liability Coverage Gap Detected</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
                Current personal umbrella coverage is <b>$15,000,000</b>. With your recent private equity valuation increase ($516K) and Manhattan real estate appraisal ($1.18M), your net asset exposure exceeds standard protection guidelines. We recommend expanding umbrella coverage to <b>$25,000,000</b>.
              </p>
            </div>
            <button
              type="button"
              className="button button--primary"
              style={{ minHeight: "36px", padding: "0 14px", fontSize: "12px" }}
              onClick={() => {
                showToast({
                  title: "Underwriting Quote",
                  message: "Estimated annual premium increase: $1,400 for additional $10M liability coverage.",
                  tone: "info",
                })
              }}
            >
              Get Expansion Quote
            </button>
          </div>
        </div>

        {/* Policies Table */}
        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Underwritten Policies & Coverage Schedule"
            subtitle="Active insurance contracts protecting personal assets and human capital"
            columns={[
              {
                key: "policyNumber",
                header: "Policy #",
                render: (row) => <span className="badge badge--neutral">{row.policyNumber}</span>,
              },
              { key: "type", header: "Policy Type" },
              { key: "client", header: "Insured Entity" },
              {
                key: "coverageAmount",
                header: "Coverage Limit",
                render: (row) => `$${row.coverageAmount.toLocaleString()}`,
              },
              {
                key: "annualPremium",
                header: "Annual Premium",
                render: (row) => `$${row.annualPremium.toLocaleString()}/yr`,
              },
              { key: "renewalDate", header: "Renewal Date" },
              {
                key: "status",
                header: "Status",
                render: (row) => (
                  <span className={`badge badge--${row.status === "Active" ? "success" : "warning"}`}>
                    {row.status}
                  </span>
                ),
              },
            ]}
            data={INITIAL_POLICIES}
            actionButton={{
              label: "Submit Claim",
              icon: "document",
              onClick: () => setShowClaim(true),
            }}
          />
        </section>

        <SubmitClaimModal
          isOpen={showClaim}
          onClose={() => setShowClaim(false)}
          onClaimSubmitted={(claim) => {
            showToast({
              title: "Claim Submitted",
              message: `Filed claim #${claim.claimNumber} ($${claim.amount.toLocaleString()}). Adjuster assigned.`,
              tone: "success",
            })
          }}
        />
      </div>
    )
  }

  // =========================================================================
  // 7. TAX PLANNER
  // =========================================================================
  if (navId === "tax_planner" || navName === "Tax Planner") {
    const baseEstimatedTax = 86400
    const savings =
      (taxScenarios.lossHarvest ? 18400 : 0) +
      (taxScenarios.backdoorRoth ? 7200 : 0) +
      (taxScenarios.dafDonation ? 12500 : 0)
    const netEstimatedTax = baseEstimatedTax - savings

    return (
      <div className="module-page">
        <section className="module-hero tone-emerald">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · TAX STUDIO</span>
            <div className="page-title">Personal Tax Intelligence & Scenarios</div>
            <div className="page-subtitle">
              Tax bracket optimization, capital gains shielding, deduction tracking, and tax-loss harvesting modeling.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Tax Scenario Applied",
                    message: `Identified $${savings.toLocaleString()} in net tax reductions for tax year ${taxYear}.`,
                    tone: "success",
                  })
                }}
              >
                <Icon name="sparkle" size={16} /> Apply Tax Optimization
              </button>
              <div style={{ display: "inline-flex", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "10px", padding: "2px" }}>
                {["2024", "2025", "2026"].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    style={{
                      border: 0,
                      background: taxYear === yr ? "var(--primary)" : "transparent",
                      color: taxYear === yr ? "white" : "var(--muted)",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => setTaxYear(yr)}
                  >
                    FY {yr}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="module-stat">
            <span>Estimated Tax Liability</span>
            <strong>${(netEstimatedTax).toLocaleString()}</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Gross Taxable Income"
            value="$384,000"
            detail="Salary, Dividends & Cap Gains"
            icon="bank"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Deductions Claimed"
            value="$48,200"
            detail="SALT cap, Mortgage & 401(k)"
            icon="document"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Effective Tax Rate"
            value={`${((netEstimatedTax / 384000) * 100).toFixed(1)}%`}
            detail="Federal & State blended"
            icon="tax"
            tone="gold"
            trend="down"
          />
          <MetricCard
            label="Identified Tax Savings"
            value={`$${savings.toLocaleString()}`}
            detail="Harvesting & shelter active"
            icon="sparkle"
            tone="emerald"
            trend="up"
          />
        </section>

        {/* Planning Scenarios Grid */}
        <div className="card" style={{ marginTop: "16px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">Active Tax Optimization Scenarios</span>
              <span className="card-sub">Toggle simulated scenarios to model liability reductions</span>
            </div>
            <span className="badge badge--success">SAVE UP TO $38,100</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "16px" }}>
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                background: taxScenarios.lossHarvest ? "var(--primary-soft)" : "var(--surface)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="badge badge--success">HIGH IMPACT</span>
                <input
                  type="checkbox"
                  checked={taxScenarios.lossHarvest}
                  onChange={(e) => setTaxScenarios({ ...taxScenarios, lossHarvest: e.target.checked })}
                />
              </div>
              <h4 style={{ margin: "10px 0 4px", font: "600 14px 'Manrope'" }}>Tax-Loss Harvesting</h4>
              <p style={{ fontSize: "11px", color: "var(--muted)", margin: "0 0 10px", lineHeight: 1.5 }}>
                Harvest $42,150 in unrealized tech losses to offset capital gains dollar-for-dollar.
              </p>
              <b style={{ color: "var(--primary)", fontSize: "13px" }}>Save $18,400</b>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                background: taxScenarios.backdoorRoth ? "var(--primary-soft)" : "var(--surface)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="badge badge--info">TAX FREE GROWTH</span>
                <input
                  type="checkbox"
                  checked={taxScenarios.backdoorRoth}
                  onChange={(e) => setTaxScenarios({ ...taxScenarios, backdoorRoth: e.target.checked })}
                />
              </div>
              <h4 style={{ margin: "10px 0 4px", font: "600 14px 'Manrope'" }}>Mega-Backdoor Roth Conversion</h4>
              <p style={{ fontSize: "11px", color: "var(--muted)", margin: "0 0 10px", lineHeight: 1.5 }}>
                Convert $35,000 post-tax 401(k) contributions into Roth IRA for permanent tax exemption.
              </p>
              <b style={{ color: "var(--primary)", fontSize: "13px" }}>Save $7,200</b>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                background: taxScenarios.dafDonation ? "var(--primary-soft)" : "var(--surface)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="badge badge--warning">PHILANTHROPY</span>
                <input
                  type="checkbox"
                  checked={taxScenarios.dafDonation}
                  onChange={(e) => setTaxScenarios({ ...taxScenarios, dafDonation: e.target.checked })}
                />
              </div>
              <h4 style={{ margin: "10px 0 4px", font: "600 14px 'Manrope'" }}>Donor Advised Fund (DAF)</h4>
              <p style={{ fontSize: "11px", color: "var(--muted)", margin: "0 0 10px", lineHeight: 1.5 }}>
                Donate appreciated shares directly to eliminate embedded 20% capital gains tax.
              </p>
              <b style={{ color: "var(--primary)", fontSize: "13px" }}>Save $12,500</b>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 8. RETIREMENT PLANNER
  // =========================================================================
  if (navId === "retirement_planner" || navName === "Retirement Planner") {
    return (
      <div className="module-page">
        <section className="module-hero tone-blue">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · FINANCIAL INDEPENDENCE</span>
            <div className="page-title">Retirement Roadmap & Monte Carlo</div>
            <div className="page-subtitle">
              Simulate cash flow, safe withdrawal rates, inflation shocks, and financial independence timing.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Monte Carlo Simulation",
                    message: "Completed 10,000 trials. 94.2% confidence of funding through age 95.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="sparkle" size={16} /> Run 10,000 Trial Simulation
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Projected FI Age</span>
            <strong style={{ color: "var(--blue)" }}>51.4 Yrs</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Target FI Capital"
            value="$4,000,000"
            detail="$3.20M current funded (80%)"
            icon="goal"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Safe Withdrawal Rate"
            value="3.50%"
            detail="$140,000 / year inflation-adjusted"
            icon="shield"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Monthly Contribution"
            value="$18,460/mo"
            detail="Surplus swept automatically"
            icon="trending"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Plan Confidence"
            value="94.2%"
            detail="Monte Carlo passing threshold"
            icon="check"
            tone="gold"
            trend="up"
          />
        </section>
      </div>
    )
  }

  // =========================================================================
  // 9. AI WEALTH COACH
  // =========================================================================
  if (navId === "ai_coach" || navName === "AI Wealth Coach") {
    return (
      <div className="module-page">
        <section className="module-hero tone-emerald">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · AI CO-PILOT</span>
            <div className="page-title">Sphere AI Wealth Coach</div>
            <div className="page-subtitle">
              Your private 24/7 fiduciary co-pilot with 10 coordinated specialist agents ready to model strategies and review actions.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={openAI}
              >
                <Icon name="ai" size={16} /> Open Orchestration Co-Pilot
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Fiduciary Engine Alignment</span>
            <strong>99.4%</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Contextual Proactive Suggestions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "16px" }}>
          <div className="card" style={{ padding: "16px" }}>
            <span className="badge badge--success">TAX SPECIALIST</span>
            <h4 style={{ margin: "8px 0 4px", font: "600 13px 'Manrope'" }}>Tax Loss Harvest Window</h4>
            <p style={{ margin: "0 0 10px", fontSize: "11px", color: "var(--muted)", lineHeight: 1.5 }}>
              Harvesting two loss positions offsets $18,400 in net gains before year-end.
            </p>
            <button
              type="button"
              className="button button--ghost"
              style={{ padding: 0, fontSize: "11px", color: "var(--primary)" }}
              onClick={() => handleSendAiMessage("How can I execute my $18,400 tax loss harvest?")}
            >
              Ask Coach &rarr;
            </button>
          </div>

          <div className="card" style={{ padding: "16px" }}>
            <span className="badge badge--warning">RISK ENGINE</span>
            <h4 style={{ margin: "8px 0 4px", font: "600 13px 'Manrope'" }}>Tech Overweight Drift</h4>
            <p style={{ margin: "0 0 10px", fontSize: "11px", color: "var(--muted)", lineHeight: 1.5 }}>
              Public equities have drifted +3.4% above your target allocation mandate.
            </p>
            <button
              type="button"
              className="button button--ghost"
              style={{ padding: 0, fontSize: "11px", color: "var(--primary)" }}
              onClick={() => handleSendAiMessage("Show my portfolio risk and allocation drift")}
            >
              Analyze Drift &rarr;
            </button>
          </div>

          <div className="card" style={{ padding: "16px" }}>
            <span className="badge badge--info">PLANNING AGENT</span>
            <h4 style={{ margin: "8px 0 4px", font: "600 13px 'Manrope'" }}>FI Ahead of Schedule</h4>
            <p style={{ margin: "0 0 10px", fontSize: "11px", color: "var(--muted)", lineHeight: 1.5 }}>
              At 57.8% savings velocity, you are 2.6 years ahead of your Age 52 retirement milestone.
            </p>
            <button
              type="button"
              className="button button--ghost"
              style={{ padding: 0, fontSize: "11px", color: "var(--primary)" }}
              onClick={() => handleSendAiMessage("Can I retire at 50 instead of 52?")}
            >
              Simulate Age 50 &rarr;
            </button>
          </div>
        </div>

        {/* Interactive Chat Box */}
        <div className="card" style={{ marginTop: "16px", padding: "20px" }}>
          <div className="card-head">
            <div>
              <span className="card-title">Interactive Fiduciary Chat</span>
              <span className="card-sub">Ask any strategic question regarding your personal wealth</span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[
                "How do I save $18.4K taxes?",
                "Simulate retiring at 50 vs 55",
                "What is my emergency runway?",
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="button button--secondary"
                  style={{ minHeight: "28px", padding: "0 10px", fontSize: "11px", borderRadius: "100px" }}
                  onClick={() => handleSendAiMessage(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div style={{ minHeight: "240px", maxHeight: "380px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0" }}>
            {aiChatMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "coach" ? "flex-start" : "flex-end",
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: msg.sender === "coach" ? "var(--surface-2)" : "var(--primary)",
                  color: msg.sender === "coach" ? "var(--ink)" : "white",
                  fontSize: "12px",
                  lineHeight: 1.55,
                  border: msg.sender === "coach" ? "1px solid var(--line)" : "none",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Ask anything about your investments, taxes, or retirement..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
              style={{
                flex: 1,
                minHeight: "44px",
                padding: "0 14px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                fontSize: "13px",
              }}
            />
            <button
              type="button"
              className="button button--primary"
              onClick={() => handleSendAiMessage()}
            >
              <Icon name="arrow" size={16} /> Send
            </button>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 10. DOCUMENTS VAULT
  // =========================================================================
  if (navId === "documents" || navName === "Documents") {
    const docList = [
      { name: "2024 Form 1040 Individual Joint Tax Return.pdf", cat: "Tax Filings", size: "4.2 MB", date: "Apr 14, 2025", encrypted: true },
      { name: "Alex Morgan Revocable Living Trust Agreement.pdf", cat: "Estate Planning", size: "12.8 MB", date: "Jan 10, 2024", encrypted: true },
      { name: "Manhattan Prime Residential Warranty Deed.pdf", cat: "Property & Real Estate", size: "8.1 MB", date: "Jun 22, 2021", encrypted: true },
      { name: "Executive Term Life Policy Schedule #POL-LIFE-4102.pdf", cat: "Insurance", size: "2.4 MB", date: "Sep 30, 2024", encrypted: true },
      { name: "Vanguard Institutional Custodial Agreement.pdf", cat: "Brokerage & Banking", size: "1.9 MB", date: "Mar 18, 2023", encrypted: true },
    ]

    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · SECURE VAULT</span>
            <div className="page-title">Personal Document Vault</div>
            <div className="page-subtitle">
              AES-256 encrypted repository for deeds, tax returns, custodial agreements, and estate records.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Document Uploaded",
                    message: "Document encrypted with AES-256 and committed to personal vault.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="plus" size={16} /> Upload Document
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Vault Protection</span>
            <strong>100%</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Encrypted Document Inventory"
            subtitle="Verified immutable records with cryptographic hash verification"
            columns={[
              {
                key: "name",
                header: "Document Title",
                render: (row) => (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                    <Icon name="document" size={16} style={{ color: "var(--primary)" }} />
                    {row.name}
                  </span>
                ),
              },
              { key: "cat", header: "Category" },
              { key: "size", header: "File Size" },
              { key: "date", header: "Uploaded Date" },
              {
                key: "encrypted",
                header: "Security",
                render: () => <span className="badge badge--success">AES-256</span>,
              },
            ]}
            data={docList}
            actionButton={{
              label: "Upload Document",
              icon: "plus",
              onClick: () => {
                showToast({
                  title: "Vault Upload",
                  message: "Select PDF or signed document to upload.",
                  tone: "info",
                })
              },
            }}
          />
        </section>
      </div>
    )
  }

  // =========================================================================
  // 11. SETTINGS & PROFILE
  // =========================================================================
  if (navId === "settings" || navName === "Settings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">INDIVIDUAL WORKSPACE · PREFERENCES</span>
            <div className="page-title">Personal Settings & Security Controls</div>
            <div className="page-subtitle">
              Manage personal profile parameters, zero-trust session security, hardware token MFA, and notification triggers.
            </div>
          </div>
          <div className="module-stat">
            <span>Security Posture</span>
            <strong style={{ color: "var(--primary)" }}>STRICT</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", marginTop: "16px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h4 className="card-title" style={{ marginBottom: "16px" }}>Personal Profile Information</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="field">
                <label>Full Legal Name</label>
                <input
                  type="text"
                  value={settings.fullName}
                  onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="field">
                  <label>Base Display Currency</label>
                  <input
                    type="text"
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Primary Timezone</label>
                  <input
                    type="text"
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  />
                </div>
              </div>
              <button
                type="button"
                className="button button--primary"
                style={{ marginTop: "10px", alignSelf: "flex-start" }}
                onClick={() => {
                  showToast({
                    title: "Preferences Saved",
                    message: "Personal profile and currency configurations updated.",
                    tone: "success",
                  })
                }}
              >
                Save Profile Changes
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h4 className="card-title" style={{ marginBottom: "16px" }}>Security & Real-Time Alerts</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <b style={{ fontSize: "12px", display: "block" }}>Hardware Token MFA (FIDO2 / YubiKey)</b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Requires physical security key for sensitive transfers</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.mfaHardware}
                  onChange={(e) => setSettings({ ...settings, mfaHardware: e.target.checked })}
                />
              </label>

              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <b style={{ fontSize: "12px", display: "block" }}>Large Transaction Notifications</b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Immediate SMS & email alert for transactions &gt; $2,500</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.largeTxAlerts}
                  onChange={(e) => setSettings({ ...settings, largeTxAlerts: e.target.checked })}
                />
              </label>

              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <b style={{ fontSize: "12px", display: "block" }}>Portfolio Drift Notifications</b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Alert when any asset class drifts &gt; 3.0% from target mandate</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.portfolioDriftAlerts}
                  onChange={(e) => setSettings({ ...settings, portfolioDriftAlerts: e.target.checked })}
                />
              </label>

              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <b style={{ fontSize: "12px", display: "block" }}>Sphere AI Weekly Briefing</b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Consolidated Monday morning fiduciary performance summary</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.weeklyAiDigest}
                  onChange={(e) => setSettings({ ...settings, weeklyAiDigest: e.target.checked })}
                />
              </label>

              <div style={{ marginTop: "12px", padding: "12px", borderRadius: "10px", background: "var(--surface-2)", fontSize: "11px", color: "var(--muted)" }}>
                <Icon name="shield" size={14} style={{ color: "var(--primary)", verticalAlign: "middle", marginRight: "6px" }} />
                Zero-Trust Session Architecture: Role switching never escalates cryptographic permissions.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback for individual
  return null
}
