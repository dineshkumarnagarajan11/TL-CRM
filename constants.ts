import { Lead, Deal, LeadStatus, DealStage, Activity } from './types';

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Alice Freeman', company: 'Nexus Tech', email: 'alice@nexustech.com', phone: '+1 555-0101', status: LeadStatus.NEW, score: 85, lastContact: '2023-10-25', notes: 'Interested in enterprise plan.' },
  { id: '2', name: 'Bob Smith', company: 'Global Corp', email: 'bob@global.com', phone: '+1 555-0102', status: LeadStatus.QUALIFIED, score: 92, lastContact: '2023-10-24', notes: 'Budget approved for Q4.' },
  { id: '3', name: 'Charlie Davis', company: 'StartUp Inc', email: 'charlie@startup.io', phone: '+1 555-0103', status: LeadStatus.CONTACTED, score: 45, lastContact: '2023-10-20', notes: 'Evaluating competitors.' },
  { id: '4', name: 'Diana Prince', company: 'Themis Legal', email: 'diana@themis.com', phone: '+1 555-0104', status: LeadStatus.NEW, score: 60, lastContact: '2023-10-26', notes: 'Found us via LinkedIn.' },
  { id: '5', name: 'Ethan Hunt', company: 'IMF Logistics', email: 'ethan@imf.org', phone: '+1 555-0105', status: LeadStatus.LOST, score: 20, lastContact: '2023-09-15', notes: 'Ghosted after demo.' },
];

export const MOCK_DEALS: Deal[] = [
  { id: '101', title: 'Nexus Enterprise License', amount: 50000, stage: DealStage.NEGOTIATION, leadId: '1', closeDate: '2023-11-15', probability: 80 },
  { id: '102', title: 'Global Corp Pilot', amount: 15000, stage: DealStage.PROPOSAL, leadId: '2', closeDate: '2023-11-01', probability: 60 },
  { id: '103', title: 'StartUp Growth Pack', amount: 5000, stage: DealStage.DISCOVERY, leadId: '3', closeDate: '2023-12-01', probability: 30 },
  { id: '104', title: 'Themis Consultation', amount: 2500, stage: DealStage.PROSPECTING, leadId: '4', closeDate: '2023-11-20', probability: 10 },
  { id: '105', title: 'Cyberdyne Systems Audit', amount: 120000, stage: DealStage.CLOSED_WON, leadId: '99', closeDate: '2023-10-01', probability: 100 },
];

export const RECENT_ACTIVITIES: Activity[] = [
  { id: 'a1', type: 'email', description: 'Sent proposal to Bob Smith', date: '2 hrs ago', relatedTo: 'Global Corp Pilot' },
  { id: 'a2', type: 'call', description: 'Discovery call with Alice Freeman', date: '4 hrs ago', relatedTo: 'Nexus Tech' },
  { id: 'a3', type: 'meeting', description: 'Internal strategy review', date: 'Yesterday', relatedTo: 'Q4 Sales' },
  { id: 'a4', type: 'note', description: 'Updated requirements for StartUp Inc', date: 'Yesterday', relatedTo: 'Charlie Davis' },
];

export const REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];
