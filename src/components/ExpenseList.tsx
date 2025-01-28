import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import { useExpenses } from '@/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';

const ExpenseList = () => {
  const { toast } = useToast();
  const { expenses, editExpense, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingExpense, setEditingExpense] = React.useState<any>(null);
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setSelectedCategory(expense.category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (expenseId: string) => {
    try {
      await deleteExpense.mutateAsync(expenseId);
      toast({
        title: "Sucesso",
        description: "Despesa excluída com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir a despesa",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !selectedCategory) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      await editExpense.mutateAsync({
        ...editingExpense,
        description,
        amount: Number(amount),
        category: selectedCategory,
      });
      
      toast({
        title: "Sucesso",
        description: "Despesa atualizada com sucesso!",
      });
      
      setIsDialogOpen(false);
      setDescription('');
      setAmount('');
      setSelectedCategory('');
      setEditingExpense(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar a despesa",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Últimas Transações</h2>
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm group"
          >
            <div>
              <p className="font-medium">{expense.description}</p>
              <p className="text-sm text-gray-500">{expense.category}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-red-500">
                  R$ {expense.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(expense)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(expense.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Despesa</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Compras do mercado"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full">
              Salvar Alterações
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExpenseList;