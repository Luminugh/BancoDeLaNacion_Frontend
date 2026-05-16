'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getLoanById } from '../../../services/loans/loanService'
import { Loan } from '../../../types/models'

export default function LoanDetail(){
  const params = useParams() as { id: string }
  const [loan, setLoan] = useState<Loan | null>(null)

  useEffect(()=>{ if(params?.id) getLoanById(params.id).then(setLoan).catch(()=>{}) }, [params?.id])

  if(!loan) return <div>Cargando...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Préstamo {loan.loanNumber}</h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div><strong>Monto:</strong> {loan.amount}</div>
          <div><strong>Interés:</strong> {loan.interestRate}%</div>
          <div><strong>Saldo restante:</strong> {loan.remainingBalance}</div>
          <div><strong>Estado:</strong> {loan.status}</div>
        </div>
      </div>
    </div>
  )
}
