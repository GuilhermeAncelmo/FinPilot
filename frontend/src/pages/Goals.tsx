import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Target, Plus, Car, Home, Plane, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const goals = [
  {
    id: 1,
    name: 'Carro Novo',
    target: 80000,
    current: 45000,
    icon: Car,
    color: 'bg-brand-blue',
    eta: '14 meses',
    category: 'Aquisição'
  },
  {
    id: 2,
    name: 'Reserva de Emergência',
    target: 20000,
    current: 15000,
    icon: ShieldCheck,
    color: 'bg-brand-green',
    eta: '4 meses',
    category: 'Segurança'
  },
  {
    id: 3,
    name: 'Viagem Japão',
    target: 15000,
    current: 3200,
    icon: Plane,
    color: 'bg-yellow-500',
    eta: '22 meses',
    category: 'Lazer'
  },
];

export const Goals = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Minhas Metas</h2>
          <p className="text-secondary mt-1">Acompanhe seu progresso e veja quando alcançará seus objetivos.</p>
        </div>
        <button className="glass-button-primary flex items-center gap-2">
          <Plus size={20} />
          Nova Meta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <GlassCard key={goal.id} delay={index * 0.1}>
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${goal.color} bg-opacity-20 flex items-center justify-center`}>
                  <goal.icon size={28} className={goal.color.replace('bg-', 'text-')} />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-secondary font-medium">
                  {goal.category}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1">{goal.name}</h3>
              <div className="flex justify-between items-end mb-4">
                <p className="text-2xl font-bold">
                  R$ {goal.current.toLocaleString()} 
                  <span className="text-secondary text-sm font-normal ml-2">de R$ {goal.target.toLocaleString()}</span>
                </p>
                <p className="text-brand-blue font-bold">{Math.round(progress)}%</p>
              </div>

              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full ${goal.color}`}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                <div className="text-center flex-1 border-r border-white/5">
                  <p className="text-xs text-secondary uppercase font-bold tracking-wider mb-1">Previsão</p>
                  <p className="font-bold">{goal.eta}</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-xs text-secondary uppercase font-bold tracking-wider mb-1">Faltam</p>
                  <p className="font-bold text-brand-red">R$ {(goal.target - goal.current).toLocaleString()}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
