import React from 'react';
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Alimentação', value: 500, color: '#FF719A' },
  { name: 'Transporte', value: 300, color: '#0EA5E9' },
  { name: 'Lazer', value: 200, color: '#9b87f5' },
  { name: 'Moradia', value: 1000, color: '#FFA99F' },
];

const monthlyData = [
  { name: 'Jan', value: 1500 },
  { name: 'Fev', value: 2000 },
  { name: 'Mar', value: 1800 },
  { name: 'Abr', value: 1600 },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Gastos por Categoria</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Evolução Mensal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#9b87f5" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;