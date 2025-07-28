import type React from "react";
import "../../../assets/styles/DataTable.css";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  getRowKey?: (row: T, index: number) => string | number;
}

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  error = null,
  emptyMessage = "Aucune donnée disponible",
  className = "",
  onRowClick,
  getRowKey = (_, index) => index,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="datatable-loading">
        <div className="loading-spinner" />
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="datatable-error">
        <h3>Erreur de chargement</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="datatable-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const getValue = (row: T, key: string): unknown => {
    return key.includes(".")
      ? key
          .split(".")
          .reduce(
            (obj: unknown, k) => (obj as Record<string, unknown>)?.[k],
            row,
          )
      : row[key];
  };

  const handleRowClick = (row: T) => {
    onRowClick?.(row);
  };

  const handleRowKeyDown = (event: React.KeyboardEvent, row: T) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRowClick?.(row);
    }
  };

  return (
    <div className={`datatable-container ${className}`}>
      <div className="datatable-wrapper">
        <table className="datatable">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  style={{
                    width: column.width,
                    textAlign: column.align || "left",
                  }}
                  className="datatable-header"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={getRowKey(row, index)}
                className={`datatable-row ${onRowClick ? "datatable-row-clickable" : ""}`}
                onClick={() => handleRowClick(row)}
                onKeyDown={(event) => handleRowKeyDown(event, row)}
                tabIndex={onRowClick ? 0 : undefined}
                role={onRowClick ? "button" : undefined}
              >
                {columns.map((column) => {
                  const value = getValue(row, String(column.key));
                  return (
                    <td
                      key={String(column.key)}
                      style={{ textAlign: column.align || "left" }}
                      className="datatable-cell"
                    >
                      {column.render
                        ? column.render(value, row)
                        : String(value || "")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
