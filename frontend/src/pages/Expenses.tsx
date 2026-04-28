import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { ShoppingCart, Plus, Filter, Search, MoreVertical, CreditCard } from 'lucide-react';
import { useTransactionModal } from '../contexts/TransactionContext';

export const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openModal, refreshTrigger } = useTransactionModal();

  const fetchExpenses = () => {
    fetch('http://localhost:3001/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setExpenses(data.recentTransactions.filter((t: any) => t.type === 'EXPENSE'));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, [refreshTrigger]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Meus Gastos</h2>
          <p className="text-secondary mt-1">Controle suas despesas e identifique para onde vai seu dinheiro.</p>
        </div>
        <button 
          onClick={() => openModal('EXPENSE')}
          className="glass-button bg-brand-red text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red/90"
        >
          <Plus size={20} />
          Novo Gasto
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <GlassCard className="p-0 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                <input 
                  type="text" 
                  placeholder="Filtrar gastos..." 
                  className="w-full bg-background border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-blue/50"
                />
              </div>
              <button className="flex items-center gap-2 text-secondary hover:text-white text-sm font-medium border border-white/10 rounded-xl px-4 py-2">
                <Filter size={16} />
                Filtros
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-secondary uppercase tracking-widest border-b border-white/5">
                  <th className="px-6 py-4 font-bold">Descrição</th>
                  <th className="px-6 py-4 font-bold">Categoria</th>
                  <th className="px-6 py-4 font-bold">Data</th>
                  <th className="px-6 py-4 font-bold">Método</th>
                  <th className="px-6 py-4 font-bold text-right">Valor</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {expenses.map((expense: any) => (
                  <tr key={expense.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center">
                          <ShoppingCart size={16} />
                        </div>
                        <span className="font-medium">{expense.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">{expense.category?.name || 'Geral'}</td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {new Date(expense.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-secondary text-xs">
                        <CreditCard size={14} />
                        <span>Padrão</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-brand-red">
                      - R$ {expense.amount.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
