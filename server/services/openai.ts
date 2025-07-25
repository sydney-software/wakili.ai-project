import OpenAI from "openai";
import { type LegalResponse } from "@shared/schema";
import { storage } from "../storage";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "default_key"
});

export async function processLegalQuery(question: string): Promise<LegalResponse> {
  try {
    // Search for relevant legal documents
    const relevantDocs = await storage.searchLegalDocuments(question);
    
    // Limit to most relevant documents (top 10)
    const topDocs = relevantDocs.slice(0, 10);
    
    // Prepare context for AI
    const legalContext = topDocs.map(doc => ({
      title: doc.title,
      type: doc.type,
      citation: doc.citation,
      content: doc.content.substring(0, 500), // Limit content length
      article: doc.article,
      section: doc.section,
    }));

    const systemPrompt = `You are Wakili.ai, an expert AI assistant specializing in Kenyan law based on the 2010 Constitution and current legislation. Your role is to provide accurate, informative responses about Kenyan legal matters.

IMPORTANT GUIDELINES:
1. Base your responses ONLY on the provided legal documents
2. Always cite specific articles, sections, or legal provisions
3. If information is not available in the provided context, clearly state this
4. Provide clear, accessible explanations while maintaining legal accuracy
5. Include relevant legal sources and citations
6. Categorize the query appropriately
7. Assess confidence level based on available information

RESPONSE FORMAT: Respond with JSON containing:
- response: Detailed answer to the legal question
- sources: Array of relevant legal sources with citations
- category: Legal category (constitutional, criminal, civil, employment, property, family, commercial)
- confidence: Assessment (high, medium, low)
- keyPoints: Array of main points from your response

LEGAL CONTEXT PROVIDED:
${JSON.stringify(legalContext, null, 2)}`;

    const userPrompt = `Question about Kenyan law: "${question}"

Please provide a comprehensive answer based on the legal documents provided in the context. Include specific citations and explain the legal principles clearly.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1, // Low temperature for consistency
      max_tokens: 2000,
    });

    const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate and structure the response
    const legalResponse: LegalResponse = {
      response: aiResponse.response || "I apologize, but I couldn't process your legal query at this time.",
      sources: aiResponse.sources || [],
      category: aiResponse.category || "general",
      confidence: aiResponse.confidence || "low",
      keyPoints: aiResponse.keyPoints || [],
    };

    return legalResponse;

  } catch (error) {
    console.error("Error processing legal query:", error);
    throw new Error("Failed to process legal query. Please try again.");
  }
}

export async function categorizeLegalQuery(question: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Categorize this legal question into one of these categories: constitutional, criminal, civil, employment, property, family, commercial, administrative. Respond with JSON: { 'category': 'category_name' }"
        },
        {
          role: "user",
          content: question
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.category || "general";
  } catch (error) {
    console.error("Error categorizing query:", error);
    return "general";
  }
}
