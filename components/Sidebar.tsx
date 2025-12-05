import React from 'react';
import { LayoutDashboard, Users, CreditCard, Bot, Settings, PieChart, Database, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'deals', label: 'Pipeline', icon: CreditCard },
    { id: 'contacts', label: 'Contacts', icon: Database },
    { id: 'ai-agent', label: 'AI Agent', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-850 text-white flex flex-col h-screen border-r border-slate-700 shadow-xl sticky top-0">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
          <Bot className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">Tagleap</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-2">Modules</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
              {item.id === 'ai-agent' && (
                <span className="ml-auto bg-indigo-500 text-[10px] px-2 py-0.5 rounded-full font-bold">BETA</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center space-x-3 text-slate-400 hover:text-white w-full px-4 py-2 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
