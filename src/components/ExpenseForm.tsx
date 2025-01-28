import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import type { Category } from './CategoryList';
import { useExpenses } from '@/hooks/useExpenses';

const ExpenseForm = () => {
  const { toast } = useToast();
  const { addExpense } = useExpenses();
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const categories: Category[] = [
    { id: '1', name: 'Alimentação', color: '#FF719A' },
    { id: '2', name: 'Transporte', color: '#0EA5E9' },
    { id: '3', name: 'Lazer', color: '#9b87f5' },
    { id: '4', name: 'Moradia', color: '#FFA99F' },
  ];

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

    const category = categories.find(c => c.id === selectedCategory)?.name || '';
    
    await addExpense.mutateAsync({
      description,
      amount: Number(amount),
      category,
    });
    
    toast({
      title: "Sucesso",
      description: "Despesa adicionada com sucesso!",
    });
    
    setDescription('');
    setAmount('');
    setSelectedCategory('');
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Adicionar Despesa</h2>
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
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="w-full">
          Adicionar Despesa
        </Button>
      </form>
    </Card>
  );
};

export default ExpenseForm;