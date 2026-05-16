'use client'
import React from 'react'

export default function Button({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`bg-red-600 text-white px-4 py-2 rounded ${className}`}> {children} </button>
  )
}
