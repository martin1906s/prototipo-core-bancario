// Tipos para el Core Bancario

export interface User {
  id: string;
  name: string;
  email: string;
  cedula: string;
  phone: string;
}

export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'Ahorros' | 'Corriente';
  balance: number;
  currency: 'USD';
}

export interface Transaction {
  id: string;
  type: 'Transferencia' | 'Pago' | 'Depósito' | 'Retiro';
  amount: number;
  date: Date;
  description: string;
  status: 'Completada' | 'Pendiente' | 'Fallida';
  from?: string;
  to?: string;
}

export interface CreditCard {
  id: string;
  cardNumber: string;
  cardType: 'Visa' | 'Mastercard';
  expiryDate: string;
  cvv: string;
  availableCredit: number;
  creditLimit: number;
}

export interface Service {
  id: string;
  name: string;
  category: 'Luz' | 'Agua' | 'Teléfono' | 'Internet' | 'TV' | 'Otros';
  icon: string;
  accountNumber?: string;
}

export interface Loan {
  id: string;
  type: 'Hipotecario' | 'Vehicular' | 'Personal' | 'Microcrédito';
  amount: number;
  remainingBalance: number;
  monthlyPayment: number;
  interestRate: number;
  nextPaymentDate: Date;
}

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Transfer: undefined;
  PayServices: undefined;
  TransactionHistory: undefined;
  Profile: undefined;
  CardDetails: { cardId: string };
  LoanDetails: { loanId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Cards: undefined;
  Loans: undefined;
  Services: undefined;
  More: undefined;
};

