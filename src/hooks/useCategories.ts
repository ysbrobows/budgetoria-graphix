import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Category } from "@/components/CategoryList";

const STORAGE_KEY = "categories";

const defaultCategories: Category[] = [
  { id: '1', name: 'Alimentação', color: '#FF719A' },
  { id: '2', name: 'Transporte', color: '#0EA5E9' },
  { id: '3', name: 'Lazer', color: '#9b87f5' },
  { id: '4', name: 'Moradia', color: '#FFA99F' },
];

const getStoredCategories = (): Category[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    setStoredCategories(defaultCategories);
    return defaultCategories;
  }
  return JSON.parse(stored);
};

const setStoredCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getStoredCategories,
  });

  const addCategory = useMutation({
    mutationFn: async (newCategory: Omit<Category, "id">) => {
      const category: Category = {
        ...newCategory,
        id: crypto.randomUUID(),
      };
      const updatedCategories = [...getStoredCategories(), category];
      setStoredCategories(updatedCategories);
      return Promise.resolve(category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const editCategory = useMutation({
    mutationFn: async (updatedCategory: Category) => {
      const currentCategories = getStoredCategories();
      const updatedCategories = currentCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      setStoredCategories(updatedCategories);
      return Promise.resolve(updatedCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (categoryId: string) => {
      const currentCategories = getStoredCategories();
      const updatedCategories = currentCategories.filter((category) => category.id !== categoryId);
      setStoredCategories(updatedCategories);
      return Promise.resolve(categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories,
    addCategory,
    editCategory,
    deleteCategory,
  };
};