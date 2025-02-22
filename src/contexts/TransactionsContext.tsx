import { createContext, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  price: number;
  type: "income" | "outcome";
  category: string;
  created_at: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  loadTransactions: (query?: string) => Promise<void>; 
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions(query?: string) {
    const url = new URL("http://localhost:3000/transactions")

    if(query) {
      url.searchParams.append("type", query);
    }

    const response = await fetch(url);
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, loadTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
