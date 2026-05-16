'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getAccountById } from '../../../services/accounts/accountService'
import { getTransactionsByAccount } from '../../../services/transactions/transactionService'
import { Account, Transaction } from '../../../types/models'
import Table from '../../../components/ui/Table'

export default function AccountDetail(){
  const params = useParams() as { id: string }
  const [account, setAccount] = useState<Account | null>(null)
  const [tx, setTx] = useState<Transaction[]>([])

  useEffect(()=>{
    if(!params?.id) return
    getAccountById(params.id).then(setAccount).catch(()=>{})
    getTransactionsByAccount(params.id).then(setTx).catch(()=>{})
  }, [params?.id])

  return (
    <div>
      <h1 className="text-2xl font-bold">Cuenta {account?.accountNumber}</h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div><strong>Saldo:</strong> {account?.balance}</div>
          <div><strong>Moneda:</strong> {account?.currency}</div>
          <div><strong>Estado:</strong> {account?.status}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Últimas transacciones</h3>
          <Table data={tx} columns={[{key:'transactionType', label:'Tipo'},{key:'amount',label:'Monto'},{key:'createdAt',label:'Fecha'}]} />
        </div>
      </div>
    </div>
  )
}
