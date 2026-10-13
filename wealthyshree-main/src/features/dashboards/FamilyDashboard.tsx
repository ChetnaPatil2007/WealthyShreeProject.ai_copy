import { useState } from "react"
import type { RoleConfig } from "../../types/roles"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { QuickActions } from "../../components/ui/QuickActions"
import { ChartCard } from "../../components/ui/ChartCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { OnboardClientModal } from "../../components/modals/OnboardClientModal"
import { CreateGoalModal } from "../../components/modals/CreateGoalModal"
import { ExportModal } from "../../components/modals/ExportModal"
import type { MockGoal, MockClient } from "../../services/mockData"

export interface FamilyDashboardProps {
  roleConfig: RoleConfig
  onNavigate: (tabName: string) => void
  onOpenAI: () => void
}

export function FamilyDashboard({
  roleConfig,
  onNavigate,
  onOpenAI,
}: FamilyDashboardProps) {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<"tree" | "members">("tree")
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Family members mock data
  const familyMembers = [
    {
      id: "m1",
      name: "Alex Morgan",
      role: "Principal Trustee",
      generation: "Gen 2",
      initials: "AM",
      status: "Full Control",
      contribution: "$6.20M",
      access: "Signatory",
    },
    {
      id: "m2",
      name: "Elena Morgan",
      role: "Co-Trustee (Spouse)",
      generation: "Gen 2",
      initials: "EM",
      status: "Full Control",
      contribution: "$4.80M",
      access: "Signatory",
    },
    {
      id: "m3",
      name: "Eleanor Morgan",
      role: "Family Matriarch",
      generation: "Gen 1",
      initials: "EL",
      status: "Advisory Trustee",
      contribution: "$1.48M",
      access: "Auditor",
    },
    {
      id: "m4",
      name: "Jordan Morgan",
      role: "Next-Gen Scholar (Son)",
      generation: "Gen 3",
      initials: "JM",
      status: "Beneficiary",
      contribution: "529 Trust ($280K)",
      access: "View Restricted",
    },
    {
      id: "m5",
      name: "Maya Morgan",
      role: "Next-Gen Student (Daughter)",
      generation: "Gen 3",
      initials: "MM",
      status: "Beneficiary",
      contribution: "529 Trust ($200K)",
      access: "View Restricted",
    },
  ]

  // Family shared goals
  const familyGoals = [
    {
      id: "fg1",
      name: "Shared Coastal Family Retreat",
      category: "Real Estate",
      current: "$1,800,000",
      target: "$2,500,000",
      pct: 72,
      deadline: "Dec 2027",
      status: "On Track",
    },
    {
      id: "fg2",
      name: "Next-Gen Dynasty Trust Endowment",
      category: "Estate Planning",
      current: "$3,520,000",
      target: "$4,000,000",
      pct: 88,
      deadline: "Nov 2028",
      status: "Ahead",
    },
    {
      id: "fg3",
      name: "Family Heritage Sabbatical",
      category: "Lifestyle",
      current: "$120,000",
      target: "$120,000",
      pct: 100,
      deadline: "Funded",
      status: "Achieved",
    },
  ]

  const [membersList, setMembersList] = useState(familyMembers)
  const [goalsList, setGoalsList] = useState(familyGoals)

  // Shared assets / trusts table
  const sharedAssetRows = [
    {
      id: "1",
      col1: "Morgan Irrevocable Dynasty Trust",
      col2: "Delaware Dynasty Trust",
      col3: "Alex & Northern Trust",
      col4: "$6,800,000",
      status: "Active",
      statusTone: "success",
    },
    {
      id: "2",
      col1: "Morgan Real Estate Holdings LLC",
      col2: "Commercial & Residential",
      col3: "Elena Morgan",
      col4: "$3,450,000",
      status: "Appraised",
      statusTone: "success",
    },
    {
      id: "3",
      col1: "Next-Gen 529 College Trusts",
      col2: "Education Funds",
      col3: "Alex Morgan",
      col4: "$480,000",
      status: "Compliant",
      statusTone: "info",
    },
    {
      id: "4",
      col1: "Morgan Philanthropic Foundation",
      col2: "Donor-Advised Trust",
      col3: "Family Council",
      col4: "$1,750,000",
      status: "Active",
      statusTone: "success",
    },
    {
      id: "5",
      col1: "Family Emergency High-Yield Pool",
      col2: "Liquid Cash",
      col3: "JPMorgan Chase",
      col4: "$280,000",
      status: "Secured",
      statusTone: "success",
    },
  ]

  const sharedAssetColumns = [
    { key: "col1", header: "Structure / Asset" },
    { key: "col2", header: "Legal Category" },
    { key: "col3", header: "Managing Trustee" },
    { key: "col4", header: "Consolidated Value" },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span className={`badge badge--${row.statusTone || "neutral"}`}>
          {row.status}
        </span>
      ),
    },
  ]

  return (
    <div className="role-dashboard family-dashboard">
      {/* 1. Header Greeting & Telemetry */}
      <section className="dashboard-header-container">
        <div className="header-meta">
          <div className="header-date-row">
            <span className="header-eyebrow">MONDAY, 12 MAY</span>
            <span className="header-separator">•</span>
            <span className="header-status-pill">
              <span className="live-indicator-dot" /> Family Governance
              Synchronized
            </span>
            <span className="header-role-pill">
              <Icon name="family" size={13} /> The Morgan Household
            </span>
          </div>
          <h1 className="header-greeting">Family Wealth & Succession Hub</h1>
          <p className="header-subtitle">
            Consolidated oversight across <b>5 family members</b>,{" "}
            <b>3 trusts</b>, and <b>2 operating entities</b>.
          </p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="button button--primary header-primary-btn"
            onClick={() => setShowInviteModal(true)}
          >
            <Icon name="plus" size={16} />
            <span>Invite Member</span>
          </button>
        </div>
      </section>

      {/* 2. Key Family Metrics */}
      <section className="metric-grid" aria-label="Family Wealth KPIs">
        <MetricCard
          label="Combined Net Worth"
          value="$12,480,000"
          detail="+$890,000 (7.7%) YTD"
          icon="trending"
          tone="emerald"
        />
        <MetricCard
          label="Connected Members"
          value="5 Members"
          detail="3 Generations Connected"
          icon="family"
          tone="violet"
        />
        <MetricCard
          label="Shared Emergency Buffer"
          value="$280,000"
          detail="14.2 Months Household Runway"
          icon="shield"
          tone="blue"
        />
        <MetricCard
          label="Succession Readiness"
          value="84%"
          detail="Wills, Trusts & Guardians Verified"
          icon="document"
          tone="gold"
        />
      </section>

      {/* 3. Family Budget & Shared Cash Flow Strip */}
      <section className="cashflow-ribbon card">
        <div className="ribbon-item">
          <span className="ribbon-label">Combined Household Income</span>
          <strong className="ribbon-val text-emerald">$54,000/mo</strong>
          <span className="ribbon-sub">Salaries, Trust Draws & Rentals</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item">
          <span className="ribbon-label">Shared Household Expenses</span>
          <strong className="ribbon-val">$28,400/mo</strong>
          <span className="ribbon-sub">Properties, Education & Living</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item">
          <span className="ribbon-label">Monthly Family Surplus</span>
          <strong className="ribbon-val text-emerald">+$25,600/mo</strong>
          <span className="ribbon-sub">Allocated to Family Trusts</span>
        </div>
        <div className="ribbon-divider" />
        <div className="ribbon-item highlighted">
          <span className="ribbon-label">Family Insurance Pool</span>
          <strong className="ribbon-val rate-badge">$27.0M</strong>
          <span className="ribbon-sub">Umbrella ($15M) + Life ($12M)</span>
        </div>
      </section>

      {/* 4. Quick Actions */}
      <QuickActions
        actions={roleConfig.quickActions}
        roleConfig={roleConfig}
        onExecuteAction={(action) => {
          if (action.id === "update_tree") {
            showToast({
              title: "Family Wealth Tree",
              message:
                "Synchronized ownership hierarchy and Delaware trust linkages.",
              tone: "success",
            })
            onNavigate("Family Wealth Tree")
          } else if (action.id === "review_trust") {
            showToast({
              title: "Trust Review Scan",
              message:
                "Dynasty Trust & Decanting powers validated compliant with current state law.",
              tone: "info",
            })
            onNavigate("Estate Planning")
          } else if (action.id === "invite_member") setShowInviteModal(true)
          else onNavigate("Family Budget")
        }}
      />

      {/* 5. Living Family Wealth Tree & Member Directory Container */}
      <section className="card family-hub-card">
        <div className="card-head">
          <div>
            <span className="card-title">
              {activeTab === "tree"
                ? "Living Family Wealth Tree"
                : "Family Member Directory"}
            </span>
            <span className="card-sub">
              Multi-generational legal entity map and entitlement structure
            </span>
          </div>
          <div className="period-tabs">
            <button
              type="button"
              className={activeTab === "tree" ? "active" : ""}
              onClick={() => setActiveTab("tree")}
            >
              Ownership Tree
            </button>
            <button
              type="button"
              className={activeTab === "members" ? "active" : ""}
              onClick={() => setActiveTab("members")}
            >
              Members (5)
            </button>
          </div>
        </div>

        {activeTab === "tree" ? (
          <div className="family-tree-interactive">
            {/* Visual Wealth Tree Hierarchy */}
            <div className="wealth-tree-diagram">
              {/* Generation 1: Matriarch */}
              <div className="tree-level-row">
                <div className="tree-node advisory">
                  <span className="tree-avatar">EL</span>
                  <div className="tree-node-text">
                    <b>Eleanor Morgan (82)</b>
                    <small>Gen 1 Matriarch · Advisory</small>
                  </div>
                  <span className="tree-pill">$1.48M Legacy</span>
                </div>
              </div>

              <div className="tree-connector-line" />

              {/* Generation 2: Principals */}
              <div className="tree-level-row gen2">
                <div className="tree-node primary">
                  <span className="tree-avatar">AM</span>
                  <div className="tree-node-text">
                    <b>Alex Morgan (48)</b>
                    <small>Principal Trustee</small>
                  </div>
                  <span className="tree-pill primary">$6.2M Contrib</span>
                </div>

                <div className="tree-horizontal-branch" />

                <div className="tree-node primary">
                  <span className="tree-avatar">EM</span>
                  <div className="tree-node-text">
                    <b>Elena Morgan (46)</b>
                    <small>Co-Trustee</small>
                  </div>
                  <span className="tree-pill primary">$4.8M Contrib</span>
                </div>
              </div>

              <div className="tree-connector-line" />

              {/* Legal Entities & Trusts Tier */}
              <div className="tree-level-row entities-tier">
                <div className="tree-node entity">
                  <span className="tree-avatar icon-avatar">
                    <Icon name="document" size={14} />
                  </span>
                  <div className="tree-node-text">
                    <b>Morgan Dynasty Trust</b>
                    <small>Delaware Irrevocable</small>
                  </div>
                  <strong className="tree-val">$6.80M</strong>
                </div>

                <div className="tree-node entity">
                  <span className="tree-avatar icon-avatar">
                    <Icon name="home" size={14} />
                  </span>
                  <div className="tree-node-text">
                    <b>Morgan Real Estate LLC</b>
                    <small>4 Properties</small>
                  </div>
                  <strong className="tree-val">$3.45M</strong>
                </div>

                <div className="tree-node entity">
                  <span className="tree-avatar icon-avatar">
                    <Icon name="sparkle" size={14} />
                  </span>
                  <div className="tree-node-text">
                    <b>Philanthropic Fund</b>
                    <small>Impact & Grants</small>
                  </div>
                  <strong className="tree-val">$1.75M</strong>
                </div>
              </div>

              <div className="tree-connector-line" />

              {/* Generation 3: Heirs & Dependents */}
              <div className="tree-level-row gen3">
                <div className="tree-node nextgen">
                  <span className="tree-avatar nextgen-avatar">JM</span>
                  <div className="tree-node-text">
                    <b>Jordan Morgan (20)</b>
                    <small>Gen 3 Heir · University</small>
                  </div>
                  <span className="tree-pill">529 Trust ($280K)</span>
                </div>

                <div className="tree-node nextgen">
                  <span className="tree-avatar nextgen-avatar">MM</span>
                  <div className="tree-node-text">
                    <b>Maya Morgan (17)</b>
                    <small>Gen 3 Heir · High School</small>
                  </div>
                  <span className="tree-pill">529 Trust ($200K)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="family-members-table-wrapper">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th>Family Member</th>
                  <th>Governance Role</th>
                  <th>Generation</th>
                  <th>Contribution / Trust</th>
                  <th>Permission Level</th>
                </tr>
              </thead>
              <tbody>
                {membersList.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="member-name-cell">
                        <span className="avatar avatar--sm">{m.initials}</span>
                        <b>{m.name}</b>
                      </div>
                    </td>
                    <td>{m.role}</td>
                    <td>
                      <span className="badge badge--info">{m.generation}</span>
                    </td>
                    <td>
                      <b>{m.contribution}</b>
                    </td>
                    <td>
                      <span
                        className={`badge badge--${
                          m.access === "Signatory" ? "success" : "neutral"
                        }`}
                      >
                        {m.access}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 6. Family Wealth Growth & Insurance Coverage Grid */}
      <section className="dashboard-grid">
        <ChartCard
          title="Family Wealth Growth & Legacy Accrual"
          subtitle="Consolidated asset growth trajectory across all 3 family trusts"
          value="$12.48M"
          badge={{ label: "+$890K YTD", tone: "success" }}
          legends={[
            {
              label: "Dynasty Trust",
              value: "$6.80M",
              color: "emerald",
              pct: "55%",
            },
            {
              label: "Real Estate LLC",
              value: "$3.45M",
              color: "navy",
              pct: "28%",
            },
            {
              label: "Foundation Fund",
              value: "$1.75M",
              color: "violet",
              pct: "14%",
            },
            {
              label: "Liquid Buffer",
              value: "$480K",
              color: "gray",
              pct: "3%",
            },
          ]}
        />

        {/* Family Insurance & Protection Pool */}
        <div className="card family-insurance-card">
          <div className="card-head">
            <div>
              <span className="card-title">Family Protection & Coverage</span>
              <span className="card-sub">
                Multi-generational risk shielding
              </span>
            </div>
            <button
              type="button"
              className="button button--icon"
              onClick={() => onNavigate("Insurance")}
              aria-label="View insurance details"
            >
              <Icon name="chevron" size={16} />
            </button>
          </div>

          <div className="protection-meter-block">
            <div className="shield-graphic">
              <Icon name="shield" size={32} />
              <div className="shield-score-text">
                <strong>92%</strong>
                <small>Protected</small>
              </div>
            </div>
            <div className="protection-specs">
              <div>
                <span>Total Cover:</span>
                <b>$27,000,000</b>
              </div>
              <div>
                <span>Umbrella Policy:</span>
                <b>$15,000,000</b>
              </div>
              <div>
                <span>Term Life (Key Earners):</span>
                <b>$12,000,000</b>
              </div>
            </div>
          </div>

          <div className="coverage-status-list">
            <div className="cov-item">
              <Icon name="check" size={14} />
              <span>Comprehensive Health Cover for all 5 Members</span>
              <span className="badge badge--success">Active</span>
            </div>
            <div className="cov-item">
              <Icon name="check" size={14} />
              <span>Estate Transfer Tax Indemnity</span>
              <span className="badge badge--success">Funded</span>
            </div>
            <div className="cov-item">
              <Icon name="alert" size={14} />
              <span>Annual Health Care Proxy Review</span>
              <span className="badge badge--warning">Due Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Family Shared Goals */}
      <section className="goals-section card">
        <div className="card-head">
          <div>
            <span className="card-title">Shared Family Goals & Milestones</span>
            <span className="card-sub">
              Collective vision for current and future generations
            </span>
          </div>
          <button
            type="button"
            className="button button--secondary button--sm"
            onClick={() => setShowGoalModal(true)}
          >
            <Icon name="plus" size={14} />
            <span>Add Family Goal</span>
          </button>
        </div>

        <div className="goals-grid">
          {goalsList.map((g) => (
            <div key={g.id} className="goal-card">
              <div className="goal-top">
                <span className="badge badge--info">{g.category}</span>
                <span className="goal-deadline">{g.deadline}</span>
              </div>
              <strong className="goal-name">{g.name}</strong>
              <div className="goal-amounts">
                <span>
                  Funded: <b>{g.current}</b>
                </span>
                <span>
                  Target: <b>{g.target}</b>
                </span>
              </div>
              <div className="goal-progress-bar">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${g.pct}%` }}
                  />
                </div>
                <div className="progress-info">
                  <span>{g.status}</span>
                  <strong>{g.pct}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Shared Asset & Entity Inventory Table */}
      <section className="dashboard-table-section">
        <DataTable
          title="Consolidated Family Entity & Trust Registry"
          subtitle="Legal entities, Delaware LLCs, trusts, and custodial accounts under governance"
          columns={sharedAssetColumns}
          data={sharedAssetRows}
          searchPlaceholder="Search family trusts and assets…"
          actionButton={{
            label: "Export Trust Census CSV",
            icon: "document",
            onClick: () => setShowExportModal(true),
          }}
        />
      </section>

      <OnboardClientModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onClientCreated={(client: MockClient) => {
          setMembersList((prev) => [
            {
              id: `m_${Date.now()}`,
              name: client.name,
              role: "Family Member / Beneficiary",
              generation: "Next-Gen",
              initials:
                client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "FM",
              status: "Invited",
              contribution: client.aum
                ? `$${client.aum.toLocaleString()}`
                : "$0",
              access: "View Restricted",
            },
            ...prev,
          ])
          showToast({
            title: "Family Member Invited",
            message: `Invitation dispatched to ${client.name} with restricted beneficiary dashboard access.`,
            tone: "success",
          })
        }}
      />

      <CreateGoalModal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onGoalAdded={(goal: MockGoal) => {
          setGoalsList((prev) => [
            {
              id: goal.id,
              name: goal.name,
              category: goal.category,
              current: `$${goal.currentAmount.toLocaleString()}`,
              target: `$${goal.targetAmount.toLocaleString()}`,
              pct: Math.min(
                100,
                Math.round((goal.currentAmount / goal.targetAmount) * 100),
              ),
              deadline: goal.targetDate,
              status: "On Track",
            },
            ...prev,
          ])
          showToast({
            title: "Family Goal Created",
            message: `Milestone "${goal.name}" created with target $${goal.targetAmount.toLocaleString()}.`,
            tone: "success",
          })
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Family Trust Census"
        defaultFilename="family_trust_census.csv"
        headers={[
          "Structure / Asset",
          "Legal Category",
          "Managing Trustee",
          "Consolidated Value",
          "Status",
        ]}
        data={sharedAssetRows.map((r) => [
          r.col1,
          r.col2,
          r.col3,
          r.col4,
          r.status,
        ])}
      />
    </div>
  )
}

export default FamilyDashboard
