/**
 * WealthSphere.ai - Strongly Typed Role System & RBAC Configuration
 * Defines types for the 16 distinct platform user roles, navigation,
 * metrics, quick actions, features, and zero-trust permission models.
 */

export type IconName = "activity" | "ai" | "alert" | "arrow" | "bank" | "book" | "briefcase" | "calendar" | "card" | "check" | "chevron" | "document" | "family" | "globe" | "goal" | "grid" | "home" | "insurance" | "lock" | "menu" | "moon" | "more" | "notification" | "pie" | "plus" | "search" | "settings" | "shield" | "sparkle" | "sun" | "tax" | "trending" | "user" | "wallet"

/** Canonical role keys for the 16 WealthSphere.ai user roles */
export type RoleKey = "individual" | "family" | "student" | "financial_advisor" | "ca" | "tax_consultant" | "investment_manager" | "insurance_advisor" | "wealth_coach" | "family_office" | "private_bank" | "corporate_hr" | "university" | "government_organizations" | "auditors" | "super_admin"

/** Display names and legacy names supported across the UI */
export type RoleDisplayName = "Individual" | "Family" | "Student" | "Financial Advisor" | "CA" | "Tax Consultant" | "Investment Manager" | "Insurance Advisor" | "Wealth Coach" | "Family Office" | "Private Bank" | "Corporate HR" | "University" | "Government Organizations" | "Government" | "Auditors" | "Auditor" | "Super Admin"

export type RoleCategory = "Personal" | "Professional" | "Institutional" | "Governance"

/** Granular permissions system for zero-trust authorization */
export type Permission = "read:own_profile" | "write:own_profile" | "read:own_assets" | "write:own_assets" | "export:own_assets" | "read:family_group" | "write:family_group" | "export:family_group" | "manage:family_members" | "read:student_budget" | "write:student_budget" | "export:student_budget" | "read:student_loans" | "write:student_education" | "export:student_loans" | "read:client_roster" | "write:client_roster" | "export:client_roster" | "propose:trades" | "execute:trades" | "export:investment_portfolios" | "conduct:statutory_audit" | "export:statutory_audit" | "sign:audit_reports" | "export:audit_reports" | "read:tax_scenarios" | "write:tax_scenarios" | "file:tax_returns" | "export:tax_returns" | "read:insurance_policies" | "issue:insurance_quotes" | "submit:insurance_claims" | "export:insurance_policies" | "manage:coaching_cohorts" | "assign:client_milestones" | "export:coaching_cohorts" | "read:family_office_entities" | "approve:capital_calls" | "export:family_office_entities" | "manage:private_bank_book" | "underwrite:credit_lines" | "execute:wire_transfers" | "export:private_bank_book" | "read:workforce_wellness" | "manage:workforce_wellness" | "manage:equity_plans" | "export:workforce_wellness" | "read:endowment_portfolio" | "approve:scholarship_disbursements" | "export:scholarship_disbursements" | "export:education_reports" | "manage:campus_events" | "issue:academic_credentials" | "write:university_settings" | "view:sovereign_aggregates" | "audit:public_funds" | "manage:public_programs" | "write:government_settings" | "export:public_funds" | "read_only:audit_trail" | "flag:control_exceptions" | "certify:compliance_reports" | "write:auditor_settings" | "manage:tenants" | "manage:rbac_roles" | "configure:ai_policies" | "configure:platform" | "rotate:platform_keys" | "view:system_telemetry" | "export:system_telemetry" | "export:platform_users" // Personal & Family // Professional Advisory & Accounting // Institutional & Enterprise // Audit & Administration

export interface RoleMetric {
  id: string
  label: string
  value: string
  detail: string
  icon: IconName
  tone?: "violet" | "blue" | "gold" | "emerald" | "navy"
  trend?: "up" | "down" | "neutral"
}

export interface RoleQuickAction {
  id: string
  label: string
  description: string
  icon: IconName
  primary?: boolean
  requiredPermission?: Permission
}

export interface RoleNavItem {
  id: string
  name: string
  icon: IconName
  badge?: string
  requiredPermission?: Permission
}

export interface RoleNavSection {
  label: string
  items: RoleNavItem[]
}

export interface RoleFeature {
  id: string
  title: string
  description: string
  category: "core" | "ai" | "compliance" | "collaboration"
  requiredPermission?: Permission
}

export interface PersonaProfile {
  name: string
  title: string
  initials: string
  workspaceName: string
  badgeLabel: string
}

export interface RoleConfig {
  key: RoleKey
  displayName: RoleDisplayName
  aliases: string[]
  category: RoleCategory
  dashboardTitle: string
  subtitle: string
  icon: IconName
  persona: PersonaProfile
  navigationMenu: RoleNavSection[]
  relevantMetrics: RoleMetric[]
  quickActions: RoleQuickAction[]
  intendedFeatures: RoleFeature[]
  /** Permissions that this role is intended to have once fully verified */
  intendedPermissions: Permission[]
  /** Read-only permissions designated as safe defaults; frontend sessions do not apply them automatically */
  defaultGrantedPermissions: Permission[]
  /** Security verification requirements (e.g. license, 2FA, institutional SSO) */
  securityRequirement: string
}

/** Authenticated user session for evaluating authorization */
export interface UserSession {
  userId: string
  email: string
  /** Role that the user has currently activated/viewing */
  activeRoleKey: RoleKey
  /** Roles that the user has verified credentials/licenses for */
  verifiedRoleKeys: RoleKey[]
  /** Explicitly granted permissions from token/backend claims */
  grantedPermissions: Permission[]
  isDemoMode?: boolean
}

export interface AuthorizationResult {
  allowed: boolean
  reason?: string
  requiredPermission?: Permission
  requiresVerification?: boolean
}

/** Unique page key combining role key and navigation item ID (e.g. 'family:investments') */
export type PageKey = `${RoleKey}:${string}`
