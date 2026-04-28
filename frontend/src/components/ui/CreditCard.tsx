import React from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';

interface CreditCardProps {
  balance: number;
  cardNumber: string;
  expiry: string;
  type: 'VISA' | 'MASTERCARD';
  color?: 'blue' | 'purple' | 'black';
}

export const CreditCard = ({ balance, cardNumber, expiry, type, color = 'blue' }: CreditCardProps) => {
  const bgColors = {
    blue: 'from-blue-600 to-blue-900',
    purple: 'from-purple-600 to-purple-900',
    black: 'from-gray-800 to-black',
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: 5 }}
      className={`relative w-full aspect-[1.58/1] rounded-[24px] p-6 text-white overflow-hidden shadow-2xl bg-gradient-to-br ${bgColors[color]}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xl font-bold tracking-widest">{type}</span>
          <Wifi className="rotate-90 text-white/60" size={20} />
        </div>
        
        <div>
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Saldo Total</p>
          <h3 className="text-3xl font-bold">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-sm font-mono tracking-widest">{cardNumber}</p>
            <p className="text-[10px] text-white/60">{expiry}</p>
          </div>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-500/80"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
