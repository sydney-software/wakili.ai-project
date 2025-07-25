import { type LegalDocument, type InsertLegalDocument, type LegalQuery, type InsertLegalQuery } from "@shared/schema";
import { randomUUID } from "crypto";
import { constitutionArticles } from "./data/constitution";
import { penalCodeSections } from "./data/penal-code";

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

export class MemStorage implements IStorage {
  private legalDocuments: Map<string, LegalDocument>;
  private legalQueries: Map<string, LegalQuery>;

  constructor() {
    this.legalDocuments = new Map();
    this.legalQueries = new Map();
    this.initializeLegalDatabase();
  }

  private initializeLegalDatabase() {
    // Load Constitution articles
    constitutionArticles.forEach(article => {
      const id = randomUUID();
      const document: LegalDocument = {
        id,
        title: article.title,
        type: 'constitution',
        article: article.article,
        section: article.section,
        content: article.content,
        citation: `Constitution of Kenya 2010, ${article.article}`,
        metadata: { chapter: article.chapter },
        createdAt: new Date(),
      };
      this.legalDocuments.set(id, document);
    });

    // Load Penal Code sections
    penalCodeSections.forEach(section => {
      const id = randomUUID();
      const document: LegalDocument = {
        id,
        title: section.title,
        type: 'penal_code',
        section: section.section,
        article: null,
        content: section.content,
        citation: `Penal Code, Section ${section.section}`,
        metadata: { category: section.category, penalty: section.penalty },
        createdAt: new Date(),
      };
      this.legalDocuments.set(id, document);
    });
  }

  async getLegalDocument(id: string): Promise<LegalDocument | undefined> {
    return this.legalDocuments.get(id);
  }

  async getAllLegalDocuments(): Promise<LegalDocument[]> {
    return Array.from(this.legalDocuments.values());
  }

  async searchLegalDocuments(query: string, type?: string): Promise<LegalDocument[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.legalDocuments.values()).filter(doc => {
      const matchesType = !type || doc.type === type;
      const matchesContent = 
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.content.toLowerCase().includes(searchTerm) ||
        (doc.section && doc.section.toLowerCase().includes(searchTerm)) ||
        (doc.article && doc.article.toLowerCase().includes(searchTerm));
      
      return matchesType && matchesContent;
    });
  }

  async createLegalDocument(insertDocument: InsertLegalDocument): Promise<LegalDocument> {
    const id = randomUUID();
    const document: LegalDocument = {
      ...insertDocument,
      id,
      article: insertDocument.article || null,
      section: insertDocument.section || null,
      citation: insertDocument.citation || null,
      metadata: insertDocument.metadata || null,
      createdAt: new Date(),
    };
    this.legalDocuments.set(id, document);
    return document;
  }

  async getLegalQuery(id: string): Promise<LegalQuery | undefined> {
    return this.legalQueries.get(id);
  }

  async getAllLegalQueries(): Promise<LegalQuery[]> {
    return Array.from(this.legalQueries.values());
  }

  async createLegalQuery(insertQuery: InsertLegalQuery): Promise<LegalQuery> {
    const id = randomUUID();
    const query: LegalQuery = {
      ...insertQuery,
      id,
      sources: insertQuery.sources || null,
      category: insertQuery.category || null,
      confidence: insertQuery.confidence || null,
      createdAt: new Date(),
    };
    this.legalQueries.set(id, query);
    return query;
  }
}

export const storage = new MemStorage();
