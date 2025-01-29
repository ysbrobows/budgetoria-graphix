import React from 'react';
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenses } from '@/hooks/useExpenses';

const Dashboard = () => {
  const { expenses } = useExpenses();

  // Agrupa as despesas por categoria e soma os valores
  const categoryTotals = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);

  // Converte os totais para o formato esperado pelo gráfico
  const pieData = Object.entries(categoryTotals).map(([category, value]) => {
    const categoryColor = {
      'Alimentação': '#FF719A',
      'Transporte': '#0EA5E9',
      'Lazer': '#9b87f5',
      'Moradia': '#FFA99F',
    }[category] || '#888888'; // Cor padrão para categorias não mapeadas

    return {
      name: category,
      value,
      color: categoryColor,
    };
  });

  // Agrupa as despesas por mês
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Converte os dados mensais para o formato do gráfico
  const barData = Object.entries(monthlyData).map(([monthYear, value]) => ({
    name: monthYear,
    value,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Gastos por Categoria</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Evolução Mensal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Bar dataKey="value" fill="#9b87f5" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;