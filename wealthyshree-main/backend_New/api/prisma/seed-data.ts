// Generated from the frontend src/config/roles.ts (16 roles, 39 permissions)
export const ROLES = [
  {
    "key": "individual",
    "name": "Individual",
    "category": "Personal",
    "description": "Consolidated personal balance sheet, asset growth, cash flow, and tax-smart savings.",
    "intendedPermissions": [
      "read:own_profile",
      "write:own_profile",
      "read:own_assets",
      "write:own_assets",
      "read:tax_scenarios"
    ]
  },
  {
    "key": "family",
    "name": "Family",
    "category": "Personal",
    "description": "Consolidated multi-generational net worth, trust structures, shared budgets, and legacy transfer.",
    "intendedPermissions": [
      "read:family_group",
      "write:family_group",
      "manage:family_members",
      "read:own_profile",
      "read:own_assets"
    ]
  },
  {
    "key": "student",
    "name": "Student",
    "category": "Personal",
    "description": "Tuition funding, student debt management, monthly stipend budgeting, and credit foundation.",
    "intendedPermissions": [
      "read:student_budget",
      "write:student_budget",
      "read:student_loans",
      "read:own_profile"
    ]
  },
  {
    "key": "financial_advisor",
    "name": "Financial Advisor",
    "category": "Professional",
    "description": "Practice AUM analytics, client household allocations, model portfolio drift, and compliance reviews.",
    "intendedPermissions": [
      "read:client_roster",
      "write:client_roster",
      "propose:trades",
      "execute:trades"
    ]
  },
  {
    "key": "ca",
    "name": "CA",
    "category": "Professional",
    "description": "Statutory audits, multi-entity balance sheets, corporate tax reconciliations, and working paper sign-offs.",
    "intendedPermissions": [
      "conduct:statutory_audit",
      "sign:audit_reports",
      "file:tax_returns",
      "read_only:audit_trail"
    ]
  },
  {
    "key": "tax_consultant",
    "name": "Tax Consultant",
    "category": "Professional",
    "description": "Multi-jurisdictional tax scenario modeling, capital gains optimization, and cross-border treaties.",
    "intendedPermissions": [
      "read:tax_scenarios",
      "file:tax_returns",
      "read:client_roster"
    ]
  },
  {
    "key": "investment_manager",
    "name": "Investment Manager",
    "category": "Professional",
    "description": "Factor attribution, multi-asset portfolio rebalancing, downside risk modeling, and mandate execution.",
    "intendedPermissions": [
      "propose:trades",
      "execute:trades",
      "manage:private_bank_book"
    ]
  },
  {
    "key": "insurance_advisor",
    "name": "Insurance Advisor",
    "category": "Professional",
    "description": "Policy coverage inventory, mortality and morbidity gap analysis, renewals timeline, and claims tracking.",
    "intendedPermissions": [
      "read:insurance_policies",
      "issue:insurance_quotes",
      "read:client_roster"
    ]
  },
  {
    "key": "wealth_coach",
    "name": "Wealth Coach",
    "category": "Professional",
    "description": "Client financial wellness tracking, habit consistency streaks, savings milestones, and goal coaching.",
    "intendedPermissions": [
      "manage:coaching_cohorts",
      "assign:client_milestones",
      "read:own_profile"
    ]
  },
  {
    "key": "family_office",
    "name": "Family Office",
    "category": "Institutional",
    "description": "Consolidated multi-entity balance sheet, direct private equity, real estate holdings, and governance.",
    "intendedPermissions": [
      "read:family_office_entities",
      "approve:capital_calls",
      "read:family_group",
      "write:family_group"
    ]
  },
  {
    "key": "private_bank",
    "name": "Private Bank",
    "category": "Institutional",
    "description": "Ultra-HNW tiering, bespoke Lombard credit facilities, structured products, and regulatory oversight.",
    "intendedPermissions": [
      "manage:private_bank_book",
      "underwrite:credit_lines",
      "read_only:audit_trail"
    ]
  },
  {
    "key": "corporate_hr",
    "name": "Corporate HR",
    "category": "Institutional",
    "description": "Workforce financial literacy analytics, ESOP / stock option pools, and 401(k) / retirement participation.",
    "intendedPermissions": [
      "read:workforce_wellness",
      "manage:equity_plans",
      "read:own_profile"
    ]
  },
  {
    "key": "university",
    "name": "University",
    "category": "Institutional",
    "description": "Enrolled student learners, accredited finance courses, faculty instructors, completion velocity, assessments, and verifiable certifications.",
    "intendedPermissions": [
      "read:endowment_portfolio",
      "approve:scholarship_disbursements",
      "read:workforce_wellness"
    ]
  },
  {
    "key": "government_organizations",
    "name": "Government Organizations",
    "category": "Governance",
    "description": "Public financial programs, beneficiary welfare groups, nationwide literacy campaigns, regional analytics, and verified impact monitoring.",
    "intendedPermissions": [
      "view:sovereign_aggregates",
      "audit:public_funds",
      "read_only:audit_trail"
    ]
  },
  {
    "key": "auditors",
    "name": "Auditors",
    "category": "Governance",
    "description": "Audit engagement management, financial records verification, immutable evidence repository, review queue, findings resolution, and audit trails.",
    "intendedPermissions": [
      "read_only:audit_trail",
      "flag:control_exceptions",
      "certify:compliance_reports"
    ]
  },
  {
    "key": "super_admin",
    "name": "Super Admin",
    "category": "Governance",
    "description": "Multi-tenant user registry, role entitlements, organization workspaces, subscription billing, and real-time security telemetry.",
    "intendedPermissions": [
      "manage:tenants",
      "manage:rbac_roles",
      "configure:ai_policies",
      "view:system_telemetry",
      "read_only:audit_trail"
    ]
  }
] as const;

export const PERMISSIONS: string[] = [
  "approve:capital_calls",
  "approve:scholarship_disbursements",
  "assign:client_milestones",
  "audit:public_funds",
  "certify:compliance_reports",
  "conduct:statutory_audit",
  "configure:ai_policies",
  "execute:trades",
  "file:tax_returns",
  "flag:control_exceptions",
  "issue:insurance_quotes",
  "manage:coaching_cohorts",
  "manage:equity_plans",
  "manage:family_members",
  "manage:private_bank_book",
  "manage:rbac_roles",
  "manage:tenants",
  "propose:trades",
  "read:client_roster",
  "read:endowment_portfolio",
  "read:family_group",
  "read:family_office_entities",
  "read:insurance_policies",
  "read:own_assets",
  "read:own_profile",
  "read:student_budget",
  "read:student_loans",
  "read:tax_scenarios",
  "read:workforce_wellness",
  "read_only:audit_trail",
  "sign:audit_reports",
  "underwrite:credit_lines",
  "view:sovereign_aggregates",
  "view:system_telemetry",
  "write:client_roster",
  "write:family_group",
  "write:own_assets",
  "write:own_profile",
  "write:student_budget"
];
