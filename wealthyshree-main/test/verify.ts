import assert from "node:assert/strict"
import {
  ROLE_KEYS,
  ROLE_CONFIGURATIONS,
  ROLES_LIST,
  getAllRoleConfigs,
  getRoleConfig,
  authorizeAction,
  hasPermission,
  getDefaultNavItem,
  findNavItem,
  isDefaultDashboard,
  getPageKey,
} from "../src/config/roles"
import { getTableConfigForRole } from "../src/config/roleTableData"
import { getNotificationsForRole } from "../src/config/notifications"
import { apiService } from "../src/services/apiService"
import type { UserSession, RoleKey } from "../src/types/roles"

const EXPECTED_ROLES: RoleKey[] = [
  "individual",
  "family",
  "student",
  "financial_advisor",
  "ca",
  "tax_consultant",
  "investment_manager",
  "insurance_advisor",
  "wealth_coach",
  "family_office",
  "private_bank",
  "corporate_hr",
  "university",
  "government_organizations",
  "auditors",
  "super_admin",
]

async function runVerificationSuite() {
  console.log("=================================================================")
  console.log("   WealthSphere.ai Comprehensive Automated Verification Suite    ")
  console.log("=================================================================\n")

  let passedTests = 0
  let totalTests = 0

  function test(name: string, fn: () => void | Promise<void>) {
    totalTests++
    try {
      const res = fn()
      if (res instanceof Promise) {
        return res
          .then(() => {
            passedTests++
            console.log(`  ✓ ${name}`)
          })
          .catch((err) => {
            console.error(`  ✗ ${name}`)
            console.error(err)
            process.exitCode = 1
          })
      } else {
        passedTests++
        console.log(`  ✓ ${name}`)
      }
    } catch (err) {
      console.error(`  ✗ ${name}`)
      console.error(err)
      process.exitCode = 1
    }
  }

  // 1. Role Configuration Integrity
  console.log("--- 1. 16 Role Configurations Verification ---")
  test("All 16 canonical roles exist in ROLE_KEYS", () => {
    assert.equal(ROLE_KEYS.length, 16)
    for (const r of EXPECTED_ROLES) {
      assert.ok(ROLE_KEYS.includes(r), `Missing role key: ${r}`)
    }
  })

  test("Every role configuration contains required schema fields", () => {
    for (const key of ROLE_KEYS) {
      const config = ROLE_CONFIGURATIONS[key]
      assert.ok(config, `Missing config for ${key}`)
      assert.ok(config.displayName, `Role ${key} missing displayName`)
      assert.ok(config.dashboardTitle, `Role ${key} missing dashboardTitle`)
      assert.ok(config.category, `Role ${key} missing category`)
      assert.ok(config.persona?.name, `Role ${key} missing persona.name`)
      assert.ok(Array.isArray(config.navigationMenu), `Role ${key} missing navigationMenu`)
      assert.ok(config.navigationMenu.length > 0, `Role ${key} has empty navigationMenu`)
      assert.ok(Array.isArray(config.relevantMetrics), `Role ${key} missing relevantMetrics`)
      assert.ok(config.relevantMetrics.length >= 3, `Role ${key} has fewer than 3 metrics`)
      assert.ok(Array.isArray(config.quickActions), `Role ${key} missing quickActions`)
      assert.ok(config.quickActions.length >= 2, `Role ${key} has fewer than 2 quickActions`)
      assert.ok(Array.isArray(config.intendedPermissions), `Role ${key} missing intendedPermissions`)
    }
  })

  test("getAllRoleConfigs and ROLES_LIST return 16 items", () => {
    const all = getAllRoleConfigs()
    assert.equal(all.length, 16)
    assert.equal(ROLES_LIST.length, 16)
  })

  // 2. Normalization & Navigation Fallbacks
  console.log("\n--- 2. Role Normalization & Routing Resilience ---")
  test("getRoleConfig maps exact keys, display names, and aliases", () => {
    assert.equal(getRoleConfig("individual").key, "individual")
    assert.equal(getRoleConfig("Individual").key, "individual")
    assert.equal(getRoleConfig("family").key, "family")
    assert.equal(getRoleConfig("student").key, "student")
    assert.equal(getRoleConfig("financial_advisor").key, "financial_advisor")
    assert.equal(getRoleConfig("Financial Advisor").key, "financial_advisor")
    assert.equal(getRoleConfig("ca").key, "ca")
    assert.equal(getRoleConfig("Chartered Accountant").key, "ca")
    assert.equal(getRoleConfig("tax_consultant").key, "tax_consultant")
    assert.equal(getRoleConfig("super_admin").key, "super_admin")
    assert.equal(getRoleConfig("Super Admin").key, "super_admin")
  })

  test("getRoleConfig handles invalid, null, or empty values gracefully", () => {
    assert.equal(getRoleConfig(null).key, "individual")
    assert.equal(getRoleConfig(undefined).key, "individual")
    assert.equal(getRoleConfig("").key, "individual")
    assert.equal(getRoleConfig("unknown_hacker_role_xyz").key, "individual")
  })

  test("getDefaultNavItem retrieves the first navigation item for all 16 roles", () => {
    for (const key of ROLE_KEYS) {
      const defaultItem = getDefaultNavItem(key)
      assert.ok(defaultItem, `Default item missing for ${key}`)
      assert.ok(defaultItem.id, `Default item for ${key} has no id`)
      assert.ok(defaultItem.name, `Default item for ${key} has no name`)
      assert.ok(defaultItem.icon, `Default item for ${key} has no icon`)

      const config = ROLE_CONFIGURATIONS[key]
      assert.equal(defaultItem.id, config.navigationMenu[0].items[0].id)
    }
  })

  test("isDefaultDashboard correctly detects home dashboard across roles", () => {
    assert.equal(isDefaultDashboard("individual", "dashboard"), true)
    assert.equal(isDefaultDashboard("individual", "Overview"), true)
    assert.equal(isDefaultDashboard("individual", "Personal Wealth Dashboard"), true)
    assert.equal(isDefaultDashboard("individual", "investments"), false)
    assert.equal(isDefaultDashboard("family", "family_overview"), true)
    assert.equal(isDefaultDashboard("family", "Family Overview"), true)
    assert.equal(isDefaultDashboard("family", "investments"), false)
    assert.equal(isDefaultDashboard("student", "dashboard"), true)
    assert.equal(isDefaultDashboard("student", "savings_goals"), false)
  })

  test("findNavItem resolves navigation items by id, name, and alias", () => {
    const familyInvestments = findNavItem("family", "investments")
    assert.ok(familyInvestments)
    assert.equal(familyInvestments?.id, "investments")
    assert.equal(familyInvestments?.name, "Investments")

    const familyWealthTree = findNavItem("family", "Family Wealth Tree")
    assert.ok(familyWealthTree)
    assert.equal(familyWealthTree?.id, "wealth_tree")

    // Student loans alias resolution to savings_goals
    const studentLoansAliased = findNavItem("student", "Student Loans")
    assert.ok(studentLoansAliased)
    assert.equal(studentLoansAliased?.id, "savings_goals")

    // Direct savings goals lookup
    const studentSavings = findNavItem("student", "savings_goals")
    assert.ok(studentSavings)
    assert.equal(studentSavings?.id, "savings_goals")
  })

  test("getPageKey generates distinct composite keys for role and navigation items", () => {
    const familyKey = getPageKey("family", "investments")
    const individualKey = getPageKey("individual", "investments")
    assert.equal(familyKey, "family:investments")
    assert.equal(individualKey, "individual:investments")
    assert.notEqual(familyKey, individualKey, "family:investments and individual:investments must be distinct keys")
  })

  // 3. Zero-Trust Security & RBAC Enforcement
  console.log("\n--- 3. Zero-Trust RBAC & Permission Gating ---")
  test("Zero-Trust: selecting a role DOES NOT automatically grant mutating permissions", () => {
    const demoSession: UserSession = {
      userId: "demo_usr",
      email: "demo@wealthsphere.ai",
      activeRoleKey: "super_admin",
      verifiedRoleKeys: ["individual"], // only individual verified
      grantedPermissions: [], // No super_admin permissions granted!
      isDemoMode: true,
    }

    const superAdminConfig = ROLE_CONFIGURATIONS.super_admin
    const rootAction = superAdminConfig.quickActions.find((a) => a.requiredPermission)
    assert.ok(rootAction, "Expected super_admin to have a permission-gated action")

    const auth = authorizeAction(demoSession, rootAction, superAdminConfig)
    assert.equal(auth.allowed, false, "Unauthorized action must be denied in zero-trust mode")
    assert.ok(auth.requiresVerification, "Action should indicate verification required")
    assert.ok(auth.reason?.length, "Auth denial must supply human-readable rationale")
  })

  test("Open actions without requiredPermission are allowed for all users", () => {
    const demoSession: UserSession = {
      userId: "demo_usr",
      email: "demo@wealthsphere.ai",
      activeRoleKey: "individual",
      verifiedRoleKeys: ["individual"],
      grantedPermissions: [],
      isDemoMode: true,
    }

    const publicAction = {
      id: "view_overview",
      label: "View Overview",
      description: "Public landing overview",
      icon: "grid" as const,
    }

    const auth = authorizeAction(demoSession, publicAction, ROLE_CONFIGURATIONS.individual)
    assert.equal(auth.allowed, true)
  })

  // 4. Role Table Data & Notification Integrity
  console.log("\n--- 4. Role Table Data & Notification Integrity ---")
  test("getTableConfigForRole produces valid table configurations for all 16 roles", () => {
    for (const key of ROLE_KEYS) {
      const table = getTableConfigForRole(key)
      assert.ok(table.title, `Table config for ${key} missing title`)
      assert.equal(table.headers.length, 5, `Table for ${key} must have exactly 5 headers`)
      assert.ok(table.rows.length > 0, `Table for ${key} must have rows`)
      for (const row of table.rows) {
        assert.ok(row.id, `Row in ${key} missing id`)
        assert.ok(row.col1, `Row in ${key} missing col1`)
        assert.ok(row.status, `Row in ${key} missing status`)
      }
    }
  })

  test("getNotificationsForRole returns distinct notifications for each role", () => {
    for (const key of ROLE_KEYS) {
      const notifs = getNotificationsForRole(key)
      assert.ok(Array.isArray(notifs), `Notifications for ${key} must be an array`)
      assert.ok(notifs.length >= 2, `Role ${key} must have at least 2 notifications`)
      for (const n of notifs) {
        assert.ok(n.id && n.title && n.message, `Notification in ${key} missing required fields`)
      }
    }
  })

  // 5. Client Service Layer & Mock Store Integration
  console.log("\n--- 5. Service Layer Operations & Form Validation ---")
  await test("apiService.assets.create validates inputs and stores record", async () => {
    // Valid creation
    const res = await apiService.assets.create({
      name: "Tesla Inc (TSLA)",
      category: "Equities",
      institution: "Interactive Brokers",
      valuation: 45000,
      changeYtd: "+12.4%",
      isLiquid: true,
    })
    assert.equal(res.success, true)
    assert.ok(res.data?.id)

    // Invalid creation (missing name)
    const errRes = await apiService.assets.create({
      name: "",
      category: "Equities",
      institution: "IB",
      valuation: 100,
      changeYtd: "+0%",
      isLiquid: true,
    })
    assert.equal(errRes.success, false)
    assert.ok(errRes.error)
  })

  await test("apiService.goals.create validates target amount and deadline", async () => {
    const res = await apiService.goals.create({
      name: "Lakefront Cabin",
      category: "Real Estate",
      targetAmount: 500000,
      initialAmount: 50000,
      targetDate: "2028-12-31",
    })
    assert.equal(res.success, true)
    assert.equal(res.data?.targetAmount, 500000)

    const invalidRes = await apiService.goals.create({
      name: "Empty Goal",
      category: "Retirement",
      targetAmount: 0,
      initialAmount: 0,
      targetDate: "2028-12-31",
    })
    assert.equal(invalidRes.success, false)
  })

  await test("apiService.clients.create validates email syntax", async () => {
    const valid = await apiService.clients.create({
      name: "Montgomery Family Trust",
      tier: "Ultra HNW",
      aum: 25000000,
      email: "trustee@montgomery.com",
      phone: "+1 212 555 0199",
      planStatus: "Active Fiduciary Plan",
    })
    assert.equal(valid.success, true)

    const invalid = await apiService.clients.create({
      name: "Bad Email Client",
      tier: "Private Wealth",
      aum: 1000000,
      email: "invalid-email-no-at",
      phone: "+1 212 555 0199",
      planStatus: "Onboarding",
    })
    assert.equal(invalid.success, false)
  })

  await test("apiService.audits.verifyItem validates evidence item", async () => {
    const verifyRes = await apiService.audits.verifyItem("ev-1")
    assert.equal(verifyRes.success, true)
    assert.equal(verifyRes.data?.status, "Partner Verified")
    assert.equal(verifyRes.data?.hashStatus, "SHA-256 Validated")
  })

  await test("apiService.investments.simulateRebalance verifies target weights", async () => {
    const validRes = await apiService.investments.simulateRebalance([
      { symbol: "VTI", newWeight: 60 },
      { symbol: "BND", newWeight: 40 },
    ])
    assert.equal(validRes.success, true)

    // Invalid weights (sum != 100)
    const invalidRes = await apiService.investments.simulateRebalance([
      { symbol: "VTI", newWeight: 50 },
      { symbol: "BND", newWeight: 20 },
    ])
    assert.equal(invalidRes.success, false)
  })

  await test("apiService.export utilities format CSV string", async () => {
    const csv = apiService.export.formatCsv(
      ["Name", "Category", "Value"],
      [
        ["Equities", "Public", 150000],
        ["Bonds", "Fixed Income", 50000],
      ],
    )
    assert.ok(csv.includes('"Name","Category","Value"'))
    assert.ok(csv.includes('"Equities","Public","150000"'))

    const exported = apiService.export.exportToCsv(
      "test_export",
      ["Asset", "Valuation"],
      [["BTC", 95000]],
    )
    assert.equal(exported, true)
  })

  // 6. Comprehensive 16-Role Navigation & Shared Module Disambiguation
  console.log("\n--- 6. Comprehensive 16-Role Navigation & Module Regression ---")
  test("Every sidebar item across all 16 roles resolves by ID and name", () => {
    let totalItemsAudited = 0
    for (const roleKey of ROLE_KEYS) {
      const config = ROLE_CONFIGURATIONS[roleKey]
      const defaultItem = getDefaultNavItem(roleKey)

      for (const section of config.navigationMenu) {
        for (const item of section.items) {
          totalItemsAudited++
          // Must resolve by item.id
          const byId = findNavItem(roleKey, item.id)
          assert.ok(byId, `Failed to resolve nav item by id: ${roleKey}:${item.id}`)
          assert.equal(byId?.id, item.id)

          // Must resolve by item.name
          const byName = findNavItem(roleKey, item.name)
          assert.ok(byName, `Failed to resolve nav item by name: ${roleKey}:${item.name}`)
          assert.equal(byName?.id, item.id)

          // Composite key must be roleKey:item.id
          const pageKey = getPageKey(roleKey, item.id)
          assert.equal(pageKey, `${roleKey}:${item.id}`)

          // isDefaultDashboard must be true only for the default dashboard item
          const isHome = isDefaultDashboard(roleKey, item.id)
          if (item.id === defaultItem.id) {
            assert.equal(isHome, true, `Expected ${item.id} to be default dashboard for ${roleKey}`)
          } else {
            assert.equal(isHome, false, `Expected ${item.id} NOT to be default dashboard for ${roleKey}`)
          }
        }
      }
    }
    assert.ok(totalItemsAudited >= 140, `Expected at least 140 total audited nav items, got ${totalItemsAudited}`)
  })

  test("Shared module names across roles produce distinct composite page keys", () => {
    // 1. Clients
    const clientRoles = ["financial_advisor", "ca", "tax_consultant", "wealth_coach", "private_bank"] as const
    const clientKeys = new Set(clientRoles.map((r) => getPageKey(r, "clients")))
    assert.equal(clientKeys.size, clientRoles.length, "All 'clients' pages must have unique keys")

    // 2. Investments
    const invRoles = ["individual", "family", "investment_manager", "family_office"] as const
    const invKeys = new Set(invRoles.map((r) => getPageKey(r, "investments")))
    assert.equal(invKeys.size, invRoles.length, "All 'investments' pages must have unique keys")

    // 3. Reports
    const repRoles = [
      "financial_advisor",
      "ca",
      "tax_consultant",
      "insurance_advisor",
      "wealth_coach",
      "family_office",
      "private_bank",
      "corporate_hr",
      "university",
      "government_organizations",
      "auditors",
    ] as const
    const repKeys = new Set(repRoles.map((r) => getPageKey(r, "reports")))
    assert.equal(repKeys.size, repRoles.length, "All 'reports' pages must have unique keys")

    // 4. Documents
    const docRoles = [
      "individual",
      "family",
      "financial_advisor",
      "ca",
      "tax_consultant",
      "investment_manager",
      "insurance_advisor",
      "family_office",
      "government_organizations",
    ] as const
    const docKeys = new Set(docRoles.map((r) => getPageKey(r, "documents")))
    assert.equal(docKeys.size, docRoles.length, "All 'documents' pages must have unique keys")

    // 5. Settings
    const settingsKeys = new Set(ROLE_KEYS.map((r) => getPageKey(r, "settings")))
    assert.equal(settingsKeys.size, 16, "All 16 roles must have a distinct 'settings' key")
  })

  test("Dashboard internal navigation targets resolve across all 16 roles", () => {
    const dashboardNavCalls: Record<string, string[]> = {
      individual: ["Tax Planner", "My Wealth", "Investments", "Insurance"],
      family: ["Family Wealth Tree", "Estate Planning", "Family Budget", "Insurance"],
      student: ["Learn Finance", "My Budget", "Savings Goals"],
      financial_advisor: ["Risk Profiles"],
      ca: ["Tax Filings", "Clients", "Reconciliation"],
      tax_consultant: ["Tax Planning", "Tax Calculations", "Reports", "Filing Calendar"],
      investment_manager: ["Rebalancing", "Risk Analysis"],
      insurance_advisor: ["Coverage Analysis", "Policies", "Renewals", "Claims"],
      wealth_coach: ["Coaching Sessions", "Habit Tracking", "Financial Goals", "Savings Challenges"],
      family_office: ["Family Members", "Trusts", "Estate Planning"],
      private_bank: ["Banking Services", "Wealth Portfolios", "Compliance", "Clients"],
      corporate_hr: ["Workshops", "Wellness Programs", "Communications"],
      university: ["Courses", "Events", "Certifications"],
      government_organizations: ["Programs", "Financial Literacy", "Beneficiary Groups", "Regional Analytics"],
      auditors: ["Evidence Repository", "Review Queue", "Findings"],
      super_admin: ["AI Configuration"],
    }

    for (const [role, targets] of Object.entries(dashboardNavCalls)) {
      for (const target of targets) {
        const matched = findNavItem(role, target)
        assert.ok(matched, `Dashboard navigation call to "${target}" failed in role "${role}"`)
        assert.ok(matched.id, `Matched item for "${target}" in role "${role}" has no ID`)
      }
    }
  })

  test("Zero-Trust: switching to any of the 16 roles preserves default restricted privileges", () => {
    for (const roleKey of ROLE_KEYS) {
      const config = ROLE_CONFIGURATIONS[roleKey]
      const simulatedSession: UserSession = {
        userId: "usr_active_session",
        email: "alex.morgan@wealthsphere.ai",
        activeRoleKey: roleKey,
        verifiedRoleKeys: ["individual"], // only individual verified by default
        grantedPermissions: roleKey === "individual" ? config.defaultGrantedPermissions : [],
        isDemoMode: true,
      }

      // Check actions with permissions
      const protectedActions = config.quickActions.filter((a) => a.requiredPermission)
      for (const action of protectedActions) {
        const auth = authorizeAction(simulatedSession, action, config)
        if (roleKey !== "individual" && !simulatedSession.grantedPermissions.includes(action.requiredPermission!)) {
          assert.equal(auth.allowed, false, `Zero-Trust breach: ${roleKey}:${action.id} allowed without granted permission!`)
          assert.equal(auth.requiresVerification, true)
        }
      }
    }
  })

  console.log(`\n=================================================================`)
  console.log(`   Verification Summary: ${passedTests} / ${totalTests} Passed`)
  console.log(`=================================================================`)

  if (passedTests !== totalTests) {
    process.exit(1)
  }
}

runVerificationSuite()

