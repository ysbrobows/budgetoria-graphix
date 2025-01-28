import Dashboard from "@/components/Dashboard";
import CategoryList from "@/components/CategoryList";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Controle de Despesas</h1>
        
        <Dashboard />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CategoryList />
            <ExpenseList />
          </div>
          <ExpenseForm />
        </div>
      </div>
    </div>
  );
};

export default Index;