'use client'
import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../services/transactions/transactionService'
import { Transaction } from '../../types/models'
import Table from '../../components/ui/Table'

export default function TransactionsPage(){
  const [tx, setTx] = useState<Transaction[]>([])
  useEffect(()=>{ getTransactions().then(setTx).catch(()=>{}) }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold">Transacciones</h1>
      <div className="mt-4">
        <Table
          data={tx}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'transactionType', label: 'Tipo' },
            { key: 'amount', label: 'Monto' },
            { key: 'accountId', label: 'Cuenta' },
            { key: 'createdAt', label: 'Fecha' },
          ]}
        />
      </div>
    </div>
  )
}
