import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const legalDocuments = pgTable("legal_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'constitution', 'penal_code', 'act', 'case_law'
  section: text("section"),
  article: text("article"),
  content: text("content").notNull(),
  citation: text("citation"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const legalQueries = pgTable("legal_queries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  response: text("response").notNull(),
  sources: jsonb("sources"), // Array of source citations
  category: text("category"), // 'constitutional', 'criminal', 'civil', etc.
  confidence: text("confidence"), // 'high', 'medium', 'low'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLegalDocumentSchema = createInsertSchema(legalDocuments).omit({
  id: true,
  createdAt: true,
});

export const insertLegalQuerySchema = createInsertSchema(legalQueries).omit({
  id: true,
  createdAt: true,
});

export type InsertLegalDocument = z.infer<typeof insertLegalDocumentSchema>;
export type LegalDocument = typeof legalDocuments.$inferSelect;
export type InsertLegalQuery = z.infer<typeof insertLegalQuerySchema>;
export type LegalQuery = typeof legalQueries.$inferSelect;

// API Response types
export const LegalResponseSchema = z.object({
  response: z.string(),
  sources: z.array(z.object({
    title: z.string(),
    citation: z.string(),
    excerpt: z.string(),
    type: z.string(),
  })),
  category: z.string(),
  confidence: z.enum(['high', 'medium', 'low']),
  keyPoints: z.array(z.string()),
});

export type LegalResponse = z.infer<typeof LegalResponseSchema>;
