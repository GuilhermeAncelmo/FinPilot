import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Calendar as CalendarIcon, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const months = [
  { name: 'Maio', income: 3500, expense: 2700, balance: 800 },
  { name: 'Junho', income: 3500, expense: 3900, balance: -400, warning: true },
  { name: 'Julho', income: 4200, expense: 3100, balance: 1100 },
  { name: 'Agosto', income: 3500, expense: 2900, balance: 600 },
];

export const FuturePlanner = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Planner Futuro</h2>
        <p className="text-secondary mt-1">Previsão financeira para os próximos meses baseada em gastos recorrentes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {months.map((month, index) => (
          <GlassCard key={month.name} delay={index * 0.1} className={month.warning ? 'border-brand-red/30' : ''}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{month.name}</h3>
              <CalendarIcon size={20} className="text-secondary" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Previsto</span>
                <span className="text-brand-green font-medium">+R$ {month.income}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Gastos</span>
                <span className="text-brand-red font-medium">-R$ {month.expense}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="font-bold">Saldo</span>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${month.balance >= 0 ? 'text-text' : 'text-brand-red'}`}>
                    {month.balance >= 0 ? '+' : ''}R$ {month.balance}
                  </span>
                  {month.warning && <AlertCircle size={18} className="text-brand-red animate-pulse" />}
                </div>
              </div>
            </div>

            {month.warning && (
              <div className="mt-4 p-3 bg-brand-red/10 rounded-lg text-xs text-brand-red font-medium">
                ⚠️ Atenção: Saldo negativo previsto. Considere adiar compras não essenciais.
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-brand-blue/5 border-brand-blue/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center shrink-0">
            <TrendingUp className="text-brand-blue" size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold">Insight do Planejador</h4>
            <p className="text-secondary mt-1">
              Seu padrão atual gera uma economia média de **R$ 9.200/ano**. 
              Em Junho, o aumento de despesas é pontual (IPVA/Seguro). Você tem reserva suficiente para cobrir o déficit sem impactar metas de longo prazo.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
