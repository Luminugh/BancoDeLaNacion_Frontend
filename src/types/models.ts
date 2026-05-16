import { ApiResponse } from './api'

export interface User {
  id: string
  dni: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: 'CUSTOMER' | 'EVALUATOR' | 'COMMITTEE' | 'ADMIN'
  createdAt: string
}

export interface Account {
  id: string
  accountNumber: string
  balance: number
  currency: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  userId: string
  createdAt: string
}

export interface Transaction {
  id: string
  transactionType:
    | 'DEPOSIT'
    | 'WITHDRAWAL'
    | 'TRANSFER_SENT'
    | 'TRANSFER_RECEIVED'
    | 'LOAN_PAYMENT'
  amount: number
  description?: string
  accountId: string
  createdAt: string
}

export interface Transfer {
  id: string
  amount: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  senderAccountId: string
  receiverAccountId: string
  createdAt: string
}

export interface Loan {
  id: string
  loanNumber: string
  amount: number
  interestRate: number
  termMonths: number
  monthlyPayment: number
  remainingBalance: number
  status: 'ACTIVE' | 'COMPLETED' | 'LATE'
  disbursementDate?: string
  userId: string
  createdAt: string
}

export interface LoanApplication {
  id: string
  requestedAmount: number
  termMonths: number
  purpose: string
  monthlyIncome: number
  status: 'SUBMITTED' | 'EVALUATION' | 'APPROVED' | 'REJECTED' | 'DISBURSED'
  userId: string
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  profile: User
}
