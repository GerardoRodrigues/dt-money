import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
  id: number;
  description: string;
  price: number;
  type: "income" | "outcome";
  category: string;
  created_at: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  type: "income" | "outcome";
  category: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  loadTransactions: (query?: string) => Promise<void>;
  createNewTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "created_at",
        _order: "desc",
        type: query,
      },
    });

    setTransactions(response.data);
  }

  async function createNewTransaction(data: CreateTransactionInput) {
    const { category, description, price, type } = data;

    const response = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      created_at: new Date(),
    });

    setTransactions(state => [response.data, ...state])
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, loadTransactions, createNewTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
