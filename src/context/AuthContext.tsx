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
  updateAccountBalance: (accountId: string, amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Datos de ejemplo
const mockUser: User = {
  id: '1',
  name: 'Carlos Andrés Méndez',
  email: 'carlos.mendez@email.com',
  cedula: '1723456789',
  phone: '+593 99 234 5678',
};

const mockAccounts: Account[] = [
  {
    id: '1',
    accountNumber: '2200123456',
    accountType: 'Ahorros',
    balance: 8542.75,
    currency: 'USD',
  },
  {
    id: '2',
    accountNumber: '2200654321',
    accountType: 'Corriente',
    balance: 12350.25,
    currency: 'USD',
  },
  {
    id: '3',
    accountNumber: '2200789012',
    accountType: 'Ahorros',
    balance: 3200.00,
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
    amount: -250.00,
    date: new Date('2025-12-05'),
    description: 'Transferencia a María López',
    status: 'Completada',
    from: '2200123456',
    to: '2200987654',
  },
  {
    id: '2',
    type: 'Pago',
    amount: -85.50,
    date: new Date('2025-12-04'),
    description: 'Pago CNT - Internet',
    status: 'Completada',
  },
  {
    id: '3',
    type: 'Depósito',
    amount: 1500.00,
    date: new Date('2025-12-03'),
    description: 'Depósito en efectivo',
    status: 'Completada',
  },
  {
    id: '4',
    type: 'Pago',
    amount: -125.30,
    date: new Date('2025-12-02'),
    description: 'Pago CNEL - Luz',
    status: 'Completada',
  },
  {
    id: '5',
    type: 'Transferencia',
    amount: -500.00,
    date: new Date('2025-12-01'),
    description: 'Transferencia a Carlos Ruiz',
    status: 'Completada',
    from: '2200654321',
    to: '2200111222',
  },
  {
    id: '6',
    type: 'Pago',
    amount: -45.75,
    date: new Date('2025-11-30'),
    description: 'Pago ETAPA - Agua',
    status: 'Completada',
  },
  {
    id: '7',
    type: 'Pago',
    amount: -35.00,
    date: new Date('2025-11-29'),
    description: 'Pago Claro - Móvil',
    status: 'Completada',
  },
  {
    id: '8',
    type: 'Retiro',
    amount: -200.00,
    date: new Date('2025-11-28'),
    description: 'Retiro en cajero',
    status: 'Completada',
  },
  {
    id: '9',
    type: 'Depósito',
    amount: 800.00,
    date: new Date('2025-11-27'),
    description: 'Depósito por transferencia',
    status: 'Completada',
  },
  {
    id: '10',
    type: 'Pago',
    amount: -95.20,
    date: new Date('2025-11-26'),
    description: 'Pago DirecTV',
    status: 'Completada',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [cards] = useState<CreditCard[]>(mockCards);
  const [loans] = useState<Loan[]>(mockLoans);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login - en producción esto se conectaría a un API
    // Para el prototipo, cualquier email y contraseña válidos funcionan
    if (email && password && email.length > 0 && password.length > 0) {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 800));
      setUser(mockUser);
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

  const updateAccountBalance = (accountId: string, amount: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId
          ? { ...account, balance: account.balance + amount }
          : account
      )
    );
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
        updateAccountBalance,
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

