import { type LegalDocument, type InsertLegalDocument, type LegalQuery, type InsertLegalQuery } from "@shared/schema";
import { constitutionArticles } from "./data/constitution";
import { penalCodeSections } from "./data/penal-code";
import { contractLawData } from "./data/contract-law";
import { propertyLawData } from "./data/property-law";
import { employmentLawData } from "./data/employment-law";
import { familyLawData } from "./data/family-law";
import { connectToMongoDB, LegalDocument as LegalDocumentModel, LegalQuery as LegalQueryModel } from "./db";

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
  constructor() {
    this.initializeLegalDatabase();
  }

  async initializeLegalDatabase() {
    try {
      await connectToMongoDB();
      
      // Check if data already exists
      const existingDocs = await LegalDocumentModel.findOne();
      if (existingDocs) {
        return; // Data already initialized
      }

      // Load Constitution articles
      const constitutionData = constitutionArticles.map(article => ({
        title: article.title,
        type: 'constitution',
        article: article.article,
        section: article.section,
        content: article.content,
        citation: `Constitution of Kenya 2010, ${article.article}`,
        metadata: { chapter: article.chapter },
      }));

      // Load Penal Code sections
      const penalCodeDataMapped = penalCodeSections.map(section => ({
        title: section.title,
        type: 'penal_code',
        section: section.section,
        article: null,
        content: section.content,
        citation: `Penal Code, Section ${section.section}`,
        metadata: { category: section.category, penalty: section.penalty },
      }));

      // Load Contract Law data
      const contractData = contractLawData.map(item => ({
        title: item.title,
        type: 'contract',
        section: item.section,
        article: item.article,
        content: item.content,
        citation: `${item.metadata.act}, ${item.section || item.article || item.title}`,
        metadata: item.metadata,
      }));

      // Load Property Law data
      const propertyData = propertyLawData.map(item => ({
        title: item.title,
        type: 'property',
        section: item.section,
        article: item.article,
        content: item.content,
        citation: `${item.metadata.act}, ${item.section || item.article || item.title}`,
        metadata: item.metadata,
      }));

      // Load Employment Law data
      const employmentData = employmentLawData.map(item => ({
        title: item.title,
        type: 'employment',
        section: item.section,
        article: item.article,
        content: item.content,
        citation: `${item.metadata.act}, ${item.section || item.article || item.title}`,
        metadata: item.metadata,
      }));

      // Load Family Law data
      const familyData = familyLawData.map(item => ({
        title: item.title,
        type: 'family',
        section: item.section,
        article: item.article,
        content: item.content,
        citation: `${item.metadata.act}, ${item.section || item.article || item.title}`,
        metadata: item.metadata,
      }));

      // Insert all data
      await LegalDocumentModel.insertMany([
        ...constitutionData, 
        ...penalCodeDataMapped, 
        ...contractData,
        ...propertyData,
        ...employmentData,
        ...familyData
      ]);
      console.log('Legal database initialized with all legal categories: Constitution, Penal Code, Contract Law, Property Law, Employment Law, and Family Law');
    } catch (error) {
      console.error('Error initializing legal database:', error);
    }
  }

  async getLegalDocument(id: string): Promise<LegalDocument | undefined> {
    await connectToMongoDB();
    const document = await LegalDocumentModel.findById(id);
    if (!document) return undefined;
    
    return {
      id: document._id.toString(),
      title: document.title,
      type: document.type,
      section: document.section,
      article: document.article,
      content: document.content,
      citation: document.citation,
      metadata: document.metadata,
      createdAt: document.createdAt,
    };
  }

  async getAllLegalDocuments(): Promise<LegalDocument[]> {
    await connectToMongoDB();
    const documents = await LegalDocumentModel.find();
    
    return documents.map(doc => ({
      id: doc._id.toString(),
      title: doc.title,
      type: doc.type,
      section: doc.section,
      article: doc.article,
      content: doc.content,
      citation: doc.citation,
      metadata: doc.metadata,
      createdAt: doc.createdAt,
    }));
  }

  async searchLegalDocuments(query: string, type?: string): Promise<LegalDocument[]> {
    await connectToMongoDB();
    
    const searchConditions: any = {};

    // If query is provided, add search conditions
    if (query && query.trim()) {
      searchConditions.$or = [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { section: { $regex: query, $options: 'i' } },
        { article: { $regex: query, $options: 'i' } }
      ];
    }

    // If type is specified, filter by type
    if (type) {
      searchConditions.type = type;
    }

    const documents = await LegalDocumentModel.find(searchConditions);
    
    return documents.map(doc => ({
      id: doc._id.toString(),
      title: doc.title,
      type: doc.type,
      section: doc.section,
      article: doc.article,
      content: doc.content,
      citation: doc.citation,
      metadata: doc.metadata,
      createdAt: doc.createdAt,
    }));
  }

  async createLegalDocument(insertDocument: InsertLegalDocument): Promise<LegalDocument> {
    await connectToMongoDB();
    const document = await LegalDocumentModel.create(insertDocument);
    
    return {
      id: document._id.toString(),
      title: document.title,
      type: document.type,
      section: document.section,
      article: document.article,
      content: document.content,
      citation: document.citation,
      metadata: document.metadata,
      createdAt: document.createdAt,
    };
  }

  async getLegalQuery(id: string): Promise<LegalQuery | undefined> {
    await connectToMongoDB();
    const query = await LegalQueryModel.findById(id);
    if (!query) return undefined;
    
    return {
      id: query._id.toString(),
      question: query.question,
      response: query.response,
      sources: query.sources,
      category: query.category,
      confidence: query.confidence,
      createdAt: query.createdAt,
    };
  }

  async getAllLegalQueries(): Promise<LegalQuery[]> {
    await connectToMongoDB();
    const queries = await LegalQueryModel.find().sort({ createdAt: -1 });
    
    return queries.map(query => ({
      id: query._id.toString(),
      question: query.question,
      response: query.response,
      sources: query.sources,
      category: query.category,
      confidence: query.confidence,
      createdAt: query.createdAt,
    }));
  }

  async createLegalQuery(insertQuery: InsertLegalQuery): Promise<LegalQuery> {
    await connectToMongoDB();
    const query = await LegalQueryModel.create(insertQuery);
    
    return {
      id: query._id.toString(),
      question: query.question,
      response: query.response,
      sources: query.sources,
      category: query.category,
      confidence: query.confidence,
      createdAt: query.createdAt,
    };
  }
}

export const storage = new DatabaseStorage();
