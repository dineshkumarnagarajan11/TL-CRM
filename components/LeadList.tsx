import React, { useState } from 'react';
import { MOCK_LEADS } from '../constants';
import { Lead, LeadStatus } from '../types';
import { Search, Filter, MoreHorizontal, Sparkles, Mail } from 'lucide-react';
import { analyzeLeadScore, generateEmailDraft } from '../services/geminiService';

const LeadList: React.FC = () => {
  const [leads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [emailDraft, setEmailDraft] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (lead: Lead) => {
    setSelectedLead(lead);
    setAiAnalysis('');
    setEmailDraft('');
    setIsLoading(true);
    const analysis = await analyzeLeadScore(lead);
    setAiAnalysis(analysis);
    setIsLoading(false);
  };

  const handleDraftEmail = async (lead: Lead) => {
    setSelectedLead(lead);
    setAiAnalysis('');
    setEmailDraft('');
    setIsLoading(true);
    const draft = await generateEmailDraft(lead, "Introduce Tagleap CRM's new AI features");
    setEmailDraft(draft);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-2rem)] flex flex-col">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-md">
            + New Lead
          </button>
        </div>
      </header>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex">
        {/* Table */}
        <div className="flex-1 overflow-auto custom-scroll">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{lead.name}</span>
                      <span className="text-xs text-slate-500">{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{lead.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 w-16 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${lead.score > 80 ? 'bg-emerald-500' : lead.score > 50 ? 'bg-amber-500' : 'bg-red-400'}`} 
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleAnalyze(lead)}
                        className="p-1.5 text-brand-600 bg-brand-50 rounded-md hover:bg-brand-100" 
                        title="AI Analysis"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDraftEmail(lead)}
                        className="p-1.5 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100" 
                        title="Draft Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Sidebar Panel */}
        {selectedLead && (
          <div className="w-80 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto shadow-xl z-20 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-900">Tagleap AI Agent</h3>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="font-bold text-brand-700 text-xs">{selectedLead.name.substring(0,2)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{selectedLead.name}</p>
                    <p className="text-xs text-slate-500">{selectedLead.company}</p>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ) : (
                  <>
                    {aiAnalysis && (
                      <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
                        <div className="flex items-center space-x-2 text-indigo-700 mb-2">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase">Score Analysis</span>
                        </div>
                        <p className="text-sm text-indigo-900 leading-relaxed">{aiAnalysis}</p>
                      </div>
                    )}

                    {emailDraft && (
                      <div className="mt-4">
                        <div className="flex items-center space-x-2 text-slate-700 mb-2">
                          <Mail className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase">Draft Email</span>
                        </div>
                        <textarea 
                          className="w-full h-48 p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:outline-none"
                          defaultValue={emailDraft}
                        />
                        <button className="w-full mt-2 bg-brand-600 text-white py-2 rounded-md text-sm font-medium hover:bg-brand-700">
                          Copy to Clipboard
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: LeadStatus }) => {
  const styles = {
    [LeadStatus.NEW]: 'bg-blue-100 text-blue-700',
    [LeadStatus.CONTACTED]: 'bg-amber-100 text-amber-700',
    [LeadStatus.QUALIFIED]: 'bg-emerald-100 text-emerald-700',
    [LeadStatus.LOST]: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

export default LeadList;
