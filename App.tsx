import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import Pipeline from './components/Pipeline';
import AIAgent from './components/AIAgent';
import { ViewState } from './types';
import { Database, Settings as SettingsIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadList />;
      case 'deals':
        return <Pipeline />;
      case 'ai-agent':
        return <AIAgent />;
      case 'contacts':
        return <PlaceholderPage title="Contacts" icon={Database} />;
      case 'settings':
        return <PlaceholderPage title="Settings" icon={SettingsIcon} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-slate-900 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 h-screen overflow-hidden relative">
        <div className="h-full overflow-y-auto p-8 custom-scroll">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

// Simple placeholder for non-implemented routes to maintain layout
const PlaceholderPage = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
    <div className="p-6 bg-slate-100 rounded-full mb-4">
      <Icon className="w-12 h-12" />
    </div>
    <h2 className="text-2xl font-bold text-slate-600 mb-2">{title} Module</h2>
    <p className="max-w-md text-center">
      This enterprise module is under development. 
      The AI-First Tagleap engine is focusing on Leads, Pipeline, and Automation agents first.
    </p>
  </div>
);

export default App;
