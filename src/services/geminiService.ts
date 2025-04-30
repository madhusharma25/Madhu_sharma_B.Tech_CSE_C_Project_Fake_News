
import { toast } from "sonner";

// Google Gemini API key
const API_KEY = "AIzaSyDo3ahg4cUTIHMNkU_NadC3cQ7OXt-D4HI";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export type GeminiResponse = {
  text: string;
  isFake: boolean | null;
  confidenceScore: number | null;
  reasoning: string | null;
};

// Helper function to interpret AI response and extract structured data
const interpretResponse = (rawText: string): GeminiResponse => {
  let isFake: boolean | null = null;
  let confidenceScore: number | null = null;
  
  // Check if response contains verdict information
  if (rawText.toLowerCase().includes("fake") && !rawText.toLowerCase().includes("not fake")) {
    isFake = true;
  } else if (rawText.toLowerCase().includes("real") || rawText.toLowerCase().includes("true") || 
             rawText.toLowerCase().includes("credible") || rawText.toLowerCase().includes("not fake")) {
    isFake = false;
  }
  
  // Try to extract confidence score if present
  const confidenceMatch = rawText.match(/confidence[^\d]*(\d+(?:\.\d+)?)/i);
  if (confidenceMatch && confidenceMatch[1]) {
    const score = parseFloat(confidenceMatch[1]);
    // Normalize to 0-100 if needed
    confidenceScore = score > 1 ? score : score * 100;
  }
  
  // Get reasoning if any
  let reasoning = null;
  if (rawText.toLowerCase().includes("reason") || rawText.toLowerCase().includes("because") ||
      rawText.toLowerCase().includes("analysis")) {
    reasoning = rawText;
  }
  
  return {
    text: rawText,
    isFake,
    confidenceScore,
    reasoning
  };
};

// Analyze text with Gemini
export const analyzeText = async (text: string): Promise<GeminiResponse> => {
  try {
    const prompt = `
      Please analyze this news content and determine if it appears to be real or fake news.
      Consider factors such as source credibility, language used, emotional manipulation, factual consistency, and verifiable claims.
      Be thorough but concise. Give a clear verdict (FAKE or REAL) and provide a confidence score (0-100%).
      Include brief reasoning for your analysis. Here's the content to analyze:
      
      ${text}
    `;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      const generatedText = data.candidates[0].content.parts[0].text;
      return interpretResponse(generatedText);
    } else {
      throw new Error("No valid response from Gemini API");
    }
  } catch (error) {
    console.error("Error analyzing text with Gemini:", error);
    toast.error("Failed to analyze text. Please try again.");
    return {
      text: "Error analyzing content. Please try again.",
      isFake: null,
      confidenceScore: null,
      reasoning: null
    };
  }
};

// Chat with Gemini AI
export const chatWithGemini = async (message: string): Promise<string> => {
  try {
    const prompt = `
      You are a helpful AI assistant specialized in detecting fake news and misinformation.
      If the user asks about a news story or shares content, analyze it for credibility.
      If it's a general question, answer helpfully but focus on media literacy and fact-checking.
      
      User message: ${message}
    `;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No valid response from Gemini API");
    }
  } catch (error) {
    console.error("Error chatting with Gemini:", error);
    toast.error("Failed to get a response. Please try again.");
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
};
