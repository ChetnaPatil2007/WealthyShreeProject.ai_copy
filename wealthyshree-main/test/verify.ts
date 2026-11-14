import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  ROLE_KEYS,
  ROLE_CONFIGURATIONS,
  ROLES_LIST,
  getAllRoleConfigs,
  getRoleConfig,
  authorizeAction,
  authorizePermission,
  hasPermission,
  getDefaultNavItem,
  findNavItem,
  isDefaultDashboard,
  getPageKey,
} from "../src/config/roles"
import { getTableConfigForRole } from "../src/config/roleTableData"
import { getNotificationsForRole } from "../src/config/notifications"
import { createExportAuthorizationChecker } from "../src/config/exportAuthorization"
import { apiService } from "../src/services/apiService"
import type { Permission, UserSession, RoleKey } from "../src/types/roles"
import type { ExportAuthorizationContextValue } from "../src/config/exportAuthorization"

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

  test("Default grants stay read-only and are not copied into frontend sessions", () => {
    const readOnlyDefaults = new Set<Permission>([
      "read:own_profile",
      "read:own_assets",
      "read:family_group",
      "read:student_budget",
      "read:client_roster",
      "read_only:audit_trail",
      "read:tax_scenarios",
      "read:insurance_policies",
      "read:family_office_entities",
      "read:workforce_wellness",
      "read:endowment_portfolio",
      "view:sovereign_aggregates",
    ])

    for (const role of Object.values(ROLE_CONFIGURATIONS)) {
      for (const permission of role.defaultGrantedPermissions) {
        assert.ok(
          readOnlyDefaults.has(permission),
          `${role.key} has a non-read-only default grant: ${permission}`,
        )
      }
    }

    const riskyDefaultGrants = [
      ["investment_manager", "propose:trades"],
      ["wealth_coach", "manage:coaching_cohorts"],
      ["private_bank", "manage:private_bank_book"],
    ] as const
    for (const [roleKey, permission] of riskyDefaultGrants) {
      const role = ROLE_CONFIGURATIONS[roleKey]
      assert.ok(role.intendedPermissions.includes(permission))
      assert.ok(
        !role.defaultGrantedPermissions.includes(permission),
        `${roleKey} must not default-grant ${permission}`,
      )
    }

    const appShellSource = readFileSync(
      join(
        process.cwd(),
        "src",
        "components",
        "layout",
        "AppShell.tsx",
      ),
      "utf8",
    )
    assert.match(appShellSource, /grantedPermissions:\s*\[\]/)
    assert.doesNotMatch(appShellSource, /defaultGrantedPermissions/)
  })

  test("Protected actions require a verified active role and explicit permission", () => {
    const rootAction = ROLE_CONFIGURATIONS.super_admin.quickActions.find(
      (action) => action.requiredPermission === "manage:tenants",
    )
    assert.ok(rootAction)

    const unverifiedSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "super_admin",
      verifiedRoleKeys: [],
      grantedPermissions: ["manage:tenants"],
      isDemoMode: true,
    }
    const denied = authorizeAction(
      unverifiedSession,
      rootAction,
      ROLE_CONFIGURATIONS.super_admin,
    )
    assert.equal(denied.allowed, false)
    assert.equal(denied.reason, "This action requires verified permissions.")

    const verifiedSession: UserSession = {
      ...unverifiedSession,
      verifiedRoleKeys: ["super_admin"],
    }
    const allowed = authorizeAction(
      verifiedSession,
      rootAction,
      ROLE_CONFIGURATIONS.super_admin,
    )
    assert.equal(allowed.allowed, true)
  })

  test("Authorization binds active role, verification, and grants to that role", () => {
    const individualConfig = ROLE_CONFIGURATIONS.individual
    const individualSession: UserSession = {
      userId: "individual_usr",
      email: "individual@example.test",
      activeRoleKey: "individual",
      verifiedRoleKeys: ["individual"],
      grantedPermissions: ["write:own_assets"],
    }

    assert.equal(
      authorizePermission(
        individualSession,
        "write:own_assets",
        individualConfig,
      ).allowed,
      true,
      "matching verified role with its explicit permission should be allowed",
    )

    assert.equal(
      authorizePermission(
        {
          ...individualSession,
          activeRoleKey: "family",
          verifiedRoleKeys: ["individual"],
        },
        "write:own_assets",
        individualConfig,
      ).allowed,
      false,
      "the session's active role must match the supplied role",
    )

    assert.equal(
      authorizePermission(
        { ...individualSession, verifiedRoleKeys: [] },
        "write:own_assets",
        individualConfig,
      ).allowed,
      false,
      "an unverified role must be denied even when the permission is present",
    )

    assert.equal(
      authorizePermission(
        { ...individualSession, grantedPermissions: [] },
        "write:own_assets",
        individualConfig,
      ).allowed,
      false,
      "a verified role without an explicit permission must be denied",
    )

    const familySession: UserSession = {
      ...individualSession,
      activeRoleKey: "family",
      verifiedRoleKeys: ["family"],
      grantedPermissions: ["write:own_assets"],
    }
    assert.equal(
      authorizePermission(
        familySession,
        "write:own_assets",
        ROLE_CONFIGURATIONS.family,
      ).allowed,
      false,
      "a permission belonging to another role must not authorize this role",
    )
  })

  test("Super Admin authorization remains role-bound and permission-scoped", () => {
    const superAdminConfig = ROLE_CONFIGURATIONS.super_admin
    const verifiedSuperAdmin: UserSession = {
      userId: "root_usr",
      email: "root@example.test",
      activeRoleKey: "super_admin",
      verifiedRoleKeys: ["super_admin"],
      grantedPermissions: ["manage:tenants"],
    }

    assert.equal(
      authorizePermission(
        verifiedSuperAdmin,
        "manage:tenants",
        superAdminConfig,
      ).allowed,
      true,
    )
    assert.equal(
      authorizePermission(
        {
          ...verifiedSuperAdmin,
          activeRoleKey: "individual",
        },
        "manage:tenants",
        superAdminConfig,
      ).allowed,
      false,
      "selecting Super Admin cannot override a different active role",
    )
    assert.equal(
      authorizePermission(
        {
          ...verifiedSuperAdmin,
          grantedPermissions: ["write:own_assets"],
        },
        "write:own_assets",
        superAdminConfig,
      ).allowed,
      false,
      "a grant from another role cannot authorize a Super Admin action",
    )
  })

  test("Every permission-gated quick action is assigned to its canonical role", () => {
    for (const role of Object.values(ROLE_CONFIGURATIONS)) {
      for (const action of role.quickActions) {
        if (action.requiredPermission) {
          assert.ok(
            role.intendedPermissions.includes(action.requiredPermission),
            `${role.key}:${action.id} requires a permission not assigned to that role`,
          )
        }
      }
    }
  })

  test("Reusable write modals fail closed before any service call without authorization", () => {
    const writeModals = [
      {
        file: "AddAssetModal.tsx",
        handler: "handleSubmit",
        guard: "if (!isAuthorized)",
        service: "apiService.assets.create",
      },
      {
        file: "CreateGoalModal.tsx",
        handler: "handleSubmit",
        guard: "if (!isAuthorized)",
        service: "apiService.goals.create",
      },
      {
        file: "EvidenceVerifyModal.tsx",
        handler: "handleSignOff",
        guard: "if (!isStatusAuthorized(verificationStatus))",
        service: "apiService.audits.verifyItem",
      },
      {
        file: "SubmitClaimModal.tsx",
        handler: "handleSubmit",
        guard: "if (!isAuthorized)",
        service: "apiService.insurance.submitClaim",
      },
      {
        file: "RebalanceModal.tsx",
        handler: "handleExecute",
        guard: "if (!isAuthorized)",
        service: "apiService.investments.simulateRebalance",
      },
      {
        file: "OnboardClientModal.tsx",
        handler: "handleSubmit",
        guard: "if (!isAuthorized)",
        service: "apiService.clients.create",
      },
      {
        file: "ScheduleMeetingModal.tsx",
        handler: "handleSubmit",
        guard: "if (!isAuthorized)",
        service: "apiService.meetings.schedule",
      },
    ]

    for (const modal of writeModals) {
      const source = readFileSync(
        join(
          process.cwd(),
          "src",
          "components",
          "modals",
          modal.file,
        ),
        "utf8",
      )
      assert.match(
        source,
        /isAuthorized = false/,
        `${modal.file} must default to unauthorized`,
      )

      const handlerStart = source.indexOf(`const ${modal.handler} =`)
      const guardIndex = source.indexOf(modal.guard, handlerStart)
      const serviceIndex = source.indexOf(modal.service, handlerStart)
      assert.ok(handlerStart >= 0, `${modal.file} handler was not found`)
      assert.ok(
        guardIndex > handlerStart && guardIndex < serviceIndex,
        `${modal.file} must deny unauthorized submission before its service call`,
      )
    }
  })

  test("Super Admin permissions are intended-only, never default-granted, and require explicit verification", () => {
    const permissions: Permission[] = [
      "configure:platform",
      "rotate:platform_keys",
      "export:platform_users",
      "export:system_telemetry",
    ]
    const superAdminConfig = ROLE_CONFIGURATIONS.super_admin

    for (const permission of permissions) {
      assert.ok(superAdminConfig.intendedPermissions.includes(permission))
      assert.ok(!superAdminConfig.defaultGrantedPermissions.includes(permission))

      for (const role of Object.values(ROLE_CONFIGURATIONS)) {
        if (role.key !== "super_admin") {
          assert.ok(!role.intendedPermissions.includes(permission))
          assert.ok(!role.defaultGrantedPermissions.includes(permission))
        }
      }

      const session: UserSession = {
        userId: "root_usr",
        email: "root@example.test",
        activeRoleKey: "super_admin",
        verifiedRoleKeys: [],
        grantedPermissions: [permission],
        isDemoMode: true,
      }
      assert.equal(
        authorizePermission(session, permission, superAdminConfig).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...session, verifiedRoleKeys: ["super_admin"] },
          permission,
          superAdminConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Private Bank wire approval requires verified role and explicit wire permission", () => {
    const privateBankConfig = ROLE_CONFIGURATIONS.private_bank
    const permission = "execute:wire_transfers"
    assert.ok(privateBankConfig.intendedPermissions.includes(permission))
    assert.ok(!privateBankConfig.defaultGrantedPermissions.includes(permission))

    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "private_bank",
      verifiedRoleKeys: [],
      grantedPermissions: [],
      isDemoMode: true,
    }
    assert.equal(
      authorizePermission(previewSession, permission, privateBankConfig).allowed,
      false,
    )

    const verifiedWithoutGrant: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["private_bank"],
    }
    assert.equal(
      authorizePermission(
        verifiedWithoutGrant,
        permission,
        privateBankConfig,
      ).allowed,
      false,
    )

    const verifiedAndGranted: UserSession = {
      ...verifiedWithoutGrant,
      grantedPermissions: [permission],
    }
    assert.equal(
      authorizePermission(
        verifiedAndGranted,
        permission,
        privateBankConfig,
      ).allowed,
      true,
    )
  })

  test("Individual write actions require verified assets or profile permissions", () => {
    const individualConfig = ROLE_CONFIGURATIONS.individual
    const permissions = ["write:own_assets", "write:own_profile"] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "individual",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(individualConfig.intendedPermissions.includes(permission))
      assert.ok(!individualConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(
          previewSession,
          permission,
          individualConfig,
        ).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["individual"],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(
          verifiedSession,
          permission,
          individualConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Family write actions require verified member or family-group permissions", () => {
    const familyConfig = ROLE_CONFIGURATIONS.family
    const permissions = [
      "manage:family_members",
      "write:family_group",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "family",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(familyConfig.intendedPermissions.includes(permission))
      assert.ok(!familyConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(previewSession, permission, familyConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["family"],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, familyConfig).allowed,
        true,
      )
    }
  })

  test("Student write actions require verified role and explicit permissions", () => {
    const studentConfig = ROLE_CONFIGURATIONS.student
    const permissions = [
      "write:student_budget",
      "write:student_education",
      "write:own_profile",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "student",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(studentConfig.intendedPermissions.includes(permission))
      assert.ok(!studentConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(previewSession, permission, studentConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["student"],
    }
    const verifiedWithoutGrants: UserSession = {
      ...verifiedSession,
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(
          verifiedWithoutGrants,
          permission,
          studentConfig,
        ).allowed,
        false,
      )
      assert.equal(
        authorizePermission(verifiedSession, permission, studentConfig).allowed,
        true,
      )
    }
  })

  test("Financial Advisor write actions require verified role and explicit permissions", () => {
    const advisorConfig = ROLE_CONFIGURATIONS.financial_advisor
    const permissions = [
      "write:client_roster",
      "propose:trades",
      "execute:trades",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "financial_advisor",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(advisorConfig.intendedPermissions.includes(permission))
      assert.ok(!advisorConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(previewSession, permission, advisorConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["financial_advisor"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, advisorConfig).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          advisorConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Investment Manager trade actions require verified role and explicit permissions", () => {
    const investmentConfig = ROLE_CONFIGURATIONS.investment_manager
    const permissions = ["propose:trades", "execute:trades"] as const
    assert.ok(investmentConfig.intendedPermissions.includes("propose:trades"))
    assert.ok(!investmentConfig.defaultGrantedPermissions.includes("propose:trades"))
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "investment_manager",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(investmentConfig.intendedPermissions.includes(permission))
      assert.equal(
        authorizePermission(previewSession, permission, investmentConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["investment_manager"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, investmentConfig).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          investmentConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Insurance Advisor write actions require verified role and explicit permissions", () => {
    const insuranceConfig = ROLE_CONFIGURATIONS.insurance_advisor
    const permissions = [
      "write:client_roster",
      "write:own_profile",
      "issue:insurance_quotes",
      "submit:insurance_claims",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "insurance_advisor",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(insuranceConfig.intendedPermissions.includes(permission))
      assert.ok(!insuranceConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(previewSession, permission, insuranceConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["insurance_advisor"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, insuranceConfig).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          insuranceConfig,
        ).allowed,
        true,
      )
    }
  })

  test("CA write actions require verified role and explicit permissions", () => {
    const caConfig = ROLE_CONFIGURATIONS.ca
    const permissions = [
      "conduct:statutory_audit",
      "sign:audit_reports",
      "file:tax_returns",
      "write:own_profile",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "ca",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(caConfig.intendedPermissions.includes(permission))
      assert.ok(!caConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(previewSession, permission, caConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["ca"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, caConfig).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          caConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Tax Consultant write actions require verified role and explicit permissions", () => {
    const taxConsultantConfig = ROLE_CONFIGURATIONS.tax_consultant
    const permissions = [
      "write:client_roster",
      "write:tax_scenarios",
      "file:tax_returns",
      "write:own_profile",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "tax_consultant",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(taxConsultantConfig.intendedPermissions.includes(permission))
      assert.ok(!taxConsultantConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(
          previewSession,
          permission,
          taxConsultantConfig,
        ).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["tax_consultant"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(
          verifiedSession,
          permission,
          taxConsultantConfig,
        ).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          taxConsultantConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Wealth Coach write actions require verified role and explicit permissions", () => {
    const coachConfig = ROLE_CONFIGURATIONS.wealth_coach
    const reviewBudgetAction = coachConfig.quickActions.find(
      (action) => action.id === "review_budget",
    )
    assert.ok(reviewBudgetAction)
    assert.equal(reviewBudgetAction.requiredPermission, undefined)

    const permissions = [
      "manage:coaching_cohorts",
      "assign:client_milestones",
      "write:own_profile",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "wealth_coach",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(coachConfig.intendedPermissions.includes(permission))
      assert.ok(!coachConfig.defaultGrantedPermissions.includes(permission))
      assert.equal(
        authorizePermission(previewSession, permission, coachConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["wealth_coach"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, coachConfig).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          coachConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Family Office write actions require verified role and explicit permissions", () => {
    const familyOfficeConfig = ROLE_CONFIGURATIONS.family_office
    const conveneCouncilAction = familyOfficeConfig.quickActions.find(
      (action) => action.id === "convene_council",
    )
    const reviewEntitiesAction = familyOfficeConfig.quickActions.find(
      (action) => action.id === "review_entities",
    )
    assert.ok(conveneCouncilAction)
    assert.equal(
      conveneCouncilAction.requiredPermission,
      "write:family_group",
    )
    assert.ok(reviewEntitiesAction)
    assert.equal(reviewEntitiesAction.requiredPermission, undefined)

    const permissions = [
      "write:family_group",
      "approve:capital_calls",
    ] as const
    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "family_office",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(familyOfficeConfig.intendedPermissions.includes(permission))
      assert.ok(
        !familyOfficeConfig.defaultGrantedPermissions.includes(permission),
      )
      assert.equal(
        authorizePermission(
          previewSession,
          permission,
          familyOfficeConfig,
        ).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["family_office"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(
          verifiedSession,
          permission,
          familyOfficeConfig,
        ).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          familyOfficeConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Corporate HR write actions require verified role and explicit permissions", () => {
    const corporateHRConfig = ROLE_CONFIGURATIONS.corporate_hr
    const permissions = [
      "manage:workforce_wellness",
      "manage:equity_plans",
    ] as const
    const workshopAction = corporateHRConfig.quickActions.find(
      (action) => action.id === "launch_workshop",
    )
    const broadcastAction = corporateHRConfig.quickActions.find(
      (action) => action.id === "notify_benefits",
    )
    assert.ok(workshopAction)
    assert.equal(workshopAction.requiredPermission, undefined)
    assert.ok(broadcastAction)
    assert.equal(
      broadcastAction.requiredPermission,
      "manage:workforce_wellness",
    )

    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "corporate_hr",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(corporateHRConfig.intendedPermissions.includes(permission))
      assert.ok(
        !corporateHRConfig.defaultGrantedPermissions.includes(permission),
      )
      assert.equal(
        authorizePermission(previewSession, permission, corporateHRConfig)
          .allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["corporate_hr"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, corporateHRConfig)
          .allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          corporateHRConfig,
        ).allowed,
        true,
      )
    }
  })

  test("University permissions require verified role and explicit grants", () => {
    const universityConfig = ROLE_CONFIGURATIONS.university
    const permissions = [
      "manage:campus_events",
      "issue:academic_credentials",
      "write:university_settings",
      "export:education_reports",
      "export:scholarship_disbursements",
    ] as const
    const publishCourseAction = universityConfig.quickActions.find(
      (action) => action.id === "publish_course",
    )
    const issueCredentialsAction = universityConfig.quickActions.find(
      (action) => action.id === "issue_diploma_creds",
    )
    const exportAnalyticsAction = universityConfig.quickActions.find(
      (action) => action.id === "export_analytics",
    )
    assert.ok(publishCourseAction)
    assert.equal(publishCourseAction.requiredPermission, undefined)
    assert.ok(issueCredentialsAction)
    assert.equal(issueCredentialsAction.requiredPermission, undefined)
    assert.ok(exportAnalyticsAction)
    assert.equal(
      exportAnalyticsAction.requiredPermission,
      "export:education_reports",
    )

    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "university",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(universityConfig.intendedPermissions.includes(permission))
      assert.ok(
        !universityConfig.defaultGrantedPermissions.includes(permission),
      )
      assert.equal(
        authorizePermission(previewSession, permission, universityConfig)
          .allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["university"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, universityConfig)
          .allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          universityConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Government write and export permissions require verification and explicit grants", () => {
    const governmentConfig = ROLE_CONFIGURATIONS.government_organizations
    const permissions = [
      "audit:public_funds",
      "manage:public_programs",
      "write:government_settings",
      "export:public_funds",
    ] as const
    const readOnlyNavigationActions = [
      "launch_campaign",
      "audit_disbursements",
      "convene_taskforce",
    ]

    for (const actionId of readOnlyNavigationActions) {
      const action = governmentConfig.quickActions.find(
        (quickAction) => quickAction.id === actionId,
      )
      assert.ok(action)
      assert.equal(action.requiredPermission, undefined)
    }

    const exportAction = governmentConfig.quickActions.find(
      (action) => action.id === "generate_impact",
    )
    assert.ok(exportAction)
    assert.equal(exportAction.requiredPermission, "export:public_funds")

    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "government_organizations",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(governmentConfig.intendedPermissions.includes(permission))
      assert.ok(
        !governmentConfig.defaultGrantedPermissions.includes(permission),
      )
      assert.equal(
        authorizePermission(previewSession, permission, governmentConfig)
          .allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["government_organizations"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, governmentConfig)
          .allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          governmentConfig,
        ).allowed,
        true,
      )
    }
  })

  test("Auditor actions require verified role and explicit permissions", () => {
    const auditorConfig = ROLE_CONFIGURATIONS.auditors
    const permissions = [
      "read_only:audit_trail",
      "flag:control_exceptions",
      "certify:compliance_reports",
      "export:audit_reports",
      "write:auditor_settings",
    ] as const
    const navigationActions = [
      "request_evidence",
      "signoff_workpaper",
      "log_finding",
    ]

    for (const actionId of navigationActions) {
      const action = auditorConfig.quickActions.find(
        (quickAction) => quickAction.id === actionId,
      )
      assert.ok(action)
      assert.equal(action.requiredPermission, undefined)
    }

    const opinionExportAction = auditorConfig.quickActions.find(
      (action) => action.id === "opinion_letter",
    )
    assert.ok(opinionExportAction)
    assert.equal(
      opinionExportAction.requiredPermission,
      "export:audit_reports",
    )

    const previewSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "auditors",
      verifiedRoleKeys: [],
      grantedPermissions: [...permissions],
      isDemoMode: true,
    }

    for (const permission of permissions) {
      assert.ok(auditorConfig.intendedPermissions.includes(permission))
      if (permission !== "read_only:audit_trail") {
        assert.ok(!auditorConfig.defaultGrantedPermissions.includes(permission))
      }
      assert.equal(
        authorizePermission(previewSession, permission, auditorConfig).allowed,
        false,
      )
    }

    const verifiedSession: UserSession = {
      ...previewSession,
      verifiedRoleKeys: ["auditors"],
      grantedPermissions: [],
    }
    for (const permission of permissions) {
      assert.equal(
        authorizePermission(verifiedSession, permission, auditorConfig).allowed,
        false,
      )
      assert.equal(
        authorizePermission(
          { ...verifiedSession, grantedPermissions: [permission] },
          permission,
          auditorConfig,
        ).allowed,
        true,
      )
    }

    for (const role of Object.values(ROLE_CONFIGURATIONS)) {
      if (role.key !== "auditors") {
        assert.ok(!role.intendedPermissions.includes("write:auditor_settings"))
      }
    }
  })

  test("CSV export permissions are never default-granted and require verification", () => {
    const intendedExports: Record<RoleKey, Permission[]> = {
      individual: ["export:own_assets"],
      family: ["export:family_group"],
      student: ["export:student_budget", "export:student_loans"],
      financial_advisor: ["export:client_roster", "export:audit_reports"],
      ca: ["export:statutory_audit"],
      tax_consultant: ["export:tax_returns"],
      investment_manager: ["export:investment_portfolios"],
      insurance_advisor: ["export:insurance_policies"],
      wealth_coach: ["export:coaching_cohorts"],
      family_office: ["export:family_office_entities"],
      private_bank: ["export:private_bank_book"],
      corporate_hr: ["export:workforce_wellness"],
      university: ["export:scholarship_disbursements", "export:education_reports"],
      government_organizations: ["export:public_funds"],
      auditors: ["export:audit_reports"],
      super_admin: ["export:system_telemetry", "export:platform_users"],
    }
    const exportPermissions = [
      "export:own_assets",
      "export:family_group",
      "export:student_budget",
      "export:student_loans",
      "export:client_roster",
      "export:investment_portfolios",
      "export:statutory_audit",
      "export:audit_reports",
      "export:tax_returns",
      "export:insurance_policies",
      "export:coaching_cohorts",
      "export:family_office_entities",
      "export:private_bank_book",
      "export:workforce_wellness",
      "export:scholarship_disbursements",
      "export:education_reports",
      "export:public_funds",
      "export:system_telemetry",
      "export:platform_users",
    ] as const

    for (const role of Object.values(ROLE_CONFIGURATIONS)) {
      for (const permission of intendedExports[role.key]) {
        assert.ok(
          role.intendedPermissions.includes(permission),
          `${role.key} must declare ${permission} as an intended permission`,
        )
      }
      for (const permission of exportPermissions) {
        assert.ok(
          !role.defaultGrantedPermissions.includes(permission),
          `${role.key} must not default-grant ${permission}`,
        )
      }
    }

    const privateBankConfig = ROLE_CONFIGURATIONS.private_bank
    const unverifiedSession: UserSession = {
      userId: "preview_usr",
      email: "preview@example.test",
      activeRoleKey: "private_bank",
      verifiedRoleKeys: [],
      grantedPermissions: ["export:private_bank_book"],
      isDemoMode: true,
    }
    assert.equal(
      authorizePermission(
        unverifiedSession,
        "export:private_bank_book",
        privateBankConfig,
      ).allowed,
      false,
    )

    const verifiedSession: UserSession = {
      ...unverifiedSession,
      verifiedRoleKeys: ["private_bank"],
    }
    assert.equal(
      authorizePermission(
        verifiedSession,
        "export:private_bank_book",
        privateBankConfig,
      ).allowed,
      true,
    )
  })

  test("ExportModal denies exports without authorization context", () => {
    const checker = createExportAuthorizationChecker(() => null)
    assert.equal(
      checker.checkAuthorization("export:own_assets").allowed,
      false,
    )
  })

  test("ExportModal denies exports when the permission is missing", () => {
    const context: ExportAuthorizationContextValue = {
      roleConfig: ROLE_CONFIGURATIONS.individual,
      userSession: {
        userId: "verified_user",
        email: "verified@example.test",
        activeRoleKey: "individual",
        verifiedRoleKeys: ["individual"],
        grantedPermissions: [],
      },
    }
    const checker = createExportAuthorizationChecker(() => context)

    assert.equal(
      checker.checkAuthorization("export:own_assets", "individual").allowed,
      false,
    )
  })

  await test("ExportModal denies if the active role changes during the delay", async () => {
    const permission = "export:audit_reports"
    const makeContext = (
      role: "financial_advisor" | "auditors",
    ): ExportAuthorizationContextValue => ({
      roleConfig: ROLE_CONFIGURATIONS[role],
      userSession: {
        userId: "verified_user",
        email: "verified@example.test",
        activeRoleKey: role,
        verifiedRoleKeys: [role],
        grantedPermissions: [permission],
      },
    })
    let context = makeContext("financial_advisor")
    const checker = createExportAuthorizationChecker(() => context)
    const roleAtStart = checker.getActiveRole()!
    assert.equal(
      checker.checkAuthorization(permission, roleAtStart).allowed,
      true,
    )

    const pendingAuthorization = new Promise<void>((resolve) =>
      setTimeout(resolve, 0),
    ).then(() => checker.checkAuthorization(permission, roleAtStart))
    context = makeContext("auditors")

    assert.equal((await pendingAuthorization).allowed, false)
  })

  await test("ExportModal denies if the permission is revoked during the delay", async () => {
    const makeContext = (grantedPermissions: Permission[]) =>
      ({
        roleConfig: ROLE_CONFIGURATIONS.individual,
        userSession: {
          userId: "verified_user",
          email: "verified@example.test",
          activeRoleKey: "individual",
          verifiedRoleKeys: ["individual"],
          grantedPermissions,
        },
      }) satisfies ExportAuthorizationContextValue
    let context = makeContext(["export:own_assets"])
    const checker = createExportAuthorizationChecker(() => context)
    const roleAtStart = checker.getActiveRole()!

    const pendingAuthorization = new Promise<void>((resolve) =>
      setTimeout(resolve, 0),
    ).then(() =>
      checker.checkAuthorization("export:own_assets", roleAtStart),
    )
    context = makeContext([])

    assert.equal((await pendingAuthorization).allowed, false)
  })

  await test("ExportModal allows export when authorization remains valid", async () => {
    const context: ExportAuthorizationContextValue = {
      roleConfig: ROLE_CONFIGURATIONS.individual,
      userSession: {
        userId: "verified_user",
        email: "verified@example.test",
        activeRoleKey: "individual",
        verifiedRoleKeys: ["individual"],
        grantedPermissions: ["export:own_assets"],
      },
    }
    const checker = createExportAuthorizationChecker(() => context)
    const roleAtStart = checker.getActiveRole()!
    let exportInvoked = false

    const pendingExport = new Promise<void>((resolve) =>
      setTimeout(resolve, 0),
    ).then(() => {
      const authorization = checker.checkAuthorization(
        "export:own_assets",
        roleAtStart,
      )
      if (authorization.allowed) exportInvoked = true
      return authorization
    })

    assert.equal((await pendingExport).allowed, true)
    assert.equal(exportInvoked, true)
  })

  test("ExportModal checks current authorization after the delay before CSV generation", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src",
        "components",
        "modals",
        "ExportModal.tsx",
      ),
      "utf8",
    )
    const handlerStart = source.indexOf("const handleDownload =")
    const delayIndex = source.indexOf("await new Promise", handlerStart)
    const currentCheckIndex = source.indexOf(
      "const latestAuthorization = checkAuthorization(",
      delayIndex,
    )
    const denialIndex = source.indexOf(
      "if (formatRequiresAuthorization && !latestAuthorization.allowed)",
      currentCheckIndex,
    )
    const csvGenerationIndex = source.indexOf(
      "apiService.export.exportToCsv",
      denialIndex,
    )

    assert.ok(handlerStart >= 0)
    assert.ok(delayIndex > handlerStart)
    assert.ok(currentCheckIndex > delayIndex)
    assert.ok(denialIndex > currentCheckIndex)
    assert.ok(csvGenerationIndex > denialIndex)
    assert.doesNotMatch(
      source.slice(delayIndex, csvGenerationIndex),
      /authorization\.allowed/,
    )
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

  test("Zero-Trust: switching to any of the 16 roles grants no permissions", () => {
    for (const roleKey of ROLE_KEYS) {
      const config = ROLE_CONFIGURATIONS[roleKey]
      const simulatedSession: UserSession = {
        userId: "usr_active_session",
        email: "alex.morgan@wealthsphere.ai",
        activeRoleKey: roleKey,
        verifiedRoleKeys: ["individual"], // only individual verified by default
        grantedPermissions: [],
        isDemoMode: true,
      }

      // Check actions with permissions
      const protectedActions = config.quickActions.filter((a) => a.requiredPermission)
      for (const action of protectedActions) {
        const auth = authorizeAction(simulatedSession, action, config)
        assert.equal(auth.allowed, false, `Zero-Trust breach: ${roleKey}:${action.id} allowed without granted permission!`)
        assert.equal(auth.requiresVerification, true)
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
