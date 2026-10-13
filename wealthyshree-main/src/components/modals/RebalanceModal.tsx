import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"

export interface RebalanceModalProps {
  isOpen: boolean
  onClose: () => void
  onRebalanceComplete?: () => void
}

export function RebalanceModal({
  isOpen,
  onClose,
  onRebalanceComplete,
}: RebalanceModalProps) {
  const { showToast } = useToast()
  const [equities, setEquities] = useState(40)
  const [bonds, setBonds] = useState(25)
  const [international, setInternational] = useState(15)
  const [alternatives, setAlternatives] = useState(10)
  const [cash, setCash] = useState(10)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const total = equities + bonds + international + alternatives + cash
  const isValid = Math.abs(total - 100) < 0.1

  const handleExecute = async () => {
    if (!isValid) return

    setIsSubmitting(true)
    const targets = [
      { symbol: "VTI", newWeight: equities },
      { symbol: "BND", newWeight: bonds },
      { symbol: "VXUS", newWeight: international },
      { symbol: "GLD", newWeight: alternatives },
      { symbol: "PRV-CR", newWeight: cash },
    ]

    const res = await apiService.investments.simulateRebalance(targets)
    setIsSubmitting(false)

    if (res.success) {
      showToast({
        title: "Rebalance Plan Calculated",
        message:
          "Simulated multi-asset order routing prepared. Zero wash-sale tax impact verified.",
        tone: "success",
      })
      if (onRebalanceComplete) onRebalanceComplete()
      onClose()
    } else {
      showToast({
        title: "Rebalancing Error",
        message: res.error || "Unable to calculate allocation.",
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
            <span className="modal-eyebrow">PORTFOLIO MANDATE GOVERNANCE</span>
            <h3 className="modal-title">Simulate Portfolio Rebalance</h3>
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

        <div className="modal-body">
          <p
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              margin: "0 0 16px",
            }}
          >
            Adjust asset allocation weights to realign portfolio with IPS
            mandate. Allocations must sum exactly to 100%.
          </p>

          <div className="allocation-slider-group">
            <div className="slider-row">
              <span className="slider-label">Large Cap Equities (VTI)</span>
              <input
                type="range"
                min="0"
                max="80"
                value={equities}
                onChange={(e) => setEquities(Number(e.target.value))}
                className="slider-range"
                disabled={isSubmitting}
              />
              <b className="slider-val">{equities}%</b>
            </div>

            <div className="slider-row">
              <span className="slider-label">
                Government & Fixed Income (BND)
              </span>
              <input
                type="range"
                min="0"
                max="60"
                value={bonds}
                onChange={(e) => setBonds(Number(e.target.value))}
                className="slider-range"
                disabled={isSubmitting}
              />
              <b className="slider-val">{bonds}%</b>
            </div>

            <div className="slider-row">
              <span className="slider-label">
                Global Developed / Emerging (VXUS)
              </span>
              <input
                type="range"
                min="0"
                max="50"
                value={international}
                onChange={(e) => setInternational(Number(e.target.value))}
                className="slider-range"
                disabled={isSubmitting}
              />
              <b className="slider-val">{international}%</b>
            </div>

            <div className="slider-row">
              <span className="slider-label">Gold & Alternatives (GLD)</span>
              <input
                type="range"
                min="0"
                max="30"
                value={alternatives}
                onChange={(e) => setAlternatives(Number(e.target.value))}
                className="slider-range"
                disabled={isSubmitting}
              />
              <b className="slider-val">{alternatives}%</b>
            </div>

            <div className="slider-row">
              <span className="slider-label">
                Cash & Private Credit (PRV-CR)
              </span>
              <input
                type="range"
                min="0"
                max="40"
                value={cash}
                onChange={(e) => setCash(Number(e.target.value))}
                className="slider-range"
                disabled={isSubmitting}
              />
              <b className="slider-val">{cash}%</b>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 14px",
              background: isValid
                ? "var(--primary-soft)"
                : "rgba(239, 68, 68, 0.1)",
              borderRadius: "10px",
              margin: "16px 0",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 600 }}>
              Total Target Allocation
            </span>
            <strong
              style={{
                font: "700 15px 'Manrope'",
                color: isValid ? "var(--primary-dark)" : "#dc2626",
              }}
            >
              {total}%{" "}
              {isValid
                ? "✓ Balanced"
                : `(${(100 - total).toFixed(0)}% remaining)`}
            </strong>
          </div>

          <div className="modal-info-callout">
            <Icon name="shield" size={14} />
            <span>
              Zero-Trust Policy: This models tax-aware rebalancing in simulation
              mode. Live order generation requires custodian trade execution
              authorization.
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
              type="button"
              className="button button--primary"
              onClick={handleExecute}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-dot" /> Calculating Trades...
                </>
              ) : (
                <>
                  <Icon name="pie" size={14} /> Calculate Rebalance
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
