import { useState } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { ChartCard } from "../../components/ui/ChartCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { AddAssetModal } from "../../components/modals/AddAssetModal"
import { CreateGoalModal } from "../../components/modals/CreateGoalModal"
import { RebalanceModal } from "../../components/modals/RebalanceModal"
import { ExportModal } from "../../components/modals/ExportModal"
import type { MockAsset, MockGoal } from "../../services/mockData"

export interface IndividualDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function IndividualDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: IndividualDashboardProps) {
  const { showToast } = useToast()
  const [chartPeriod, setChartPeriod] = useState("1Y")
  const [showAddAssetModal, setShowAddAssetModal] = useState(false)
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false)
  const [showRebalanceModal, setShowRebalanceModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Goals mock data
  const goals = [
    {
      id: "g1",
      name: "Early Financial Independence at 52",
      current: "$3,200,000",
      target: "$4,000,000",
      pct: 80,
      deadline: "Oct 2030",
      status: "On Track",
      category: "Retirement",
    },
    {
      id: "g2",
      name: "Coastal Property Purchase",
      current: "$850,000",
      target: "$1,200,000",
      pct: 71,
      deadline: "Jun 2027",
      status: "On Track",
      category: "Real Estate",
    },
    {
      id: "g3",
      name: "Angel Venture Capital Allocation",
      current: "$300,000",
      target: "$300,000",
      pct: 100,
      deadline: "Funded",
      status: "Achieved",
      category: "Investing",
    },
    {
      id: "g4",
      name: "Next-Gen Ivy Education Fund",
      current: "$380,000",
      target: "$450,000",
      pct: 84,
      deadline: "Aug 2028",
      status: "On Track",
      category: "Education",
    },
  ]

  const [goalsList, setGoalsList] = useState(goals)

  // Recent transactions mock data
  const recentTransactions = [
    {
      id: "t1",
      date: "Today",
      description: "Vanguard Total World ETF (VT)",
      category: "Investment Buy",
      account: "Brokerage",
      amount: "-$4,200",
      status: "Settled",
    },
    {
      id: "t2",
      date: "Yesterday",
      description: "Tech Partners Quarterly Dividend",
      category: "Passive Income",
      account: "Checking",
      amount: "+$3,450",
      status: "Cleared",
    },
    {
      id: "t3",
      date: "May 08",
      description: "Manhattan Prime Mortgage Payment",
      category: "Liabilities",
      account: "Mortgage",
      amount: "-$3,850",
      status: "Auto-Paid",
    },
    {
      id: "t4",
      date: "May 04",
      description: "Automatic High-Yield Savings Sweep",
      category: "Emergency Fund",
      account: "HYSA",
      amount: "+$2,500",
      status: "Transferred",
    },
    {
      id: "t5",
      date: "May 01",
      description: "Executive Monthly Retainer",
      category: "Salary Income",
      account: "Checking",
      amount: "+$28,500",
      status: "Cleared",
    },
  ]

  const transactionColumns = [
    { key: "date", header: "Date" },
    { key: "description", header: "Description" },
    { key: "category", header: "Category" },
    { key: "account", header: "Account" },
    {
      key: "amount",
      header: "Amount",
      render: (row: any) => (
        <b className={row.amount.startsWith("+") ? "text-emerald" : ""}>
          {row.amount}
        </b>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span className="badge badge--success">{row.status}</span>
      ),
    },
  ]

  return (
    <div className="role-dashboard individual-dashboard">
      {/* 1. Header Greeting & Telemetry */}
      <section className="dashboard-header-container">
        <div className="header-meta">
          <div className="header-date-row">
            <span className="header-eyebrow">MONDAY, 12 MAY</span>
            <span className="header-separator">•</span>
            <span className="header-status-pill">
              <span className="live-indicator-dot" /> Live Financial Sphere
            </span>
            <span className="header-role-pill">
              <Icon name="user" size={13} /> Individual Private Wealth
            </span>
          </div>
          <h1 className="header-greeting">Good morning, Alex.</h1>
          <p className="header-subtitle">
            Your net worth grew <b>+$28,450</b> this month. Savings rate is
            tracking at <b>56.8%</b> of income.
          </p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="button button--primary header-primary-btn"
            onClick={() => setShowAddAssetModal(true)}
          >
            <Icon name="plus" size={16} />
            <span>Add Asset</span>
          </button>
        </div>
      </section>

      {/* 2. Core Metrics Grid */}
      <section className="metric-grid" aria-label="Individual Financial KPIs">
        <MetricCard
          label="Net Worth"
          value="$4,285,640"
          detail="+$286,450 (7.1%) YTD"
          icon="trending"
          tone="emerald"
        />
        <MetricCard
          label="Total Assets"
          value="$4,713,930"
          detail="Across 27 accounts"
          icon="bank"
          tone="navy"
        />
        <MetricCard
          label="Total Liabilities"
          value="$428,290"
          detail="↓ 3.2% debt reduction"
          icon="card"
          tone="gold"
          trend="down"
        />
        <MetricCard
          label="Emergency Reserve"
          value="$145,000"
          detail="10.3 Months Coverage"
          icon="shield"
          tone="blue"
        />
      </section>

      {/* 3. Cash Flow & Savings Rate Ribbon */}
      <section className="cashflow-ribbon card">
        <div className="ribbon-item">
          <span className="ribbon-label">Monthly Gross Income</span>
          <strong className="ribbon-val text-emerald">$32,500</strong>
          <span className="ribbon-sub">Salary + $4K dividends</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item">
          <span className="ribbon-label">Monthly Total Expenses</span>
          <strong className="ribbon-val">$14,040</strong>
          <span className="ribbon-sub">Fixed & discretionary</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item">
          <span className="ribbon-label">Net Monthly Surplus</span>
          <strong className="ribbon-val text-emerald">+$18,460</strong>
          <span className="ribbon-sub">Available for investing</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item highlighted">
          <span className="ribbon-label">Current Savings Rate</span>
          <strong className="ribbon-val rate-badge">56.8%</strong>
          <span className="ribbon-sub">Target: 50.0% (+6.8% ahead)</span>
        </div>
      </section>

      {/* 4. Quick Actions Launchpad */}
      <QuickActions
        actions={roleConfig.quickActions}
        roleConfig={roleConfig}
        onExecuteAction={(action) => {
          if (action.id === "add_asset") setShowAddAssetModal(true)
          else if (action.id === "run_tax_check") {
            showToast({
              title: "Tax Optimization Scan",
              message:
                "Tax-loss harvesting simulator identified $18,400 in potential capital gains offsets.",
              tone: "info",
            })
            onNavigate("Tax Planner")
          } else if (action.id === "rebalance") setShowRebalanceModal(true)
          else if (action.id === "ask_ai") onOpenAI()
          else onNavigate("My Wealth")
        }}
      />

      {/* 5. Wealth Growth & Health Score Cards */}
      <section className="dashboard-grid">
        <ChartCard
          title="Wealth Growth & Trajectory"
          subtitle="Net worth growth across bank accounts, brokerage, real estate and private equity"
          value="$4.29M"
          badge={{ label: "+7.1% YTD", tone: "success" }}
          periods={["1M", "3M", "6M", "1Y", "ALL"]}
          selectedPeriod={chartPeriod}
          onPeriodChange={setChartPeriod}
          legends={[
            {
              label: "Public Equities",
              value: "$1.42M",
              color: "emerald",
              pct: "33%",
            },
            {
              label: "Prime Real Estate",
              value: "$1.18M",
              color: "navy",
              pct: "28%",
            },
            {
              label: "Fixed Income",
              value: "$684K",
              color: "violet",
              pct: "16%",
            },
            {
              label: "Private Business",
              value: "$516K",
              color: "gold",
              pct: "12%",
            },
            { label: "Liquid Cash", value: "$486K", color: "gray", pct: "11%" },
          ]}
        />

        {/* Financial Health Score (out of 1000) */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <span className="card-title">Financial Health Score</span>
              <span className="card-sub">
                Sphere AI Comprehensive Assessment
              </span>
            </div>
            <button
              type="button"
              className="button button--icon"
              onClick={() => onNavigate("My Wealth")}
              aria-label="View score details"
            >
              <Icon name="chevron" size={16} />
            </button>
          </div>

          <div className="score-ring">
            <svg viewBox="0 0 180 100">
              <path className="ring-bg" d="M20 90a70 70 0 0 1 140 0" />
              <path className="ring-value" d="M20 90a70 70 0 0 1 140 0" />
            </svg>
            <div>
              <strong>824</strong>
              <span>out of 1000</span>
            </div>
          </div>

          <div className="score-grade">
            <span className="badge badge--success">EXCELLENT</span>
            <span>↑ 18 pts this evaluation period</span>
          </div>

          <div className="score-bars">
            {[
              ["Liquidity & Cash Flow", "92%"],
              ["Protection & Insurance", "78%"],
              ["Compound Growth", "86%"],
              ["Retirement Readiness", "73%"],
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

        {/* Investment Overview Donut Card */}
        <div className="card allocation-card">
          <div className="card-head">
            <div>
              <span className="card-title">Investment Overview</span>
              <span className="card-sub">$2,704,310 Investable Capital</span>
            </div>
            <button
              type="button"
              className="button button--icon"
              onClick={() => onNavigate("Investments")}
              aria-label="View investments"
            >
              <Icon name="more" size={16} />
            </button>
          </div>
          <div className="allocation-body">
            <div className="donut">
              <div>
                <strong>$2.70M</strong>
                <span>Invested</span>
              </div>
            </div>
            <div className="legend">
              {[
                {
                  label: "US & Global Stocks",
                  value: "$1.42M",
                  pct: "52.5%",
                  color: "emerald",
                },
                {
                  label: "Fixed Income / Bonds",
                  value: "$684K",
                  pct: "25.3%",
                  color: "violet",
                },
                {
                  label: "Private Equity",
                  value: "$516K",
                  pct: "19.1%",
                  color: "gold",
                },
                {
                  label: "Digital Assets",
                  value: "$84K",
                  pct: "3.1%",
                  color: "gray",
                },
              ].map((a) => (
                <div key={a.label}>
                  <i className={a.color} />
                  <span>{a.label}</span>
                  <b>{a.value}</b>
                  <small>{a.pct}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sphere AI Recommendations */}
        <div className="card ai-card">
          <div className="ai-head">
            <span className="insight-icon">
              <Icon name="ai" size={18} />
            </span>
            <div>
              <span className="card-title">Sphere AI Recommendations</span>
              <span className="card-sub">Active fiduciary intelligence</span>
            </div>
            <span className="badge badge--info">AI Co-Pilot</span>
          </div>
          <div className="recommendations">
            <button type="button" onClick={() => onNavigate("Tax Planner")}>
              <span className="rec-icon green">
                <Icon name="tax" size={16} />
              </span>
              <div>
                <b>Harvest $18,400 in tax losses</b>
                <span>
                  Two tech positions have short-term losses to offset realized
                  gains.
                </span>
                <small>Tax Agent · High Impact</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
            <button type="button" onClick={() => onNavigate("Insurance")}>
              <span className="rec-icon orange">
                <Icon name="insurance" size={16} />
              </span>
              <div>
                <b>Close personal life cover gap</b>
                <span>
                  Current policy is 32% below recommended income replacement
                  multiple.
                </span>
                <small>Protection Agent · Review Needed</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
            <button type="button" onClick={() => onNavigate("Investments")}>
              <span className="rec-icon purple">
                <Icon name="pie" size={16} />
              </span>
              <div>
                <b>Rebalance international equities</b>
                <span>Emerging markets drifted 4.2% from agreed mandate.</span>
                <small>Portfolio Agent · Action Ready</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          </div>
          <button
            type="button"
            className="button button--secondary full"
            onClick={onOpenAI}
          >
            <span>Ask Sphere AI about your wealth</span>
            <Icon name="arrow" size={14} />
          </button>
        </div>
      </section>

      {/* 6. Active Financial Goals Progress */}
      <section className="goals-section card">
        <div className="card-head">
          <div>
            <span className="card-title">Active Financial Goals</span>
            <span className="card-sub">
              Monte Carlo funded probability tracking
            </span>
          </div>
          <button
            type="button"
            className="button button--secondary button--sm"
            onClick={() => setShowCreateGoalModal(true)}
          >
            <Icon name="plus" size={14} />
            <span>Create Goal</span>
          </button>
        </div>

        <div className="goals-grid">
          {goalsList.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-top">
                <span className="badge badge--info">{goal.category}</span>
                <span className="goal-deadline">{goal.deadline}</span>
              </div>
              <strong className="goal-name">{goal.name}</strong>
              <div className="goal-amounts">
                <span>
                  Current: <b>{goal.current}</b>
                </span>
                <span>
                  Target: <b>{goal.target}</b>
                </span>
              </div>
              <div className="goal-progress-bar">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${goal.pct}%` }}
                  />
                </div>
                <div className="progress-info">
                  <span>{goal.status}</span>
                  <strong>{goal.pct}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Recent Transactions & Activity Table */}
      <section className="dashboard-table-section">
        <DataTable
          title="Recent Transactions & Cash Flow"
          subtitle="Real-time multi-account activity across checking, brokerage, and cards"
          columns={transactionColumns}
          data={recentTransactions}
          searchPlaceholder="Search transactions…"
          actionButton={{
            label: "Export Transactions CSV",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      <AddAssetModal
        isOpen={showAddAssetModal}
        onClose={() => setShowAddAssetModal(false)}
        onAssetAdded={(asset: MockAsset) => {
          showToast({
            title: "Asset Recorded",
            message: `${asset.name} valued at $${asset.valuation.toLocaleString()} linked successfully to your portfolio.`,
            tone: "success",
          })
        }}
      />

      <CreateGoalModal
        isOpen={showCreateGoalModal}
        onClose={() => setShowCreateGoalModal(false)}
        onGoalAdded={(newGoal: MockGoal) => {
          setGoalsList((prev) => [
            {
              id: newGoal.id,
              name: newGoal.name,
              current: `$${newGoal.currentAmount.toLocaleString()}`,
              target: `$${newGoal.targetAmount.toLocaleString()}`,
              pct: Math.min(
                100,
                Math.round(
                  (newGoal.currentAmount / newGoal.targetAmount) * 100,
                ),
              ),
              deadline: newGoal.targetDate,
              status: "On Track",
              category: newGoal.category,
            },
            ...prev,
          ])
          showToast({
            title: "Financial Goal Created",
            message: `Goal "${newGoal.name}" established with target $${newGoal.targetAmount.toLocaleString()}.`,
            tone: "success",
          })
        }}
      />

      <RebalanceModal
        isOpen={showRebalanceModal}
        onClose={() => setShowRebalanceModal(false)}
        onRebalanceComplete={() => {
          showToast({
            title: "Allocation Rebalanced",
            message:
              "Target portfolio weights re-aligned across equity, debt, and liquid reserves.",
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Transaction Ledger"
        defaultFilename="individual_transactions.csv"
        headers={[
          "Date",
          "Description",
          "Category",
          "Account",
          "Amount",
          "Status",
        ]}
        data={recentTransactions.map((tx) => [
          tx.date,
          tx.description,
          tx.category,
          tx.account,
          tx.amount,
          tx.status,
        ])}
      />
    </div>
  )
}

export default IndividualDashboard
