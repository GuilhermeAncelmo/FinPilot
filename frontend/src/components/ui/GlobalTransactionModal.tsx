import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpCircle, ArrowDownCircle, ArrowRightLeft } from 'lucide-react';
import { useTransactionModal } from '../../contexts/TransactionContext';

export const GlobalTransactionModal = () => {
  const { isOpen, type: initialType, closeModal, triggerRefresh } = useTransactionModal();
  const [modalType, setModalType] = useState<'INCOME' | 'EXPENSE' | 'TRANSFER'>(initialType);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initial type when opened from different buttons
  useEffect(() => {
    if (isOpen) {
      setModalType(initialType);
    }
  }, [isOpen, initialType]);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          type: modalType,
          fixed: isFixed,
          date: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        closeModal();
        setDescription('');
        setAmount('');
        setIsFixed(false);
        triggerRefresh(); // Tell pages to refresh their data
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0B1220] border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-2xl font-bold">Nova Transação</h3>
              <button onClick={closeModal} className="text-secondary hover:text-white transition-colors">
                 <X size={24} />
              </button>
            </div>

            {/* Type Selector */}
            <div className="flex bg-white/5 rounded-xl p-1 mb-8 relative z-10">
              <button 
                type="button"
                onClick={() => setModalType('INCOME')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${modalType === 'INCOME' ? 'bg-[#10B981] text-white shadow-md' : 'text-secondary hover:text-white'}`}
              >
                <ArrowUpCircle size={16} /> Receita
              </button>
              <button 
                type="button"
                onClick={() => setModalType('EXPENSE')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${modalType === 'EXPENSE' ? 'bg-[#EF4444] text-white shadow-md' : 'text-secondary hover:text-white'}`}
              >
                <ArrowDownCircle size={16} /> Despesa
              </button>
              <button 
                type="button"
                onClick={() => setModalType('TRANSFER')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${modalType === 'TRANSFER' ? 'bg-brand-blue text-white shadow-md' : 'text-secondary hover:text-white'}`}
              >
                <ArrowRightLeft size={16} /> Transf.
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs text-secondary font-bold uppercase tracking-widest">Descrição</label>
                <input 
                  autoFocus
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={modalType === 'TRANSFER' ? "Ex: Transferência para Poupança" : "Ex: Aluguel, Salário, iFood..."}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-blue/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-secondary font-bold uppercase tracking-widest">Valor (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-3xl font-bold focus:outline-none focus:border-brand-blue/50 transition-all"
                />
              </div>

              {modalType !== 'TRANSFER' && (
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="fixed"
                    checked={isFixed}
                    onChange={(e) => setIsFixed(e.target.checked)}
                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-brand-blue focus:ring-0"
                  />
                  <label htmlFor="fixed" className="text-sm text-secondary cursor-pointer">Lançamento Fixo (Aluguel, Salário, etc)</label>
                </div>
              )}

              <div className="pt-4">
                <button 
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl ${
                    modalType === 'INCOME' ? 'bg-[#10B981] text-white shadow-[#10B981]/20 hover:bg-[#10B981]/90' : 
                    modalType === 'EXPENSE' ? 'bg-[#EF4444] text-white shadow-[#EF4444]/20 hover:bg-[#EF4444]/90' :
                    'bg-brand-blue text-white shadow-brand-blue/20 hover:bg-brand-blue/90'
                  }`}
                >
                  {isSubmitting ? 'Salvando...' : 'Confirmar Lançamento'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
