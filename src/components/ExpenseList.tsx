import React from 'react';
import { Card } from "@/components/ui/card";

type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

const defaultExpenses: Expense[] = [
  {
    id: '1',
    description: 'Compras do mês',
    amount: 500,
    category: 'Alimentação',
    date: '2024-02-20',
  },
  {
    id: '2',
    description: 'Uber',
    amount: 30,
    category: 'Transporte',
    date: '2024-02-19',
  },
  {
    id: '3',
    description: 'Cinema',
    amount: 60,
    category: 'Lazer',
    date: '2024-02-18',
  },
];

const ExpenseList = () => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Últimas Transações</h2>
      <div className="space-y-4">
        {defaultExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div>
              <p className="font-medium">{expense.description}</p>
              <p className="text-sm text-gray-500">{expense.category}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-500">
                R$ {expense.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(expense.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpenseList;