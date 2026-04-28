import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight,
  Plus,
  ShoppingCart,
  MoreHorizontal,
  ChevronRight,
  Music,
  ShoppingBag,
  Car,
  Briefcase,
  User,
  PieChart as PieIcon,
  Download,
  Calendar as CalendarIcon,
  X
} from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { GlassCard } from '../components/ui/GlassCard';
import { CreditCard } from '../components/ui/CreditCard';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactionModal } from '../contexts/TransactionContext';

const chartData = [
  { name: 'Jan', rendas: 4250, gastos: 2890 },
  { name: 'Fev', rendas: 3800, gastos: 2400 },
  { name: 'Mar', rendas: 5100, gastos: 3100 },
  { name: 'Abr', rendas: 4250, gastos: 2890 },
  { name: 'Mai', rendas: 4800, gastos: 2600 },
  { name: 'Jun', rendas: 4600, gastos: 2750 },
  { name: 'Jul', rendas: 5200, gastos: 3000 },
  { name: 'Ago', rendas: 4900, gastos: 2800 },
  { name: 'Set', rendas: 5500, gastos: 3200 },
  { name: 'Out', rendas: 5300, gastos: 2900 },
  { name: 'Nov', rendas: 5800, gastos: 3400 },
  { name: 'Dez', rendas: 5400, gastos: 3100 },
];

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { openModal, refreshTrigger } = useTransactionModal();

  const fetchDashboard = () => {
    fetch('http://localhost:3001/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, [refreshTrigger]);

  if (loading) return null;

  const { summary, recentTransactions } = dashboardData;
  const rendas = recentTransactions.filter((t: any) => t.type === 'INCOME').slice(0, 4);
  const gastos = recentTransactions.filter((t: any) => t.type === 'EXPENSE').slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">Visão Geral</h2>
          <p className="text-secondary mt-1">Acompanhe sua saúde financeira</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0B1220] border border-white/5 rounded-xl px-4 py-2 text-sm text-secondary">
             <CalendarIcon size={16} />
             <span>Este Mês</span>
          </div>
          <button className="flex items-center gap-2 bg-[#0B1220] border border-white/5 rounded-xl px-4 py-2 text-sm text-secondary hover:text-white transition-all">
             <Download size={16} />
             <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard 
          title="Patrimônio Total" 
          value={`R$ ${summary.netWorth.toLocaleString('pt-BR')}`} 
          icon={Wallet} 
          color="blue"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KpiCard 
          title="Rendas" 
          value={`R$ ${summary.totalIncome.toLocaleString('pt-BR')}`} 
          icon={TrendingUp} 
          color="green"
          trend={{ value: 8.2, isPositive: true }}
        />
        <KpiCard 
          title="Gastos" 
          value={`R$ ${summary.totalExpenses.toLocaleString('pt-BR')}`} 
          icon={TrendingDown} 
          color="red"
          trend={{ value: 5.1, isPositive: false }}
        />
        <KpiCard 
          title="Saldo do Mês" 
          value={`R$ ${(summary.totalIncome - summary.totalExpenses).toLocaleString('pt-BR')}`} 
          icon={PieIcon} 
          color="purple"
          trend={{ value: 35.4, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Chart Column */}
        <div className="xl:col-span-8 space-y-8">
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Fluxo de Caixa</h3>
                <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-secondary">i</div>
              </div>
              <select className="bg-transparent text-secondary text-sm outline-none">
                <option>12 meses</option>
              </select>
            </div>
            
            <div className="flex gap-6 mb-8">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-brand-blue"></div>
                 <span className="text-xs text-secondary">Rendas</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-brand-red"></div>
                 <span className="text-xs text-secondary">Gastos</span>
               </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.chartData}>
                  <defs>
                    <linearGradient id="colorRendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                  />
                  <Area type="monotone" dataKey="rendas" stroke="#3B82F6" strokeWidth={2} fill="url(#colorRendas)" dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#0B1220' }} activeDot={{ r: 6 }} />
                  <Area type="monotone" dataKey="gastos" stroke="#EF4444" strokeWidth={2} fill="url(#colorGastos)" dot={{ r: 4, fill: '#EF4444', strokeWidth: 2, stroke: '#0B1220' }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Rendas & Gastos Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold">Minhas Rendas</h3>
                <div className="flex gap-4 items-center">
                  <button className="text-brand-blue text-xs font-bold">Ver todas</button>
                  <button 
                    onClick={() => openModal('INCOME')}
                    className="bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-brand-blue/20"
                  >
                    <Plus size={14} /> Adicionar
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                {rendas.map((tx: any) => (
                  <div key={tx.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{tx.description}</p>
                        <p className="text-[10px] text-secondary">Salário</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-brand-green">R$ {tx.amount.toLocaleString('pt-BR')}</p>
                      <p className="text-[10px] text-secondary">{new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold">Meus Gastos</h3>
                <div className="flex gap-4 items-center">
                  <button className="text-brand-blue text-xs font-bold">Ver todas</button>
                  <button 
                    onClick={() => openModal('EXPENSE')}
                    className="bg-brand-red/10 text-brand-red px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-brand-red/20"
                  >
                    <Plus size={14} /> Adicionar
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                {gastos.map((tx: any) => (
                  <div key={tx.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                        <ShoppingCart size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{tx.description}</p>
                        <p className="text-[10px] text-secondary">Aluguel</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-brand-red">R$ {tx.amount.toLocaleString('pt-BR')}</p>
                      <p className="text-[10px] text-secondary">{new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="xl:col-span-4 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="font-bold">Meu Cartão</h3>
              <MoreHorizontal size={20} className="text-secondary" />
           </div>
           
           <CreditCard 
              balance={summary.netWorth}
              cardNumber="**** **** **** 2233"
              expiry="07/26"
              type="VISA"
              color="blue"
           />

           <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold">Atividades Recentes</h3>
                <button className="text-brand-blue text-xs font-bold">Ver todas</button>
              </div>
              <div className="space-y-6">
                {recentTransactions.slice(0, 4).map((tx: any) => {
                  const isIncome = tx.type === 'INCOME';
                  return (
                    <div key={tx.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isIncome ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                           {isIncome ? <Briefcase size={18} /> : <ShoppingCart size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{tx.description}</p>
                          <p className="text-[10px] text-secondary">{isIncome ? 'Receita' : 'Despesa'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${isIncome ? 'text-brand-green' : 'text-brand-red'}`}>
                          {isIncome ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-[10px] text-secondary">{new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
           </GlassCard>

           <GlassCard className="p-6 bg-[#0B1220]">
              <h3 className="font-bold mb-6">Resumo Financeiro</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Rendas Fixas</span>
                  <span className="font-medium text-white">R$ {summary.fixedIncome.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Rendas Variáveis</span>
                  <span className="font-medium text-white">R$ {summary.variableIncome.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Gastos Fixos</span>
                  <span className="font-medium text-white">R$ {summary.fixedExpenses.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Gastos Variáveis</span>
                  <span className="font-medium text-white">R$ {summary.variableExpenses.toLocaleString('pt-BR')}</span>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="font-bold">Saldo Líquido</span>
                  <span className="text-lg font-bold text-brand-green">R$ {(summary.totalIncome - summary.totalExpenses).toLocaleString('pt-BR')}</span>
                </div>
              </div>
           </GlassCard>
        </div>
      </div>

    </div>
  );
};
