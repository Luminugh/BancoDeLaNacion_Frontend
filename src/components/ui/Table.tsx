'use client'
import React from 'react'

type Props<T> = { data: T[]; columns: { key: string; label: string; render?: (row: any) => React.ReactNode }[] }

export default function Table<T>({ data, columns }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="text-left p-2 border-b font-semibold">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="p-2 border-b">
                  {c.render ? c.render(row) : String(row[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
