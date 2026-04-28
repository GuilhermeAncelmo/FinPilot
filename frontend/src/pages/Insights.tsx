import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Zap, TrendingUp, TrendingDown, Bell, PieChart, Sparkles } from 'lucide-react';

const insights = [
  {
    id: 1,
    type: 'warning',
    title: 'Gastos com Delivery subiram 31%',
    description: 'Nos últimos 30 dias, você gastou R$ 450 a mais com iFood/Uber Eats do que sua média histórica.',
    icon: TrendingUp,
    color: 'text-brand-red',
    bg: 'bg-brand-red/10',
    impact: 'R$ -450,00'
  },
  {
    id: 2,
    type: 'info',
    title: 'Assinaturas consomem 12% da renda',
    description: 'Você possui 8 serviços de streaming ativos. Três deles não foram utilizados nos últimos 60 dias.',
    icon: Bell,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
    impact: 'R$ 180,00/mês potencial'
  },
  {
    id: 3,
    type: 'success',
    title: 'Padrão de economia saudável',
    description: 'Seu padrão atual de gastos gera uma economia projetada de R$ 9.200 por ano. Parabéns!',
    icon: Sparkles,
    color: 'text-brand-green',
    bg: 'bg-brand-green/10',
    impact: 'R$ 9.200,00/ano'
  }
];

export const Insights = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-brand-blue/20 rounded-2xl flex items-center justify-center">
          <Sparkles className="text-brand-blue" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Insights FinPilot IA</h2>
          <p className="text-secondary mt-1">Análise inteligente baseada no seu histórico de transações.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {insights.map((insight, index) => (
          <GlassCard key={insight.id} delay={index * 0.1} className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className={`p-4 rounded-2xl ${insight.bg} shrink-0`}>
              <insight.icon size={32} className={insight.color} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
              <p className="text-secondary leading-relaxed max-w-2xl">
                {insight.description}
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <p className="text-xs text-secondary uppercase font-bold tracking-widest mb-1">Impacto Financeiro</p>
              <p className={`text-2xl font-bold ${insight.color}`}>
                {insight.impact}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-gradient-to-br from-brand-blue/10 to-transparent border-brand-blue/20 p-10">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          <PieChart size={48} className="text-brand-blue mb-6" />
          <h3 className="text-2xl font-bold mb-4">Sugestão de Alocação</h3>
          <p className="text-secondary mb-8">
            Baseado no seu perfil de investidor, sugerimos mover **R$ 2.400** da sua conta corrente para o fundo de oportunidade para maximizar rendimentos este mês.
          </p>
          <button className="glass-button-primary w-full md:w-auto">
            Aplicar Sugestão
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
