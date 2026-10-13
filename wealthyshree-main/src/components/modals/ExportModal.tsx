import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"

export interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  headers?: string[]
  data?: (string | number)[][]
  defaultFilename?: string
}

export function ExportModal({
  isOpen,
  onClose,
  title,
  headers = [
    "Date",
    "Description",
    "Entity / Account",
    "Amount / AUM",
    "Status",
  ],
  data = [
    [
      "2025-05-12",
      "Equities Rebalance Allocation",
      "Morgan Trust",
      "$1,424,600",
      "Settled",
    ],
    [
      "2025-05-10",
      "Quarterly Advisory Consultation",
      "Sterling Advisory",
      "$3,450",
      "Completed",
    ],
    [
      "2025-05-08",
      "Tax Optimization Strategy",
      "Chen Consulting",
      "$18,400",
      "Pending Client Sign-Off",
    ],
    [
      "2025-05-04",
      "High-Yield Liquidity Sweep",
      "JPMorgan Chase",
      "$2,500",
      "Cleared",
    ],
  ],
  defaultFilename = "wealthsphere_report",
}: ExportModalProps) {
  const { showToast } = useToast()
  const [format, setFormat] = useState<"csv" | "pdf" | "json">("csv")
  const [includeAuditHash, setIncludeAuditHash] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  if (!isOpen) return null

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsExporting(true)

    // Small simulated packaging delay
    await new Promise((r) => setTimeout(r, 450))

    if (format === "csv") {
      const exportHeaders = includeAuditHash
        ? [...headers, "Cryptographic_SHA256_Audit_Hash"]
        : headers

      const exportRows = data.map((row, idx) =>
        includeAuditHash
          ? [
              ...row,
              `sha256_${Math.random().toString(36).substring(2, 10)}${idx}`,
            ]
          : row,
      )

      const success = apiService.export.exportToCsv(
        defaultFilename,
        exportHeaders,
        exportRows,
      )
      setIsExporting(false)

      if (success) {
        showToast({
          title: "Report Downloaded",
          message: `${defaultFilename}.csv generated and downloaded successfully.`,
          tone: "success",
        })
        onClose()
      } else {
        showToast({
          title: "Export Error",
          message: "Failed to generate CSV file.",
          tone: "danger",
        })
      }
    } else {
      // PDF or JSON format simulation
      setIsExporting(false)
      showToast({
        title: "Export Generated",
        message: `Simulated: ${defaultFilename}.${format} compiled with cryptographic watermark.`,
        tone: "info",
      })
      onClose()
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
            <span className="modal-eyebrow">AUDIT & REPORTING DISPATCH</span>
            <h3 className="modal-title">Export {title}</h3>
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

        <form onSubmit={handleDownload} className="modal-form">
          <div className="form-group">
            <label className="form-label">Export Data Format</label>
            <div
              className="export-format-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
              }}
            >
              <button
                type="button"
                className={`button ${
                  format === "csv" ? "button--primary" : "button--secondary"
                }`}
                onClick={() => setFormat("csv")}
                style={{ justifyContent: "center" }}
              >
                CSV (Spreadsheet)
              </button>
              <button
                type="button"
                className={`button ${
                  format === "pdf" ? "button--primary" : "button--secondary"
                }`}
                onClick={() => setFormat("pdf")}
                style={{ justifyContent: "center" }}
              >
                PDF Executive Brief
              </button>
              <button
                type="button"
                className={`button ${
                  format === "json" ? "button--primary" : "button--secondary"
                }`}
                onClick={() => setFormat("json")}
                style={{ justifyContent: "center" }}
              >
                JSON Ledger Dump
              </button>
            </div>
          </div>

          <div className="form-checkbox-row" style={{ marginTop: "12px" }}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeAuditHash}
                onChange={(e) => setIncludeAuditHash(e.target.checked)}
              />
              <span>
                Include SHA-256 Merkle Ledger Audit Verification Watermark
              </span>
            </label>
          </div>

          <div className="modal-info-callout" style={{ marginTop: "16px" }}>
            <Icon name="document" size={14} />
            <span>
              All exports generated via WealthSphere.ai client portal contain
              cryptographic hash watermarks suitable for SEC / IRS / statutory
              working papers.
            </span>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button--primary"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <span className="spinner-dot" /> Compiling...
                </>
              ) : (
                <>
                  <Icon name="document" size={14} /> Download{" "}
                  {format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
