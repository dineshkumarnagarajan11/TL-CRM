import React from 'react';
import { MOCK_DEALS } from '../constants';
import { DealStage, Deal } from '../types';
import { Plus } from 'lucide-react';

const Pipeline: React.FC = () => {
  const stages = Object.values(DealStage);

  const getDealsByStage = (stage: DealStage) => {
    return MOCK_DEALS.filter(deal => deal.stage === stage);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Deals Pipeline</h1>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-md flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </header>
      
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex space-x-4 h-full min-w-[1200px]">
          {stages.map((stage) => (
            <div key={stage} className="flex-1 flex flex-col min-w-[280px] max-w-[350px] bg-slate-100/50 rounded-xl border border-slate-200/60">
              <div className="p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center sticky top-0">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">{stage}</h3>
                <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">
                  {getDealsByStage(stage).length}
                </span>
              </div>
              
              <div className="p-2 flex-1 overflow-y-auto custom-scroll space-y-3">
                {getDealsByStage(stage).map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
                
                <button className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 hover:border-brand-400 hover:text-brand-500 text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DealCard = ({ deal }: { deal: Deal }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-200">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-slate-400">#{deal.id}</span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
          deal.probability > 75 ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-600'
        }`}>
          {deal.probability}% Prob.
        </span>
      </div>
      <h4 className="text-sm font-semibold text-slate-900 mb-1">{deal.title}</h4>
      <p className="text-lg font-bold text-slate-700 mb-3">${deal.amount.toLocaleString()}</p>
      
      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-gray-100 pt-3">
        <span>Closing {deal.closeDate}</span>
        <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-[10px]">
          JD
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
