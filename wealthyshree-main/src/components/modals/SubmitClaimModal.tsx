import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"
import type { MockInsuranceClaim } from "../../services/mockData"

export interface SubmitClaimModalProps {
  isOpen: boolean
  onClose: () => void
  onClaimSubmitted?: (claim: MockInsuranceClaim) => void
}

export function SubmitClaimModal({
  isOpen,
  onClose,
  onClaimSubmitted,
}: SubmitClaimModalProps) {
  const { showToast } = useToast()
  const [client, setClient] = useState("")
  const [policyType, setPolicyType] = useState("Comprehensive Health")
  const [amount, setAmount] = useState("")
  const [adjuster, setAdjuster] = useState("Zurich Syndicate Lead")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!client.trim())
      errs.client = "Insured entity / client name is required."

    const amt = parseFloat(amount.replace(/[^0-9.]/g, ""))
    if (!amount.trim() || isNaN(amt) || amt <= 0) {
      errs.amount = "Enter a valid claim amount greater than $0."
    }

    if (!description.trim() || description.trim().length < 10) {
      errs.description = "Provide an incident summary (at least 10 characters)."
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    const amt = parseFloat(amount.replace(/[^0-9.]/g, ""))

    const res = await apiService.insurance.submitClaim({
      client: client.trim(),
      policyType,
      amount: amt,
      adjuster,
    })

    setIsSubmitting(false)

    if (res.success && res.data) {
      showToast({
        title: "Claim Registered",
        message: `${res.data.claimNumber} ($${res.data.amount.toLocaleString()}) logged. Adjuster assigned.`,
        tone: "success",
      })
      if (onClaimSubmitted) onClaimSubmitted(res.data)
      onClose()
    } else {
      showToast({
        title: "Claim Submission Failed",
        message: res.error || "Unable to register claim.",
        tone: "danger",
      })
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-eyebrow">CLAIMS DISPATCH & COVERAGE</span>
            <h3 className="modal-title">Register Insurance Claim</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="claim-client" className="form-label">
              Insured Client or Entity <span className="req">*</span>
            </label>
            <input
              id="claim-client"
              type="text"
              className={`form-input ${errors.client ? "input-error" : ""}`}
              placeholder="e.g. Morgan Family Household or Apex Global"
              value={client}
              onChange={(e) => {
                setClient(e.target.value)
                if (errors.client) setErrors({ ...errors, client: "" })
              }}
              disabled={isSubmitting}
            />
            {errors.client && (
              <span className="form-error">{errors.client}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="claim-policy-type" className="form-label">
                Policy Type
              </label>
              <select
                id="claim-policy-type"
                className="form-select"
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="Comprehensive Health">
                  Comprehensive Health
                </option>
                <option value="Executive Term Life">Executive Term Life</option>
                <option value="Property Umbrella">
                  Property & Real Estate Umbrella
                </option>
                <option value="Commercial Liability">
                  Commercial Liability
                </option>
                <option value="Cyber Security">Enterprise Cyber Breach</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="claim-amount" className="form-label">
                Claim Amount ($) <span className="req">*</span>
              </label>
              <input
                id="claim-amount"
                type="text"
                className={`form-input ${errors.amount ? "input-error" : ""}`}
                placeholder="e.g. 24,500"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (errors.amount) setErrors({ ...errors, amount: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.amount && (
                <span className="form-error">{errors.amount}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="claim-adjuster" className="form-label">
              Assigned Claims Syndicate / Adjuster
            </label>
            <select
              id="claim-adjuster"
              className="form-select"
              value={adjuster}
              onChange={(e) => setAdjuster(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="Zurich Syndicate Lead">
                Zurich Syndicate Lead
              </option>
              <option value="Chubb Executive Lines">
                Chubb Executive Lines
              </option>
              <option value="AIG Global Commercial">
                AIG Global Commercial
              </option>
              <option value="Lloyds of London Syndicate">
                Lloyds of London Syndicate
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="claim-desc" className="form-label">
              Incident Summary & Proof of Loss <span className="req">*</span>
            </label>
            <textarea
              id="claim-desc"
              className={`form-textarea ${
                errors.description ? "input-error" : ""
              }`}
              rows={3}
              placeholder="e.g. Water damage to coastal property library following severe storm surge. Initial contractor estimate attached."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                if (errors.description)
                  setErrors({ ...errors, description: "" })
              }}
              disabled={isSubmitting}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          <div className="modal-info-callout">
            <Icon name="insurance" size={14} />
            <span>
              Simulated Claims Intake: Generates an internal claim tracking
              docket. Underwriting payout authorizations require adjuster
              verification.
            </span>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-dot" /> Submitting...
                </>
              ) : (
                <>
                  <Icon name="check" size={14} /> File Claim
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
