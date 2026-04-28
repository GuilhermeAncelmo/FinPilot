import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Briefcase, Plus, Filter, Search, MoreVertical } from 'lucide-react';
import { useTransactionModal } from '../contexts/TransactionContext';

export const IncomesPage = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openModal, refreshTrigger } = useTransactionModal();

  const fetchIncomes = () => {
    fetch('http://localhost:3001/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setIncomes(data.recentTransactions.filter((t: any) => t.type === 'INCOME'));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIncomes();
  }, [refreshTrigger]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Minhas Rendas</h2>
          <p className="text-secondary mt-1">Gerencie suas fontes de receita e ganhos mensais.</p>
        </div>
        <button 
          onClick={() => openModal('INCOME')}
          className="glass-button-primary"
        >
          <Plus size={20} />
          Nova Renda
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
                  placeholder="Filtrar rendas..." 
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
                  <th className="px-6 py-4 font-bold">Tipo</th>
                  <th className="px-6 py-4 font-bold text-right">Valor</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {incomes.map((income: any) => (
                  <tr key={income.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center">
                          <Briefcase size={16} />
                        </div>
                        <span className="font-medium">{income.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">{income.category?.name || 'Geral'}</td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {new Date(income.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${income.fixed ? 'bg-brand-blue/10 text-brand-blue' : 'bg-white/5 text-secondary'}`}>
                        {income.fixed ? 'Fixo' : 'Variável'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-brand-green">
                      R$ {income.amount.toLocaleString('pt-BR')}
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
