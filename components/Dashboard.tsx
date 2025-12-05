import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, DollarSign, Users, Briefcase } from 'lucide-react';
import { MOCK_LEADS, MOCK_DEALS, REVENUE_DATA, RECENT_ACTIVITIES } from '../constants';

const Dashboard: React.FC = () => {
  const totalPipeline = MOCK_DEALS.reduce((acc, deal) => acc + deal.amount, 0);
  const totalLeads = MOCK_LEADS.length;
  const wonDeals = MOCK_DEALS.filter(d => d.stage === 'Closed Won').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
          <p className="text-slate-500">Welcome back, Architect. Here is your daily briefing.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50">Download Report</button>
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-md">Add Widget</button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Pipeline" value={`$${totalPipeline.toLocaleString()}`} icon={DollarSign} trend="+12.5%" color="bg-indigo-50 text-indigo-600" />
        <KpiCard title="Total Leads" value={totalLeads.toString()} icon={Users} trend="+4.3%" color="bg-blue-50 text-blue-600" />
        <KpiCard title="Deals Won" value={wonDeals.toString()} icon={Briefcase} trend="+2.1%" color="bg-emerald-50 text-emerald-600" />
        <KpiCard title="Conversion Rate" value="24%" icon={ArrowUpRight} trend="-1.2%" color="bg-amber-50 text-amber-600" isNegative />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Revenue Forecast</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {RECENT_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${
                  activity.type === 'call' ? 'bg-blue-500' : 
                  activity.type === 'email' ? 'bg-purple-500' : 'bg-gray-400'
                }`} />
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.description}</p>
                  <p className="text-xs text-slate-500">{activity.relatedTo} • {activity.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-brand-600 font-medium hover:bg-brand-50 rounded-lg transition-colors">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, icon: Icon, trend, color, isNegative = false }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`font-medium ${isNegative ? 'text-red-600' : 'text-emerald-600'}`}>{trend}</span>
      <span className="text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

export default Dashboard;
