import React, { useState } from "react"
import { Icon } from "../../components/ui/Icon"
import { MetricCard } from "../../components/ui/MetricCard"
import { DataTable } from "../../components/ui/DataTable"
import { useToast } from "../../components/ui/Toast"
import { AddAssetModal } from "../../components/modals/AddAssetModal"
import { CreateGoalModal } from "../../components/modals/CreateGoalModal"
import { RebalanceModal } from "../../components/modals/RebalanceModal"
import { ExportModal } from "../../components/modals/ExportModal"
import type { MockAsset, MockGoal } from "../../services/mockData"

export interface FamilyPageProps {
  navId: string
  navName: string
  openAI: () => void
  onNavigate?: (target: string) => void
}

export function FamilyModulePage({
  navId,
  navName,
  openAI,
  onNavigate,
}: FamilyPageProps) {
  const { showToast } = useToast()

  // Modal states
  const [showAddAsset, setShowAddAsset] = useState(false)
  const [showCreateGoal, setShowCreateGoal] = useState(false)
  const [showRebalance, setShowRebalance] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [selectedTreeNode, setSelectedTreeNode] = useState<string | null>("am_em")

  // Family members state
  const [members, setMembers] = useState([
    {
      id: "m1",
      name: "Alex Morgan",
      role: "Principal Trustee",
      generation: "Gen 2",
      initials: "AM",
      relationship: "Household Principal",
      status: "Full Control",
      access: "Signatory",
      contribution: "$28,500/mo (58.8%)",
      trustAllocation: "$6,200,000",
      avatarBg: "var(--primary)",
    },
    {
      id: "m2",
      name: "Elena Morgan",
      role: "Co-Trustee (Spouse)",
      generation: "Gen 2",
      initials: "EM",
      relationship: "Spouse & Co-Trustee",
      status: "Full Control",
      access: "Signatory",
      contribution: "$20,000/mo (41.2%)",
      trustAllocation: "$4,800,000",
      avatarBg: "var(--navy)",
    },
    {
      id: "m3",
      name: "Eleanor Morgan",
      role: "Family Matriarch",
      generation: "Gen 1",
      initials: "EL",
      relationship: "Mother / Advisory",
      status: "Advisory Trustee",
      access: "Auditor",
      contribution: "Lifetime Gift Exemption",
      trustAllocation: "$1,480,000",
      avatarBg: "var(--violet)",
    },
    {
      id: "m4",
      name: "Jordan Morgan",
      role: "Next-Gen Scholar (Son)",
      generation: "Gen 3",
      initials: "JM",
      relationship: "Dependent / Beneficiary",
      status: "Beneficiary",
      access: "View Restricted",
      contribution: "College Student",
      trustAllocation: "529 Trust ($280,000)",
      avatarBg: "var(--blue)",
    },
    {
      id: "m5",
      name: "Maya Morgan",
      role: "Next-Gen Student (Daughter)",
      generation: "Gen 3",
      initials: "MM",
      relationship: "Dependent / Beneficiary",
      status: "Beneficiary",
      access: "View Restricted",
      contribution: "High School Student",
      trustAllocation: "529 Trust ($200,000)",
      avatarBg: "var(--gold)",
    },
  ])

  // Shared assets state
  const [sharedAssets, setSharedAssets] = useState<Array<{
    id: string
    name: string
    entityType: string
    owners: string
    valuation: number
    alexPct: number
    elenaPct: number
    trustPct: number
  }>>([
    {
      id: "sa1",
      name: "Morgan Revocable Living Trust",
      entityType: "Revocable Family Trust",
      owners: "Alex & Elena Morgan",
      valuation: 5420000,
      alexPct: 50,
      elenaPct: 50,
      trustPct: 0,
    },
    {
      id: "sa2",
      name: "Morgan Generational Dynasty Trust",
      entityType: "Irrevocable Trust",
      owners: "Jordan & Maya Morgan (Beneficiaries)",
      valuation: 3850000,
      alexPct: 0,
      elenaPct: 0,
      trustPct: 100,
    },
    {
      id: "sa3",
      name: "Coastal Waterfront Family Retreat",
      entityType: "Real Estate (JTWROS)",
      owners: "Alex & Elena Morgan (Joint Tenants)",
      valuation: 1800000,
      alexPct: 50,
      elenaPct: 50,
      trustPct: 0,
    },
    {
      id: "sa4",
      name: "MV Family Capital Holdings LLC",
      entityType: "Operating & Holding LLC",
      owners: "Alex (45%), Elena (35%), Dynasty Trust (20%)",
      valuation: 930000,
      alexPct: 45,
      elenaPct: 35,
      trustPct: 20,
    },
    {
      id: "sa5",
      name: "Next-Gen 529 College Savings Portfolios",
      entityType: "Custodial Educational Trust",
      owners: "Jordan ($280K) & Maya ($200K)",
      valuation: 480000,
      alexPct: 0,
      elenaPct: 0,
      trustPct: 100,
    },
  ])

  // Family goals state
  const [familyGoals, setFamilyGoals] = useState([
    {
      id: "fg1",
      name: "Shared Coastal Family Retreat",
      category: "Real Estate",
      current: 1800000,
      target: 2500000,
      deadline: "Dec 2027",
      status: "On Track",
      contributors: "Alex (60%), Elena (40%)",
    },
    {
      id: "fg2",
      name: "Next-Gen Dynasty Trust Endowment",
      category: "Estate Planning",
      current: 2100000,
      target: 3000000,
      deadline: "Oct 2029",
      status: "On Track",
      contributors: "Household Surplus & Matriarch Gift",
    },
    {
      id: "fg3",
      name: "Jordan & Maya College Graduation Buffer",
      category: "Education",
      current: 480000,
      target: 500000,
      deadline: "Jun 2026",
      status: "Almost Funded",
      contributors: "529 Automated Sweeps",
    },
    {
      id: "fg4",
      name: "Morgan Family Philanthropic Foundation",
      category: "Legacy",
      current: 750000,
      target: 1000000,
      deadline: "Dec 2028",
      status: "On Track",
      contributors: "DAF Stock Donations",
    },
  ])

  // Family settings state
  const [familySettings, setFamilySettings] = useState({
    workspaceName: "Morgan Family Dynasty & Governance",
    multiSigThreshold: 50000,
    multiSigEnabled: true,
    allowBeneficiaryView: true,
    weeklyHouseholdDigest: true,
    trustDriftNotification: true,
  })

  // =========================================================================
  // 1. FAMILY MEMBERS
  // =========================================================================
  if (navId === "family_members" || navName === "Family Members") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · GOVERNANCE</span>
            <div className="page-title">Household Members & Signatory Roles</div>
            <div className="page-subtitle">
              Manage family trustees, advisory matriarchs, and next-gen beneficiaries across 3 generations of stewardship.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Invite Family Member",
                    message: "Invitation link generated with restricted zero-trust onboarding credentials.",
                    tone: "info",
                  })
                }}
              >
                <Icon name="family" size={16} /> Invite Family Member
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Signatory Audit",
                    message: "2 of 2 primary trustees verified with active digital signing certificates.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="shield" size={16} /> Audit Signing Roles
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Household Members</span>
            <strong>5 Active</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Generations Represented"
            value="3 Generations"
            detail="Matriarch to Next-Gen Scholars"
            icon="family"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Full Signatory Trustees"
            value="2 Trustees"
            detail="Alex & Elena (Dual authorization)"
            icon="shield"
            tone="emerald"
            trend="neutral"
          />
          <MetricCard
            label="Next-Gen Beneficiaries"
            value="2 Members"
            detail="Jordan (Gen 3) & Maya (Gen 3)"
            icon="book"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Consolidated Family AUM"
            value="$12,480,000"
            detail="100% under trust governance"
            icon="bank"
            tone="gold"
            trend="up"
          />
        </section>

        {/* Member Profile Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          {members.map((m) => (
            <div key={m.id} className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span
                    className="avatar"
                    style={{ width: "42px", height: "42px", fontSize: "14px", background: m.avatarBg }}
                  >
                    {m.initials}
                  </span>
                  <div>
                    <h3 style={{ font: "600 16px 'Manrope'", margin: "0 0 2px" }}>{m.name}</h3>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>{m.role} · {m.generation}</span>
                  </div>
                </div>
                <span className={`badge badge--${m.access === "Signatory" ? "success" : m.access === "Auditor" ? "warning" : "info"}`}>
                  {m.access}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px", padding: "12px", borderRadius: "10px", background: "var(--surface-2)", fontSize: "11px" }}>
                <div>
                  <span style={{ color: "var(--muted)", display: "block" }}>Relationship</span>
                  <b>{m.relationship}</b>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block" }}>Governance Status</span>
                  <b>{m.status}</b>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block" }}>Monthly Contribution</span>
                  <b>{m.contribution}</b>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block" }}>Trust / Account Allocation</span>
                  <b>{m.trustAllocation}</b>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "14px" }}>
                <button
                  type="button"
                  className="button button--secondary"
                  style={{ minHeight: "32px", padding: "0 12px", fontSize: "11px" }}
                  onClick={() => {
                    showToast({
                      title: "Member Permissions",
                      message: `Opened permission review for ${m.name}. Access level: ${m.access}.`,
                      tone: "info",
                    })
                  }}
                >
                  Manage Permissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // =========================================================================
  // 2. SHARED ASSETS
  // =========================================================================
  if (navId === "shared_assets" || navName === "Shared Assets") {
    const totalSharedVal = sharedAssets.reduce((sum, a) => sum + a.valuation, 0)

    return (
      <div className="module-page">
        <section className="module-hero tone-emerald">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · ASSET OWNERSHIP</span>
            <div className="page-title">Shared Assets & Entity Ownership</div>
            <div className="page-subtitle">
              Multi-member real estate, family revocable living trusts, holding LLCs, and custodial college funds.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowAddAsset(true)}
              >
                <Icon name="plus" size={16} /> Register Shared Asset
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setShowExport(true)}
              >
                <Icon name="document" size={16} /> Export Ownership Ledger
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Total Shared Assets</span>
            <strong>${(totalSharedVal / 1000000).toFixed(2)}M</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Consolidated Family AUM"
            value={`$${(totalSharedVal / 1000000).toFixed(2)}M`}
            detail="Across 5 legal structures"
            icon="bank"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Joint Spousal Assets"
            value="$7,220,000"
            detail="Revocable Trust & Retreat"
            icon="family"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Dynasty Irrevocable Trust"
            value="$3,850,000"
            detail="Sheltered from estate duty"
            icon="shield"
            tone="violet"
            trend="up"
          />
          <MetricCard
            label="Custodial Education 529"
            value="$480,000"
            detail="Jordan & Maya designated"
            icon="book"
            tone="blue"
            trend="up"
          />
        </section>

        {/* Shared Assets Table */}
        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Shared Asset Inventory & Ownership Percentages"
            subtitle="Legal entity structures and beneficial ownership breakdown"
            columns={[
              { key: "name", header: "Asset / Entity Name" },
              { key: "entityType", header: "Structure Type" },
              { key: "owners", header: "Beneficial Owners" },
              {
                key: "valuation",
                header: "Current Value",
                render: (row) => `$${row.valuation.toLocaleString()}`,
              },
              {
                key: "split",
                header: "Ownership Breakdown",
                render: (row) => (
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    {row.alexPct > 0 && <span className="badge badge--success">Alex {row.alexPct}%</span>}
                    {row.elenaPct > 0 && <span className="badge badge--info">Elena {row.elenaPct}%</span>}
                    {row.trustPct > 0 && <span className="badge badge--warning">Trust {row.trustPct}%</span>}
                  </div>
                ),
              },
            ]}
            data={sharedAssets}
            actionButton={{
              label: "Add Asset",
              icon: "plus",
              onClick: () => setShowAddAsset(true),
            }}
          />
        </section>

        <AddAssetModal
          isOpen={showAddAsset}
          onClose={() => setShowAddAsset(false)}
          onAssetAdded={(asset) => {
            setSharedAssets((prev) => [
              {
                id: asset.id,
                name: asset.name,
                entityType: "Shared Family Holding",
                owners: "Alex & Elena Morgan",
                valuation: asset.valuation,
                alexPct: 50,
                elenaPct: 50,
                trustPct: 0,
              },
              ...prev,
            ])
            showToast({
              title: "Shared Asset Registered",
              message: `Recorded ${asset.name} ($${asset.valuation.toLocaleString()}) under household ownership.`,
              tone: "success",
            })
          }}
        />

        <ExportModal
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          title="Family Shared Assets Export"
          headers={["Asset Name", "Entity Structure", "Owners", "Valuation"]}
          data={sharedAssets.map((a) => [a.name, a.entityType, a.owners, a.valuation])}
          defaultFilename="family_shared_assets_export"
        />
      </div>
    )
  }

  // =========================================================================
  // 3. FAMILY BUDGET
  // =========================================================================
  if (navId === "family_budget" || navName === "Family Budget") {
    const familyBudgetCategories = [
      { name: "Mortgage & Property Maintenance", planned: 5800, actual: 5800, icon: "home" as const },
      { name: "Next-Gen Private Education & Tutors", planned: 4500, actual: 4200, icon: "book" as const },
      { name: "Family Healthcare & Comprehensive Insurance", planned: 2500, actual: 2400, icon: "shield" as const },
      { name: "Household Living & Provisions", planned: 3200, actual: 2800, icon: "wallet" as const },
      { name: "Annual Family Vacation Sinking Fund", planned: 3000, actual: 3000, icon: "globe" as const },
      { name: "Family Transport & Vehicle Upkeep", planned: 1500, actual: 1200, icon: "card" as const },
    ]

    return (
      <div className="module-page">
        <section className="module-hero tone-blue">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · CASH FLOW</span>
            <div className="page-title">Household Budget & Shared Cash Flow</div>
            <div className="page-subtitle">
              Dual-income household tracking, spousal contribution splits, and shared family sinking funds.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Household Surplus",
                    message: "Family monthly surplus of $30,300 automatically swept to trust investments.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="plus" size={16} /> Sweep Surplus to Trusts
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Net Family Monthly Surplus</span>
            <strong style={{ color: "var(--primary)" }}>$30,300</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Combined Monthly Inflow"
            value="$48,500/mo"
            detail="Alex ($28.5K) + Elena ($20.0K)"
            icon="plus"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Shared Household Expenses"
            value="$18,200/mo"
            detail="6 active household categories"
            icon="wallet"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Household Savings Rate"
            value="62.5%"
            detail="Projected $363,600 annual surplus"
            icon="trending"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Discretionary Cushion"
            value="$4,200"
            detail="Remaining unspent this month"
            icon="card"
            tone="gold"
            trend="up"
          />
        </section>

        {/* Spousal Contribution Split & Shared Categories */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "16px", marginTop: "16px" }}>
          {/* Spousal Split Card */}
          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Income Contribution Split</span>
                <span className="card-sub">Equitable household funding model</span>
              </div>
              <span className="badge badge--success">PROPORTIONAL</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span><b>Alex Morgan</b> (Principal)</span>
                  <b>$28,500/mo (58.8%)</b>
                </div>
                <div style={{ height: "8px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "58.8%", height: "100%", background: "var(--primary)", borderRadius: "4px" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span><b>Elena Morgan</b> (Co-Trustee)</span>
                  <b>$20,000/mo (41.2%)</b>
                </div>
                <div style={{ height: "8px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "41.2%", height: "100%", background: "var(--navy)", borderRadius: "4px" }} />
                </div>
              </div>

              <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-2)", fontSize: "11px", color: "var(--muted)", lineHeight: 1.5 }}>
                <Icon name="check" size={14} style={{ color: "var(--primary)", verticalAlign: "middle", marginRight: "6px" }} />
                Shared expenses ($18,200) are drawn automatically: Alex covers $10,700 (58.8%) and Elena covers $7,500 (41.2%).
              </div>
            </div>
          </div>

          {/* Shared Category Spending */}
          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Shared Budget Categories</span>
                <span className="card-sub">Month-to-date household disbursements</span>
              </div>
              <span className="badge badge--info">ON SCHEDULE</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
              {familyBudgetCategories.map((cat) => {
                const pct = Math.min(100, Math.round((cat.actual / cat.planned) * 100))
                return (
                  <div key={cat.name} style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-2)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Icon name={cat.icon} size={14} />
                        {cat.name}
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--muted)", margin: "4px 0" }}>
                      <span>${cat.actual.toLocaleString()}</span>
                      <span>of ${cat.planned.toLocaleString()}</span>
                    </div>
                    <div style={{ height: "5px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "var(--primary)", borderRadius: "4px" }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 4. SHARED GOALS
  // =========================================================================
  if (navId === "shared_goals" || navName === "Shared Goals") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · COLLABORATIVE TARGETS</span>
            <div className="page-title">Shared Family Goals & Milestones</div>
            <div className="page-subtitle">
              Multi-generational capital targets funded collaboratively across household members and trust distributions.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowCreateGoal(true)}
              >
                <Icon name="plus" size={16} /> Create Family Goal
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Funded Household Targets</span>
            <strong>$5.13M</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Goals Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          {familyGoals.map((g) => {
            const pct = Math.min(100, Math.round((g.current / g.target) * 100))
            const needed = Math.max(0, g.target - g.current)
            return (
              <div key={g.id} className="card" style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span className="badge badge--info">{g.category.toUpperCase()}</span>
                    <h3 style={{ font: "600 16px 'Manrope'", margin: "8px 0 4px" }}>{g.name}</h3>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>Target Date: {g.deadline}</span>
                  </div>
                  <span className="badge badge--success">{g.status}</span>
                </div>

                <div style={{ margin: "14px 0 8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                    <b>${g.current.toLocaleString()}</b>
                    <span style={{ color: "var(--muted)" }}>${g.target.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ height: "8px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, var(--primary), var(--gold))",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--line)", fontSize: "11px" }}>
                  <div>
                    <span style={{ color: "var(--muted)" }}>Funding Split: </span>
                    <b>{g.contributors}</b>
                  </div>
                  <button
                    type="button"
                    className="button button--secondary"
                    style={{ minHeight: "32px", padding: "0 12px", fontSize: "11px" }}
                    onClick={() => {
                      showToast({
                        title: "Family Goal Contribution",
                        message: `Deposited $10,000 to ${g.name}.`,
                        tone: "success",
                      })
                      setFamilyGoals((prev) =>
                        prev.map((item) =>
                          item.id === g.id ? { ...item, current: Math.min(item.target, item.current + 10000) } : item
                        )
                      )
                    }}
                  >
                    <Icon name="plus" size={12} /> Contribute Funds
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
            setFamilyGoals((prev) => [
              {
                id: newGoal.id,
                name: newGoal.name,
                category: newGoal.category,
                current: newGoal.currentAmount || 0,
                target: newGoal.targetAmount,
                deadline: newGoal.targetDate,
                status: "On Track",
                contributors: "Alex (50%), Elena (50%)",
              },
              ...prev,
            ])
            showToast({
              title: "Family Goal Created",
              message: `Created collaborative goal "${newGoal.name}".`,
              tone: "success",
            })
          }}
        />
      </div>
    )
  }

  // =========================================================================
  // 5. INVESTMENTS (FAMILY CONSOLIDATED)
  // =========================================================================
  if (navId === "investments" || navName === "Investments") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · MULTI-TRUST PORTFOLIO</span>
            <div className="page-title">Consolidated Household Investment Universe</div>
            <div className="page-subtitle">
              Unified asset allocation, risk policy governance, and multi-generational trust distribution schedules.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => setShowRebalance(true)}
              >
                <Icon name="pie" size={16} /> Simulate Family Rebalance
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Trust Mandate Verification",
                    message: "All 3 family trusts comply with statutory Prudent Investor Act standards.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="shield" size={16} /> Verify Trust Mandates
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Family Portfolio Total</span>
            <strong>$12.48M</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Consolidated Household AUM"
            value="$12,480,000"
            detail="Across 5 legal structures"
            icon="pie"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Blended 5Y Return"
            value="+10.4% Annually"
            detail="Prudent fiduciary allocation"
            icon="trending"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Capital Preservation Shield"
            value="$3,120,000"
            detail="25% Fixed Income & Treasuries"
            icon="shield"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Annual Passive Distributions"
            value="$428,290/year"
            detail="Dividends, interest & LP yields"
            icon="bank"
            tone="gold"
            trend="up"
          />
        </section>

        {/* Allocation Breakdown by Trust */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", marginTop: "16px" }}>
          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Consolidated Asset Allocation</span>
                <span className="card-sub">Multi-generational risk distribution</span>
              </div>
              <span className="badge badge--success">BALANCED GROWTH</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }}>
              {[
                { label: "Global Diversified Equities (US & Intl)", value: "$5,366,000", pct: 43.0, color: "var(--primary)" },
                { label: "Government Bonds & Treasury Reserves", value: "$3,120,000", pct: 25.0, color: "var(--navy)" },
                { label: "Direct Real Estate (Coastal & Manhattan)", value: "$2,246,000", pct: 18.0, color: "var(--violet)" },
                { label: "Cash, HYSA & Liquidity Sweeps", value: "$1,748,000", pct: 14.0, color: "var(--gold)" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                    <b>{item.label}</b>
                    <span>{item.value} ({item.pct}%)</span>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-3)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${item.pct * 2.2}%`, height: "100%", background: item.color, borderRadius: "4px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <span className="card-title">Holdings by Trust Structure</span>
                <span className="card-sub">Legal ownership distribution</span>
              </div>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => {
                  showToast({
                    title: "Trust Ownership Breakdown",
                    message: "Revocable Living Trust ($5.42M), Dynasty Trust ($3.85M), Joint Real Estate ($1.8M), MV Capital ($930K), 529s ($480K).",
                    tone: "info",
                  })
                }}
              >
                Inspect Trusts
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
              {[
                ["Morgan Revocable Living Trust", "$5,420,000", "43.4%"],
                ["Generational Dynastic Trust (Irrevocable)", "$3,850,000", "30.8%"],
                ["Alex & Elena Joint Brokerage & Real Estate", "$1,800,000", "14.4%"],
                ["MV Family Capital Holding LLC", "$930,000", "7.5%"],
                ["Next-Gen Custodial 529 College Plans", "$480,000", "3.9%"],
              ].map(([name, val, pct]) => (
                <div key={name} className="list-row" style={{ padding: "6px 0" }}>
                  <div>
                    <b>{name}</b>
                  </div>
                  <span style={{ fontWeight: 600 }}>{val}</span>
                  <span className="badge badge--neutral">{pct}</span>
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
              title: "Family Rebalance Executed",
              message: "Synchronized allocations across all 3 family trusts.",
              tone: "success",
            })
          }}
        />
      </div>
    )
  }

  // =========================================================================
  // 6. INSURANCE (FAMILY COVERAGE)
  // =========================================================================
  if (navId === "insurance" || navName === "Insurance") {
    return (
      <div className="module-page">
        <section className="module-hero tone-gold">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · COMPREHENSIVE SHIELD</span>
            <div className="page-title">Household Protection & Policies</div>
            <div className="page-subtitle">
              Comprehensive umbrella, life, health, and property liability shielding all 5 family members across 3 generations.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Coverage Audit",
                    message: "All 5 family members covered under comprehensive medical and umbrella policies.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="shield" size={16} /> Audit Family Coverage
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Total Family Coverage</span>
            <strong>$20.5M</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Total Umbrella & Life"
            value="$20,500,000"
            detail="Shielding household assets"
            icon="shield"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Household Annual Premium"
            value="$86,700/year"
            detail="Combined health, life & umbrella"
            icon="card"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Covered Dependents"
            value="5 of 5 Members"
            detail="100% active health coverage"
            icon="family"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Identified Risk Gap"
            value="1 Policy Review Due"
            detail="Senior long-term care inflation"
            icon="alert"
            tone="gold"
            trend="down"
          />
        </section>

        {/* Policies by Family Member */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          <div className="card" style={{ padding: "16px" }}>
            <span className="badge badge--success">GEN 2 · PRINCIPAL SPOUSES</span>
            <h4 style={{ margin: "10px 0 6px", font: "600 14px 'Manrope'" }}>Alex & Elena Morgan Coverage</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Alex Key Person Term Life:</span>
                <b>$10,000,000 (Active)</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Elena Executive Term Life:</span>
                <b>$5,000,000 (Active)</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Comprehensive Family Medical:</span>
                <b>$2,000,000 / year (Active)</b>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "16px" }}>
            <span className="badge badge--warning">GEN 1 · FAMILY MATRIARCH</span>
            <h4 style={{ margin: "10px 0 6px", font: "600 14px 'Manrope'" }}>Eleanor Morgan Coverage</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Senior Comprehensive Health:</span>
                <b>$1,500,000 (Active)</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Long-Term Care Protection:</span>
                <b>$800,000 (Inflation Review Due)</b>
              </div>
              <small style={{ color: "var(--gold)" }}>Review rider with carrier before Nov 2025</small>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 7. FAMILY WEALTH TREE
  // =========================================================================
  if (navId === "wealth_tree" || navName === "Family Wealth Tree") {
    return (
      <div className="module-page">
        <section className="module-hero tone-violet">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · 3D SUCCESSION ARCHITECTURE</span>
            <div className="page-title">Living Family Wealth & Succession Map</div>
            <div className="page-subtitle">
              Interactive relationship pedigree connecting bloodline beneficiaries, revocable trusts, operating holding LLCs, and future asset distribution paths.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Succession Map Exported",
                    message: "Generated high-resolution encrypted PDF family tree for estate counsel.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="document" size={16} /> Export Succession Map
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  showToast({
                    title: "Generational Transfer Simulation",
                    message: "Projected 0% federal estate tax due to active dynastic trust shelters.",
                    tone: "info",
                  })
                }}
              >
                <Icon name="sparkle" size={16} /> Simulate Transfer
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Connected Entities</span>
            <strong style={{ color: "var(--violet)" }}>24 Nodes</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Interactive Visual Family Tree Card */}
        <div className="card" style={{ marginTop: "16px", padding: "28px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <span className="card-title">Multi-Generational Wealth & Entity Pedigree</span>
              <span className="card-sub">Click any node to inspect entity ownership and signatory rights</span>
            </div>
            <span className="badge badge--success">ZERO PROBATE EXPOSURE</span>
          </div>

          {/* Level 1: Matriarch */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className={`tree-node ${selectedTreeNode === "eleanor" ? "primary" : ""}`}
              style={{ cursor: "pointer", minWidth: "180px" }}
              onClick={() => setSelectedTreeNode("eleanor")}
            >
              <span style={{ background: "var(--violet)", color: "white" }}>EL</span>
              <b>Eleanor Morgan (Gen 1)</b>
              <small>Family Matriarch · $1.48M Lifetime Exemption</small>
            </div>
          </div>

          <div style={{ width: "2px", height: "30px", background: "var(--line)", margin: "0 auto" }} />

          {/* Level 2: Primary Trustees (Alex & Elena) */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <div
              className={`tree-node ${selectedTreeNode === "am_em" ? "primary" : ""}`}
              style={{ cursor: "pointer", minWidth: "260px" }}
              onClick={() => setSelectedTreeNode("am_em")}
            >
              <span style={{ background: "var(--primary)", color: "white" }}>AM</span>
              <b>Alex & Elena Morgan (Gen 2)</b>
              <small>Principal Trustees · $10.2M Primary Joint Estate</small>
            </div>
          </div>

          <div style={{ width: "2px", height: "30px", background: "var(--line)", margin: "0 auto" }} />

          {/* Level 3: Trust & Operating Entities */}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <div
              className={`tree-node ${selectedTreeNode === "rev_trust" ? "primary" : ""}`}
              style={{ cursor: "pointer", minWidth: "200px" }}
              onClick={() => setSelectedTreeNode("rev_trust")}
            >
              <span style={{ background: "var(--navy)", color: "white" }}>RT</span>
              <b>Morgan Revocable Trust</b>
              <small>$5.42M · Joint Signatory</small>
            </div>

            <div
              className={`tree-node ${selectedTreeNode === "dynasty_trust" ? "primary" : ""}`}
              style={{ cursor: "pointer", minWidth: "200px" }}
              onClick={() => setSelectedTreeNode("dynasty_trust")}
            >
              <span style={{ background: "var(--violet)", color: "white" }}>DT</span>
              <b>Generational Dynasty Trust</b>
              <small>$3.85M · Irrevocable G3 Shield</small>
            </div>

            <div
              className={`tree-node ${selectedTreeNode === "mv_capital" ? "primary" : ""}`}
              style={{ cursor: "pointer", minWidth: "200px" }}
              onClick={() => setSelectedTreeNode("mv_capital")}
            >
              <span style={{ background: "var(--gold)", color: "white" }}>MV</span>
              <b>MV Capital Holdings LLC</b>
              <small>$930K · Operating Entity</small>
            </div>
          </div>

          <div style={{ width: "2px", height: "30px", background: "var(--line)", margin: "0 auto" }} />

          {/* Level 4: Gen 3 Beneficiaries */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
            <div
              className={`tree-node ${selectedTreeNode === "jordan" ? "primary" : ""}`}
              style={{ cursor: "pointer", minWidth: "180px" }}
              onClick={() => setSelectedTreeNode("jordan")}
            >
              <span style={{ background: "var(--blue)", color: "white" }}>JM</span>
              <b>Jordan Morgan (Gen 3)</b>
              <small>Son · 529 ($280K) + 50% Residual</small>
            </div>

            <div
              className={`tree-node ${selectedTreeNode === "maya" ? "primary" : ""}`}
              style={{ cursor: "pointer", minWidth: "180px" }}
              onClick={() => setSelectedTreeNode("maya")}
            >
              <span style={{ background: "var(--gold)", color: "white" }}>MM</span>
              <b>Maya Morgan (Gen 3)</b>
              <small>Daughter · 529 ($200K) + 50% Residual</small>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 8. ESTATE PLANNING
  // =========================================================================
  if (navId === "estate_planning" || navName === "Estate Planning") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · LEGACY DESIGN</span>
            <div className="page-title">Estate Planning, Wills & Succession</div>
            <div className="page-subtitle">
              Coordinate wills, irrevocable dynastic trusts, healthcare proxies, and beneficiary designations for seamless generational transfer.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Estate Checklist Verified",
                    message: "All 5 essential estate planning documents are executed, notarized, and current.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="check" size={16} /> Verify Estate Readiness
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Readiness Score</span>
            <strong style={{ color: "var(--primary)" }}>92 / 100</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        {/* Metric Cards Grid */}
        <section className="metric-grid" style={{ marginTop: "16px" }}>
          <MetricCard
            label="Succession Readiness"
            value="92 / 100"
            detail="Optimal - Zero probate exposure"
            icon="shield"
            tone="emerald"
            trend="up"
          />
          <MetricCard
            label="Active Legal Structures"
            value="3 Trusts"
            detail="Northern Trust institutional trustee"
            icon="document"
            tone="navy"
            trend="neutral"
          />
          <MetricCard
            label="Beneficiary Allocations"
            value="100% Assigned"
            detail="Elena (50%), Jordan (25%), Maya (25%)"
            icon="check"
            tone="blue"
            trend="up"
          />
          <MetricCard
            label="Lifetime Exemption Used"
            value="$8.40M"
            detail="Of $27.2M couple statutory cap"
            icon="tax"
            tone="gold"
            trend="neutral"
          />
        </section>

        {/* Estate Documents Registry */}
        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Executed Estate Documents & Directives"
            subtitle="Verified notarized instruments registered with estate counsel"
            columns={[
              {
                key: "title",
                header: "Document Instrument",
                render: (row) => (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                    <Icon name="document" size={15} style={{ color: "var(--primary)" }} />
                    {row.title}
                  </span>
                ),
              },
              { key: "fiduciary", header: "Designated Fiduciary / Nominee" },
              { key: "status", header: "Execution Status" },
              { key: "reviewYear", header: "Next Review" },
            ]}
            data={[
              {
                title: "Alex Morgan Last Will & Testament",
                fiduciary: "Elena Morgan (Primary), Northern Trust (Successor)",
                status: "Executed & Notarized (2024)",
                reviewYear: "2027",
              },
              {
                title: "Elena Morgan Last Will & Testament",
                fiduciary: "Alex Morgan (Primary), Northern Trust (Successor)",
                status: "Executed & Notarized (2024)",
                reviewYear: "2027",
              },
              {
                title: "Morgan Dynasty Irrevocable Trust Agreement",
                fiduciary: "Northern Trust Co. (Corporate Trustee)",
                status: "Enacted & Funded (2023)",
                reviewYear: "Annual Audit",
              },
              {
                title: "Healthcare Proxies & Living Wills",
                fiduciary: "Alex & Elena Cross-Designation",
                status: "Valid in NY & CT",
                reviewYear: "2026",
              },
              {
                title: "Transfer-on-Death (TOD) Real Estate Deed",
                fiduciary: "Morgan Revocable Trust",
                status: "Recorded with County Registry",
                reviewYear: "Perpetual",
              },
            ]}
          />
        </section>
      </div>
    )
  }

  // =========================================================================
  // 9. DOCUMENTS (FAMILY VAULT)
  // =========================================================================
  if (navId === "documents" || navName === "Documents") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · CENTRAL VAULT</span>
            <div className="page-title">Family Vault & Shared Records</div>
            <div className="page-subtitle">
              Encrypted multi-generational record repository with role-based member viewing permissions.
            </div>
            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  showToast({
                    title: "Document Uploaded",
                    message: "Committed encrypted PDF to family vault with trustee signatory permissions.",
                    tone: "success",
                  })
                }}
              >
                <Icon name="plus" size={16} /> Upload Family Document
              </button>
            </div>
          </div>
          <div className="module-stat">
            <span>Family Records</span>
            <strong>18 Files</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        <section style={{ marginTop: "16px" }}>
          <DataTable
            title="Family Vault Document Directory"
            subtitle="Access levels strictly regulated by zero-trust family governance"
            columns={[
              {
                key: "name",
                header: "Document Name",
                render: (row) => (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                    <Icon name="document" size={15} style={{ color: "var(--primary)" }} />
                    {row.name}
                  </span>
                ),
              },
              { key: "category", header: "Category" },
              {
                key: "access",
                header: "Access Permission",
                render: (row) => (
                  <span className={`badge badge--${row.access === "Trustees Only" ? "warning" : "success"}`}>
                    {row.access}
                  </span>
                ),
              },
              { key: "size", header: "Size" },
            ]}
            data={[
              { name: "Dynasty Trust Agreement (Complete Execution).pdf", category: "Trust Documents", access: "Trustees Only", size: "14.2 MB" },
              { name: "Coastal Retreat Warranty Deed & Title Policy.pdf", category: "Property Deeds", access: "All Family Members", size: "6.8 MB" },
              { name: "Jordan & Maya 529 Enrollment Statements.pdf", category: "Education", access: "All Family Members", size: "3.1 MB" },
              { name: "Household Umbrella Policy Declaration 2025.pdf", category: "Insurance", access: "Trustees Only", size: "2.4 MB" },
              { name: "MV Capital LLC Operating Agreement.pdf", category: "Corporate", access: "Trustees Only", size: "5.5 MB" },
            ]}
          />
        </section>
      </div>
    )
  }

  // =========================================================================
  // 10. SETTINGS (FAMILY CONFIG)
  // =========================================================================
  if (navId === "settings" || navName === "Settings") {
    return (
      <div className="module-page">
        <section className="module-hero tone-navy">
          <div>
            <span className="eyebrow">FAMILY WORKSPACE · GOVERNANCE CONTROLS</span>
            <div className="page-title">Household Settings & Multi-Signature Policies</div>
            <div className="page-subtitle">
              Configure multi-signature withdrawal thresholds, member view permissions, and automated household summaries.
            </div>
          </div>
          <div className="module-stat">
            <span>Governance Status</span>
            <strong style={{ color: "var(--primary)" }}>ENFORCED</strong>
            <div className="module-mini-chart">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", marginTop: "16px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <h4 className="card-title" style={{ marginBottom: "16px" }}>Family Workspace Configuration</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="field">
                <label>Family Workspace Name</label>
                <input
                  type="text"
                  value={familySettings.workspaceName}
                  onChange={(e) => setFamilySettings({ ...familySettings, workspaceName: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Dual-Signature Threshold for Trust Withdrawals ($)</label>
                <input
                  type="number"
                  value={familySettings.multiSigThreshold}
                  onChange={(e) => setFamilySettings({ ...familySettings, multiSigThreshold: Number(e.target.value) })}
                />
                <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                  Any distribution above this amount requires cryptographic authorization by both Alex and Elena Morgan.
                </small>
              </div>

              <button
                type="button"
                className="button button--primary"
                style={{ marginTop: "10px", alignSelf: "flex-start" }}
                onClick={() => {
                  showToast({
                    title: "Family Settings Saved",
                    message: "Multi-signature threshold and governance parameters saved.",
                    tone: "success",
                  })
                }}
              >
                Save Family Configuration
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <h4 className="card-title" style={{ marginBottom: "16px" }}>Governance & Privacy Toggles</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <b style={{ fontSize: "12px", display: "block" }}>Dual-Trustee Sign-off Requirement</b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Enforce 2-of-2 signatures on all trust deed amendments</small>
                </div>
                <input
                  type="checkbox"
                  checked={familySettings.multiSigEnabled}
                  onChange={(e) => setFamilySettings({ ...familySettings, multiSigEnabled: e.target.checked })}
                />
              </label>

              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <b style={{ fontSize: "12px", display: "block" }}>Allow Next-Gen View Access</b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Jordan & Maya can inspect 529 balances and shared goals</small>
                </div>
                <input
                  type="checkbox"
                  checked={familySettings.allowBeneficiaryView}
                  onChange={(e) => setFamilySettings({ ...familySettings, allowBeneficiaryView: e.target.checked })}
                />
              </label>

              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <b style={{ fontSize: "12px", display: "block" }}>Weekly Household Digest</b>
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Email Monday consolidated budget summary to Alex & Elena</small>
                </div>
                <input
                  type="checkbox"
                  checked={familySettings.weeklyHouseholdDigest}
                  onChange={(e) => setFamilySettings({ ...familySettings, weeklyHouseholdDigest: e.target.checked })}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback
  return null
}
