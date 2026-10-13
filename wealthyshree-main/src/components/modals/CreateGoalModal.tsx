import React, { useState } from "react"
import { Icon } from "../ui/Icon"
import { apiService } from "../../services/apiService"
import { useToast } from "../ui/Toast"
import type { MockGoal } from "../../services/mockData"

export interface CreateGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onGoalAdded?: (goal: MockGoal) => void
}

export function CreateGoalModal({
  isOpen,
  onClose,
  onGoalAdded,
}: CreateGoalModalProps) {
  const { showToast } = useToast()
  const [name, setName] = useState("")
  const [category, setCategory] = useState<MockGoal["category"]>("Retirement")
  const [targetAmount, setTargetAmount] = useState("")
  const [initialAmount, setInitialAmount] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Goal name is required."
    else if (name.trim().length < 3)
      errs.name = "Goal name must be at least 3 characters."

    const tgt = parseFloat(targetAmount.replace(/[^0-9.]/g, ""))
    if (!targetAmount.trim() || isNaN(tgt) || tgt <= 0) {
      errs.targetAmount = "Please enter a valid target amount greater than $0."
    }

    if (!targetDate) {
      errs.targetDate = "Target completion date is required."
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    const tgt = parseFloat(targetAmount.replace(/[^0-9.]/g, ""))
    const init = initialAmount
      ? parseFloat(initialAmount.replace(/[^0-9.]/g, ""))
      : 0

    const res = await apiService.goals.create({
      name: name.trim(),
      category,
      targetAmount: tgt,
      initialAmount: isNaN(init) ? 0 : init,
      targetDate,
    })

    setIsSubmitting(false)

    if (res.success && res.data) {
      showToast({
        title: "Goal Established",
        message: `${res.data.name} (Target: $${res.data.targetAmount.toLocaleString()}) added to your roadmap.`,
        tone: "success",
      })
      if (onGoalAdded) onGoalAdded(res.data)
      onClose()
    } else {
      showToast({
        title: "Failed to Create Goal",
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
            <span className="modal-eyebrow">MILESTONE ROADMAP</span>
            <h3 className="modal-title">Establish Financial Goal</h3>
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
            <label htmlFor="goal-name" className="form-label">
              Goal Objective <span className="req">*</span>
            </label>
            <input
              id="goal-name"
              type="text"
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="e.g. Next-Gen Family Trust Funding"
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
              <label htmlFor="goal-category" className="form-label">
                Category <span className="req">*</span>
              </label>
              <select
                id="goal-category"
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as MockGoal["category"])
                }
                disabled={isSubmitting}
              >
                <option value="Retirement">
                  Retirement & Financial Independence
                </option>
                <option value="Real Estate">Real Estate & Property</option>
                <option value="Education">Education & Tuition Trust</option>
                <option value="Emergency">Emergency Reserve Buffer</option>
                <option value="Venture">Angel Venture & Startup Capital</option>
                <option value="Legacy">Multi-Gen Dynasty Legacy</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="goal-target" className="form-label">
                Target Amount ($) <span className="req">*</span>
              </label>
              <input
                id="goal-target"
                type="text"
                className={`form-input ${
                  errors.targetAmount ? "input-error" : ""
                }`}
                placeholder="e.g. 1,000,000"
                value={targetAmount}
                onChange={(e) => {
                  setTargetAmount(e.target.value)
                  if (errors.targetAmount)
                    setErrors({ ...errors, targetAmount: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.targetAmount && (
                <span className="form-error">{errors.targetAmount}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="goal-initial" className="form-label">
                Initial Seeded Amount ($)
              </label>
              <input
                id="goal-initial"
                type="text"
                className="form-input"
                placeholder="e.g. 50,000 (optional)"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal-date" className="form-label">
                Target Target Date <span className="req">*</span>
              </label>
              <input
                id="goal-date"
                type="date"
                className={`form-input ${
                  errors.targetDate ? "input-error" : ""
                }`}
                value={targetDate}
                onChange={(e) => {
                  setTargetDate(e.target.value)
                  if (errors.targetDate)
                    setErrors({ ...errors, targetDate: "" })
                }}
                disabled={isSubmitting}
              />
              {errors.targetDate && (
                <span className="form-error">{errors.targetDate}</span>
              )}
            </div>
          </div>

          <div className="modal-info-callout">
            <Icon name="ai" size={14} />
            <span>
              Sphere AI Monte Carlo Engine will monitor progress monthly and
              optimize tax-sheltered savings trajectories.
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
                  <span className="spinner-dot" /> Creating Goal...
                </>
              ) : (
                <>
                  <Icon name="goal" size={14} /> Create Goal
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
