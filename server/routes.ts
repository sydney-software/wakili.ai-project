import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processLegalQuery } from "./services/openai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Legal query processing endpoint
  app.post("/api/legal-query", async (req, res) => {
    try {
      const { question } = z.object({
        question: z.string().min(1, "Question is required"),
      }).parse(req.body);

      const legalResponse = await processLegalQuery(question);
      
      // Save the query to storage
      await storage.createLegalQuery({
        question,
        response: legalResponse.response,
        sources: legalResponse.sources,
        category: legalResponse.category,
        confidence: legalResponse.confidence,
      });

      res.json(legalResponse);
    } catch (error) {
      console.error("Error processing legal query:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  // Get all legal documents
  app.get("/api/legal-documents", async (req, res) => {
    try {
      const documents = await storage.getAllLegalDocuments();
      res.json(documents);
    } catch (error) {
      console.error("Error fetching legal documents:", error);
      res.status(500).json({ message: "Failed to fetch legal documents" });
    }
  });

  // Search legal documents
  app.get("/api/legal-documents/search", async (req, res) => {
    try {
      const { query, type } = z.object({
        query: z.string().default(""),
        type: z.string().optional(),
      }).parse(req.query);

      // If no query provided, return documents by type or all documents
      const documents = query 
        ? await storage.searchLegalDocuments(query, type)
        : type 
          ? await storage.searchLegalDocuments("", type)
          : await storage.getAllLegalDocuments();
      
      res.json(documents);
    } catch (error) {
      console.error("Error searching legal documents:", error);
      res.status(500).json({ message: "Failed to search legal documents" });
    }
  });

  // Get legal document by ID
  app.get("/api/legal-documents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const document = await storage.getLegalDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Legal document not found" });
      }
      
      res.json(document);
    } catch (error) {
      console.error("Error fetching legal document:", error);
      res.status(500).json({ message: "Failed to fetch legal document" });
    }
  });

  // Get recent legal queries
  app.get("/api/legal-queries", async (req, res) => {
    try {
      const queries = await storage.getAllLegalQueries();
      // Sort by most recent and limit to 50
      const recentQueries = queries
        .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
        .slice(0, 50);
      
      res.json(recentQueries);
    } catch (error) {
      console.error("Error fetching legal queries:", error);
      res.status(500).json({ message: "Failed to fetch legal queries" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
