import { type LegalDocument, type InsertLegalDocument, type LegalQuery, type InsertLegalQuery, legalDocuments, legalQueries } from "@shared/schema";
import { randomUUID } from "crypto";
import { constitutionArticles } from "./data/constitution";
import { penalCodeSections } from "./data/penal-code";
import { db } from "./db";
import { eq, ilike, or, and } from "drizzle-orm";

export interface IStorage {
  // Legal Documents
  getLegalDocument(id: string): Promise<LegalDocument | undefined>;
  getAllLegalDocuments(): Promise<LegalDocument[]>;
  searchLegalDocuments(query: string, type?: string): Promise<LegalDocument[]>;
  createLegalDocument(document: InsertLegalDocument): Promise<LegalDocument>;
  
  // Legal Queries
  getLegalQuery(id: string): Promise<LegalQuery | undefined>;
  getAllLegalQueries(): Promise<LegalQuery[]>;
  createLegalQuery(query: InsertLegalQuery): Promise<LegalQuery>;
}

export class DatabaseStorage implements IStorage {
  async initializeLegalDatabase() {
    try {
      // Check if data already exists
      const existingDocs = await db.select().from(legalDocuments).limit(1);
      if (existingDocs.length > 0) {
        return; // Data already initialized
      }

      // Load Constitution articles
      const constitutionData = constitutionArticles.map(article => ({
        title: article.title,
        type: 'constitution' as const,
        article: article.article,
        section: article.section,
        content: article.content,
        citation: `Constitution of Kenya 2010, ${article.article}`,
        metadata: { chapter: article.chapter },
      }));

      // Load Penal Code sections
      const penalCodeData = penalCodeSections.map(section => ({
        title: section.title,
        type: 'penal_code' as const,
        section: section.section,
        article: null,
        content: section.content,
        citation: `Penal Code, Section ${section.section}`,
        metadata: { category: section.category, penalty: section.penalty },
      }));

      // Insert all data
      await db.insert(legalDocuments).values([...constitutionData, ...penalCodeData]);
      console.log('Legal database initialized with Constitution and Penal Code data');
    } catch (error) {
      console.error('Error initializing legal database:', error);
    }
  }

  async getLegalDocument(id: string): Promise<LegalDocument | undefined> {
    const [document] = await db.select().from(legalDocuments).where(eq(legalDocuments.id, id));
    return document || undefined;
  }

  async getAllLegalDocuments(): Promise<LegalDocument[]> {
    return await db.select().from(legalDocuments);
  }

  async searchLegalDocuments(query: string, type?: string): Promise<LegalDocument[]> {
    const searchConditions = [
      ilike(legalDocuments.title, `%${query}%`),
      ilike(legalDocuments.content, `%${query}%`),
      ilike(legalDocuments.section, `%${query}%`),
      ilike(legalDocuments.article, `%${query}%`)
    ];

    if (type) {
      return await db
        .select()
        .from(legalDocuments)
        .where(and(or(...searchConditions), eq(legalDocuments.type, type)));
    }

    return await db
      .select()
      .from(legalDocuments)
      .where(or(...searchConditions));
  }

  async createLegalDocument(insertDocument: InsertLegalDocument): Promise<LegalDocument> {
    const [document] = await db
      .insert(legalDocuments)
      .values(insertDocument)
      .returning();
    return document;
  }

  async getLegalQuery(id: string): Promise<LegalQuery | undefined> {
    const [query] = await db.select().from(legalQueries).where(eq(legalQueries.id, id));
    return query || undefined;
  }

  async getAllLegalQueries(): Promise<LegalQuery[]> {
    return await db.select().from(legalQueries).orderBy(legalQueries.createdAt);
  }

  async createLegalQuery(insertQuery: InsertLegalQuery): Promise<LegalQuery> {
    const [query] = await db
      .insert(legalQueries)
      .values(insertQuery)
      .returning();
    return query;
  }
}

const databaseStorage = new DatabaseStorage();
// Initialize the database on startup
databaseStorage.initializeLegalDatabase();

export const storage = databaseStorage;
