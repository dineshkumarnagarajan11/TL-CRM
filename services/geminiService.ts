import { GoogleGenAI } from "@google/genai";
import { Lead, Deal } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for the general CRM assistant
const CRM_SYSTEM_INSTRUCTION = `You are Tagleap AI, an advanced CRM assistant. 
Your goal is to help sales agents close deals, draft communications, and analyze data.
You have access to the user's current leads and deals context.
Be concise, professional, and action-oriented.
`;

export const generateEmailDraft = async (lead: Lead, context: string): Promise<string> => {
  try {
    const prompt = `Draft a personalized cold email to ${lead.name} at ${lead.company}. 
    Context: ${context}. 
    Lead Notes: ${lead.notes}.
    Keep it under 150 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not generate email.";
  } catch (error) {
    console.error("AI Email Error:", error);
    return "Error generating email. Please check your API key.";
  }
};

export const analyzeLeadScore = async (lead: Lead): Promise<string> => {
  try {
    const prompt = `Analyze this lead and provide a brief 2-sentence reason for their score of ${lead.score}/100.
    Lead: ${JSON.stringify(lead)}
    Focus on job title, company size implied, and engagement.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    return "Could not analyze lead.";
  }
};

export const chatWithCRM = async (message: string, leads: Lead[], deals: Deal[]) => {
  try {
    // We inject a minimized version of the data to avoid token limits, focusing on names/status/amounts
    const contextData = `
    Current Leads: ${leads.map(l => `${l.name} (${l.company}) - Status: ${l.status}`).join(', ')}
    Current Deals: ${deals.map(d => `${d.title}: $${d.amount} (Stage: ${d.stage})`).join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for better reasoning over data
      contents: `User Query: ${message}\n\nCRM Data Context: ${contextData}`,
      config: {
        systemInstruction: CRM_SYSTEM_INSTRUCTION
      }
    });

    return response.text || "I didn't quite get that.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm having trouble connecting to the Tagleap AI brain. Please check your connection or API key.";
  }
};
