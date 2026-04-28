import React from 'react';
import { 
  LayoutDashboard, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ArrowRightLeft, 
  TrendingUp, 
  Target, 
  FileText, 
  Calendar, 
  CreditCard, 
  Wallet, 
  Settings,
  Bell,
  Search,
  Moon,
  Plus,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTransactionModal } from '../contexts/TransactionContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ArrowUpCircle, label: 'Rendas', path: '/rendas' },
  { icon: ArrowDownCircle, label: 'Gastos', path: '/gastos' },
  { icon: ArrowRightLeft, label: 'Transferências', path: '/transferencias' },
  { icon: TrendingUp, label: 'Investimentos', path: '/investimentos' },
  { icon: Target, label: 'Metas', path: '/goals' },
  { icon: FileText, label: 'Relatórios', path: '/relatorios' },
  { icon: Calendar, label: 'Planejamento', path: '/planner' },
  { icon: CreditCard, label: 'Cartões', path: '/cartoes' },
  { icon: Wallet, label: 'Contas', path: '/contas' },
  { icon: Settings, label: 'Configurações', path: '/config' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { openModal } = useTransactionModal();

  return (
    <div className="flex min-h-screen bg-[#050810] text-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 py-8 flex flex-col sticky top-0 h-screen">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <Zap className="text-white fill-white" size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">FinVault</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                    : 'text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-brand-blue/20">
              <img src="https://i.pravatar.cc/150?u=guilherme" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">João Silva</p>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-yellow-500 font-bold uppercase">Premium</span>
                <Sparkles size={10} className="text-yellow-500" />
              </div>
            </div>
            <ChevronRight size={16} className="text-secondary" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#050810]/50 backdrop-blur-md sticky top-0 z-50">
          <div className="relative w-96">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <Search className="text-secondary" size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-[#0B1220] border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-secondary font-mono border border-white/10 px-1.5 py-0.5 rounded">
              Ctrl + K
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => openModal('EXPENSE')}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-brand-blue/20"
            >
              <Plus size={18} />
              Nova transação
            </button>
            
            <button className="w-10 h-10 rounded-xl bg-[#0B1220] border border-white/5 flex items-center justify-center text-secondary hover:text-white transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-red rounded-full border-2 border-[#050810]"></span>
            </button>
            
            <button className="w-10 h-10 rounded-xl bg-[#0B1220] border border-white/5 flex items-center justify-center text-secondary hover:text-white transition-all">
              <Moon size={20} />
            </button>
          </div>
        </header>

        <main className="p-8 bg-[#050810]">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Simple icon replacement for Zap if not imported correctly
const Zap = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const Sparkles = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M21 17v4"/><path d="M19 19h4"/></svg>
);
