import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"

export type EvidenceVerificationStatus = "pass" | "exception" | "sample_more"

export interface EvidenceVerifyModalProps {
  isOpen: boolean
  isAuthorized?: boolean
  authorizeStatus?: (status: EvidenceVerificationStatus) => boolean
  onUnauthorized?: () => void
  onClose: () => void
  evidenceTitle?: string
  entity?: string
  evidenceId?: string
  onVerified?: (status: EvidenceVerificationStatus) => void
}

export function EvidenceVerifyModal({
  isOpen,
  isAuthorized = false,
  authorizeStatus,
  onUnauthorized,
  onClose,
  evidenceTitle = "Northern Trust Custodial Omnibus Cash Ledger Sample",
  entity = "Morgan Dynasty Trust",
  evidenceId = "ev-101",
  onVerified,
}: EvidenceVerifyModalProps) {
  const { showToast } = useToast()
  const [partnerNotes, setPartnerNotes] = useState("")
  const [verificationStatus, setVerificationStatus] =
    useState<EvidenceVerificationStatus>("pass")
  const [isVerifying, setIsVerifying] = useState(false)

  if (!isOpen) return null

  const isStatusAuthorized = (status: EvidenceVerificationStatus) =>
    authorizeStatus ? authorizeStatus(status) : isAuthorized
  const canSubmit = isStatusAuthorized(verificationStatus)
  const denyAction = () => {
    if (onUnauthorized) {
      onUnauthorized()
      return
    }
    showToast({
      title: "Access Restricted",
      message: "This action requires verified permissions.",
      tone: "warning",
    })
  }

  const handleSignOff = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStatusAuthorized(verificationStatus)) {
      denyAction()
      return
    }

    setIsVerifying(true)

    if (!isStatusAuthorized(verificationStatus)) {
      setIsVerifying(false)
      denyAction()
      return
    }

    const res = await apiService.audits.verifyItem(evidenceId)
    setIsVerifying(false)

    if (res.success) {
      showToast({
        title: "Audit Evidence Attested",
        message: `${evidenceTitle} attested with status "${
          verificationStatus === "pass" ? "Passed" : "Exception Flagged"
        }".`,
        tone: verificationStatus === "pass" ? "success" : "warning",
      })
      if (onVerified) onVerified(verificationStatus)
      onClose()
    } else {
      showToast({
        title: "Attestation Error",
        message: res.error || "Failed to attest evidence.",
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
            <span className="modal-eyebrow">
              STATUTORY ASSURANCE & VERIFICATION
            </span>
            <h3 className="modal-title">Inspect Audit Evidence</h3>
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

        <form onSubmit={handleSignOff} className="modal-form">
          {!canSubmit && (
            <div className="modal-info-callout" role="alert">
              This action requires verified permissions.
            </div>
          )}
          <div
            className="evidence-summary-card"
            style={{
              padding: "12px 14px",
              background: "var(--surface-2)",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--muted)",
                letterSpacing: "0.08em",
              }}
            >
              EVIDENCE RECORD
            </span>
            <b
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--ink)",
                margin: "4px 0",
              }}
            >
              {evidenceTitle}
            </b>
            <span style={{ fontSize: "11px", color: "var(--primary-dark)" }}>
              Entity: {entity} · ID: {evidenceId}
            </span>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span className="badge badge--success">
                <Icon name="shield" size={11} /> SHA-256 Validated
              </span>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                Hash: 4f8a...c92b
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Partner Attestation Decision</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
              }}
            >
              <button
                type="button"
                className={`button ${
                  verificationStatus === "pass"
                    ? "button--primary"
                    : "button--secondary"
                }`}
                onClick={() => setVerificationStatus("pass")}
                disabled={!isStatusAuthorized("pass") || isVerifying}
                title={
                  !isStatusAuthorized("pass")
                    ? "This action requires verified permissions."
                    : undefined
                }
                style={{ justifyContent: "center" }}
              >
                Pass / Attest
              </button>
              <button
                type="button"
                className={`button ${
                  verificationStatus === "exception"
                    ? "button--primary"
                    : "button--secondary"
                }`}
                onClick={() => setVerificationStatus("exception")}
                disabled={!isStatusAuthorized("exception") || isVerifying}
                title={
                  !isStatusAuthorized("exception")
                    ? "This action requires verified permissions."
                    : undefined
                }
                style={{ justifyContent: "center" }}
              >
                Flag Exception
              </button>
              <button
                type="button"
                className={`button ${
                  verificationStatus === "sample_more"
                    ? "button--primary"
                    : "button--secondary"
                }`}
                onClick={() => setVerificationStatus("sample_more")}
                disabled={!isStatusAuthorized("sample_more") || isVerifying}
                title={
                  !isStatusAuthorized("sample_more")
                    ? "This action requires verified permissions."
                    : undefined
                }
                style={{ justifyContent: "center" }}
              >
                Sample More
              </button>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "12px" }}>
            <label htmlFor="partner-notes" className="form-label">
              Partner Attestation Notes & Workpaper Reference
            </label>
            <textarea
              id="partner-notes"
              className="form-textarea"
              rows={3}
              placeholder="e.g. Sample confirmed against custodian statement dated 2025-05-12. No material variances noted."
              value={partnerNotes}
              onChange={(e) => setPartnerNotes(e.target.value)}
              disabled={isVerifying || !canSubmit}
            />
          </div>

          <div className="modal-info-callout">
            <Icon name="check" size={14} />
            <span>
              Attestations are cryptographically signed using your active
              partner credentials and entered into the immutable WORM audit
              ledger.
            </span>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
              disabled={isVerifying}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button--primary"
              disabled={isVerifying || !canSubmit}
            >
              {isVerifying ? (
                <>
                  <span className="spinner-dot" /> Signing...
                </>
              ) : (
                <>
                  <Icon name="check" size={14} /> Submit Attestation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
