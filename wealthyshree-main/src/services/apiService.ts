/**
 * WealthSphere.ai - Client API & Simulation Service Layer
 *
 * Implements an asynchronous service layer simulating backend operations
 * with realistic latency, validation, in-memory state tracking, and export utilities.
 *
 * Note: Designed to cleanly decouple the frontend UI from direct state manipulation,
 * allowing straightforward transition to real backend REST/GraphQL endpoints.
 */

import {
  type MockAsset,
  type MockGoal,
  type MockTransaction,
  type MockClient,
  type MockMeeting,
  type MockTaxFiling,
  type MockInsurancePolicy,
  type MockInsuranceClaim,
  type MockPortfolioHolding,
  type MockEvidenceItem,
  type MockAdminUser,
  INITIAL_ASSETS,
  INITIAL_GOALS,
  INITIAL_TRANSACTIONS,
  INITIAL_CLIENTS,
  INITIAL_MEETINGS,
  INITIAL_TAX_FILINGS,
  INITIAL_POLICIES,
  INITIAL_CLAIMS,
  INITIAL_HOLDINGS,
  INITIAL_EVIDENCE,
  INITIAL_ADMIN_USERS,
} from "./mockData"

export interface ServiceResponse<T> {
  success: boolean
  data?: T
  message: string
  error?: string
}

export interface RebalanceTargetAllocation {
  symbol: string
  newWeight: number
}

// In-memory runtime state stores
let assetsStore: MockAsset[] = [...INITIAL_ASSETS]
let goalsStore: MockGoal[] = [...INITIAL_GOALS]
let transactionsStore: MockTransaction[] = [...INITIAL_TRANSACTIONS]
let clientsStore: MockClient[] = [...INITIAL_CLIENTS]
let meetingsStore: MockMeeting[] = [...INITIAL_MEETINGS]
let taxFilingsStore: MockTaxFiling[] = [...INITIAL_TAX_FILINGS]
let policiesStore: MockInsurancePolicy[] = [...INITIAL_POLICIES]
let claimsStore: MockInsuranceClaim[] = [...INITIAL_CLAIMS]
let holdingsStore: MockPortfolioHolding[] = [...INITIAL_HOLDINGS]
let evidenceStore: MockEvidenceItem[] = [...INITIAL_EVIDENCE]
let adminUsersStore: MockAdminUser[] = [...INITIAL_ADMIN_USERS]

// Helper to simulate network latency
const simulateNetwork = (ms = 350): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/* =========================================================================
   API SERVICE DEFINITIONS
   ========================================================================= */

export const apiService = {
  // --- Assets & Net Worth ---
  assets: {
    async getAll(): Promise<ServiceResponse<MockAsset[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...assetsStore],
        message: "Assets loaded successfully.",
      }
    },
    async create(
      assetData: Omit<MockAsset, "id" | "lastUpdated">,
    ): Promise<ServiceResponse<MockAsset>> {
      await simulateNetwork(400)
      if (!assetData.name?.trim()) {
        return {
          success: false,
          message: "Validation failed",
          error: "Asset name is required.",
        }
      }
      if (!assetData.valuation || assetData.valuation <= 0) {
        return {
          success: false,
          message: "Validation failed",
          error: "Valuation must be a positive number.",
        }
      }

      const newAsset: MockAsset = {
        id: `ast-${Date.now()}`,
        ...assetData,
        lastUpdated: "Just now",
      }
      assetsStore = [newAsset, ...assetsStore]

      return {
        success: true,
        data: newAsset,
        message: `Asset "${newAsset.name}" successfully recorded in current session.`,
      }
    },
  },

  // --- Financial Goals ---
  goals: {
    async getAll(): Promise<ServiceResponse<MockGoal[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...goalsStore],
        message: "Goals loaded successfully.",
      }
    },
    async create(
      goalData: Omit<MockGoal, "id" | "currentAmount" | "status"> & {
        initialAmount?: number
      },
    ): Promise<ServiceResponse<MockGoal>> {
      await simulateNetwork(350)
      if (!goalData.name?.trim()) {
        return {
          success: false,
          message: "Validation failed",
          error: "Goal name is required.",
        }
      }
      if (!goalData.targetAmount || goalData.targetAmount <= 0) {
        return {
          success: false,
          message: "Validation failed",
          error: "Target amount must be greater than $0.",
        }
      }

      const current = goalData.initialAmount || 0
      const status = current >= goalData.targetAmount ? "Achieved" : "On Track"

      const newGoal: MockGoal = {
        id: `gl-${Date.now()}`,
        name: goalData.name,
        category: goalData.category,
        targetAmount: goalData.targetAmount,
        currentAmount: current,
        targetDate: goalData.targetDate,
        status,
      }
      goalsStore = [newGoal, ...goalsStore]

      return {
        success: true,
        data: newGoal,
        message: `Financial goal "${newGoal.name}" established in current session.`,
      }
    },
  },

  // --- Transactions ---
  transactions: {
    async getAll(): Promise<ServiceResponse<MockTransaction[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...transactionsStore],
        message: "Transactions retrieved.",
      }
    },
    async record(
      data: Omit<MockTransaction, "id" | "date" | "status">,
    ): Promise<ServiceResponse<MockTransaction>> {
      await simulateNetwork(300)
      const newTx: MockTransaction = {
        id: `txn-${Date.now()}`,
        date: "Today · Just now",
        ...data,
        status: "Cleared",
      }
      transactionsStore = [newTx, ...transactionsStore]
      return {
        success: true,
        data: newTx,
        message: `Transaction recorded: $${data.amount.toLocaleString()}.`,
      }
    },
  },

  // --- Clients & Practice Roster ---
  clients: {
    async getAll(): Promise<ServiceResponse<MockClient[]>> {
      await simulateNetwork(250)
      return {
        success: true,
        data: [...clientsStore],
        message: "Client accounts retrieved.",
      }
    },
    async create(
      clientData: Omit<MockClient, "id" | "healthScore" | "mandateDrift" | "driftTone" | "lastReview" | "status">,
    ): Promise<ServiceResponse<MockClient>> {
      await simulateNetwork(450)
      if (!clientData.name?.trim()) {
        return {
          success: false,
          message: "Validation failed",
          error: "Client or household name is required.",
        }
      }
      if (!clientData.email?.includes("@")) {
        return {
          success: false,
          message: "Validation failed",
          error: "A valid email address is required.",
        }
      }

      const newClient: MockClient = {
        id: `cl-${Date.now()}`,
        ...clientData,
        healthScore: 820,
        mandateDrift: "0.0% Target",
        driftTone: "success",
        lastReview: "Just onboarded",
        status: "Optimal",
      }
      clientsStore = [newClient, ...clientsStore]

      return {
        success: true,
        data: newClient,
        message: `Client "${newClient.name}" successfully onboarded into practice book.`,
      }
    },
  },

  // --- Advisory Meetings & Consultations ---
  meetings: {
    async getAll(): Promise<ServiceResponse<MockMeeting[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...meetingsStore],
        message: "Meetings calendar retrieved.",
      }
    },
    async schedule(
      meetingData: Omit<MockMeeting, "id" | "status">,
    ): Promise<ServiceResponse<MockMeeting>> {
      await simulateNetwork(350)
      if (!meetingData.client?.trim()) {
        return {
          success: false,
          message: "Validation failed",
          error: "Client selection is required.",
        }
      }
      if (!meetingData.date || !meetingData.time) {
        return {
          success: false,
          message: "Validation failed",
          error: "Date and time must be specified.",
        }
      }

      const newMeeting: MockMeeting = {
        id: `mt-${Date.now()}`,
        ...meetingData,
        status: "Confirmed",
      }
      meetingsStore = [newMeeting, ...meetingsStore]

      return {
        success: true,
        data: newMeeting,
        message: `Consultation with ${newMeeting.client} scheduled for ${newMeeting.date} at ${newMeeting.time}.`,
      }
    },
    async updateStatus(
      id: string,
      status: MockMeeting["status"],
    ): Promise<ServiceResponse<MockMeeting>> {
      await simulateNetwork(250)
      const target = meetingsStore.find((m) => m.id === id)
      if (!target) {
        return { success: false, message: "Meeting not found" }
      }
      target.status = status
      return {
        success: true,
        data: target,
        message: `Meeting status updated to "${status}".`,
      }
    },
  },

  // --- Tax Filings & Calculations ---
  tax: {
    async getAll(): Promise<ServiceResponse<MockTaxFiling[]>> {
      await simulateNetwork(250)
      return {
        success: true,
        data: [...taxFilingsStore],
        message: "Tax filings docket loaded.",
      }
    },
    async createScenario(
      scenario: Omit<MockTaxFiling, "id" | "status">,
    ): Promise<ServiceResponse<MockTaxFiling>> {
      await simulateNetwork(400)
      const newFiling: MockTaxFiling = {
        id: `tx-${Date.now()}`,
        ...scenario,
        status: "Draft Prepared",
      }
      taxFilingsStore = [newFiling, ...taxFilingsStore]
      return {
        success: true,
        data: newFiling,
        message: `Tax scenario "${newFiling.form}" for ${newFiling.entity} modeled successfully.`,
      }
    },
    async updateStatus(
      id: string,
      newStatus: MockTaxFiling["status"],
    ): Promise<ServiceResponse<MockTaxFiling>> {
      await simulateNetwork(300)
      const filing = taxFilingsStore.find((f) => f.id === id)
      if (!filing) return { success: false, message: "Filing not found." }
      filing.status = newStatus
      return {
        success: true,
        data: filing,
        message: `Filing for ${filing.entity} marked as "${newStatus}".`,
      }
    },
  },

  // --- Insurance Policies & Claims ---
  insurance: {
    async getPolicies(): Promise<ServiceResponse<MockInsurancePolicy[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...policiesStore],
        message: "Policies retrieved.",
      }
    },
    async getClaims(): Promise<ServiceResponse<MockInsuranceClaim[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...claimsStore],
        message: "Claims retrieved.",
      }
    },
    async submitClaim(
      claimData: Omit<MockInsuranceClaim, "id" | "claimNumber" | "status" | "incidentDate">,
    ): Promise<ServiceResponse<MockInsuranceClaim>> {
      await simulateNetwork(450)
      if (!claimData.client?.trim()) {
        return {
          success: false,
          message: "Validation failed",
          error: "Insured client name is required.",
        }
      }
      if (!claimData.amount || claimData.amount <= 0) {
        return {
          success: false,
          message: "Validation failed",
          error: "Estimated claim amount must be greater than $0.",
        }
      }

      const newClaim: MockInsuranceClaim = {
        id: `clm-${Date.now()}`,
        claimNumber: `CLM-2025-${Math.floor(100 + Math.random() * 900)}`,
        ...claimData,
        incidentDate: "Today",
        status: "Under Investigation",
      }
      claimsStore = [newClaim, ...claimsStore]

      return {
        success: true,
        data: newClaim,
        message: `Claim ${newClaim.claimNumber} logged for review. Claim Adjuster assigned.`,
      }
    },
    async renewPolicy(
      policyId: string,
    ): Promise<ServiceResponse<MockInsurancePolicy>> {
      await simulateNetwork(350)
      const policy = policiesStore.find((p) => p.id === policyId)
      if (!policy) return { success: false, message: "Policy not found." }
      policy.status = "Active"
      policy.renewalDate = "2026-12-31"
      return {
        success: true,
        data: policy,
        message: `Policy ${policy.policyNumber} renewed for another term.`,
      }
    },
  },

  // --- Portfolio Rebalancing ---
  investments: {
    async getHoldings(): Promise<ServiceResponse<MockPortfolioHolding[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...holdingsStore],
        message: "Holdings retrieved.",
      }
    },
    async simulateRebalance(
      targetAllocations: RebalanceTargetAllocation[],
    ): Promise<ServiceResponse<MockPortfolioHolding[]>> {
      await simulateNetwork(500)
      const totalWeight = targetAllocations.reduce(
        (sum, a) => sum + a.newWeight,
        0,
      )
      if (Math.abs(totalWeight - 100) > 0.5) {
        return {
          success: false,
          message: "Allocation Error",
          error: `Target weights must sum to 100%. Current sum: ${totalWeight.toFixed(1)}%`,
        }
      }

      holdingsStore = holdingsStore.map((h) => {
        const found = targetAllocations.find((a) => a.symbol === h.symbol)
        if (found) {
          return {
            ...h,
            targetWeight: found.newWeight,
            drift: Number((h.weight - found.newWeight).toFixed(1)),
          }
        }
        return h
      })

      return {
        success: true,
        data: [...holdingsStore],
        message:
          "Portfolio rebalance scenario modeled. Drift minimized across assets.",
      }
    },
  },

  // --- Audit Evidence Verification ---
  audits: {
    async getEvidence(): Promise<ServiceResponse<MockEvidenceItem[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...evidenceStore],
        message: "Evidence queue loaded.",
      }
    },
    async verifyItem(id: string): Promise<ServiceResponse<MockEvidenceItem>> {
      await simulateNetwork(400)
      const item = evidenceStore.find((e) => e.id === id)
      if (!item)
        return { success: false, message: "Evidence record not found." }
      item.hashStatus = "SHA-256 Validated"
      item.status = "Partner Verified"
      return {
        success: true,
        data: item,
        message: `Evidence "${item.title}" SHA-256 seal cryptographically attested.`,
      }
    },
  },

  // --- Super Admin User Directory ---
  admin: {
    async getUsers(): Promise<ServiceResponse<MockAdminUser[]>> {
      await simulateNetwork(200)
      return {
        success: true,
        data: [...adminUsersStore],
        message: "Users directory loaded.",
      }
    },
    async updateUserStatus(
      userId: string,
      status: MockAdminUser["status"],
    ): Promise<ServiceResponse<MockAdminUser>> {
      await simulateNetwork(350)
      const user = adminUsersStore.find((u) => u.id === userId)
      if (!user) return { success: false, message: "User not found." }
      user.status = status
      return {
        success: true,
        data: user,
        message: `Account status for ${user.email} changed to "${status}".`,
      }
    },
  },

  // --- Client-side File Export Generator ---
  export: {
    formatCsv(headers: string[], rows: (string | number)[][]): string {
      return [
        headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
        ...rows.map((row) =>
          row
            .map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`)
            .join(","),
        ),
      ].join("\r\n")
    },
    exportToCsv(
      filename: string,
      headers: string[],
      rows: (string | number)[][],
    ): boolean {
      try {
        const csvContent = this.formatCsv(headers, rows)

        if (typeof window === "undefined" || typeof document === "undefined") {
          return csvContent.length > 0
        }

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute(
          "download",
          `${filename}_${new Date().toISOString().slice(0, 10)}.csv`,
        )
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        return true
      } catch (e) {
        console.error("CSV Export failed:", e)
        return false
      }
    },
  },
}
