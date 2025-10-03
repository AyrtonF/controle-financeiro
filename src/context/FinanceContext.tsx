import React, { createContext, useContext, useState, useEffect } from "react";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface FinanceContextData {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  removeTransaction: (id: string) => void;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
  getTransactionsByCategory: () => { [key: string]: number };
}

const FinanceContext = createContext<FinanceContextData | undefined>(undefined);

export const useFinance = (): FinanceContextData => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "income",
      amount: 5000,
      description: "Salário",
      category: "Trabalho",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      type: "expense",
      amount: 1200,
      description: "Aluguel",
      category: "Moradia",
      date: new Date().toISOString(),
    },
    {
      id: "3",
      type: "expense",
      amount: 300,
      description: "Supermercado",
      category: "Alimentação",
      date: new Date().toISOString(),
    },
  ]);

  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const getTotalIncome = (): number => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalExpenses = (): number => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getBalance = (): number => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getTransactionsByCategory = (): { [key: string]: number } => {
    const categorySums: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      if (categorySums[transaction.category]) {
        categorySums[transaction.category] += transaction.amount;
      } else {
        categorySums[transaction.category] = transaction.amount;
      }
    });

    return categorySums;
  };

  // Valores fornecidos pelo contexto
  const value: FinanceContextData = {
    transactions,
    addTransaction,
    removeTransaction,
    getTotalIncome,
    getTotalExpenses,
    getBalance,
    getTransactionsByCategory,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};
