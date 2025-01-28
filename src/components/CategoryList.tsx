import React from 'react';
import { Card } from "@/components/ui/card";

export type Category = {
  id: string;
  name: string;
  color: string;
};

const defaultCategories: Category[] = [
  { id: '1', name: 'Alimentação', color: '#FF719A' },
  { id: '2', name: 'Transporte', color: '#0EA5E9' },
  { id: '3', name: 'Lazer', color: '#9b87f5' },
  { id: '4', name: 'Moradia', color: '#FFA99F' },
];

const CategoryList = () => {
  const [categories, setCategories] = React.useState<Category[]>(defaultCategories);

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Categorias</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 rounded-lg"
            style={{ backgroundColor: category.color + '20' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryList;