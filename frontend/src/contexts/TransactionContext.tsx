import React, { createContext, useContext, useState } from 'react';

type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';

interface TransactionContextType {
  isOpen: boolean;
  type: TransactionType;
  openModal: (type?: TransactionType) => void;
  closeModal: () => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const openModal = (newType?: TransactionType) => {
    if (newType) setType(newType);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <TransactionContext.Provider value={{ isOpen, type, openModal, closeModal, refreshTrigger, triggerRefresh }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionModal = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionModal must be used within a TransactionProvider');
  }
  return context;
};
