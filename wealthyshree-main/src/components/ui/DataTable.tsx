import { useState, useMemo } from "react"
import type { TableProps } from "../../types/layout"
import { Icon } from "./Icon"

export function DataTable<T extends Record<string, any>>({
  title,
  subtitle,
  columns,
  data,
  emptyMessage = "No records found.",
  actionButton,
  searchable = true,
  searchPlaceholder = "Search records…",
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data
    const term = searchTerm.toLowerCase()

    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key]
        if (val === null || val === undefined) return false
        return String(val).toLowerCase().includes(term)
      }),
    )
  }, [data, columns, searchTerm])

  return (
    <div className="card data-table-card">
      <div className="data-table-header">
        <div className="table-title-group">
          <h4 className="card-title">{title}</h4>
          {subtitle && <span className="card-sub">{subtitle}</span>}
        </div>

        <div className="table-toolbar">
          {searchable && (
            <div className="table-search">
              <Icon name="search" size={14} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>
          )}

          {actionButton && (
            <button
              type="button"
              className="button button--secondary button--sm"
              onClick={actionButton.onClick}
            >
              {actionButton.icon && <Icon name={actionButton.icon} size={14} />}
              <span>{actionButton.label}</span>
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="custom-data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    textAlign: col.align || "left",
                    width: col.width,
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{ textAlign: col.align || "left" }}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="table-empty">
                  <Icon name="search" size={24} />
                  <span>{emptyMessage}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="table-count">
          Showing <b>{filteredData.length}</b> of <b>{data.length}</b> records
        </span>
      </div>
    </div>
  )
}

export default DataTable
