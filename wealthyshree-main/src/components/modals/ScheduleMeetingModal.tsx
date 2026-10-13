import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"
import type { MockMeeting } from "../../services/mockData"

export interface ScheduleMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  initialClient?: string
  onMeetingScheduled?: (meeting: MockMeeting) => void
}

export function ScheduleMeetingModal({
  isOpen,
  onClose,
  initialClient = "",
  onMeetingScheduled,
}: ScheduleMeetingModalProps) {
  const { showToast } = useToast()
  const [client, setClient] = useState(initialClient)
  const [type, setType] = useState(
    "Annual Fiduciary Review & Portfolio Rebalance",
  )
  const [date, setDate] = useState("Tomorrow")
  const [time, setTime] = useState("10:30 AM")
  const [mode, setMode] = useState<MockMeeting["mode"]>("Virtual Video Call")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!client.trim()) errs.client = "Client or household name is required."
    if (!date.trim()) errs.date = "Date is required."
    if (!time.trim()) errs.time = "Time is required."
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    const res = await apiService.meetings.schedule({
      client: client.trim(),
      type,
      date: date.trim(),
      time: time.trim(),
      mode,
      notes: notes.trim() || "Prepared agenda and portfolio stress tests.",
    })
    setIsSubmitting(false)

    if (res.success && res.data) {
      showToast({
        title: "Session Scheduled",
        message: `Consultation confirmed with ${res.data.client} on ${res.data.date} at ${res.data.time}.`,
        tone: "success",
      })
      if (onMeetingScheduled) onMeetingScheduled(res.data)
      onClose()
    } else {
      showToast({
        title: "Scheduling Failed",
        message: res.error || "Unable to confirm meeting.",
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
            <span className="modal-eyebrow">FIDUCIARY PRACTICE MANAGEMENT</span>
            <h3 className="modal-title">Schedule Client Consultation</h3>
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
            <label htmlFor="meeting-client" className="form-label">
              Client / Household Name <span className="req">*</span>
            </label>
            <input
              id="meeting-client"
              type="text"
              className={`form-input ${errors.client ? "input-error" : ""}`}
              placeholder="e.g. Harrison & Eleanor Vance"
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

          <div className="form-group">
            <label htmlFor="meeting-type" className="form-label">
              Session Agenda & Review Type
            </label>
            <select
              id="meeting-type"
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="Annual Fiduciary Review & Portfolio Rebalance">
                Annual Fiduciary Review & Portfolio Rebalance
              </option>
              <option value="Retirement Scenario & Inflation Shock Test">
                Retirement Scenario & Inflation Shock Test
              </option>
              <option value="Executive Stock Option Strategy & Tax Buffer">
                Executive Stock Option Strategy & Tax Buffer
              </option>
              <option value="Multi-Asset Rebalance Governance">
                Multi-Asset Rebalance Governance
              </option>
              <option value="Dynasty Estate Planning & Trust Review">
                Dynasty Estate Planning & Trust Review
              </option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="meeting-date" className="form-label">
                Date / Day <span className="req">*</span>
              </label>
              <input
                id="meeting-date"
                type="text"
                className={`form-input ${errors.date ? "input-error" : ""}`}
                placeholder="e.g. Today, Tomorrow, or 2025-06-15"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                  if (errors.date) setErrors({ ...errors, date: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="meeting-time" className="form-label">
                Time <span className="req">*</span>
              </label>
              <input
                id="meeting-time"
                type="text"
                className={`form-input ${errors.time ? "input-error" : ""}`}
                placeholder="e.g. 10:30 AM"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value)
                  if (errors.time) setErrors({ ...errors, time: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.time && <span className="form-error">{errors.time}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="meeting-mode" className="form-label">
              Conference Mode
            </label>
            <select
              id="meeting-mode"
              className="form-select"
              value={mode}
              onChange={(e) => setMode(e.target.value as MockMeeting["mode"])}
              disabled={isSubmitting}
            >
              <option value="Virtual Video Call">
                Virtual Video Call (Zoom / Teams)
              </option>
              <option value="Conference Suite">
                In-Person Advisory Conference Suite
              </option>
              <option value="Direct Phone">Encrypted Direct Phone Line</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="meeting-notes" className="form-label">
              Session Working Notes & Agenda Objectives
            </label>
            <textarea
              id="meeting-notes"
              className="form-textarea"
              rows={3}
              placeholder="e.g. Review updated estate trust, harvest year-to-date capital losses, and test cash reserve buffer."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
            />
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
                  <span className="spinner-dot" /> Scheduling...
                </>
              ) : (
                <>
                  <Icon name="calendar" size={14} /> Confirm Consultation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
