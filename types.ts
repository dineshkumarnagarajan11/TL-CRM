export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  LOST = 'Lost'
}

export enum DealStage {
  PROSPECTING = 'Prospecting',
  DISCOVERY = 'Discovery',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  CLOSED_WON = 'Closed Won'
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  score: number; // AI Score 0-100
  lastContact: string;
  notes: string;
}

export interface Deal {
  id: string;
  title: string;
  amount: number;
  stage: DealStage;
  leadId: string; // Foreign key logic
  closeDate: string;
  probability: number;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
  date: string;
  relatedTo: string; // Name of lead or deal
}

export interface ChartData {
  name: string;
  value: number;
  pv?: number;
}

export type ViewState = 'dashboard' | 'leads' | 'deals' | 'contacts' | 'ai-agent' | 'settings';
