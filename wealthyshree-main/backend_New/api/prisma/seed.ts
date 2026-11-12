import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { ROLES, PERMISSIONS } from "./seed-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ───────────── Demo organizations ─────────────
const ORGS = [
  { name: "WealthSphere Platform", type: "PLATFORM" },
  { name: "Sharma Household", type: "INDIVIDUAL" },
  { name: "Verma Household", type: "INDIVIDUAL" },
  { name: "Kapoor Advisory LLP", type: "ADVISORY_FIRM" },
  { name: "Rao Family Office", type: "FAMILY_OFFICE" },
  { name: "Heritage Private Bank", type: "PRIVATE_BANK" },
  { name: "Nimbus Technologies", type: "CORPORATE" },
  { name: "Deccan University", type: "UNIVERSITY" },
  { name: "Ministry of Finance (Demo)", type: "GOVERNMENT" },
  { name: "Prime Audit Partners", type: "AUDIT_FIRM" },
] as const;

// ───────────── Demo users: one per role (+1 extra for tenant-isolation tests) ─────────────
const USERS = [
  { email: "individual@demo.wealthsphere.test", name: "Aarav Sharma", org: "Sharma Household", role: "individual" },
  { email: "family@demo.wealthsphere.test", name: "Meera Sharma", org: "Sharma Household", role: "family" },
  { email: "student@demo.wealthsphere.test", name: "Rohan Sharma", org: "Sharma Household", role: "student" },
  { email: "verma.individual@demo.wealthsphere.test", name: "Neha Verma", org: "Verma Household", role: "individual" },
  { email: "advisor@demo.wealthsphere.test", name: "Priya Kapoor", org: "Kapoor Advisory LLP", role: "financial_advisor" },
  { email: "ca@demo.wealthsphere.test", name: "Vikram Joshi", org: "Kapoor Advisory LLP", role: "ca" },
  { email: "tax@demo.wealthsphere.test", name: "Anita Desai", org: "Kapoor Advisory LLP", role: "tax_consultant" },
  { email: "investment@demo.wealthsphere.test", name: "Karan Malhotra", org: "Kapoor Advisory LLP", role: "investment_manager" },
  { email: "insurance@demo.wealthsphere.test", name: "Sunita Rao", org: "Kapoor Advisory LLP", role: "insurance_advisor" },
  { email: "coach@demo.wealthsphere.test", name: "Devika Menon", org: "Kapoor Advisory LLP", role: "wealth_coach" },
  { email: "familyoffice@demo.wealthsphere.test", name: "Arjun Rao", org: "Rao Family Office", role: "family_office" },
  { email: "bank@demo.wealthsphere.test", name: "Ishaan Bhatia", org: "Heritage Private Bank", role: "private_bank" },
  { email: "hr@demo.wealthsphere.test", name: "Pooja Nair", org: "Nimbus Technologies", role: "corporate_hr" },
  { email: "university@demo.wealthsphere.test", name: "Dr. Sameer Kulkarni", org: "Deccan University", role: "university" },
  { email: "government@demo.wealthsphere.test", name: "Rajesh Iyer", org: "Ministry of Finance (Demo)", role: "government_organizations" },
  { email: "auditor@demo.wealthsphere.test", name: "Farah Khan", org: "Prime Audit Partners", role: "auditors" },
  { email: "admin@demo.wealthsphere.test", name: "Platform Admin", org: "WealthSphere Platform", role: "super_admin" },
] as const;

// ───────────── Demo financial data (placeholder values in INR) ─────────────
type Fin = {
  accounts: { type: any; name: string; institution: string; balance: string }[];
  assets: { type: any; name: string; value: string; purchaseValue?: string }[];
  liabilities: { type: any; name: string; lender: string; principal: string; outstanding: string; interestRate: string; emi: string }[];
  goals: { name: string; targetAmount: string; savedAmount: string; targetDate: string }[];
  transactions: { type: any; amount: string; category: string; description: string; daysAgo: number; account?: number }[];
};

const FINANCE: Record<string, Fin> = {
  "individual@demo.wealthsphere.test": {
    accounts: [
      { type: "SAVINGS", name: "Salary Account", institution: "HDFC Bank", balance: "385000.00" },
      { type: "CREDIT_CARD", name: "Rewards Credit Card", institution: "ICICI Bank", balance: "-42000.00" },
    ],
    assets: [
      { type: "MUTUAL_FUND", name: "Nifty 50 Index Fund", value: "1250000.00", purchaseValue: "980000.00" },
      { type: "STOCK", name: "Equity Portfolio", value: "720000.00", purchaseValue: "600000.00" },
      { type: "GOLD", name: "Sovereign Gold Bonds", value: "310000.00", purchaseValue: "240000.00" },
      { type: "REAL_ESTATE", name: "2BHK Apartment, Pune", value: "8500000.00", purchaseValue: "6200000.00" },
      { type: "RETIREMENT", name: "EPF + NPS", value: "1450000.00" },
    ],
    liabilities: [
      { type: "HOME_LOAN", name: "Home Loan", lender: "SBI", principal: "5000000.00", outstanding: "3650000.00", interestRate: "8.50", emi: "43500.00" },
      { type: "VEHICLE_LOAN", name: "Car Loan", lender: "Axis Bank", principal: "800000.00", outstanding: "410000.00", interestRate: "9.25", emi: "17800.00" },
    ],
    goals: [
      { name: "Emergency Fund (6 months)", targetAmount: "600000.00", savedAmount: "385000.00", targetDate: "2027-06-30" },
      { name: "Child Education", targetAmount: "2500000.00", savedAmount: "620000.00", targetDate: "2035-06-01" },
      { name: "Retirement Corpus", targetAmount: "30000000.00", savedAmount: "1450000.00", targetDate: "2050-04-01" },
    ],
    transactions: [
      { type: "INCOME", amount: "185000.00", category: "Salary", description: "Monthly salary", daysAgo: 3, account: 0 },
      { type: "EXPENSE", amount: "43500.00", category: "Loan EMI", description: "Home loan EMI", daysAgo: 4, account: 0 },
      { type: "EXPENSE", amount: "18500.00", category: "Groceries", description: "Monthly groceries", daysAgo: 8, account: 0 },
      { type: "EXPENSE", amount: "7200.00", category: "Utilities", description: "Electricity and internet", daysAgo: 12, account: 0 },
      { type: "EXPENSE", amount: "12500.00", category: "Dining", description: "Dining and entertainment", daysAgo: 15, account: 1 },
    ],
  },
  "family@demo.wealthsphere.test": {
    accounts: [{ type: "SAVINGS", name: "Joint Household Account", institution: "SBI", balance: "210000.00" }],
    assets: [
      { type: "FIXED_DEPOSIT", name: "Family Fixed Deposit", value: "900000.00", purchaseValue: "800000.00" },
      { type: "GOLD", name: "Family Gold Holdings", value: "540000.00" },
    ],
    liabilities: [],
    goals: [{ name: "Family Vacation", targetAmount: "400000.00", savedAmount: "150000.00", targetDate: "2027-12-15" }],
    transactions: [
      { type: "EXPENSE", amount: "22000.00", category: "Groceries", description: "Household groceries", daysAgo: 6, account: 0 },
    ],
  },
  "student@demo.wealthsphere.test": {
    accounts: [{ type: "SAVINGS", name: "Student Account", institution: "Kotak Bank", balance: "18500.00" }],
    assets: [{ type: "OTHER", name: "Laptop", value: "55000.00", purchaseValue: "78000.00" }],
    liabilities: [
      { type: "EDUCATION_LOAN", name: "Education Loan", lender: "Bank of Baroda", principal: "1200000.00", outstanding: "950000.00", interestRate: "9.00", emi: "0.00" },
    ],
    goals: [{ name: "Study Abroad Fund", targetAmount: "800000.00", savedAmount: "65000.00", targetDate: "2028-08-01" }],
    transactions: [
      { type: "INCOME", amount: "8000.00", category: "Allowance", description: "Monthly allowance", daysAgo: 5, account: 0 },
      { type: "EXPENSE", amount: "3200.00", category: "Food", description: "Mess and canteen", daysAgo: 9, account: 0 },
    ],
  },
  "verma.individual@demo.wealthsphere.test": {
    accounts: [{ type: "SAVINGS", name: "Primary Savings", institution: "Axis Bank", balance: "95000.00" }],
    assets: [{ type: "MUTUAL_FUND", name: "Flexi Cap Fund", value: "430000.00", purchaseValue: "350000.00" }],
    liabilities: [{ type: "PERSONAL_LOAN", name: "Personal Loan", lender: "HDFC Bank", principal: "300000.00", outstanding: "180000.00", interestRate: "11.50", emi: "9800.00" }],
    goals: [{ name: "Buy a Car", targetAmount: "900000.00", savedAmount: "210000.00", targetDate: "2028-03-01" }],
    transactions: [
      { type: "INCOME", amount: "92000.00", category: "Salary", description: "Monthly salary", daysAgo: 2, account: 0 },
    ],
  },
};

function describePermission(key: string): string {
  const [action, target] = key.split(":");
  return `${action.replace(/_/g, " ")} ${target.replace(/_/g, " ")}`.replace(/^./, (c) => c.toUpperCase());
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function main() {
  console.log("Seeding permissions…");
  for (const key of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key },
      update: {},
      create: { key, description: describePermission(key) },
    });
  }

  console.log("Seeding roles and role permissions…");
  for (const r of ROLES) {
    const role = await prisma.role.upsert({
      where: { key: r.key },
      update: { name: r.name, category: r.category, description: r.description },
      create: { key: r.key, name: r.name, category: r.category, description: r.description },
    });
    for (const permKey of r.intendedPermissions) {
      const permission = await prisma.permission.findUniqueOrThrow({ where: { key: permKey } });
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id },
      });
    }
  }

  console.log("Seeding organizations…");
  const orgIds = new Map<string, string>();
  for (const o of ORGS) {
    const existing = await prisma.organization.findFirst({ where: { name: o.name } });
    const org = existing ?? (await prisma.organization.create({ data: { name: o.name, type: o.type } }));
    orgIds.set(o.name, org.id);
  }

  console.log("Seeding users and memberships…");
  const userIds = new Map<string, string>();
  for (const u of USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name },
      create: { email: u.email, name: u.name },
    });
    userIds.set(u.email, user.id);
    const role = await prisma.role.findUniqueOrThrow({ where: { key: u.role } });
    const organizationId = orgIds.get(u.org)!;
    await prisma.membership.upsert({
      where: { userId_organizationId_roleId: { userId: user.id, organizationId, roleId: role.id } },
      update: {},
      create: { userId: user.id, organizationId, roleId: role.id },
    });
  }

  console.log("Seeding demo financial data…");
  for (const u of USERS) {
    const fin = FINANCE[u.email];
    if (!fin) continue;
    const userId = userIds.get(u.email)!;
    const organizationId = orgIds.get(u.org)!;
    const already = await prisma.asset.count({ where: { userId, organizationId } });
    if (already > 0) {
      console.log(`  skip ${u.email} (already has data)`);
      continue;
    }
    const accountIds: string[] = [];
    for (const a of fin.accounts) {
      const acc = await prisma.account.create({ data: { organizationId, userId, ...a } });
      accountIds.push(acc.id);
    }
    for (const a of fin.assets) await prisma.asset.create({ data: { organizationId, userId, ...a } });
    for (const l of fin.liabilities) await prisma.liability.create({ data: { organizationId, userId, ...l } });
    for (const g of fin.goals) {
      await prisma.goal.create({
        data: { organizationId, userId, name: g.name, targetAmount: g.targetAmount, savedAmount: g.savedAmount, targetDate: new Date(g.targetDate) },
      });
    }
    for (const t of fin.transactions) {
      await prisma.transaction.create({
        data: {
          organizationId, userId, type: t.type, amount: t.amount, category: t.category,
          description: t.description, date: daysAgo(t.daysAgo),
          accountId: t.account !== undefined ? accountIds[t.account] : null,
        },
      });
    }
    console.log(`  added data for ${u.email}`);
  }

  const counts = {
    roles: await prisma.role.count(),
    permissions: await prisma.permission.count(),
    rolePermissions: await prisma.rolePermission.count(),
    organizations: await prisma.organization.count(),
    users: await prisma.user.count(),
    memberships: await prisma.membership.count(),
    assets: await prisma.asset.count(),
    liabilities: await prisma.liability.count(),
    goals: await prisma.goal.count(),
    transactions: await prisma.transaction.count(),
  };
  console.log("Done. Row counts:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
