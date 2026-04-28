import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { ShoppingCart, Info, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PurchaseSimulator = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [showResult, setShowResult] = useState(false);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (price) setShowResult(true);
  };

  const calculateRisk = (amount: number) => {
    if (amount < 1000) return { label: 'Baixo', color: 'text-brand-green', bg: 'bg-brand-green/10' };
    if (amount < 5000) return { label: 'Médio', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { label: 'Alto', color: 'text-brand-red', bg: 'bg-brand-red/10' };
  };

  const risk = calculateRisk(Number(price));

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Simulador de Compra</h2>
        <p className="text-secondary mt-2">Analise o impacto real de uma nova aquisição no seu orçamento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShoppingCart size={20} className="text-brand-blue" />
            Dados do Item
          </h3>
          <form onSubmit={handleSimulate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">O que você quer comprar?</label>
              <input 
                type="text" 
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Ex: iPhone 15 Pro"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Preço Estimado (R$)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0,00"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue/50 transition-all"
              />
            </div>
            <button 
              type="submit"
              className="w-full glass-button-primary py-4 flex items-center justify-center gap-2 font-bold text-lg"
            >
              Simular Impacto
              <ArrowRight size={20} />
            </button>
          </form>
        </GlassCard>

        <AnimatePresence>
          {showResult ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <GlassCard className="border-l-4 border-l-brand-blue">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Análise à Vista</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${risk.bg} ${risk.color}`}>
                    Risco {risk.label}
                  </span>
                </div>
                <p className="text-secondary text-sm">Impacto imediato no patrimônio líquido:</p>
                <p className="text-2xl font-bold text-brand-red mt-1">- R$ {Number(price).toLocaleString('pt-BR')}</p>
                <div className="mt-4 p-4 rounded-xl bg-white/5 flex gap-3">
                  <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                  <p className="text-sm text-secondary">
                    Esta compra consome 12% da sua reserva de emergência atual.
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <h4 className="font-bold mb-4">Parcelamento (12x)</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary text-sm">Parcela mensal:</p>
                    <p className="text-xl font-bold text-text mt-1">R$ {(Number(price) / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-secondary text-sm">Comprometimento:</p>
                    <p className="text-xl font-bold text-yellow-500 mt-1">4.2% da renda</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-brand-green">
                    <CheckCircle size={16} />
                    <span>Não ultrapassa o limite de segurança (30%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Info size={16} />
                    <span>Quitação prevista para: Maio 2027</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Info size={40} className="text-secondary" />
              </div>
              <p className="text-secondary">Preencha os dados ao lado para ver a análise de impacto financeiro.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
