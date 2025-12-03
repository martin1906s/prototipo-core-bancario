import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Account, Transaction, CreditCard, Loan } from '../types';

interface AuthContextType {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  cards: CreditCard[];
  loans: Loan[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addTransaction: (transaction: Transaction) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Datos de ejemplo
const mockUser: User = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  cedula: '1234567890',
  phone: '+593 99 123 4567',
};

const mockAccounts: Account[] = [
  {
    id: '1',
    accountNumber: '2200123456',
    accountType: 'Ahorros',
    balance: 5420.50,
    currency: 'USD',
  },
  {
    id: '2',
    accountNumber: '2200654321',
    accountType: 'Corriente',
    balance: 12350.75,
    currency: 'USD',
  },
];

const mockCards: CreditCard[] = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    cardType: 'Visa',
    expiryDate: '12/26',
    cvv: '***',
    availableCredit: 3500,
    creditLimit: 5000,
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    cardType: 'Mastercard',
    expiryDate: '08/27',
    cvv: '***',
    availableCredit: 8200,
    creditLimit: 10000,
  },
];

const mockLoans: Loan[] = [
  {
    id: '1',
    type: 'Vehicular',
    amount: 25000,
    remainingBalance: 18500,
    monthlyPayment: 520,
    interestRate: 9.5,
    nextPaymentDate: new Date('2025-12-15'),
  },
  {
    id: '2',
    type: 'Personal',
    amount: 8000,
    remainingBalance: 4200,
    monthlyPayment: 280,
    interestRate: 11.2,
    nextPaymentDate: new Date('2025-12-10'),
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Transferencia',
    amount: -150,
    date: new Date('2025-12-03'),
    description: 'Transferencia a María López',
    status: 'Completada',
    from: '2200123456',
    to: '2200987654',
  },
  {
    id: '2',
    type: 'Pago',
    amount: -45.50,
    date: new Date('2025-12-02'),
    description: 'Pago CNT',
    status: 'Completada',
  },
  {
    id: '3',
    type: 'Depósito',
    amount: 1000,
    date: new Date('2025-12-01'),
    description: 'Depósito en efectivo',
    status: 'Completada',
  },
  {
    id: '4',
    type: 'Pago',
    amount: -120.30,
    date: new Date('2025-11-30'),
    description: 'Pago Luz Eléctrica',
    status: 'Completada',
  },
  {
    id: '5',
    type: 'Transferencia',
    amount: -500,
    date: new Date('2025-11-28'),
    description: 'Transferencia a Carlos Ruiz',
    status: 'Completada',
    from: '2200654321',
    to: '2200111222',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts] = useState<Account[]>(mockAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [cards] = useState<CreditCard[]>(mockCards);
  const [loans] = useState<Loan[]>(mockLoans);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login - en producción esto se conectaría a un API
    if (email && password) {
      setTimeout(() => {
        setUser(mockUser);
      }, 500);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accounts,
        transactions,
        cards,
        loans,
        login,
        logout,
        addTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

