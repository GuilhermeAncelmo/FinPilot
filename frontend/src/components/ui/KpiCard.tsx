import React from 'react';
import { GlassCard } from './GlassCard';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'green' | 'red' | 'blue' | 'purple';
  delay?: number;
}

const colorMap = {
  green: 'text-[#10B981] bg-[#10B981]/10',
  red: 'text-[#EF4444] bg-[#EF4444]/10',
  blue: 'text-[#3B82F6] bg-[#3B82F6]/10',
  purple: 'text-[#A855F7] bg-[#A855F7]/10',
};

export const KpiCard = ({ title, value, icon: Icon, trend, color, delay }: KpiCardProps) => {
  return (
    <GlassCard delay={delay} className="p-6 bg-[#0B1220] border-white/5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-secondary text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-xl ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
      </div>
      
      <div className="space-y-1">
        <motion.h3 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tight"
        >
          {value}
        </motion.h3>
        
        {trend && (
          <p className={`text-xs font-medium flex items-center gap-1 ${trend.isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            <span className="font-bold">{trend.isPositive ? '+' : ''}{trend.value}%</span>
            <span className="text-secondary">vs mês anterior</span>
          </p>
        )}
      </div>
    </GlassCard>
  );
};
