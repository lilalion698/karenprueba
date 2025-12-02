export interface AnamnesisData {
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  wearContacts: boolean;
  eyeConditions: boolean;
  recentEyeSurgery: boolean;
  pregnant: boolean;
  allergies: string;
  medications: string;
  previousReactions: boolean;
  hormonalImbalance: boolean;
}

export interface AnalysisResult {
  safeToProceed: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  reasoning: string;
  recommendations: string[];
  suitabilityMetrics: {
    subject: string;
    A: number; // Score out of 100
    fullMark: number;
  }[];
}
