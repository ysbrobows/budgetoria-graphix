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
    mutationFn: async (newExpense: Omit<Expense, "id">) => {
      const expense: Expense = {
        ...newExpense,
        id: crypto.randomUUID(),
      };
      
      const updatedExpenses = [expense, ...getStoredExpenses()];
      setStoredExpenses(updatedExpenses);
      return Promise.resolve(expense);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const editExpense = useMutation({
    mutationFn: async (updatedExpense: Expense) => {
      const currentExpenses = getStoredExpenses();
      const updatedExpenses = currentExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      );
      setStoredExpenses(updatedExpenses);
      return Promise.resolve(updatedExpense);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (expenseId: string) => {
      const currentExpenses = getStoredExpenses();
      const updatedExpenses = currentExpenses.filter((expense) => expense.id !== expenseId);
      setStoredExpenses(updatedExpenses);
      return Promise.resolve(expenseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return {
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
  };
};