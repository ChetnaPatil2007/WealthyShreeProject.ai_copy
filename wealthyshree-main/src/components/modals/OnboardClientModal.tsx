import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"
import type { MockClient } from "../../services/mockData"

export interface OnboardClientModalProps {
  isOpen: boolean
  onClose: () => void
  onClientCreated?: (client: MockClient) => void
}

export function OnboardClientModal({
  isOpen,
  onClose,
  onClientCreated,
}: OnboardClientModalProps) {
  const { showToast } = useToast()
  const [name, setName] = useState("")
  const [tier, setTier] = useState<MockClient["tier"]>("Private Wealth")
  const [aum, setAum] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [planStatus, setPlanStatus] =
    useState<MockClient["planStatus"]>("Draft Proposal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Household or client name is required."
    else if (name.trim().length < 3)
      errs.name = "Name must be at least 3 characters."

    const aumNum = parseFloat(aum.replace(/[^0-9.]/g, ""))
    if (!aum.trim() || isNaN(aumNum) || aumNum <= 0) {
      errs.aum = "Enter a valid initial AUM value."
    }

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      errs.email = "A valid contact email address is required."
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    const aumNum = parseFloat(aum.replace(/[^0-9.]/g, ""))

    const res = await apiService.clients.create({
      name: name.trim(),
      tier,
      aum: aumNum,
      planStatus,
      email: email.trim(),
      phone: phone.trim() || "+1 (555) 000-0000",
    })

    setIsSubmitting(false)

    if (res.success && res.data) {
      showToast({
        title: "Client Household Onboarded",
        message: `${res.data.name} added with initial mandate of $${res.data.aum.toLocaleString()}.`,
        tone: "success",
      })
      if (onClientCreated) onClientCreated(res.data)
      onClose()
    } else {
      showToast({
        title: "Onboarding Error",
        message: res.error || "Unable to onboard client.",
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
            <span className="modal-eyebrow">PRACTICE EXPANSION</span>
            <h3 className="modal-title">Onboard Client Household</h3>
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
            <label htmlFor="client-name" className="form-label">
              Household or Institutional Name <span className="req">*</span>
            </label>
            <input
              id="client-name"
              type="text"
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="e.g. Montgomery Family Dynasty Trust"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: "" })
              }}
              disabled={isSubmitting}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="client-tier" className="form-label">
                Client Service Tier <span className="req">*</span>
              </label>
              <select
                id="client-tier"
                className="form-select"
                value={tier}
                onChange={(e) => setTier(e.target.value as MockClient["tier"])}
                disabled={isSubmitting}
              >
                <option value="Ultra HNW">Ultra HNW ($25M+)</option>
                <option value="Private Wealth">
                  Private Wealth ($10M - $25M)
                </option>
                <option value="Premier Client">
                  Premier Client ($2M - $10M)
                </option>
                <option value="Family Trust">Family Trust & Foundation</option>
                <option value="Corporate Entity">
                  Corporate Entity & Syndicate
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="client-aum" className="form-label">
                Initial Portfolio AUM ($) <span className="req">*</span>
              </label>
              <input
                id="client-aum"
                type="text"
                className={`form-input ${errors.aum ? "input-error" : ""}`}
                placeholder="e.g. 15,000,000"
                value={aum}
                onChange={(e) => {
                  setAum(e.target.value)
                  if (errors.aum) setErrors({ ...errors, aum: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.aum && <span className="form-error">{errors.aum}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="client-email" className="form-label">
                Primary Contact Email <span className="req">*</span>
              </label>
              <input
                id="client-email"
                type="email"
                className={`form-input ${errors.email ? "input-error" : ""}`}
                placeholder="e.g. trustee@montgomery.org"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="client-phone" className="form-label">
                Contact Phone
              </label>
              <input
                id="client-phone"
                type="tel"
                className="form-input"
                placeholder="e.g. +1 (212) 555-0182"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="client-plan-status" className="form-label">
              Initial Plan Status
            </label>
            <select
              id="client-plan-status"
              className="form-select"
              value={planStatus}
              onChange={(e) =>
                setPlanStatus(e.target.value as MockClient["planStatus"])
              }
              disabled={isSubmitting}
            >
              <option value="Draft Proposal">Draft Investment Proposal</option>
              <option value="Onboarding">KYC & Escrow Onboarding</option>
              <option value="Active Fiduciary Plan">
                Active Fiduciary Plan
              </option>
            </select>
          </div>

          <div className="modal-info-callout">
            <Icon name="shield" size={14} />
            <span>
              Simulated Client Onboarding: Prepares mandate, benchmark profiles,
              and risk questionnaire. No real custodial accounts are opened.
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
                  <span className="spinner-dot" /> Onboarding...
                </>
              ) : (
                <>
                  <Icon name="plus" size={14} /> Complete Onboarding
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
