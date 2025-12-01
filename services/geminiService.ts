import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { CAMP_SESSIONS, GENERAL_INFO } from '../constants';

// Construct a context string for the AI
const campContext = `
You are a helpful and enthusiastic assistant for the "2025 點石書屋・雙語冬令營" (Bilingual Winter Camp).
Your goal is to answer parents' questions about the camp schedule, pricing, and activities based on the following data.
Keep answers concise, friendly, and in Traditional Chinese (Taiwan).

Camp General Info:
Time: ${GENERAL_INFO.time}
Location: ${GENERAL_INFO.location}
Pricing: ${GENERAL_INFO.discounts}

Session Details:
${CAMP_SESSIONS.map(session => `
- ${session.title} (${session.date})
  Price: NT$${session.price}
  Description: ${session.description}
  Highlights: ${session.highlights.join(', ')}
  Schedule Summary:
  ${session.schedule.map(s => `  ${s.time}: Mon=${s.mon}, Tue=${s.tue}, Wed=${s.wed}, Thu=${s.thu}, Fri=${s.fri}`).join('\n')}
`).join('\n')}

If asked about something not in this data, suggest they contact the camp administration directly or fill out the registration form.
`;

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
    if (!aiClient) {
        // In a real app, this should be an environment variable. 
        // For this demo, we assume process.env.API_KEY is available or the user will need to provide it?
        // As per instructions, we rely on process.env.API_KEY
        if (process.env.API_KEY) {
            aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
        }
    }
    return aiClient;
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
    const ai = getAiClient();
    if (!ai) {
        return "請先設定 API Key (Please configure API_KEY in your environment).";
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: campContext,
            }
        });
        
        return response.text || "抱歉，我現在無法回答，請稍後再試。";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "發生錯誤，請稍後再試。";
    }
};
