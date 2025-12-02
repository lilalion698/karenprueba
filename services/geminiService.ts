import { GoogleGenAI, Type } from "@google/genai";
import { AnamnesisData, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeClientForm = async (data: AnamnesisData): Promise<AnalysisResult> => {
  const prompt = `
    You are an expert aesthetician and optometrist consultant specializing in Lash Lifts (Lifting de Pestañas).
    Analyze the following client anamnesis data to determine if they are a suitable candidate for the procedure.
    
    Client Data:
    - Wears Contacts: ${data.wearContacts}
    - Eye Conditions (glaucoma, conjunctivitis, etc): ${data.eyeConditions}
    - Recent Surgery: ${data.recentEyeSurgery}
    - Pregnant/Breastfeeding: ${data.pregnant}
    - Allergies: ${data.allergies}
    - Medications: ${data.medications}
    - Previous Reactions: ${data.previousReactions}
    - Hormonal Imbalance: ${data.hormonalImbalance}

    Determine if it is safe to proceed. 
    Generate 3 metrics (0-100 scale, where 100 is best condition) for a radar chart:
    1. "Eye Health" (Salud Ocular)
    2. "Skin Resilience" (Resistencia Piel)
    3. "General Suitability" (Aptitud General)

    Return a JSON object.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          safeToProceed: { type: Type.BOOLEAN },
          riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          reasoning: { type: Type.STRING },
          recommendations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          suitabilityMetrics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                A: { type: Type.NUMBER },
                fullMark: { type: Type.NUMBER },
              }
            }
          }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as AnalysisResult;
  }
  
  throw new Error("Failed to analyze form");
};
