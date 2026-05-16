'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createLoanApplication, getLoanApplications } from '../../services/loanApplications/loanApplicationService'
import { LoanApplication } from '../../types/models'
import Table from '../../components/ui/Table'

export default function LoanApplicationsPage(){
  const [apps, setApps] = useState<LoanApplication[]>([])
  const { register, handleSubmit, reset } = useForm<any>()
  useEffect(()=>{ getLoanApplications().then(setApps).catch(()=>{}) }, [])

  const onSubmit = async (data: any) => {
    try {
      await createLoanApplication(data)
      reset()
      const updated = await getLoanApplications()
      setApps(updated)
    } catch (e: any) {
      alert(e?.message || 'Error')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Solicitudes de Préstamo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 max-w-2xl grid gap-3 bg-white p-4 rounded shadow">
        <div><label className="block text-sm font-semibold">Monto solicitado</label><input {...register('requestedAmount')} className="w-full border rounded px-3 py-2" /></div>
        <div><label className="block text-sm font-semibold">Plazo (meses)</label><input {...register('termMonths')} className="w-full border rounded px-3 py-2" /></div>
        <div><label className="block text-sm font-semibold">Propósito</label><input {...register('purpose')} className="w-full border rounded px-3 py-2" /></div>
        <div><label className="block text-sm font-semibold">Ingreso mensual</label><input {...register('monthlyIncome')} className="w-full border rounded px-3 py-2" /></div>
        <div><label className="block text-sm font-semibold">User ID</label><input {...register('userId')} className="w-full border rounded px-3 py-2" /></div>
        <button type="submit" className="justify-self-start bg-red-600 text-white px-4 py-2 rounded">Enviar solicitud</button>
      </form>
      <div className="mt-4">
        <Table data={apps} columns={[{key:'id',label:'ID'},{key:'requestedAmount',label:'Monto'},{key:'termMonths',label:'Plazo'},{key:'status',label:'Estado'}]} />
      </div>
    </div>
  )
}
