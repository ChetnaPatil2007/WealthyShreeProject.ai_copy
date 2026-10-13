import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"
import type { MockAsset } from "../../services/mockData"

export interface AddAssetModalProps {
  isOpen: boolean
  onClose: () => void
  onAssetAdded?: (asset: MockAsset) => void
}

export function AddAssetModal({
  isOpen,
  onClose,
  onAssetAdded,
}: AddAssetModalProps) {
  const { showToast } = useToast()
  const [name, setName] = useState("")
  const [category, setCategory] = useState<MockAsset["category"]>("Equities")
  const [institution, setInstitution] = useState("")
  const [valuation, setValuation] = useState("")
  const [isLiquid, setIsLiquid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Asset name is required."
    else if (name.trim().length < 3)
      errs.name = "Asset name must be at least 3 characters."

    const valNum = parseFloat(valuation.replace(/[^0-9.]/g, ""))
    if (!valuation.trim() || isNaN(valNum) || valNum <= 0) {
      errs.valuation = "Please enter a valid positive valuation."
    }

    if (!institution.trim()) {
      errs.institution = "Custodian or institution name is required."
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    const valNum = parseFloat(valuation.replace(/[^0-9.]/g, ""))

    const res = await apiService.assets.create({
      name: name.trim(),
      category,
      institution: institution.trim(),
      valuation: valNum,
      changeYtd: "+0.0%",
      isLiquid,
    })

    setIsSubmitting(false)

    if (res.success && res.data) {
      showToast({
        title: "Asset Connected",
        message: `${res.data.name} ($${res.data.valuation.toLocaleString()}) recorded in session balance sheet.`,
        tone: "success",
      })
      if (onAssetAdded) onAssetAdded(res.data)
      onClose()
    } else {
      showToast({
        title: "Failed to Add Asset",
        message: res.error || "An error occurred during submission.",
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
            <span className="modal-eyebrow">PORTFOLIO EXPANSION</span>
            <h3 className="modal-title">Connect New Asset</h3>
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
            <label htmlFor="asset-name" className="form-label">
              Asset or Holding Name <span className="req">*</span>
            </label>
            <input
              id="asset-name"
              type="text"
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="e.g. Fidelity High-Yield Index Fund"
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
              <label htmlFor="asset-category" className="form-label">
                Asset Class <span className="req">*</span>
              </label>
              <select
                id="asset-category"
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as MockAsset["category"])
                }
                disabled={isSubmitting}
              >
                <option value="Equities">Equities & ETFs</option>
                <option value="Real Estate">Real Estate & Property</option>
                <option value="Cash & HYSA">Cash, HYSA & Deposits</option>
                <option value="Fixed Income">Bonds & Fixed Income</option>
                <option value="Private Equity">Private Equity & Venture</option>
                <option value="Crypto">Digital Assets & Crypto</option>
                <option value="Alternative">
                  Precious Metals & Alternatives
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="asset-valuation" className="form-label">
                Estimated Valuation ($) <span className="req">*</span>
              </label>
              <input
                id="asset-valuation"
                type="text"
                className={`form-input ${
                  errors.valuation ? "input-error" : ""
                }`}
                placeholder="e.g. 250,000"
                value={valuation}
                onChange={(e) => {
                  setValuation(e.target.value)
                  if (errors.valuation) setErrors({ ...errors, valuation: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.valuation && (
                <span className="form-error">{errors.valuation}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="asset-institution" className="form-label">
              Holding Institution / Custodian <span className="req">*</span>
            </label>
            <input
              id="asset-institution"
              type="text"
              className={`form-input ${
                errors.institution ? "input-error" : ""
              }`}
              placeholder="e.g. Charles Schwab / Northern Trust"
              value={institution}
              onChange={(e) => {
                setInstitution(e.target.value)
                if (errors.institution)
                  setErrors({ ...errors, institution: "" })
              }}
              disabled={isSubmitting}
            />
            {errors.institution && (
              <span className="form-error">{errors.institution}</span>
            )}
          </div>

          <div className="form-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isLiquid}
                onChange={(e) => setIsLiquid(e.target.checked)}
                disabled={isSubmitting}
              />
              <span>
                Liquid Asset (accessible within 5 banking business days)
              </span>
            </label>
          </div>

          <div className="modal-info-callout">
            <Icon name="shield" size={14} />
            <span>
              Simulated Integration: Asset valuation updates your session net
              worth. No third-party Open Banking API is invoked in demo mode.
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
                  <span className="spinner-dot" /> Connecting...
                </>
              ) : (
                <>
                  <Icon name="plus" size={14} /> Add to Balance Sheet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
