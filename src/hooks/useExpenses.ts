import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

const STORAGE_KEY = "expenses";

const getStoredExpenses = (): Expense[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredExpenses = (expenses: Expense[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const useExpenses = () => {
  const queryClient = useQueryClient();

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: getStoredExpenses,
  });

  const addExpense = useMutation({
    mutationFn: async (newExpense: Omit<Expense, "id" | "date">) => {
      const expense: Expense = {
        ...newExpense,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };
      
      const updatedExpenses = [expense, ...getStoredExpenses()];
      setStoredExpenses(updatedExpenses);
      return Promise.resolve(expense);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return {
    expenses,
    addExpense,
  };
};