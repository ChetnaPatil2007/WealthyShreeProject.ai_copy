import React, { createContext, useContext, useState, useCallback } from "react"
import { Icon } from "./Icon"

export type ToastTone = "success" | "warning" | "danger" | "info"

export interface ToastItem {
  id: string
  title: string
  message: string
  tone?: ToastTone
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, "id"> & { duration?: number }) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    ({
      title,
      message,
      tone = "success",
      duration = 4500,
    }: Omit<ToastItem, "id"> & { duration?: number }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      setToasts((prev) => [...prev, { id, title, message, tone }])

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id)
        }, duration)
      }
    },
    [dismissToast],
  )

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => {
          const iconName =
            toast.tone === "danger"
              ? "alert"
              : toast.tone === "warning"
                ? "alert"
                : toast.tone === "info"
                  ? "ai"
                  : "check"

          return (
            <div
              key={toast.id}
              className={`toast-banner toast--${toast.tone || "success"}`}
              role="alert"
            >
              <div className="toast-icon-wrap">
                <Icon name={iconName} size={16} />
              </div>
              <div className="toast-content">
                <strong className="toast-title">{toast.title}</strong>
                <p className="toast-message">{toast.message}</p>
              </div>
              <button
                type="button"
                className="toast-close-btn"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
