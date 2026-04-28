import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PurchaseSimulator } from './pages/PurchaseSimulator';
import { FuturePlanner } from './pages/FuturePlanner';
import { Goals } from './pages/Goals';
import { Insights } from './pages/Insights';
import { IncomesPage } from './pages/Incomes';
import { ExpensesPage } from './pages/Expenses';
import { TransactionProvider } from './contexts/TransactionContext';
import { GlobalTransactionModal } from './components/ui/GlobalTransactionModal';

function App() {
  return (
    <TransactionProvider>
      <GlobalTransactionModal />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rendas" element={<IncomesPage />} />
            <Route path="/gastos" element={<ExpensesPage />} />
            <Route path="/simulator" element={<PurchaseSimulator />} />
            <Route path="/planner" element={<FuturePlanner />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/insights" element={<Insights />} />
            {/* Placeholder for other routes */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-[60vh] text-center opacity-50">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h2 className="text-4xl font-bold mb-4">Em breve</h2>
                <p>Esta funcionalidade está sendo desenvolvida com o máximo carinho.</p>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </TransactionProvider>
  );
}

export default App;
