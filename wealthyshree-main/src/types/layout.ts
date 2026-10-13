import type { IconName } from "./roles"

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "high" | "medium" | "low" | "success"
  category: "compliance" | "ai" | "financial" | "system"
  actionLabel?: string
  actionTarget?: string
}

export interface TableColumn<T> {
  key: string
  header: string
  align?: "left" | "center" | "right"
  width?: string
  render?: (row: T) => React.ReactNode
}

export interface TableProps<T> {
  title: string
  subtitle?: string
  columns: TableColumn<T>[]
  data: T[]
  emptyMessage?: string
  actionButton?: {
    label: string
    icon?: IconName
    onClick: () => void
  }
  searchable?: boolean
  searchPlaceholder?: string
}

export interface ChartPeriodOption {
  label: string
  value: string
}

export interface ChartLegendItem {
  label: string
  value: string
  color: string
  pct?: string
}
