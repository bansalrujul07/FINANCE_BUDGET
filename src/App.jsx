import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardPage from './pages/Dashboard';
import TransactionsPage from './pages/Transactions';
import AddTransactionPage from './pages/AddTransaction';
import BudgetPage from './pages/Budget';
import AnalyticsPage from './pages/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/transactions/new', label: 'Add Transaction' },
    { path: '/budget', label: 'Budget' },
    { path: '/analytics', label: 'Analytics' },
  ];

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="app-shell min-h-screen bg-surface2 text-text">
      <aside className="sidebar sticky top-0 h-screen w-72 border-r border-white/5 bg-surface3 px-6 py-8">
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-surface/80 px-4 py-3 text-sm font-semibold tracking-tight text-white shadow-soft">
            <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#3B82F6] shadow-glow flex items-end justify-center gap-1 px-2 py-2">
              <span className="h-3 w-2 rounded-full bg-white/90" />
              <span className="h-4 w-2 rounded-full bg-white/80" />
              <span className="h-5 w-2 rounded-full bg-white/70" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Finance</p>
              <p className="text-lg font-semibold text-white">Analytics</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `block rounded-[1.35rem] px-4 py-3 text-sm font-medium transition duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#60A5FA] text-white shadow-glow'
                    : 'text-textMuted hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_20%),_radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.08),_transparent_18%),_#111827] px-6 py-8">
        <div className="page-top-bar">
          <span className="date-chip">{currentDate}</span>
        </div>
        <div className="mobile-nav-wrapper">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `mobile-nav-link rounded-full px-3 py-2 text-sm font-medium transition duration-200 ${
                    isActive ? 'bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#60A5FA] text-white shadow-glow' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <header className="page-header max-w-6xl space-y-3 pb-6">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Premium Fintech Dashboard</p>
          <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-5xl">Personal Finance & Expense Analytics</h1>
          <p className="max-w-3xl text-base leading-7 text-slate-400">Track income, expenses, budgets, and analytics in one place with a premium dark finance experience.</p>
        </header>

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/transactions/new" element={<AddTransactionPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ErrorBoundary>

        <ToastContainer position="top-right" autoClose={4500} hideProgressBar pauseOnHover />
      </main>
    </div>
  );
}

export default App;
